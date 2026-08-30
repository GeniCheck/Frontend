import React, { useEffect } from "react";

interface TargetEmployee {
  id: string;
  name: string;
  dept: string;
  position: string;
  status: "완료" | "미완료" | "미발송";
}

// 발행 대상 직원 목록: 백엔드 연동 전까지 사용하는 임시 목업 데이터
const TARGET_EMPLOYEES: TargetEmployee[] = [
  {
    id: "e1",
    name: "김민준",
    dept: "개발팀",
    position: "과장",
    status: "완료",
  },
  {
    id: "e2",
    name: "이서연",
    dept: "개발팀",
    position: "대리",
    status: "미완료",
  },
  {
    id: "e3",
    name: "박지호",
    dept: "개발팀",
    position: "사원",
    status: "미발송",
  },
  {
    id: "e4",
    name: "최유나",
    dept: "디자인팀",
    position: "대리",
    status: "미발송",
  },
  {
    id: "e5",
    name: "강태양",
    dept: "개발팀",
    position: "부장",
    status: "완료",
  },
];

const STATUS_BADGE: Record<TargetEmployee["status"], string> = {
  완료: "bg-emerald-50 text-emerald-500",
  미완료: "bg-amber-50 text-amber-500",
  미발송: "bg-gray-100 text-gray-400",
};

interface DeclarationPublishModalProps {
  open: boolean;
  onClose: () => void;
}

const DeclarationPublishModal: React.FC<DeclarationPublishModalProps> = ({
  open,
  onClose,
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
              자기선언 링크 발송
            </h3>
            <p className="text-2xs mt-1 text-gray-400">
              발송 대상 직원을 확인하고 자기선언 작성 링크를 발송하세요.
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

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-2xs border-b border-gray-100 font-bold tracking-wider text-gray-400 uppercase">
                <th className="pb-3 font-semibold">직원명</th>
                <th className="pb-3 font-semibold">부서</th>
                <th className="pb-3 font-semibold">직급</th>
                <th className="pb-3 font-semibold">자기선언</th>
                <th className="pb-3 text-right font-semibold">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs">
              {TARGET_EMPLOYEES.map((emp) => (
                <tr
                  key={emp.id}
                  className="transition-colors hover:bg-gray-50/50"
                >
                  <td className="text-text1 py-3.5 font-black">{emp.name}</td>
                  <td className="text-text2 py-3.5">{emp.dept}</td>
                  <td className="text-text2 py-3.5">{emp.position}</td>
                  <td className="py-3.5">
                    <span
                      className={`text-2xs inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-bold ${STATUS_BADGE[emp.status]}`}
                    >
                      <span className="h-1 w-1 rounded-full bg-current" />
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      type="button"
                      disabled={emp.status !== "미발송"}
                      onClick={() => alert("연동 필요")}
                      className={`text-2xs rounded-lg px-3 py-1.5 font-bold shadow-xs transition-all active:scale-95 ${
                        emp.status !== "미발송"
                          ? "cursor-not-allowed bg-gray-100 text-gray-300 shadow-none"
                          : "bg-brand hover:bg-brand-dark text-white"
                      }`}
                    >
                      발송
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

export default DeclarationPublishModal;
