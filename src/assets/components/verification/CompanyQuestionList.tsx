import React from "react";
import QuestionAnswerField from "./QuestionAnswerField";

// TODO: 실제 질문 API(GET /declarations/forms/:token/summary) 연동 전까지 목업 사용
export const MOCK_QUESTIONS = ["질문 1", "질문 2", "질문 3"];

interface CompanyQuestionListProps {
  answers: string[];
  onChange: (index: number, value: string) => void;
}

const CompanyQuestionList: React.FC<CompanyQuestionListProps> = ({
  answers,
  onChange,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
      <p className="text-xs font-medium text-text3 uppercase tracking-wide">
        기업 질문
      </p>
      {MOCK_QUESTIONS.map((question, index) => (
        <QuestionAnswerField
          key={question}
          label={question}
          value={answers[index] ?? ""}
          onChange={(value) => onChange(index, value)}
          required
          maxLength={500}
        />
      ))}
    </div>
  );
};

export default CompanyQuestionList;
