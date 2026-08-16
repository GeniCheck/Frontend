import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanySignupForm from "../../components/auth/CompanySignupForm";
import ApplicantSignupForm from "../../components/auth/ApplicantSignupForm";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"selection" | "company" | "applicant">(
    "selection",
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#F9FAFB] font-sans text-[#1A1A2E]">
      {/* 1. 상단 네비게이션 바 */}
      <nav className="fixed top-0 z-50 flex h-[68px] w-full items-center border-b border-gray-100 bg-white/80 px-8 backdrop-blur-md md:px-16">
        <div
          className="flex cursor-pointer items-center gap-2.5"
          onClick={() => navigate("/")}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B50E8] to-[#8B5CF6] shadow-lg">
            <i className="ti ti-shield-check text-xl text-white"></i>
          </div>
          <span className="font-bebas text-[22px] tracking-[2px]">
            GeniCheck
          </span>
        </div>
      </nav>

      {/* 2. 메인 컨텐츠 영역 */}
      <main className="flex min-h-screen items-center justify-center px-8 pt-32 pb-20">
        {step === "selection" ? (
          /* [유형 선택 단계] */
          <div className="animate-in fade-in w-full max-w-4xl text-center duration-500">
            <h1 className="font-bebas mb-4 text-[48px] text-[#1A1A2E]">
              어떤 파트너인가요?
            </h1>
            <p className="mb-16 text-lg text-[#4B5563]">
              GeniCheck과 함께할 당신의 여정을 선택하세요.
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              {/* 기업 회원 선택 카드 */}
              <button
                onClick={() => setStep("company")}
                className="group relative overflow-hidden rounded-[32px] border border-gray-100 bg-white p-10 text-left shadow-sm transition-all duration-500 hover:border-[#5B50E8]/30 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#5B50E8]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF0FF] text-3xl text-[#5B50E8] transition-transform group-hover:scale-110">
                  <i className="ti ti-building-community"></i>
                </div>
                <h3 className="mb-3 text-2xl font-black transition-colors group-hover:text-[#5B50E8]">
                  기업 회원
                </h3>
                <p className="leading-relaxed text-[#4B5563]">
                  우리 회사만의 HR 신뢰 인프라를 구축하고 검증된 인재를
                  만나보세요.
                </p>
              </button>

              {/* 지원자 회원 선택 카드 */}
              <button
                onClick={() => setStep("applicant")}
                className="group relative overflow-hidden rounded-[32px] border border-gray-100 bg-white p-10 text-left shadow-sm transition-all duration-500 hover:border-[#10B981]/30 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ECFDF5] text-3xl text-[#10B981] transition-transform group-hover:scale-110">
                  <i className="ti ti-user-star"></i>
                </div>
                <h3 className="mb-3 text-2xl font-black transition-colors group-hover:text-[#10B981]">
                  지원자 회원
                </h3>
                <p className="leading-relaxed text-[#4B5563]">
                  나의 업무 역량을 데이터로 증명하고 더 나은 조건의 스카웃을
                  경험하세요.
                </p>
              </button>
            </div>
          </div>
        ) : (
          /* [회원가입 폼 단계] */
          <div className="animate-in zoom-in-95 w-full max-w-[500px] rounded-[32px] border border-gray-100 bg-white p-10 shadow-xl shadow-gray-200/50 duration-500">
            <button
              onClick={() => setStep("selection")}
              className="mb-8 flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#1A1A2E]"
            >
              <i className="ti ti-arrow-left"></i> 돌아가기
            </button>

            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-black">
                {step === "company" ? "기업 회원가입" : "지원자 회원가입"}
              </h2>
              {/* 테마 컬러 변경: 기업은 보라색, 지원자는 초록색 */}
              <div
                className={`h-1 w-16 rounded-full ${step === "company" ? "bg-[#5B50E8]" : "bg-[#10B981]"}`}
              />
            </div>

            {/* 폼 렌더링 */}
            {step === "company" ? (
              <CompanySignupForm />
            ) : (
              <ApplicantSignupForm />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SignupPage;
