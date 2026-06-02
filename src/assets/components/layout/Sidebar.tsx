import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-[260px] h-screen bg-white border-r border-gray-200 fixed top-0 left-0 z-50 justify-between p-6 shadow-sm">
      <div>
        {/* 로고 헤더 */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 mb-10 cursor-pointer active:scale-95 transition-transform"
        >
          <div className="w-8 h-8 bg-[#5B50E8] rounded-xl flex items-center justify-center shadow-md shadow-[#5B50E8]/30">
            <i className="ti ti-shield-check text-white text-lg"></i>
          </div>
          <span className="font-bebas text-xl tracking-[1.5px] text-[#1A1A2E]">
            GeniCheck
          </span>
        </div>

        {/* MAIN MENU 그룹 */}
        <div className="space-y-6">
          <div>
            <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase px-3 mb-2.5 text-left">
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
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all active:scale-[0.98] ${
                      isActive
                        ? "bg-[#5B50E8]/10 text-[#5B50E8] border-l-4 border-[#5B50E8] rounded-l-none pl-2.5"
                        : "text-[#4B5563] hover:bg-gray-50 hover:text-[#1A1A2E]"
                    }`}
                  >
                    <i
                      className={`ti ${item.icon} text-base ${isActive ? "text-[#5B50E8]" : ""}`}
                    />
                    <span className="flex-1 text-left">{item.name}</span>
                    {item.badge && (
                      <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
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
            <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase px-3 mb-2.5 text-left">
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
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all active:scale-[0.98] ${
                      isActive
                        ? "bg-[#5B50E8]/10 text-[#5B50E8] border-l-4 border-[#5B50E8] rounded-l-none pl-2.5"
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
      <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100/70 transition-all cursor-pointer active:scale-95">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#5B50E8] flex items-center justify-center font-bold text-white text-xs shadow-md">
          ES
        </div>
        <div className="text-left flex-1 min-w-0">
          <div className="text-xs font-black truncate">Elizabeth Stone</div>
          <span className="inline-block mt-0.5 px-1.5 py-0.5 bg-[#FFFBEB] text-[#F59E0B] border border-[#FEBC2E]/30 rounded text-[9px] font-black tracking-tighter">
            Master Account
          </span>
        </div>
        <i className="ti ti-selector text-gray-400 text-sm" />
      </div>
    </aside>
  );
};

export default Sidebar;
