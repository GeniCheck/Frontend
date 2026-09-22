import React from "react";
import RoleLoginScreen from "@/components/auth/RoleLoginScreen";
import {
  useAuthControllerCompanyLogin,
  useAuthControllerCompanyOtpVerify,
  useAuthControllerResendOtp,
} from "@/api/generated/endpoints/auth/auth";
import { extractRequired } from "@/api/extractRequired";
import type {
  TempTokenResponse,
  AuthTokenResponse,
} from "@/api/authResponses";

// 대표(CEO) 로그인: ID/PW → 본인 이메일 인증번호 6자리 → role="ceo" 저장 → /main
const CeoLoginPage: React.FC = () => {
  const { mutateAsync: loginMutation } = useAuthControllerCompanyLogin();
  const { mutateAsync: verifyOtpMutation } =
    useAuthControllerCompanyOtpVerify();
  const { mutateAsync: resendOtpMutation } = useAuthControllerResendOtp();

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

  const resendOtp = async (tempToken: string) => {
    await resendOtpMutation({ data: { tempToken } });
  };

  return (
    <RoleLoginScreen
      role="ceo"
      tone="purple"
      bannerHeadline={
        <>
          대표님의 계정으로
          <br />
          전체 현황을 관리하세요
        </>
      }
      bannerCaption="본인 이메일로 받은 인증번호로 로그인합니다. 대시보드·검증·AI 리포트 등 모든 페이지를 이용할 수 있습니다."
      heading="대표 로그인"
      subheading="GeniCheck 기업 통합 관리 시스템에 로그인해 주세요."
      idLabel="이메일"
      idPlaceholder="가입 시 등록한 기업 이메일"
      otpNotice={
        <>
          가입 시 등록한 <b className="text-text1 font-bold">본인 이메일</b>로
          인증번호 6자리를 발송했어요. 메일함을 확인해 주세요.
        </>
      }
      allowResend
      redirectTo="/main"
      switchPrompt={{
        question: "인사팀장이신가요?",
        linkLabel: "인사팀장 로그인",
        to: "/login/hr",
      }}
      login={login}
      verifyOtp={verifyOtp}
      resendOtp={resendOtp}
    />
  );
};

export default CeoLoginPage;
