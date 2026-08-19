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
    <div className="flex min-h-screen bg-[#F9FAFB] font-sans text-[#1A1A2E] selection:bg-[#5B50E8]/20">
      {/* ─── 좌측: 브랜드 비주얼 배너 (데스크톱 전용) ─── */}
      <div className="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-[#5B50E8] via-[#8B5CF6] to-[#FAFAFF] p-12 lg:flex lg:w-1/2">
        {/* 은은한 배경 무늬 및 블롭 효과 */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute top-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-white/10 blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[350px] w-[350px] rounded-full bg-[#F59E0B]/10 blur-[80px]" />

        <div className="relative z-10 max-w-md text-left text-white">
          {/* 로고 마크 클릭 시 홈으로 이동 */}
          <div
            onClick={() => navigate("/")}
            className="group mb-16 flex w-fit cursor-pointer items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-lg shadow-black/10 transition-transform group-hover:rotate-[-8deg]">
              <i className="ti ti-shield-check text-2xl text-[#5B50E8]"></i>
            </div>
            <span className="font-bebas text-[26px] tracking-[2px] text-white opacity-90">
              GeniCheck
            </span>
          </div>

          <h2 className="mb-6 text-4xl leading-tight font-black tracking-tight">
            직원의 진짜 실력,
            <br />
            데이터로 신뢰를 연결합니다
          </h2>

          <p className="mb-12 text-sm leading-relaxed text-white/80">
            대한민국 최초 HR 신용 평가 플랫폼 GeniCheck에서 선언과 검증 기반의
            스마트한 데이터 인프라를 경험해보세요.
          </p>

          {/* 미니 대시보드 그래픽 카드 */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider text-white/70 uppercase">
                HR CREDIT DASHBOARD
              </span>
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#10B981]" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-white/90">
                <span>데이터 검증 완료율</span>
                <span className="font-bold">85%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: "85%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 우측: 로그인 폼 섹션 ─── */}
      <div className="relative flex w-full flex-col justify-center bg-white px-6 py-12 md:px-16 lg:w-1/2 lg:px-24">
        {/* 모바일 화면용 탑 로고 바 */}
        <div
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 flex cursor-pointer items-center gap-2 lg:hidden"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#5B50E8] to-[#8B5CF6] shadow-md">
            <i className="ti ti-shield-check text-base text-white"></i>
          </div>
          <span className="font-bebas text-xl tracking-[1px]">GeniCheck</span>
        </div>

        <div className="mx-auto w-full max-w-md text-left">
          {/* 타이틀 및 환영 문구 */}
          <h3 className="mb-2 text-3xl font-black tracking-tight text-[#1A1A2E]">
            돌아오신 것을 환영합니다!
          </h3>
          <p className="mb-8 text-xs font-medium text-[#4B5563]">
            GeniCheck 기업 통합 관리 시스템에 로그인해 주세요.
          </p>

          {/* 간편 SNS 로그인 버튼 */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-xs font-bold text-[#4B5563] shadow-sm transition-colors hover:bg-gray-50">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
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
            <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-xs font-bold text-[#4B5563] shadow-sm transition-colors hover:bg-gray-50">
              <i className="ti ti-brand-linkedin text-base text-blue-600" />
              LinkedIn 로그인
            </button>
          </div>

          {/* 분할선 */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-gray-100" />
            <span className="text-[11px] font-bold tracking-wider text-[#9CA3AF] uppercase">
              OR EMAIL
            </span>
            <div className="h-[1px] flex-1 bg-gray-100" />
          </div>

          {/* 본 폼 인터페이스 */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 이메일 주소 인풋 */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wide text-[#4B5563]">
                이메일 주소
              </label>
              <div className="relative">
                <i className="ti ti-mail absolute top-1/2 left-4 -translate-y-1/2 text-base text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 py-3.5 pr-4 pl-11 text-sm transition-all placeholder:text-gray-300 focus:border-[#5B50E8] focus:ring-1 focus:ring-[#5B50E8] focus:outline-none"
                />
              </div>
            </div>

            {/* 비밀번호 인풋 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold tracking-wide text-[#4B5563]">
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
                <i className="ti ti-lock absolute top-1/2 left-4 -translate-y-1/2 text-base text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 py-3.5 pr-4 pl-11 text-sm transition-all placeholder:text-gray-300 focus:border-[#5B50E8] focus:ring-1 focus:ring-[#5B50E8] focus:outline-none"
                />
              </div>
            </div>

            {/* 로그인 상태 유지 체크박스 */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex cursor-pointer items-center gap-2 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#5B50E8] focus:ring-[#5B50E8]"
                />
                <span className="text-xs font-medium text-[#4B5563]">
                  로그인 상태 유지
                </span>
              </label>
            </div>

            {/* 로그인 메인 버튼 */}
            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#5B50E8] to-[#8B5CF6] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#5B50E8]/20 transition-all hover:translate-y-[-1px] hover:opacity-95"
            >
              시스템 로그인
            </button>
          </form>

          {/* 하단 회원가입 유도 링크 */}
          <div className="mt-8 text-center text-xs text-[#4B5563]">
            아직 기업 회원이 아니신가요?{" "}
            <span className="cursor-pointer font-bold text-[#5B50E8] hover:underline">
              무료로 계정 만들기
            </span>
          </div>
        </div>

        {/* 최하단 돌아가기 버튼 */}
        <div
          onClick={() => navigate("/")}
          className="absolute right-6 bottom-6 flex cursor-pointer items-center gap-1.5 text-xs font-bold text-gray-400 transition-colors hover:text-[#5B50E8]"
        >
          <i className="ti ti-arrow-back text-base" />
          랜딩 페이지로 돌아가기
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
