import React, { useEffect, useState } from "react";
import { useEmployeeControllerFindOne } from "@/api/generated/endpoints/employee/employee";
import {
  type EmployeeDetail,
  EMPLOYMENT_STATUS_LABEL,
  DECLARATION_STATUS_LABEL,
  EVALUATION_STATUS_LABEL,
} from "@/api/employeeResponses";
import { extractErrorMessage } from "@/api/extractErrorMessage";
import DeclarationViewModal from "@/components/common/DeclarationViewModal";

// 직원 목록 테이블 등 화면 전반에서 쓰는 표시용 모델.
// status/declare는 EmploymentStatus/DeclarationStatus를 한글로 변환해 둔 값이다.
export interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  status: string; // 재직중 | 퇴사 | 대기중 (employmentStatus)
  declare: string; // 완료 | 미완료 | 미발송 (declarationStatus)
  evaluationStatus: "NOT_OPENED" | "OPENED"; // 리포트 열람 상태
  hrScore: string;
  due: string | null;
  action: string;
  email?: string;
  phone?: string;
  employmentStartDate?: string;
  resignedAt?: string;
}

const inputClassName =
  "text-text1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs placeholder:text-gray-300 focus:outline-none";
const labelClassName = "text-2xs mb-1.5 block font-bold text-gray-400";

interface EmployeeDetailModalProps {
  open: boolean;
  employeeId: string | null;
  onClose: () => void;
  onSave: (
    id: string,
    updates: { department: string; position: string; phone: string },
  ) => Promise<void>;
  onResign: (id: string, resignedAt: string) => Promise<void>;
}

const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({
  open,
  employeeId,
  onClose,
  onSave,
  onResign,
}) => {
  const {
    data: detail,
    isPending,
    isError,
    refetch,
  } = useEmployeeControllerFindOne<EmployeeDetail>(employeeId ?? "", {
    query: { enabled: open && !!employeeId },
  });

  // Esc 키로 모달 닫기
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open || !employeeId) return null;

  return (
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
              {detail?.name ?? "직원 상세 정보"}
            </h3>
            <p className="text-2xs mt-1 text-gray-400">직원 상세 정보</p>
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
          <div className="flex items-center justify-center py-16">
            <span className="text-2xs font-bold text-gray-400">
              불러오는 중...
            </span>
          </div>
        ) : isError || !detail ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <p className="text-xs font-bold text-red-500">
              직원 정보를 불러오지 못했어요.
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
          // employeeId로 key를 줘 대상이 바뀔 때마다 아래 수정 폼 상태를 새로 초기화한다.
          <EmployeeDetailPanel
            key={employeeId}
            detail={detail}
            onClose={onClose}
            onSave={onSave}
            onResign={onResign}
          />
        )}
      </div>
    </div>
  );
};

interface EmployeeDetailPanelProps {
  detail: EmployeeDetail;
  onClose: () => void;
  onSave: (
    id: string,
    updates: { department: string; position: string; phone: string },
  ) => Promise<void>;
  onResign: (id: string, resignedAt: string) => Promise<void>;
}

const EmployeeDetailPanel: React.FC<EmployeeDetailPanelProps> = ({
  detail,
  onSave,
  onResign,
}) => {
  const [department, setDepartment] = useState(detail.department);
  const [position, setPosition] = useState(detail.position);
  const [phone, setPhone] = useState(detail.phone ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isResignOpen, setResignOpen] = useState(false);
  const [resignDate, setResignDate] = useState("");
  const [isResigning, setResigning] = useState(false);
  const [resignError, setResignError] = useState<string | null>(null);
  const [isDeclarationViewOpen, setDeclarationViewOpen] = useState(false);

  const status = EMPLOYMENT_STATUS_LABEL[detail.employmentStatus];
  const declare = DECLARATION_STATUS_LABEL[detail.declarationStatus];

  const editableInputClassName =
    "w-36 rounded-lg border border-gray-200 bg-white px-2 py-1 text-right text-xs text-text1 focus:outline-none";

  const handleSave = async () => {
    setSaveError(null);
    setSaving(true);
    try {
      await onSave(detail.employeeId, { department, position, phone });
      setIsEditing(false);
    } catch (err) {
      setSaveError(
        extractErrorMessage(err, "정보 수정에 실패했어요. 다시 시도해주세요."),
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setDepartment(detail.department);
    setPosition(detail.position);
    setPhone(detail.phone ?? "");
    setSaveError(null);
    setIsEditing(false);
  };

  const handleConfirmResign = async () => {
    if (!resignDate) return;
    setResignError(null);
    setResigning(true);
    try {
      await onResign(detail.employeeId, resignDate);
      setResignOpen(false);
    } catch (err) {
      setResignError(
        extractErrorMessage(err, "퇴사 처리에 실패했어요. 다시 시도해주세요."),
      );
    } finally {
      setResigning(false);
    }
  };

  return (
    <>
      {/* 직원 정보: 퇴사자는 조회만 가능, 그 외에는 "수정" 버튼을 눌러야 편집 가능 */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-2xs font-bold text-gray-400">직원 정보</span>
          {status !== "퇴사" && !isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-text2 text-2xs rounded-lg border border-gray-200 bg-white px-3 py-1.5 font-bold shadow-sm transition-all hover:bg-gray-50 active:scale-95"
            >
              수정
            </button>
          )}
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">부서</span>
            {isEditing ? (
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                disabled={isSaving}
                className={editableInputClassName}
              />
            ) : (
              <span className="text-text1 font-bold">{department}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">직급</span>
            {isEditing ? (
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                disabled={isSaving}
                className={editableInputClassName}
              />
            ) : (
              <span className="text-text1 font-bold">{position}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">전화번호</span>
            {isEditing ? (
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-0000-0000"
                disabled={isSaving}
                className={editableInputClassName}
              />
            ) : (
              <span className="text-text1 font-bold">{phone || "—"}</span>
            )}
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

          <div className="h-px bg-gray-200" />

          <div className="flex items-center justify-between">
            <span className="text-gray-400">이메일</span>
            <span className="text-text1 font-bold">{detail.email ?? "—"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">재직 상태</span>
            <span
              className={`text-2xs inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-bold ${
                status === "퇴사"
                  ? "bg-red-50 text-red-500"
                  : status === "재직중"
                    ? "bg-emerald-50 text-emerald-500"
                    : "bg-amber-50 text-amber-500"
              }`}
            >
              <span className="h-1 w-1 rounded-full bg-current" />
              {status}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">자기선언 상태</span>
            <span
              className={`font-bold ${
                declare === "완료"
                  ? "text-emerald-500"
                  : declare === "미완료"
                    ? "text-amber-500"
                    : "text-gray-400"
              }`}
            >
              {declare}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">리포트 열람 상태</span>
            <span className="text-text1 font-bold">
              {EVALUATION_STATUS_LABEL[detail.evaluationStatus]}
            </span>
          </div>
        </div>
      </div>

      {/* 자기선언 질문지 보기 (제출 완료 시에만 활성화) */}
      <div className="mt-5">
        <button
          type="button"
          disabled={declare !== "완료"}
          onClick={() => setDeclarationViewOpen(true)}
          className={`w-full rounded-xl px-4 py-2.5 text-xs font-bold transition-all active:scale-95 ${
            declare === "완료"
              ? "text-text2 border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
              : "cursor-not-allowed border border-gray-100 bg-gray-50 text-gray-300"
          }`}
        >
          자기선언 질문지 보기
        </button>
        {declare !== "완료" && (
          <p className="text-3xs mt-1.5 text-center text-gray-400">
            아직 자기선언을 제출하지 않았습니다.
          </p>
        )}
      </div>

      {/* 퇴사 처리: 실수 클릭을 막기 위해 하단에 눈에 덜 띄게 배치 */}
      <div className="mt-8 border-t border-gray-100 pt-4">
        {status === "퇴사" ? (
          <p className="text-3xs text-center text-gray-300">
            퇴사 처리됨{detail.resignedAt && ` · ${detail.resignedAt}`}
          </p>
        ) : isResignOpen ? (
          <div className="space-y-2">
            <label className={labelClassName}>퇴사일</label>
            <input
              type="date"
              value={resignDate}
              onChange={(e) => setResignDate(e.target.value)}
              disabled={isResigning}
              className={inputClassName}
            />
            {resignError && (
              <p className="text-right text-xs font-bold text-red-500">
                {resignError}
              </p>
            )}
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setResignOpen(false)}
                disabled={isResigning}
                className="text-text2 text-2xs rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 font-bold transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-40"
              >
                취소
              </button>
              <button
                type="button"
                disabled={!resignDate || isResigning}
                onClick={handleConfirmResign}
                className={`text-2xs rounded-xl px-3.5 py-1.5 font-bold transition-all active:scale-95 disabled:cursor-not-allowed ${
                  resignDate
                    ? "bg-red-500 text-white hover:bg-red-600 disabled:opacity-60"
                    : "cursor-not-allowed bg-gray-100 text-gray-300"
                }`}
              >
                {isResigning ? "처리 중..." : "퇴사 처리 확정"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <button
              type="button"
              onClick={() => setResignOpen(true)}
              className="text-3xs text-gray-300 underline-offset-2 hover:text-red-400 hover:underline"
            >
              퇴사 처리하기
            </button>
          </div>
        )}
      </div>
      <DeclarationViewModal
        employeeId={isDeclarationViewOpen ? detail.employeeId : null}
        onClose={() => setDeclarationViewOpen(false)}
      />
    </>
  );
};

export default EmployeeDetailModal;
