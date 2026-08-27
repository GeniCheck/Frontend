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
    <main className="flex min-h-screen flex-1 flex-col">
      {/* 상단 툴바 헤더 */}
      <header className="sticky top-0 z-40 flex h-17 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div className="flex items-baseline gap-3 text-left">
          <h1 className="text-text1 text-base font-black tracking-tight">
            Verification
          </h1>
          <span className="text-xs font-semibold text-gray-400">
            2026년 5월 9일 금요일
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-text2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold shadow-sm transition-all hover:bg-gray-50 active:scale-95">
            직원 추가
          </button>
          <button className="bg-brand shadow-brand/10 hover:bg-brand-dark flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-md transition-all active:scale-95">
            평가 링크 발송
          </button>
        </div>
      </header>

      {/* 내부 실시간 데이터 대시보드 그리드 */}
      <div className="mx-auto w-full max-w-300 flex-1 space-y-6 p-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm">
          <h2 className="text-text1 mb-1 text-base font-black">
            Verification{" "}
            <span className="ml-1 text-xs font-normal text-gray-400">
              직원 자기선언 & 검증 관리
            </span>
          </h2>
          <p className="text-xs text-gray-500">
            퇴사 직원의 검증 평가를 입력하고, 재직 직원의 선언 현황을
            관리합니다.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              label: "총 재직 직원",
              value: "48",
              desc: "↑ 3명 이번 달 입사",
              icon: "ti-users text-brand",
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
              className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm"
            >
              <div>
                <span className="text-2xs block font-bold tracking-wider text-gray-400 uppercase">
                  {card.label}
                </span>
                <div className="text-text1 mt-1 text-2xl font-black">
                  {card.value}
                </div>
                <span className="text-2xs mt-0.5 block text-gray-400">
                  {card.desc}
                </span>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-lg">
                <i className={card.icon} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-text1 text-sm font-black">직원 목록</h3>
              <div className="text-2xs flex gap-1 rounded-lg border border-gray-100 bg-gray-50 p-1 font-bold">
                {(["전체", "재직중", "퇴사"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFilter(t)}
                    className={`rounded-md px-3 py-1 transition-all active:scale-95 ${
                      filter === t
                        ? "text-brand bg-white shadow-xs"
                        : "text-gray-400"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="text-2xs border-b border-gray-100 font-bold tracking-wider text-gray-400 uppercase">
                    <th className="pb-3 font-semibold">직원명 / 부서</th>
                    <th className="pb-3 font-semibold">상태</th>
                    <th className="pb-3 font-semibold">선언</th>
                    <th className="pb-3 font-semibold">HR 점수</th>
                    <th className="pb-3 text-right font-semibold">액션</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs">
                  {filteredEmployees.map((emp, i) => (
                    <tr
                      key={i}
                      className="transition-colors hover:bg-gray-50/50"
                    >
                      <td className="py-3.5">
                        <div className="text-text1 font-black">{emp.name}</div>
                        <div className="text-2xs mt-0.5 text-gray-400">
                          {emp.dept}
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`text-2xs inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-bold ${
                            emp.status === "퇴사"
                              ? "bg-red-50 text-red-500"
                              : emp.status === "재직중"
                                ? "bg-emerald-50 text-emerald-500"
                                : "bg-amber-50 text-amber-500"
                          }`}
                        >
                          <span className="h-1 w-1 rounded-full bg-current" />
                          {emp.status}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`font-bold ${emp.declare === "완료" ? "text-emerald-500" : emp.declare === "미완료" ? "text-amber-500" : "text-gray-300"}`}
                        >
                          {emp.declare === "완료" && (
                            <i className="ti ti-check text-2xs mr-0.5" />
                          )}
                          {emp.declare === "미완료" && (
                            <i className="ti ti-hourglass-low text-2xs mr-0.5" />
                          )}
                          {emp.declare}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <div className="text-text1 font-sans font-bold">
                          {emp.hrScore}
                          {emp.due && (
                            <span className="text-3xs mt-0.5 block font-normal text-red-400">
                              {emp.due}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          type="button"
                          className={`text-2xs rounded-lg px-3 py-1.5 font-bold shadow-xs transition-all active:scale-95 ${
                            emp.action === "검증 입력"
                              ? "bg-brand/10 text-brand hover:bg-brand/20"
                              : emp.action === "발송"
                                ? "text-text2 border border-gray-200 hover:bg-gray-50"
                                : "cursor-default bg-gray-100 text-gray-400"
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
            <div className="rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
              <h3 className="text-text1 mb-4 text-xs font-black">
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
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3.5"
                  >
                    <div>
                      <div className="text-text1 text-xs font-black">
                        {gold.name}
                      </div>
                      <p className="text-2xs mt-0.5 text-gray-400">
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
                        <span className="text-3xs mt-0.5 block animate-pulse font-bold text-red-400">
                          ⚠️ 긴급 처리 필요
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-2xs mt-4 rounded-xl border border-red-100/50 bg-red-50/50 p-3 leading-relaxed font-semibold text-red-500/80">
                ℹ️ 15일 초과 시 검증 권한이 자동 소멸됩니다. 기한 내 처리해
                주세요.
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-text1 text-xs font-black">최근 알림</h3>
                <span className="text-brand text-2xs cursor-pointer font-bold hover:underline">
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
                    className="flex items-start justify-between gap-3 border-b border-gray-50 pb-3 text-xs last:border-none last:pb-0"
                  >
                    <div>
                      <div className="text-text1 font-black">{noti.title}</div>
                      <p className="text-2xs mt-0.5 text-gray-400">
                        {noti.sub}
                      </p>
                    </div>
                    <span className="text-3xs shrink-0 font-medium text-gray-400">
                      {noti.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
              <h3 className="text-text1 text-xs font-black">포인트 현황</h3>
              <div className="space-y-2.5 border-b border-gray-50 pb-4 text-xs font-bold">
                <div className="flex justify-between">
                  <span className="text-gray-400">보유 포인트</span>
                  <span className="text-brand font-black">245,000 P</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">이번 달 적립</span>
                  <span className="text-text1 font-black">+105,000 P</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">사용 가능 인출</span>
                  <span className="text-text1 font-black">245,000원</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert("인출 신청 창 연동")}
                className="text-text2 text-2xs mt-4 w-full rounded-xl border border-gray-200 bg-white py-2.5 font-bold shadow-xs transition-all hover:bg-gray-50 active:scale-[0.98]"
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
