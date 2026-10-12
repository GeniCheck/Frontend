import React, { useState } from "react";

const CONTENT_MAX_LENGTH = 1000;

interface OpinionFormProps {
  dueAt: string;
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (content: string) => void;
}

const OpinionForm: React.FC<OpinionFormProps> = ({
  dueAt,
  isSubmitting,
  error,
  onSubmit,
}) => {
  const [content, setContent] = useState("");
  const canSubmit = content.trim().length > 0 && !isSubmitting;

  return (
    <div className="space-y-3 rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm">
      <div>
        <h2 className="text-text1 text-sm font-black">의견 제출</h2>
        <p className="text-2xs mt-1 text-gray-400">
          검증 결과에 대한 의견을 {new Date(dueAt).toLocaleDateString("ko-KR")}
          까지 한 번만 남길 수 있어요. 의견을 제출해도 점수는 바뀌지 않아요.
        </p>
      </div>

      <textarea
        value={content}
        maxLength={CONTENT_MAX_LENGTH}
        onChange={(e) => setContent(e.target.value)}
        disabled={isSubmitting}
        rows={4}
        placeholder="의견을 입력해주세요"
        className="text-text1 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:outline-none"
      />

      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-3">
          <p className="text-2xs font-bold text-red-500">{error}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-2xs text-gray-300">
          {content.length} / {CONTENT_MAX_LENGTH}
        </span>
        <button
          type="button"
          onClick={() => onSubmit(content.trim())}
          disabled={!canSubmit}
          className={`rounded-xl px-5 py-2 text-xs font-bold shadow-md transition-all active:scale-95 ${
            canSubmit
              ? "bg-brand shadow-brand/10 hover:bg-brand-dark text-white"
              : "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400 shadow-none"
          }`}
        >
          {isSubmitting ? "제출 중..." : "의견 제출"}
        </button>
      </div>
    </div>
  );
};

export default OpinionForm;
