import { useEffect, useState } from "react";

export type TokenStatus = "loading" | "valid" | "expired" | "invalid";

// TODO: 실제 검증 API(GET /employee/link/:token) 나오면 fetch로 교체
export function useTokenValidation(token: string | undefined) {
  const [status, setStatus] = useState<TokenStatus>(
    token ? "loading" : "invalid",
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    const timer = setTimeout(() => {
      setStatus(token === "expired" ? "expired" : "valid");
    }, 300);

    return () => clearTimeout(timer);
  }, [token]);

  return { status };
}
