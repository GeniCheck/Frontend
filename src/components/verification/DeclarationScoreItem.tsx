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
  compareValue?: ScoreValue;
  compareLabel?: string;
}

const formatScore = (value: ScoreValue | undefined) =>
  value === undefined ? "—" : value === "NA" ? "해당 없음" : value;

const ScoreBadge: React.FC<{ label: string; value: ScoreValue | undefined }> = ({
  label,
  value,
}) => (
  <div>
    <p className="text-2xs mb-2 font-bold text-gray-400">{label}</p>
    <span className="text-text1 inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-gray-100 px-3 text-sm font-black">
      {formatScore(value)}
    </span>
  </div>
);

// 자기평가·대표 검증은 입력형, 직원 결과 확인 화면은 readOnly(+비교 점수)로 함께 쓰는 카드.
const DeclarationScoreItem: React.FC<DeclarationScoreItemProps> = ({
  index,
  record,
  value,
  onChange = () => {},
  label = "이 항목에 대한 자기평가",
  readOnly = false,
  compareValue,
  compareLabel,
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
      {readOnly ? (
        <div className="flex flex-wrap gap-6">
          <ScoreBadge label={label} value={value} />
          {compareLabel && (
            <ScoreBadge label={compareLabel} value={compareValue} />
          )}
        </div>
      ) : (
        <div>
          <p className="text-2xs mb-2 font-bold text-gray-400">
            {label} <span className="text-red-400">*</span>
          </p>
          <ScoreSelector value={value} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default DeclarationScoreItem;
