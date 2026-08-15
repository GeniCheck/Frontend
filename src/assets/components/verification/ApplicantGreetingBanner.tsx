import React from "react";

interface ApplicantGreetingBannerProps {
  applicantName?: string;
}

const ApplicantGreetingBanner: React.FC<ApplicantGreetingBannerProps> = ({
  applicantName = "지원자",
}) => {
  return (
    <div className="bg-brand rounded-2xl p-6">
      <p className="text-[15px] font-medium text-white mb-2">
        안녕하세요, {applicantName} 님
      </p>
      <p className="text-xs text-brand-light leading-relaxed">
        입사를 진심으로 환영합니다. 아래 자기 선언서를 작성하고 제출해 주세요.
        <br />
        이 선언은 향후 퇴사 시 역량 검증의 기준이 되며, HR 신용 점수에
        반영됩니다.
        <br />
        <strong className="font-medium">
          한 번 제출하면 수정할 수 없으니 신중하게 작성해주세요.
        </strong>
      </p>
    </div>
  );
};

export default ApplicantGreetingBanner;
