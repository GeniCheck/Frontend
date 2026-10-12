import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCeoEvaluationControllerGetForm,
  useCeoEvaluationControllerSubmit,
} from "@/api/generated/endpoints/evaluations/evaluations";
import { getEmployeeControllerListQueryKey } from "@/api/generated/endpoints/employee/employee";
import { CompetencyScoreDtoKey } from "@/api/generated/models/competencyScoreDtoKey";
import {
  formatDeclarationAnswer,
  type CeoEvaluationFormResponse,
} from "@/api/evaluationResponses";
import { extractErrorMessage } from "@/api/extractErrorMessage";
import type { Employee } from "@/components/common/EmployeeDetailModal";
import ScoreSelector, {
  type ScoreValue,
} from "@/components/common/ScoreSelector";
import DeclarationScoreItem from "@/components/verification/DeclarationScoreItem";

const COMPETENCY_ITEMS: { key: CompetencyScoreDtoKey; title: string }[] = [
  {
    key: CompetencyScoreDtoKey.TRUST,
    title: "동료와 상사로부터 느껴지는 신뢰도를 1~10점으로 평가해 주세요.",
  },
  {
    key: CompetencyScoreDtoKey.DILIGENCE,
    title: "업무에 임하는 성실성을 1~10점으로 평가해 주세요.",
  },
  {
    key: CompetencyScoreDtoKey.RESPONSIBILITY,
    title: "맡은 업무를 끝까지 책임지는 태도를 1~10점으로 평가해 주세요.",
  },
  {
    key: CompetencyScoreDtoKey.COLLABORATION,
    title: "동료와의 협업 능력을 1~10점으로 평가해 주세요.",
  },
  {
    key: CompetencyScoreDtoKey.COMMUNICATION,
    title: "의사소통 능력을 1~10점으로 평가해 주세요.",
  },
  {
    key: CompetencyScoreDtoKey.GROWTH_POTENTIAL,
    title: "앞으로의 성장 가능성을 1~10점으로 평가해 주세요.",
  },
];

const PageShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="flex min-h-screen flex-1 flex-col">
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
      {children}
    </div>
  </main>
);

const StatusCard: React.FC<{ message: string }> = ({ message }) => (
  <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
    <p className="text-2xs font-bold text-gray-400">{message}</p>
    <Link
      to="/main/verification"
      className="text-text2 mt-4 inline-block rounded-xl border border-gray-200 px-4 py-2 text-xs font-bold hover:bg-gray-50"
    >
      직원 목록으로
    </Link>
  </div>
);

const EvaluationPage: React.FC = () => {
  const { evaluationId = "" } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const employee = (location.state as { employee?: Employee } | null)?.employee;

  const { data, isPending, error } = useCeoEvaluationControllerGetForm(
    evaluationId,
    { query: { enabled: Boolean(evaluationId), retry: false } },
  );
  const form = data as unknown as CeoEvaluationFormResponse | undefined;
  const items = [...(form?.items ?? [])].sort((a, b) => a.order - b.order);

  const submitMutation = useCeoEvaluationControllerSubmit();

  const [scores, setScores] = useState<Record<string, ScoreValue>>({});
  const [rehireIntent, setRehireIntent] = useState<boolean | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (isPending) {
    return (
      <PageShell>
        <div className="p-8 text-center">
          <span className="text-2xs font-bold text-gray-400">
            검증 정보를 불러오는 중...
          </span>
        </div>
      </PageShell>
    );
  }

  if (error || !form) {
    return (
      <PageShell>
        <StatusCard
          message={extractErrorMessage(
            error,
            "검증 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.",
          )}
        />
      </PageShell>
    );
  }

  const handleScoreChange = (key: string, value: ScoreValue) => {
    setScores((prev) => ({ ...prev, [key]: value }));
  };

  const isScored = (key: string) => typeof scores[key] === "number";
  const isComplete =
    items.length > 0 &&
    items.every((item) => isScored(item.questionId)) &&
    COMPETENCY_ITEMS.every((item) => isScored(item.key)) &&
    rehireIntent !== null;

  const handleSubmit = () => {
    if (!isComplete || rehireIntent === null) return;
    setSubmitError(null);
    submitMutation.mutate(
      {
        evaluationId,
        data: {
          items: items.map((item) => ({
            questionId: item.questionId,
            ceoScore: scores[item.questionId] as number,
          })),
          commonCompetencies: COMPETENCY_ITEMS.map((item) => ({
            key: item.key,
            score: scores[item.key] as number,
          })),
          rehireIntent,
        },
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: getEmployeeControllerListQueryKey(),
          });
          alert("검증이 완료되었습니다.");
          navigate("/main/verification");
        },
        onError: (err) => {
          setSubmitError(
            extractErrorMessage(
              err,
              "검증 제출에 실패했어요. 다시 시도해주세요.",
            ),
          );
        },
      },
    );
  };

  const isSubmitting = submitMutation.isPending;
  const name = form.employee.name || employee?.name;
  const department = form.employee.department ?? employee?.department;
  const position = form.employee.position ?? employee?.position;
  const resignedAt = form.employee.resignedAt ?? employee?.resignedAt;

  return (
    <PageShell>
      <h2 className="text-text1 text-xl font-black">검증 입력</h2>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm">
        <p className="text-text1 text-lg font-black">{name}</p>
        <p className="text-text2 mt-0.5 text-sm font-semibold">
          {[department, position].filter(Boolean).join(" · ")}
          {resignedAt && ` · 퇴사일 ${resignedAt.slice(0, 10)}`}
        </p>

        <div className="text-2xs mt-4 rounded-xl border border-gray-100 bg-gray-50 p-3 leading-relaxed font-semibold text-gray-500">
          {new Date(form.dueAt).toLocaleDateString("ko-KR")}까지 제출할 수
          있어요. 모든 점수는 {form.scoreMin}~{form.scoreMax} 사이 정수로
          입력하며, 제출 후에는 수정할 수 없습니다.
        </div>
      </div>

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
            {items.map((item, i) => (
              <DeclarationScoreItem
                key={item.questionId}
                index={i}
                question={item.question}
                answer={
                  <>
                    {formatDeclarationAnswer(item.declarationAnswer)}
                    {item.selfScore != null && (
                      <span className="text-2xs mt-1.5 block font-bold text-gray-400">
                        직원 자기평가 {item.selfScore}점
                      </span>
                    )}
                  </>
                }
                value={scores[item.questionId]}
                onChange={(value) => handleScoreChange(item.questionId, value)}
                label="대표 검증 점수"
                scoreMin={form.scoreMin}
                scoreMax={form.scoreMax}
                allowNA={false}
              />
            ))}
          </div>
        </div>

        {COMPETENCY_ITEMS.map((item, i) => (
          <div
            key={item.key}
            className="rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm"
          >
            <div className="mb-3.5 flex items-center gap-3">
              <span className="bg-brand-light text-brand text-2xs flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-black">
                {i + 2}
              </span>
              <span className="text-text1 text-xs font-bold">{item.title}</span>
            </div>
            <div className="pl-9">
              <ScoreSelector
                value={scores[item.key]}
                onChange={(value) => handleScoreChange(item.key, value)}
                min={form.scoreMin}
                max={form.scoreMax}
                allowNA={false}
              />
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm">
          <div className="mb-3.5 flex items-center gap-3">
            <span className="bg-brand-light text-brand text-2xs flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-black">
              {COMPETENCY_ITEMS.length + 2}
            </span>
            <span className="text-text1 text-xs font-bold">
              이 직원을 다시 고용할 의사가 있나요?
            </span>
          </div>
          <div className="flex gap-2 pl-9">
            {[
              { value: true, label: "예" },
              { value: false, label: "아니오" },
            ].map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setRehireIntent(option.value)}
                className={`text-2xs rounded-full border px-5 py-1.5 font-bold transition-all active:scale-95 ${
                  rehireIntent === option.value
                    ? "bg-brand border-brand text-white"
                    : "text-text2 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {submitError && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-left">
          <p className="text-2xs font-bold text-red-500">{submitError}</p>
        </div>
      )}

      <div className="flex justify-end pb-2">
        <button
          type="button"
          disabled={!isComplete || isSubmitting}
          onClick={handleSubmit}
          className={`rounded-xl px-5 py-2 text-xs font-bold shadow-md transition-all active:scale-95 ${
            isComplete && !isSubmitting
              ? "bg-brand shadow-brand/10 hover:bg-brand-dark text-white"
              : "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400 shadow-none"
          }`}
        >
          {isSubmitting ? "제출 중..." : "검증 완료"}
        </button>
      </div>
    </PageShell>
  );
};

export default EvaluationPage;
