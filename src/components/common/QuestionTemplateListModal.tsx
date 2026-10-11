import React, { useEffect, useState } from "react";
import {
  questionTemplateControllerFindOne,
  useQuestionTemplateControllerList,
} from "@/api/generated/endpoints/question-template/question-template";
import type {
  QuestionTemplateDetail,
  QuestionTemplateListItem,
  QuestionTemplateListResponse,
} from "@/api/questionTemplateResponses";
import { extractErrorMessage } from "@/api/extractErrorMessage";
import QuestionTemplateDetailModal from "@/components/common/QuestionTemplateDetailModal";

interface QuestionTemplateListModalProps {
  open: boolean;
  onClose: () => void;
  onLoadTemplate: (detail: QuestionTemplateDetail) => void;
}

const QuestionTemplateListModal: React.FC<QuestionTemplateListModalProps> = ({
  open,
  onClose,
  onLoadTemplate,
}) => {
  const { data, isPending, isError, refetch } =
    useQuestionTemplateControllerList(undefined, { query: { enabled: open } });
  const list = data as unknown as QuestionTemplateListResponse | undefined;
  const items: QuestionTemplateListItem[] = list?.items ?? [];

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );
  const [loadingTemplateId, setLoadingTemplateId] = useState<string | null>(
    null,
  );
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleLoadIntoForm = async (templateId: string) => {
    setLoadingTemplateId(templateId);
    setLoadError(null);
    try {
      const detail = (await questionTemplateControllerFindOne(
        templateId,
      )) as unknown as QuestionTemplateDetail;
      onLoadTemplate(detail);
      onClose();
    } catch (err) {
      setLoadError(extractErrorMessage(err, "템플릿을 불러오지 못했습니다."));
    } finally {
      setLoadingTemplateId(null);
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
          className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 text-left shadow-xl"
        >
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h3 className="text-text1 text-base font-black">
                저장된 질문 템플릿
              </h3>
              <p className="text-2xs mt-1 text-gray-400">
                이전에 저장한 템플릿을 확인할 수 있어요.
              </p>
              {loadError && (
                <p className="text-2xs mt-1 font-bold text-red-500">
                  {loadError}
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
                목록을 불러오지 못했어요.
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
              아직 저장된 템플릿이 없어요.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="text-2xs border-b border-gray-100 font-bold tracking-wider text-gray-400 uppercase">
                    <th className="pb-3 font-semibold">템플릿명</th>
                    <th className="pb-3 font-semibold">질문 수</th>
                    <th className="pb-3 font-semibold">수정일</th>
                    <th className="pb-3 text-right font-semibold">액션</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs">
                  {items.map((template) => (
                    <tr
                      key={template.templateId}
                      className="transition-colors hover:bg-gray-50/50"
                    >
                      <td className="text-text1 py-3.5 font-black">
                        {template.name}
                      </td>
                      <td className="text-text2 py-3.5">
                        {template.questionCount}개
                      </td>
                      <td className="text-text2 py-3.5">
                        {new Date(template.updatedAt).toLocaleDateString(
                          "ko-KR",
                        )}
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedTemplateId(template.templateId)
                            }
                            className="text-2xs text-brand hover:bg-brand-light rounded-lg px-3 py-1.5 font-bold transition-all active:scale-95"
                          >
                            상세 조회
                          </button>
                          <button
                            type="button"
                            disabled={loadingTemplateId === template.templateId}
                            onClick={() =>
                              handleLoadIntoForm(template.templateId)
                            }
                            className="text-2xs text-text2 rounded-lg px-3 py-1.5 font-bold transition-all hover:bg-gray-100 active:scale-95 disabled:opacity-40"
                          >
                            {loadingTemplateId === template.templateId
                              ? "불러오는 중..."
                              : "폼으로 불러오기"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
      <QuestionTemplateDetailModal
        templateId={selectedTemplateId}
        onClose={() => setSelectedTemplateId(null)}
      />
    </>
  );
};

export default QuestionTemplateListModal;
