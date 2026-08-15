import React from "react";

export const CONSENT_LABELS = [
  "역량 검증 동의 — 퇴사 후 대표의 검증 평가에 동의합니다",
  "데이터 조회 동의 — 타 기업의 유료 열람에 동의합니다",
  "동의 기록 보관에 동의합니다",
];

interface ConsentCheckboxesProps {
  checked: boolean[];
  onChange: (index: number, checked: boolean) => void;
}

const ConsentCheckboxes: React.FC<ConsentCheckboxesProps> = ({
  checked,
  onChange,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 space-y-2.5">
      {CONSENT_LABELS.map((label, index) => (
        <label
          key={label}
          className="flex items-start gap-2 text-sm text-text2 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={checked[index] ?? false}
            onChange={(e) => onChange(index, e.target.checked)}
            className="mt-0.5"
          />
          {label}
        </label>
      ))}
    </div>
  );
};

export default ConsentCheckboxes;
