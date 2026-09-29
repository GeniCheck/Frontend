import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  getAuthControllerListHrManagersQueryKey,
  useAuthControllerDeleteHrManager,
  useAuthControllerListHrManagers,
} from "@/api/generated/endpoints/auth/auth";
import type { HrManager, HrManagerStatus } from "@/api/authResponses";
import { extractErrorMessage } from "@/api/extractErrorMessage";

const STATUS: Record<
  HrManagerStatus,
  { label: string; badge: string; action: string }
> = {
  active: {
    label: "가입 완료",
    badge: "bg-emerald-50 text-emerald-600",
    action: "삭제",
  },
  pending: {
    label: "초대 대기",
    badge: "bg-accent-light text-accent-dark",
    action: "초대 취소",
  },
  expired: {
    label: "초대 만료",
    badge: "bg-gray-100 text-gray-400",
    action: "삭제",
  },
};

const HrManagerList: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    data: managers,
    isPending,
    isError,
    refetch,
  } = useAuthControllerListHrManagers<HrManager[] | undefined>();
  const { mutateAsync: deleteMutation, isPending: isDeleting } =
    useAuthControllerDeleteHrManager();

  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const openConfirm = (id: string | null) => {
    setConfirmId(id);
    setError(null);
  };

  const remove = async (id: string) => {
    setError(null);
    try {
      await deleteMutation({ hrUserId: id });
      setConfirmId(null);
      await queryClient.invalidateQueries({
        queryKey: getAuthControllerListHrManagersQueryKey(),
      });
    } catch (err) {
      setError(
        extractErrorMessage(err, "처리에 실패했어요. 다시 시도해주세요."),
      );
    }
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
      <h2 className="text-text1 mb-6 text-xl font-black">
        인사팀장 목록
        {managers && managers.length > 0 && (
          <span className="text-text3 ml-2 text-sm font-bold">
            {managers.length}
          </span>
        )}
      </h2>

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
      ) : !managers?.length ? (
        <p className="py-10 text-center text-xs font-bold text-gray-400">
          아직 초대한 인사팀장이 없어요.
        </p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {managers.map((m) => {
            const status = STATUS[m.status];
            const isConfirming = confirmId === m.id;
            return (
              <li key={m.id} className="py-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-text1 truncate text-sm font-bold">
                        {m.name}
                      </span>
                      <span
                        className={`text-2xs shrink-0 rounded-md px-1.5 py-0.5 font-bold ${status.badge}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="text-text2 truncate text-xs">{m.email}</p>
                    <p className="text-2xs text-gray-400">
                      등록일 {new Date(m.createdAt).toLocaleDateString("ko-KR")}
                    </p>
                  </div>

                  {isConfirming ? (
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="text-text2 text-xs font-bold">
                        정말 {status.action}할까요?
                      </span>
                      <button
                        type="button"
                        onClick={() => openConfirm(null)}
                        disabled={isDeleting}
                        className="text-text2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-40"
                      >
                        아니요
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(m.id)}
                        disabled={isDeleting}
                        className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-red-600 active:scale-95 disabled:opacity-40"
                      >
                        {isDeleting ? "처리 중..." : status.action}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openConfirm(m.id)}
                      className="text-text2 shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500 active:scale-95"
                    >
                      {status.action}
                    </button>
                  )}
                </div>
                {isConfirming && error && (
                  <p className="text-2xs mt-2 font-bold text-red-500">
                    {error}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default HrManagerList;
