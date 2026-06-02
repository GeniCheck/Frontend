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
    <main className="flex-1 md:pl-[260px] flex flex-col min-h-screen">
      {/* 상단 툴바 헤더 */}
      <header className="h-[68px] bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-baseline gap-3 text-left">
          <h1 className="text-base font-black tracking-tight text-[#1A1A2E]">
            Dashboard
          </h1>
          <span className="text-xs text-gray-400 font-semibold">
            2026년 5월 9일 금요일
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-bold text-[#4B5563] bg-white hover:bg-gray-50 active:scale-95 transition-all shadow-sm">
            리포트 내보내기
          </button>
          <button className="px-4 py-2 bg-[#5B50E8] text-white rounded-xl text-xs font-bold shadow-md shadow-[#5B50E8]/10 hover:bg-[#493fd1] active:scale-95 transition-all flex items-center gap-1.5">
            <i className="ti ti-user-plus text-sm" /> 직원 등록
          </button>
          <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 cursor-pointer hover:text-[#5B50E8] transition-colors relative">
            <i className="ti ti-bell text-base" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </div>
        </div>
      </header>

      {/* 메인 데이터 패널 콘텐트 */}
      <div className="p-6 space-y-6 max-w-[1200px] w-full mx-auto flex-1">
        {/* TOP BANNER */}
        <div className="bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#4338CA] rounded-[20px] p-6 text-white text-left relative overflow-hidden shadow-xl flex justify-between items-center">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="space-y-1 z-10">
            <h2 className="text-xl font-black tracking-tight">
              좋은 아침이에요, Elizabeth 👋
            </h2>
            <p className="text-xs text-white/80 max-w-xl leading-relaxed">
              검증 대기 중인 직원이{" "}
              <span className="text-[#A5B4FC] font-bold">3명</span> 있습니다.
              오늘 처리해 주세요. 박지호 데이터 열람 요청이{" "}
              <span className="text-[#34D399] font-bold">1건</span> 승인 대기
              중입니다.
            </p>
          </div>
          <div className="flex gap-2 z-10 shrink-0">
            <button className="px-4 py-2 bg-white text-[#1A1A2E] rounded-xl text-xs font-bold hover:bg-gray-50 active:scale-95 transition-all shadow-md">
              검증 처리하기
            </button>
            <button className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl text-xs font-bold hover:bg-white/20 active:scale-95 transition-all">
              열람 요청 보기
            </button>
          </div>
        </div>

        {/* CORE KPI CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              className={`bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between text-left ${kpi.color}`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                  {kpi.label}
                </span>
                <span className="text-base">{kpi.emoji}</span>
              </div>
              <div className="mt-2.5">
                <div className="text-3xl font-black tracking-tight text-[#1A1A2E]">
                  {kpi.value}
                </div>
                <p className="text-[10px] text-gray-400 mt-1">{kpi.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-[22px] p-6 shadow-sm text-left">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black text-[#1A1A2E]">
                  월별 평가 현황
                </h3>
                <select className="px-2.5 py-1.5 text-[11px] font-bold border border-gray-200 bg-white rounded-lg text-gray-500 outline-none">
                  <option>최근 6개월</option>
                </select>
              </div>
              <div className="h-48 flex items-end justify-between px-4 pb-2 border-b border-gray-100 gap-6">
                {monthlyStats.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group"
                  >
                    <div className="w-full flex justify-center gap-1 items-end h-[85%]">
                      <div
                        className="w-3 bg-[#8B5CF6]/20 rounded-t-sm group-hover:opacity-90 transition-opacity"
                        style={{ height: `${item.self}%` }}
                      />
                      <div
                        className="w-3 bg-[#5B50E8] rounded-t-sm group-hover:opacity-90 transition-opacity"
                        style={{ height: `${item.verify}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 font-semibold shrink-0">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end gap-4 text-[10px] font-bold">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <span className="w-2.5 h-2.5 bg-[#8B5CF6]/20 rounded-sm" />
                  자기 평가
                </div>
                <div className="flex items-center gap-1.5 text-[#5B50E8]/100">
                  <span className="w-2.5 h-2.5 bg-[#5B50E8] rounded-sm" />
                  검증 완료
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-[22px] p-6 shadow-sm text-left">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-sm font-black text-[#1A1A2E]">최근 활동</h3>
                <span className="text-[11px] font-bold text-[#5B50E8] cursor-pointer hover:underline">
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
                    className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0 hover:bg-gray-50/50 rounded-xl px-2 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-xl ${act.bg} flex items-center justify-center text-base shrink-0`}
                      >
                        <i className={`ti ${act.icon}`} />
                      </div>
                      <div>
                        <div className="text-xs font-black text-[#1A1A2E]">
                          {act.title}
                        </div>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {act.desc}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium shrink-0">
                      {act.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-black text-[#1A1A2E]">
                    열람 권한 요청
                  </h3>
                  <span className="px-1.5 py-0.5 bg-red-500 text-white rounded text-[8px] font-bold uppercase tracking-wider scale-90">
                    NEW
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-semibold">
                  5시간 전
                </span>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-3">
                <div>
                  <div className="text-xs font-black text-[#1A1A2E]">
                    테크스타트업(주)
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    → 박지호 · 영업팀 사원
                  </p>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed bg-white p-2 border border-gray-200 rounded-lg">
                  직원에게 열람 통보 발송됨 · 7일 내 응답 없으면 자동 승인
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => alert("승인 완료")}
                    className="py-2 bg-[#5B50E8] text-white rounded-lg text-[11px] font-bold shadow-md shadow-[#5B50E8]/10 active:scale-95 transition-all"
                  >
                    승인
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("거절 완료")}
                    className="py-2 bg-white border border-gray-200 text-gray-500 rounded-lg text-[11px] font-bold active:scale-95 transition-all hover:bg-gray-50"
                  >
                    거부
                  </button>
                </div>
              </div>
              <div className="mt-3.5 flex justify-between text-[10px] text-gray-400 px-1 font-semibold">
                <span>이번 달 총 요청</span>
                <span className="text-[#1A1A2E] font-bold">
                  4건{" "}
                  <span className="text-gray-300 font-normal">
                    (완료 3, 대기 1)
                  </span>
                </span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left">
              <h3 className="text-xs font-black text-[#1A1A2E] mb-4">
                직원 현황
              </h3>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full border-[10px] border-l-[#5B50E8] border-t-[#10B981] border-r-[#F59E0B] border-b-gray-100 rotate-45 flex items-center justify-center shrink-0" />
                <div className="flex-1 space-y-2 text-[11px] font-bold text-gray-400">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#5B50E8]" />
                      재직중
                    </div>
                    <span className="text-[#1A1A2E]">41</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                      퇴사 완료
                    </div>
                    <span className="text-[#1A1A2E]">13</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                      선언 미완료
                    </div>
                    <span className="text-[#1A1A2E]">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gray-200" />
                      기타
                    </div>
                    <span className="text-[#1A1A2E]">3</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-[#1A1A2E]">현재 플랜</h3>
                <span className="text-[10px] font-bold text-[#5B50E8] cursor-pointer hover:underline">
                  변경
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <div className="text-sm font-black text-[#1A1A2E]">
                  Business Plan
                </div>
                <span className="text-[11px] font-sans font-bold text-[#5B50E8]">
                  월 990,000원
                </span>
              </div>
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-gray-400">크레딧 사용</span>
                  <span className="text-[#5B50E8] font-black">112 / 150건</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#5B50E8] to-[#8B5CF6] rounded-full"
                    style={{ width: "74%" }}
                  />
                </div>
              </div>
              <div className="mt-5 pt-3.5 border-t border-gray-100 grid grid-cols-2 text-center text-[10px] text-gray-400 font-semibold gap-2">
                <div className="text-left">
                  갱신일
                  <span className="block text-[#1A1A2E] font-black mt-0.5">
                    2026. 06. 01
                  </span>
                </div>
                <div className="text-right">
                  남은 크레딧
                  <span className="block text-amber-500 font-black mt-0.5">
                    38건
                  </span>
                </div>
                <div className="col-span-2 text-left mt-1">
                  무료 가입 후 기간
                  <span className="float-right text-emerald-600 font-black">
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
