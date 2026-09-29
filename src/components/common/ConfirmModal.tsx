import React, { useEffect } from "react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: React.ReactNode;
  confirmLabel: string;
  isPending?: boolean;
  error?: string | null;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  description,
  confirmLabel,
  isPending = false,
  error,
  onConfirm,
  onClose,
}) => {
  useEffect(() => {
    if (!open || isPending) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, isPending, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={isPending ? undefined : onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-3xl bg-white p-6 text-left shadow-xl"
      >
        <h3 className="text-text1 text-base font-black">{title}</h3>
        {description && (
          <p className="text-text2 mt-2 text-xs leading-relaxed">
            {description}
          </p>
        )}
        {error && (
          <p className="mt-3 text-xs font-bold text-red-500">{error}</p>
        )}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="text-text2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-40"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="rounded-xl bg-red-500 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-red-600 active:scale-95 disabled:opacity-40"
          >
            {isPending ? "처리 중..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
