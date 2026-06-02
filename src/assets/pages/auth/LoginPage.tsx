import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직 처리 구역 (추후 API 연동)
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="min-h-screen flex bg-[#F9FAFB] text-[#1A1A2E] font-sans selection:bg-[#5B50E8]/20">
      {/* ─── 좌측: 브랜드 비주얼 배너 (데스크톱 전용) ─── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#5B50E8] via-[#8B5CF6] to-[#FAFAFF] relative items-center justify-center p-12 overflow-hidden">
        {/* 은은한 배경 무늬 및 블롭 효과 */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-white/10 blur-[80px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-[#F59E0B]/10 blur-[80px] rounded-full" />

        <div className="max-w-md text-white text-left relative z-10">
          {/* 로고 마크 클릭 시 홈으로 이동 */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 mb-16 cursor-pointer group w-fit"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-black/10 group-hover:rotate-[-8deg] transition-transform">
              <i className="ti ti-shield-check text-[#5B50E8] text-2xl"></i>
            </div>
            <span className="font-bebas text-[26px] tracking-[2px] text-white opacity-90">
              GeniCheck
            </span>
          </div>

          <h2 className="text-4xl font-black leading-tight mb-6 tracking-tight">
            직원의 진짜 실력,
            <br />
            데이터로 신뢰를 연결합니다
          </h2>

          <p className="text-white/80 text-sm leading-relaxed mb-12">
            대한민국 최초 HR 신용 평가 플랫폼 GeniCheck에서 선언과 검증 기반의
            스마트한 데이터 인프라를 경험해보세요.
          </p>

          {/* 미니 대시보드 그래픽 카드 */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[11px] font-bold tracking-wider text-white/70 uppercase">
                HR CREDIT DASHBOARD
              </span>
              <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-white/90">
                <span>데이터 검증 완료율</span>
                <span className="font-bold">85%</span>
              </div>
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: "85%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 우측: 로그인 폼 섹션 ─── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 md:px-16 lg:px-24 bg-white relative">
        {/* 모바일 화면용 탑 로고 바 */}
        <div
          onClick={() => navigate("/")}
          className="flex lg:hidden items-center gap-2 absolute top-6 left-6 cursor-pointer"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-[#5B50E8] to-[#8B5CF6] rounded-lg flex items-center justify-center shadow-md">
            <i className="ti ti-shield-check text-white text-base"></i>
          </div>
          <span className="font-bebas text-xl tracking-[1px]">GeniCheck</span>
        </div>

        <div className="w-full max-w-md mx-auto text-left">
          {/* 타이틀 및 환영 문구 */}
          <h3 className="text-3xl font-black text-[#1A1A2E] tracking-tight mb-2">
            돌아오신 것을 환영합니다!
          </h3>
          <p className="text-xs text-[#4B5563] mb-8 font-medium">
            GeniCheck 기업 통합 관리 시스템에 로그인해 주세요.
          </p>

          {/* 간편 SNS 로그인 버튼 */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-xs font-bold text-[#4B5563] bg-white hover:bg-gray-50 transition-colors shadow-sm">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.83 2.97c.9-2.7 3.41-4.49 6.78-4.49z"
                />
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.43h6.44c-.28 1.48-1.12 2.74-2.38 3.58l3.71 2.88c2.17-2 3.42-4.94 3.42-8.55z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.22 14.77c-.23-.69-.36-1.43-.36-2.2s.13-1.51.36-2.2L1.39 7.4C.5 9.18 0 11.16 0 13.2s.5 4.02 1.39 5.8l3.83-2.97z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.71-2.88c-1.03.69-2.35 1.1-4.25 1.1-3.37 0-5.88-1.79-6.78-4.49L1.39 16.8C3.37 20.69 7.35 23 12 23z"
                />
              </svg>
              Google 로그인
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-xs font-bold text-[#4B5563] bg-white hover:bg-gray-50 transition-colors shadow-sm">
              <i className="ti ti-brand-linkedin text-blue-600 text-base" />
              LinkedIn 로그인
            </button>
          </div>

          {/* 분할선 */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-[1px] bg-gray-100" />
            <span className="text-[11px] text-[#9CA3AF] font-bold tracking-wider uppercase">
              OR EMAIL
            </span>
            <div className="flex-1 h-[1px] bg-gray-100" />
          </div>

          {/* 본 폼 인터페이스 */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 이메일 주소 인풋 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#4B5563] tracking-wide">
                이메일 주소
              </label>
              <div className="relative">
                <i className="ti ti-mail absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B50E8] focus:ring-1 focus:ring-[#5B50E8] transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* 비밀번호 인풋 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[#4B5563] tracking-wide">
                  비밀번호
                </label>
                <a
                  href="#"
                  className="text-xs font-bold text-[#5B50E8] hover:underline"
                >
                  비밀번호 찾기
                </a>
              </div>
              <div className="relative">
                <i className="ti ti-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B50E8] focus:ring-1 focus:ring-[#5B50E8] transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* 로그인 상태 유지 체크박스 */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#5B50E8] focus:ring-[#5B50E8]"
                />
                <span className="text-xs font-medium text-[#4B5563]">
                  로그인 상태 유지
                </span>
              </label>
            </div>

            {/* 로그인 메인 버튼 */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#5B50E8] to-[#8B5CF6] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#5B50E8]/20 hover:opacity-95 hover:translate-y-[-1px] transition-all mt-4"
            >
              시스템 로그인
            </button>
          </form>

          {/* 하단 회원가입 유도 링크 */}
          <div className="mt-8 text-center text-xs text-[#4B5563]">
            아직 기업 회원이 아니신가요?{" "}
            <span className="text-[#5B50E8] font-bold cursor-pointer hover:underline">
              무료로 계정 만들기
            </span>
          </div>
        </div>

        {/* 최하단 돌아가기 버튼 */}
        <div
          onClick={() => navigate("/")}
          className="absolute bottom-6 right-6 flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-[#5B50E8] cursor-pointer transition-colors"
        >
          <i className="ti ti-arrow-back text-base" />
          랜딩 페이지로 돌아가기
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
