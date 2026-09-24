import axios, {
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import {
  ROLE_STORAGE_KEY,
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "@/context/roleContext";
import type { AuthTokenResponse } from "@/api/authResponses";

const AXIOS_INSTANCE = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

const REFRESH_PATH = "/auth/refresh";

// 토큰 없이 인증되는 요청. 헤더가 붙으면 401 시 현재 세션이 로그아웃된다.
const PUBLIC_AUTH_PATHS = [
  "/auth/applicant/signup",
  "/auth/applicant/verify-email",
  "/auth/applicant/login",
  "/auth/company/signup",
  "/auth/company/login",
  "/auth/company/otp/verify",
  "/auth/hr/login",
  "/auth/hr/otp/verify",
  "/auth/hr/accept-invite",
  "/auth/otp/resend",
  REFRESH_PATH,
];

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const isPublicAuthPath = PUBLIC_AUTH_PATHS.some((path) =>
    config.url?.includes(path),
  );
  const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  if (token && !isPublicAuthPath) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

const clearSessionAndRedirectToLogin = () => {
  localStorage.removeItem(ROLE_STORAGE_KEY);
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  window.location.href = "/login";
};

// 동시에 401이 여러 번 나도 refresh는 한 번만 호출한다.
let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = (): Promise<string | null> => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
  if (!refreshToken) return Promise.resolve(null);

  refreshPromise ??= AXIOS_INSTANCE.post<ApiEnvelope<AuthTokenResponse>>(
    REFRESH_PATH,
    { refreshToken },
  )
    .then(({ data }) => {
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, data.data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, data.data.refreshToken);
      return data.data.accessToken;
    })
    .catch(() => null)
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config as
      (InternalAxiosRequestConfig & { _retried?: boolean }) | undefined;
    const hadToken = Boolean(config?.headers?.get?.("Authorization"));

    if (
      hadToken &&
      error.response?.status === 401 &&
      config &&
      !config._retried
    ) {
      config._retried = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        config.headers.set("Authorization", `Bearer ${newAccessToken}`);
        return AXIOS_INSTANCE(config);
      }
      clearSessionAndRedirectToLogin();
      return Promise.reject(error);
    }

    if (hadToken && error.response?.status === 401) {
      clearSessionAndRedirectToLogin();
    }
    return Promise.reject(error);
  },
);

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  return AXIOS_INSTANCE({ ...config, ...options }).then(
    (response: { data: ApiEnvelope<T> }) => response.data.data,
  );
};

export default customInstance;
