import React from "react";
import { useNavigate } from "react-router-dom";
import CompanySignupForm from "@/components/auth/CompanySignupForm";

// 회원가입은 기업(대표) 계정만 지원. 유형 선택 화면 없이 기업 회원가입 폼을 바로 노출한다.
const SignupPage: React.FC = () => {
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
        <div className="animate-in zoom-in-95 w-full max-w-[500px] rounded-[32px] border border-gray-100 bg-white p-10 shadow-xl shadow-gray-200/50 duration-500">
          <button
            onClick={() => navigate("/")}
            className="hover:text-text1 mb-8 flex items-center gap-2 text-sm font-bold text-gray-400"
          >
            <i className="ti ti-arrow-left"></i> 홈으로
          </button>

          <div className="mb-8">
            <span className="bg-brand-light text-brand mb-3 flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold">
              <i className="ti ti-crown text-sm" />
              대표(사업자 본인) 전용
            </span>
            <h2 className="border-brand inline-block border-b-4 pb-2 text-3xl font-black">
              기업 회원가입
            </h2>
          </div>

          <CompanySignupForm />

          <p className="text-text2 mt-6 flex items-start gap-2 rounded-xl bg-gray-50 p-3.5 text-xs leading-relaxed">
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
