import React, { useState } from "react";

interface ResumeAttachmentProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  link: string;
  onLinkChange: (link: string) => void;
}

const MAX_SIZE_BYTES = 10 * 1024 * 1024;

const ResumeAttachment: React.FC<ResumeAttachmentProps> = ({
  file,
  onFileChange,
  link,
  onLinkChange,
}) => {
  const [tab, setTab] = useState<"upload" | "link">("upload");
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const validateAndSet = (selected: File | null) => {
    if (!selected) {
      onFileChange(null);
      setError("");
      return;
    }
    if (!/\.(pdf|docx)$/i.test(selected.name)) {
      setError("PDF 또는 DOCX 파일만 업로드할 수 있어요.");
      return;
    }
    if (selected.size > MAX_SIZE_BYTES) {
      setError("파일 용량은 10MB를 초과할 수 없어요.");
      return;
    }
    setError("");
    onFileChange(selected);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSet(e.dataTransfer.files?.[0] ?? null);
  };

  const isValidLink = /^https?:\/\/.+/.test(link.trim());

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <p className="text-xs font-medium text-text3 uppercase tracking-wide mb-3">
        이력서 첨부
      </p>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex gap-4 px-4 pt-3.5 pb-2.5">
          <button
            type="button"
            onClick={() => setTab("upload")}
            className={`text-sm font-medium ${tab === "upload" ? "text-text1" : "text-text3"}`}
          >
            업로드
          </button>
          <button
            type="button"
            onClick={() => setTab("link")}
            className={`text-sm font-medium ${tab === "link" ? "text-text1" : "text-text3"}`}
          >
            링크
          </button>
        </div>

        {tab === "upload" ? (
          <div className="px-4 pb-4 pt-1.5">
            <label
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`flex items-center justify-center gap-2 border border-dashed rounded-lg bg-surface px-4 py-4 text-sm text-text2 cursor-pointer transition-colors ${
                isDragging ? "border-brand bg-brand-light" : "border-gray-300"
              }`}
            >
              <i className="ti ti-file-upload text-text3" />
              {file
                ? file.name
                : "파일 업로드 또는 드래그 앤 드롭 (PDF, DOCX / 최대 10MB)"}
              <input
                type="file"
                accept=".pdf,.docx"
                className="hidden"
                onChange={(e) => validateAndSet(e.target.files?.[0] ?? null)}
              />
            </label>
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
          </div>
        ) : (
          <div className="px-4 pb-4 pt-1.5">
            <div className="relative">
              <input
                type="text"
                value={link}
                onChange={(e) => onLinkChange(e.target.value)}
                placeholder="이력서 링크를 붙여넣어주세요"
                className="w-full rounded-lg border border-gray-200 bg-surface pl-3 pr-8 py-2.5 text-sm outline-none focus:border-brand transition-colors"
              />
              {isValidLink && (
    <span className="absolute inset-y-0 right-3 flex items-center">
      <i className="ti ti-check text-accent2" />
    </span>
  )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAttachment;
