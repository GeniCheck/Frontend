import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import type { Employee } from "@/components/common/EmployeeDetailModal";

type ScoreValue = number | "NA";

interface EvaluationItem {
  id: string;
  title: string;
}

// 자기선언 질문별 이행도: 직원이 자기선언에서 답변했던 걸 기반으로 질문 (현재는 임시 문항)
const DECLARATION_ITEMS: EvaluationItem[] = [
  {
    id: "decl-1",
    title:
      "자기선언에서 응답한 '팀 내 협업 기여도' 항목의 신뢰도를 1~10점으로 평가해 주세요.",
  },
  {
    id: "decl-2",
    title:
      "자기선언에서 서술한 대표 성과 내용의 구체성과 신뢰도를 1~10점으로 평가해 주세요.",
  },
];

const CATEGORY_ITEMS: EvaluationItem[] = [
  {
    id: "trust",
    title: "동료와 상사로부터 느껴지는 신뢰도를 1~10점으로 평가해 주세요.",
  },
  {
    id: "integrity",
    title: "업무에 임하는 성실성과 책임감을 1~10점으로 평가해 주세요.",
  },
  {
    id: "performance",
    title: "담당 업무의 목표 달성도와 완성도를 1~10점으로 평가해 주세요.",
  },
  {
    id: "collaboration",
    title: "동료와의 협업 및 의사소통 능력을 1~10점으로 평가해 주세요.",
  },
  {
    id: "expertise",
    title: "담당 직무에 대한 전문성 수준을 1~10점으로 평가해 주세요.",
  },
  {
    id: "contribution",
    title:
      "재직 기간 동안 조직에 기여한 정도를 종합적으로 1~10점으로 평가해 주세요.",
  },
];

const ALL_ITEM_IDS = [
  ...DECLARATION_ITEMS.map((item) => item.id),
  ...CATEGORY_ITEMS.map((item) => item.id),
];

interface ScoreSelectorProps {
  value: ScoreValue | undefined;
  onChange: (value: ScoreValue) => void;
}

const ScoreSelector: React.FC<ScoreSelectorProps> = ({ value, onChange }) => (
  <div className="flex flex-wrap items-center gap-2">
    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
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
  </div>
);

const EvaluationPage: React.FC = () => {
  const { employeeId } = useParams();
  const location = useLocation();
  const employee = (location.state as { employee?: Employee } | null)?.employee;

  const [scores, setScores] = useState<Record<string, ScoreValue>>({});

  const handleScoreChange = (itemId: string, value: ScoreValue) => {
    setScores((prev) => ({ ...prev, [itemId]: value }));
  };

  const isComplete = ALL_ITEM_IDS.every((id) => scores[id] !== undefined);

  const handleSubmit = () => {
    if (!isComplete) return;
    alert("연동 필요");
  };

  return (
    <main className="flex min-h-screen flex-1 flex-col">
      {/* 상단 헤더: VerificationPage와 동일한 톤 유지 */}
      <header className="sticky top-0 z-40 flex h-17 items-center border-b border-gray-200 bg-white px-6">
        <div className="flex items-baseline gap-3 text-left">
          <h1 className="text-text1 text-base font-black tracking-tight">
            Verification
          </h1>
          <span className="text-xs font-semibold text-gray-400">
            직원 검증 관리
          </span>
        </div>
      </header>

      <div className="mx-auto w-full max-w-300 flex-1 space-y-6 p-6">
        {/* 페이지 타이틀 */}
        <h2 className="text-text1 text-xl font-black">검증 입력</h2>

        {/* 대상 직원 정보 + 평가 항목 안내 */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm">
          {employee ? (
            <>
              <p className="text-text1 text-lg font-black">{employee.name}</p>
              <p className="text-text2 mt-0.5 text-sm font-semibold">
                {employee.department} · {employee.position}
                {employee.resignedAt && ` · 퇴사일 ${employee.resignedAt}`}
              </p>
            </>
          ) : (
            <p className="text-2xs text-gray-400">대상 직원 ID: {employeeId}</p>
          )}

          <div className="text-2xs mt-4 rounded-xl border border-gray-100 bg-gray-50 p-3 leading-relaxed font-semibold text-gray-500">
            모든 점수는 1~10 사이 정수 또는 &quot;해당 없음&quot;으로
            입력합니다. 자유 서술형 의견과 퇴직 사유는 평가 항목에 포함하지
            않습니다.
          </div>
        </div>

        {/* 평가 항목 목록 */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="bg-brand-light text-brand text-2xs flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-black">
                1
              </span>
              <span className="text-text1 text-xs font-bold">
                자기선언 질문별 이행도
              </span>
            </div>
            <div className="space-y-4 pl-9">
              {DECLARATION_ITEMS.map((item, i) => (
                <div key={item.id}>
                  <p className="text-2xs mb-2 font-bold text-gray-500">
                    Q{i + 1}. {item.title}
                  </p>
                  <ScoreSelector
                    value={scores[item.id]}
                    onChange={(value) => handleScoreChange(item.id, value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {CATEGORY_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm"
            >
              <div className="mb-3.5 flex items-center gap-3">
                <span className="bg-brand-light text-brand text-2xs flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-black">
                  {i + 2}
                </span>
                <span className="text-text1 text-xs font-bold">
                  {item.title}
                </span>
              </div>
              <div className="pl-9">
                <ScoreSelector
                  value={scores[item.id]}
                  onChange={(value) => handleScoreChange(item.id, value)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 검증 완료 */}
        <div className="flex justify-end pb-2">
          <button
            type="button"
            disabled={!isComplete}
            onClick={handleSubmit}
            className={`rounded-xl px-5 py-2 text-xs font-bold shadow-md transition-all active:scale-95 ${
              isComplete
                ? "bg-brand shadow-brand/10 hover:bg-brand-dark text-white"
                : "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400 shadow-none"
            }`}
          >
            검증 완료
          </button>
        </div>
      </div>
    </main>
  );
};

export default EvaluationPage;
