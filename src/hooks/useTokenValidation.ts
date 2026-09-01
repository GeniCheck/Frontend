import { useEffect, useState } from "react";
import type { DeclarationLinkContext } from "@/types/declaration";

export type TokenStatus = "loading" | "valid" | "expired" | "invalid";

interface UseTokenValidationResult {
  status: TokenStatus;
  context: DeclarationLinkContext | null;
}

// TODO: 실제 검증 API(GET /employee/link/:token) 나오면 fetch로 교체.
// 응답에 companyId/employeeId가 함께 내려오는지 백엔드와 확인 필요.
//
// token은 라우트 파라미터라 페이지 마운트 중 값이 바뀌는 경우가 없어서,
// 초기 상태(useState)만으로 "loading/invalid" 분기를 잡고 effect 안에서는
// 비동기 완료 시점에만 setState한다 (react-hooks/set-state-in-effect 대응).
export function useTokenValidation(
  token: string | undefined,
): UseTokenValidationResult {
  const [status, setStatus] = useState<TokenStatus>(
    token ? "loading" : "invalid",
  );
  const [context, setContext] = useState<DeclarationLinkContext | null>(null);

  useEffect(() => {
    if (!token) return;

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
