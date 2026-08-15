import React from "react";
import QuestionAnswerField from "./QuestionAnswerField";

interface FreeDeclarationFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const FreeDeclarationField: React.FC<FreeDeclarationFieldProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <p className="text-xs font-medium text-text3 uppercase tracking-wide mb-5">
        자유 선언
      </p>
      <QuestionAnswerField
        label="어필하고 싶은 역량 및 경험"
        value={value}
        onChange={onChange}
        placeholder="자유롭게 작성해주세요"
        maxLength={500}
      />
    </div>
  );
};

export default FreeDeclarationField;
