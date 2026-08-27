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
      barColor: "bg-brand",
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
    <main className="flex min-h-screen flex-1 flex-col">
      {/* 상단 헤더 툴바 영역 */}
      <header className="sticky top-0 z-40 flex h-17 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div className="flex items-baseline gap-3 text-left">
          <h1 className="text-text1 text-base font-black tracking-tight">
            AI Reports
          </h1>
          <span className="text-xs font-semibold text-gray-400">
            HR 신용점수 & 역량 분석
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-brand text-2xs rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 font-bold">
            Phase 1 · 규칙 기반
          </span>
          <button className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50 active:scale-95">
            PDF 내보내기
          </button>
        </div>
      </header>

      {/* 가이드 영역 및 메인 콘텐츠 패널 */}
      <div className="mx-auto w-full max-w-312.5 flex-1 space-y-6 p-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
          <p className="text-xs text-gray-500">
            자기 선언과 대표 검증 점수를 대조 분석하여 객관적인 HR 신용점수를
            산출합니다.
          </p>
        </div>

        {/* 직원 스위처 필터 행 */}
        <div className="text-text2 flex flex-wrap items-center gap-2 rounded-2xl border border-gray-200 bg-white p-3.5 text-xs font-bold shadow-sm">
          <span className="mr-2 text-gray-400">직원 선택</span>
          <button
            type="button"
            className="bg-brand flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-white shadow-sm transition-all active:scale-95"
          >
            <span className="h-2 w-2 rounded-full bg-indigo-200" /> 강태양 ·
            부장
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2 text-gray-500 transition-all hover:bg-gray-100 active:scale-95"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> 박지호 ·
            사원
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2 text-gray-500 transition-all hover:bg-gray-100 active:scale-95"
          >
            <span className="h-2 w-2 rounded-full bg-amber-400" /> 김민준 · 과장
          </button>
          <button
            type="button"
            className="px-3 py-2 text-gray-300 hover:text-gray-400"
          >
            더보기
          </button>
        </div>

        {/* 리포팅 대시보드 메인 본체 GRID */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {/* COLUMN 1 */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-950 via-indigo-900 to-indigo-700 p-6 text-left text-white shadow-xl">
              <div className="text-2xs font-black tracking-wider text-white/50 uppercase">
                HR 신용점수
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div className="flex items-baseline">
                  <span className="text-6xl font-black tracking-tight">76</span>
                  <span className="ml-1 text-sm font-bold text-white/40">
                    / 100
                  </span>
                </div>
                <span className="text-2xs rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 font-bold shadow-xs">
                  동종 직군 상위 34%
                </span>
              </div>
              <div className="text-2xs mt-1.5 text-white/60">
                개발팀 부장 · 퇴사 완료
              </div>

              <div className="text-2xs mt-6 space-y-3 border-t border-white/10 pt-5 font-bold">
                <div className="flex justify-between">
                  <span className="text-white/50">성과 점수</span>
                  <span className="mt-1.5 h-1.5 w-24 overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-white"
                      style={{ width: "73%" }}
                    />
                  </span>
                  <span>7.3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">일관성</span>
                  <span className="mt-1.5 h-1.5 w-24 overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-emerald-400"
                      style={{ width: "81%" }}
                    />
                  </span>
                  <span className="text-emerald-400">81%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">자기객관화</span>
                  <span className="mt-1.5 h-1.5 w-24 overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{ width: "78%" }}
                    />
                  </span>
                  <span className="text-amber-400">0.78</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
              <div className="text-text1 flex items-center justify-between">
                <h3 className="text-xs font-black">재고용 의향</h3>
                <span className="text-3xs font-bold text-gray-400">
                  대표 입력 기준
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center font-black">
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">
                  <span className="text-2xs mb-1 block font-sans font-black tracking-tight text-emerald-600">
                    YES
                  </span>
                  <span className="text-2xl font-black text-emerald-600">
                    1
                  </span>
                </div>
                <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-3">
                  <span className="text-2xs mb-1 block font-sans font-black tracking-tight text-amber-600">
                    HOLD
                  </span>
                  <span className="text-2xl font-black text-amber-600">0</span>
                </div>
                <div className="rounded-xl border border-red-100 bg-red-50/60 p-3">
                  <span className="text-2xs mb-1 block font-sans font-black tracking-tight text-red-500">
                    NO
                  </span>
                  <span className="text-2xl font-black text-red-500">0</span>
                </div>
              </div>
              <p className="text-2xs leading-relaxed text-gray-400">
                재고용 의향은 YES / HOLD / NO만 입력됩니다. 명예훼손 방지를 위해
                사유 기재는 금지됩니다.
              </p>
            </div>

            <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
              <h3 className="text-text1 text-xs font-black">
                기업별 누적 이력
              </h3>
              <div className="relative space-y-3 before:absolute before:top-2 before:bottom-2 before:left-2.75 before:w-px before:bg-gray-100">
                <div className="relative z-10 flex items-start gap-3">
                  <span className="bg-brand text-3xs flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-bold text-white">
                    현
                  </span>
                  <div className="flex min-w-0 flex-1 items-start justify-between">
                    <div>
                      <h4 className="text-text1 truncate text-xs font-black">
                        현 직장 (귀사)
                      </h4>
                      <p className="text-3xs mt-0.5 text-gray-400">
                        2021.03 - 2026.04 · 5년 1개월
                      </p>
                    </div>
                    <span className="text-brand text-sm font-black">
                      76
                      <span className="text-3xs font-sans text-gray-300">
                        /100
                      </span>
                    </span>
                  </div>
                </div>
                <div className="relative z-10 flex items-start gap-3">
                  <span className="text-3xs flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500 font-bold text-white">
                    전
                  </span>
                  <div className="flex min-w-0 flex-1 items-start justify-between">
                    <div>
                      <h4 className="truncate text-xs font-black text-gray-600">
                        이전 직장 A
                      </h4>
                      <p className="text-3xs mt-0.5 text-gray-400">
                        2018.07 - 2021.02 · 2년 7개월
                      </p>
                    </div>
                    <span className="text-sm font-black text-gray-600">
                      68
                      <span className="text-3xs font-sans text-gray-300">
                        /100
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-2xs flex justify-between border-t border-gray-50 pt-3 font-bold text-gray-400">
                <span>누적 평균 72점</span>
                <span className="text-emerald-500">성장 추이 ↑ +8점</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2 */}
          <div className="space-y-6">
            <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-text1 text-xs font-black">
                  선언 vs 검증 대조
                </h3>
                <div className="text-3xs flex gap-3 font-bold">
                  <span className="flex items-center gap-1 text-gray-400">
                    <span className="bg-brand2/20 h-2 w-2 rounded-xs" />
                    자기평가
                  </span>
                  <span className="text-brand flex items-center gap-1">
                    <span className="bg-brand h-2 w-2 rounded-xs" />
                    검증점수
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {scoreDetails.slice(0, 5).map((row, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="text-2xs flex justify-between font-bold">
                      <span className="text-text1">{row.title}</span>
                      <span className="text-gray-400 tabular-nums">
                        자기 {row.self} 검증 {row.verify}
                      </span>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full ${row.barColor} rounded-full`}
                        style={{ width: `${row.verify * 10}%` }}
                      />
                    </div>
                    <span
                      className={`text-3xs inline-block rounded px-1.5 py-0.5 font-black ${
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

              <div className="text-2xs grid grid-cols-3 border-t border-gray-50 pt-3 text-center font-black text-gray-400">
                <div>
                  1.2
                  <span className="text-3xs mt-0.5 block font-normal">
                    평균 GAP
                  </span>
                </div>
                <div>
                  4 / 6
                  <span className="text-3xs mt-0.5 block font-normal">
                    일치 항목
                  </span>
                </div>
                <div className="text-brand">
                  81%
                  <span className="text-3xs mt-0.5 block font-normal text-gray-400">
                    일관성
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
              <h3 className="text-text1 text-xs font-black">
                기업별 성장 추이
              </h3>
              <div className="relative flex h-28 items-end justify-between border-b border-gray-100 px-10 pb-4">
                <div className="absolute inset-x-10 bottom-8 h-0.5 border-b border-dashed bg-indigo-50" />
                <div className="z-10 flex flex-col items-center gap-2">
                  <span className="text-2xs font-black text-gray-400 tabular-nums">
                    60
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-gray-300 ring-4 ring-white" />
                  <span className="text-3xs font-bold text-gray-400">
                    전전직장
                  </span>
                </div>
                <div className="z-10 flex flex-col items-center gap-2">
                  <span className="text-2xs font-black text-gray-400 tabular-nums">
                    68
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-400 ring-4 ring-white" />
                  <span className="text-3xs font-bold text-gray-400">
                    전직장
                  </span>
                </div>
                <div className="z-10 flex flex-col items-center gap-2">
                  <span className="text-brand text-2xs font-black tabular-nums">
                    76
                  </span>
                  <span className="bg-brand ring-brand/20 h-2.5 w-2.5 scale-110 rounded-full ring-4" />
                  <span className="text-text1 text-3xs font-black">현직</span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3 */}
          <div className="space-y-6">
            <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-text1 text-xs font-black">AI 분석 요약</h3>
                <span className="text-3xs rounded border border-gray-100 bg-gray-50 px-2 py-0.5 font-bold text-gray-400">
                  Phase 1
                </span>
              </div>

              <div className="space-y-4 text-xs leading-relaxed">
                <div className="text-brand text-2xs flex gap-1.5 rounded-xl border border-purple-100/50 bg-purple-50/50 p-3 font-bold">
                  <i className="ti ti-activity-heartbeat mt-0.5" /> 규칙 기반
                  분석 결과
                </div>

                <div className="space-y-2 text-gray-600">
                  <div className="text-text1 text-2xs flex items-center gap-1 font-black">
                    💪 주요 강점
                  </div>
                  <ul className="text-2xs list-disc space-y-1 pl-4 font-medium text-gray-500">
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

                <div className="space-y-2 border-t border-gray-50 pt-2 text-gray-600">
                  <div className="text-2xs flex items-center gap-1 font-black text-red-500">
                    🔍 개선 영역
                  </div>
                  <p className="text-2xs pl-1 font-medium text-gray-500">
                    커뮤니케이션 항목에서 선언(8점)과 검증(6점) 간 갭이 가장
                    크게 나타납니다.
                  </p>
                </div>

                <div className="text-2xs rounded-xl border border-gray-100 bg-gray-50 p-3 font-semibold text-gray-400">
                  📌 <strong>종합 의견:</strong> 전반적으로 자기 인식과 실제
                  성과가 균형 잡힌 인재입니다. 특히 성과 중심의 업무 스타일이
                  돋보이며, 이전 직장 대비 성장 추이가 명확합니다.
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
              <h3 className="text-text1 text-xs font-black">점수 상세 내역</h3>
              <div className="overflow-hidden rounded-xl border border-gray-50">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="text-2xs border-b border-gray-100 bg-gray-50 font-bold tracking-wider text-gray-400 uppercase">
                      <th className="p-2.5">항목</th>
                      <th className="p-2.5 text-center">자기</th>
                      <th className="p-2.5 text-center">검증</th>
                      <th className="p-2.5 text-right">GAP</th>
                    </tr>
                  </thead>
                  <tbody className="text-2xs divide-y divide-gray-50 font-bold text-gray-600">
                    {scoreDetails.map((detail, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/40">
                        <td className="text-text1 p-2.5">{detail.title}</td>
                        <td className="p-2.5 text-center text-blue-500 tabular-nums">
                          {detail.self}
                        </td>
                        <td className="text-brand p-2.5 text-center tabular-nums">
                          {detail.verify}
                        </td>
                        <td
                          className={`p-2.5 text-right tabular-nums ${detail.gap.includes("+") ? "text-red-500" : detail.gap.includes("-") ? "text-emerald-500" : "text-gray-400"}`}
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
