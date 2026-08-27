import React from "react";
import { Outlet } from "react-router-dom"; // 서브 페이지(알맹이)들을 갈아끼우기 위한 아웃렛
import Sidebar from "@/components/layout/Sidebar";

const MainPage: React.FC = () => {
  return (
    <div className="bg-surface2 text-text1 selection:bg-brand/20 flex min-h-screen overflow-x-hidden font-sans antialiased">
      {/* ─── [공통 레이아웃] 사이드바 렌더링 (메뉴를 클릭해도 새로 마운트되지 않고 고정됨) ─── */}
      <Sidebar />

      {/* ─── [가변 콘텐트 구역] 주소에 따라 Dashboard, Verification, Referral 등이 교체되는 싱크홀 ─── */}
      <div className="flex-1 md:pl-65">
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
