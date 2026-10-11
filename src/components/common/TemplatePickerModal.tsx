import React, { useEffect, useState } from "react";
import { useQuestionTemplateControllerList } from "@/api/generated/endpoints/question-template/question-template";
import { QuestionTemplateControllerListStatus } from "@/api/generated/models/questionTemplateControllerListStatus";
import { useDeclarationControllerAssign } from "@/api/generated/endpoints/declaration/declaration";
import { AssignDeclarationDtoSendChannel } from "@/api/generated/models/assignDeclarationDtoSendChannel";
import type {
  QuestionTemplateListItem,
  QuestionTemplateListResponse,
} from "@/api/questionTemplateResponses";
import { extractErrorMessage } from "@/api/extractErrorMessage";
import QuestionTemplateDetailModal from "@/components/common/QuestionTemplateDetailModal";

// VerificationPage에서 특정 직원에게 "발송"할 때, 어떤 질문 템플릿을 쓸지
// 고르게 하는 모달. employeeId가 null이 아니면 열린 것으로 취급한다.
interface TemplatePickerModalProps {
  employeeId: string | null;
  onClose: () => void;
  onSent: (employeeId: string) => void;
}

const TemplatePickerModal: React.FC<TemplatePickerModalProps> = ({
  employeeId,
  onClose,
  onSent,
}) => {
  const open = employeeId !== null;
  const { data, isPending, isError, refetch } =
    useQuestionTemplateControllerList(
      { status: QuestionTemplateControllerListStatus.ACTIVE },
      { query: { enabled: open } },
    );
  const list = data as unknown as QuestionTemplateListResponse | undefined;
  const items: QuestionTemplateListItem[] = list?.items ?? [];

  const assignMutation = useDeclarationControllerAssign();
  const [sendingTemplateId, setSendingTemplateId] = useState<string | null>(
    null,
  );
  const [sendError, setSendError] = useState<string | null>(null);
  const [detailTemplateId, setDetailTemplateId] = useState<string | null>(null);

  const handleSend = async (templateId: string) => {
    if (!employeeId) return;
    setSendingTemplateId(templateId);
    setSendError(null);
    try {
      await assignMutation.mutateAsync({
        employeeId,
        data: {
          templateId,
          sendChannel: AssignDeclarationDtoSendChannel.EMAIL,
        },
      });
      onSent(employeeId);
      onClose();
    } catch (err) {
      setSendError(
        extractErrorMessage(err, "발송에 실패했어요. 다시 시도해주세요."),
      );
    } finally {
      setSendingTemplateId(null);
    }
  };

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
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 text-left shadow-xl"
        >
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h3 className="text-text1 text-base font-black">
                발송할 템플릿 선택
              </h3>
              <p className="text-2xs mt-1 text-gray-400">
                사용 중인 질문 템플릿 중 하나를 선택해 발송하세요.
              </p>
              {sendError && (
                <p className="text-2xs mt-1 font-bold text-red-500">
                  {sendError}
                </p>
              )}
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
                템플릿 목록을 불러오지 못했어요.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="text-brand text-xs font-bold hover:opacity-80"
              >
                다시 시도
              </button>
            </div>
          ) : items.length === 0 ? (
            <p className="py-10 text-center text-xs font-bold text-gray-400">
              사용 중인 템플릿이 없어요. 먼저 질문 템플릿을 만들어 저장해주세요.
            </p>
          ) : (
            <div className="space-y-2.5">
              {items.map((template) => (
                <div
                  key={template.templateId}
                  className="flex items-center justify-between rounded-xl border border-gray-100 p-3"
                >
                  <div className="min-w-0">
                    <p className="text-text1 truncate text-xs font-bold">
                      {template.name}
                    </p>
                    <p className="text-2xs text-gray-400">
                      v{template.version} · 질문 {template.questionCount}개
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setDetailTemplateId(template.templateId)}
                      className="text-text2 text-2xs rounded-lg border border-gray-200 px-3 py-1.5 font-bold transition-all hover:bg-gray-50 active:scale-95"
                    >
                      상세보기
                    </button>
                    <button
                      type="button"
                      disabled={sendingTemplateId === template.templateId}
                      onClick={() => handleSend(template.templateId)}
                      className="bg-brand hover:bg-brand-dark text-2xs rounded-lg px-3 py-1.5 font-bold text-white transition-all active:scale-95 disabled:opacity-60"
                    >
                      {sendingTemplateId === template.templateId
                        ? "발송 중..."
                        : "발송"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <QuestionTemplateDetailModal
        templateId={detailTemplateId}
        onClose={() => setDetailTemplateId(null)}
      />
    </>
  );
};

export default TemplatePickerModal;
