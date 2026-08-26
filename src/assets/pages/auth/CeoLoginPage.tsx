import React from "react";
import { useNavigate } from "react-router-dom";

// Step 3에서 전체 구현 예정 (ID/PW → 본인 이메일 인증번호 6자리 → role="ceo")
const CeoLoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] px-6 font-sans text-[#1A1A2E]">
      <div className="w-full max-w-md rounded-[32px] border border-gray-100 bg-white p-10 text-center shadow-xl">
        <h1 className="text-2xl font-black">대표 로그인</h1>
        <p className="mt-2 text-sm text-[#4B5563]">구현 준비 중입니다.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 text-sm font-bold text-[#5B50E8] hover:underline"
        >
          ← 역할 선택으로
        </button>
      </div>
    </div>
  );
};

export default CeoLoginPage;
