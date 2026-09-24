import React, { useState } from "react";
import { useAuthControllerHrInvite } from "@/api/generated/endpoints/auth/auth";
import { extractErrorMessage } from "@/api/extractErrorMessage";
import FormField from "@/components/auth/FormField";
import { EMAIL_REGEX } from "@/components/auth/validators";

const emptyFormData = () => ({
  name: "",
  email: "",
});

const TeamPage: React.FC = () => {
  const [formData, setFormData] = useState(emptyFormData);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const { mutateAsync: inviteMutation, isPending: isInviting } =
    useAuthControllerHrInvite();

  const isNameValid = formData.name.trim().length > 0;
  const isEmailValid = EMAIL_REGEX.test(formData.email);

  const isFormValid = isNameValid && isEmailValid;

  const invite = async () => {
    if (!isFormValid) return;
    setError(null);
    try {
      await inviteMutation({
        data: { name: formData.name.trim(), email: formData.email },
      });
      setDone(true);
    } catch (err) {
      setError(
        extractErrorMessage(
          err,
          "초대 메일 발송에 실패했어요. 다시 시도해주세요.",
        ),
      );
    }
  };

  const inviteAnother = () => {
    setDone(false);
    setFormData(emptyFormData());
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
                <i className="ti ti-mail-check" />
              </div>
              <div>
                <h2 className="text-text1 mb-2 text-xl font-black">
                  초대 메일을 보냈어요
                </h2>
                <p className="text-text2 text-xs leading-relaxed font-medium">
                  <b className="text-text1 font-bold">{formData.email}</b> 로
                  초대 메일을 보냈어요. 인사팀장님이 메일의 링크에서 비밀번호를
                  설정하면 로그인할 수 있어요.
                </p>
                <p className="text-2xs mt-2 font-bold text-gray-400">
                  메일이 보이지 않으면 스팸함도 확인해달라고 안내해주세요.
                </p>
              </div>
              <button
                type="button"
                onClick={inviteAnother}
                className="bg-brand shadow-brand/30 hover:bg-brand-dark w-full rounded-2xl py-4 font-bold text-white shadow-xl transition-all active:scale-[0.98]"
              >
                다른 인사팀장 초대하기
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-text1 mb-1 text-xl font-black">
                인사팀장 초대
              </h2>
              <p className="text-text2 mb-6 text-xs font-medium">
                입력한 이메일로 초대 메일이 발송돼요. 비밀번호는 인사팀장님이
                직접 설정해요.
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
                    !isEmailValid
                      ? "올바른 이메일 형식으로 입력해주세요."
                      : undefined
                  }
                />
              </div>

              {error && (
                <p className="text-2xs mt-4 font-bold text-red-500">{error}</p>
              )}

              <button
                type="button"
                onClick={invite}
                disabled={!isFormValid || isInviting}
                className="bg-brand shadow-brand/30 hover:bg-brand-dark mt-6 w-full rounded-2xl py-4 font-bold text-white shadow-xl transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {isInviting ? "발송 중..." : "초대 메일 보내기"}
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default TeamPage;
