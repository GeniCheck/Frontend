import React from "react";

export type ScoreValue = number | "NA";

interface ScoreSelectorProps {
  value: ScoreValue | undefined;
  onChange: (value: ScoreValue) => void;
  min?: number;
  max?: number;
  allowNA?: boolean;
}

// 1~10점 또는 "해당 없음" 중 하나를 고르는 점수 선택 UI.
// EvaluationPage(대표 검증 점수)와 자기평가 페이지(직원 self_score)가 공유.
const ScoreSelector: React.FC<ScoreSelectorProps> = ({
  value,
  onChange,
  min = 1,
  max = 10,
  allowNA = true,
}) => (
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
    {allowNA && (
      <button
        type="button"
        onClick={() => onChange("NA")}
        className={`text-2xs rounded-full border px-3 py-1.5 font-bold transition-all active:scale-95 ${
          value === "NA"
            ? "border-gray-400 bg-gray-400 text-white"
            : "text-text2 border-gray-200 hover:bg-gray-50"
        }`}
      >
        해당 없음
      </button>
    )}
  </div>
);

export default ScoreSelector;
