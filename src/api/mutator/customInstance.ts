import axios, { type AxiosRequestConfig } from "axios";
import {
  ROLE_STORAGE_KEY,
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "@/context/roleContext";

const AXIOS_INSTANCE = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// 로그인 전에 호출되는 회원가입/로그인 엔드포인트는 현재 세션의 토큰과
// 무관하므로 Authorization 헤더를 붙이지 않는다. (붙이면 로그인된 상태에서
// 이 요청들이 401을 받았을 때 "세션 만료"로 오인되어 강제 로그아웃되는
// 문제가 생긴다.) hr/register는 여기 넣지 않는다 — 대표가 로그인한 상태로
// /main/team에서만 호출하는 엔드포인트라, 토큰을 붙이지 않으면 오히려
// 그 요청만 인증되지 않은 채로 나간다.
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

// accessToken 만료(401) 시 refresh 없이 세션을 지우고 로그인 화면으로 보낸다.
// 로그인/가입 단계(자격증명 오류, OTP 불일치 등)는 토큰 없이 호출되므로
// Authorization 헤더가 실제로 붙어 있던 요청에만 적용한다.
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error) => {
    const hadToken = Boolean(error.config?.headers?.get?.("Authorization"));
    if (hadToken && error.response?.status === 401) {
      localStorage.removeItem(ROLE_STORAGE_KEY);
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// 백엔드가 모든 응답을 { success, message, data } 형태로 감싸서 내려주므로,
// 실제 값(data)만 꺼내서 반환한다.
interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

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
