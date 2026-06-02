import React, { useState, useEffect } from "react";

const ReferralPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState("전체 게시판");
  const [selectedJob, setSelectedJob] = useState("전체 직군");

  // 페이지 진입 시 스크롤 최상단 리셋
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const talentList = [
    {
      name: "강태양",
      dept: "개발팀 · 부장",
      init: "강",
      score: 76,
      color: "bg-blue-600",
      desc: "Spring Boot 기반 MSA 설계 경험 다수. 납기 준수율 100%, 팀 리딩 경험 5년 이상.",
      tags: ["Java", "Spring Boot", "MSA", "리더십"],
      company: "Stone Corp.",
      views: 14,
      career: "10년 경력",
      isNew: false,
    },
    {
      name: "이서연",
      dept: "마케팅팀 · 대리",
      init: "이",
      score: 82,
      color: "bg-emerald-500",
      desc: "메타·구글 통합 퍼포먼스 운영, ROAS 340% 달성. 데이터 기반 의사결정 역량 우수.",
      tags: ["Meta Ads", "Google Ads", "데이터분석", "대리급"],
      company: "Stone Corp.",
      views: 21,
      career: "4년 경력",
      isNew: true,
    },
    {
      name: "박지호",
      dept: "영업팀 · 사원",
      init: "박",
      score: 71,
      color: "bg-amber-500",
      desc: "SaaS 솔루션 B2B 영업. 분기 목표 110% 달성. 고객사 관계 관리 능력 검증.",
      tags: ["B2B", "SaaS", "CRM", "사원급"],
      company: "Stone Corp.",
      views: 9,
      career: "2년 경력",
      isNew: false,
    },
    {
      name: "김도현",
      dept: "디자인팀 · 과장",
      init: "김",
      score: 88,
      color: "bg-purple-500",
      desc: "핀테크·커머스 앱 UX 설계 전문. Figma 시스템 구축 경험. 사용자 리서치 역량.",
      tags: ["Figma", "UX Research", "Design System", "과장급"],
      company: "테크플로우(주)",
      views: 33,
      career: "6년 경력",
      isNew: false,
    },
    {
      name: "최유진",
      dept: "전략팀 · 대리",
      init: "최",
      score: 79,
      color: "bg-blue-500",
      desc: "Python·SQL 기반 데이터 파이프라인 구축. KPI 대시보드 설계 및 인사이트 보고 경험.",
      tags: ["Python", "SQL", "Tableau", "대리급"],
      company: "인사이트코퍼레이션",
      views: 17,
      career: "3년 경력",
      isNew: true,
    },
    {
      name: "정다인",
      dept: "HR팀 · 과장",
      init: "정",
      score: 84,
      color: "bg-red-500",
      desc: "조직 문화 설계, 채용 프로세스 정비, 성과 평가 체계 구축 경험. 스타트업~중견기업 경험.",
      tags: ["채용", "조직문화", "성과관리", "과장급"],
      company: "그로스벤처(주)",
      views: 28,
      career: "7년 경력",
      isNew: true,
    },
  ];

  return (
    /* 레이아웃 셸의 아웃렛 통로를 타고 꽂히는 구조이므로, 
       고정 사이드바 구역을 생략하고 주 서브 대시보드 스크롤 컨테이너만 선언합니다.
    */
    <main className="flex-1 md:pl-[260px] flex flex-col min-h-screen">
      {/* 상단 툴바 헤더 */}
      <header className="h-[68px] bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-baseline gap-3 text-left">
          <h1 className="text-base font-black tracking-tight text-[#1A1A2E]">
            Referral
          </h1>
          <span className="text-xs text-gray-400 font-semibold">
            2026년 5월 9일 금요일
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-bold text-[#4B5563] bg-white hover:bg-gray-50 active:scale-95 transition-all shadow-sm">
            동의 링크 발송
          </button>
          <button className="px-4 py-2 bg-[#5B50E8] text-white rounded-xl text-xs font-bold shadow-md shadow-[#5B50E8]/10 hover:bg-[#493fd1] active:scale-95 transition-all flex items-center gap-1.5">
            <i className="ti ti-user-plus text-sm" />
            인재 게시하기
          </button>
        </div>
      </header>

      {/* 내부 데이터 패널 대시보드 본체 */}
      <div className="p-6 space-y-6 max-w-[1250px] w-full mx-auto flex-1">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "내가 게시한 인재",
              value: "12",
              desc: "수익 활성화 상태",
              icon: "ti-award text-[#5B50E8]",
            },
            {
              label: "스카웃 요청 수신",
              value: "5",
              desc: "검토 대기 중인 제안",
              icon: "ti-mail-opened text-emerald-500",
            },
            {
              label: "이번 달 수익 (P)",
              value: "105K",
              desc: "현금 출산 가능 잔액",
              icon: "ti-coin text-amber-500",
            },
            {
              label: "전체 게시 인재 수",
              value: "248",
              desc: "플랫폼 누적 인재",
              icon: "ti-database text-purple-500",
            },
          ].map((kpi, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex justify-between items-center text-left"
            >
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  {kpi.label}
                </span>
                <div className="text-2xl font-black text-[#1A1A2E] mt-1">
                  {kpi.value}
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5 block">
                  {kpi.desc}
                </span>
              </div>
              <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-lg">
                <i className={kpi.icon} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm space-y-4">
              <div className="flex border-b border-gray-100 gap-6 text-xs font-bold">
                {[
                  { key: "전체 게시판", count: 248 },
                  { key: "우리 회사 게시", count: 12 },
                  { key: "저장한 인재", count: 7 },
                  { key: "스카웃 요청", count: 5 },
                ].map((sub) => (
                  <button
                    key={sub.key}
                    type="button"
                    onClick={() => setActiveSubTab(sub.key)}
                    className={`pb-3 relative transition-all active:scale-98 ${
                      activeSubTab === sub.key
                        ? "text-[#5B50E8]"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {sub.key}{" "}
                    <span
                      className={`text-[10px] font-mono ml-0.5 px-1.5 py-0.5 rounded-full ${activeSubTab === sub.key ? "bg-[#5B50E8]/10 text-[#5B50E8]" : "bg-gray-100 text-gray-400"}`}
                    >
                      {sub.count}
                    </span>
                    {activeSubTab === sub.key && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B50E8]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <i className="ti ti-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="직무, 스킬, 경력으로 검색..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#5B50E8] transition-all placeholder:text-gray-300"
                  />
                </div>

                <div className="flex gap-1 bg-gray-50 border border-gray-100 rounded-xl p-1 text-[11px] font-bold overflow-x-auto whitespace-nowrap">
                  {["전체 직군", "개발", "마케팅", "디자인", "영업"].map(
                    (job) => (
                      <button
                        key={job}
                        type="button"
                        onClick={() => setSelectedJob(job)}
                        className={`px-3 py-1.5 rounded-lg transition-all active:scale-95 ${
                          selectedJob === job
                            ? "bg-white text-[#5B50E8] shadow-xs"
                            : "text-gray-400"
                        }`}
                      >
                        {job}
                      </button>
                    ),
                  )}
                </div>

                <select className="px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 outline-none bg-white">
                  <option>최신순</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {talentList.map((talent, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative group text-left"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 ${talent.color} text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-inner`}
                        >
                          {talent.init}
                        </div>
                        <div>
                          <div className="text-xs font-black text-[#1A1A2E] flex items-center gap-1.5">
                            {talent.name}
                            {talent.isNew && (
                              <span className="px-1.5 py-0.5 bg-red-500 text-white rounded text-[8px] font-black uppercase tracking-wider scale-90">
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            {talent.dept}
                          </p>
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-500 text-[9px] font-bold rounded-md mt-1 scale-95 origin-left">
                            <span className="w-1 h-1 rounded-full bg-current" />
                            검증완료
                          </span>
                        </div>
                      </div>

                      <div className="w-12 h-12 rounded-full border-2 border-[#5B50E8] flex flex-col items-center justify-center shadow-xs">
                        <span className="font-bebas text-lg font-black text-[#5B50E8] leading-none">
                          {talent.score}
                        </span>
                        <span className="text-[7px] text-gray-400 font-bold tracking-tighter mt-0.5">
                          HR점수
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#4B5563] leading-relaxed mb-4 h-9 overflow-hidden text-ellipsis line-clamp-2">
                      {talent.desc}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-5">
                      {talent.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded text-[10px] font-semibold text-gray-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400 font-semibold">
                    <div>
                      <span className="text-[#1A1A2E] font-bold">
                        {talent.company}
                      </span>
                      <span className="mx-1.5">·</span>
                      <span>{talent.views}회 조회</span>
                      <span className="mx-1.5">·</span>
                      <span className="text-gray-500 font-bold">
                        {talent.career}
                      </span>
                    </div>

                    <div className="flex gap-1">
                      <button
                        type="button"
                        className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 text-gray-500 rounded-lg font-bold hover:bg-gray-100 active:scale-95 transition-all"
                      >
                        상세
                      </button>
                      <button
                        type="button"
                        className="px-2.5 py-1.5 bg-[#5B50E8] text-white rounded-lg font-bold shadow-sm shadow-[#5B50E8]/10 hover:bg-[#493fd1] active:scale-95 transition-all"
                      >
                        스카웃
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-[#1A1A2E]">
                  스카웃 요청 현황
                </h3>
                <span className="text-[10px] font-bold text-[#5B50E8] cursor-pointer hover:underline">
                  모두 보기
                </span>
              </div>

              <div className="space-y-3.5">
                {[
                  {
                    company: "테크스타트업(주)",
                    target: "강태양 · 개발팀 부장",
                    label: "직원 응답 대기",
                    color:
                      "bg-amber-50 text-amber-500 border border-amber-200/50",
                    time: "3시간 전",
                  },
                  {
                    company: "그로스벤처(주)",
                    target: "박지호 · 영업팀 사원",
                    label: "링크 발송됨",
                    color: "bg-blue-50 text-blue-500 border border-blue-200/50",
                    time: "1일 전",
                  },
                  {
                    company: "인사이트코퍼레이션",
                    target: "이서연 · 마케팅팀 대리",
                    label: "직원 수락",
                    color:
                      "bg-emerald-50 text-emerald-500 border border-emerald-200/50",
                    time: "3일 전",
                  },
                ].map((req, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-start text-xs border-b border-gray-50 pb-3.5 last:border-none last:pb-0"
                  >
                    <div>
                      <div className="font-black text-[#1A1A2E]">
                        {req.company}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        ➔ {req.target}
                      </p>
                      <span
                        className={`inline-block mt-1.5 px-2 py-0.5 rounded text-[9px] font-bold ${req.color}`}
                      >
                        {req.label}
                      </span>
                    </div>
                    <span className="text-[9px] text-gray-400 font-medium shrink-0">
                      {req.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left">
              <h3 className="text-xs font-black text-[#1A1A2E] mb-4">
                게시 프로세스
              </h3>
              <div className="space-y-5 relative before:absolute before:bottom-2 before:top-2 before:left-[11px] before:w-[1px] before:bg-gray-100">
                {[
                  {
                    step: 1,
                    title: "직원 동의 취득",
                    desc: "동의 링크 발송 ➔ 직원이 게시 수락",
                  },
                  {
                    step: 2,
                    title: "인재 게시하기",
                    desc: "직무 태그, 경력 요약, HR 점수 공개 여부 설정",
                  },
                  {
                    step: 3,
                    title: "스카웃 요청 수신",
                    desc: "타사 스카웃 요청 ➔ 직원에게 알림 전달",
                  },
                  {
                    step: 4,
                    title: "포인트 적립",
                    desc: "열람 1건당 50,000P 자동 적립",
                  },
                ].map((proc) => (
                  <div
                    key={proc.step}
                    className="flex gap-3 relative z-10 items-start"
                  >
                    <div className="w-5 h-5 bg-[#EEF0FF] text-[#5B50E8] rounded-md flex items-center justify-center text-[10px] font-black shrink-0">
                      {proc.step}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-[#1A1A2E]">
                        {proc.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                        {proc.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-[22px] p-5 shadow-sm text-left">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-[#1A1A2E]">
                  우리 회사 최근 게시
                </h3>
                <span className="text-[10px] text-gray-400 font-bold cursor-pointer hover:underline">
                  더보기
                </span>
              </div>
              <div className="space-y-3">
                {[
                  {
                    name: "강태양",
                    role: "개발팀 부장",
                    date: "게시 2025.12.01",
                    status: "조회 14회",
                    sub: "스카웃 1건",
                  },
                  {
                    name: "박지호",
                    role: "영업팀 사원",
                    date: "게시 2026.01.15",
                    status: "조회 9회",
                    sub: "스카웃 2건",
                  },
                  {
                    name: "이서연",
                    role: "마케팅팀 대리",
                    date: "게시 2026.02.20",
                    status: "조회 21회",
                    sub: "수락 완료",
                  },
                ].map((post, i) => (
                  <div
                    key={i}
                    className="p-3 bg-gray-50 rounded-xl space-y-1 text-xs"
                  >
                    <div className="flex justify-between items-baseline">
                      <span className="font-black text-[#1A1A2E]">
                        {post.name}{" "}
                        <span className="text-[10px] font-normal text-gray-400 ml-0.5">
                          {post.role}
                        </span>
                      </span>
                      <span className="text-[9px] text-gray-400 font-medium">
                        {post.date}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 font-semibold pt-1">
                      <span>{post.status}</span>
                      <span className="text-[#5B50E8] font-bold">
                        {post.sub}
                      </span>
                    </div>
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

export default ReferralPage;
