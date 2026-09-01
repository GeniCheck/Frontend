import React from "react";
import type { DeclarationQuestion } from "@/types/declaration";

const ANSWER_MAX_LENGTH = 500;

interface CompanyQuestionListProps {
  questions: DeclarationQuestion[];
  answers: Record<string, string>;
  onChange: (questionId: string, value: string) => void;
}

// 기능명세서 2.1: 기업이 만든 질문 리스트에 서술형으로 답변.
// 질문 자체는 대표가 QuestionTemplatePage에서 100자 이내로 작성하고,
// 여기서는 답변만 500자 이내로 받는다. 모든 질문은 필수(*).
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
          각 질문에 500자 이내로 답변해주세요.
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((q, i) => {
          const value = answers[q.id] ?? "";
          return (
            <div key={q.id}>
              <label className="mb-2.5 block text-sm font-bold text-gray-500">
                Q{i + 1}. {q.question}
                <span className="text-red-400"> *</span>
              </label>
              <textarea
                value={value}
                maxLength={ANSWER_MAX_LENGTH}
                onChange={(e) => onChange(q.id, e.target.value)}
                rows={4}
                placeholder="답변을 입력해주세요"
                className="text-text1 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:outline-none"
              />
              <span className="text-2xs mt-1 block text-right text-gray-300">
                {value.length} / {ANSWER_MAX_LENGTH}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyQuestionList;
