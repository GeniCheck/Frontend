import { useEffect, useState } from "react";

export type TokenStatus = "loading" | "valid" | "expired" | "invalid";

// TODO: 실제 검증 API(GET /employee/link/:token) 나오면 fetch로 교체 (MSW 도입은 다음 화면 작업 때)
export function useTokenValidation(token: string | undefined) {
  const [status, setStatus] = useState<TokenStatus>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const timer = setTimeout(() => {
      setStatus("valid");
    }, 300);

    return () => clearTimeout(timer);
  }, [token]);

  return { status };
}
