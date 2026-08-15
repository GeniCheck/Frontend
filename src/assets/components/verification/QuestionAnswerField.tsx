import React from "react";

interface QuestionAnswerFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}

const QuestionAnswerField: React.FC<QuestionAnswerFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = "답변을 입력해주세요",
  required = false,
  maxLength,
}) => {
  return (
    <div>
      <p className="text-sm font-medium text-text1 mb-2 flex items-center gap-1">
        {label}
        {required && (
          <span className="text-accent2" aria-label="필수 입력">
            *
          </span>
        )}
      </p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full min-h-16 rounded-xl border border-gray-200 bg-surface px-3 py-2.5 text-sm text-text1 outline-none focus:border-brand transition-colors resize-y"
      />
      {maxLength && (
        <p className="text-xs text-text3 mt-1 text-right">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
};

export default QuestionAnswerField;
