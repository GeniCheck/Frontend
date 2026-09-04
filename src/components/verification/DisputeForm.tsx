import React, { useState } from "react";

const REASON_MAX_LENGTH = 500;

interface DisputeFormProps {
  onSubmit: (reason: string) => void;
}

// 대표 검증 결과에 대한 직원 의견 1회 제출 폼.
// TODO: 제출 기한(통보 후 14일) 검증은 백엔드 API 확정 후 추가.
const DisputeForm: React.FC<DisputeFormProps> = ({ onSubmit }) => {
  const [reason, setReason] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!reason.trim()) return;
    onSubmit(reason);
    setSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="space-y-2 rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm">
        <h2 className="text-text1 text-sm font-black">제출된 의견</h2>
        <p className="text-text1 text-sm leading-relaxed">{reason}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm">
      <div>
        <h2 className="text-text1 text-sm font-black">이의 제기</h2>
        <p className="text-2xs mt-1 text-gray-400">
          검증 결과에 이견이 있다면 통보일로부터 14일 이내에 한 번만 의견을
          제출할 수 있어요.
        </p>
      </div>

      <textarea
        value={reason}
        maxLength={REASON_MAX_LENGTH}
        onChange={(e) => setReason(e.target.value)}
        rows={4}
        placeholder="의견을 입력해주세요"
        className="text-text1 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:outline-none"
      />

      <div className="flex items-center justify-between">
        <span className="text-2xs text-gray-300">
          {reason.length} / {REASON_MAX_LENGTH}
        </span>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!reason.trim()}
          className={`rounded-xl px-5 py-2 text-xs font-bold shadow-md transition-all active:scale-95 ${
            reason.trim()
              ? "bg-brand shadow-brand/10 hover:bg-brand-dark text-white"
              : "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400 shadow-none"
          }`}
        >
          의견 제출
        </button>
      </div>
    </div>
  );
};

export default DisputeForm;
