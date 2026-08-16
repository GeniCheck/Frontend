import React, { useEffect } from "react";

const CreditsPage: React.FC = () => {
  // 페이지 진입 시 스크롤 최상단 리셋
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 하단 결제 내역 테이블 더미 데이터
  const txHistory = [
    {
      date: "2026.05.07",
      item: "조회 티켓 · 과장급 × 1",
      detail: "박지호 — 테크스타트업(주)",
      amount: "100,000원",
      status: "완료",
      statusStyle: "bg-emerald-50 text-emerald-500",
    },
    {
      date: "2026.05.01",
      item: "Business 플랜 정기결제",
      detail: null,
      amount: "990,000원",
      status: "완료",
      statusStyle: "bg-emerald-50 text-emerald-500",
    },
    {
      date: "2026.04.22",
      item: "조회 티켓 · 사원급 × 2",
      detail: "이유진, 최재원",
      amount: "100,000원",
      status: "완료",
      statusStyle: "bg-emerald-50 text-emerald-500",
    },
    {
      date: "2026.04.01",
      item: "Business 플랜 정기결제",
      detail: null,
      amount: "990,000원",
      status: "완료",
      statusStyle: "bg-emerald-50 text-emerald-500",
    },
    {
      date: "2026.03.14",
      item: "포인트 현금 인출 요청",
      detail: null,
      amount: "-120,000원",
      status: "처리중",
      statusStyle: "bg-amber-50 text-amber-500",
    },
    {
      date: "2026.03.01",
      item: "Business 플랜 정기결제",
      detail: null,
      amount: "990,000원",
      status: "완료",
      statusStyle: "bg-emerald-50 text-emerald-500",
    },
  ];

  return (
    /* 부모(MainPage) 아웃렛 안으로 들어가는 알맹이 스펙이므로 
      독립적인 본문 레이아웃인 <main> 구역만 깔끔하게 오픈합니다.
    */
    <main className="flex min-h-screen flex-1 flex-col md:pl-[260px]">
      {/* 상단 헤더 툴바 */}
      <header className="sticky top-0 z-40 flex h-[68px] items-center justify-between border-b border-gray-200 bg-white px-6">
        <div className="flex items-baseline gap-3 text-left">
          <h1 className="text-base font-black tracking-tight text-[#1A1A2E]">
            Credits
          </h1>
          <span className="text-xs font-semibold text-gray-400">
            구독 플랜 및 크레딧/포인트 관리
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-[#4B5563] shadow-sm transition-all hover:bg-gray-50 active:scale-95">
            내역 다운로드
          </button>
          <button className="rounded-xl bg-[#5B50E8] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#5B50E8]/10 transition-all hover:bg-[#493fd1] active:scale-95">
            크레딧 충전
          </button>
        </div>
      </header>

      {/* 대시보드 메인 콘텐트 바디 */}
      <div className="mx-auto w-full max-w-[1250px] flex-1 space-y-6 p-6">
        {/* 상단 4열 핵심 서머리 스태츠 행 카드 위젯 */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              label: "보유 포인트",
              value: "245K",
              sub: "+105K 이번 달 적립",
              subColor: "text-emerald-500",
            },
            {
              label: "이번 달 크레딧 사용",
              value: "37건",
              sub: "월 한도 150건 중",
              subColor: "text-gray-400",
            },
            {
              label: "인출 가능 금액",
              value: "182K",
              sub: "최소 50K 이상 신청",
              subColor: "text-gray-400",
            },
            {
              label: "이번 달 수익 (열람료)",
              value: "840K",
              sub: "+3건 이번 달 조회 승인",
              subColor: "text-emerald-500",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex h-28 flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm"
            >
              <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                {stat.label}
              </span>
              <div>
                <div className="text-2xl font-black tracking-tight text-[#1A1A2E]">
                  {stat.value}
                </div>
                <span
                  className={`text-[10px] font-bold ${stat.subColor} mt-1 block`}
                >
                  {stat.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 메인 컴포넌트 하단 레이아웃 (구독/결제 보드 vs 포인트 패널) */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {/* 2컬럼: 좌측 구독 플랜 상태 및 결제 내역 리스트 */}
          <div className="space-y-6 lg:col-span-2">
            {/* 구독 플랜 디스플레이 간판 컴포넌트 */}
            <div className="space-y-6 rounded-[22px] border border-gray-200 bg-white p-6 text-left shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#1A1A2E]">구독 플랜</h3>
                <span className="font-mono text-[10px] font-bold text-gray-400">
                  다음 갱신 2026.06.09
                </span>
              </div>

              {/* 선명한 보라색 메인 구독 등급 배너 배색 처리 */}
              <div className="relative flex items-center justify-between overflow-hidden rounded-2xl bg-[#5B50E8] p-6 text-white shadow-lg shadow-[#5B50E8]/10">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="z-10 space-y-1.5">
                  <span className="inline-block rounded bg-white/20 px-2 py-0.5 text-[9px] font-black tracking-wider uppercase">
                    현재 플랜
                  </span>
                  <h4 className="text-2xl font-black tracking-tight">
                    Business
                  </h4>
                  <p className="text-[10px] text-white/70">
                    2026.06.09 자동 갱신
                  </p>
                </div>
                <div className="z-10 space-y-3 text-right">
                  <div className="font-sans text-3xl font-black tracking-tight">
                    990,000원
                    <span className="ml-0.5 text-xs font-normal text-white/60">
                      /월
                    </span>
                  </div>
                  <button
                    type="button"
                    className="rounded-xl border border-white/30 bg-white/20 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-white/30 active:scale-95"
                  >
                    플랜 변경
                  </button>
                </div>
              </div>

              {/* 크레딧 한도 프로그래스 게이지 미터 */}
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-400">이번 달 크레딧 사용</span>
                    <span className="text-[#1A1A2E]">{37} / 150건</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-[#5B50E8]"
                      style={{ width: "24.6%" }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-400">데이터 조회 승인</span>
                    <span className="text-[#1A1A2E]">{3} / 10건</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{ width: "30%" }}
                    />
                  </div>
                </div>
              </div>

              {/* 티켓 단가 상세 가격 테이블 가이드 */}
              <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                  티켓 단가 (조회 권한 구매)
                </div>

                <div className="space-y-2">
                  {[
                    {
                      role: "사원 / 대리급",
                      desc: "직급 기준 1건당",
                      price: "50,000원",
                    },
                    {
                      role: "과장 / 차장급",
                      desc: "직급 기준 1건당",
                      price: "100,000원",
                    },
                    {
                      role: "부장 / 임원급",
                      desc: "직급 기준 1건당",
                      price: "150,000원",
                    },
                  ].map((tier, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-200/50 text-gray-400">
                          <i className="ti ti-id text-sm" />
                        </div>
                        <div>
                          <span className="font-black text-[#1A1A2E]">
                            {tier.role}
                          </span>
                          <span className="ml-2 text-[10px] text-gray-400">
                            {tier.desc}
                          </span>
                        </div>
                      </div>
                      <span className="font-sans font-bold text-[#1A1A2E]">
                        {tier.price}
                        <span className="ml-0.5 text-[10px] font-normal text-gray-400">
                          /건
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 결제 내역 최근 6개월 테이블 시트 */}
            <div className="space-y-4 rounded-[22px] border border-gray-200 bg-white p-6 text-left shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#1A1A2E]">결제 내역</h3>
                <span className="text-[10px] font-bold text-gray-400">
                  최근 6개월
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-50">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      <th className="p-3">날짜</th>
                      <th className="p-3">항목</th>
                      <th className="p-3 text-right">금액</th>
                      <th className="p-3 text-right">상태</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-[11px] font-bold text-gray-600">
                    {txHistory.map((tx, idx) => (
                      <tr
                        key={idx}
                        className="transition-colors hover:bg-gray-50/40"
                      >
                        <td className="p-3 font-mono font-medium text-gray-400">
                          {tx.date}
                        </td>
                        <td className="p-3">
                          <div className="font-black text-[#1A1A2E]">
                            {tx.item}
                          </div>
                          {tx.detail && (
                            <div className="mt-0.5 text-[9px] font-normal text-gray-400">
                              {tx.detail}
                            </div>
                          )}
                        </td>
                        <td className="p-3 text-right font-sans font-black text-[#1A1A2E]">
                          {tx.amount}
                        </td>
                        <td className="p-3 text-right">
                          <span
                            className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-black tracking-tight ${tx.statusStyle}`}
                          >
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 1컬럼: 우측 퀵 정산 매트릭스 및 실시간 포인트 인출 보드 위젯 */}
          <div className="space-y-6">
            {/* 포인트 현황 인출 위젯 대시보드 */}
            <div className="space-y-4 rounded-[22px] border border-gray-200 bg-white p-5 text-left shadow-sm">
              <h3 className="text-xs font-black text-[#1A1A2E]">포인트 현황</h3>
              <div className="rounded-xl border border-amber-100/60 bg-amber-50/50 p-3.5 text-[10px] leading-relaxed font-semibold text-amber-600">
                ℹ️ 인출은 월 1회, 최소 50,000포인트 이상 가능합니다.
              </div>

              <div className="space-y-2.5 border-b border-gray-50 pb-4 text-xs font-bold">
                <div className="flex justify-between">
                  <span className="text-gray-400">총 보유 포인트</span>
                  <span className="font-black text-[#5B50E8]">245,000 P</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">이번 달 적립</span>
                  <span className="font-black text-[#1A1A2E]">+105,000 P</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">이번 달 사용</span>
                  <span className="font-black text-red-500">-50,000 P</span>
                </div>
                <div className="flex justify-between pt-1.5 text-sm">
                  <span className="text-gray-700">인출 가능</span>
                  <span className="font-black text-[#5B50E8]">182,000 P</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert("현금 인출 신청 프로세스 연동")}
                className="w-full rounded-xl bg-[#5B50E8] py-3 text-xs font-bold text-white shadow-md shadow-[#5B50E8]/10 transition-all hover:bg-[#493fd1] active:scale-[0.98]"
              >
                현금 인출 신청
              </button>
            </div>

            {/* 포인트 적립 내역 히스토리 피드 위젯 */}
            <div className="space-y-4 rounded-[22px] border border-gray-200 bg-white p-5 text-left shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-[#1A1A2E]">
                  포인트 적립 내역
                </h3>
                <span className="cursor-pointer text-[10px] font-bold text-gray-400 hover:underline">
                  전체 내역 보기
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    company: "테크스타트업(주) 열람",
                    desc: "2026.05.07 · 박지호 과장",
                    amount: "+70,000 P",
                  },
                  {
                    company: "그린테크(주) 열람",
                    desc: "2026.04.22 · 이유진 사원",
                    amount: "+35,000 P",
                  },
                  {
                    company: "알파솔루션즈 열람",
                    desc: "2026.04.22 · 최재원 사원",
                    amount: "+35,000 P",
                  },
                  {
                    company: "서울벤처스 열람",
                    desc: "2026.03.15 · 홍길동 차장",
                    amount: "+105,000 P",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs"
                  >
                    <div>
                      <div className="font-black text-[#1A1A2E]">
                        {item.company}
                      </div>
                      <span className="mt-0.5 block text-[9px] text-gray-400">
                        {item.desc}
                      </span>
                    </div>
                    <span className="font-sans font-black text-emerald-500">
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 무료 티켓 혜택 가이드 배너 위젯 */}
            <div className="space-y-4 rounded-[22px] border border-gray-200 bg-white p-5 text-left shadow-sm">
              <h3 className="text-xs font-black text-[#1A1A2E]">
                무료 티켓 혜택
              </h3>

              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 text-[11px] leading-relaxed font-medium text-emerald-800">
                <strong>1건 무료 사용 가능</strong>
                <br />
                퇴사 직원 평가를 완료하면, 같은 직급 열람 1건을 무료로 사용할 수
                있습니다.
              </div>

              <div className="flex items-center justify-between px-1 text-xs font-bold">
                <span className="text-gray-400">사용 가능한 무료 티켓</span>
                <span className="text-sm font-black text-emerald-500">1건</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreditsPage;
