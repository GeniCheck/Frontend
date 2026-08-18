import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTokenValidation } from "../../hooks/useTokenValidation";
import LinkStatusMessage from "../../components/verification/LinkStatusMessage";
import ApplicantGreetingBanner from "../../components/verification/ApplicantGreetingBanner";
import CompanyQuestionList from "../../components/verification/CompanyQuestionList";
import FreeDeclarationField from "../../components/verification/FreeDeclarationField";
import ResumeAttachment from "../../components/verification/ResumeAttachment";
import ConsentCheckboxes from "../../components/verification/ConsentCheckboxes";
import {
  MOCK_QUESTIONS,
  FREE_DECLARATION_QUESTIONS,
  CONSENT_LABELS,
} from "../../components/verification/mockData";

const SelfDeclarePage: React.FC = () => {
  const { token } = useParams();
  const { status } = useTokenValidation(token);

  const [answers, setAnswers] = useState<string[]>(
    Array(MOCK_QUESTIONS.length).fill(""),
  );
  const [freeTexts, setFreeTexts] = useState<string[]>(
    Array(FREE_DECLARATION_QUESTIONS.length).fill(""),
  );
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeLink, setResumeLink] = useState("");
  const [consents, setConsents] = useState<boolean[]>(
    Array(CONSENT_LABELS.length).fill(false),
  );

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <span className="text-sm text-text3">확인 중...</span>
      </div>
    );
  }

  if (status === "expired" || status === "invalid") {
    return <LinkStatusMessage status={status} />;
  }

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers((prev) => prev.map((a, i) => (i === index ? value : a)));
  };

  const handleFreeTextChange = (index: number, value: string) => {
    setFreeTexts((prev) => prev.map((t, i) => (i === index ? value : t)));
  };

  const handleConsentChange = (index: number, checked: boolean) => {
    setConsents((prev) => prev.map((c, i) => (i === index ? checked : c)));
  };

  const isFormValid =
    answers.every((a) => a.trim().length > 0) && consents.every(Boolean);

  return (
    <div className="min-h-screen bg-surface px-6 py-10">
      <div className="max-w-lg mx-auto space-y-4">
        <ApplicantGreetingBanner />

        <div>
          <h1 className="text-2xl font-medium text-text1">
            Self declaration
          </h1>
          <p className="text-sm text-text3 mt-1.5">
            아래 질문에 답변한 뒤 제출해주세요.
          </p>
        </div>

        <CompanyQuestionList answers={answers} onChange={handleAnswerChange} />
        <FreeDeclarationField
          values={freeTexts}
          onChange={handleFreeTextChange}
        />
        <ResumeAttachment
          file={resumeFile}
          onFileChange={setResumeFile}
          link={resumeLink}
          onLinkChange={setResumeLink}
        />
        <ConsentCheckboxes checked={consents} onChange={handleConsentChange} />

        <button
          type="button"
          onClick={() => {
            // TODO: 제출 API 연동 (이력서 업로드 → /declarations/answers → /declarations/free)
          }}
          disabled={!isFormValid}
          className={`w-full py-3.5 rounded-2xl text-sm font-medium transition-colors ${
            isFormValid
              ? "bg-brand hover:bg-brand-hover text-white cursor-pointer"
              : "bg-brand-light text-brand cursor-not-allowed"
          }`}
        >
          자기선언 제출
        </button>
      </div>
    </div>
  );
};

export default SelfDeclarePage;
