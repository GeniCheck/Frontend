import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanySignupForm from "../../components/auth/CompanySignupForm";
import ApplicantSignupForm from "../../components/auth/ApplicantSignupForm";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  // 명시적으로 'selection'을 초기값으로 설정
  const [step, setStep] = useState<"selection" | "company" | "applicant">(
    "selection",
  );

  // 1. 유형 선택 화면
  if (step === "selection") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#F9FAFB] font-sans">
        <h1 className="text-3xl font-black text-[#1A1A2E] mb-4">
          어떤 유형으로 가입하시겠어요?
        </h1>
        <p className="text-gray-500 mb-12">
          사용자 유형을 선택하면 가입 페이지로 이동합니다.
        </p>

        <div className="flex gap-6 w-full max-w-2xl">
          <button
            onClick={() => setStep("company")}
            className="flex-1 p-10 bg-white border-2 border-gray-200 rounded-3xl hover:border-[#5B50E8] hover:shadow-xl transition-all text-xl font-bold text-[#1A1A2E]"
          >
            🏢 기업 회원으로 시작
            <p className="text-sm font-normal text-gray-400 mt-2">
              사업자 인증 및 HR 대시보드
            </p>
          </button>

          <button
            onClick={() => setStep("applicant")}
            className="flex-1 p-10 bg-white border-2 border-gray-200 rounded-3xl hover:border-[#5B50E8] hover:shadow-xl transition-all text-xl font-bold text-[#1A1A2E]"
          >
            👤 지원자/직원으로 시작
            <p className="text-sm font-normal text-gray-400 mt-2">
              내 역량 데이터 관리 및 스카웃
            </p>
          </button>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-12 text-gray-400 hover:text-[#5B50E8] text-sm font-bold"
        >
          ← 메인으로 돌아가기
        </button>
      </div>
    );
  }

  // 2. 선택 후 가입 폼 렌더링
  return (
    <div className="min-h-screen bg-white p-8">
      <button
        onClick={() => setStep("selection")}
        className="text-gray-400 hover:text-[#1A1A2E] font-bold mb-8"
      >
        ← 유형 다시 선택
      </button>

      <div className="max-w-[600px] mx-auto">
        {step === "company" ? <CompanySignupForm /> : <ApplicantSignupForm />}
      </div>
    </div>
  );
};

export default SignupPage;
