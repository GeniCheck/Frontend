import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAuthControllerGetMe,
  getAuthControllerGetMeQueryKey,
} from "@/api/generated/endpoints/auth/auth";
import {
  RoleContext,
  ROLE_STORAGE_KEY,
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
  COMPANY_CODE_STORAGE_KEY,
  readStoredRole,
} from "./roleContext";
import type { Role, SessionTokens } from "./roleContext";

interface MeResponse {
  email?: string;
  name?: string;
  representativeName?: string;
  companyName?: string;
}

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<Role | null>(readStoredRole);
  const queryClient = useQueryClient();

  const { data: me } = useAuthControllerGetMe<MeResponse | undefined>({
    query: { enabled: role !== null },
  });
  const displayName =
    me?.representativeName || me?.name || me?.companyName || null;

  const setSession = useCallback(
    (next: Role, tokens: SessionTokens) => {
      setRoleState(next);
      window.localStorage.setItem(ROLE_STORAGE_KEY, next);
      window.localStorage.setItem(
        ACCESS_TOKEN_STORAGE_KEY,
        tokens.accessToken,
      );
      window.localStorage.setItem(
        REFRESH_TOKEN_STORAGE_KEY,
        tokens.refreshToken,
      );
      // 이전 계정의 /auth/me 캐시가 새 로그인에 남아 보이지 않도록 비운다.
      queryClient.removeQueries({ queryKey: getAuthControllerGetMeQueryKey() });
    },
    [queryClient],
  );

  const clearSession = useCallback(() => {
    setRoleState(null);
    window.localStorage.removeItem(ROLE_STORAGE_KEY);
    window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    window.localStorage.removeItem(COMPANY_CODE_STORAGE_KEY);
    queryClient.removeQueries({ queryKey: getAuthControllerGetMeQueryKey() });
  }, [queryClient]);

  const value = useMemo(
    () => ({ role, displayName, setSession, clearSession }),
    [role, displayName, setSession, clearSession],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};
