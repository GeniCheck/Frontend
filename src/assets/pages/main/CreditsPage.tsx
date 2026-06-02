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
    <main className="flex-1 md:pl-[260px] flex flex-col min-h-screen">
      {/* 상단 헤더 툴바 */}
      <header className="h-[68px] bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-baseline gap-3 text-left">
          <h1 className="text-base font-black tracking-tight text-[#1A1A2E]">
            Credits
          </h1>
          <span className="text-xs text-gray-400 font-semibold">
            구독 플랜 및 크레딧/포인트 관리
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-bold text-[#4B5563] bg-white hover:bg-gray-50 active:scale-95 transition-all shadow-sm">
            내역 다운로드
          </button>
          <button className="px-4 py-2 bg-[#5B50E8] text-white rounded-xl text-xs font-bold shadow-md shadow-[#5B50E8]/10 hover:bg-[#493fd1] active:scale-95 transition-all">
            크레딧 충전
          </button>
        </div>
      </header>

      {/* 대시보드 메인 콘텐트 바디 */}
      <div className="p-6 space-y-6 max-w-[1250px] w-full mx-auto flex-1">
        {/* 상단 4열 핵심 서머리 스태츠 행 카드 위젯 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm text-left flex flex-col justify-between h-28"
            >
              <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                {stat.label}
              </span>
              <div>
                <div className="text-2xl font-black text-[#1A1A2E] tracking-tight">
                  {stat.value}
                </div>
                <span
                  className={`text-[10px] font-bold ${stat.subColor} block mt-1`}
                >
                  {stat.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 메인 컴포넌트 하단 레이아웃 (구독/결제 보드 vs 포인트 패널) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* 2컬럼: 좌측 구독 플랜 상태 및 결제 내역 리스트 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 구독 플랜 디스플레이 간판 컴포넌트 */}
            <div className="bg-white border border-gray-200 rounded-[22px] p-6 shadow-sm text-left space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-[#1A1A2E]">구독 플랜</h3>
                <span className="text-[10px] text-gray-400 font-bold font-mono">
                  다음 갱신 2026.06.09
                </span>
              </div>

              {/* 선명한 보라색 메인 구독 등급 배너 배색 처리 */}
              <div className="bg-[#5B50E8] rounded-2xl p-6 text-white flex justify-between items-center shadow-lg shadow-[#5B50E8]/10 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="space-y-1.5 z-10">
                  <span className="inline-block px-2 py-0.5 bg-white/20 rounded text-[9px] font-black uppercase tracking-wider">
                    현재 플랜
                  </span>
                  <h4 className="text-2xl font-black tracking-tight">
                    Business
                  </h4>
                  <p className="text-[10px] text-white/70">
                    2026.06.09 자동 갱신
                  </p>
                </div>
                <div className="text-right z-10 space-y-3">
                  <div className="font-sans text-3xl font-black tracking-tight">
                    990,000원
                    <span className="text-xs font-normal text-white/60 ml-0.5">
                      /월
                    </span>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl text-xs font-bold hover:bg-white/30 active:scale-95 transition-all"
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
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#5B50E8] rounded-full"
                      style={{ width: "24.6%" }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-400">데이터 조회 승인</span>
                    <span className="text-[#1A1A2E]">{3} / 10건</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: "30%" }}
                    />
                  </div>
                </div>
              </div>

              {/* 티켓 단가 상세 가격 테이블 가이드 */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
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
                      className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex justify-between items-center text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gray-200/50 rounded-lg flex items-center justify-center text-gray-400">
                          <i className="ti ti-id text-sm" />
                        </div>
                        <div>
                          <span className="font-black text-[#1A1A2E]">
                            {tier.role}
                          </span>
                          <span className="text-[10px] text-gray-400 ml-2">
                            {tier.desc}
                          </span>
                        </div>
                      </div>
                      <span className="font-sans font-bold text-[#1A1A2E]">
                        {tier.price}
                        <span className="text-[10px] font-normal text-gray-400 ml-0.5">
                          /건
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 결제 내역 최근 6개월 테이블 시트 */}
            <div className="bg-white border border-gray-200 rounded-[22px] p-6 shadow-sm text-left space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-[#1A1A2E]">결제 내역</h3>
                <span className="text-[10px] text-gray-400 font-bold">
                  최근 6개월
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-50">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
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
                        className="hover:bg-gray-50/40 transition-colors"
                      >
                        <td className="p-3 text-gray-400 font-mono font-medium">
                          {tx.date}
                        </td>
                        <td className="p-3">
                          <div className="text-[#1A1A2E] font-black">
                            {tx.item}
                          </div>
                          {tx.detail && (
                            <div className="text-[9px] text-gray-400 font-normal mt-0.5">
                              {tx.detail}
                            </div>
                          )}
                        </td>
                        <td className="p-3 text-right font-sans font-black text-[#1A1A2E]">
                          {tx.amount}
                        </td>
                        <td className="p-3 text-right">
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-black tracking-tight ${tx.statusStyle}`}
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
            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left space-y-4">
              <h3 className="text-xs font-black text-[#1A1A2E]">포인트 현황</h3>
              <div className="p-3.5 bg-amber-50/50 border border-amber-100/60 rounded-xl text-[10px] text-amber-600 font-semibold leading-relaxed">
                ℹ️ 인출은 월 1회, 최소 50,000포인트 이상 가능합니다.
              </div>

              <div className="space-y-2.5 text-xs font-bold border-b border-gray-50 pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">총 보유 포인트</span>
                  <span className="text-[#5B50E8] font-black">245,000 P</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">이번 달 적립</span>
                  <span className="text-[#1A1A2E] font-black">+105,000 P</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">이번 달 사용</span>
                  <span className="text-red-500 font-black">-50,000 P</span>
                </div>
                <div className="flex justify-between pt-1.5 text-sm">
                  <span className="text-gray-700">인출 가능</span>
                  <span className="text-[#5B50E8] font-black">182,000 P</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert("현금 인출 신청 프로세스 연동")}
                className="w-full py-3 bg-[#5B50E8] text-white rounded-xl text-xs font-bold shadow-md shadow-[#5B50E8]/10 active:scale-[0.98] transition-all hover:bg-[#493fd1]"
              >
                현금 인출 신청
              </button>
            </div>

            {/* 포인트 적립 내역 히스토리 피드 위젯 */}
            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black text-[#1A1A2E]">
                  포인트 적립 내역
                </h3>
                <span className="text-[10px] text-gray-400 font-bold cursor-pointer hover:underline">
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
                    className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex justify-between items-center text-xs"
                  >
                    <div>
                      <div className="font-black text-[#1A1A2E]">
                        {item.company}
                      </div>
                      <span className="text-[9px] text-gray-400 block mt-0.5">
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
            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left space-y-4">
              <h3 className="text-xs font-black text-[#1A1A2E]">
                무료 티켓 혜택
              </h3>

              <div className="p-4 bg-emerald-50/60 border border-emerald-100 text-[11px] text-emerald-800 leading-relaxed rounded-xl font-medium">
                <strong>1건 무료 사용 가능</strong>
                <br />
                퇴사 직원 평가를 완료하면, 같은 직급 열람 1건을 무료로 사용할 수
                있습니다.
              </div>

              <div className="flex justify-between items-center text-xs font-bold px-1">
                <span className="text-gray-400">사용 가능한 무료 티켓</span>
                <span className="text-emerald-500 font-black text-sm">1건</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreditsPage;
