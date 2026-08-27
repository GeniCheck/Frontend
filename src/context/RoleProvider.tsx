import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { RoleContext, ROLE_STORAGE_KEY, readStoredRole } from "./roleContext";
import type { Role } from "./roleContext";

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<Role | null>(readStoredRole);

  const setRole = useCallback((next: Role) => {
    setRoleState(next);
    window.localStorage.setItem(ROLE_STORAGE_KEY, next);
  }, []);

  const clearRole = useCallback(() => {
    setRoleState(null);
    window.localStorage.removeItem(ROLE_STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ role, setRole, clearRole }),
    [role, setRole, clearRole],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};
