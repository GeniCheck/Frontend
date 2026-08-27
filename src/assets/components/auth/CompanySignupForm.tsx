import React, { useState } from "react";

const CompanySignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    businessNumber: "",
    representativeName: "",
    phone: "",
    email: "",
    password: "",
    startDate: new Date().toISOString(),
  });

  const inputClass =
    "w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm transition-all duration-300 focus:bg-white focus:border-[#5B50E8] focus:ring-4 focus:ring-[#5B50E8]/10 outline-none";

  return (
    <div className="animate-in slide-in-from-bottom-4 space-y-8 duration-500">
      <div className="space-y-6">
        <input
          name="companyName"
          onChange={(e) =>
            setFormData({ ...formData, companyName: e.target.value })
          }
          placeholder="기업 이름을 알려주세요"
          className={inputClass}
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="businessNumber"
            onChange={(e) =>
              setFormData({ ...formData, businessNumber: e.target.value })
            }
            placeholder="사업자 번호"
            className={inputClass}
          />
          <input
            name="representativeName"
            onChange={(e) =>
              setFormData({ ...formData, representativeName: e.target.value })
            }
            placeholder="대표님 성함"
            className={inputClass}
          />
        </div>
        <input
          name="phone"
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="대표 연락처"
          className={inputClass}
        />
        <input
          name="email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="기업용 이메일"
          className={inputClass}
        />
        <input
          name="password"
          type="password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="비밀번호를 설정해주세요"
          className={inputClass}
        />
      </div>

      <button className="w-full rounded-2xl bg-[#5B50E8] py-4 font-bold text-white shadow-xl shadow-[#5B50E8]/30 transition-all hover:bg-[#4a42c4] active:scale-[0.98]">
        기업 회원가입 완료
      </button>
    </div>
  );
};
export default CompanySignupForm;
