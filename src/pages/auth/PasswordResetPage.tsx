import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAuthControllerConfirmPasswordReset,
  useAuthControllerRequestPasswordReset,
} from "@/api/generated/endpoints/auth/auth";
import { PasswordResetRequestDtoRole } from "@/api/generated/models";
import { extractErrorMessage } from "@/api/extractErrorMessage";
import type { Role } from "@/context/roleContext";
import FormField from "@/components/auth/FormField";
import OtpInput from "@/components/auth/OtpInput";
import { TONES } from "@/components/auth/tones";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PASSWORD_RULE_MESSAGE,
} from "@/components/auth/validators";

type Step = "email" | "confirm" | "done";

interface PasswordResetPageProps {
  role: Role;
}

const PasswordResetPage: React.FC<PasswordResetPageProps> = ({ role }) => {
  const navigate = useNavigate();
  const t = TONES[role === "ceo" ? "purple" : "amber"];
  const apiRole =
    role === "ceo"
      ? PasswordResetRequestDtoRole.COMPANY
      : PasswordResetRequestDtoRole.HR_MANAGER;
  const loginPath = role === "ceo" ? "/login/ceo" : "/login/hr";

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const { mutateAsync: requestMutation, isPending: isRequesting } =
    useAuthControllerRequestPasswordReset();
  const { mutateAsync: confirmMutation, isPending: isConfirming } =
    useAuthControllerConfirmPasswordReset();

  const isEmailValid = EMAIL_REGEX.test(email);
  const isPasswordValid = PASSWORD_REGEX.test(newPassword);
  const isPasswordMatch = newPassword === passwordConfirm;
  const isConfirmValid =
    code.length === 6 && isPasswordValid && isPasswordMatch;

  const requestCode = async () => {
    setError(null);
    setNotice(null);
    try {
      await requestMutation({ data: { email, role: apiRole } });
      setCode("");
      setStep("confirm");
      setNotice("가입된 이메일이라면 재설정 코드를 보냈어요.");
    } catch (err) {
      setError(
        extractErrorMessage(err, "코드 발송에 실패했어요. 다시 시도해주세요."),
      );
    }
  };

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid || isRequesting) return;
    requestCode();
  };

  const submitConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfirmValid || isConfirming) return;
    setError(null);
    setNotice(null);
    try {
      await confirmMutation({
        data: { email, role: apiRole, code, newPassword },
      });
      setStep("done");
    } catch (err) {
      setError(
        extractErrorMessage(
          err,
          "코드가 올바르지 않거나 만료됐어요. 코드를 다시 받아주세요.",
        ),
      );
    }
  };

  const backToEmail = () => {
    setStep("email");
    setCode("");
    setNewPassword("");
    setPasswordConfirm("");
    setError(null);
    setNotice(null);
  };

  const buttonClass = `w-full rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 ${t.solid}`;

  return (
    <div className="bg-surface text-text1 flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => navigate(loginPath)}
          className="hover:text-text1 mb-4 flex items-center gap-1.5 text-xs font-bold text-gray-400 transition-colors"
        >
          <i className="ti ti-arrow-back text-base" />
          로그인으로
        </button>

        <div className="rounded-[32px] border border-gray-100 bg-white p-10 text-left shadow-sm">
          {step === "done" ? (
            <div className="space-y-6 text-center">
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${t.iconBox}`}
              >
                <i className="ti ti-check" />
              </div>
              <div>
                <h2 className="text-text1 mb-2 text-xl font-black">
                  비밀번호를 재설정했어요
                </h2>
                <p className="text-text2 text-xs leading-relaxed font-medium">
                  새 비밀번호로 로그인해주세요.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate(loginPath, { replace: true })}
                className={buttonClass}
              >
                로그인하러 가기
              </button>
            </div>
          ) : step === "email" ? (
            <>
              <h2 className="text-text1 mb-2 text-2xl font-black tracking-tight">
                비밀번호 찾기
              </h2>
              <p className="text-text2 mb-8 text-xs font-medium">
                가입한 이메일로 재설정 코드를 보내드려요.
              </p>
              <form onSubmit={submitEmail} className="space-y-4">
                <FormField
                  name="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="가입한 이메일"
                  errorMessage={
                    !isEmailValid
                      ? "올바른 이메일 형식으로 입력해주세요."
                      : undefined
                  }
                />
                {error && (
                  <p className="flex items-center gap-1.5 text-xs font-bold text-red-500">
                    <i className="ti ti-alert-circle text-sm" />
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={!isEmailValid || isRequesting}
                  className={`mt-2 ${buttonClass}`}
                >
                  {isRequesting ? "발송 중..." : "재설정 코드 받기"}
                </button>
              </form>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={backToEmail}
                className="hover:text-text1 mb-6 flex items-center gap-1.5 text-xs font-bold text-gray-400 transition-colors"
              >
                <i className="ti ti-arrow-left text-sm" />
                이메일 다시 입력
              </button>
              <h2 className="text-text1 mb-2 text-2xl font-black tracking-tight">
                새 비밀번호 설정
              </h2>
              <p className="text-text2 mb-6 text-xs leading-relaxed font-medium">
                <b className="text-text1 font-bold">{email}</b> 로 받은 코드
                6자리와 새 비밀번호를 입력해주세요.
              </p>
              <form onSubmit={submitConfirm} className="space-y-4">
                <OtpInput
                  value={code}
                  onChange={setCode}
                  autoFocus
                  focusClass={t.otpFocus}
                />
                <div className="flex items-center justify-between">
                  <p className="text-2xs font-bold text-gray-400">
                    {notice ?? "메일이 안 왔나요? 스팸함도 확인해주세요."}
                  </p>
                  <button
                    type="button"
                    onClick={requestCode}
                    disabled={isRequesting}
                    className={`text-2xs font-bold transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:text-gray-300 ${t.link}`}
                  >
                    {isRequesting ? "발송 중..." : "코드 다시 받기"}
                  </button>
                </div>
                <FormField
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={setNewPassword}
                  placeholder="새 비밀번호"
                  errorMessage={
                    !isPasswordValid ? PASSWORD_RULE_MESSAGE : undefined
                  }
                />
                <FormField
                  name="passwordConfirm"
                  type="password"
                  value={passwordConfirm}
                  onChange={setPasswordConfirm}
                  placeholder="새 비밀번호 확인"
                  errorMessage={
                    !isPasswordMatch ? "비밀번호가 일치하지 않아요." : undefined
                  }
                />
                {error && (
                  <p className="flex items-center gap-1.5 text-xs font-bold text-red-500">
                    <i className="ti ti-alert-circle text-sm" />
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={!isConfirmValid || isConfirming}
                  className={`mt-2 ${buttonClass}`}
                >
                  {isConfirming ? "변경 중..." : "비밀번호 재설정"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
