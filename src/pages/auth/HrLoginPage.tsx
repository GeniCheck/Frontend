import React from "react";
import RoleLoginScreen from "@/components/auth/RoleLoginScreen";
import {
  useAuthControllerHrLogin,
  useAuthControllerHrOtpVerify,
} from "@/api/generated/endpoints/auth/auth";
import { extractRequired } from "@/api/extractRequired";
import type { TempTokenResponse, AuthTokenResponse } from "@/api/authResponses";

// 인사팀장(HR) 로그인: ID/PW → 대표님 이메일로 발송된 인증번호 6자리 → role="hr" 저장 → /main/referral
const HrLoginPage: React.FC = () => {
  const { mutateAsync: loginMutation } = useAuthControllerHrLogin();
  const { mutateAsync: verifyOtpMutation } = useAuthControllerHrOtpVerify();

  const login = async (email: string, password: string) => {
    const result = (await loginMutation({
      data: { email, password },
    })) as unknown as TempTokenResponse | undefined;
    const tempToken = extractRequired(
      result,
      "tempToken",
      "로그인 응답에 임시 토큰이 없어요.",
    );
    return { tempToken };
  };

  const verifyOtp = async (tempToken: string, otpCode: string) => {
    const result = (await verifyOtpMutation({
      data: { tempToken, otpCode },
    })) as unknown as AuthTokenResponse | undefined;
    return {
      accessToken: extractRequired(
        result,
        "accessToken",
        "인증 응답에 토큰이 없어요.",
      ),
      refreshToken: extractRequired(
        result,
        "refreshToken",
        "인증 응답에 토큰이 없어요.",
      ),
    };
  };

  return (
    <RoleLoginScreen
      role="hr"
      tone="amber"
      bannerHeadline={
        <>
          인재 추천 게시판에
          <br />
          바로 연결됩니다
        </>
      }
      bannerCaption="초대받은 이메일과 직접 설정한 비밀번호로 로그인합니다. 인사팀장 계정은 인재 추천 게시판을 이용할 수 있습니다."
      heading="인사팀장 로그인"
      subheading="초대받은 이메일과 설정한 비밀번호로 로그인해 주세요."
      idLabel="이메일"
      idPlaceholder="대표님께 전달받은 이메일"
      otpNotice={
        <>
          시스템이 <b className="text-text1 font-bold">대표님 이메일</b>로
          인증번호를 발송했습니다. 대표님께 전달받은 6자리 번호를 입력해 주세요.
        </>
      }
      allowResend={false}
      redirectTo="/main/referral"
      switchPrompt={{
        question: "대표이신가요?",
        linkLabel: "대표 로그인",
        to: "/login/ceo",
      }}
      login={login}
      verifyOtp={verifyOtp}
    />
  );
};

export default HrLoginPage;
