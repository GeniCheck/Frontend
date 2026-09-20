import React, { useState } from "react";
import {
  useAuthControllerHrRegister,
  useAuthControllerHrRegisterVerify,
} from "@/api/generated/endpoints/auth/auth";
import { extractErrorMessage } from "@/api/extractErrorMessage";
import { extractRequired } from "@/api/extractRequired";
import type { TempTokenResponse } from "@/api/authResponses";
import { readStoredCompanyCode } from "@/context/roleContext";
import FormField from "@/components/auth/FormField";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/components/auth/validators";
import OtpInput from "@/components/auth/OtpInput";

type Step = "form" | "otp";

const emptyFormData = () => ({
  name: "",
  email: "",
  password: "",
});

const TeamPage: React.FC = () => {
  const storedCompanyCode = readStoredCompanyCode();
  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState(emptyFormData);
  const [manualCompanyCode, setManualCompanyCode] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [tempToken, setTempToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const { mutateAsync: registerMutation, isPending: isRegistering } =
    useAuthControllerHrRegister();
  const { mutateAsync: verifyMutation, isPending: isVerifying } =
    useAuthControllerHrRegisterVerify();

  const companyCode = storedCompanyCode ?? manualCompanyCode;

  const isNameValid = formData.name.trim().length > 0;
  const isEmailValid = EMAIL_REGEX.test(formData.email);
  const isPasswordValid = PASSWORD_REGEX.test(formData.password);
  const isCompanyCodeValid = companyCode.trim().length > 0;

  const isFormValid =
    isNameValid && isEmailValid && isPasswordValid && isCompanyCodeValid;

  const requestOtp = async () => {
    if (!isFormValid) return;
    setError(null);
    try {
      const result = (await registerMutation({
        data: { ...formData, companyCode },
      })) as unknown as TempTokenResponse | undefined;
      const nextTempToken = extractRequired(
        result,
        "tempToken",
        "등록 응답에 임시 토큰이 없어요.",
      );
      setTempToken(nextTempToken);
      setOtpCode("");
      setStep("otp");
    } catch (err) {
      setError(
        extractErrorMessage(err, "계정 생성 요청에 실패했어요. 다시 시도해주세요."),
      );
    }
  };

  const backToForm = () => {
    setStep("form");
    setOtpCode("");
    setTempToken(null);
    setError(null);
  };

  const submit = async () => {
    if (otpCode.length < 6 || !tempToken) return;
    setError(null);
    try {
      await verifyMutation({ data: { tempToken, otpCode } });
      setDone(true);
    } catch (err) {
      setError(
        extractErrorMessage(err, "인증번호가 올바르지 않아요. 다시 확인해 주세요."),
      );
    }
  };

  const createAnother = () => {
    setDone(false);
    setStep("form");
    setFormData(emptyFormData());
    setManualCompanyCode("");
    setOtpCode("");
    setTempToken(null);
    setError(null);
  };

  return (
    <main className="flex min-h-screen flex-1 flex-col">
      <header className="sticky top-0 z-40 flex h-17 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div className="flex items-baseline gap-3 text-left">
          <h1 className="text-text1 text-base font-black tracking-tight">
            Team
          </h1>
          <span className="text-xs font-semibold text-gray-400">
            인사팀장 계정 관리
          </span>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-312.5 flex-1 items-center justify-center p-6">
        <div className="w-full max-w-125 rounded-3xl border border-gray-100 bg-white p-10 shadow-sm">
          {done ? (
            <div className="space-y-6 text-center">
              <div className="bg-brand-light text-brand mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl">
                <i className="ti ti-check" />
              </div>
              <div>
                <h2 className="text-text1 mb-2 text-xl font-black">
                  인사팀장 계정을 만들었어요
                </h2>
                <p className="text-text2 text-xs leading-relaxed font-medium">
                  <b className="text-text1 font-bold">{formData.email}</b>{" "}
                  계정으로 로그인할 수 있어요. 로그인 정보를 인사팀장님께
                  전달해주세요.
                </p>
              </div>
              <button
                type="button"
                onClick={createAnother}
                className="bg-brand shadow-brand/30 hover:bg-brand-dark w-full rounded-2xl py-4 font-bold text-white shadow-xl transition-all active:scale-[0.98]"
              >
                계정 추가로 만들기
              </button>
            </div>
          ) : step === "form" ? (
            <>
              <h2 className="text-text1 mb-1 text-xl font-black">
                인사팀장 계정 생성
              </h2>
              <p className="text-text2 mb-6 text-xs font-medium">
                생성을 진행하면 인증번호가 대표님 이메일로 발송돼요.
              </p>
              <div className="space-y-4">
                <FormField
                  name="name"
                  value={formData.name}
                  onChange={(value) =>
                    setFormData({ ...formData, name: value })
                  }
                  placeholder="인사팀장 이름"
                />
                <FormField
                  name="email"
                  value={formData.email}
                  onChange={(value) =>
                    setFormData({ ...formData, email: value })
                  }
                  placeholder="인사팀장 이메일 (로그인 아이디)"
                  errorMessage={
                    !isEmailValid ? "올바른 이메일 형식으로 입력해주세요." : undefined
                  }
                />
                <FormField
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(value) =>
                    setFormData({ ...formData, password: value })
                  }
                  placeholder="비밀번호"
                  errorMessage={
                    !isPasswordValid
                      ? "6~10자, 영문 대소문자·숫자·특수문자(!@#$%^&*)를 각각 1개 이상 포함해주세요."
                      : undefined
                  }
                />
                {storedCompanyCode ? (
                  <p className="text-2xs px-1 font-bold text-gray-400">
                    회사 코드 {storedCompanyCode} 로 생성돼요.
                  </p>
                ) : (
                  <FormField
                    name="companyCode"
                    value={manualCompanyCode}
                    onChange={setManualCompanyCode}
                    placeholder="회사 코드"
                  />
                )}
                {!storedCompanyCode && (
                  <p className="text-2xs -mt-2 px-1 font-bold text-gray-400">
                    이 브라우저에 저장된 코드가 없어요. 회원가입 완료 화면에서
                    안내된 코드를 입력해주세요.
                  </p>
                )}
              </div>

              {error && (
                <p className="text-2xs mt-4 font-bold text-red-500">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={requestOtp}
                disabled={!isFormValid || isRegistering}
                className="bg-brand shadow-brand/30 hover:bg-brand-dark mt-6 w-full rounded-2xl py-4 font-bold text-white shadow-xl transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {isRegistering ? "요청 중..." : "인증번호 받기"}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={backToForm}
                className="hover:text-text1 mb-6 flex items-center gap-1.5 text-xs font-bold text-gray-400 transition-colors"
              >
                <i className="ti ti-arrow-left text-sm" />
                정보 입력으로
              </button>
              <p className="text-text2 mb-6 text-xs leading-relaxed font-medium">
                대표 이메일로 인증번호 6자리를 발송했어요. 메일함을
                확인해주세요.
              </p>

              <OtpInput value={otpCode} onChange={setOtpCode} autoFocus />

              {error && (
                <p className="text-2xs mt-3 font-bold text-red-500">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={submit}
                disabled={otpCode.length < 6 || isVerifying}
                className="bg-brand shadow-brand/30 hover:bg-brand-dark mt-6 w-full rounded-2xl py-4 font-bold text-white shadow-xl transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {isVerifying ? "확인 중..." : "계정 생성 완료"}
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default TeamPage;
