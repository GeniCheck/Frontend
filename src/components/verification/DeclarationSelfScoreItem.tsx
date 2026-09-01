import React from "react";
import ScoreSelector, {
  type ScoreValue,
} from "@/components/common/ScoreSelector";
import type { DeclarationRecord } from "@/types/declaration";

interface DeclarationSelfScoreItemProps {
  index: number;
  record: DeclarationRecord;
  value: ScoreValue | undefined;
  onChange: (value: ScoreValue) => void;
}

// 입사 시 제출한 질문+답변을 읽기 전용으로 보여주고, 그 항목에 대한
// 1~10점 자기평가(self_score)를 입력받는 카드 하나.
const DeclarationSelfScoreItem: React.FC<DeclarationSelfScoreItemProps> = ({
  index,
  record,
  value,
  onChange,
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
          이 항목에 대한 자기평가 <span className="text-red-400">*</span>
        </p>
        <ScoreSelector value={value} onChange={onChange} />
      </div>
    </div>
  );
};

export default DeclarationSelfScoreItem;
