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
      body: JSON.stringify(formData),
    });
  };

  return (
    <div className="max-w-[500px] space-y-6">
      <h2 className="text-2xl font-black">지원자 회원가입</h2>
      <input
        className="w-full p-4 border rounded-xl"
        placeholder="이메일"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        className="w-full p-4 border rounded-xl"
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button
        onClick={handleSubmit}
        className="w-full py-4 bg-[#5B50E8] text-white rounded-xl"
      >
        지원자 가입 완료
      </button>
    </div>
  );
};
export default ApplicantSignupForm;
