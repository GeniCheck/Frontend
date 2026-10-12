import { isAxiosError } from "axios";

export type LinkErrorStatus = "expired" | "invalid" | "submitted" | "withdrawn";

const LINK_ERROR_BY_CODE: Record<string, LinkErrorStatus> = {
  LINK_EXPIRED: "expired",
  ALREADY_SUBMITTED: "submitted",
  INVALID_LINK_PURPOSE: "invalid",
  INVALID_EVALUATION_STATUS: "invalid",
  CONSENT_NOT_FOUND: "invalid",
  ALREADY_PROCESSED: "withdrawn",
  ALREADY_WITHDRAWN: "withdrawn",
};

export const toLinkErrorStatus = (err: unknown): LinkErrorStatus | null => {
  if (!isAxiosError<{ code?: string }>(err)) return null;
  const code = err.response?.data?.code;
  if (code) return LINK_ERROR_BY_CODE[code] ?? null;
  return err.response?.status === 404 ? "invalid" : null;
};
