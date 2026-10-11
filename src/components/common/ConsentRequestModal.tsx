import React, { useEffect, useState } from "react";
import { useEmployeeControllerList } from "@/api/generated/endpoints/employee/employee";
import { EmployeeControllerListStatus } from "@/api/generated/models/employeeControllerListStatus";
import { useReferralConsentControllerRequest } from "@/api/generated/endpoints/referral/referral";
import { CreateReferralConsentDtoChannelsItem } from "@/api/generated/models/createReferralConsentDtoChannelsItem";
import { CreateReferralConsentDtoDisplayNameMode } from "@/api/generated/models/createReferralConsentDtoDisplayNameMode";
import { extractErrorMessage } from "@/api/extractErrorMessage";

interface ResignedEmployee {
  id: string;
  name: string;
  department: string;
  position: string;
  resignedAt?: string;
}

// 목록 응답이 배열 그대로 올 수도, { items / data / employees / list / results }로
// 감싸져 올 수도 있어 어떤 형태든 배열만 뽑아낸다. VerificationPage와 동일한
// 방어 로직을 이 모달에서도 그대로 사용한다.
interface RawEmployee {
  employeeId?: string;
  id?: string;
  name?: string;
  department?: string;
  position?: string;
  resignedAt?: string;
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

const mapRawEmployee = (raw: RawEmployee): ResignedEmployee => ({
  id: raw.employeeId ?? raw.id ?? crypto.randomUUID(),
  name: raw.name ?? "",
  department: raw.department ?? "",
  position: raw.position ?? "",
  resignedAt: raw.resignedAt,
});

interface ConsentRequestModalProps {
  open: boolean;
  onClose: () => void;
}

const ConsentRequestModal: React.FC<ConsentRequestModalProps> = ({
  open,
  onClose,
}) => {
  const { data, isPending, isError, refetch } = useEmployeeControllerList(
    { status: EmployeeControllerListStatus.RESIGNED, size: 100 },
    { query: { enabled: open } },
  );
  const employees = extractEmployeeArray(data).map(mapRawEmployee);

  const requestMutation = useReferralConsentControllerRequest();
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const [sendError, setSendError] = useState<string | null>(null);

  const handleRequest = async (employeeId: string) => {
    setSendingId(employeeId);
    setSendError(null);
    try {
      await requestMutation.mutateAsync({
        data: {
          employeeId,
          channels: [CreateReferralConsentDtoChannelsItem.EMAIL],
          displayNameMode: CreateReferralConsentDtoDisplayNameMode.REAL_NAME,
          expiresInDays: 7,
        },
      });
      setSentIds((prev) => new Set(prev).add(employeeId));
    } catch (err) {
      setSendError(
        extractErrorMessage(err, "요청 발송에 실패했어요. 다시 시도해주세요."),
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
              추천 게시 동의 요청
            </h3>
            <p className="text-2xs mt-1 text-gray-400">
              퇴사한 직원에게 추천 게시·이력서 공개 동의 링크를 메일로 보내요.
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
              퇴사 직원 목록을 불러오지 못했어요.
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
            퇴사 처리된 직원이 없어요.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="text-2xs border-b border-gray-100 font-bold tracking-wider text-gray-400 uppercase">
                  <th className="pb-3 font-semibold">직원명</th>
                  <th className="pb-3 font-semibold">부서</th>
                  <th className="pb-3 font-semibold">직급</th>
                  <th className="pb-3 font-semibold">퇴사일</th>
                  <th className="pb-3 text-right font-semibold">액션</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                {employees.map((emp) => {
                  const isSent = sentIds.has(emp.id);
                  const isSending = sendingId === emp.id;
                  return (
                    <tr
                      key={emp.id}
                      className="transition-colors hover:bg-gray-50/50"
                    >
                      <td className="text-text1 py-3.5 font-black">
                        {emp.name}
                      </td>
                      <td className="text-text2 py-3.5">{emp.department}</td>
                      <td className="text-text2 py-3.5">{emp.position}</td>
                      <td className="text-text2 py-3.5">
                        {emp.resignedAt ?? "—"}
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          type="button"
                          disabled={isSent || isSending}
                          onClick={() => handleRequest(emp.id)}
                          className={`text-2xs rounded-lg px-3 py-1.5 font-bold shadow-xs transition-all active:scale-95 ${
                            isSent
                              ? "cursor-not-allowed bg-emerald-50 text-emerald-500 shadow-none"
                              : "bg-brand hover:bg-brand-dark text-white disabled:opacity-60"
                          }`}
                        >
                          {isSent
                            ? "요청 완료"
                            : isSending
                              ? "보내는 중..."
                              : "요청 보내기"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
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

export default ConsentRequestModal;
