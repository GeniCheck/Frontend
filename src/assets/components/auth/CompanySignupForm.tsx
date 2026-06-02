import React, { useState } from "react";

const CompanySignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    businessNumber: "",
    representativeName: "",
    phone: "",
    email: "",
    password: "",
    startDate: new Date().toISOString(), // 명세서 요구 필드
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanySignup = async () => {
    try {
      const response = await fetch("/auth/company/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("기업 회원가입이 완료되었습니다.");
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. 기업 정보 입력 섹션 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h4 className="text-xs font-bold text-gray-400 uppercase mb-4">
          기업 정보
        </h4>
        <div className="space-y-4">
          <input
            name="companyName"
            onChange={handleInputChange}
            placeholder="기업명"
            className="w-full px-4 py-3 border rounded-xl text-sm"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              name="businessNumber"
              onChange={handleInputChange}
              placeholder="사업자 등록번호 (000-00-00000)"
              className="px-4 py-3 border rounded-xl text-sm"
            />
            <input
              name="representativeName"
              onChange={handleInputChange}
              placeholder="대표자명"
              className="px-4 py-3 border rounded-xl text-sm"
            />
          </div>
        </div>
      </div>

      {/* 2. 계정 및 인증 섹션 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h4 className="text-xs font-bold text-gray-400 uppercase mb-4">
          계정 설정
        </h4>
        <div className="space-y-4">
          <input
            name="phone"
            onChange={handleInputChange}
            placeholder="대표 휴대폰 번호 (010-0000-0000)"
            className="w-full px-4 py-3 border rounded-xl text-sm"
          />
          <input
            name="email"
            onChange={handleInputChange}
            placeholder="기업 이메일"
            className="w-full px-4 py-3 border rounded-xl text-sm"
          />
          <input
            name="password"
            type="password"
            onChange={handleInputChange}
            placeholder="비밀번호 (8자 이상)"
            className="w-full px-4 py-3 border rounded-xl text-sm"
          />
        </div>
      </div>

      {/* 3. 제출 버튼 */}
      <button
        onClick={handleCompanySignup}
        className="w-full py-4 bg-gradient-to-r from-[#5B50E8] to-[#8B5CF6] text-white rounded-xl font-bold shadow-lg shadow-[#5B50E8]/20"
      >
        기업 회원가입 완료
      </button>
    </div>
  );
};

export default CompanySignupForm;
