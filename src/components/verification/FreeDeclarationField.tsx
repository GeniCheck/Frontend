import React from "react";

const FREE_TEXT_MAX_LENGTH = 1000;

interface FreeDeclarationFieldProps {
  value: string;
  onChange: (value: string) => void;
}

// 기능명세서 2.2: 지원자(직원) 자유 선언 — 어필하고 싶은 역량/경험/가치관을
// 자유 텍스트로 입력. 기업 질문과 달리 선택 항목이라 비워두고 제출해도 됨.
// 글자수 제한은 명세서에 없어 임시로 1000자 설정 — 백엔드 확정되면 조정 필요.
const FreeDeclarationField: React.FC<FreeDeclarationFieldProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2 rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
      <div>
        <h2 className="text-text1 text-sm font-black">
          자유 선언{" "}
          <span className="text-2xs font-normal text-gray-300">(선택)</span>
        </h2>
        <p className="text-2xs mt-1 text-gray-400">
          어필하고 싶은 역량, 경험, 가치관을 자유롭게 작성해주세요.
        </p>
      </div>
      <textarea
        value={value}
        maxLength={FREE_TEXT_MAX_LENGTH}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        placeholder="자유롭게 작성해주세요 (선택)"
        className="text-text1 w-full resize-none rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs placeholder:text-gray-300 focus:outline-none"
      />
      <span className="text-3xs block text-right text-gray-300">
        {value.length} / {FREE_TEXT_MAX_LENGTH}
      </span>
    </div>
  );
};

export default FreeDeclarationField;
