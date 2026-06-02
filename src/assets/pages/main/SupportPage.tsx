import React, { useState, useEffect } from "react";

// 사용할 탭 메뉴의 타입을 명확하게 정의합니다.
type FilterType = "전체" | "접수됨" | "처리 중" | "완료";

const SupportPage: React.FC = () => {
  // 정의한 타입을 useState에 바인딩합니다.
  const [filter, setFilter] = useState<FilterType>("전체");

  // 페이지 진입 시 스크롤 최상단 리셋
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 문의 내역 데이터 세트
  const ticketList = [
    {
      title: "Business 플랜 갱신 시 세금계산서 자동 발행 여부 확인 요청",
      category: "결제 / 크레딧",
      status: "처리 중",
      date: "2026.05.07",
      statusColor: "text-amber-500 bg-amber-50",
    },
    {
      title: "김민준 과장 검증 평가 골든타임 기간 내 미입력 — 기간 연장 요청",
      category: "검증 평가 관련",
      status: "처리 중",
      date: "2026.05.05",
      statusColor: "text-amber-500 bg-amber-50",
    },
    {
      title: "이서연 마케팅팀 대리 — 이의제기 접수 안내 확인 요청",
      category: "이의제기 관련",
      status: "이의제기",
      date: "2026.05.03",
      statusColor: "text-red-500 bg-red-50",
    },
    {
      title: "인사팀장 계정 추가 생성 및 접근 권한 범위 문의",
      category: "계정 / 권한",
      status: "처리 중",
      date: "2026.04.29",
      statusColor: "text-amber-500 bg-amber-50",
    },
    {
      title: "포인트 현금 인출 신청 후 3영업일 초과 미지급 건 문의",
      category: "결제 / 크레딧",
      status: "완료",
      date: "2026.04.20",
      statusColor: "text-emerald-500 bg-emerald-50",
    },
    {
      title: "1회성 평가 링크 만료 후 재발송 방법 문의",
      category: "기술적 오류",
      status: "완료",
      date: "2026.04.15",
      statusColor: "text-emerald-500 bg-emerald-50",
    },
  ];

  // 맵 루프를 돌릴 세그먼트 배열의 타입을 FilterType으로 고정합니다.
  const tabs: { key: FilterType; count: number }[] = [
    { key: "전체", count: 12 },
    { key: "접수됨", count: 1 },
    { key: "처리 중", count: 3 },
    { key: "완료", count: 8 },
  ];

  return (
    /* 부모(MainPage)가 들고 있는 <Sidebar /> 우측 공간에 배치될 본문이므로
       최외곽 구조를 축소하고 <main> 구역만 가볍게 시작합니다.
    */
    <main className="flex-1 md:pl-[260px] flex flex-col min-h-screen">
      {/* 상단 헤더 툴바 */}
      <header className="h-[68px] bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-baseline gap-3 text-left">
          <h1 className="text-base font-black tracking-tight text-[#1A1A2E]">
            Support
          </h1>
          <span className="text-xs text-gray-400 font-semibold">
            고객센터 및 중재 관리
          </span>
        </div>

        <button className="px-4 py-2 bg-[#5B50E8] text-white rounded-xl text-xs font-bold shadow-md shadow-[#5B50E8]/10 hover:bg-[#493fd1] active:scale-95 transition-all">
          문의 등록
        </button>
      </header>

      {/* 대시보드 스크롤 바디 콘텐트 패널 */}
      <div className="p-6 space-y-6 max-w-[1250px] w-full mx-auto flex-1">
        {/* 상단 4열 요약 현황 배너 보드 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "전체 문의",
              value: "12건",
              sub: "8건 처리 완료",
              subColor: "text-emerald-500",
            },
            {
              label: "처리 중",
              value: "3건",
              sub: "평균 응답 1.2일",
              subColor: "text-gray-400",
            },
            {
              label: "이의제기 수신",
              value: "1건",
              sub: "GeniCheck 중재 중",
              subColor: "text-red-500",
            },
            {
              label: "만족도",
              value: "4.6",
              sub: "최근 10건 평균",
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

        {/* 메인 투칼럼 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* 2컬럼: 문의 내역 및 이의제기 타임라인 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 문의 내역 세그먼트 보드 */}
            <div className="bg-white border border-gray-200 rounded-[22px] p-6 shadow-sm text-left">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
                <h3 className="text-sm font-black text-[#1A1A2E]">문의 내역</h3>

                {/* 세그먼트 버튼 칩 세트 */}
                <div className="flex gap-1 bg-gray-50 border border-gray-100 rounded-lg p-1 text-[11px] font-bold">
                  {tabs.map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setFilter(t.key)}
                      className={`px-2.5 py-1 rounded-md transition-all active:scale-95 ${
                        filter === t.key
                          ? "bg-white text-[#5B50E8] shadow-xs"
                          : "text-gray-400"
                      }`}
                    >
                      {t.key}{" "}
                      <span className="text-[9px] font-normal opacity-70">
                        {t.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 문의 건별 상세 리스트 */}
              <div className="divide-y divide-gray-100">
                {ticketList.map((ticket, i) => (
                  <div
                    key={i}
                    className="py-4 flex justify-between items-start gap-4 first:pt-0 last:pb-0 hover:bg-gray-50/50 px-1 rounded-xl transition-colors"
                  >
                    <div className="space-y-1 min-w-0">
                      <h4 className="text-xs font-black text-[#1A1A2E] leading-relaxed truncate sm:whitespace-normal sm:line-clamp-2">
                        {ticket.title}
                      </h4>
                      <span className="inline-block text-[10px] text-gray-400 font-medium">
                        {ticket.category}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[9px] font-black tracking-tight ${ticket.statusColor}`}
                      >
                        {ticket.status}
                      </span>
                      <span className="block text-[9px] text-gray-300 font-mono mt-1.5">
                        {ticket.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 이의제기 수신 현황 패널 위젯 */}
            <div className="bg-white border border-gray-200 rounded-[22px] p-6 shadow-sm text-left space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-[#1A1A2E]">
                  이의제기 수신 현황
                </h3>
                <span className="text-[10px] text-red-500 font-bold">
                  1건 진행 중
                </span>
              </div>

              <div className="p-5 bg-red-50/40 border border-red-100 rounded-2xl space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-black text-[#1A1A2E]">
                      이서연 — 마케팅팀 · 대리
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">
                      2026.05.03 이의제기 접수 · GeniCheck Admin 중재 중
                    </p>
                  </div>
                  <span className="px-2 py-0.5 bg-red-100 text-red-500 rounded text-[9px] font-black">
                    중재 중
                  </span>
                </div>

                {/* 자기 평가 vs 대표 검증 락업 점수 배지 */}
                <div className="flex gap-2.5">
                  <div className="flex-1 bg-white border border-gray-100 p-3 rounded-xl text-center">
                    <span className="block text-[9px] text-gray-400 font-bold mb-1">
                      자기 평가
                    </span>
                    <span className="text-sm font-black text-gray-700">
                      8점
                    </span>
                  </div>
                  <div className="flex-1 bg-white border border-gray-100 p-3 rounded-xl text-center">
                    <span className="block text-[9px] text-gray-400 font-bold mb-1">
                      대표 검증
                    </span>
                    <span className="text-sm font-black text-red-500">3점</span>
                  </div>
                  <div className="flex-1 bg-red-500 text-white p-3 rounded-xl text-center shadow-md shadow-red-500/10">
                    <span className="block text-[9px] text-white/70 font-bold mb-1">
                      점수 차이
                    </span>
                    <span className="text-sm font-black">Δ 5점</span>
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 leading-relaxed bg-white/80 p-3 border border-gray-100 rounded-xl">
                  결과는 이메일로 동시 통보됩니다. 허위 평가 확인 시 해당 점수가
                  블라인드 처리될 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 우측 퀵 문의 채널 및 FAQ 락업 가이드 */}
          <div className="space-y-6">
            {/* 문의 채널 안내 패널 */}
            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left space-y-4">
              <h3 className="text-xs font-black text-[#1A1A2E]">문의 채널</h3>
              <div className="space-y-3">
                {[
                  {
                    type: "채팅 문의",
                    desc: "Business 플랜 우선 응대",
                    tag: "평균 2시간",
                    tagColor: "bg-emerald-50 text-emerald-500",
                  },
                  {
                    type: "이메일 문의",
                    desc: "support@genicheck.co.kr",
                    tag: "평균 1영업일",
                    tagColor: "bg-amber-50 text-amber-500",
                  },
                  {
                    type: "전화 문의",
                    desc: "평일 10:00 - 18:00",
                    tag: "예약 필요",
                    tagColor: "bg-gray-100 text-gray-400",
                  },
                ].map((chan, i) => (
                  <div
                    key={i}
                    className="p-3.5 bg-gray-50 border border-gray-100 rounded-xl flex justify-between items-center group cursor-pointer hover:bg-gray-100/60 transition-all active:scale-98"
                  >
                    <div>
                      <div className="text-xs font-black text-[#1A1A2E]">
                        {chan.type}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {chan.desc}
                      </p>
                    </div>
                    <span
                      className={`text-[9px] font-black px-2 py-0.5 rounded ${chan.tagColor}`}
                    >
                      {chan.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 자주 묻는 질문 FAQ 아코디언 컴포넌트 세트 */}
            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left space-y-3.5">
              <h3 className="text-xs font-black text-[#1A1A2E]">
                자주 묻는 질문
              </h3>
              <div className="space-y-1 text-xs font-bold text-gray-600 divide-y divide-gray-50">
                {[
                  "15일 골든타임을 놓치면 어떻게 되나요?",
                  "이의제기를 받으면 제 점수가 바뀌나요?",
                  "포인트 인출은 언제 가능한가요?",
                  "인사팀장 계정에 어디까지 접근 권한이 있나요?",
                  "1회성 평가 링크가 만료됐을 때 재발송 가능한가요?",
                ].map((faq, i) => (
                  <div
                    key={i}
                    className="py-3 flex justify-between items-center cursor-pointer hover:text-[#5B50E8] transition-colors first:pt-0 last:pb-0 active:translate-x-0.5 transition-transform"
                  >
                    <span className="truncate pr-4">{faq}</span>
                    <i className="ti ti-chevron-right text-gray-300 text-xs shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SupportPage;
