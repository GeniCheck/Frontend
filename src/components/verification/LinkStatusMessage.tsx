import React from "react";
import type { LinkErrorStatus } from "@/api/linkErrorStatus";

interface LinkStatusMessageProps {
  status: LinkErrorStatus;
}

const COPY: Record<
  LinkStatusMessageProps["status"],
  { title: string; desc: string }
> = {
  expired: {
    title: "만료된 링크예요",
    desc: "유효 기간이 지났거나 더 이상 사용할 수 없는 링크예요. 링크 재발송이 필요하면 대표에게 문의해주세요.",
  },
  submitted: {
    title: "이미 제출한 링크예요",
    desc: "제출이 완료된 링크라 다시 작성할 수 없어요. 수정이 필요하면 대표에게 문의해주세요.",
  },
  invalid: {
    title: "유효하지 않은 링크예요",
    desc: "링크 주소를 다시 확인해주세요. 문제가 계속되면 대표에게 문의해주세요.",
  },
};

const LinkStatusMessage: React.FC<LinkStatusMessageProps> = ({ status }) => {
  const { title, desc } = COPY[status];

  return (
    <div className="bg-surface flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="bg-surface2 text-text3 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
          <i className="ti ti-link-off text-xl" />
        </div>
        <h1 className="text-text1 text-base font-black">{title}</h1>
        <p className="text-2xs mt-2 leading-relaxed text-gray-400">{desc}</p>
      </div>
    </div>
  );
};

export default LinkStatusMessage;
