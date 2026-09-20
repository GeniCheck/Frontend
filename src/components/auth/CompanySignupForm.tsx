import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import {
  useAuthControllerRequestCompanySignupOtp,
  useAuthControllerVerifyCompanySignupOtp,
  useAuthControllerVerifyCompanyBusiness,
  useAuthControllerCompanySignup,
} from "@/api/generated/endpoints/auth/auth";
import OtpInput from "./OtpInput";

type Step = "form" | "otp";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,10}$/;
const BUSINESS_NUMBER_REGEX = /^\d{3}-\d{2}-\d{5}$/;
const COMPANY_NAME_REGEX = /^[가-힣a-zA-Z0-9\s]{2,50}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CompanySignupOtpVerifyResponse {
  emailVerificationToken: string;
}
interface CompanyBusinessVerifyResponse {
  businessVerificationToken: string;
}

const extractErrorMessage = (err: unknown, fallback: string): string => {
  if (isAxiosError<{ message?: string }>(err)) {
    return err.response?.data?.message ?? fallback;
  }
  return fallback;
};

const inputClass =
  "w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm transition-all duration-300 focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/10 outline-none";

interface FormFieldProps {
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  errorMessage?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  errorMessage,
}) => (
  <div className="space-y-1.5">
    <input
      name={name}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputClass}
    />
    {value.length > 0 && errorMessage && (
      <p className="text-2xs px-1 font-bold text-red-500">{errorMessage}</p>
    )}
  </div>
);

const CompanySignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState({
    companyName: "",
    businessNumber: "",
    representativeName: "",
    email: "",
    password: "",
    startDate: "",
  });
  const [otpCode, setOtpCode] = useState("");
  const [businessVerificationToken, setBusinessVerificationToken] = useState<
    string | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: requestOtpMutation, isPending: isRequestingOtp } =
    useAuthControllerRequestCompanySignupOtp();
  const { mutateAsync: verifyBusinessMutation, isPending: isVerifyingBusiness } =
    useAuthControllerVerifyCompanyBusiness();
  const { mutateAsync: verifyOtpMutation, isPending: isVerifyingOtp } =
    useAuthControllerVerifyCompanySignupOtp();
  const { mutateAsync: signupMutation, isPending: isSigningUp } =
    useAuthControllerCompanySignup();
  const isRequesting = isRequestingOtp || isVerifyingBusiness;
  const isSubmitting = isVerifyingOtp || isSigningUp;

  const setField =
    (key: keyof typeof formData) => (value: string) =>
      setFormData((prev) => ({ ...prev, [key]: value }));

  const isCompanyNameValid = COMPANY_NAME_REGEX.test(formData.companyName);
  const isBusinessNumberValid = BUSINESS_NUMBER_REGEX.test(
    formData.businessNumber,
  );
  const isRepresentativeNameValid =
    formData.representativeName.trim().length > 0;
  const isEmailValid =
    EMAIL_REGEX.test(formData.email) && formData.email.length <= 50;
  const isPasswordValid = PASSWORD_REGEX.test(formData.password);
  const isStartDateValid = formData.startDate.trim().length > 0;

  const isFormValid =
    isCompanyNameValid &&
    isBusinessNumberValid &&
    isRepresentativeNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isStartDateValid;

  const normalizedStartDate = formData.startDate.replace(/-/g, "");

  const requestOtp = async () => {
    if (!isFormValid) return;
    setError(null);
    try {
      const businessResult = await verifyBusinessMutation({
        data: {
          businessNumber: formData.businessNumber.trim(),
          representativeName: formData.representativeName.trim(),
          startDate: normalizedStartDate,
        },
      });
      const businessToken = (
        businessResult as unknown as CompanyBusinessVerifyResponse | undefined
      )?.businessVerificationToken;
      if (!businessToken) {
        throw new Error("사업자 인증 응답에 토큰이 없어요.");
      }

      await requestOtpMutation({ data: { email: formData.email } });

      setBusinessVerificationToken(businessToken);
      setOtpCode("");
      setStep("otp");
    } catch (err) {
      setError(extractErrorMessage(err, "인증번호 요청에 실패했어요. 다시 시도해주세요."));
    }
  };

  const backToForm = () => {
    setStep("form");
    setOtpCode("");
    setBusinessVerificationToken(null);
    setError(null);
  };

  const submit = async () => {
    if (otpCode.length < 6 || businessVerificationToken === null) return;
    setError(null);
    try {
      const verifyResult = (await verifyOtpMutation({
        data: { email: formData.email, otpCode },
      })) as unknown as CompanySignupOtpVerifyResponse | undefined;
      const emailVerificationToken = verifyResult?.emailVerificationToken;
      if (!emailVerificationToken) {
        throw new Error("이메일 인증 응답에 토큰이 없어요.");
      }

      await signupMutation({
        data: {
          ...formData,
          companyName: formData.companyName.trim(),
          representativeName: formData.representativeName.trim(),
          startDate: normalizedStartDate,
          emailVerificationToken,
          businessVerificationToken,
        },
      });

      navigate("/login/ceo", { replace: true, state: { skipLoginOtp: true } });
    } catch (err) {
      setError(extractErrorMessage(err, "회원가입에 실패했어요. 다시 시도해주세요."));
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 space-y-8 duration-500">
      {step === "form" ? (
        <>
          <div className="space-y-6">
            <FormField
              name="companyName"
              value={formData.companyName}
              onChange={setField("companyName")}
              placeholder="기업 이름을 알려주세요"
              errorMessage={
                !isCompanyNameValid
                  ? "2~50자, 한글·영문·숫자·공백만 입력해주세요."
                  : undefined
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="businessNumber"
                value={formData.businessNumber}
                onChange={setField("businessNumber")}
                placeholder="사업자 번호"
                errorMessage={
                  !isBusinessNumberValid
                    ? "000-00-00000 형식으로 입력해주세요."
                    : undefined
                }
              />
              <FormField
                name="representativeName"
                value={formData.representativeName}
                onChange={setField("representativeName")}
                placeholder="대표님 성함"
              />
            </div>
            <FormField
              name="email"
              value={formData.email}
              onChange={setField("email")}
              placeholder="대표 이메일"
              errorMessage={
                !isEmailValid
                  ? "올바른 이메일 형식(최대 50자)으로 입력해주세요."
                  : undefined
              }
            />
            <FormField
              name="password"
              type="password"
              value={formData.password}
              onChange={setField("password")}
              placeholder="비밀번호를 설정해주세요"
              errorMessage={
                !isPasswordValid
                  ? "6~10자, 영문 대소문자·숫자·특수문자(!@#$%^&*)를 각각 1개 이상 포함해주세요."
                  : undefined
              }
            />
            <div className="space-y-1.5">
              <label
                htmlFor="startDate"
                className="text-2xs px-1 font-bold text-gray-400"
              >
                개업일자
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setField("startDate")(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {error && (
            <p className="text-2xs -mt-3 font-bold text-red-500">{error}</p>
          )}

          <button
            type="button"
            onClick={requestOtp}
            disabled={!isFormValid || isRequesting}
            className="bg-brand shadow-brand/30 hover:bg-brand-dark w-full rounded-2xl py-4 font-bold text-white shadow-xl transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            {isRequesting ? "요청 중..." : "인증번호 받기"}
          </button>
        </>
      ) : (
        <>
          <div>
            <button
              type="button"
              onClick={backToForm}
              className="hover:text-text1 mb-6 flex items-center gap-1.5 text-xs font-bold text-gray-400 transition-colors"
            >
              <i className="ti ti-arrow-left text-sm" />
              정보 입력으로
            </button>
            <p className="text-text2 mb-6 text-xs leading-relaxed font-medium">
              대표 이메일(<b className="text-text1 font-bold">{formData.email}</b>)로
              인증번호 6자리를 발송했어요. 메일함을 확인해주세요.
              <br />
              메일이 보이지 않으면 스팸함도 확인해주세요.
            </p>
          </div>

          <OtpInput value={otpCode} onChange={setOtpCode} autoFocus />

          {error && (
            <p className="text-2xs mt-3 font-bold text-red-500">{error}</p>
          )}

          <button
            type="button"
            onClick={submit}
            disabled={otpCode.length < 6 || isSubmitting}
            className="bg-brand shadow-brand/30 hover:bg-brand-dark mt-6 w-full rounded-2xl py-4 font-bold text-white shadow-xl transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            {isSubmitting ? "처리 중..." : "회원가입"}
          </button>
        </>
      )}
    </div>
  );
};
export default CompanySignupForm;
