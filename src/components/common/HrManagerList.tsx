import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  getAuthControllerListHrManagersQueryKey,
  useAuthControllerDeleteHrManager,
  useAuthControllerListHrManagers,
} from "@/api/generated/endpoints/auth/auth";
import type { HrManager, HrManagerStatus } from "@/api/authResponses";
import { extractErrorMessage } from "@/api/extractErrorMessage";
import ConfirmModal from "@/components/common/ConfirmModal";

const STATUS: Record<
  HrManagerStatus,
  { label: string; badge: string; action: string; confirm: string }
> = {
  active: {
    label: "가입 완료",
    badge: "bg-emerald-50 text-emerald-600",
    action: "삭제",
    confirm: "계정을 삭제하면 바로 로그아웃되고 더 이상 로그인할 수 없어요.",
  },
  pending: {
    label: "초대 대기",
    badge: "bg-accent-light text-accent-dark",
    action: "초대 취소",
    confirm: "보낸 초대 링크로 더 이상 가입할 수 없어요.",
  },
  expired: {
    label: "초대 만료",
    badge: "bg-gray-100 text-gray-400",
    action: "삭제",
    confirm: "만료된 초대를 목록에서 삭제해요.",
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

  const [target, setTarget] = useState<HrManager | null>(null);
  const [error, setError] = useState<string | null>(null);

  const openConfirm = (manager: HrManager | null) => {
    setTarget(manager);
    setError(null);
  };

  const remove = async () => {
    if (!target) return;
    setError(null);
    try {
      await deleteMutation({ hrUserId: target.id });
      setTarget(null);
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

                  <button
                    type="button"
                    onClick={() => openConfirm(m)}
                    className="text-text2 shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500 active:scale-95"
                  >
                    {status.action}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <ConfirmModal
        open={target !== null}
        title={
          target
            ? `${target.name}님을 ${STATUS[target.status].action}할까요?`
            : ""
        }
        description={
          target && (
            <>
              <b className="text-text1 font-bold">{target.email}</b>
              <br />
              {STATUS[target.status].confirm}
            </>
          )
        }
        confirmLabel={target ? STATUS[target.status].action : ""}
        isPending={isDeleting}
        error={error}
        onConfirm={remove}
        onClose={() => openConfirm(null)}
      />
    </div>
  );
};

export default HrManagerList;
