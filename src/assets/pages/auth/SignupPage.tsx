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
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-[#1A1A2E] overflow-hidden">
      {/* 1. 상단 네비게이션 바 */}
      <nav className="h-[68px] flex items-center px-8 md:px-16 bg-white/80 backdrop-blur-md border-b border-gray-100 fixed w-full top-0 z-50">
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 bg-gradient-to-br from-[#5B50E8] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg">
            <i className="ti ti-shield-check text-white text-xl"></i>
          </div>
          <span className="font-bebas text-[22px] tracking-[2px]">
            GeniCheck
          </span>
        </div>
      </nav>

      {/* 2. 메인 컨텐츠 영역 */}
      <main className="pt-32 pb-20 px-8 flex justify-center items-center min-h-screen">
        {step === "selection" ? (
          /* [유형 선택 단계] */
          <div className="max-w-4xl w-full text-center animate-in fade-in duration-500">
            <h1 className="text-[48px] font-bebas mb-4 text-[#1A1A2E]">
              어떤 파트너인가요?
            </h1>
            <p className="text-[#4B5563] mb-16 text-lg">
              GeniCheck과 함께할 당신의 여정을 선택하세요.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* 기업 회원 선택 카드 */}
              <button
                onClick={() => setStep("company")}
                className="relative group p-10 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-[#5B50E8]/30 transition-all duration-500 text-left overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#5B50E8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-16 h-16 bg-[#EEF0FF] text-[#5B50E8] rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
                  <i className="ti ti-building-community"></i>
                </div>
                <h3 className="text-2xl font-black mb-3 group-hover:text-[#5B50E8] transition-colors">
                  기업 회원
                </h3>
                <p className="text-[#4B5563] leading-relaxed">
                  우리 회사만의 HR 신뢰 인프라를 구축하고 검증된 인재를
                  만나보세요.
                </p>
              </button>

              {/* 지원자 회원 선택 카드 */}
              <button
                onClick={() => setStep("applicant")}
                className="relative group p-10 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-[#10B981]/30 transition-all duration-500 text-left overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-16 h-16 bg-[#ECFDF5] text-[#10B981] rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
                  <i className="ti ti-user-star"></i>
                </div>
                <h3 className="text-2xl font-black mb-3 group-hover:text-[#10B981] transition-colors">
                  지원자 회원
                </h3>
                <p className="text-[#4B5563] leading-relaxed">
                  나의 업무 역량을 데이터로 증명하고 더 나은 조건의 스카웃을
                  경험하세요.
                </p>
              </button>
            </div>
          </div>
        ) : (
          /* [회원가입 폼 단계] */
          <div className="w-full max-w-[500px] bg-white p-10 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/50 animate-in zoom-in-95 duration-500">
            <button
              onClick={() => setStep("selection")}
              className="text-gray-400 hover:text-[#1A1A2E] text-sm font-bold mb-8 flex items-center gap-2"
            >
              <i className="ti ti-arrow-left"></i> 돌아가기
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-black mb-2">
                {step === "company" ? "기업 회원가입" : "지원자 회원가입"}
              </h2>
              {/* 테마 컬러 변경: 기업은 보라색, 지원자는 초록색 */}
              <div
                className={`w-16 h-1 rounded-full ${step === "company" ? "bg-[#5B50E8]" : "bg-[#10B981]"}`}
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
