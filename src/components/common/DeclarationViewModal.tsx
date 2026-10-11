import React, { useEffect } from "react";
import { useDeclarationControllerGetEmployeeDeclarations } from "@/api/generated/endpoints/declaration/declaration";
import type {
  Declaration,
  DeclarationItem,
  EmployeeDeclarationsResponse,
} from "@/api/declarationResponses";

const STATUS_LABEL: Record<string, string> = {
  SUBMITTED: "제출완료",
  EXPIRED: "기간 만료",
};

const STATUS_BADGE: Record<string, string> = {
  SUBMITTED: "bg-emerald-50 text-emerald-500",
  EXPIRED: "bg-gray-100 text-gray-400",
};

const ItemAnswer: React.FC<{ item: DeclarationItem }> = ({ item }) => {
  if (item.type === "SCORE") {
    return (
      <span className="text-text1 font-bold">{item.answerScore ?? "—"}점</span>
    );
  }
  if (item.type === "SINGLE_CHOICE") {
    return (
      <span className="text-text1 font-bold">
        {item.answerOption?.label ?? "—"}
      </span>
    );
  }
  return <span className="text-text1 font-bold">{item.answerText ?? "—"}</span>;
};

interface DeclarationViewModalProps {
  employeeId: string | null;
  onClose: () => void;
}

const DeclarationViewModal: React.FC<DeclarationViewModalProps> = ({
  employeeId,
  onClose,
}) => {
  const open = employeeId !== null;
  const { data, isPending, isError, refetch } =
    useDeclarationControllerGetEmployeeDeclarations(employeeId ?? "", {
      query: { enabled: open },
    });
  const result = data as unknown as EmployeeDeclarationsResponse | undefined;
  const declarations: Declaration[] = result?.declarations ?? [];

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
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 text-left shadow-xl"
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-text1 text-base font-black">자기선언 조회</h3>
            <p className="text-2xs mt-1 text-gray-400">
              제출된 자기선언을 최신순으로 보여줘요.
            </p>
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
        ) : isError ? (
          <div className="space-y-3 py-10 text-center">
            <p className="text-xs font-bold text-red-500">
              자기선언을 불러오지 못했어요.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="text-brand text-xs font-bold hover:opacity-80"
            >
              다시 시도
            </button>
          </div>
        ) : declarations.length === 0 ? (
          <p className="py-10 text-center text-xs font-bold text-gray-400">
            제출된 자기선언이 없어요.
          </p>
        ) : (
          <div className="space-y-5">
            {declarations.map((declaration) => (
              <div
                key={declaration.declarationId}
                className="rounded-2xl border border-gray-200 p-5"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-text1 text-sm font-black">
                      {declaration.templateName}
                      <span className="ml-1.5 text-xs font-bold text-gray-400">
                        v{declaration.templateVersion}
                      </span>
                    </p>
                    <p className="text-2xs mt-0.5 text-gray-400">
                      {new Date(declaration.submittedAt).toLocaleString(
                        "ko-KR",
                      )}{" "}
                      제출
                    </p>
                  </div>
                  <span
                    className={`text-2xs shrink-0 rounded-full px-2 py-0.5 font-bold ${
                      STATUS_BADGE[declaration.status] ??
                      "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {STATUS_LABEL[declaration.status] ?? declaration.status}
                  </span>
                </div>

                <div className="space-y-3">
                  {declaration.items.map((item) => (
                    <div
                      key={item.questionId}
                      className="rounded-xl bg-gray-50 p-3"
                    >
                      <p className="text-2xs mb-1 font-bold text-gray-400">
                        {item.question}
                      </p>
                      <ItemAnswer item={item} />
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t border-gray-100 pt-3">
                  <p className="text-2xs mb-1.5 font-bold text-gray-400">
                    동의 항목 (버전 {declaration.consents.consentVersion})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span
                      className={`text-3xs rounded-full px-2 py-0.5 font-bold ${
                        declaration.consents.evaluationAgreed
                          ? "bg-emerald-50 text-emerald-500"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      평가 활용 동의
                      {declaration.consents.evaluationAgreed ? "" : " 안 함"}
                    </span>
                    <span
                      className={`text-3xs rounded-full px-2 py-0.5 font-bold ${
                        declaration.consents.dataAccessAgreed
                          ? "bg-emerald-50 text-emerald-500"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      자료 접근 동의
                      {declaration.consents.dataAccessAgreed ? "" : " 안 함"}
                    </span>
                    <span
                      className={`text-3xs rounded-full px-2 py-0.5 font-bold ${
                        declaration.consents.evidenceRetentionAgreed
                          ? "bg-emerald-50 text-emerald-500"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      증빙 보관 동의
                      {declaration.consents.evidenceRetentionAgreed
                        ? ""
                        : " 안 함"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeclarationViewModal;
