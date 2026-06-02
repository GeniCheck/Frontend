import React, { useEffect } from "react";

const AIReportsPage: React.FC = () => {
  // 페이지 진입 시 스크롤 최상단 리셋
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 선언 vs 검증 대조 데이터 분석 테이블
  const scoreDetails = [
    {
      title: "기술 역량",
      self: 8,
      verify: 7,
      gap: "+1",
      status: "약간 과대 선언",
      barColor: "bg-[#5B50E8]",
    },
    {
      title: "리더십 & 팀 협업",
      self: 7,
      verify: 8,
      gap: "-1",
      status: "실제 성과 우수",
      barColor: "bg-emerald-500",
    },
    {
      title: "프로젝트 납기 준수",
      self: 9,
      verify: 9,
      gap: "±0",
      status: "정확한 자기 인식",
      barColor: "bg-blue-500",
    },
    {
      title: "커뮤니케이션 능력",
      self: 8,
      verify: 6,
      gap: "+2",
      status: "과대 선언 주의",
      barColor: "bg-indigo-500",
    },
    {
      title: "자기 주도 학습",
      self: 7,
      verify: 7,
      gap: "±0",
      status: "정확한 자기 인식",
      barColor: "bg-violet-500",
    },
    {
      title: "문제 해결력",
      self: 6,
      verify: 8,
      gap: "-2",
      status: "실제 성과 우수",
      barColor: "bg-purple-500",
    },
  ];

  return (
    /* 부모(MainPage)가 이미 고정 사이드바를 품고 있으므로, 
      이곳에서는 전체 flex 레이아웃 틀을 걷어내고 독립적인 본문 영역만 바로 가동합니다.
    */
    <main className="flex-1 md:pl-[260px] flex flex-col min-h-screen">
      {/* 상단 헤더 툴바 영역 */}
      <header className="h-[68px] bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-baseline gap-3 text-left">
          <h1 className="text-base font-black tracking-tight text-[#1A1A2E]">
            AI Reports
          </h1>
          <span className="text-xs text-gray-400 font-semibold">
            HR 신용점수 & 역량 분석
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-purple-50 border border-purple-200 text-[#5B50E8] rounded-full text-[10px] font-bold">
            Phase 1 · 규칙 기반
          </span>
          <button className="px-3.5 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-bold shadow-sm hover:bg-gray-50 active:scale-95 transition-all">
            PDF 내보내기
          </button>
        </div>
      </header>

      {/* 가이드 영역 및 메인 콘텐츠 패널 */}
      <div className="p-6 space-y-6 max-w-[1255px] w-full mx-auto flex-1">
        <div className="text-left bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm">
          <p className="text-xs text-gray-500">
            자기 선언과 대표 검증 점수를 대조 분석하여 객관적인 HR 신용점수를
            산출합니다.
          </p>
        </div>

        {/* 직원 스위처 필터 행 */}
        <div className="flex flex-wrap gap-2 bg-white border border-gray-200 p-3.5 rounded-2xl items-center shadow-sm text-xs font-bold text-[#4B5563]">
          <span className="text-gray-400 mr-2">직원 선택</span>
          <button
            type="button"
            className="px-3.5 py-2 bg-[#5B50E8] text-white rounded-xl flex items-center gap-1.5 active:scale-95 transition-all shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-200" /> 강태양 ·
            부장
          </button>
          <button
            type="button"
            className="px-3.5 py-2 bg-gray-50 border border-gray-100 hover:bg-gray-100 text-gray-500 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> 박지호 ·
            사원
          </button>
          <button
            type="button"
            className="px-3.5 py-2 bg-gray-50 border border-gray-100 hover:bg-gray-100 text-gray-500 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" /> 김민준 · 과장
          </button>
          <button
            type="button"
            className="px-3 py-2 text-gray-300 hover:text-gray-400"
          >
            더보기
          </button>
        </div>

        {/* 리포팅 대시보드 메인 본체 GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* COLUMN 1 */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#1E1B4B] via-[#2E2A72] to-[#4338CA] rounded-[24px] p-6 text-white text-left shadow-xl relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(#ffffff 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="text-[10px] font-black tracking-wider text-white/50 uppercase">
                HR 신용점수
              </div>
              <div className="mt-4 flex justify-between items-start">
                <div className="flex items-baseline">
                  <span className="font-bebas text-6xl font-black tracking-tight">
                    76
                  </span>
                  <span className="text-white/40 font-bold ml-1 text-sm">
                    / 100
                  </span>
                </div>
                <span className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-xl text-[11px] font-bold shadow-xs">
                  동종 직군 상위 34%
                </span>
              </div>
              <div className="text-[11px] text-white/60 mt-1.5">
                개발팀 부장 · 퇴사 완료
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 space-y-3 text-[11px] font-bold">
                <div className="flex justify-between">
                  <span className="text-white/50">성과 점수</span>
                  <span className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden mt-1.5">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: "73%" }}
                    />
                  </span>
                  <span>7.3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">일관성</span>
                  <span className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden mt-1.5">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: "81%" }}
                    />
                  </span>
                  <span className="text-emerald-400">81%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">자기객관화</span>
                  <span className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden mt-1.5">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: "78%" }}
                    />
                  </span>
                  <span className="text-amber-400">0.78</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left space-y-4">
              <div className="flex justify-between items-center text-[#1A1A2E]">
                <h3 className="text-xs font-black">재고용 의향</h3>
                <span className="text-[9px] text-gray-400 font-bold">
                  대표 입력 기준
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center font-bebas">
                <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl">
                  <span className="block text-[10px] text-emerald-600 font-sans font-black tracking-tight mb-1">
                    YES
                  </span>
                  <span className="text-2xl font-black text-emerald-600">
                    1
                  </span>
                </div>
                <div className="p-3 bg-amber-50/60 border border-amber-100 rounded-xl">
                  <span className="block text-[10px] text-amber-600 font-sans font-black tracking-tight mb-1">
                    HOLD
                  </span>
                  <span className="text-2xl font-black text-amber-600">0</span>
                </div>
                <div className="p-3 bg-red-50/60 border border-red-100 rounded-xl">
                  <span className="block text-[10px] text-red-500 font-sans font-black tracking-tight mb-1">
                    NO
                  </span>
                  <span className="text-2xl font-black text-red-500">0</span>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                재고용 의향은 YES / HOLD / NO만 입력됩니다. 명예훼손 방지를 위해
                사유 기재는 금지됩니다.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left space-y-4">
              <h3 className="text-xs font-black text-[#1A1A2E]">
                기업별 누적 이력
              </h3>
              <div className="space-y-3 relative before:absolute before:bottom-2 before:top-2 before:left-[11px] before:w-[1px] before:bg-gray-100">
                <div className="flex gap-3 relative z-10 items-start">
                  <span className="w-5 h-5 bg-[#5B50E8] text-white text-[9px] rounded-md flex items-center justify-center font-bold shrink-0">
                    현
                  </span>
                  <div className="flex-1 flex justify-between items-start min-w-0">
                    <div>
                      <h4 className="text-xs font-black text-[#1A1A2E] truncate">
                        현 직장 (귀사)
                      </h4>
                      <p className="text-[9px] text-gray-400 mt-0.5">
                        2021.03 - 2026.04 · 5년 1개월
                      </p>
                    </div>
                    <span className="font-bebas text-sm font-black text-[#5B50E8]">
                      76
                      <span className="text-[8px] text-gray-300 font-sans">
                        /100
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 relative z-10 items-start">
                  <span className="w-5 h-5 bg-emerald-500 text-white text-[9px] rounded-md flex items-center justify-center font-bold shrink-0">
                    전
                  </span>
                  <div className="flex-1 flex justify-between items-start min-w-0">
                    <div>
                      <h4 className="text-xs font-black text-gray-600 truncate">
                        이전 직장 A
                      </h4>
                      <p className="text-[9px] text-gray-400 mt-0.5">
                        2018.07 - 2021.02 · 2년 7개월
                      </p>
                    </div>
                    <span className="font-bebas text-sm font-black text-gray-600">
                      68
                      <span className="text-[8px] text-gray-300 font-sans">
                        /100
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-50 text-[10px] text-gray-400 font-bold flex justify-between">
                <span>누적 평균 72점</span>
                <span className="text-emerald-500">성장 추이 ↑ +8점</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2 */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black text-[#1A1A2E]">
                  선언 vs 검증 대조
                </h3>
                <div className="flex gap-3 text-[9px] font-bold">
                  <span className="flex items-center gap-1 text-gray-400">
                    <span className="w-2 h-2 bg-[#8B5CF6]/20 rounded-xs" />
                    자기평가
                  </span>
                  <span className="flex items-center gap-1 text-[#5B50E8]">
                    <span className="w-2 h-2 bg-[#5B50E8] rounded-xs" />
                    검증점수
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {scoreDetails.slice(0, 5).map((row, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-[#1A1A2E]">{row.title}</span>
                      <span className="text-gray-400 font-mono">
                        자기 {row.self} 검증 {row.verify}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden relative">
                      <div
                        className={`h-full ${row.barColor} rounded-full`}
                        style={{ width: `${row.verify * 10}%` }}
                      />
                    </div>
                    <span
                      className={`inline-block text-[9px] font-black px-1.5 py-0.5 rounded ${
                        row.gap.includes("+")
                          ? "bg-red-50 text-red-500"
                          : row.gap.includes("-")
                            ? "bg-emerald-50 text-emerald-500"
                            : "bg-blue-50 text-blue-500"
                      }`}
                    >
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-50 grid grid-cols-3 text-center text-[10px] font-black text-gray-400">
                <div>
                  1.2
                  <span className="block text-[9px] font-normal mt-0.5">
                    평균 GAP
                  </span>
                </div>
                <div>
                  4 / 6
                  <span className="block text-[9px] font-normal mt-0.5">
                    일치 항목
                  </span>
                </div>
                <div className="text-[#5B50E8]">
                  81%
                  <span className="block text-[9px] text-gray-400 font-normal mt-0.5">
                    일관성
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left space-y-4">
              <h3 className="text-xs font-black text-[#1A1A2E]">
                기업별 성장 추이
              </h3>
              <div className="h-28 flex items-end justify-between px-10 relative pb-4 border-b border-gray-100">
                <div className="absolute inset-x-10 bottom-8 h-[2px] bg-indigo-50 border-dashed border-b" />
                <div className="flex flex-col items-center gap-2 z-10">
                  <span className="text-[10px] font-mono font-black text-gray-400">
                    60
                  </span>
                  <span className="w-2.5 h-2.5 bg-gray-300 rounded-full ring-4 ring-white" />
                  <span className="text-[9px] text-gray-400 font-bold">
                    전전직장
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 z-10">
                  <span className="text-[10px] font-mono font-black text-gray-400">
                    68
                  </span>
                  <span className="w-2.5 h-2.5 bg-indigo-400 rounded-full ring-4 ring-white" />
                  <span className="text-[9px] text-gray-400 font-bold">
                    전직장
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 z-10">
                  <span className="text-[10px] font-mono font-black text-[#5B50E8]">
                    76
                  </span>
                  <span className="w-2.5 h-2.5 bg-[#5B50E8] rounded-full ring-4 ring-[#5B50E8]/20 scale-110" />
                  <span className="text-[9px] text-[#1A1A2E] font-black">
                    현직
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3 */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black text-[#1A1A2E]">
                  AI 분석 요약
                </h3>
                <span className="px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-400 rounded text-[9px] font-bold">
                  Phase 1
                </span>
              </div>

              <div className="space-y-4 text-xs leading-relaxed">
                <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100/50 text-[11px] font-bold text-[#5B50E8] flex gap-1.5">
                  <i className="ti ti-activity-heartbeat mt-0.5" /> 규칙 기반
                  분석 결과
                </div>

                <div className="space-y-2 text-gray-600">
                  <div className="font-black text-[#1A1A2E] flex items-center gap-1 text-[11px]">
                    💪 주요 강점
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-[11px] text-gray-500 font-medium">
                    <li>
                      프로젝트 납기 준수율이 매우 높고 자기 인식과 실제 성과가
                      일치합니다.
                    </li>
                    <li>
                      리더십 역량이 자기 선언보다 실제 검증에서 더 높게 평가되어
                      팀 기여도가 우수합니다.
                    </li>
                    <li>
                      문제 해결력에서 겸손한 선언 대비 탁월한 실제 성과를
                      보입니다.
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 text-gray-600 pt-2 border-t border-gray-50">
                  <div className="font-black text-red-500 flex items-center gap-1 text-[11px]">
                    🔍 개선 영역
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium pl-1">
                    커뮤니케이션 항목에서 선언(8점)과 검증(6점) 간 갭이 가장
                    크게 나타납니다.
                  </p>
                </div>

                <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-[10px] text-gray-400 font-semibold">
                  📌 <strong>종합 의견:</strong> 전반적으로 자기 인식과 실제
                  성과가 균형 잡힌 인재입니다. 특히 성과 중심의 업무 스타일이
                  돋보이며, 이전 직장 대비 성장 추이가 명확합니다.
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left space-y-3">
              <h3 className="text-xs font-black text-[#1A1A2E]">
                점수 상세 내역
              </h3>
              <div className="overflow-hidden rounded-xl border border-gray-50">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                      <th className="p-2.5">항목</th>
                      <th className="p-2.5 text-center">자기</th>
                      <th className="p-2.5 text-center">검증</th>
                      <th className="p-2.5 text-right">GAP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-[11px] font-bold text-gray-600">
                    {scoreDetails.map((detail, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/40">
                        <td className="p-2.5 text-[#1A1A2E]">{detail.title}</td>
                        <td className="p-2.5 text-center text-blue-500 font-mono">
                          {detail.self}
                        </td>
                        <td className="p-2.5 text-center text-[#5B50E8] font-mono">
                          {detail.verify}
                        </td>
                        <td
                          className={`p-2.5 text-right font-mono ${detail.gap.includes("+") ? "text-red-500" : detail.gap.includes("-") ? "text-emerald-500" : "text-gray-400"}`}
                        >
                          {detail.gap}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AIReportsPage;
