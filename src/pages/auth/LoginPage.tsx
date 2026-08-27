import React from "react";
import { useNavigate } from "react-router-dom";

interface RoleOption {
  key: "ceo" | "hr";
  path: string;
  icon: string;
  title: string;
  desc: string;
  hint: string;
  iconBox: string;
  hoverBorder: string;
  hoverText: string;
  overlay: string;
}

// 대표 = 보라색 테마, 인사팀장 = 앰버색 테마 (SignupPage 유형 선택과 톤 통일)
const ROLE_OPTIONS: RoleOption[] = [
  {
    key: "ceo",
    path: "/login/ceo",
    icon: "ti-crown",
    title: "대표",
    desc: "전체 페이지를 이용합니다. 본인 이메일로 받은 인증번호로 로그인합니다.",
    hint: "ID · PW + 본인 이메일 인증",
    iconBox: "bg-brand-light text-brand",
    hoverBorder: "hover:border-brand/30",
    hoverText: "group-hover:text-brand",
    overlay: "from-brand/5",
  },
  {
    key: "hr",
    path: "/login/hr",
    icon: "ti-users",
    title: "인사팀장",
    desc: "인재 추천 게시판을 이용합니다. 대표님께 전달받은 인증번호로 로그인합니다.",
    hint: "ID · PW + 대표 전달 인증번호",
    iconBox: "bg-accent-light text-accent",
    hoverBorder: "hover:border-accent/30",
    hoverText: "group-hover:text-accent",
    overlay: "from-accent/5",
  },
];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-text1 min-h-screen overflow-hidden font-sans">
      {/* 1. 상단 네비게이션 바 */}
      <nav className="fixed top-0 z-50 flex h-17 w-full items-center border-b border-gray-100 bg-white/80 px-8 backdrop-blur-md md:px-16">
        <div
          className="flex cursor-pointer items-center gap-2.5"
          onClick={() => navigate("/")}
        >
          <div className="bg-brand shadow-brand/30 flex h-9 w-9 items-center justify-center rounded-xl shadow-lg">
            <i className="ti ti-shield-check text-xl text-white"></i>
          </div>
          <span className="text-[22px] font-black tracking-[2px]">
            GeniCheck
          </span>
        </div>
      </nav>

      {/* 2. 메인 컨텐츠 영역 */}
      <main className="flex min-h-screen items-center justify-center px-8 pt-32 pb-20">
        <div className="animate-in fade-in w-full max-w-4xl text-center duration-500">
          <h1 className="text-text1 mb-4 text-[34px] font-black tracking-tight">
            어떻게 로그인하시나요?
          </h1>
          <p className="text-text2 mb-16 text-lg">
            계정 유형을 선택하면 맞는 인증 방식으로 안내해 드려요.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {ROLE_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => navigate(opt.path)}
                className={`group relative overflow-hidden rounded-[32px] border border-gray-100 bg-white p-10 text-left shadow-sm transition-all duration-500 hover:shadow-2xl ${opt.hoverBorder}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity group-hover:opacity-100 ${opt.overlay}`}
                />
                <div
                  className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl transition-transform group-hover:scale-110 ${opt.iconBox}`}
                >
                  <i className={`ti ${opt.icon}`}></i>
                </div>
                <h3
                  className={`mb-3 text-2xl font-black transition-colors ${opt.hoverText}`}
                >
                  {opt.title}
                </h3>
                <p className="text-text2 mb-6 leading-relaxed">{opt.desc}</p>
                <span className="text-text3 inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-bold">
                  <i className="ti ti-key text-sm" />
                  {opt.hint}
                </span>
              </button>
            ))}
          </div>

          {/* 하단 회원가입 유도 */}
          <p className="text-text2 mt-14 text-sm">
            아직 GeniCheck 계정이 없으신가요?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-brand cursor-pointer font-bold hover:underline"
            >
              기업 회원가입
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
