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
    <main className="flex min-h-screen flex-1 flex-col">
      {/* 상단 툴바 헤더 */}
      <header className="sticky top-0 z-40 flex h-17 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div className="flex items-baseline gap-3 text-left">
          <h1 className="text-text1 text-base font-black tracking-tight">
            Referral
          </h1>
          <span className="text-xs font-semibold text-gray-400">
            2026년 5월 9일 금요일
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-text2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold shadow-sm transition-all hover:bg-gray-50 active:scale-95">
            동의 링크 발송
          </button>
          <button className="bg-brand shadow-brand/10 hover:bg-brand-dark flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-md transition-all active:scale-95">
            <i className="ti ti-user-plus text-sm" />
            인재 게시하기
          </button>
        </div>
      </header>

      {/* 내부 데이터 패널 대시보드 본체 */}
      <div className="mx-auto w-full max-w-[1250px] flex-1 space-y-6 p-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              label: "내가 게시한 인재",
              value: "12",
              desc: "수익 활성화 상태",
              icon: "ti-award text-brand",
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
              className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm"
            >
              <div>
                <span className="text-2xs block font-bold tracking-wider text-gray-400 uppercase">
                  {kpi.label}
                </span>
                <div className="text-text1 mt-1 text-2xl font-black">
                  {kpi.value}
                </div>
                <span className="text-2xs mt-0.5 block text-gray-400">
                  {kpi.desc}
                </span>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-lg">
                <i className={kpi.icon} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex gap-6 border-b border-gray-100 text-xs font-bold">
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
                    className={`relative pb-3 transition-all active:scale-98 ${
                      activeSubTab === sub.key
                        ? "text-brand"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {sub.key}{" "}
                    <span
                      className={`text-2xs ml-0.5 rounded-full px-1.5 py-0.5 tabular-nums ${activeSubTab === sub.key ? "bg-brand/10 text-brand" : "bg-gray-100 text-gray-400"}`}
                    >
                      {sub.count}
                    </span>
                    {activeSubTab === sub.key && (
                      <span className="bg-brand absolute right-0 bottom-0 left-0 h-0.5" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <i className="ti ti-search absolute top-1/2 left-4 -translate-y-1/2 text-sm text-gray-400" />
                  <input
                    type="text"
                    placeholder="직무, 스킬, 경력으로 검색..."
                    className="focus:border-brand w-full rounded-xl border border-gray-200 py-2 pr-4 pl-10 text-xs transition-all outline-none placeholder:text-gray-300"
                  />
                </div>

                <div className="text-2xs flex gap-1 overflow-x-auto rounded-xl border border-gray-100 bg-gray-50 p-1 font-bold whitespace-nowrap">
                  {["전체 직군", "개발", "마케팅", "디자인", "영업"].map(
                    (job) => (
                      <button
                        key={job}
                        type="button"
                        onClick={() => setSelectedJob(job)}
                        className={`rounded-lg px-3 py-1.5 transition-all active:scale-95 ${
                          selectedJob === job
                            ? "text-brand bg-white shadow-xs"
                            : "text-gray-400"
                        }`}
                      >
                        {job}
                      </button>
                    ),
                  )}
                </div>

                <select className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-500 outline-none">
                  <option>최신순</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {talentList.map((talent, i) => (
                <div
                  key={i}
                  className="group relative flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md"
                >
                  <div>
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 ${talent.color} flex items-center justify-center rounded-xl text-sm font-bold text-white shadow-inner`}
                        >
                          {talent.init}
                        </div>
                        <div>
                          <div className="text-text1 flex items-center gap-1.5 text-xs font-black">
                            {talent.name}
                            {talent.isNew && (
                              <span className="text-3xs scale-90 rounded bg-red-500 px-1.5 py-0.5 font-black tracking-wider text-white uppercase">
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-2xs mt-0.5 text-gray-400">
                            {talent.dept}
                          </p>
                          <span className="text-3xs mt-1 inline-flex origin-left scale-95 items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 font-bold text-emerald-500">
                            <span className="h-1 w-1 rounded-full bg-current" />
                            검증완료
                          </span>
                        </div>
                      </div>

                      <div className="border-brand flex h-12 w-12 flex-col items-center justify-center rounded-full border-2 shadow-xs">
                        <span className="text-brand text-lg leading-none font-black">
                          {talent.score}
                        </span>
                        <span className="text-3xs mt-0.5 font-bold tracking-tighter text-gray-400">
                          HR점수
                        </span>
                      </div>
                    </div>

                    <p className="text-text2 text-2xs mb-4 line-clamp-2 h-9 overflow-hidden leading-relaxed text-ellipsis">
                      {talent.desc}
                    </p>

                    <div className="mb-5 flex flex-wrap gap-1">
                      {talent.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-2xs rounded border border-gray-100 bg-gray-50 px-2 py-0.5 font-semibold text-gray-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-2xs flex items-center justify-between border-t border-gray-50 pt-3 font-semibold text-gray-400">
                    <div>
                      <span className="text-text1 font-bold">
                        {talent.company}
                      </span>
                      <span className="mx-1.5">·</span>
                      <span>{talent.views}회 조회</span>
                      <span className="mx-1.5">·</span>
                      <span className="font-bold text-gray-500">
                        {talent.career}
                      </span>
                    </div>

                    <div className="flex gap-1">
                      <button
                        type="button"
                        className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 font-bold text-gray-500 transition-all hover:bg-gray-100 active:scale-95"
                      >
                        상세
                      </button>
                      <button
                        type="button"
                        className="bg-brand shadow-brand/10 hover:bg-brand-dark rounded-lg px-2.5 py-1.5 font-bold text-white shadow-sm transition-all active:scale-95"
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
            <div className="rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-text1 text-xs font-black">
                  스카웃 요청 현황
                </h3>
                <span className="text-brand text-2xs cursor-pointer font-bold hover:underline">
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
                    className="flex items-start justify-between border-b border-gray-50 pb-3.5 text-xs last:border-none last:pb-0"
                  >
                    <div>
                      <div className="text-text1 font-black">{req.company}</div>
                      <p className="text-2xs mt-0.5 text-gray-400">
                        ➔ {req.target}
                      </p>
                      <span
                        className={`text-3xs mt-1.5 inline-block rounded px-2 py-0.5 font-bold ${req.color}`}
                      >
                        {req.label}
                      </span>
                    </div>
                    <span className="text-3xs shrink-0 font-medium text-gray-400">
                      {req.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
              <h3 className="text-text1 mb-4 text-xs font-black">
                게시 프로세스
              </h3>
              <div className="relative space-y-5 before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-[1px] before:bg-gray-100">
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
                    className="relative z-10 flex items-start gap-3"
                  >
                    <div className="bg-brand-light text-brand text-2xs flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-black">
                      {proc.step}
                    </div>
                    <div>
                      <h4 className="text-text1 text-xs font-black">
                        {proc.title}
                      </h4>
                      <p className="text-2xs mt-0.5 leading-relaxed text-gray-400">
                        {proc.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-text1 text-xs font-black">
                  우리 회사 최근 게시
                </h3>
                <span className="text-2xs cursor-pointer font-bold text-gray-400 hover:underline">
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
                    className="space-y-1 rounded-xl bg-gray-50 p-3 text-xs"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-text1 font-black">
                        {post.name}{" "}
                        <span className="text-2xs ml-0.5 font-normal text-gray-400">
                          {post.role}
                        </span>
                      </span>
                      <span className="text-3xs font-medium text-gray-400">
                        {post.date}
                      </span>
                    </div>
                    <div className="text-2xs flex justify-between pt-1 font-semibold text-gray-400">
                      <span>{post.status}</span>
                      <span className="text-brand font-bold">{post.sub}</span>
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
