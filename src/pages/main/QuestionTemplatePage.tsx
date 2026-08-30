import React, { useRef, useState } from "react";

type QuestionType = "점수형" | "선택형" | "서술형";

interface TemplateQuestion {
  id: string;
  title: string;
  type: QuestionType;
  options?: string[];
}

// 좌측 "추천 질문" 탭에 노출되는 임시 목업 데이터
const RECOMMENDED_QUESTIONS: TemplateQuestion[] = [
  { id: "rec-1", title: "대표 성과 기술", type: "서술형" },
  { id: "rec-2", title: "성장 영역 기술", type: "서술형" },
  { id: "rec-3", title: "협업 기여도", type: "점수형" },
  { id: "rec-4", title: "조직 문화 기여도", type: "점수형" },
  { id: "rec-5", title: "납기 준수 능력", type: "점수형" },
  {
    id: "rec-6",
    title: "이직 사유",
    type: "선택형",
    options: ["개인 사정", "이직/전직", "계약 만료", "기타"],
  },
];

// 우측 "폼 기본 정보"에 처음부터 채워지는 임시 목업 질문
const INITIAL_QUESTIONS: TemplateQuestion[] = [
  {
    id: "q-1",
    title: "팀 내 협업 기여도를 1~10점으로 평가해 주세요.",
    type: "점수형",
  },
  {
    id: "q-2",
    title: "데이터 기반 의사결정 능력을 1~10점으로 평가해 주세요.",
    type: "점수형",
  },
  {
    id: "q-3",
    title: "재직 중 가장 대표적인 성과를 구체적으로 기술해 주세요.",
    type: "서술형",
  },
  {
    id: "q-4",
    title: "본인의 주요 강점 유형을 선택해 주세요.",
    type: "선택형",
    options: [
      "실행력 / 추진력",
      "분석력 / 논리력",
      "창의력 / 기획력",
      "소통력 / 협업력",
    ],
  },
];

const QUESTION_TYPES: QuestionType[] = ["점수형", "선택형", "서술형"];

// 질문 타입별 포인트 컬러: 점수형=brand(인디고) · 선택형=accent(앰버) · 서술형=accent2(그린)
const TYPE_STYLES: Record<
  QuestionType,
  { badge: string; solid: string; toggle: string; tint: string }
> = {
  점수형: {
    badge: "bg-brand-light text-brand",
    solid: "bg-brand text-white",
    toggle: "border-brand bg-brand/5 text-brand",
    tint: "bg-brand-light",
  },
  선택형: {
    badge: "bg-accent-light text-accent",
    solid: "bg-accent text-white",
    toggle: "border-accent bg-accent/5 text-accent",
    tint: "bg-accent-light",
  },
  서술형: {
    badge: "bg-accent2-light text-accent2",
    solid: "bg-accent2 text-white",
    toggle: "border-accent2 bg-accent2/5 text-accent2",
    tint: "bg-accent2-light",
  },
};

const QuestionTemplatePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "추천 질문" | "저장된 질문" | "직접 작성"
  >("추천 질문");

  const [questions, setQuestions] =
    useState<TemplateQuestion[]>(INITIAL_QUESTIONS);
  const [savedQuestions, setSavedQuestions] = useState<TemplateQuestion[]>([]);

  // "직접 작성" 탭의 입력 폼 상태
  const [draftType, setDraftType] = useState<QuestionType>("점수형");
  const [draftName, setDraftName] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [draftOptions, setDraftOptions] = useState<string[]>([""]);
  const [draggedOptionIndex, setDraggedOptionIndex] = useState<number | null>(
    null,
  );
  // 드래그 핸들(그립 아이콘)에서 마우스를 누른 경우에만 행 드래그를 허용
  const dragHandleArmed = useRef(false);

  const handleOptionChange = (index: number, value: string) => {
    setDraftOptions((prev) =>
      prev.map((opt, i) => (i === index ? value : opt)),
    );
  };

  const handleAddOption = () => {
    setDraftOptions((prev) => [...prev, ""]);
  };

  const handleRemoveOption = (index: number) => {
    setDraftOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDropOption = (index: number) => {
    if (draggedOptionIndex === null || draggedOptionIndex === index) return;
    setDraftOptions((prev) => {
      const next = [...prev];
      const [moved] = next.splice(draggedOptionIndex, 1);
      next.splice(index, 0, moved);
      return next;
    });
    setDraggedOptionIndex(null);
  };

  const buildDraftQuestion = (): TemplateQuestion => ({
    id: `draft-${Date.now()}`,
    title: draftContent || draftName || "이름 없는 질문",
    type: draftType,
    options:
      draftType === "선택형"
        ? draftOptions.filter((opt) => opt.trim() !== "")
        : undefined,
  });

  const handleAddQuestion = (question: TemplateQuestion) => {
    setQuestions((prev) => [
      ...prev,
      { ...question, id: `${question.id}-${prev.length}` },
    ]);
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleSaveDraft = () => {
    if (!draftName && !draftContent) return;
    setSavedQuestions((prev) => [...prev, buildDraftQuestion()]);
    setDraftName("");
    setDraftContent("");
    setDraftOptions([""]);
  };

  const handleAddDraft = () => {
    if (!draftName && !draftContent) return;
    handleAddQuestion(buildDraftQuestion());
    setDraftName("");
    setDraftContent("");
    setDraftOptions([""]);
  };

  return (
    <main className="flex min-h-screen flex-1 flex-col">
      {/* 상단 헤더: VerificationPage와 동일한 톤 유지 */}
      <header className="sticky top-0 z-40 flex h-17 items-center border-b border-gray-200 bg-white px-6">
        <div className="flex items-baseline gap-3 text-left">
          <h1 className="text-text1 text-base font-black tracking-tight">
            Verification
          </h1>
          <span className="text-xs font-semibold text-gray-400">
            직원 검증 관리
          </span>
        </div>
      </header>

      <div className="mx-auto w-full max-w-300 flex-1 space-y-6 p-6">
        {/* 페이지 타이틀 + 발행 액션 */}
        <div className="flex items-center justify-between">
          <h2 className="text-text1 text-xl font-black">자기선언 질문 설계</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert("템플릿 저장 연동 필요")}
              className="text-text2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold shadow-sm transition-all hover:bg-gray-50 active:scale-95"
            >
              템플릿으로 저장
            </button>
            <button
              type="button"
              onClick={() => alert("발행 연동 필요")}
              className="bg-brand shadow-brand/10 hover:bg-brand-dark rounded-xl px-4 py-2 text-xs font-bold text-white shadow-md transition-all active:scale-95"
            >
              발행
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {/* 좌측: 질문 라이브러리 */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm">
            <h3 className="text-text1 mb-4 text-sm font-black">
              질문 라이브러리
            </h3>

            <div className="text-2xs mb-5 flex gap-1 rounded-lg border border-gray-100 bg-gray-50 p-1 font-bold">
              {(["추천 질문", "저장된 질문", "직접 작성"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 rounded-md px-3 py-1.5 transition-all active:scale-95 ${
                      activeTab === tab
                        ? "text-brand bg-white shadow-xs"
                        : "text-gray-400"
                    }`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>

            {activeTab === "추천 질문" && (
              <div className="space-y-2.5">
                {RECOMMENDED_QUESTIONS.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => handleAddQuestion(q)}
                    className="flex w-full items-center justify-between rounded-xl border border-gray-100 bg-white p-3 text-left transition-all hover:bg-gray-50 active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-8 w-8 shrink-0 rounded-lg ${TYPE_STYLES[q.type].tint}`}
                      />
                      <span className="text-text1 text-xs font-bold">
                        {q.title}
                      </span>
                    </div>
                    <span
                      className={`text-2xs shrink-0 rounded px-2 py-0.5 font-bold ${TYPE_STYLES[q.type].badge}`}
                    >
                      {q.type}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {activeTab === "저장된 질문" && (
              <div className="space-y-2.5">
                {savedQuestions.length === 0 ? (
                  <p className="text-2xs rounded-xl border border-dashed border-gray-200 p-6 text-center leading-relaxed text-gray-400">
                    아직 저장된 질문이 없습니다.
                    <br />
                    &quot;직접 작성&quot; 탭에서 질문을 저장해 보세요.
                  </p>
                ) : (
                  savedQuestions.map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => handleAddQuestion(q)}
                      className="flex w-full items-center justify-between rounded-xl border border-gray-100 bg-white p-3 text-left transition-all hover:bg-gray-50 active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-8 w-8 shrink-0 rounded-lg ${TYPE_STYLES[q.type].tint}`}
                        />
                        <span className="text-text1 text-xs font-bold">
                          {q.title}
                        </span>
                      </div>
                      <span
                        className={`text-2xs shrink-0 rounded px-2 py-0.5 font-bold ${TYPE_STYLES[q.type].badge}`}
                      >
                        {q.type}
                      </span>
                    </button>
                  ))
                )}
              </div>
            )}

            {activeTab === "직접 작성" && (
              <div className="space-y-4">
                <div>
                  <span className="text-2xs mb-2 block font-bold text-gray-400">
                    질문 형태
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {QUESTION_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setDraftType(t)}
                        className={`rounded-xl border px-3 py-2 text-xs font-bold transition-all active:scale-95 ${
                          draftType === t
                            ? TYPE_STYLES[t].toggle
                            : "text-text2 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-2xs mb-2 block font-bold text-gray-400">
                    질문 이름
                  </span>
                  <input
                    type="text"
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    placeholder="이름을 입력해주세요"
                    className="text-text1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs placeholder:text-gray-300 focus:outline-none"
                  />
                  <span className="text-3xs mt-1 block text-gray-400">
                    * 목록에 표시될 짧은 이름
                  </span>
                </div>

                <div>
                  <span className="text-2xs mb-2 block font-bold text-gray-400">
                    질문 내용
                  </span>
                  <textarea
                    value={draftContent}
                    onChange={(e) => setDraftContent(e.target.value)}
                    placeholder="질문 내용을 입력해주세요"
                    rows={4}
                    className="text-text1 w-full resize-none rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs placeholder:text-gray-300 focus:outline-none"
                  />
                </div>

                {draftType === "선택형" && (
                  <div>
                    <span className="text-2xs mb-2 block font-bold text-gray-400">
                      선택지
                    </span>
                    <div className="space-y-2">
                      {draftOptions.map((opt, i) => (
                        <div
                          key={i}
                          draggable
                          onDragStart={(e) => {
                            if (!dragHandleArmed.current) {
                              e.preventDefault();
                              return;
                            }
                            setDraggedOptionIndex(i);
                          }}
                          onDragEnd={() => {
                            dragHandleArmed.current = false;
                            setDraggedOptionIndex(null);
                          }}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => handleDropOption(i)}
                          className="flex items-center gap-2"
                        >
                          <span
                            onMouseDown={() => {
                              dragHandleArmed.current = true;
                            }}
                            className="flex h-4 w-4 shrink-0 cursor-grab items-center justify-center text-gray-300 active:cursor-grabbing"
                            aria-label="선택지 순서 변경"
                          >
                            <i className="ti ti-grip-vertical text-sm" />
                          </span>
                          <span className="h-4 w-4 shrink-0 rounded-full border border-gray-300" />
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) =>
                              handleOptionChange(i, e.target.value)
                            }
                            placeholder={`선택지 ${i + 1}`}
                            className="text-text1 w-full flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs placeholder:text-gray-300 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveOption(i)}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-all hover:bg-gray-100 active:scale-90"
                            aria-label="선택지 삭제"
                          >
                            <i className="ti ti-x text-xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="text-text2 mt-2 w-full rounded-xl border border-dashed border-gray-200 py-2 text-xs font-bold transition-all hover:bg-gray-50 active:scale-[0.99]"
                    >
                      + 선택지 추가
                    </button>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="text-text2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold shadow-sm transition-all hover:bg-gray-50 active:scale-95"
                  >
                    질문 저장
                  </button>
                  <button
                    type="button"
                    onClick={handleAddDraft}
                    className="bg-brand shadow-brand/10 hover:bg-brand-dark rounded-xl px-4 py-2 text-xs font-bold text-white shadow-md transition-all active:scale-95"
                  >
                    추가
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 우측: 폼 기본 정보 */}
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm">
              <h3 className="text-text1 mb-4 text-sm font-black">
                폼 기본 정보
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="폼 제목을 입력해주세요"
                  className="text-text1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs placeholder:text-gray-300 focus:outline-none"
                />
                <textarea
                  placeholder="설명을 입력해주세요"
                  rows={2}
                  className="text-text1 w-full resize-none rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs placeholder:text-gray-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              {questions.map((q, i) => (
                <div
                  key={q.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span
                        className={`text-2xs flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-black ${TYPE_STYLES[q.type].solid}`}
                      >
                        {i + 1}
                      </span>
                      <span className="text-text1 text-xs font-bold">
                        {q.title}
                      </span>
                      <span
                        className={`text-2xs shrink-0 rounded px-2 py-0.5 font-bold ${TYPE_STYLES[q.type].badge}`}
                      >
                        {q.type}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(q.id)}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400 transition-all hover:bg-gray-200 active:scale-90"
                      aria-label="질문 삭제"
                    >
                      <i className="ti ti-trash text-xs" />
                    </button>
                  </div>

                  <div className="mt-3.5 pl-9">
                    {q.type === "점수형" && (
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 10 }, (_, n) => n + 1).map(
                          (n) => (
                            <span
                              key={n}
                              className="text-text2 text-2xs flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 font-bold"
                            >
                              {n}
                            </span>
                          ),
                        )}
                      </div>
                    )}

                    {q.type === "서술형" && (
                      <p className="text-2xs text-gray-400">자유 텍스트 입력</p>
                    )}

                    {q.type === "선택형" && (
                      <div className="space-y-2">
                        {(q.options ?? []).map((opt) => (
                          <div key={opt} className="flex items-center gap-2">
                            <span className="h-4 w-4 shrink-0 rounded-full border border-gray-300" />
                            <span className="text-text2 text-xs">{opt}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* 드래그 앤 드롭 안내 영역 (시각적 목업, 실제 드래그 연동 없음) */}
              <div className="text-2xs rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center leading-relaxed text-gray-400">
                여기로 질문을 드래그하거나
                <br />
                왼쪽 라이브러리에서 클릭하여 추가
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuestionTemplatePage;
