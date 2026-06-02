import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// agreements 상태를 위한 명확한 타입 정의
interface AgreementsType {
  terms: boolean;
  dataShare: boolean;
  marketing: boolean;
  [key: string]: boolean; // 인덱스 시그니처를 추가하여 any 없이 동적 키 접근 허용
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  // 회원가입 페이지 진입 시 스크롤 최상단 리셋
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ─── 스크롤 스파이(Scroll Spy)를 위한 Refs ───
  const sectionRefs = {
    step1: useRef<HTMLDivElement>(null),
    step2: useRef<HTMLDivElement>(null),
    step3: useRef<HTMLDivElement>(null),
    step4: useRef<HTMLDivElement>(null),
  };

  const [currentStep, setCurrentStep] = useState(1);

  // 스크롤 시 현재 어떤 섹션이 화면에 보이는지 감지하는 로직
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      if (
        sectionRefs.step4.current &&
        scrollPosition >= sectionRefs.step4.current.offsetTop
      ) {
        setCurrentStep(4);
      } else if (
        sectionRefs.step3.current &&
        scrollPosition >= sectionRefs.step3.current.offsetTop
      ) {
        setCurrentStep(3);
      } else if (
        sectionRefs.step2.current &&
        scrollPosition >= sectionRefs.step2.current.offsetTop
      ) {
        setCurrentStep(2);
      } else {
        setCurrentStep(1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── 폼 상태 관리 (State) ───
  const [formData, setFormData] = useState({
    companyName: "테크플러스 주식회사",
    businessNumber: "123-45-67890",
    ceoName: "김대표",
    phoneNumber: "010-1234-5678",
    email: "ceo@company.com",
    password: "",
    confirmPassword: "",
  });

  const [otpValues, setOtpValues] = useState(["4", "8", "2", "", "", ""]);
  const [selectedTier, setSelectedTier] = useState<
    "starter" | "business" | "enterprise"
  >("starter");
  const [agreements, setAgreements] = useState<AgreementsType>({
    terms: true,
    dataShare: true,
    marketing: false,
  });

  // 미사용 경고(assigned but never used)를 해결하고 폼 작성이 작동하도록 변경 핸들러 추가
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F9FAFB] text-[#1A1A2E] font-sans selection:bg-[#5B50E8]/20 relative">
      {/* ─── 좌측: 고정 사이드바 ─── */}
      <div className="hidden lg:flex lg:w-[380px] h-screen bg-[#1A1A2E] p-10 flex-col justify-between text-white fixed top-0 left-0 z-50 border-r border-gray-800">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div>
          {/* 상단 로고 (Touchable) */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 mb-16 cursor-pointer group w-fit active:scale-95 transition-transform"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-[#5B50E8] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-[-8deg] transition-transform">
              <i className="ti ti-shield-check text-white text-xl"></i>
            </div>
            <span className="font-bebas text-[22px] tracking-[2px] text-white">
              GeniCheck
            </span>
          </div>

          <h2 className="text-2xl font-black leading-snug tracking-tight mb-4 text-left">
            직원 역량을
            <br />
            데이터로 증명하세요
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed mb-12 text-left">
            입사 시 자기선언, 퇴사 시 검증. GeniCheck는 HR 신뢰 점수를
            객관적으로 산출합니다.
          </p>

          {/* 타임라인 인디케이터 */}
          <div className="space-y-8 relative text-left before:absolute before:bottom-2 before:top-2 before:left-[13px] before:w-[1px] before:bg-gray-800">
            {[
              {
                id: 1,
                label: "기업 정보 입력",
                desc: "기업명, 사업자 등록번호, 대표자명",
              },
              {
                id: 2,
                label: "사업자 인증 & OTP",
                desc: "국세청 API 연동 인증 + 대표 SMS 인증",
              },
              { id: 3, label: "계정 설정", desc: "대표 이메일, 비밀번호 설정" },
              {
                id: 4,
                label: "가입비 결제",
                desc: "1,000,000원 · 3개월 Enterprise 무료",
              },
            ].map((step) => {
              const isCurrent = currentStep === step.id;
              const isPassed = currentStep > step.id;

              return (
                <div
                  key={step.id}
                  className="flex gap-4 relative z-10 items-start transition-all duration-300"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 shrink-0 ${
                      isCurrent
                        ? "bg-[#5B50E8] text-white ring-4 ring-[#5B50E8]/20 scale-110"
                        : isPassed
                          ? "bg-[#10B981] text-white"
                          : "bg-[#2D2D44] text-gray-500"
                    }`}
                  >
                    {isPassed ? (
                      <i className="ti ti-check text-xs font-bold" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="transition-all duration-300">
                    <h4
                      className={`text-xs font-black tracking-wide transition-colors duration-300 ${
                        isCurrent
                          ? "bg-transparent text-white text-sm"
                          : isPassed
                            ? "text-gray-300"
                            : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </h4>
                    <p
                      className={`text-[10px] mt-0.5 whitespace-nowrap transition-colors duration-300 ${
                        isCurrent ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-[10px] text-gray-600 leading-relaxed text-left">
          사업자 등록번호 미인증 기업은 서비스 이용이 불가합니다. 개인 이메일은
          가입이 제한됩니다.
        </div>
      </div>

      {/* ─── 우측: 스크롤링 양식 영역 ─── */}
      <div className="flex-1 lg:pl-[380px] px-6 py-12 md:px-16 lg:px-24 flex justify-center">
        <div className="w-full max-w-[620px] space-y-12 text-left">
          {/* 상단 스티키 탭 가이드 모형 */}
          <div className="flex gap-2 border-b border-gray-100 pb-5 mb-4 sticky top-0 bg-white/80 backdrop-blur-md z-40">
            {["기업 정보", "사업자 인증", "계정 설정", "결제"].map((tab, i) => (
              <span
                key={tab}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  currentStep === i + 1
                    ? "bg-[#ECFDF5] text-[#10B981] border border-[#10B981]/20 scale-105 shadow-sm"
                    : "text-gray-300 bg-gray-50"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>

          {/* ★ 핵심 보정 구역 1: ref 속성에 .current를 제외한 레퍼런스 자체를 전달하여 에러 원천 차단 */}
          <div
            ref={sectionRefs.step1}
            id="section-1"
            className="space-y-6 scroll-mt-24"
          >
            {/* ★ 핵심 보정 구역 2: 중첩되었던 div와 step2 레퍼런스를 분리 독립 마크업 배치 */}
            <div ref={sectionRefs.step2} id="section-2" className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight text-[#1A1A2E]">
                  사업자 인증 & 대표 확인
                </h3>
                <p className="text-xs text-[#4B5563]">
                  국세청 API를 통해 사업자 등록번호를 확인하고, 대표 휴대폰으로
                  SMS 인증을 진행합니다.
                </p>
              </div>

              {/* 기업 정보 입력 카드 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  기업 정보
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#4B5563]">
                    기업명 <span className="text-[#5B50E8]">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    disabled
                    className="w-full px-4 py-3 bg-[#F9FAFB] border border-gray-100 rounded-xl text-sm font-medium text-gray-400 cursor-not-allowed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-[#4B5563]">
                      사업자 등록번호 <span className="text-[#5B50E8]">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="businessNumber"
                        value={formData.businessNumber}
                        disabled
                        className="flex-1 px-4 py-3 bg-[#F9FAFB] border border-gray-100 rounded-xl text-sm font-medium text-gray-400 cursor-not-allowed"
                      />
                      <button
                        type="button"
                        className="px-4 py-3 bg-[#10B981] text-white rounded-xl text-xs font-bold shadow-sm cursor-default active:scale-98 transition-transform"
                      >
                        인증 완료
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#4B5563]">
                      대표자명 <span className="text-[#5B50E8]">*</span>
                    </label>
                    <input
                      type="text"
                      name="ceoName"
                      value={formData.ceoName}
                      disabled
                      className="w-full px-4 py-3 bg-[#F9FAFB] border border-gray-100 rounded-xl text-sm font-medium text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[#F9FAFB] border border-gray-100 rounded-xl">
                  <div className="text-left">
                    <div className="text-xs font-black text-[#1A1A2E]">
                      테크플러스 주식회사{" "}
                      <span className="text-[10px] font-normal text-gray-400 ml-1">
                        사업자 인증이 완료되었습니다.
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      대표자: 김대표 · 업태: 정보통신업
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-white border border-[#10B981]/30 rounded-lg text-[10px] font-bold text-[#10B981]">
                    인증 완료
                  </span>
                </div>
              </div>

              {/* 대표 휴대폰 SMS 인증 카드 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  대표 휴대폰 SMS 인증
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#4B5563]">
                    대표 휴대폰 번호 <span className="text-[#5B50E8]">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="010-1234-5678"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#5B50E8] focus:ring-1 focus:ring-[#5B50E8] outline-none transition-all placeholder:text-gray-300"
                    />
                    <button
                      type="button"
                      className="px-5 py-3 bg-[#5B50E8] text-white rounded-xl text-xs font-bold shadow-md shadow-[#5B50E8]/10 hover:bg-[#493fd1] active:scale-95 transition-all whitespace-nowrap"
                    >
                      인증번호 발송
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-400">
                      010-1234-5678 로 6자리 인증번호를 전송했습니다.
                    </span>
                    <span className="font-bold text-red-500 flex items-center gap-1">
                      <i className="ti ti-alert-circle" />
                      만료
                    </span>
                  </div>

                  <div className="flex justify-center gap-2">
                    {otpValues.map((val, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        maxLength={1}
                        value={val}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        className="w-11 h-13 border border-gray-200 rounded-xl text-center font-black text-lg focus:border-[#5B50E8] focus:ring-2 focus:ring-[#5B50E8]/10 bg-white hover:border-gray-300 outline-none transition-all"
                      />
                    ))}
                  </div>
                  <div className="text-center text-[10px] text-gray-400">
                    번호를 받지 못하셨나요?{" "}
                    <span className="text-[#5B50E8] font-bold cursor-pointer hover:underline active:opacity-70">
                      재발송
                    </span>{" "}
                    · 최대 5회 시도 가능
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3 구역: 계정 설정 */}
          <div
            ref={sectionRefs.step3}
            id="section-3"
            className="space-y-4 scroll-mt-24 pt-4"
          >
            <h4 className="text-lg font-black text-[#1A1A2E] flex items-center gap-2">
              <span className="w-5 h-5 bg-[#5B50E8]/10 text-[#5B50E8] text-xs rounded-md flex items-center justify-center">
                3
              </span>
              계정 비밀번호 설정
            </h4>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#4B5563]">
                  기업 이메일 <span className="text-[#5B50E8]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ceo@company.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#5B50E8] focus:ring-1 focus:ring-[#5B50E8] outline-none transition-all placeholder:text-gray-300"
                />
                <p className="text-[10px] text-gray-400">
                  gmail, naver, daum 등 개인 이메일 도메인은 사용 불가합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#4B5563]">
                    비밀번호 <span className="text-[#5B50E8]">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="8자 이상, 영문+숫자+특수문자"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#5B50E8] focus:ring-1 focus:ring-[#5B50E8] outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#4B5563]">
                    비밀번호 확인 <span className="text-[#5B50E8]">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="비밀번호 재입력"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#5B50E8] focus:ring-1 focus:ring-[#5B50E8] outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* STEP 4 구역: 결제 및 플랜 선택 */}
          <div
            ref={sectionRefs.step4}
            id="section-4"
            className="space-y-4 scroll-mt-24 pt-4"
          >
            <h4 className="text-lg font-black text-[#1A1A2E] flex items-center gap-2">
              <span className="w-5 h-5 bg-[#5B50E8]/10 text-[#5B50E8] text-xs rounded-md flex items-center justify-center">
                4
              </span>
              구독 플랜 및 가입비 결제
            </h4>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5 hover:shadow-md transition-shadow">
              <div className="grid grid-cols-3 gap-2 bg-gray-50 border border-gray-100 rounded-xl p-1.5">
                {[
                  { id: "starter", name: "Starter", price: "290,000원/월" },
                  { id: "business", name: "Business", price: "990,000원/월" },
                  { id: "enterprise", name: "Enterprise", price: "협의" },
                ].map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id as any)}
                    className={`py-2.5 rounded-lg text-center cursor-pointer transition-all flex flex-col items-center justify-center active:scale-95 ${
                      selectedTier === tier.id
                        ? "bg-white border border-gray-200 shadow-sm text-[#5B50E8] font-bold"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <span className="text-xs">{tier.name}</span>
                    <span className="text-[9px] opacity-70 mt-0.5">
                      {tier.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-5 bg-gradient-to-r from-gray-50 to-[#EEF0FF] border border-gray-100 rounded-xl flex justify-between items-center">
                <div className="text-left">
                  <div className="text-[10px] font-black text-gray-400 tracking-wider">
                    최초 가입비 (1회)
                  </div>
                  <div className="text-sm font-black text-[#1A1A2E] mt-1">
                    가입 후 3개월 Enterprise 무료 제공
                  </div>
                </div>
                <span className="font-bebas text-2xl font-black text-[#5B50E8]">
                  1,000,000원
                </span>
              </div>
              <p className="text-[10px] text-gray-400">
                결제 수단: 신용카드 · 계좌이체 · 세금계산서 발행 가능
                (토스페이먼츠 연동)
              </p>
            </div>
          </div>

          {/* 약관 체크박스 구역 */}
          <div className="p-2 space-y-4 text-left border-t border-b border-gray-100 py-6">
            {[
              {
                id: "terms",
                text: "서비스 이용약관 및 개인정보 처리방침에 동의합니다. (필수)",
              },
              {
                id: "dataShare",
                text: "직원 자기선언 데이터의 퇴사 후 역량 검증 및 타 기업 조회에 동의합니다. (필수)",
              },
              {
                id: "marketing",
                text: "마케팅 정보 수신에 동의합니다. (선택)",
              },
            ].map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-3 cursor-pointer select-none group active:opacity-80"
              >
                <input
                  type="checkbox"
                  checked={agreements[item.id]}
                  onChange={(e) =>
                    setAgreements((prev) => ({
                      ...prev,
                      [item.id]: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#5B50E8] focus:ring-[#5B50E8] cursor-pointer"
                />
                <span className="text-xs font-semibold text-[#4B5563] group-hover:text-[#1A1A2E] transition-colors">
                  {item.text}
                </span>
              </label>
            ))}
          </div>

          {/* 최종 제출 버튼 영역 */}
          <div className="pt-2 text-center pb-12">
            <button
              type="button"
              onClick={() => alert("결제 창으로 연결됩니다.")}
              className="w-full py-4 bg-gradient-to-r from-[#5B50E8] to-[#8B5CF6] text-white rounded-xl text-sm font-bold shadow-xl shadow-[#5B50E8]/20 hover:opacity-95 hover:translate-y-[-1px] active:scale-[0.99] active:shadow-inner transition-all duration-150"
            >
              가입비 결제 후 계정 생성
            </button>
            <p className="text-[10px] text-gray-400 mt-3">
              사업자 등록번호 인증 완료 기업만 가입 가능합니다. 결제 완료 즉시
              계정이 활성화됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
