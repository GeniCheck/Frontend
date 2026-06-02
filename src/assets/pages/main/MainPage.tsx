import React from "react";
import { Outlet } from "react-router-dom"; // 서브 페이지(알맹이)들을 갈아끼우기 위한 아웃렛
import Sidebar from "../../components/layout/Sidebar"; // 폴더 깊이에 맞게 상위 이동 경로 보정 완료

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-[#F3F4F6] text-[#1A1A2E] font-sans antialiased overflow-x-hidden selection:bg-[#5B50E8]/20">
      {/* ─── [공통 레이아웃] 사이드바 렌더링 (메뉴를 클릭해도 새로 마운트되지 않고 고정됨) ─── */}
      <Sidebar />

      {/* ─── [가변 콘텐트 구역] 주소에 따라 Dashboard, Verification, Referral 등이 교체되는 싱크홀 ─── */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
