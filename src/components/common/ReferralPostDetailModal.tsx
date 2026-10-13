import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  getReferralPostControllerListQueryKey,
  useReferralPostControllerFindOne,
  useReferralPostControllerRemove,
  useReferralPostControllerUpdate,
} from "@/api/generated/endpoints/referral/referral";
import { UpdateReferralPostDtoDisplayNameMode } from "@/api/generated/models/updateReferralPostDtoDisplayNameMode";
import { UpdateReferralPostDtoPublishMonths } from "@/api/generated/models/updateReferralPostDtoPublishMonths";
import type { ReferralPostDetail } from "@/api/referralResponses";
import { extractErrorMessage } from "@/api/extractErrorMessage";
import ConfirmModal from "@/components/common/ConfirmModal";

const inputClassName =
  "text-text1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs placeholder:text-gray-300 focus:outline-none";
const labelClassName = "text-2xs mb-1.5 block font-bold text-gray-400";

interface ReferralPostDetailModalProps {
  postId: string | null;
  onClose: () => void;
  // 수정·삭제가 성공하면 목록을 다시 불러오도록 부모(ReferralPage)에 알린다.
  onChanged: () => void;
}

const ReferralPostDetailModal: React.FC<ReferralPostDetailModalProps> = ({
  postId,
  onClose,
  onChanged,
}) => {
  const open = postId !== null;
  const { data, isPending, error, refetch } = useReferralPostControllerFindOne(
    postId ?? "",
    { query: { enabled: open } },
  );
  const detail = data as unknown as ReferralPostDetail | undefined;

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
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 text-left shadow-xl"
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-text1 text-base font-black">
              {detail ? detail.employeeName : "게시물 상세"}
            </h3>
            <p className="text-2xs mt-1 text-gray-400">추천 게시물 상세</p>
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
        ) : error || !detail ? (
          <div className="space-y-3 py-10 text-center">
            <p className="text-xs font-bold text-red-500">
              게시물 정보를 불러오지 못했어요.
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
          // postId로 key를 줘 대상이 바뀔 때마다 아래 수정 폼 상태를 새로 초기화한다.
          <ReferralPostDetailPanel
            key={postId}
            detail={detail}
            onClose={onClose}
            onChanged={onChanged}
          />
        )}
      </div>
    </div>
  );
};

interface ReferralPostDetailPanelProps {
  detail: ReferralPostDetail;
  onClose: () => void;
  onChanged: () => void;
}

const ReferralPostDetailPanel: React.FC<ReferralPostDetailPanelProps> = ({
  detail,
  onClose,
  onChanged,
}) => {
  const queryClient = useQueryClient();
  const updateMutation = useReferralPostControllerUpdate();
  const removeMutation = useReferralPostControllerRemove();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(detail.title);
  const [recommendationReason, setRecommendationReason] = useState(
    detail.recommendationReason,
  );
  const [displayNameMode, setDisplayNameMode] = useState(
    detail.displayNameMode,
  );
  const [publishMonths, setPublishMonths] = useState(detail.publishMonths);
  const [isSaving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleCancelEdit = () => {
    setTitle(detail.title);
    setRecommendationReason(detail.recommendationReason);
    setDisplayNameMode(detail.displayNameMode);
    setPublishMonths(detail.publishMonths);
    setSaveError(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setSaveError(null);
    setSaving(true);
    try {
      await updateMutation.mutateAsync({
        postId: detail.postId,
        data: {
          title: title.trim(),
          recommendationReason: recommendationReason.trim(),
          displayNameMode,
          publishMonths,
        },
      });
      await queryClient.invalidateQueries({
        queryKey: getReferralPostControllerListQueryKey(),
      });
      onChanged();
      setIsEditing(false);
    } catch (err) {
      setSaveError(
        extractErrorMessage(err, "수정에 실패했어요. 다시 시도해주세요."),
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleteError(null);
    setDeleting(true);
    try {
      await removeMutation.mutateAsync({ postId: detail.postId });
      await queryClient.invalidateQueries({
        queryKey: getReferralPostControllerListQueryKey(),
      });
      onChanged();
      onClose();
    } catch (err) {
      setDeleteError(
        extractErrorMessage(err, "삭제에 실패했어요. 다시 시도해주세요."),
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-2xs font-bold text-gray-400">
              게시물 정보
            </span>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-text2 text-2xs rounded-lg border border-gray-200 bg-white px-3 py-1.5 font-bold shadow-sm transition-all hover:bg-gray-50 active:scale-95"
              >
                수정
              </button>
            )}
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-gray-400">추천 대상</span>
              <p className="text-text1 mt-0.5 font-bold">
                {detail.employeeName} · {detail.position} · {detail.companyName}
              </p>
            </div>

            <div>
              <label className={labelClassName}>제목</label>
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                  disabled={isSaving}
                  className={inputClassName}
                />
              ) : (
                <p className="text-text1 font-bold">{detail.title}</p>
              )}
            </div>

            <div>
              <label className={labelClassName}>
                추천 사유
                {isEditing && ` (${recommendationReason.length}/200)`}
              </label>
              {isEditing ? (
                <textarea
                  value={recommendationReason}
                  onChange={(e) => setRecommendationReason(e.target.value)}
                  maxLength={200}
                  rows={4}
                  disabled={isSaving}
                  className={`${inputClassName} resize-none`}
                />
              ) : (
                <p className="text-text2 leading-relaxed">
                  {detail.recommendationReason}
                </p>
              )}
            </div>

            {isEditing ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClassName}>이름 표시</label>
                  <div className="text-2xs flex gap-1 rounded-xl border border-gray-100 bg-gray-50 p-1 font-bold">
                    {(
                      [
                        [
                          UpdateReferralPostDtoDisplayNameMode.REAL_NAME,
                          "실명",
                        ],
                        [
                          UpdateReferralPostDtoDisplayNameMode.ANONYMOUS,
                          "익명",
                        ],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        disabled={isSaving}
                        onClick={() => setDisplayNameMode(value)}
                        className={`flex-1 rounded-md px-3 py-1.5 transition-all active:scale-95 ${
                          displayNameMode === value
                            ? "text-brand bg-white shadow-xs"
                            : "text-gray-400"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClassName}>게시 기간</label>
                  <div className="text-2xs flex gap-1 rounded-xl border border-gray-100 bg-gray-50 p-1 font-bold">
                    {(
                      [
                        [UpdateReferralPostDtoPublishMonths.NUMBER_3, "3개월"],
                        [UpdateReferralPostDtoPublishMonths.NUMBER_6, "6개월"],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        // 3 → 6개월 연장만 가능해, 이미 6개월이면 3개월로 되돌릴 수 없다.
                        disabled={isSaving || detail.publishMonths > value}
                        onClick={() => setPublishMonths(value)}
                        className={`flex-1 rounded-md px-3 py-1.5 transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${
                          publishMonths === value
                            ? "text-brand bg-white shadow-xs"
                            : "text-gray-400"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-gray-400">이름 표시 · 게시 기간</span>
                <span className="text-text1 font-bold">
                  {detail.displayNameMode === "REAL_NAME" ? "실명" : "익명"} ·{" "}
                  {detail.publishMonths}개월
                </span>
              </div>
            )}

            {detail.resumeDownloadUrl && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400">이력서</span>
                <a
                  href={detail.resumeDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand font-bold hover:underline"
                >
                  다운로드
                </a>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-gray-400">게시 기간</span>
              <span className="text-text1 font-bold">
                {detail.publishedAt &&
                  new Date(detail.publishedAt).toLocaleDateString("ko-KR")}
                {detail.expiresAt &&
                  ` ~ ${new Date(detail.expiresAt).toLocaleDateString("ko-KR")}`}
              </span>
            </div>

            {isEditing && (
              <>
                {saveError && (
                  <p className="text-right text-xs font-bold text-red-500">
                    {saveError}
                  </p>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={isSaving}
                    className="text-text2 text-2xs rounded-lg border border-gray-200 bg-white px-3 py-1.5 font-bold transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-40"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-brand hover:bg-brand-dark text-2xs rounded-lg px-3 py-1.5 font-bold text-white transition-all active:scale-95 disabled:opacity-40"
                  >
                    {isSaving ? "저장 중..." : "저장"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 삭제: 실수 클릭을 막기 위해 하단에 눈에 덜 띄게 배치 */}
        <div className="border-t border-gray-100 pt-4 text-center">
          <button
            type="button"
            onClick={() => setDeleteConfirmOpen(true)}
            className="text-3xs text-gray-300 underline-offset-2 hover:text-red-400 hover:underline"
          >
            게시물 삭제하기
          </button>
        </div>
      </div>

      <ConfirmModal
        open={isDeleteConfirmOpen}
        title="이 게시물을 삭제할까요?"
        description="삭제하면 게시판에서 바로 비공개 처리되고 되돌릴 수 없어요."
        confirmLabel="삭제"
        isPending={isDeleting}
        error={deleteError}
        onConfirm={handleDelete}
        onClose={() => setDeleteConfirmOpen(false)}
      />
    </>
  );
};

export default ReferralPostDetailModal;
