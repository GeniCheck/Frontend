import React from "react";
import { useParams } from "react-router-dom";
import { useTokenValidation } from "@/hooks/useTokenValidation";
import { useMyDeclaration } from "@/hooks/useMyDeclaration";
import { useSelfEvaluationScores } from "@/hooks/useSelfEvaluationScores";
import { useCeoVerificationScores } from "@/hooks/useCeoVerificationScores";
import LinkStatusMessage from "@/components/verification/LinkStatusMessage";
import DeclarationScoreItem from "@/components/verification/DeclarationScoreItem";
import DisputeForm from "@/components/verification/DisputeForm";

// 대표 검증 완료 통보 시 발송되는 링크(/evaluation/result/:token)로 접근하는,
// 로그인이 필요 없는 직원용 결과 확인·이의제기 페이지.
const EvaluationResultPage: React.FC = () => {
  const { token } = useParams();
  const { status, context } = useTokenValidation(token);
  const { records, isLoading: recordsLoading } = useMyDeclaration(
    context?.employeeId,
  );
  const { scores: selfScores, isLoading: selfScoresLoading } =
    useSelfEvaluationScores(context?.employeeId);
  const { scores: ceoScores, isLoading: ceoScoresLoading } =
    useCeoVerificationScores(context?.employeeId);

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

  const isLoading = recordsLoading || selfScoresLoading || ceoScoresLoading;

  // TODO: 실제 연동 시 POST /evaluation/:id/dispute 호출로 교체.
  const handleDisputeSubmit = (reason: string) => {
    console.log("submit dispute", { token: context?.token, reason });
  };

  return (
    <div className="bg-surface min-h-screen px-6 py-10">
      <div className="mx-auto max-w-2xl space-y-4">
        <div>
          <h1 className="text-text1 text-2xl font-black">검증 결과 확인</h1>
          <p className="text-2xs mt-1.5 text-gray-400">
            자기선언 항목별로 자기평가와 대표 검증 점수를 비교해서 확인할 수
            있어요.
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <span className="text-2xs font-bold text-gray-400">
              불러오는 중...
            </span>
          </div>
        ) : records.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <span className="text-2xs font-bold text-gray-400">
              검증 결과를 찾을 수 없어요.
            </span>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {records.map((record, i) => (
                <DeclarationScoreItem
                  key={record.question.id}
                  index={i}
                  record={record}
                  readOnly
                  value={selfScores[record.question.id]}
                  label="자기평가"
                  compareValue={ceoScores[record.question.id]}
                  compareLabel="대표 검증"
                />
              ))}
            </div>

            <DisputeForm onSubmit={handleDisputeSubmit} />
          </>
        )}
      </div>
    </div>
  );
};

export default EvaluationResultPage;
