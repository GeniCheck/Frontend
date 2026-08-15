import React from "react";
import type { TokenStatus } from "../../hooks/useTokenValidation";

const MESSAGES: Partial<Record<TokenStatus, { title: string; desc: string }>> = {
  expired: {
    title: "링크가 만료되었습니다",
    desc: "이 링크는 더 이상 사용할 수 없어요. 담당자에게 새 링크 발송을 요청해주세요.",
  },
  invalid: {
    title: "유효하지 않은 링크입니다",
    desc: "주소를 다시 확인하거나 담당자에게 문의해주세요.",
  },
};

const LinkStatusMessage: React.FC<{ status: TokenStatus }> = ({ status }) => {
  const content = MESSAGES[status];
  if (!content) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-sm text-center space-y-2">
        <h1 className="text-xl font-black text-[#1A1A2E]">{content.title}</h1>
        <p className="text-sm text-gray-500">{content.desc}</p>
      </div>
    </div>
  );
};

export default LinkStatusMessage;
