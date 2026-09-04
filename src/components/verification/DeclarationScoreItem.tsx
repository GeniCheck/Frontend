import React from "react";
import ScoreSelector, {
  type ScoreValue,
} from "@/components/common/ScoreSelector";
import type { DeclarationRecord } from "@/types/declaration";

interface DeclarationScoreItemProps {
  index: number;
  record: DeclarationRecord;
  value: ScoreValue | undefined;
  onChange?: (value: ScoreValue) => void;
  label?: string;
  readOnly?: boolean;
}

// 자기평가·대표 검증은 입력형, 직원 결과 확인 화면은 readOnly로 함께 쓰는 카드.
const DeclarationScoreItem: React.FC<DeclarationScoreItemProps> = ({
  index,
  record,
  value,
  onChange = () => {},
  label = "이 항목에 대한 자기평가",
  readOnly = false,
}) => {
  return (
    <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm">
      <div>
        <p className="text-sm font-bold text-gray-500">
          Q{index + 1}. {record.question.question}
        </p>
        <div className="text-text1 mt-2 rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm leading-relaxed">
          {record.answerText}
        </div>
      </div>
      <div>
        <p className="text-2xs mb-2 font-bold text-gray-400">
          {label}
          {!readOnly && <span className="text-red-400"> *</span>}
        </p>
        {readOnly ? (
          <span className="text-2xs text-text1 inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-gray-100 px-3 font-bold">
            {value === undefined ? "—" : value === "NA" ? "해당 없음" : value}
          </span>
        ) : (
          <ScoreSelector value={value} onChange={onChange} />
        )}
      </div>
    </div>
  );
};

export default DeclarationScoreItem;
