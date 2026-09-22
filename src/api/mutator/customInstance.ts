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

// 백엔드가 모든 응답을 { success, message, data } 형태로 감싸서 내려준다.
interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

const REFRESH_PATH = "/auth/refresh";

// 로그인 전에 호출되는 회원가입/로그인 엔드포인트는 현재 세션의 토큰과
// 무관하므로 Authorization 헤더를 붙이지 않는다. (붙이면 로그인된 상태에서
// 이 요청들이 401을 받았을 때 "세션 만료"로 오인되어 강제 로그아웃되는
// 문제가 생긴다.) hr/register는 여기 넣지 않는다 — 대표가 로그인한 상태로
// /main/team에서만 호출하는 엔드포인트라, 토큰을 붙이지 않으면 오히려
// 그 요청만 인증되지 않은 채로 나간다. refresh는 accessToken이 아니라
// refreshToken(바디)으로 인증하는 엔드포인트라 여기 포함한다 — 안 그러면
// 만료된 accessToken이 Authorization 헤더로 같이 붙어서 자기 자신이 401을
// 유발하고, 그게 다시 로그아웃을 트리거하는 순환이 생긴다.
const PUBLIC_AUTH_PATHS = [
  "/auth/applicant/signup",
  "/auth/applicant/verify-email",
  "/auth/applicant/login",
  "/auth/company/signup",
  "/auth/company/login",
  "/auth/company/otp/verify",
  "/auth/hr/login",
  "/auth/hr/otp/verify",
  "/auth/otp/resend",
  REFRESH_PATH,
];

// 로그인 시 저장해둔 토큰을 매 요청에 자동으로 실어 보낸다.
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

// 동시에 여러 요청이 401을 받아도 refresh 호출은 한 번만 나가도록, 진행 중인
// refresh 하나를 여러 요청이 같이 기다린다(대기열).
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

// accessToken 만료(401) 시, refreshToken으로 새 accessToken을 한 번 받아와
// 원래 요청을 재시도한다. refresh 자체가 실패하면(refreshToken도 만료 등)
// 그때 세션을 지우고 로그인 화면으로 보낸다.
// 로그인/가입 단계(자격증명 오류, OTP 불일치 등)는 토큰 없이 호출되므로
// Authorization 헤더가 실제로 붙어 있던 요청에만 적용하고, 이미 한 번
// 재시도한 요청은 다시 재시도하지 않는다(무한 루프 방지).
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config as
      | (InternalAxiosRequestConfig & { _retried?: boolean })
      | undefined;
    const hadToken = Boolean(config?.headers?.get?.("Authorization"));

    if (hadToken && error.response?.status === 401 && config && !config._retried) {
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

// orval mutator: 생성된 API 함수들이 이 함수를 통해 호출된다.
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  return AXIOS_INSTANCE({ ...config, ...options }).then(
    (response: { data: ApiEnvelope<T> }) => response.data.data,
  );
};

export default customInstance;
