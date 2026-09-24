import { isAxiosError } from "axios";

const RATE_LIMIT_MESSAGE =
  "요청이 잠시 제한됐어요. 1분 뒤에 다시 시도해주세요.";

export const extractErrorMessage = (err: unknown, fallback: string): string => {
  if (isAxiosError<{ message?: string }>(err)) {
    if (err.response?.status === 429) return RATE_LIMIT_MESSAGE;
    return err.response?.data?.message ?? fallback;
  }
  return fallback;
};
