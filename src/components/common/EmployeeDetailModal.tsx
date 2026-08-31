import React, { useEffect, useState } from "react";

// 직원 상세 조회 API(`GET /employees/:employeeId`) 응답을 반영한 직원 데이터 모델.
// status/declare는 화면 표시용 한글 값을 그대로 들고 있고(테이블과 공용),
// evaluationStatus만 API 예시값(NOT_OPENED)을 그대로 유지한다.
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

const EVALUATION_STATUS_LABEL: Record<Employee["evaluationStatus"], string> = {
  NOT_OPENED: "미공개",
  OPENED: "공개됨",
};

const inputClassName =
  "text-text1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs placeholder:text-gray-300 focus:outline-none";
const labelClassName = "text-2xs mb-1.5 block font-bold text-gray-400";

interface EmployeeDetailModalProps {
  open: boolean;
  employee: Employee | null;
  onClose: () => void;
  onSave: (
    id: string,
    updates: { department: string; position: string; phone: string },
  ) => void;
  onResign: (id: string, resignedAt: string) => void;
}

const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({
  open,
  employee,
  onClose,
  onSave,
  onResign,
}) => {
  // Esc 키로 모달 닫기
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open || !employee) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      {/* employee.id로 key를 줘 대상이 바뀔 때마다 아래 수정 폼 상태를 새로 초기화한다 */}
      <EmployeeDetailPanel
        key={employee.id}
        employee={employee}
        onClose={onClose}
        onSave={onSave}
        onResign={onResign}
      />
    </div>
  );
};

interface EmployeeDetailPanelProps {
  employee: Employee;
  onClose: () => void;
  onSave: (
    id: string,
    updates: { department: string; position: string; phone: string },
  ) => void;
  onResign: (id: string, resignedAt: string) => void;
}

const EmployeeDetailPanel: React.FC<EmployeeDetailPanelProps> = ({
  employee,
  onClose,
  onSave,
  onResign,
}) => {
  const [department, setDepartment] = useState(employee.department);
  const [position, setPosition] = useState(employee.position);
  const [phone, setPhone] = useState(employee.phone ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const [isResignOpen, setResignOpen] = useState(false);
  const [resignDate, setResignDate] = useState("");

  const editableInputClassName =
    "w-36 rounded-lg border border-gray-200 bg-white px-2 py-1 text-right text-xs text-text1 focus:outline-none";

  const handleSave = () => {
    onSave(employee.id, { department, position, phone });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setDepartment(employee.department);
    setPosition(employee.position);
    setPhone(employee.phone ?? "");
    setIsEditing(false);
  };

  const handleConfirmResign = () => {
    if (!resignDate) return;
    onResign(employee.id, resignDate);
    setResignOpen(false);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 text-left shadow-xl"
    >
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-text1 text-base font-black">{employee.name}</h3>
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

      {/* 직원 정보: 퇴사자는 조회만 가능, 그 외에는 "수정" 버튼을 눌러야 편집 가능 */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-2xs font-bold text-gray-400">직원 정보</span>
          {employee.status !== "퇴사" && !isEditing && (
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
                className={editableInputClassName}
              />
            ) : (
              <span className="text-text1 font-bold">{phone || "—"}</span>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-text2 text-2xs rounded-lg border border-gray-200 bg-white px-3 py-1.5 font-bold transition-all hover:bg-gray-50 active:scale-95"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="bg-brand hover:bg-brand-dark text-2xs rounded-lg px-3 py-1.5 font-bold text-white transition-all active:scale-95"
              >
                저장
              </button>
            </div>
          )}

          <div className="h-px bg-gray-200" />

          <div className="flex items-center justify-between">
            <span className="text-gray-400">이메일</span>
            <span className="text-text1 font-bold">
              {employee.email ?? "—"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">재직 상태</span>
            <span
              className={`text-2xs inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-bold ${
                employee.status === "퇴사"
                  ? "bg-red-50 text-red-500"
                  : employee.status === "재직중"
                    ? "bg-emerald-50 text-emerald-500"
                    : "bg-amber-50 text-amber-500"
              }`}
            >
              <span className="h-1 w-1 rounded-full bg-current" />
              {employee.status}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">자기선언 상태</span>
            <span
              className={`font-bold ${
                employee.declare === "완료"
                  ? "text-emerald-500"
                  : employee.declare === "미완료"
                    ? "text-amber-500"
                    : "text-gray-400"
              }`}
            >
              {employee.declare}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">리포트 열람 상태</span>
            <span className="text-text1 font-bold">
              {EVALUATION_STATUS_LABEL[employee.evaluationStatus]}
            </span>
          </div>
        </div>
      </div>

      {/* 자기선언 질문지 보기 (제출 완료 시에만 활성화, 추후 연동 예정) */}
      <div className="mt-5">
        <button
          type="button"
          disabled={employee.declare !== "완료"}
          onClick={() => alert("연동 필요")}
          className={`w-full rounded-xl px-4 py-2.5 text-xs font-bold transition-all active:scale-95 ${
            employee.declare === "완료"
              ? "text-text2 border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
              : "cursor-not-allowed border border-gray-100 bg-gray-50 text-gray-300"
          }`}
        >
          자기선언 질문지 보기
        </button>
        {employee.declare !== "완료" && (
          <p className="text-3xs mt-1.5 text-center text-gray-400">
            아직 자기선언을 제출하지 않았습니다.
          </p>
        )}
      </div>

      {/* 퇴사 처리: 실수 클릭을 막기 위해 하단에 눈에 덜 띄게 배치 */}
      <div className="mt-8 border-t border-gray-100 pt-4">
        {employee.status === "퇴사" ? (
          <p className="text-3xs text-center text-gray-300">
            퇴사 처리됨{employee.resignedAt && ` · ${employee.resignedAt}`}
          </p>
        ) : isResignOpen ? (
          <div className="space-y-2">
            <label className={labelClassName}>퇴사일</label>
            <input
              type="date"
              value={resignDate}
              onChange={(e) => setResignDate(e.target.value)}
              className={inputClassName}
            />
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setResignOpen(false)}
                className="text-text2 text-2xs rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 font-bold transition-all hover:bg-gray-50 active:scale-95"
              >
                취소
              </button>
              <button
                type="button"
                disabled={!resignDate}
                onClick={handleConfirmResign}
                className={`text-2xs rounded-xl px-3.5 py-1.5 font-bold transition-all active:scale-95 ${
                  resignDate
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "cursor-not-allowed bg-gray-100 text-gray-300"
                }`}
              >
                퇴사 처리 확정
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
    </div>
  );
};

export default EmployeeDetailModal;
