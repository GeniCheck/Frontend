import React from "react";
import { useNavigate } from "react-router-dom";
import CompanySignupForm from "../../components/auth/CompanySignupForm";

// 회원가입은 기업(대표) 계정만 지원. 유형 선택 화면 없이 기업 회원가입 폼을 바로 노출한다.
const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden bg-[#F9FAFB] font-sans text-[#1A1A2E]">
      {/* 1. 상단 네비게이션 바 */}
      <nav className="fixed top-0 z-50 flex h-[68px] w-full items-center border-b border-gray-100 bg-white/80 px-8 backdrop-blur-md md:px-16">
        <div
          className="flex cursor-pointer items-center gap-2.5"
          onClick={() => navigate("/")}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5B50E8] shadow-lg shadow-[#5B50E8]/30">
            <i className="ti ti-shield-check text-xl text-white"></i>
          </div>
          <span className="font-bebas text-[22px] tracking-[2px]">
            GeniCheck
          </span>
        </div>
      </nav>

      {/* 2. 메인 컨텐츠 영역 */}
      <main className="flex min-h-screen items-center justify-center px-8 pt-32 pb-20">
        <div className="animate-in zoom-in-95 w-full max-w-[500px] rounded-[32px] border border-gray-100 bg-white p-10 shadow-xl shadow-gray-200/50 duration-500">
          <button
            onClick={() => navigate("/")}
            className="mb-8 flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#1A1A2E]"
          >
            <i className="ti ti-arrow-left"></i> 홈으로
          </button>

          <div className="mb-8">
            <span className="mb-3 flex w-fit items-center gap-1.5 rounded-full bg-[#EEF0FF] px-3 py-1 text-xs font-bold text-[#5B50E8]">
              <i className="ti ti-crown text-[13px]" />
              대표(사업자 본인) 전용
            </span>
            <h2 className="inline-block border-b-4 border-[#5B50E8] pb-2 text-3xl font-black">
              기업 회원가입
            </h2>
          </div>

          <CompanySignupForm />

          <p className="mt-6 flex items-start gap-2 rounded-xl bg-gray-50 p-3.5 text-xs leading-relaxed text-[#4B5563]">
            <i className="ti ti-info-circle mt-0.5 text-sm text-gray-400" />
            <span>
              인사팀장 계정은 대표가 로그인한 뒤 직접 생성합니다.
              인사팀장·직원은 별도로 회원가입할 수 없어요.
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
