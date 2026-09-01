import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTokenValidation } from "@/hooks/useTokenValidation";
import { useMyDeclaration } from "@/hooks/useMyDeclaration";
import { type ScoreValue } from "@/components/common/ScoreSelector";
import LinkStatusMessage from "@/components/verification/LinkStatusMessage";
import DeclarationSelfScoreItem from "@/components/verification/DeclarationSelfScoreItem";

// 대표가 퇴사 처리(EmployeeDetailModal "퇴사 처리 확정")를 하면 시스템이
// 자동 발송하는 1회성 링크(/evaluation/self/:token)로 접근하는, 로그인이
// 필요 없는 직원용 자기평가 페이지.
const SelfEvaluationPage: React.FC = () => {
  const { token } = useParams();
  const { status, context } = useTokenValidation(token);
  const { records, isLoading: recordsLoading } = useMyDeclaration(
    context?.employeeId,
  );

  const [scores, setScores] = useState<Record<string, ScoreValue>>({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (status === "loading") {
    return (
      <div className="bg-surface flex min-h-screen items-center justify-center">
        <span className="text-2xs font-bold text-gray-400">확인 중...</span>
      </div>
    );
  }

  if (status === "expired" || status === "invalid") {
    return <LinkStatusMessage status={status} />;
  }

  const handleScoreChange = (questionId: string, value: ScoreValue) => {
    setScores((prev) => ({ ...prev, [questionId]: value }));
  };

  const isFormValid =
    records.length > 0 &&
    records.every((r) => scores[r.question.id] !== undefined);

  // TODO: 실제 연동 시 POST /evaluation/self/:token 호출로 교체.
  const handleSubmit = async () => {
    if (!isFormValid || !context) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        token: context.token,
        scores: Object.entries(scores).map(([questionId, value]) => ({
          questionId,
          value,
        })),
      };
      console.log("submit self evaluation", payload);
    } catch {
      setSubmitError("자기평가 제출에 실패했어요. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen px-6 py-10">
      <div className="mx-auto max-w-2xl space-y-4">
        <div>
          <h1 className="text-text1 text-2xl font-black">자기평가</h1>
          <p className="text-2xs mt-1.5 text-gray-400">
            입사 시 제출한 자기선언 내용을 확인하고, 각 항목을 스스로
            평가해주세요. 제출 후에는 이 링크로 다시 접근할 수 없어요.
          </p>
        </div>

        {recordsLoading ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <span className="text-2xs font-bold text-gray-400">
              불러오는 중...
            </span>
          </div>
        ) : (
          <div className="space-y-4">
            {records.map((record, i) => (
              <DeclarationSelfScoreItem
                key={record.question.id}
                index={i}
                record={record}
                value={scores[record.question.id]}
                onChange={(value) =>
                  handleScoreChange(record.question.id, value)
                }
              />
            ))}
          </div>
        )}

        {submitError && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-3">
            <p className="text-2xs font-bold text-red-500">{submitError}</p>
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className={`w-full rounded-2xl py-3.5 text-sm font-bold transition-colors ${
            isFormValid && !isSubmitting
              ? "bg-brand hover:bg-brand-dark cursor-pointer text-white"
              : "bg-brand-light text-brand cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "제출 중..." : "자기평가 제출"}
        </button>
      </div>
    </div>
  );
};

export default SelfEvaluationPage;
