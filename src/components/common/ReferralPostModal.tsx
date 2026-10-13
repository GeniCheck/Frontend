import React, { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useEmployeeControllerList } from "@/api/generated/endpoints/employee/employee";
import { EmployeeControllerListStatus } from "@/api/generated/models/employeeControllerListStatus";
import {
  getReferralPostControllerListQueryKey,
  useReferralPostControllerCreate,
  useResumeControllerCreateUploadUrl,
} from "@/api/generated/endpoints/referral/referral";
import { CreateReferralPostDtoDisplayNameMode } from "@/api/generated/models/createReferralPostDtoDisplayNameMode";
import { CreateReferralPostDtoPublishMonths } from "@/api/generated/models/createReferralPostDtoPublishMonths";
import type { ResumeUploadUrlResponse } from "@/api/referralResponses";
import { extractErrorMessage } from "@/api/extractErrorMessage";

interface RawEmployee {
  employeeId?: string;
  id?: string;
  name?: string;
  department?: string;
  position?: string;
}

// VerificationPage/ConsentRequestModal과 동일한 방어적 언래핑.
const extractEmployeeArray = (data: unknown): RawEmployee[] => {
  if (Array.isArray(data)) return data as RawEmployee[];
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    for (const key of ["items", "data", "employees", "list", "results"]) {
      const value = record[key];
      if (Array.isArray(value)) return value as RawEmployee[];
    }
  }
  return [];
};

const MAX_RESUME_SIZE = 10 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const inputClassName =
  "text-text1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs placeholder:text-gray-300 focus:outline-none";
const labelClassName = "text-2xs mb-1.5 block font-bold text-gray-400";

interface PostForm {
  employeeId: string;
  title: string;
  recommendationReason: string;
  displayNameMode: CreateReferralPostDtoDisplayNameMode;
  publishMonths: CreateReferralPostDtoPublishMonths;
}

const EMPTY_FORM: PostForm = {
  employeeId: "",
  title: "",
  recommendationReason: "",
  displayNameMode: CreateReferralPostDtoDisplayNameMode.REAL_NAME,
  publishMonths: CreateReferralPostDtoPublishMonths.NUMBER_3,
};

interface ReferralPostModalProps {
  open: boolean;
  onClose: () => void;
}

const ReferralPostModal: React.FC<ReferralPostModalProps> = ({
  open,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { data: employeeListData } = useEmployeeControllerList(
    { status: EmployeeControllerListStatus.RESIGNED, size: 100 },
    { query: { enabled: open } },
  );
  const employees = extractEmployeeArray(employeeListData);

  const createUploadUrlMutation = useResumeControllerCreateUploadUrl();
  const createPostMutation = useReferralPostControllerCreate();

  const [form, setForm] = useState(EMPTY_FORM);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearResumeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetAndClose = () => {
    setForm(EMPTY_FORM);
    clearResumeFile();
    setSubmitError(null);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setResumeFile(null);
      return;
    }
    if (!ALLOWED_RESUME_TYPES.includes(file.type)) {
      setSubmitError("이력서는 PDF 또는 DOCX 파일만 첨부할 수 있어요.");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_RESUME_SIZE) {
      setSubmitError("이력서 파일은 10MB를 넘을 수 없어요.");
      e.target.value = "";
      return;
    }
    setSubmitError(null);
    setResumeFile(file);
  };

  const handleSubmit = async () => {
    if (!form.employeeId) {
      setSubmitError("추천할 직원을 선택해주세요.");
      return;
    }
    if (!form.title.trim()) {
      setSubmitError("제목을 입력해주세요.");
      return;
    }
    if (!form.recommendationReason.trim()) {
      setSubmitError("추천 사유를 입력해주세요.");
      return;
    }

    setSubmitError(null);
    setSubmitting(true);
    try {
      let resumeFileId: string | undefined;
      if (resumeFile) {
        const uploadUrlResponse = (await createUploadUrlMutation.mutateAsync({
          data: {
            employeeId: form.employeeId,
            fileName: resumeFile.name,
            contentType: resumeFile.type,
            fileSize: resumeFile.size,
          },
        })) as unknown as ResumeUploadUrlResponse;

        // presigned URL은 외부 스토리지 주소라 customInstance(axios)가 아니라
        // 순수 fetch로 직접 PUT 해야 한다 (우리 API 인증 헤더를 붙이면 안 됨).
        const putResponse = await fetch(uploadUrlResponse.uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": resumeFile.type },
          body: resumeFile,
        });
        if (!putResponse.ok) {
          throw new Error("이력서 업로드에 실패했어요.");
        }
        resumeFileId = uploadUrlResponse.fileId;
      }

      await createPostMutation.mutateAsync({
        data: {
          employeeId: form.employeeId,
          title: form.title.trim(),
          recommendationReason: form.recommendationReason.trim(),
          resumeFileId,
          displayNameMode: form.displayNameMode,
          publishMonths: form.publishMonths,
        },
      });
      await queryClient.invalidateQueries({
        queryKey: getReferralPostControllerListQueryKey(),
      });
      alert("인재 추천 게시물이 등록되었습니다.");
      resetAndClose();
    } catch (err) {
      setSubmitError(
        extractErrorMessage(err, "게시에 실패했어요. 다시 시도해주세요."),
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Esc 키로 모달 닫기
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) resetAndClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isSubmitting]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={() => !isSubmitting && resetAndClose()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 text-left shadow-xl"
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-text1 text-base font-black">인재 게시하기</h3>
            <p className="text-2xs mt-1 text-gray-400">
              추천 게시에 동의한 퇴사 직원의 정보를 작성해 공개해요.
            </p>
          </div>
          <button
            type="button"
            onClick={() => !isSubmitting && resetAndClose()}
            disabled={isSubmitting}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-all hover:bg-gray-100 active:scale-90 disabled:opacity-40"
            aria-label="닫기"
          >
            <i className="ti ti-x text-sm" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className={labelClassName}>추천할 직원</label>
            <select
              value={form.employeeId}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, employeeId: e.target.value }))
              }
              disabled={isSubmitting}
              className={inputClassName}
            >
              <option value="">선택해주세요</option>
              {employees.map((emp) => {
                const id = emp.employeeId ?? emp.id ?? "";
                return (
                  <option key={id} value={id}>
                    {emp.name} ({emp.department} · {emp.position})
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className={labelClassName}>제목</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              maxLength={100}
              placeholder="함께 일하고 싶은 프론트엔드 개발자"
              disabled={isSubmitting}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>
              추천 사유 ({form.recommendationReason.length}/200)
            </label>
            <textarea
              value={form.recommendationReason}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  recommendationReason: e.target.value,
                }))
              }
              maxLength={200}
              rows={4}
              placeholder="협업과 일정 준수가 뛰어난 인재입니다."
              disabled={isSubmitting}
              className={`${inputClassName} resize-none`}
            />
          </div>

          <div>
            <label className={labelClassName}>이력서 (선택, PDF/DOCX)</label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              disabled={isSubmitting}
              className="text-text2 w-full text-xs file:mr-3 file:rounded-lg file:border file:border-gray-200 file:bg-white file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-gray-500"
            />
            {resumeFile && (
              <div className="mt-1 flex items-center gap-1.5">
                <p className="text-2xs flex-1 truncate text-gray-400">
                  {resumeFile.name}
                </p>
                <button
                  type="button"
                  onClick={clearResumeFile}
                  disabled={isSubmitting}
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-gray-400 transition-all hover:bg-gray-100 hover:text-red-400 active:scale-90 disabled:opacity-40"
                  aria-label="첨부한 이력서 제거"
                >
                  <i className="ti ti-x text-2xs" />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClassName}>이름 표시</label>
              <div className="text-2xs flex gap-1 rounded-xl border border-gray-100 bg-gray-50 p-1 font-bold">
                {(
                  [
                    [CreateReferralPostDtoDisplayNameMode.REAL_NAME, "실명"],
                    [CreateReferralPostDtoDisplayNameMode.ANONYMOUS, "익명"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    disabled={isSubmitting}
                    onClick={() =>
                      setForm((prev) => ({ ...prev, displayNameMode: value }))
                    }
                    className={`flex-1 rounded-md px-3 py-1.5 transition-all active:scale-95 ${
                      form.displayNameMode === value
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
                    [CreateReferralPostDtoPublishMonths.NUMBER_3, "3개월"],
                    [CreateReferralPostDtoPublishMonths.NUMBER_6, "6개월"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    disabled={isSubmitting}
                    onClick={() =>
                      setForm((prev) => ({ ...prev, publishMonths: value }))
                    }
                    className={`flex-1 rounded-md px-3 py-1.5 transition-all active:scale-95 ${
                      form.publishMonths === value
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

          {submitError && (
            <p className="text-xs font-bold text-red-500">{submitError}</p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => !isSubmitting && resetAndClose()}
              disabled={isSubmitting}
              className="text-text2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold shadow-sm transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-40"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-brand shadow-brand/10 hover:bg-brand-dark rounded-xl px-4 py-2 text-xs font-bold text-white shadow-md transition-all active:scale-95 disabled:opacity-40"
            >
              {isSubmitting ? "게시 중..." : "게시하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralPostModal;
