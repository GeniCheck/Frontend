import React from "react";
import RoleLoginScreen from "../../components/auth/RoleLoginScreen";

// 인사팀장(HR) 로그인: ID/PW → 대표님께 전달받은 인증번호 6자리 → role="hr" 저장 → /main/referral
const HrLoginPage: React.FC = () => (
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
    bannerCaption="대표님이 생성한 계정으로 로그인합니다. 인사팀장 계정은 인재 추천 게시판을 이용할 수 있습니다."
    heading="인사팀장 로그인"
    subheading="대표님께 전달받은 계정 정보로 로그인해 주세요."
    idLabel="아이디"
    idPlaceholder="대표님께 전달받은 아이디"
    otpNotice={
      <>
        시스템이 <b className="font-bold text-[#1A1A2E]">대표님 이메일</b>로
        인증번호를 발송했습니다. 대표님께 전달받은 6자리 번호를 입력해 주세요.
        (데모 코드: 123456)
      </>
    }
    allowResend={false}
    redirectTo="/main/referral"
    switchPrompt={{
      question: "대표이신가요?",
      linkLabel: "대표 로그인",
      to: "/login/ceo",
    }}
  />
);

export default HrLoginPage;
