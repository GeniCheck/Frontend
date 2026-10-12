import { isAxiosError } from "axios";

export type LinkErrorStatus = "expired" | "invalid" | "submitted";

const LINK_ERROR_BY_CODE: Record<string, LinkErrorStatus> = {
  LINK_EXPIRED: "expired",
  ALREADY_SUBMITTED: "submitted",
  INVALID_LINK_PURPOSE: "invalid",
  INVALID_EVALUATION_STATUS: "invalid",
};

// 직원용 1회성 링크 API의 에러를 링크 안내 화면 상태로 바꾼다.
// 403은 CONSENT_NOT_GIVEN(필수 동의 누락)에도 쓰여서 상태 코드가 아닌 code로 구분한다.
// 링크 문제가 아니면 null을 돌려 폼에 머물게 한다.
export const toLinkErrorStatus = (err: unknown): LinkErrorStatus | null => {
  if (!isAxiosError<{ code?: string }>(err)) return null;
  const code = err.response?.data?.code;
  if (code) return LINK_ERROR_BY_CODE[code] ?? null;
  return err.response?.status === 404 ? "invalid" : null;
};
