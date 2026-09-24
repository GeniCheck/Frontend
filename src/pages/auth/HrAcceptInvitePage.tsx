import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthControllerHrAcceptInvite } from "@/api/generated/endpoints/auth/auth";
import { extractErrorMessage } from "@/api/extractErrorMessage";
import FormField from "@/components/auth/FormField";
import { PASSWORD_REGEX } from "@/components/auth/validators";

const HrAcceptInvitePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const { mutateAsync: acceptMutation, isPending: isAccepting } =
    useAuthControllerHrAcceptInvite();

  const isPasswordValid = PASSWORD_REGEX.test(password);
  const isPasswordMatch = password === passwordConfirm;
  const isFormValid = isPasswordValid && isPasswordMatch;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !isFormValid) return;
    setError(null);
    try {
      await acceptMutation({ data: { token, password } });
      setDone(true);
    } catch (err) {
      setError(
        extractErrorMessage(
          err,
          "비밀번호 설정에 실패했어요. 초대 링크가 만료됐다면 대표님께 초대를 다시 요청해주세요.",
        ),
      );
    }
  };

  const goToLogin = () => navigate("/login/hr", { replace: true });

  return (
    <div className="bg-surface text-text1 flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div
        onClick={() => navigate("/")}
        className="mb-8 flex cursor-pointer items-center gap-2"
      >
        <div className="bg-brand flex h-8 w-8 items-center justify-center rounded-lg shadow-md">
          <i className="ti ti-shield-check text-base text-white" />
        </div>
        <span className="text-xl font-black">GeniCheck</span>
      </div>

      <div className="w-full max-w-md rounded-[32px] border border-gray-100 bg-white p-10 text-left shadow-sm">
        {!token ? (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-2xl text-red-500">
              <i className="ti ti-link-off" />
            </div>
            <div>
              <h2 className="text-text1 mb-2 text-xl font-black">
                유효하지 않은 초대 링크예요
              </h2>
              <p className="text-text2 text-xs leading-relaxed font-medium">
                초대 메일의 링크를 다시 눌러주세요. 문제가 계속되면 대표님께
                초대를 다시 요청해주세요.
              </p>
            </div>
          </div>
        ) : done ? (
          <div className="space-y-6 text-center">
            <div className="bg-accent-light text-accent mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl">
              <i className="ti ti-check" />
            </div>
            <div>
              <h2 className="text-text1 mb-2 text-xl font-black">
                비밀번호를 설정했어요
              </h2>
              <p className="text-text2 text-xs leading-relaxed font-medium">
                초대받은 이메일과 방금 설정한 비밀번호로 로그인해주세요.
              </p>
            </div>
            <button
              type="button"
              onClick={goToLogin}
              className="bg-accent hover:bg-accent-dark shadow-accent/20 w-full rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:translate-y-[-1px]"
            >
              로그인하러 가기
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-text1 mb-2 text-2xl font-black tracking-tight">
              비밀번호 설정
            </h2>
            <p className="text-text2 mb-8 text-xs font-medium">
              인사팀장 계정에 사용할 비밀번호를 설정해주세요.
            </p>
            <form onSubmit={submit} className="space-y-4">
              <FormField
                name="password"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="새 비밀번호"
                errorMessage={
                  !isPasswordValid
                    ? "6~10자, 영문 대소문자·숫자·특수문자(!@#$%^&*)를 각각 1개 이상 포함해주세요."
                    : undefined
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
                disabled={!isFormValid || isAccepting}
                className="bg-accent hover:bg-accent-dark shadow-accent/20 mt-2 w-full rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {isAccepting ? "설정 중..." : "비밀번호 설정하기"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default HrAcceptInvitePage;
