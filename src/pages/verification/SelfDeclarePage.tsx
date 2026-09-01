import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTokenValidation } from "@/hooks/useTokenValidation";
import { useDeclarationQuestions } from "@/hooks/useDeclarationQuestions";
import { CONSENT_ITEMS, type ConsentItemId } from "@/types/declaration";
import LinkStatusMessage from "@/components/verification/LinkStatusMessage";
import CompanyQuestionList from "@/components/verification/CompanyQuestionList";
import ResumeAttachment from "@/components/verification/ResumeAttachment";
import ConsentCheckboxes from "@/components/verification/ConsentCheckboxes";

const EMPTY_CONSENTS = CONSENT_ITEMS.reduce(
  (acc, item) => ({ ...acc, [item.id]: false }),
  {} as Record<ConsentItemId, boolean>,
);

// 기능명세서 2장(자기 선언). 대표가 QuestionTemplatePage에서 "질문지 발송"으로
// 보낸 1회성 링크(/verification/self-declare/:token)로 접근하는, 로그인이
// 필요 없는 직원용 페이지.
const SelfDeclarePage: React.FC = () => {
  const { token } = useParams();
  const { status, context } = useTokenValidation(token);
  const { questions, isLoading: questionsLoading } = useDeclarationQuestions(
    context?.companyId,
  );

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeLink, setResumeLink] = useState("");
  const [consents, setConsents] =
    useState<Record<ConsentItemId, boolean>>(EMPTY_CONSENTS);
  const [isSubmitting, setSubmitting] = useState(false);

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

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleConsentChange = (id: ConsentItemId, value: boolean) => {
    setConsents((prev) => ({ ...prev, [id]: value }));
  };

  const allQuestionsAnswered =
    questions.length > 0 &&
    questions.every((q) => (answers[q.id] ?? "").trim().length > 0);
  const allConsentsChecked = Object.values(consents).every(Boolean);
  const isFormValid = allQuestionsAnswered && allConsentsChecked;

  const handleSubmit = async () => {
    if (!isFormValid || !context) return;

    setSubmitting(true);
    try {
      // TODO: 백엔드 연동 지점
      // 1) POST /declarations/answers { token, answers }
      // 2) POST /declarations/resume  S3 Presigned URL 발급 → 업로드 or 링크 등록
      console.log("submit self-declaration", {
        context,
        answers,
        resumeFile,
        resumeLink,
        consents,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen px-6 py-10">
      <div className="mx-auto max-w-2xl space-y-4">
        <div>
          <h1 className="text-text1 text-2xl font-black">자기선언</h1>
          <p className="text-2xs mt-1.5 text-gray-400">
            아래 항목을 작성한 뒤 제출해주세요. 제출 후에는 이 링크로 다시
            접근할 수 없어요.
          </p>
        </div>

        {questionsLoading ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <span className="text-2xs font-bold text-gray-400">
              질문을 불러오는 중...
            </span>
          </div>
        ) : (
          <CompanyQuestionList
            questions={questions}
            answers={answers}
            onChange={handleAnswerChange}
          />
        )}

        <ResumeAttachment
          file={resumeFile}
          onFileChange={setResumeFile}
          link={resumeLink}
          onLinkChange={setResumeLink}
        />

        <ConsentCheckboxes checked={consents} onChange={handleConsentChange} />

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
