import React, { useEffect } from "react";
import { useEvaluationResultControllerGetResult } from "@/api/generated/endpoints/evaluations/evaluations";
import {
  formatDeclarationAnswer,
  type CeoEvaluationResultResponse,
} from "@/api/evaluationResponses";
import { extractErrorMessage } from "@/api/extractErrorMessage";
import type { Employee } from "@/components/common/EmployeeDetailModal";

interface EvaluationResultModalProps {
  // 응답엔 직원 이름 등이 없어, 헤더 표시용으로 VerificationPage의 행
  // 데이터를 그대로 받는다. employee.evaluationId로 열림 여부를 판단한다.
  employee: Employee | null;
  onClose: () => void;
}

const EvaluationResultModal: React.FC<EvaluationResultModalProps> = ({
  employee,
  onClose,
}) => {
  const open = !!employee?.evaluationId;
  const { data, isPending, error, refetch } =
    useEvaluationResultControllerGetResult(employee?.evaluationId ?? "", {
      query: { enabled: open },
    });
  const result = data as unknown as CeoEvaluationResultResponse | undefined;

  // Esc 키로 모달 닫기
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 text-left shadow-xl"
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-text1 text-base font-black">
              {employee?.name}
              <span className="text-text2 ml-2 text-sm font-bold">
                {employee?.department} · {employee?.position}
              </span>
            </h3>
            <p className="text-2xs mt-1 text-gray-400">평가 비교 결과</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-all hover:bg-gray-100 active:scale-90"
            aria-label="닫기"
          >
            <i className="ti ti-x text-sm" />
          </button>
        </div>

        {isPending ? (
          <p className="py-10 text-center text-xs font-bold text-gray-400">
            불러오는 중...
          </p>
        ) : error || !result ? (
          <div className="space-y-3 py-10 text-center">
            <p className="text-xs font-bold text-red-500">
              {extractErrorMessage(error, "평가 결과를 불러오지 못했어요.")}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="text-brand text-xs font-bold hover:opacity-80"
            >
              다시 시도
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* 재고용 의사·결과 통보·직원 의견 요약 */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3.5">
                <p className="text-2xs font-bold text-gray-400">재고용 의사</p>
                <p
                  className={`mt-1 text-sm font-black ${
                    result.rehireIntent ? "text-emerald-500" : "text-gray-400"
                  }`}
                >
                  {result.rehireIntent ? "있음" : "없음"}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3.5">
                <p className="text-2xs font-bold text-gray-400">결과 통보</p>
                <p className="text-text1 mt-1 text-sm font-black">
                  {result.notification.sent ? "발송됨" : "미발송"}
                </p>
                <p className="text-3xs mt-0.5 text-gray-400">
                  {result.notification.viewedAt
                    ? `${new Date(result.notification.viewedAt).toLocaleString("ko-KR")} 열람`
                    : "아직 열람 전"}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3.5">
                <p className="text-2xs font-bold text-gray-400">직원 의견</p>
                <p className="text-text1 mt-1 text-sm font-black">
                  {result.employeeOpinion.submitted ? "제출됨" : "미제출"}
                </p>
              </div>
            </div>

            {/* 자기선언 질문별 비교 */}
            <div className="space-y-3">
              <p className="text-2xs font-bold text-gray-400">
                자기선언 질문별 비교
              </p>
              {result.items.map((item) => (
                <div
                  key={item.questionId}
                  className="rounded-2xl border border-gray-200 p-4"
                >
                  <p className="text-text1 text-xs font-bold">
                    {item.question}
                  </p>
                  <p className="text-text2 mt-1.5 text-xs">
                    {formatDeclarationAnswer(item.declarationAnswer)}
                  </p>
                  <div className="text-2xs mt-3 flex flex-wrap gap-4 font-bold">
                    <span className="text-gray-400">
                      자기평가{" "}
                      <span className="text-text1">
                        {item.selfScore ?? "—"}
                      </span>
                    </span>
                    <span className="text-gray-400">
                      대표 검증{" "}
                      <span className="text-text1">{item.ceoScore}</span>
                    </span>
                    {item.scoreGap !== null && (
                      <span
                        className={
                          item.scoreGap === 0
                            ? "text-gray-400"
                            : item.scoreGap > 0
                              ? "text-emerald-500"
                              : "text-red-400"
                        }
                      >
                        차이{" "}
                        {item.scoreGap > 0
                          ? `+${item.scoreGap}`
                          : item.scoreGap}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 공통 역량 6개 */}
            <div className="space-y-2">
              <p className="text-2xs font-bold text-gray-400">공통 역량 점수</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {result.commonCompetencies.map((competency) => (
                  <div
                    key={competency.key}
                    className="rounded-xl bg-gray-50 p-3 text-center"
                  >
                    <p className="text-2xs font-bold text-gray-400">
                      {competency.name}
                    </p>
                    <p className="text-text1 mt-1 text-lg font-black">
                      {competency.ceoScore}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 직원 의견: 글자 수가 길 수 있어 요약 카드와 분리해 아래에 크게 보여준다 */}
            {result.employeeOpinion.submitted &&
              result.employeeOpinion.content && (
                <div className="space-y-2">
                  <p className="text-2xs font-bold text-gray-400">
                    직원 의견
                    {result.employeeOpinion.submittedAt && (
                      <span className="ml-1.5 font-normal text-gray-400">
                        (
                        {new Date(
                          result.employeeOpinion.submittedAt,
                        ).toLocaleString("ko-KR")}{" "}
                        제출)
                      </span>
                    )}
                  </p>
                  <div className="text-text1 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm leading-relaxed whitespace-pre-wrap">
                    {result.employeeOpinion.content}
                  </div>
                </div>
              )}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-text2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold shadow-sm transition-all hover:bg-gray-50 active:scale-95"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationResultModal;
