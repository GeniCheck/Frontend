import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 z-50 hidden h-screen w-[260px] flex-col justify-between border-r border-gray-200 bg-white p-6 shadow-sm md:flex">
      <div>
        {/* 로고 헤더 */}
        <div
          onClick={() => navigate("/")}
          className="mb-10 flex cursor-pointer items-center gap-2.5 transition-transform active:scale-95"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#5B50E8] shadow-md shadow-[#5B50E8]/30">
            <i className="ti ti-shield-check text-lg text-white"></i>
          </div>
          <span className="font-bebas text-xl tracking-[1.5px] text-[#1A1A2E]">
            GeniCheck
          </span>
        </div>

        {/* MAIN MENU 그룹 */}
        <div className="space-y-6">
          <div>
            <div className="mb-2.5 px-3 text-left text-[11px] font-bold tracking-wider text-gray-400 uppercase">
              MAIN MENU
            </div>
            <nav className="space-y-1">
              {[
                {
                  name: "Dashboard",
                  icon: "ti-layout-dashboard",
                  path: "/main",
                  badge: null,
                },
                {
                  name: "Verification",
                  icon: "ti-checkbox",
                  path: "/main/verification",
                  badge: "3",
                },
                {
                  name: "Referral",
                  icon: "ti-users",
                  path: "/main/referral",
                  badge: null,
                },
                {
                  name: "AI Reports",
                  icon: "ti-brain",
                  path: "/main/ai-reports",
                  badge: null,
                },
              ].map((item) => {
                // 실시간 브라우저 중첩 주소 포맷과 일치하는 탭 라이트 활성화
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      if (item.path !== "#") navigate(item.path);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-bold transition-all active:scale-[0.98] ${
                      isActive
                        ? "rounded-l-none border-l-4 border-[#5B50E8] bg-[#5B50E8]/10 pl-2.5 text-[#5B50E8]"
                        : "text-[#4B5563] hover:bg-gray-50 hover:text-[#1A1A2E]"
                    }`}
                  >
                    <i
                      className={`ti ${item.icon} text-base ${isActive ? "text-[#5B50E8]" : ""}`}
                    />
                    <span className="flex-1 text-left">{item.name}</span>
                    {item.badge && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* OTHER 그룹 */}
          <div>
            <div className="mb-2.5 px-3 text-left text-[11px] font-bold tracking-wider text-gray-400 uppercase">
              OTHER
            </div>
            <nav className="space-y-1">
              {[
                {
                  name: "Support",
                  icon: "ti-help-circle",
                  path: "/main/support",
                },
                { name: "Credits", icon: "ti-coin", path: "/main/credits" },
              ].map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      if (item.path) navigate(item.path);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-bold transition-all active:scale-[0.98] ${
                      isActive
                        ? "rounded-l-none border-l-4 border-[#5B50E8] bg-[#5B50E8]/10 pl-2.5 text-[#5B50E8]"
                        : "text-[#4B5563] hover:bg-gray-50 hover:text-[#1A1A2E]"
                    }`}
                  >
                    <i
                      className={`ti ${item.icon} text-base ${isActive ? "text-[#5B50E8]" : ""}`}
                    />
                    <span className="text-left">{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* 최하단 사용자 프로필 */}
      <div className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-2 transition-all hover:bg-gray-100/70 active:scale-95">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#5B50E8] text-xs font-bold text-white shadow-md">
          ES
        </div>
        <div className="min-w-0 flex-1 text-left">
          <div className="truncate text-xs font-black">Elizabeth Stone</div>
          <span className="mt-0.5 inline-block rounded border border-[#FEBC2E]/30 bg-[#FFFBEB] px-1.5 py-0.5 text-[9px] font-black tracking-tighter text-[#F59E0B]">
            Master Account
          </span>
        </div>
        <i className="ti ti-selector text-sm text-gray-400" />
      </div>
    </aside>
  );
};

export default Sidebar;
