import { useEffect, useState } from "react";
import type { DeclarationLinkContext } from "@/types/declaration";

export type TokenStatus = "loading" | "valid" | "expired" | "invalid";

interface UseTokenValidationResult {
  status: TokenStatus;
  context: DeclarationLinkContext | null;
}

// TODO: 실제 검증 API(GET /employee/link/:token) 나오면 fetch로 교체.
// 응답에 companyId/employeeId가 함께 내려오는지 백엔드와 확인 필요 (기능명세서 1.6).
export function useTokenValidation(
  token: string | undefined,
): UseTokenValidationResult {
  const [status, setStatus] = useState<TokenStatus>(
    token ? "loading" : "invalid",
  );
  const [context, setContext] = useState<DeclarationLinkContext | null>(null);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      setContext(null);
      return;
    }

    setStatus("loading");
    setContext(null);

    const timer = setTimeout(() => {
      if (token === "expired") {
        setStatus("expired");
        return;
      }
      setStatus("valid");
      setContext({
        token,
        companyId: "mock-company-1",
        employeeId: "mock-employee-1",
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [token]);

  return { status, context };
}
