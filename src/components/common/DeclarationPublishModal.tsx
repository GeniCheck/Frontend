import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  getEmployeeControllerListQueryKey,
  useEmployeeControllerList,
} from "@/api/generated/endpoints/employee/employee";
import { useDeclarationControllerAssign } from "@/api/generated/endpoints/declaration/declaration";
import { AssignDeclarationDtoSendChannel } from "@/api/generated/models/assignDeclarationDtoSendChannel";
import { DECLARATION_STATUS_LABEL } from "@/api/employeeResponses";
import { extractErrorMessage } from "@/api/extractErrorMessage";

interface TargetEmployee {
  id: string;
  name: string;
  dept: string;
  position: string;
  status: "완료" | "미완료" | "미발송";
}

// 목록 응답이 배열 그대로 올 수도, { items / data / employees / list / results }로
// 감싸져 올 수도 있어 어떤 형태든 배열만 뽑아낸다. VerificationPage의 동일한
// 방어 로직을 이 모달에서도 그대로 사용한다.
interface RawEmployee {
  employeeId?: string;
  id?: string;
  name?: string;
  department?: string;
  position?: string;
  declarationStatus?: string;
}

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

const mapRawEmployee = (raw: RawEmployee): TargetEmployee => {
  const declarationStatus = raw.declarationStatus ?? "NOT_SENT";
  const status =
    (DECLARATION_STATUS_LABEL as Record<string, string>)[declarationStatus] ??
    "미발송";
  return {
    id: raw.employeeId ?? raw.id ?? crypto.randomUUID(),
    name: raw.name ?? "",
    dept: raw.department ?? "",
    position: raw.position ?? "",
    status: status as TargetEmployee["status"],
  };
};

const STATUS_BADGE: Record<TargetEmployee["status"], string> = {
  완료: "bg-emerald-50 text-emerald-500",
  미완료: "bg-amber-50 text-amber-500",
  미발송: "bg-gray-100 text-gray-400",
};

interface DeclarationPublishModalProps {
  open: boolean;
  onClose: () => void;
  // 발송에 사용할 질문 템플릿. 아직 저장/불러온 템플릿이 없으면 null이라
  // 발송 버튼이 전부 비활성화된다.
  templateId: string | null;
}

const DeclarationPublishModal: React.FC<DeclarationPublishModalProps> = ({
  open,
  onClose,
  templateId,
}) => {
  const queryClient = useQueryClient();
  const { data, isPending, isError, refetch } = useEmployeeControllerList(
    { size: 100 },
    { query: { enabled: open } },
  );
  const employees = extractEmployeeArray(data).map(mapRawEmployee);

  const assignMutation = useDeclarationControllerAssign();
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);

  const handleSend = async (employeeId: string) => {
    if (!templateId) return;
    setSendingId(employeeId);
    setSendError(null);
    try {
      await assignMutation.mutateAsync({
        employeeId,
        data: {
          templateId,
          sendChannel: AssignDeclarationDtoSendChannel.EMAIL,
        },
      });
      await queryClient.invalidateQueries({
        queryKey: getEmployeeControllerListQueryKey(),
      });
    } catch (err) {
      setSendError(
        extractErrorMessage(err, "발송에 실패했어요. 다시 시도해주세요."),
      );
    } finally {
      setSendingId(null);
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
            {!templateId && (
              <p className="text-2xs mt-1 font-bold text-red-500">
                먼저 템플릿을 저장한 뒤 발송할 수 있어요.
              </p>
            )}
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
              직원 목록을 불러오지 못했어요.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="text-brand text-xs font-bold hover:opacity-80"
            >
              다시 시도
            </button>
          </div>
        ) : employees.length === 0 ? (
          <p className="py-10 text-center text-xs font-bold text-gray-400">
            등록된 직원이 없어요.
          </p>
        ) : (
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
                {employees.map((emp) => (
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
                        disabled={
                          emp.status !== "미발송" ||
                          !templateId ||
                          sendingId === emp.id
                        }
                        onClick={() => handleSend(emp.id)}
                        className={`text-2xs rounded-lg px-3 py-1.5 font-bold shadow-xs transition-all active:scale-95 ${
                          emp.status !== "미발송" || !templateId
                            ? "cursor-not-allowed bg-gray-100 text-gray-300 shadow-none"
                            : "bg-brand hover:bg-brand-dark text-white disabled:opacity-60"
                        }`}
                      >
                        {sendingId === emp.id ? "발송 중..." : "발송"}
                      </button>
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
  );
};

export default DeclarationPublishModal;
