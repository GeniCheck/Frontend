import React, { useState, useEffect } from "react";

const VerificationPage: React.FC = () => {
  const [filter, setFilter] = useState<"전체" | "재직중" | "퇴사">("전체");

  // 페이지 진입 시 스크롤 최상단 리셋
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const employeeList = [
    {
      name: "김민준",
      dept: "개발팀 · 과장",
      status: "퇴사",
      declare: "완료",
      hrScore: "—",
      due: "D-3 마감",
      action: "검증 입력",
    },
    {
      name: "이서연",
      dept: "마케팅팀 · 대리",
      status: "퇴사",
      declare: "완료",
      hrScore: "—",
      due: "D-9 마감",
      action: "검증 입력",
    },
    {
      name: "박지호",
      dept: "영업팀 · 사원",
      status: "재직중",
      declare: "완료",
      hrScore: "82",
      due: null,
      action: "조회",
    },
    {
      name: "최유나",
      dept: "디자인팀 · 대리",
      status: "재직중",
      declare: "미완료",
      hrScore: "—",
      due: null,
      action: "발송",
    },
    {
      name: "강태양",
      dept: "개발팀 · 부장",
      status: "퇴사",
      declare: "완료",
      hrScore: "76",
      due: null,
      action: "완료",
    },
    {
      name: "윤하은",
      dept: "HR팀 · 과장",
      status: "대기중",
      declare: "미발송",
      hrScore: "—",
      due: null,
      action: "발송",
    },
  ];

  const filteredEmployees = employeeList.filter((emp) => {
    if (filter === "전체") return true;
    return emp.status === filter;
  });

  return (
    /* 부모(MainPage)가 이미 고정 사이드바를 품고 있으므로,
       이곳에서는 전체 flex 레이아웃 틀을 걷어내고 독립적인 우측 스크롤 본문 영역만 바로 기동합니다.
    */
    <main className="flex-1 md:pl-65 flex flex-col min-h-screen">
      {/* 상단 툴바 헤더 */}
      <header className="h-17 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-baseline gap-3 text-left">
          <h1 className="text-base font-black tracking-tight text-[#1A1A2E]">
            Verification
          </h1>
          <span className="text-xs text-gray-400 font-semibold">
            2026년 5월 9일 금요일
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-bold text-[#4B5563] bg-white hover:bg-gray-50 active:scale-95 transition-all shadow-sm">
            직원 추가
          </button>
          <button className="px-4 py-2 bg-[#5B50E8] text-white rounded-xl text-xs font-bold shadow-md shadow-[#5B50E8]/10 hover:bg-[#493fd1] active:scale-95 transition-all flex items-center gap-1.5">
            평가 링크 발송
          </button>
        </div>
      </header>

      {/* 내부 실시간 데이터 대시보드 그리드 */}
      <div className="p-6 space-y-6 max-w-300 w-full mx-auto flex-1">
        <div className="bg-white border border-gray-200 rounded-[22px] p-6 text-left shadow-sm">
          <h2 className="text-base font-black text-[#1A1A2E] mb-1">
            Verification{" "}
            <span className="text-xs text-gray-400 font-normal ml-1">
              직원 자기선언 & 검증 관리
            </span>
          </h2>
          <p className="text-xs text-gray-500">
            퇴사 직원의 검증 평가를 입력하고, 재직 직원의 선언 현황을
            관리합니다.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "총 재직 직원",
              value: "48",
              desc: "↑ 3명 이번 달 입사",
              icon: "ti-users text-[#5B50E8]",
            },
            {
              label: "선언 완료",
              value: "41",
              desc: "완료율 85%",
              icon: "ti-checks text-emerald-500",
            },
            {
              label: "검증 대기",
              value: "3",
              desc: "⏳ 골든타임",
              icon: "ti-hourglass text-amber-500",
            },
            {
              label: "이번 달 퇴사",
              value: "5",
              desc: "평가 완료 2건",
              icon: "ti-logout text-purple-500",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex justify-between items-center text-left"
            >
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  {card.label}
                </span>
                <div className="text-2xl font-black text-[#1A1A2E] mt-1">
                  {card.value}
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5 block">
                  {card.desc}
                </span>
              </div>
              <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-lg">
                <i className={card.icon} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-[22px] p-6 shadow-sm text-left">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black text-[#1A1A2E]">직원 목록</h3>
              <div className="flex gap-1 bg-gray-50 border border-gray-100 rounded-lg p-1 text-[11px] font-bold">
                {(["전체", "재직중", "퇴사"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFilter(t)}
                    className={`px-3 py-1 rounded-md transition-all active:scale-95 ${
                      filter === t
                        ? "bg-white text-[#5B50E8] shadow-xs"
                        : "text-gray-400"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="pb-3 font-semibold">직원명 / 부서</th>
                    <th className="pb-3 font-semibold">상태</th>
                    <th className="pb-3 font-semibold">선언</th>
                    <th className="pb-3 font-semibold">HR 점수</th>
                    <th className="pb-3 font-semibold text-right">액션</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs">
                  {filteredEmployees.map((emp, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-3.5">
                        <div className="font-black text-[#1A1A2E]">
                          {emp.name}
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">
                          {emp.dept}
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            emp.status === "퇴사"
                              ? "bg-red-50 text-red-500"
                              : emp.status === "재직중"
                                ? "bg-emerald-50 text-emerald-500"
                                : "bg-amber-50 text-amber-500"
                          }`}
                        >
                          <span className="w-1 h-1 rounded-full bg-current" />
                          {emp.status}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`font-bold ${emp.declare === "완료" ? "text-emerald-500" : emp.declare === "미완료" ? "text-amber-500" : "text-gray-300"}`}
                        >
                          {emp.declare === "완료" && (
                            <i className="ti ti-check text-[11px] mr-0.5" />
                          )}
                          {emp.declare === "미완료" && (
                            <i className="ti ti-hourglass-low text-[11px] mr-0.5" />
                          )}
                          {emp.declare}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <div className="font-sans font-bold text-[#1A1A2E]">
                          {emp.hrScore}
                          {emp.due && (
                            <span className="block text-[9px] text-red-400 font-normal mt-0.5">
                              {emp.due}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          type="button"
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold shadow-xs active:scale-95 transition-all ${
                            emp.action === "검증 입력"
                              ? "bg-[#5B50E8]/10 text-[#5B50E8] hover:bg-[#5B50E8]/20"
                              : emp.action === "발송"
                                ? "border border-gray-200 text-[#4B5563] hover:bg-gray-50"
                                : "bg-gray-100 text-gray-400 cursor-default"
                          }`}
                        >
                          {emp.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left">
              <h3 className="text-xs font-black text-[#1A1A2E] mb-4">
                검증 골든타임 현황
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "김민준",
                    role: "개발팀 · 과장",
                    days: "3일 남음",
                    urgent: true,
                  },
                  {
                    name: "이서연",
                    role: "마케팅팀 · 대리",
                    days: "9일 남음",
                    urgent: false,
                  },
                  {
                    name: "홍길동",
                    role: "영업팀 · 차장",
                    days: "14일 남음",
                    urgent: false,
                  },
                ].map((gold, i) => (
                  <div
                    key={i}
                    className="p-3.5 bg-gray-50 border border-gray-100 rounded-xl flex justify-between items-center"
                  >
                    <div>
                      <div className="text-xs font-black text-[#1A1A2E]">
                        {gold.name}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {gold.role}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs font-black ${gold.urgent ? "text-red-500" : "text-amber-500"}`}
                      >
                        {gold.days}
                      </span>
                      {gold.urgent && (
                        <span className="block text-[8px] text-red-400 mt-0.5 font-bold animate-pulse">
                          ⚠️ 긴급 처리 필요
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-red-50/50 border border-red-100/50 rounded-xl text-[10px] text-red-500/80 leading-relaxed font-semibold">
                ℹ️ 15일 초과 시 검증 권한이 자동 소멸됩니다. 기한 내 처리해
                주세요.
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-[#1A1A2E]">최근 알림</h3>
                <span className="text-[10px] font-bold text-[#5B50E8] cursor-pointer hover:underline">
                  모두 보기
                </span>
              </div>
              <div className="space-y-3.5">
                {[
                  {
                    title: "김민준 자기평가 완료",
                    sub: "검증 점수 입력이 필요합니다 (D-3)",
                    time: "2시간 전",
                  },
                  {
                    title: "열람 권한 요청 도착",
                    sub: "테크스타트업(주) ➔ 박지호 데이터 열람 요청",
                    time: "5시간 전",
                  },
                  {
                    title: "강태양 평가 완료 처리",
                    sub: "HR 신용점수 76점 산출 완료",
                    time: "이제",
                  },
                  {
                    title: "포인트 적립",
                    sub: "열람 수익 35,000원 자동 적립",
                    time: "2일 전",
                  },
                ].map((noti, i) => (
                  <div
                    key={i}
                    className="flex justify-between gap-3 text-xs items-start border-b border-gray-50 pb-3 last:border-none last:pb-0"
                  >
                    <div>
                      <div className="font-black text-[#1A1A2E]">
                        {noti.title}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {noti.sub}
                      </p>
                    </div>
                    <span className="text-[9px] text-gray-400 font-medium shrink-0">
                      {noti.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left">
              <h3 className="text-xs font-black text-[#1A1A2E]">포인트 현황</h3>
              <div className="space-y-2.5 text-xs font-bold border-b border-gray-50 pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">보유 포인트</span>
                  <span className="text-[#5B50E8] font-black">245,000 P</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">이번 달 적립</span>
                  <span className="text-[#1A1A2E] font-black">+105,000 P</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">사용 가능 인출</span>
                  <span className="text-[#1A1A2E] font-black">245,000원</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert("인출 신청 창 연동")}
                className="w-full mt-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[11px] font-bold text-[#4B5563] hover:bg-gray-50 active:scale-[0.98] transition-all shadow-xs"
              >
                현금 인출 신청
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerificationPage;
