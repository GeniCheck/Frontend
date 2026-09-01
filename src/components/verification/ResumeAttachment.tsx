import React, { useRef, useState } from "react";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ACCEPTED_EXTENSIONS = [".pdf", ".docx"];

interface ResumeAttachmentProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  link: string;
  onLinkChange: (link: string) => void;
}

type Tab = "file" | "link";

const TABS: { key: Tab; label: string }[] = [
  { key: "file", label: "파일 업로드" },
  { key: "link", label: "링크로 제출" },
];

const isAcceptedFile = (file: File) =>
  ACCEPTED_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext));

// 기능명세서 2.2: 이력서 파일 첨부(PDF, DOCX / 최대 10MB) 또는 링크 중
// 한 가지 방식으로 제출. 선택 항목이라 둘 다 비워도 제출 가능.
const ResumeAttachment: React.FC<ResumeAttachmentProps> = ({
  file,
  onFileChange,
  link,
  onLinkChange,
}) => {
  const [tab, setTab] = useState<Tab>("file");
  const [isDragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (candidate: File | undefined) => {
    if (!candidate) return;
    if (!isAcceptedFile(candidate)) {
      setError("PDF 또는 DOCX 파일만 첨부할 수 있어요.");
      return;
    }
    if (candidate.size > MAX_FILE_SIZE_BYTES) {
      setError("파일 용량은 최대 10MB까지 첨부할 수 있어요.");
      return;
    }
    setError(null);
    onFileChange(candidate);
  };

  return (
    <div className="space-y-3 rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
      <div>
        <h2 className="text-text1 text-sm font-black">
          이력서 첨부{" "}
          <span className="text-2xs font-bold text-gray-500">(선택)</span>
        </h2>
        <p className="text-2xs mt-1 text-gray-400">
          파일 업로드(PDF, DOCX / 최대 10MB) 또는 링크 중 하나로 제출할 수
          있어요.
        </p>
      </div>

      <div className="flex gap-1.5 rounded-xl bg-gray-50 p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`text-2xs flex-1 rounded-lg py-2 font-bold transition-all ${
              tab === t.key
                ? "text-brand bg-white shadow-sm"
                : "text-gray-400 hover:text-gray-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "file" ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
            isDragging
              ? "border-brand bg-brand-light"
              : "border-gray-200 hover:bg-gray-50"
          }`}
        >
          <i className="ti ti-file-upload text-text3 text-xl" />
          {file ? (
            <p className="text-text1 mt-2 text-xs font-bold">{file.name}</p>
          ) : (
            <p className="text-2xs mt-2 text-gray-400">
              파일을 드래그하거나 클릭해서 업로드하세요
            </p>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>
      ) : (
        <input
          type="url"
          value={link}
          onChange={(e) => onLinkChange(e.target.value)}
          placeholder="이력서 링크를 입력해주세요 (예: 포트폴리오 URL)"
          className="text-text1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs placeholder:text-gray-300 focus:outline-none"
        />
      )}

      {error && <p className="text-3xs font-bold text-red-400">{error}</p>}
    </div>
  );
};

export default ResumeAttachment;
