import React from "react";

const DashboardPage: React.FC = () => {
  const monthlyStats = [
    { month: "12월", self: 40, verify: 60 },
    { month: "1월", self: 75, verify: 90 },
    { month: "2월", self: 30, verify: 45 },
    { month: "3월", self: 80, verify: 95 },
    { month: "4월", self: 65, verify: 70 },
    { month: "5월", self: 50, verify: 80 },
  ];

  return (
    <main className="flex min-h-screen flex-1 flex-col md:pl-[260px]">
      {/* 상단 툴바 헤더 */}
      <header className="sticky top-0 z-40 flex h-[68px] items-center justify-between border-b border-gray-200 bg-white px-6">
        <div className="flex items-baseline gap-3 text-left">
          <h1 className="text-base font-black tracking-tight text-[#1A1A2E]">
            Dashboard
          </h1>
          <span className="text-xs font-semibold text-gray-400">
            2026년 5월 9일 금요일
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-[#4B5563] shadow-sm transition-all hover:bg-gray-50 active:scale-95">
            리포트 내보내기
          </button>
          <button className="flex items-center gap-1.5 rounded-xl bg-[#5B50E8] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#5B50E8]/10 transition-all hover:bg-[#493fd1] active:scale-95">
            <i className="ti ti-user-plus text-sm" /> 직원 등록
          </button>
          <div className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-400 transition-colors hover:text-[#5B50E8]">
            <i className="ti ti-bell text-base" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
          </div>
        </div>
      </header>

      {/* 메인 데이터 패널 콘텐트 */}
      <div className="mx-auto w-full max-w-[1200px] flex-1 space-y-6 p-6">
        {/* TOP BANNER */}
        <div className="relative flex items-center justify-between overflow-hidden rounded-[20px] bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#4338CA] p-6 text-left text-white shadow-xl">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="z-10 space-y-1">
            <h2 className="text-xl font-black tracking-tight">
              좋은 아침이에요, Elizabeth 👋
            </h2>
            <p className="max-w-xl text-xs leading-relaxed text-white/80">
              검증 대기 중인 직원이{" "}
              <span className="font-bold text-[#A5B4FC]">3명</span> 있습니다.
              오늘 처리해 주세요. 박지호 데이터 열람 요청이{" "}
              <span className="font-bold text-[#34D399]">1건</span> 승인 대기
              중입니다.
            </p>
          </div>
          <div className="z-10 flex shrink-0 gap-2">
            <button className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-[#1A1A2E] shadow-md transition-all hover:bg-gray-50 active:scale-95">
              검증 처리하기
            </button>
            <button className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-white/20 active:scale-95">
              열람 요청 보기
            </button>
          </div>
        </div>

        {/* CORE KPI CARDS GRID */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "총 재직 직원",
              value: "48",
              change: "↑ 3명 이번 달 입사",
              color: "border-t-4 border-t-[#5B50E8]",
              emoji: "👥",
            },
            {
              label: "선언 완료율",
              value: "85%",
              change: "41 / 48명 완료",
              color: "border-t-4 border-t-[#10B981]",
              emoji: "📈",
            },
            {
              label: "검증 대기",
              value: "3",
              change: "⏱ 골든타임 처리 필요",
              color: "border-t-4 border-t-[#F59E0B]",
              emoji: "⏳",
            },
            {
              label: "보유 포인트",
              value: "245K",
              change: "+105K 이번 달 적립",
              color: "border-t-4 border-t-blue-500",
              emoji: "🪙",
            },
          ].map((kpi, i) => (
            <div
              key={i}
              className={`flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm ${kpi.color}`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                  {kpi.label}
                </span>
                <span className="text-base">{kpi.emoji}</span>
              </div>
              <div className="mt-2.5">
                <div className="text-3xl font-black tracking-tight text-[#1A1A2E]">
                  {kpi.value}
                </div>
                <p className="mt-1 text-[10px] text-gray-400">{kpi.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-[22px] border border-gray-200 bg-white p-6 text-left shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-sm font-black text-[#1A1A2E]">
                  월별 평가 현황
                </h3>
                <select className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-gray-500 outline-none">
                  <option>최근 6개월</option>
                </select>
              </div>
              <div className="flex h-48 items-end justify-between gap-6 border-b border-gray-100 px-4 pb-2">
                {monthlyStats.map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex h-full flex-1 flex-col items-center justify-end gap-1.5"
                  >
                    <div className="flex h-[85%] w-full items-end justify-center gap-1">
                      <div
                        className="w-3 rounded-t-sm bg-[#8B5CF6]/20 transition-opacity group-hover:opacity-90"
                        style={{ height: `${item.self}%` }}
                      />
                      <div
                        className="w-3 rounded-t-sm bg-[#5B50E8] transition-opacity group-hover:opacity-90"
                        style={{ height: `${item.verify}%` }}
                      />
                    </div>
                    <span className="shrink-0 text-[10px] font-semibold text-gray-400">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end gap-4 text-[10px] font-bold">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <span className="h-2.5 w-2.5 rounded-sm bg-[#8B5CF6]/20" />
                  자기 평가
                </div>
                <div className="flex items-center gap-1.5 text-[#5B50E8]/100">
                  <span className="h-2.5 w-2.5 rounded-sm bg-[#5B50E8]" />
                  검증 완료
                </div>
              </div>
            </div>

            <div className="rounded-[22px] border border-gray-200 bg-white p-6 text-left shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-sm font-black text-[#1A1A2E]">최근 활동</h3>
                <span className="cursor-pointer text-[11px] font-bold text-[#5B50E8] hover:underline">
                  모두 보기
                </span>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  {
                    title: "김민준 자기평가 제출 완료",
                    desc: "검증 점수 입력 필요 · 마감 D-3 · 개발팀 과장",
                    time: "2시간 전",
                    bg: "bg-red-50 text-red-500",
                    icon: "ti-file-description",
                  },
                  {
                    title: "테크스타트업(주) 데이터 열람 요청",
                    desc: "박지호 · 영업팀 사원 · 승인 대기 중",
                    time: "5시간 전",
                    bg: "bg-blue-50 text-blue-500",
                    icon: "ti-lock-open",
                  },
                  {
                    title: "강태양 HR 신용점수 산출 완료",
                    desc: "최종 점수 76점 · 개발팀 부장 · 동종 직군 상위 34%",
                    time: "어제",
                    bg: "bg-emerald-50 text-emerald-500",
                    icon: "ti-award",
                  },
                  {
                    title: "포인트 35,000원 자동 적립",
                    desc: "그로스벤처(주) 박지호 데이터 열람 수익 70%",
                    time: "2일 전",
                    bg: "bg-amber-50 text-amber-500",
                    icon: "ti-coin",
                  },
                  {
                    title: "신입사원 3명 자기선언 링크 발송",
                    desc: "윤하은 · 정다인 · 오승민 · 답변 대기 중",
                    time: "3일 전",
                    bg: "bg-purple-50 text-purple-500",
                    icon: "ti-send",
                  },
                ].map((act, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4 rounded-xl px-2 py-3.5 transition-colors first:pt-0 last:pb-0 hover:bg-gray-50/50"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`h-9 w-9 rounded-xl ${act.bg} flex shrink-0 items-center justify-center text-base`}
                      >
                        <i className={`ti ${act.icon}`} />
                      </div>
                      <div>
                        <div className="text-xs font-black text-[#1A1A2E]">
                          {act.title}
                        </div>
                        <p className="mt-0.5 text-[10px] text-gray-400">
                          {act.desc}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] font-medium text-gray-400">
                      {act.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[22px] border border-gray-200 bg-white p-5 text-left shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-black text-[#1A1A2E]">
                    열람 권한 요청
                  </h3>
                  <span className="scale-90 rounded bg-red-500 px-1.5 py-0.5 text-[8px] font-bold tracking-wider text-white uppercase">
                    NEW
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-gray-400">
                  5시간 전
                </span>
              </div>
              <div className="space-y-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div>
                  <div className="text-xs font-black text-[#1A1A2E]">
                    테크스타트업(주)
                  </div>
                  <p className="mt-0.5 text-[10px] text-gray-400">
                    → 박지호 · 영업팀 사원
                  </p>
                </div>
                <p className="rounded-lg border border-gray-200 bg-white p-2 text-[10px] leading-relaxed text-gray-500">
                  직원에게 열람 통보 발송됨 · 7일 내 응답 없으면 자동 승인
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => alert("승인 완료")}
                    className="rounded-lg bg-[#5B50E8] py-2 text-[11px] font-bold text-white shadow-md shadow-[#5B50E8]/10 transition-all active:scale-95"
                  >
                    승인
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("거절 완료")}
                    className="rounded-lg border border-gray-200 bg-white py-2 text-[11px] font-bold text-gray-500 transition-all hover:bg-gray-50 active:scale-95"
                  >
                    거부
                  </button>
                </div>
              </div>
              <div className="mt-3.5 flex justify-between px-1 text-[10px] font-semibold text-gray-400">
                <span>이번 달 총 요청</span>
                <span className="font-bold text-[#1A1A2E]">
                  4건{" "}
                  <span className="font-normal text-gray-300">
                    (완료 3, 대기 1)
                  </span>
                </span>
              </div>
            </div>

            <div className="rounded-[22px] border border-gray-200 bg-white p-5 text-left shadow-sm">
              <h3 className="mb-4 text-xs font-black text-[#1A1A2E]">
                직원 현황
              </h3>
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 shrink-0 rotate-45 items-center justify-center rounded-full border-[10px] border-t-[#10B981] border-r-[#F59E0B] border-b-gray-100 border-l-[#5B50E8]" />
                <div className="flex-1 space-y-2 text-[11px] font-bold text-gray-400">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#5B50E8]" />
                      재직중
                    </div>
                    <span className="text-[#1A1A2E]">41</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                      퇴사 완료
                    </div>
                    <span className="text-[#1A1A2E]">13</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                      선언 미완료
                    </div>
                    <span className="text-[#1A1A2E]">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-gray-200" />
                      기타
                    </div>
                    <span className="text-[#1A1A2E]">3</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[22px] border border-gray-200 bg-white p-5 text-left shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs font-black text-[#1A1A2E]">현재 플랜</h3>
                <span className="cursor-pointer text-[10px] font-bold text-[#5B50E8] hover:underline">
                  변경
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <div className="text-sm font-black text-[#1A1A2E]">
                  Business Plan
                </div>
                <span className="font-sans text-[11px] font-bold text-[#5B50E8]">
                  월 990,000원
                </span>
              </div>
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-gray-400">크레딧 사용</span>
                  <span className="font-black text-[#5B50E8]">112 / 150건</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#5B50E8] to-[#8B5CF6]"
                    style={{ width: "74%" }}
                  />
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3.5 text-center text-[10px] font-semibold text-gray-400">
                <div className="text-left">
                  갱신일
                  <span className="mt-0.5 block font-black text-[#1A1A2E]">
                    2026. 06. 01
                  </span>
                </div>
                <div className="text-right">
                  남은 크레딧
                  <span className="mt-0.5 block font-black text-amber-500">
                    38건
                  </span>
                </div>
                <div className="col-span-2 mt-1 text-left">
                  무료 가입 후 기간
                  <span className="float-right font-black text-emerald-600">
                    종료
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
