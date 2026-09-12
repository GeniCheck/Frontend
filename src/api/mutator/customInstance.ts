import axios, { type AxiosRequestConfig } from "axios";

const AXIOS_INSTANCE = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// 로그인 시 저장해둔 토큰을 매 요청에 자동으로 실어 보낸다.
AXIOS_INSTANCE.interceptors.request.use((config) => {
  const token = localStorage.getItem("genicheck_access_token");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

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
