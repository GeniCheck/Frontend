import React from "react";
import RoleLoginScreen from "../../components/auth/RoleLoginScreen";

// 대표(CEO) 로그인: ID/PW → 본인 이메일 인증번호 6자리 → role="ceo" 저장 → /main
const CeoLoginPage: React.FC = () => (
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
    idLabel="아이디"
    idPlaceholder="아이디 또는 기업 이메일"
    otpNotice={
      <>
        가입 시 등록한 <b className="font-bold text-[#1A1A2E]">본인 이메일</b>로
        인증번호 6자리를 발송했어요. 메일함을 확인해 주세요. (데모 코드: 123456)
      </>
    }
    allowResend
    redirectTo="/main"
    switchPrompt={{
      question: "인사팀장이신가요?",
      linkLabel: "인사팀장 로그인",
      to: "/login/hr",
    }}
  />
);

export default CeoLoginPage;
