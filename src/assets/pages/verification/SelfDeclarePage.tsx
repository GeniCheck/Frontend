import React from "react";
import { useParams } from "react-router-dom";
import { useTokenValidation } from "../../hooks/useTokenValidation";
import LinkStatusMessage from "../../components/verification/LinkStatusMessage";

const SelfDeclarePage: React.FC = () => {
  const { token } = useParams();
  const { status } = useTokenValidation(token);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-sm text-gray-400">확인 중...</span>
      </div>
    );
  }

  if (status === "expired" || status === "invalid") {
    return <LinkStatusMessage status={status} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 border border-gray-200">
        {/* 와이어프레임 확정 후 자기선언 폼(질문 답변, 자유선언, 이력서 업로드, 동의 체크박스)으로 채울 자리 */}
        <p className="text-sm text-gray-400">자기선언 폼이 들어갈 자리입니다.</p>
      </div>
    </div>
  );
};

export default SelfDeclarePage;
