import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useSelfEvaluationControllerGetForm,
  useSelfEvaluationControllerSubmit,
} from "@/api/generated/endpoints/evaluations/evaluations";
import {
  formatDeclarationAnswer,
  type SelfEvaluationFormResponse,
} from "@/api/evaluationResponses";
import { extractErrorMessage } from "@/api/extractErrorMessage";
import { toLinkErrorStatus, type LinkErrorStatus } from "@/api/linkErrorStatus";
import type { ScoreValue } from "@/components/common/ScoreSelector";
import LinkStatusMessage from "@/components/verification/LinkStatusMessage";
import DeclarationScoreItem from "@/components/verification/DeclarationScoreItem";

// 대표가 퇴사 처리(EmployeeDetailModal "퇴사 처리 확정")를 하면 시스템이
// 자동 발송하는 1회성 링크(/evaluation/self/:token)로 접근하는, 로그인이
// 필요 없는 직원용 자기평가 페이지.
const SelfEvaluationPage: React.FC = () => {
  const { token = "" } = useParams();
  const { data, isPending, error } = useSelfEvaluationControllerGetForm(token, {
    query: { enabled: Boolean(token), retry: false },
  });
  const form = data as unknown as SelfEvaluationFormResponse | undefined;
  const items = [...(form?.items ?? [])].sort((a, b) => a.order - b.order);

  const submitMutation = useSelfEvaluationControllerSubmit();

  const [scores, setScores] = useState<Record<string, ScoreValue>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [linkError, setLinkError] = useState<LinkErrorStatus | null>(null);

  const linkStatus = !token
    ? "invalid"
    : (linkError ?? toLinkErrorStatus(error));
  if (linkStatus) return <LinkStatusMessage status={linkStatus} />;

  if (isPending) {
    return (
      <div className="bg-surface flex min-h-screen items-center justify-center">
        <span className="text-2xs font-bold text-gray-400">확인 중...</span>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="bg-surface flex min-h-screen items-center justify-center">
        <span className="text-2xs font-bold text-gray-400">
          자기평가를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
        </span>
      </div>
    );
  }

  if (submitMutation.isSuccess) {
    return (
      <div className="bg-surface flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="bg-brand-light text-brand mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
            <i className="ti ti-check text-xl" />
          </div>
          <h1 className="text-text1 text-base font-black">제출이 완료됐어요</h1>
          <p className="text-2xs mt-2 leading-relaxed text-gray-400">
            자기평가가 정상적으로 제출됐어요. 이 창은 닫으셔도 돼요.
          </p>
        </div>
      </div>
    );
  }

  const handleScoreChange = (questionId: string, value: ScoreValue) => {
    setScores((prev) => ({ ...prev, [questionId]: value }));
  };

  const isFormValid =
    items.length > 0 &&
    items.every((item) => typeof scores[item.questionId] === "number");

  const handleSubmit = () => {
    if (!isFormValid) return;
    setSubmitError(null);
    submitMutation.mutate(
      {
        token,
        data: {
          items: items.map((item) => ({
            questionId: item.questionId,
            selfScore: scores[item.questionId] as number,
          })),
        },
      },
      {
        onError: (err) => {
          const status = toLinkErrorStatus(err);
          if (status) {
            setLinkError(status);
            return;
          }
          setSubmitError(
            extractErrorMessage(
              err,
              "자기평가 제출에 실패했어요. 다시 시도해주세요.",
            ),
          );
        },
      },
    );
  };

  const isSubmitting = submitMutation.isPending;

  return (
    <div className="bg-surface min-h-screen px-6 py-10">
      <div className="mx-auto max-w-2xl space-y-4">
        <div>
          <p className="text-brand text-xs font-bold">
            {form.employee.companyName} · {form.employee.name}님
          </p>
          <h1 className="text-text1 mt-1 text-2xl font-black">자기평가</h1>
          <p className="text-2xs mt-1.5 text-gray-400">
            {new Date(form.dueAt).toLocaleDateString("ko-KR")}까지 제출할 수
            있어요. 입사 시 제출한 자기선언 내용을 확인하고, 각 항목을 스스로
            평가해주세요. 제출 후에는 수정할 수 없어요.
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, i) => (
            <DeclarationScoreItem
              key={item.questionId}
              index={i}
              question={item.question}
              answer={formatDeclarationAnswer(item.declarationAnswer)}
              value={scores[item.questionId]}
              onChange={(value) => handleScoreChange(item.questionId, value)}
              scoreMin={form.scoreMin}
              scoreMax={form.scoreMax}
              allowNA={false}
            />
          ))}
        </div>

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
