import React, { useState } from "react";

const ApplicantSignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async () => {
    // API 명세서: POST /auth/applicant/signup
    await fetch("/auth/applicant/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  };

  // 초록색 테마를 위한 공통 스타일
  const inputClass =
    "w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl transition-all duration-300 outline-none focus:bg-white focus:border-[#10B981] focus:ring-4 focus:ring-[#10B981]/10";

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-[#1A1A2E]">반갑습니다!</h2>
        <p className="text-gray-500">
          간편하게 가입하고 당신의 역량을 증명하세요.
        </p>
      </div>

      <div className="space-y-4">
        <input
          className={inputClass}
          placeholder="이름을 입력해주세요"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          className={inputClass}
          placeholder="이메일을 입력해주세요"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          className={inputClass}
          type="password"
          placeholder="비밀번호를 설정해주세요"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-4 bg-[#10B981] hover:bg-[#059669] active:scale-[0.98] transition-all text-white rounded-2xl font-bold shadow-lg shadow-[#10B981]/20"
      >
        지원자 가입 완료
      </button>
    </div>
  );
};

export default ApplicantSignupForm;
