import React, { useEffect } from "react";
import { useQuestionTemplateControllerFindOne } from "@/api/generated/endpoints/question-template/question-template";
import type {
  QuestionTemplateDetail,
  QuestionTemplateDetailQuestion,
  QuestionTemplateQuestionType,
} from "@/api/questionTemplateResponses";

const TYPE_LABEL: Record<QuestionTemplateQuestionType, string> = {
  SCORE: "점수형",
  SINGLE_CHOICE: "선택형",
  TEXT: "서술형",
};

const TYPE_BADGE: Record<QuestionTemplateQuestionType, string> = {
  SCORE: "bg-brand-light text-brand",
  SINGLE_CHOICE: "bg-accent-light text-accent",
  TEXT: "bg-accent2-light text-accent2",
};

const TYPE_SOLID: Record<QuestionTemplateQuestionType, string> = {
  SCORE: "bg-brand text-white",
  SINGLE_CHOICE: "bg-accent text-white",
  TEXT: "bg-accent2 text-white",
};

interface QuestionTemplateDetailModalProps {
  templateId: string | null;
  onClose: () => void;
}

const QuestionCard: React.FC<{ question: QuestionTemplateDetailQuestion }> = ({
  question,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm">
      <div className="flex items-start gap-3">
        <span
          className={`text-2xs flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-black ${TYPE_SOLID[question.type]}`}
        >
          {question.order}
        </span>
        <span className="text-text1 text-xs font-bold">{question.text}</span>
        <span
          className={`text-2xs shrink-0 rounded px-2 py-0.5 font-bold ${TYPE_BADGE[question.type]}`}
        >
          {TYPE_LABEL[question.type]}
        </span>
        {question.evaluationEnabled && (
          <span className="text-2xs shrink-0 rounded bg-gray-100 px-2 py-0.5 font-bold text-gray-400">
            평가 항목
          </span>
        )}
      </div>

      <div className="mt-3.5 pl-9">
        {question.type === "SCORE" && (
          <div className="flex flex-wrap gap-2">
            {Array.from(
              {
                length:
                  (question.scoreMax ?? 10) - (question.scoreMin ?? 1) + 1,
              },
              (_, i) => (question.scoreMin ?? 1) + i,
            ).map((n) => (
              <span
                key={n}
                className="text-text2 text-2xs flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 font-bold"
              >
                {n}
              </span>
            ))}
          </div>
        )}

        {question.type === "TEXT" && (
          <p className="text-2xs text-gray-400">
            자유 텍스트 입력 (최대 {question.maxLength ?? 500}자)
          </p>
        )}

        {question.type === "SINGLE_CHOICE" && (
          <div className="space-y-2">
            {(question.options ?? []).map((opt) => (
              <div key={opt} className="flex items-center gap-2">
                <span className="h-4 w-4 shrink-0 rounded-full border border-gray-300" />
                <span className="text-text2 text-xs">{opt}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const QuestionTemplateDetailModal: React.FC<
  QuestionTemplateDetailModalProps
> = ({ templateId, onClose }) => {
  const open = templateId !== null;
  const { data, isPending, isError, refetch } =
    useQuestionTemplateControllerFindOne(templateId ?? "", {
      query: { enabled: open },
    });
  const detail = data as unknown as QuestionTemplateDetail | undefined;

  // Esc 키로 모달 닫기
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 text-left shadow-xl"
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-text1 text-base font-black">
              {detail ? detail.name : "템플릿 상세"}
            </h3>
            {detail && (
              <p className="text-2xs mt-1 text-gray-400">
                v{detail.version} · 질문 {detail.questions.length}개
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-all hover:bg-gray-100 active:scale-90"
            aria-label="닫기"
          >
            <i className="ti ti-x text-sm" />
          </button>
        </div>

        {isPending ? (
          <p className="py-10 text-center text-xs font-bold text-gray-400">
            불러오는 중...
          </p>
        ) : isError || !detail ? (
          <div className="space-y-3 py-10 text-center">
            <p className="text-xs font-bold text-red-500">
              상세 정보를 불러오지 못했어요.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="text-brand text-xs font-bold hover:opacity-80"
            >
              다시 시도
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {[...detail.questions]
              .sort((a, b) => a.order - b.order)
              .map((question) => (
                <QuestionCard key={question.questionId} question={question} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionTemplateDetailModal;
