import { createContext, useContext } from "react";

// 로그인한 계정의 역할. 로그인 전에는 null.
export type Role = "ceo" | "hr";

export interface RoleContextValue {
  role: Role | null;
  setRole: (role: Role) => void;
  clearRole: () => void;
}

export const ROLE_STORAGE_KEY = "genicheck_role";

// localStorage에서 초기 역할을 복원 (새로고침 / 직접 URL 진입 대응)
export const readStoredRole = (): Role | null => {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem(ROLE_STORAGE_KEY);
  return saved === "ceo" || saved === "hr" ? saved : null;
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
