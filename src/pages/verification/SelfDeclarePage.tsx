import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useDeclarationFormControllerGetForm,
  useDeclarationFormControllerSubmit,
} from "@/api/generated/endpoints/declaration/declaration";
import type { AnswerDto } from "@/api/generated/models/answerDto";
import type {
  DeclarationFormQuestion,
  DeclarationFormResponse,
} from "@/api/declarationResponses";
import { extractErrorMessage } from "@/api/extractErrorMessage";
import { toLinkErrorStatus, type LinkErrorStatus } from "@/api/linkErrorStatus";
import { CONSENT_ITEMS, type ConsentItemId } from "@/types/declaration";
import LinkStatusMessage from "@/components/verification/LinkStatusMessage";
import CompanyQuestionList from "@/components/verification/CompanyQuestionList";
import ConsentCheckboxes from "@/components/verification/ConsentCheckboxes";

const EMPTY_CONSENTS = CONSENT_ITEMS.reduce(
  (acc, item) => ({ ...acc, [item.id]: false }),
  {} as Record<ConsentItemId, boolean>,
);

const isAnswered = (q: DeclarationFormQuestion, answer?: AnswerDto) => {
  if (!answer) return false;
  if (q.type === "SCORE") return answer.answerScore !== undefined;
  if (q.type === "SINGLE_CHOICE") return Boolean(answer.answerOptionId);
  return (answer.answerText ?? "").trim().length > 0;
};

const SelfDeclarePage: React.FC = () => {
  const { token = "" } = useParams();
  const { data, isPending, error } = useDeclarationFormControllerGetForm(
    token,
    { query: { enabled: Boolean(token), retry: false } },
  );
  const form = data as unknown as DeclarationFormResponse | undefined;
  const questions = [...(form?.questions ?? [])].sort(
    (a, b) => a.order - b.order,
  );

  const submitMutation = useDeclarationFormControllerSubmit();

  const [answers, setAnswers] = useState<Record<string, AnswerDto>>({});
  const [consents, setConsents] =
    useState<Record<ConsentItemId, boolean>>(EMPTY_CONSENTS);
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
          질문지를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
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
            자기선언이 정상적으로 제출됐어요. 이 창은 닫으셔도 돼요.
          </p>
        </div>
      </div>
    );
  }

  const handleAnswerChange = (answer: AnswerDto) => {
    setAnswers((prev) => ({ ...prev, [answer.questionId]: answer }));
  };

  const handleConsentChange = (id: ConsentItemId, value: boolean) => {
    setConsents((prev) => ({ ...prev, [id]: value }));
  };

  const allRequiredAnswered = questions.every(
    (q) => !q.required || isAnswered(q, answers[q.questionId]),
  );
  const allConsentsChecked = Object.values(consents).every(Boolean);
  const isFormValid =
    questions.length > 0 && allRequiredAnswered && allConsentsChecked;

  const handleSubmit = () => {
    if (!isFormValid) return;
    setSubmitError(null);
    submitMutation.mutate(
      {
        token,
        data: {
          answers: questions
            .filter((q) => isAnswered(q, answers[q.questionId]))
            .map((q) => answers[q.questionId]),
          consents: { ...consents, consentVersion: form.consentVersion },
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
              "답변 제출에 실패했어요. 다시 시도해주세요.",
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
          <h1 className="text-text1 mt-1 text-2xl font-black">자기선언</h1>
          <p className="text-2xs mt-1.5 text-gray-400">
            {new Date(form.expiresAt).toLocaleDateString("ko-KR")}까지 제출할 수
            있어요. 아래 항목을 작성한 뒤 제출해주세요. 제출 후에는 이 링크로
            다시 접근할 수 없어요.
          </p>
        </div>

        <CompanyQuestionList
          questions={questions}
          answers={answers}
          onChange={handleAnswerChange}
        />

        <ConsentCheckboxes checked={consents} onChange={handleConsentChange} />

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
          {isSubmitting ? "제출 중..." : "자기선언 제출"}
        </button>
      </div>
    </div>
  );
};

export default SelfDeclarePage;
