import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [animateChart, setAnimateChart] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<
    "starter" | "business" | "enterprise"
  >("business");

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");

            if (
              entry.target.id === "features-section" ||
              entry.target.id === "score-demo"
            ) {
              setAnimateChart(true);
            }
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="font-sans text-text1 bg-white overflow-x-hidden selection:bg-brand/20">
      {/* ─── 1. NAVIGATION ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-200 px-8 md:px-16 h-17 flex items-center transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm"
            : "bg-transparent border-transparent"
        }`}
      >
        <div
          className="flex items-center gap-2.5 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-9 h-9 bg-linear-to-br from-brand to-brand2 rounded-xl flex items-center justify-center shadow-lg shadow-brand/30 group-hover:rotate-[-8deg] group-hover:scale-110 transition-transform">
            <i className="ti ti-shield-check text-white text-xl"></i>
          </div>
          <span className="font-black text-[22px] text-text1">
            GeniCheck
          </span>
        </div>
        <div className="hidden md:flex gap-9 ml-14">
          {["서비스 소개", "주요 기능", "요금제"].map((item) => (
            <a
              key={item}
              href={`#${item === "요금제" ? "pricing-section" : item === "주요 기능" ? "features-section" : "how"}`}
              className="text-sm font-bold text-text2 hover:text-brand relative pb-1 group transition-colors"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>
        <div className="ml-auto flex gap-2.5 items-center">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-lg text-sm font-bold border border-gray-200 hover:border-brand hover:text-brand transition-all"
          >
            로그인
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2.5 rounded-lg text-sm font-bold bg-brand text-white shadow-lg hover:-translate-y-0.5 transition-all"
          >
            무료로 시작하기
          </button>
        </div>
      </nav>

      {/* ─── 2. HERO SECTION ─── */}
      <section className="relative min-h-screen pt-32 pb-20 px-8 flex flex-col items-center text-center overflow-hidden bg-surface">
        {/* 메인 타이틀 단색 보라색화 적용 완료 */}
        <h1 className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-300 font-black text-[clamp(32px,5vw,56px)] leading-[1.32] tracking-tight mb-6">
          <span className="block text-text1">직원의 진짜 실력,</span>
          <span className="block text-brand">데이터로 증명한다</span>
        </h1>

        <p className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-400 max-w-145 text-text2 text-lg leading-relaxed mb-12">
          입사부터 퇴사까지. 직원 스스로 선언하고, 대표가 검증하고, AI가
          분석합니다.
          <br />
          <span className="font-bold text-brand">GeniCheck</span>는 채용
          불안을 끝내는 HR 신용 인프라입니다.
        </p>

        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-500 flex flex-wrap justify-center gap-4 mb-20 z-10">
          <button
            onClick={() => navigate("/signup")}
            className="px-10 py-4 bg-brand text-white rounded-xl font-bold shadow-xl shadow-brand/20 hover:scale-105 transition-all"
          >
            기업 회원가입 — 무료 체험
          </button>
          <button
            onClick={() => navigate("/main")}
            className="px-10 py-4 bg-white border border-gray-200 text-text1 rounded-xl font-bold hover:border-brand hover:text-brand active:scale-98 transition-all shadow-sm"
          >
            대시보드 미리보기
          </button>
        </div>

        {/* DASHBOARD MOCKUP */}
        <div className="reveal opacity-0 translate-y-16 transition-all duration-1000 delay-600 w-full max-w-225 relative">
          <div className="bg-white/80 backdrop-blur-md border border-brand/10 rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-10 bg-surface border-b border-gray-100 flex items-center px-5 gap-1.5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
              </div>
              <div className="flex-1 max-w-100 h-6 bg-white border border-gray-200 rounded-md mx-auto flex items-center justify-center text-2xs text-text3 tabular-nums">
                app.genicheck.io/dashboard
              </div>
            </div>
            <div className="p-6 grid grid-cols-4 gap-4 text-left">
              {[
                {
                  title: "재직 직원",
                  val: "48",
                  sub: "↑ 3명 입사",
                  color: "text-brand",
                },
                {
                  title: "선언 완료율",
                  val: "85%",
                  sub: "41/48명",
                  color: "text-accent2",
                },
                {
                  title: "검증 대기",
                  val: "3",
                  sub: "⏱ 골든타임",
                  color: "text-accent",
                },
                {
                  title: "보유 포인트",
                  val: "245K",
                  sub: "+105K 이번달",
                  color: "text-blue-500",
                },
              ].map((kpi, i) => (
                <div
                  key={i}
                  className="bg-white p-4 border border-gray-100 rounded-xl shadow-sm"
                >
                  <div className="text-2xs text-text3 mb-1 uppercase font-bold tracking-wider">
                    {kpi.title}
                  </div>
                  <div
                    className={`text-2xl font-black ${kpi.color} tracking-tighter`}
                  >
                    {kpi.val}
                  </div>
                  <div className="text-2xs text-text3">{kpi.sub}</div>
                </div>
              ))}
              <div className="col-span-4 h-32 bg-surface/50 rounded-xl border border-dashed border-gray-200 flex items-end justify-between p-4 gap-2">
                {[40, 70, 45, 80, 55, 90, 60, 75, 45, 85, 50, 95].map(
                  (h, i) => (
                    <div
                      key={i}
                      className={`w-full rounded-t-sm transition-all duration-1000 ${i % 2 === 0 ? "bg-brand/10" : "bg-brand"}`}
                      style={{ height: `${h}%` }}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. TRUST BAR ─── */}
      <div className="reveal opacity-0 translate-y-8 transition-all duration-700 bg-brand py-8 text-white/90 font-bold text-sm tracking-wide">
        <div className="max-w-6xl mx-auto px-8 flex flex-wrap justify-between items-center gap-4">
          {[
            "법적 동의 기반",
            "암호화 보관",
            "명예훼손 방지",
            "포인트 현금화",
            "AI 역량 분석",
          ].map((text) => (
            <div key={text} className="flex items-center gap-2.5">
              <i className="ti ti-circle-check text-lg opacity-70" />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* ─── 4. HOW IT WORKS SECTION ─── */}
      <section id="how" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 mb-16 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4">
              <i className="ti ti-route text-brand text-xs"></i>
              <span className="text-2xs font-bold text-brand uppercase tracking-widest">
                How It Works
              </span>
            </div>
            <h2 className="text-[34px] md:text-[42px] font-black text-text1 leading-tight mb-4 tracking-tight">
              어떻게 작동하나요?
            </h2>
            <p className="text-text2 text-lg leading-relaxed lg:whitespace-nowrap">
              입사부터 퇴사까지, GeniCheck는 직원의 커리어 전 주기를 HR 데이터로
              기록합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                icon: "ti-forms",
                title: "입사 — 자기 선언",
                desc: "신규 직원이 입사 시 역량을 스스로 선언합니다. 스킬·경험·업무 스타일을 구체적으로 기술합니다.",
                bg: "bg-brand-light",
                color: "text-brand",
              },
              {
                num: "02",
                icon: "ti-shield-check",
                title: "퇴사 — 대표 검증",
                desc: "퇴사 시 대표가 선언 내용을 항목별로 검증합니다. 15일 골든타임 안에 점수가 산출됩니다.",
                bg: "bg-accent2-light",
                color: "text-accent2",
              },
              {
                num: "03",
                icon: "ti-brain",
                title: "채용 — 타사 열람",
                desc: "타 기업이 HR 신용점수를 열람하고 스카웃 요청을 보냅니다. 포인트가 자동 적립됩니다.",
                bg: "bg-accent-light",
                color: "text-accent",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="reveal opacity-0 translate-y-8 transition-all duration-700 group bg-white border border-gray-200 rounded-3xl p-10 relative overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="absolute right-6 top-0 font-black text-[100px] text-gray-100 leading-none select-none opacity-20">
                  {step.num}
                </div>
                <div
                  className={`w-14 h-14 ${step.bg} rounded-2xl flex items-center justify-center mb-8 ${step.color} text-2xl group-hover:scale-110 transition-transform`}
                >
                  <i className={`ti ${step.icon}`}></i>
                </div>
                <div className="text-xl font-bold text-text1 mb-4">
                  {step.title}
                </div>
                <p className="text-text2 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. FEATURES SECTION ─── */}
      <section id="features-section" className="py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-8">
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 mb-16 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4">
              <i className="ti ti-sparkles text-brand text-xs"></i>
              <span className="text-2xs font-bold text-brand uppercase tracking-widest">
                Features
              </span>
            </div>
            <h2 className="text-[34px] md:text-[42px] font-black text-text1 text-left leading-tight mb-4 tracking-tight">
              핵심 기능
            </h2>
            <p className="text-text2 text-lg text-left leading-relaxed lg:whitespace-nowrap">
              단순한 인사 도구가 아닙니다. HR 데이터 인프라로서 채용의 불확실성을
              구조적으로 제거합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="reveal opacity-0 translate-y-8 transition-all duration-700 col-span-1 md:col-span-2 bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md flex flex-col md:flex-row gap-10 items-center justify-between overflow-hidden">
              <div className="flex-1 text-left">
                <div className="w-12 h-12 bg-brand-light text-brand rounded-xl flex items-center justify-center text-xl mb-6">
                  <i className="ti ti-chart-arrows-vertical"></i>
                </div>
                <div className="text-2xl font-bold text-text1 mb-4">
                  선언 vs 검증 대조 분석
                </div>
                <p className="text-text2 text-[15px] leading-relaxed mb-6 max-w-xl">
                  직원이 선언한 역량과 대표의 검증 점수를 항목별로 비교합니다.
                  GAP이 작을수록 자기 인식이 정확한 인재입니다. 채용 시 가장
                  중요한 판단 지표입니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["GAP 자동 계산", "일관성 점수", "AI 리포트"].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-light rounded-full text-xs font-bold text-brand"
                    >
                      <i className="ti ti-check text-2xs"></i>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                id="score-demo"
                className="w-full md:w-[320px] bg-surface border border-gray-200 rounded-2xl p-6 text-left shadow-inner"
              >
                <div className="text-2xs font-bold text-text3 uppercase tracking-wider mb-5">
                  HR 신용점수 분석 예시
                </div>
                <div className="space-y-4">
                  {[
                    {
                      name: "기술 역량",
                      val: 7,
                      targetW: "70%",
                      color: "from-indigo-400 to-brand",
                      textColor: "text-brand",
                    },
                    {
                      name: "리더십",
                      val: 8,
                      targetW: "80%",
                      color: "from-emerald-400 to-accent2",
                      textColor: "text-accent2",
                    },
                    {
                      name: "납기 준수",
                      val: 9,
                      targetW: "90%",
                      color: "from-amber-400 to-accent",
                      textColor: "text-accent",
                    },
                    {
                      name: "커뮤니케이션",
                      val: 6,
                      targetW: "60%",
                      color: "from-blue-400 to-blue-500",
                      textColor: "text-blue-500",
                    },
                  ].map((row, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="text-2xs font-semibold text-text2 w-16 shrink-0">
                        {row.name}
                      </div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-linear-to-r ${row.color} transition-all duration-1200 ease-out`}
                          style={{ width: animateChart ? row.targetW : "0%" }}
                        />
                      </div>
                      <div
                        className={`text-xs font-black w-4 text-right ${row.textColor}`}
                      >
                        {row.val}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-baseline">
                  <span className="text-2xs text-text3">
                    HR 신용점수
                  </span>
                  <span className="font-black text-[44px] leading-none tracking-tighter text-brand">
                    76
                  </span>
                </div>
              </div>
            </div>

            <div className="reveal opacity-0 translate-y-8 transition-all duration-700 bg-white border border-gray-200 rounded-3xl p-6 flex gap-5 items-start text-left shadow-sm hover:shadow-md">
              <div className="w-11 h-11 rounded-xl bg-brand-light text-brand flex items-center justify-center text-lg shrink-0">
                <i className="ti ti-clock-hour-4"></i>
              </div>
              <div>
                <h4 className="text-base font-bold text-text1 mb-2">
                  15일 골든타임
                </h4>
                <p className="text-text2 text-sm leading-relaxed">
                  퇴사일로부터 15일 이내에만 검증 점수를 입력할 수 있습니다.
                  타이머 알림으로 기한을 놓치지 않게 도와줍니다.
                </p>
              </div>
            </div>

            <div className="reveal opacity-0 translate-y-8 transition-all duration-700 bg-white border border-gray-200 rounded-3xl p-6 flex gap-5 items-start text-left shadow-sm hover:shadow-md">
              <div className="w-11 h-11 rounded-xl bg-accent2-light text-accent2 flex items-center justify-center text-lg shrink-0">
                <i className="ti ti-users-group"></i>
              </div>
              <div>
                <h4 className="text-base font-bold text-text1 mb-2">
                  인재 추천 게시판
                </h4>
                <p className="text-text2 text-sm leading-relaxed">
                  검증된 퇴사 직원을 타 기업에 추천할 수 있습니다. 직원 동의 후
                  게시, 스카웃 성사 시 포인트 적립.
                </p>
              </div>
            </div>

            <div className="reveal opacity-0 translate-y-8 transition-all duration-700 bg-white border border-gray-200 rounded-3xl p-6 flex gap-5 items-start text-left shadow-sm hover:shadow-md">
              <div className="w-11 h-11 rounded-xl bg-accent-light text-accent flex items-center justify-center text-lg shrink-0">
                <i className="ti ti-coin"></i>
              </div>
              <div>
                <h4 className="text-base font-bold text-text1 mb-2">
                  포인트 현금화
                </h4>
                <p className="text-text2 text-sm leading-relaxed">
                  타사가 내 직원 데이터를 열람할 때마다 포인트가 자동
                  적립됩니다. 언제든 현금 인출 가능.
                </p>
              </div>
            </div>

            <div className="reveal opacity-0 translate-y-8 transition-all duration-700 bg-white border border-gray-200 rounded-3xl p-6 flex gap-5 items-start text-left shadow-sm hover:shadow-md">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-lg shrink-0">
                <i className="ti ti-shield-lock"></i>
              </div>
              <div>
                <h4 className="text-base font-bold text-text1 mb-2">
                  법적 보호 설계
                </h4>
                <p className="text-text2 text-sm leading-relaxed">
                  사전 동의 취득, 재고용 사유 입력 금지, 이의제기 중재
                  시스템으로 명예훼손 위험을 원천 차단.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. PRICING SECTION (★ 수직 출렁임 제로 + 배지 정중앙 픽스 스펙) ─── */}
      <section
        id="pricing-section"
        className="py-24 bg-white border-t border-gray-100"
      >
        <div className="max-w-6xl mx-auto px-8">
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 mb-20 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4">
              <i className="ti ti-tag text-brand text-xs"></i>
              <span className="text-2xs font-bold text-brand uppercase tracking-widest">
                Pricing
              </span>
            </div>
            <h2 className="text-[34px] md:text-[42px] font-black text-text1 leading-tight mb-4 tracking-tight">
              투명한 요금제
            </h2>
            <p className="text-text2 text-lg leading-relaxed lg:whitespace-nowrap">
              규모에 맞는 플랜을 선택하세요. 모든 플랜은 30일 무료로 시작할 수
              있습니다.
            </p>
          </div>

          {/* ★ 중요 보정 구역 1: items-center 속성을 부여하여 카드가 확대될 때 위아래로 대칭 확장되게 고정 (밑으로 안 쳐짐) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center">
            {/* 1. Starter 플랜 카드 */}
            <div
              onClick={() => setSelectedPlan("starter")}
              className={`reveal opacity-0 translate-y-8 rounded-3xl p-8 flex flex-col cursor-pointer bg-white border transition-all duration-300 relative ${
                selectedPlan === "starter"
                  ? "border-brand ring-4 ring-brand/30 shadow-xl scale-[1.04] z-20 opacity-100"
                  : "border-gray-200 shadow-sm hover:border-gray-300 opacity-60 scale-100"
              }`}
              style={{ minHeight: "530px" }} // 고정 최소 높이 설정으로 균형 락업
            >
              <div className="text-left mb-6">
                <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">
                  Starter
                </div>
                <div
                  className={`font-black text-[48px] leading-none ${selectedPlan === "starter" ? "text-brand" : "text-text1"}`}
                >
                  ₩390K
                </div>
                <div className="text-xs text-text3 mt-2">
                  / 월 · 최대 10명
                </div>
              </div>
              <div className="w-full h-px bg-gray-100 my-4" />
              <ul className="space-y-4 text-left flex-1 mb-8">
                {[
                  { text: "직원 10명까지", check: true },
                  { text: "자기선언 질문 설계", check: true },
                  { text: "검증 점수 입력", check: true },
                  { text: "기본 HR 리포트", check: true },
                  { text: "AI 분석 리포트", check: false },
                  { text: "인재 추천 게시판", check: false },
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className={`flex items-center gap-3 text-sm ${item.check ? "text-text2" : "text-text3 opacity-40"}`}
                  >
                    <i
                      className={`ti ${item.check ? "ti-check text-accent2" : "ti-x text-gray-300"} text-base shrink-0 font-bold`}
                    />
                    {item.text}
                  </li>
                ))}
              </ul>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/signup");
                }}
                className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all ${
                  selectedPlan === "starter"
                    ? "bg-brand text-white shadow-md shadow-brand/10"
                    : "border border-gray-200 text-text1 bg-white hover:bg-gray-50"
                }`}
              >
                무료 체험 시작
              </button>
            </div>

            {/* 2. Business 플랜 카드 */}
            <div
              onClick={() => setSelectedPlan("business")}
              className={`reveal opacity-0 translate-y-8 relative rounded-3xl p-8 flex flex-col cursor-pointer bg-white border transition-all duration-300 ${
                selectedPlan === "business"
                  ? "border-brand ring-4 ring-brand/30 shadow-xl scale-[1.04] z-20 opacity-100"
                  : "border-gray-200 shadow-sm hover:border-gray-300 opacity-60 scale-100"
              }`}
              style={{ minHeight: "530px" }}
            >
              {/* ★ 중요 보정 구역 2: Most Popular 배지를 단색 보라색 배경 + left-1/2 -translate-x-1/2 조합으로 완벽한 정중앙 강제 배치 */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-1.5 bg-brand text-white text-2xs font-black tracking-wider rounded-full shadow-md whitespace-nowrap uppercase">
                Most Popular
              </div>
              <div className="text-left mb-6 mt-2">
                <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">
                  Business
                </div>
                <div
                  className={`font-black text-[48px] leading-none ${selectedPlan === "business" ? "text-brand" : "text-text1"}`}
                >
                  ₩990K
                </div>
                <div className="text-xs text-text3 mt-2">
                  / 월 · 최대 50명
                </div>
              </div>
              <div className="w-full h-px bg-gray-100 my-4" />
              <ul className="space-y-4 text-left flex-1 mb-8">
                {[
                  { text: "직원 50명까지" },
                  { text: "자기선언 질문 설계" },
                  { text: "검증 점수 입력" },
                  { text: "AI 분석 리포트" },
                  { text: "인재 추천 게시판" },
                  { text: "포인트 현금화" },
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm text-text2"
                  >
                    <i className="ti ti-check text-accent2 text-base shrink-0 font-bold" />
                    {item.text}
                  </li>
                ))}
              </ul>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/signup");
                }}
                className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all ${
                  selectedPlan === "business"
                    ? "bg-brand text-white shadow-md shadow-brand/10"
                    : "border border-gray-200 text-text1 bg-white hover:bg-gray-50"
                }`}
              >
                지금 시작하기
              </button>
            </div>

            {/* 3. Enterprise 플랜 카드 */}
            <div
              onClick={() => setSelectedPlan("enterprise")}
              className={`reveal opacity-0 translate-y-8 rounded-3xl p-8 flex flex-col cursor-pointer bg-white border transition-all duration-300 relative ${
                selectedPlan === "enterprise"
                  ? "border-brand ring-4 ring-brand/30 shadow-xl scale-[1.04] z-20 opacity-100"
                  : "border-gray-200 shadow-sm hover:border-gray-300 opacity-60 scale-100"
              }`}
              style={{ minHeight: "530px" }}
            >
              <div className="text-left mb-6">
                <div className="text-xs font-bold text-text3 uppercase tracking-wider mb-3">
                  Enterprise
                </div>
                <div
                  className={`text-[40px] font-black leading-none tracking-tight ${selectedPlan === "enterprise" ? "text-brand" : "text-text1"}`}
                >
                  문의
                </div>
                <div className="text-xs text-text3 mt-2">
                  / 맞춤 계약 · 무제한
                </div>
              </div>
              <div className="w-full h-px bg-gray-100 my-4" />
              <ul className="space-y-4 text-left flex-1 mb-8">
                {[
                  "직원 무제한",
                  "전담 매니저 배정",
                  "커스텀 질문 설계",
                  "API 연동 지원",
                  "SLA 보장",
                  "온프레미스 옵션",
                ].map((text, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm text-text2"
                  >
                    <i className="ti ti-check text-accent2 text-base shrink-0 font-bold" />
                    {text}
                  </li>
                ))}
              </ul>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert("영업팀 문의 창으로 연결됩니다.");
                }}
                className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all ${
                  selectedPlan === "enterprise"
                    ? "bg-brand text-white shadow-md shadow-brand/10"
                    : "border border-gray-200 text-text1 bg-white hover:bg-gray-50"
                }`}
              >
                영업팀 문의
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. CTA SECTION (하단 락업 보라색 단색화 및 가입 버튼 복원 완료) ─── */}
      <section className="relative py-32 px-8 text-center bg-surface border-t border-gray-200 overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* 하단 텍스트 단색 보라색 피드백 반영 */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 font-black text-[clamp(28px,4.5vw,48px)] leading-[1.32] tracking-tight text-text1 mb-6">
            HR 신용 인프라,
            <br />
            <span className="text-brand">지금 시작하세요</span>
          </div>

          <p className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 text-text2 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12">
            채용 불안은 정보 부족에서 옵니다.
            <br />
            GeniCheck로 검증된 HR 데이터 기반의 채용을 시작하세요.
          </p>

          {/* ★ 중요 보정 구역 3: 안 보이던 투명 버튼을 '선명한 보라색 배경 + 흰 글씨' 가시성 스펙으로 완전 전합 */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 flex flex-wrap justify-center gap-4 mb-5">
            <button
              onClick={() => navigate("/signup")}
              className="px-10 py-4 bg-brand text-white rounded-xl font-bold shadow-xl shadow-brand/30 hover:scale-105 active:scale-98 transition-all flex items-center gap-2"
            >
              <i className="ti ti-building-community text-lg" />
              기업 회원가입 — 무료 시작
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-white border border-gray-200 text-text1 rounded-xl font-bold shadow-sm hover:border-brand hover:text-brand active:scale-98 transition-all flex items-center gap-2"
            >
              <i className="ti ti-login text-lg" />
              로그인
            </button>
          </div>

          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-300 text-xs text-text3">
            이미 계정이 있으신가요?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-brand font-bold cursor-pointer hover:underline"
            >
              로그인 →
            </span>
          </div>
        </div>
      </section>

      {/* ─── 8. FOOTER ─── */}
      <footer className="bg-text1 py-12 px-8 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5">
        <div className="font-black text-[22px] tracking-[2px] text-white/70">
          GeniCheck
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
          {["이용약관", "개인정보처리방침", "고객센터", "공지사항"].map(
            (link) => (
              <a
                key={link}
                className="text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                {link}
              </a>
            ),
          )}
        </div>
        <div className="text-xs text-white/25">
          © 2026 GeniCheck Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
