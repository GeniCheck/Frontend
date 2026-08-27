import React from "react";
import { Outlet } from "react-router-dom";
import { useRole } from "@/context/roleContext";
import type { Role } from "@/context/roleContext";
import NotFoundPage from "@/pages/error/NotFoundPage";

interface RoleGuardProps {
  allow: Role[];
}

/**
 * 중첩 라우트 가드.
 * - 역할이 명시적으로 허용 목록에 없으면 404/403 화면 노출
 * - 역할이 null(비로그인, 랜딩의 "대시보드 미리보기" 등)이면 통과시킴
 */
const RoleGuard: React.FC<RoleGuardProps> = ({ allow }) => {
  const { role } = useRole();

  if (role !== null && !allow.includes(role)) {
    return <NotFoundPage forbidden />;
  }

  return <Outlet />;
};

export default RoleGuard;
