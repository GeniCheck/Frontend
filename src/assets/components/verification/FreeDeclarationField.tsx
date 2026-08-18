import React from "react";
import QuestionAnswerField from "./QuestionAnswerField";
import { FREE_DECLARATION_QUESTIONS } from "./mockData";

interface FreeDeclarationFieldProps {
  values: string[];
  onChange: (index: number, value: string) => void;
}

const FreeDeclarationField: React.FC<FreeDeclarationFieldProps> = ({
  values,
  onChange,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
      <p className="text-xs font-medium text-text3 uppercase tracking-wide">
        자유 선언
      </p>
      {FREE_DECLARATION_QUESTIONS.map((question, index) => (
        <QuestionAnswerField
          key={question}
          label={question}
          value={values[index] ?? ""}
          onChange={(value) => onChange(index, value)}
          placeholder="자유롭게 작성해주세요"
          maxLength={500}
        />
      ))}
    </div>
  );
};

export default FreeDeclarationField;
