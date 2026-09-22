import { createContext, useContext } from "react";

// 로그인한 계정의 역할. 로그인 전에는 null.
export type Role = "ceo" | "hr";

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RoleContextValue {
  role: Role | null;
  // 대표/인사팀장 실명. /auth/me 응답을 캐시할 때까지는 null.
  displayName: string | null;
  setSession: (role: Role, tokens: SessionTokens) => void;
  clearSession: () => void;
}

export const ROLE_STORAGE_KEY = "genicheck_role";
export const ACCESS_TOKEN_STORAGE_KEY = "genicheck_access_token";
export const REFRESH_TOKEN_STORAGE_KEY = "genicheck_refresh_token";
// 기업 회원가입 응답에만 한 번 내려오는 값(재조회 API 없음). 인사팀장 계정
// 생성(hr/register) 시 필요해서 가입 시점에 캡처해둔다.
export const COMPANY_CODE_STORAGE_KEY = "genicheck_company_code";

// localStorage에서 초기 역할을 복원 (새로고침 / 직접 URL 진입 대응)
export const readStoredRole = (): Role | null => {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem(ROLE_STORAGE_KEY);
  return saved === "ceo" || saved === "hr" ? saved : null;
};

export const readStoredCompanyCode = (): string | null => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(COMPANY_CODE_STORAGE_KEY);
};

export const RoleContext = createContext<RoleContextValue | undefined>(
  undefined,
);

// 로그인 두 폼 + 사이드바 + 라우트 가드가 공통으로 사용하는 얇은 훅
export const useRole = (): RoleContextValue => {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return ctx;
};
