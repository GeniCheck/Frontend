import React from "react";
import type { AnswerDto } from "@/api/generated/models/answerDto";
import type { DeclarationFormQuestion } from "@/api/declarationResponses";

const DEFAULT_MAX_LENGTH = 500;

interface CompanyQuestionListProps {
  questions: DeclarationFormQuestion[];
  answers: Record<string, AnswerDto>;
  onChange: (answer: AnswerDto) => void;
}

const ScoreInput: React.FC<{
  question: DeclarationFormQuestion;
  value: number | undefined;
  onChange: (value: number) => void;
}> = ({ question, value, onChange }) => {
  const min = question.scoreMin ?? 1;
  const max = question.scoreMax ?? 10;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`text-2xs flex h-8 w-8 items-center justify-center rounded-full border font-bold transition-all active:scale-90 ${
            value === n
              ? "bg-brand border-brand text-white"
              : "text-text2 border-gray-200 hover:bg-gray-50"
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  );
};

const ChoiceInput: React.FC<{
  question: DeclarationFormQuestion;
  value: string | undefined;
  onChange: (optionId: string) => void;
}> = ({ question, value, onChange }) => (
  <div className="space-y-2">
    {(question.options ?? []).map((option) => (
      <label
        key={option.optionId}
        className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 text-sm transition-colors ${
          value === option.optionId
            ? "border-brand bg-brand-light text-brand font-bold"
            : "text-text2 border-gray-200 hover:bg-gray-50"
        }`}
      >
        <input
          type="radio"
          name={question.questionId}
          checked={value === option.optionId}
          onChange={() => onChange(option.optionId)}
          className="accent-brand h-3.5 w-3.5 shrink-0"
        />
        {option.label}
      </label>
    ))}
  </div>
);

const TextInput: React.FC<{
  question: DeclarationFormQuestion;
  value: string;
  onChange: (value: string) => void;
}> = ({ question, value, onChange }) => {
  const maxLength = question.maxLength ?? DEFAULT_MAX_LENGTH;
  return (
    <>
      <textarea
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder="답변을 입력해주세요"
        className="text-text1 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:outline-none"
      />
      <span className="text-2xs mt-1 block text-right text-gray-300">
        {value.length} / {maxLength}
      </span>
    </>
  );
};

// 질문 자체는 대표가 QuestionTemplatePage에서 작성한다.
const CompanyQuestionList: React.FC<CompanyQuestionListProps> = ({
  questions,
  answers,
  onChange,
}) => {
  if (questions.length === 0) return null;

  return (
    <div className="space-y-6 rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm">
      <div>
        <h2 className="text-text1 text-lg font-black">기업 질문</h2>
        <p className="mt-1 text-xs text-gray-400">
          <span className="text-red-400">*</span> 표시된 질문은 꼭 답변해주세요.
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((q, i) => {
          const answer = answers[q.questionId];
          return (
            <div key={q.questionId}>
              <label className="mb-2.5 block text-sm font-bold text-gray-500">
                Q{i + 1}. {q.text}
                {q.required && <span className="text-red-400"> *</span>}
              </label>
              {q.type === "SCORE" && (
                <ScoreInput
                  question={q}
                  value={answer?.answerScore}
                  onChange={(answerScore) =>
                    onChange({ questionId: q.questionId, answerScore })
                  }
                />
              )}
              {q.type === "SINGLE_CHOICE" && (
                <ChoiceInput
                  question={q}
                  value={answer?.answerOptionId}
                  onChange={(answerOptionId) =>
                    onChange({ questionId: q.questionId, answerOptionId })
                  }
                />
              )}
              {q.type === "TEXT" && (
                <TextInput
                  question={q}
                  value={answer?.answerText ?? ""}
                  onChange={(answerText) =>
                    onChange({ questionId: q.questionId, answerText })
                  }
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyQuestionList;
