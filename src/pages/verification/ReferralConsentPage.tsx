import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  getReferralConsentControllerGetByTokenQueryKey,
  useReferralConsentControllerAgree,
  useReferralConsentControllerGetByToken,
  useReferralConsentControllerWithdraw,
} from "@/api/generated/endpoints/referral/referral";
import type { ReferralConsentResponse } from "@/api/referralResponses";
import { extractErrorMessage } from "@/api/extractErrorMessage";
import { toLinkErrorStatus, type LinkErrorStatus } from "@/api/linkErrorStatus";
import ConfirmModal from "@/components/common/ConfirmModal";
import LinkStatusMessage from "@/components/verification/LinkStatusMessage";

const AGREE_ITEMS = [
  {
    id: "recommendationAgreed",
    label: "인재 추천 게시판에 나의 추천 게시물이 공개되는 것에 동의합니다.",
  },
  {
    id: "resumeDisclosureAgreed",
    label:
      "추천 게시물을 열람하는 기업에 나의 이력서가 공개되는 것에 동의합니다.",
  },
  {
    id: "finalConfirmation",
    label: "위 내용을 모두 확인했으며, 추천 게시에 최종 동의합니다.",
  },
] as const;

type AgreeItemId = (typeof AGREE_ITEMS)[number]["id"];

const EMPTY_AGREEMENTS = AGREE_ITEMS.reduce(
  (acc, item) => ({ ...acc, [item.id]: false }),
  {} as Record<AgreeItemId, boolean>,
);

const DISCLOSURE_LABELS = [
  { key: "recommendation", label: "추천 사유" },
  { key: "resume", label: "이력서" },
  { key: "position", label: "직급" },
] as const;

const DISPLAY_NAME_LABEL: Record<string, string> = {
  REAL_NAME: "실명",
  ANONYMOUS: "익명 (이름 마스킹)",
};

const InfoRow: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="flex gap-4 py-2.5">
    <span className="text-2xs w-20 shrink-0 font-bold text-gray-400">
      {label}
    </span>
    <span className="text-text1 text-xs font-semibold">{children}</span>
  </div>
);

const ReferralConsentPage: React.FC = () => {
  const { token = "" } = useParams();
  const queryClient = useQueryClient();
  const { data, isPending, error } = useReferralConsentControllerGetByToken(
    token,
    {
      query: { enabled: Boolean(token), retry: false },
    },
  );
  const consent = data as unknown as ReferralConsentResponse | undefined;

  const agreeMutation = useReferralConsentControllerAgree();
  const withdrawMutation = useReferralConsentControllerWithdraw();

  const [agreements, setAgreements] =
    useState<Record<AgreeItemId, boolean>>(EMPTY_AGREEMENTS);
  const [actionError, setActionError] = useState<string | null>(null);
  const [linkError, setLinkError] = useState<LinkErrorStatus | null>(null);
  const [isWithdrawOpen, setWithdrawOpen] = useState(false);

  const linkStatus = !token
    ? "invalid"
    : (linkError ?? toLinkErrorStatus(error));
  if (linkStatus) return <LinkStatusMessage status={linkStatus} />;

  if (isPending) {
    return (
      <div className="bg-surface flex min-h-screen items-center justify-center">
        <span className="text-2xs font-bold text-gray-400">확인 중...</span>
      </div>
    );
  }

  if (error || !consent) {
    return (
      <div className="bg-surface flex min-h-screen items-center justify-center px-6">
        <span className="text-2xs font-bold text-gray-400">
          {extractErrorMessage(
            error,
            "동의 내용을 불러오지 못했어요. 잠시 후 다시 시도해주세요.",
          )}
        </span>
      </div>
    );
  }

  const refetchConsent = () =>
    queryClient.invalidateQueries({
      queryKey: getReferralConsentControllerGetByTokenQueryKey(token),
    });

  const handleActionError = (err: unknown, fallback: string) => {
    const status = toLinkErrorStatus(err);
    if (status) {
      setLinkError(status);
      return;
    }
    setActionError(extractErrorMessage(err, fallback));
  };

  const allAgreed = Object.values(agreements).every(Boolean);

  const handleAgree = () => {
    if (!allAgreed) return;
    setActionError(null);
    agreeMutation.mutate(
      { token, data: agreements },
      {
        onSuccess: refetchConsent,
        onError: (err) =>
          handleActionError(err, "동의 처리에 실패했어요. 다시 시도해주세요."),
      },
    );
  };

  const handleWithdraw = () => {
    setActionError(null);
    withdrawMutation.mutate(
      { token, data: { finalConfirmation: true } },
      {
        onSuccess: () => {
          setWithdrawOpen(false);
          setLinkError("withdrawn");
        },
        onError: (err) => {
          setWithdrawOpen(false);
          handleActionError(err, "철회에 실패했어요. 다시 시도해주세요.");
        },
      },
    );
  };

  const isAgreed = consent.status === "AGREED";
  const { disclosure } = consent;

  return (
    <div className="bg-surface min-h-screen px-6 py-10">
      <div className="mx-auto max-w-2xl space-y-4">
        <div>
          <p className="text-brand text-xs font-bold">
            {consent.employee.companyName} · {consent.employee.name}님
          </p>
          <h1 className="text-text1 mt-1 text-2xl font-black">
            인재 추천 게시 동의
          </h1>
          <p className="text-2xs mt-1.5 text-gray-400">
            {isAgreed
              ? "추천 게시에 동의한 상태예요. 언제든 이 링크에서 동의를 철회할 수 있어요."
              : `${new Date(consent.expiresAt).toLocaleDateString("ko-KR")}까지 동의할 수 있어요. 내용을 확인한 뒤 동의 여부를 선택해주세요.`}
          </p>
        </div>

        <div className="divide-y divide-gray-100 rounded-3xl border border-gray-200 bg-white px-6 py-3 text-left shadow-sm">
          <InfoRow label="게시 목적">{consent.purpose}</InfoRow>
          <InfoRow label="공개 항목">
            {DISCLOSURE_LABELS.filter(({ key }) => disclosure[key])
              .map(({ label }) => label)
              .join(", ")}
          </InfoRow>
          <InfoRow label="게시 기간">{disclosure.publishMonths}개월</InfoRow>
          <InfoRow label="이름 표시">
            {DISPLAY_NAME_LABEL[disclosure.displayNameMode] ??
              disclosure.displayNameMode}
          </InfoRow>
        </div>

        {isAgreed ? (
          <div className="space-y-3 rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
            <div className="flex items-center gap-2">
              <i className="ti ti-circle-check text-brand text-lg" />
              <h2 className="text-text1 text-sm font-black">동의 완료</h2>
              {consent.agreedAt && (
                <span className="text-2xs text-gray-400">
                  {new Date(consent.agreedAt).toLocaleDateString("ko-KR")}
                </span>
              )}
            </div>
            <p className="text-2xs leading-relaxed text-gray-400">
              동의를 철회하면 공개 중인 추천 게시물이 즉시 비공개로 바뀌어요.
            </p>
            <button
              type="button"
              onClick={() => setWithdrawOpen(true)}
              className="w-full rounded-xl border border-red-200 bg-white py-2.5 text-xs font-bold text-red-500 shadow-sm transition-all hover:bg-red-50 active:scale-[0.99]"
            >
              동의 철회하기
            </button>
          </div>
        ) : (
          <div className="space-y-3 rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
            <h2 className="text-text1 text-sm font-black">동의 항목</h2>
            <div className="space-y-2.5">
              {AGREE_ITEMS.map((item) => (
                <label
                  key={item.id}
                  className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-gray-100 bg-gray-50 p-3"
                >
                  <input
                    type="checkbox"
                    checked={agreements[item.id]}
                    onChange={(e) =>
                      setAgreements((prev) => ({
                        ...prev,
                        [item.id]: e.target.checked,
                      }))
                    }
                    className="accent-brand mt-0.5 h-3.5 w-3.5 shrink-0"
                  />
                  <span className="text-2xs leading-relaxed text-gray-500">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
            <p className="text-3xs leading-relaxed text-gray-300">
              동의한 뒤에도 이 링크에서 언제든 철회할 수 있어요.
            </p>
          </div>
        )}

        {actionError && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-3">
            <p className="text-2xs font-bold text-red-500">{actionError}</p>
          </div>
        )}

        {!isAgreed && (
          <button
            type="button"
            onClick={handleAgree}
            disabled={!allAgreed || agreeMutation.isPending}
            className={`w-full rounded-2xl py-3.5 text-sm font-bold transition-colors ${
              allAgreed && !agreeMutation.isPending
                ? "bg-brand hover:bg-brand-dark cursor-pointer text-white"
                : "bg-brand-light text-brand cursor-not-allowed"
            }`}
          >
            {agreeMutation.isPending ? "처리 중..." : "추천 게시에 동의하기"}
          </button>
        )}
      </div>

      <ConfirmModal
        open={isWithdrawOpen}
        title="추천 게시 동의를 철회할까요?"
        description="철회하면 공개 중인 추천 게시물이 즉시 비공개로 바뀌고, 이 링크로 다시 동의할 수 없어요."
        confirmLabel="철회하기"
        isPending={withdrawMutation.isPending}
        onConfirm={handleWithdraw}
        onClose={() => setWithdrawOpen(false)}
      />
    </div>
  );
};

export default ReferralConsentPage;
