import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  getResultLinkControllerGetResultQueryKey,
  useResultLinkControllerGetResult,
  useResultLinkControllerSubmitOpinion,
} from "@/api/generated/endpoints/evaluations/evaluations";
import type { EvaluationResultResponse } from "@/api/evaluationResponses";
import { extractErrorMessage } from "@/api/extractErrorMessage";
import { toLinkErrorStatus } from "@/api/linkErrorStatus";
import LinkStatusMessage from "@/components/verification/LinkStatusMessage";
import DeclarationScoreItem from "@/components/verification/DeclarationScoreItem";
import OpinionForm from "@/components/verification/OpinionForm";

const NoticeCard: React.FC<{ message: string }> = ({ message }) => (
  <div className="rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm">
    <span className="text-2xs font-bold text-gray-400">{message}</span>
  </div>
);

// 대표 검증 완료 통보 시 발송되는 링크(/evaluation/result/:token)로 접근하는,
// 로그인이 필요 없는 직원용 결과 확인·의견 제출 페이지.
const EvaluationResultPage: React.FC = () => {
  const { token = "" } = useParams();
  const queryClient = useQueryClient();
  const { data, isPending, error } = useResultLinkControllerGetResult(token, {
    query: { enabled: Boolean(token), retry: false },
  });
  const result = data as unknown as EvaluationResultResponse | undefined;

  const opinionMutation = useResultLinkControllerSubmitOpinion();
  const [opinionError, setOpinionError] = useState<string | null>(null);

  const linkStatus = !token ? "invalid" : toLinkErrorStatus(error);
  if (linkStatus) return <LinkStatusMessage status={linkStatus} />;

  if (isPending) {
    return (
      <div className="bg-surface flex min-h-screen items-center justify-center">
        <span className="text-2xs font-bold text-gray-400">확인 중...</span>
      </div>
    );
  }

  // 409 EVALUATION_NOT_COMPLETED 등은 서버 메시지를 그대로 보여준다.
  if (error || !result) {
    return (
      <div className="bg-surface flex min-h-screen items-center justify-center px-6">
        <span className="text-2xs font-bold text-gray-400">
          {extractErrorMessage(
            error,
            "검증 결과를 불러오지 못했어요. 잠시 후 다시 시도해주세요.",
          )}
        </span>
      </div>
    );
  }

  const handleOpinionSubmit = (content: string) => {
    setOpinionError(null);
    opinionMutation.mutate(
      { token, data: { content } },
      {
        // 제출 여부는 결과 조회의 opinion.submitted로 다시 받아온다.
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: getResultLinkControllerGetResultQueryKey(token),
          }),
        onError: (err) =>
          setOpinionError(
            extractErrorMessage(
              err,
              "의견 제출에 실패했어요. 다시 시도해주세요.",
            ),
          ),
      },
    );
  };

  const { opinion } = result;

  return (
    <div className="bg-surface min-h-screen px-6 py-10">
      <div className="mx-auto max-w-2xl space-y-4">
        <div>
          <p className="text-brand text-xs font-bold">
            {result.employee.companyName} · {result.employee.name}님
          </p>
          <h1 className="text-text1 mt-1 text-2xl font-black">
            검증 결과 확인
          </h1>
          <p className="text-2xs mt-1.5 text-gray-400">
            {new Date(result.completedAt).toLocaleDateString("ko-KR")}에 대표
            검증이 완료됐어요. 자기선언 항목별로 자기평가와 대표 검증 점수를
            비교해서 확인할 수 있어요.
          </p>
        </div>

        <div className="space-y-4">
          {result.items.map((item, i) => (
            <DeclarationScoreItem
              key={item.questionId}
              index={i}
              question={item.question}
              readOnly
              value={item.selfScore}
              label="자기평가"
              compareValue={item.ceoScore}
              compareLabel="대표 검증"
            />
          ))}
        </div>

        <div className="space-y-3 rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm">
          <h2 className="text-text1 text-sm font-black">공통 역량 평가</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {result.commonCompetencies.map((competency) => (
              <div
                key={competency.key}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5"
              >
                <span className="text-2xs font-bold text-gray-500">
                  {competency.name}
                </span>
                <span className="text-text1 text-sm font-black tabular-nums">
                  {competency.ceoScore}
                </span>
              </div>
            ))}
          </div>
          <p className="text-2xs pt-1 font-bold text-gray-500">
            재고용 의사{" "}
            <span className="text-text1">
              {result.rehireIntent ? "있음" : "없음"}
            </span>
          </p>
        </div>

        {opinion.submitted ? (
          <NoticeCard message="검증 결과에 대한 의견을 제출했어요." />
        ) : opinion.allowed ? (
          <OpinionForm
            dueAt={opinion.dueAt}
            isSubmitting={opinionMutation.isPending}
            error={opinionError}
            onSubmit={handleOpinionSubmit}
          />
        ) : (
          <NoticeCard message="의견 제출 기간이 지났어요." />
        )}
      </div>
    </div>
  );
};

export default EvaluationResultPage;
