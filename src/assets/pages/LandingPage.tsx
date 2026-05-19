import React, { useEffect, useState } from "react";

const LandingPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [animateChart, setAnimateChart] = useState(false);

  // 현재 선택된 요금제 상태 관리
  const [selectedPlan, setSelectedPlan] = useState<
    "starter" | "business" | "enterprise"
  >("business");

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
    <div className="font-sans text-[#1A1A2E] bg-white overflow-x-hidden selection:bg-[#5B50E8]/20">
      {/* ─── 1. NAVIGATION ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] px-8 md:px-16 h-[68px] flex items-center transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-9 h-9 bg-gradient-to-br from-[#5B50E8] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg shadow-[#5B50E8]/30 group-hover:rotate-[-8deg] group-hover:scale-110 transition-transform">
            <i className="ti ti-shield-check text-white text-xl"></i>
          </div>
          <span className="font-bebas text-[22px] tracking-[2px] text-[#1A1A2E]">
            GeniCheck
          </span>
        </div>
        <div className="hidden md:flex gap-9 ml-14">
          {["서비스 소개", "주요 기능", "요금제"].map((item) => (
            <a
              key={item}
              href={`#${item === "요금제" ? "pricing-section" : item === "주요 기능" ? "features-section" : "how"}`}
              className="text-[13px] font-bold text-[#4B5563] hover:text-[#5B50E8] relative pb-1 group transition-colors"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#5B50E8] group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>
        <div className="ml-auto flex gap-2.5 items-center">
          <button className="px-5 py-2 rounded-lg text-[13px] font-bold border border-gray-200 hover:border-[#5B50E8] hover:text-[#5B50E8] transition-all">
            로그인
          </button>
          <button className="px-5 py-2.5 rounded-lg text-[13px] font-bold bg-[#5B50E8] text-white shadow-lg hover:translate-y-[-2px] transition-all">
            무료로 시작하기
          </button>
        </div>
      </nav>

      {/* ─── 2. HERO SECTION ─── */}
      <section className="relative min-h-screen pt-32 pb-20 px-8 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#5B50E8]/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-[#8B5CF6]/5 blur-[120px] rounded-full animate-pulse delay-700" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(#5B50E8 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 inline-flex items-center gap-2 px-4 py-1.5 bg-[#EEF0FF] border border-[#5B50E8]/20 rounded-full mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-[#5B50E8] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5B50E8]"></span>
          </span>
          <span className="text-[12px] font-bold text-[#5B50E8] tracking-wider uppercase">
            대한민국 최초 HR 신용 평가 플랫폼
          </span>
        </div>

        <h1 className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-300 font-bebas text-[clamp(52px,9vw,110px)] leading-[0.93] tracking-tight mb-6">
          <span className="block text-[#1A1A2E]">직원의 진짜 실력,</span>
          <span className="block bg-gradient-to-r from-[#5B50E8] via-[#8B5CF6] to-[#F59E0B] bg-clip-text text-transparent">
            데이터로 증명한다
          </span>
        </h1>

        <p className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-400 max-w-[580px] text-[#4B5563] text-lg leading-relaxed mb-12">
          입사부터 퇴사까지. 직원 스스로 선언하고, 대표가 검증하고, AI가
          분석합니다.
          <br />
          <span className="font-bold text-[#5B50E8]">GeniCheck</span>는 채용
          불안을 끝내는 HR 신용 인프라입니다.
        </p>

        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-500 flex flex-wrap justify-center gap-4 mb-20 z-10">
          <button className="px-10 py-4 bg-[#5B50E8] text-white rounded-xl font-bold shadow-xl shadow-[#5B50E8]/20 hover:scale-105 transition-all">
            기업 회원가입 — 무료 체험
          </button>
          <button className="px-10 py-4 bg-white border border-gray-200 text-[#1A1A2E] rounded-xl font-bold hover:border-[#5B50E8] transition-all">
            소개 영상 보기
          </button>
        </div>

        {/* DASHBOARD MOCKUP */}
        <div className="reveal opacity-0 translate-y-16 transition-all duration-1000 delay-600 w-full max-w-[900px] relative">
          <div className="bg-white/80 backdrop-blur-md border border-[#5B50E8]/10 rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-10 bg-[#F9FAFB] border-b border-gray-100 flex items-center px-5 gap-1.5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
              </div>
              <div className="flex-1 max-w-[400px] h-6 bg-white border border-gray-200 rounded-md mx-auto flex items-center justify-center text-[10px] text-[#9CA3AF] font-mono">
                app.genicheck.io/dashboard
              </div>
            </div>
            <div className="p-6 grid grid-cols-4 gap-4 text-left">
              {[
                {
                  title: "재직 직원",
                  val: "48",
                  sub: "↑ 3명 입사",
                  color: "text-[#5B50E8]",
                },
                {
                  title: "선언 완료율",
                  val: "85%",
                  sub: "41/48명",
                  color: "text-[#10B981]",
                },
                {
                  title: "검증 대기",
                  val: "3",
                  sub: "⏱ 골든타임",
                  color: "text-[#F59E0B]",
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
                  <div className="text-[10px] text-[#9CA3AF] mb-1 uppercase font-bold tracking-wider">
                    {kpi.title}
                  </div>
                  <div
                    className={`text-2xl font-black ${kpi.color} tracking-tighter`}
                  >
                    {kpi.val}
                  </div>
                  <div className="text-[10px] text-[#9CA3AF]">{kpi.sub}</div>
                </div>
              ))}
              <div className="col-span-4 h-32 bg-[#F9FAFB]/50 rounded-xl border border-dashed border-gray-200 flex items-end justify-between p-4 gap-2">
                {[40, 70, 45, 80, 55, 90, 60, 75, 45, 85, 50, 95].map(
                  (h, i) => (
                    <div
                      key={i}
                      className={`w-full rounded-t-sm transition-all duration-1000 ${i % 2 === 0 ? "bg-[#5B50E8]/10" : "bg-[#5B50E8]"}`}
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
      <div className="reveal opacity-0 translate-y-8 transition-all duration-700 bg-[#5B50E8] py-8 text-white/90 font-bold text-[13px] tracking-wide">
        <div className="max-w-6xl mx-auto px-8 flex flex-wrap justify-between items-center">
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
      <section id="how" className="py-24 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 mb-16 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEF0FF] border border-[#5B50E8]/20 rounded-full mb-4">
              <i className="ti ti-route text-[#5B50E8] text-xs"></i>
              <span className="text-[10px] font-bold text-[#5B50E8] uppercase tracking-widest">
                How It Works
              </span>
            </div>
            <h2 className="text-[44px] md:text-[56px] font-bebas text-[#1A1A2E] leading-tight mb-4 tracking-tight">
              어떻게 작동하나요?
            </h2>
            <p className="text-[#4B5563] text-lg max-w-2xl leading-relaxed">
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
                bg: "bg-[#EEF0FF]",
                color: "text-[#5B50E8]",
              },
              {
                num: "02",
                icon: "ti-shield-check",
                title: "퇴사 — 대표 검증",
                desc: "퇴사 시 대표가 선언 내용을 항목별로 검증합니다. 15일 골든타임 안에 점수가 산출됩니다.",
                bg: "bg-[#ECFDF5]",
                color: "text-[#10B981]",
              },
              {
                num: "03",
                icon: "ti-brain",
                title: "채용 — 타사 열람",
                desc: "타 기업이 HR 신용점수를 열람하고 스카웃 요청을 보냅니다. 포인트가 자동 적립됩니다.",
                bg: "bg-[#FFFBEB]",
                color: "text-[#F59E0B]",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="reveal opacity-0 translate-y-8 transition-all duration-700 group bg-white border border-gray-100 rounded-3xl p-10 relative overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="absolute right-6 top-0 font-bebas text-[100px] text-gray-100 leading-none select-none opacity-20">
                  {step.num}
                </div>
                <div
                  className={`w-14 h-14 ${step.bg} rounded-2xl flex items-center justify-center mb-8 ${step.color} text-2xl group-hover:scale-110 transition-transform`}
                >
                  <i className={`ti ${step.icon}`}></i>
                </div>
                <h3 className="text-xl font-black text-[#1A1A2E] mb-4">
                  {step.title}
                </h3>
                <p className="text-[#4B5563] text-[14px] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. FEATURES SECTION ─── */}
      <section id="features-section" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 mb-16 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEF0FF] border border-[#5B50E8]/20 rounded-full mb-4">
              <i className="ti ti-sparkles text-[#5B50E8] text-xs"></i>
              <span className="text-[10px] font-bold text-[#5B50E8] uppercase tracking-widest">
                Features
              </span>
            </div>
            <h2 className="text-[44px] md:text-[56px] font-bebas text-[#1A1A2E] leading-tight mb-4 tracking-tight">
              핵심 기능
            </h2>
            <p className="text-[#4B5563] text-lg max-w-2xl leading-relaxed">
              단순한 인사 도구가 아닙니다. HR 데이터 인프라로서 채용의
              불확실성을 구조적으로 제거합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="reveal opacity-0 translate-y-8 transition-all duration-700 col-span-1 md:col-span-2 bg-white border border-gray-100 rounded-[24px] p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-10 items-center justify-between overflow-hidden">
              <div className="flex-1 text-left">
                <div className="w-12 h-12 bg-[#EEF0FF] text-[#5B50E8] rounded-xl flex items-center justify-center text-xl mb-6">
                  <i className="ti ti-chart-arrows-vertical"></i>
                </div>
                <h3 className="text-2xl font-black text-[#1A1A2E] mb-4">
                  선언 vs 검증 대조 분석
                </h3>
                <p className="text-[#4B5563] text-[15px] leading-relaxed mb-6 max-w-xl">
                  직원이 선언한 역량과 대표의 검증 점수를 항목별로 비교합니다.
                  GAP이 작을수록 자기 인식이 정확한 인재입니다. 채용 시 가장
                  중요한 판단 지표입니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["GAP 자동 계산", "일관성 점수", "AI 리포트"].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EEF0FF] rounded-full text-xs font-bold text-[#5B50E8]"
                    >
                      <i className="ti ti-check text-[10px]"></i>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                id="score-demo"
                className="w-full md:w-[320px] bg-[#F9FAFB] border border-gray-200 rounded-2xl p-6 text-left shadow-inner"
              >
                <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-5">
                  HR 신용점수 분석 예시
                </div>
                <div className="space-y-4">
                  {[
                    {
                      name: "기술 역량",
                      val: 7,
                      targetW: "70%",
                      color: "from-[#818CF8] to-[#5B50E8]",
                      textColor: "text-[#5B50E8]",
                    },
                    {
                      name: "리더십",
                      val: 8,
                      targetW: "80%",
                      color: "from-[#34D399] to-[#10B981]",
                      textColor: "text-[#10B981]",
                    },
                    {
                      name: "납기 준수",
                      val: 9,
                      targetW: "90%",
                      color: "from-[#FBBF24] to-[#F59E0B]",
                      textColor: "text-[#F59E0B]",
                    },
                    {
                      name: "커뮤니케이션",
                      val: 6,
                      targetW: "60%",
                      color: "from-[#60A5FA] to-[#3B82F6]",
                      textColor: "text-blue-500",
                    },
                  ].map((row, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="text-[11px] font-semibold text-[#4B5563] w-16 shrink-0">
                        {row.name}
                      </div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${row.color} transition-all duration-[1200ms] ease-out`}
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
                  <span className="text-[11px] text-[#9CA3AF]">
                    HR 신용점수
                  </span>
                  <span className="font-bebas text-[44px] leading-none tracking-tighter bg-gradient-to-r from-[#5B50E8] to-[#8B5CF6] bg-clip-text text-transparent">
                    76
                  </span>
                </div>
              </div>
            </div>

            <div className="reveal opacity-0 translate-y-8 transition-all duration-700 bg-white border border-gray-100 rounded-[20px] p-6 flex gap-5 items-start text-left shadow-sm hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#EEF0FF] text-[#5B50E8] flex items-center justify-center text-lg shrink-0">
                <i className="ti ti-clock-hour-4"></i>
              </div>
              <div>
                <h4 className="text-base font-extrabold text-[#1A1A2E] mb-2">
                  15일 골든타임
                </h4>
                <p className="text-[#4B5563] text-[13px] leading-relaxed">
                  퇴사일로부터 15일 이내에만 검증 점수를 입력할 수 있습니다.
                  타이머 알림으로 기한을 놓치지 않게 도와줍니다.
                </p>
              </div>
            </div>

            <div className="reveal opacity-0 translate-y-8 transition-all duration-700 bg-white border border-gray-100 rounded-[20px] p-6 flex gap-5 items-start text-left shadow-sm hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center text-lg shrink-0">
                <i className="ti ti-users-group"></i>
              </div>
              <div>
                <h4 className="text-base font-extrabold text-[#1A1A2E] mb-2">
                  인재 추천 게시판
                </h4>
                <p className="text-[#4B5563] text-[13px] leading-relaxed">
                  검증된 퇴사 직원을 타 기업에 추천할 수 있습니다. 직원 동의 후
                  게시, 스카웃 성사 시 포인트 적립.
                </p>
              </div>
            </div>

            <div className="reveal opacity-0 translate-y-8 transition-all duration-700 bg-white border border-gray-100 rounded-[20px] p-6 flex gap-5 items-start text-left shadow-sm hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center text-lg shrink-0">
                <i className="ti ti-coin"></i>
              </div>
              <div>
                <h4 className="text-base font-extrabold text-[#1A1A2E] mb-2">
                  포인트 현금화
                </h4>
                <p className="text-[#4B5563] text-[13px] leading-relaxed">
                  타사가 내 직원 데이터를 열람할 때마다 포인트가 자동
                  적립됩니다. 언제든 현금 인출 가능.
                </p>
              </div>
            </div>

            <div className="reveal opacity-0 translate-y-8 transition-all duration-700 bg-white border border-gray-100 rounded-[20px] p-6 flex gap-5 items-start text-left shadow-sm hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center text-lg shrink-0">
                <i className="ti ti-shield-lock"></i>
              </div>
              <div>
                <h4 className="text-base font-extrabold text-[#1A1A2E] mb-2">
                  법적 보호 설계
                </h4>
                <p className="text-[#4B5563] text-[13px] leading-relaxed">
                  사전 동의 취득, 재고용 사유 입력 금지, 이의제기 중재
                  시스템으로 명예훼손 위험을 원천 차단.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. PRICING SECTION ─── */}
      <section id="pricing-section" className="py-24 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 mb-20 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEF0FF] border border-[#5B50E8]/20 rounded-full mb-4">
              <i className="ti ti-tag text-[#5B50E8] text-xs"></i>
              <span className="text-[10px] font-bold text-[#5B50E8] uppercase tracking-widest">
                Pricing
              </span>
            </div>
            <h2 className="text-[44px] md:text-[56px] font-bebas text-[#1A1A2E] leading-tight mb-4 tracking-tight">
              투명한 요금제
            </h2>
            <p className="text-[#4B5563] text-lg max-w-2xl leading-relaxed">
              규모에 맞는 플랜을 선택하세요. 모든 플랜은 30일 무료로 시작할 수
              있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Starter Plan */}
            <div
              onClick={() => setSelectedPlan("starter")}
              className={`reveal opacity-0 translate-y-8 transition-all duration-700 rounded-[24px] p-8 flex flex-col cursor-pointer bg-white transition-all duration-300 border ${
                selectedPlan === "starter"
                  ? "border-2 border-[#5B50E8] shadow-xl shadow-[#5B50E8]/10 scale-[1.02]"
                  : "border-gray-200 shadow-sm hover:border-gray-300"
              }`}
            >
              <div className="text-left mb-6">
                <div className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">
                  Starter
                </div>
                <div
                  className={`font-bebas text-[48px] font-black leading-none transition-colors ${selectedPlan === "starter" ? "text-[#5B50E8]" : "text-[#1A1A2E]"}`}
                >
                  ₩390K
                </div>
                <div className="text-[12px] text-[#9CA3AF] mt-2">
                  / 월 · 최대 10명
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-100 my-4" />
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
                    className={`flex items-center gap-3 text-[13px] ${item.check ? "text-[#4B5563]" : "text-[#9CA3AF] opacity-60"}`}
                  >
                    <i
                      className={`ti ${item.check ? "ti-check text-[#10B981]" : "ti-x text-gray-300"} text-base shrink-0 font-bold`}
                    />
                    {item.text}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3.5 rounded-xl text-[13px] font-bold transition-all ${
                  selectedPlan === "starter"
                    ? "bg-gradient-to-r from-[#5B50E8] to-[#8B5CF6] text-white shadow-md shadow-[#5B50E8]/20"
                    : "border border-gray-200 text-[#1A1A2E] bg-white hover:bg-gray-50"
                }`}
              >
                무료 체험 시작
              </button>
            </div>

            {/* Business Plan */}
            <div
              onClick={() => setSelectedPlan("business")}
              className={`reveal opacity-0 translate-y-8 transition-all duration-700 relative rounded-[24px] p-8 flex flex-col cursor-pointer bg-white transition-all duration-300 border ${
                selectedPlan === "business"
                  ? "border-2 border-[#5B50E8] shadow-xl shadow-[#5B50E8]/10 scale-[1.02]"
                  : "border-gray-200 shadow-sm hover:border-gray-300"
              }`}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-1.5 bg-gradient-to-r from-[#5B50E8] to-[#8B5CF6] text-white text-[10px] font-black tracking-wider rounded-full shadow-md shadow-[#5B50E8]/20 uppercase">
                Most Popular
              </div>
              <div className="text-left mb-6 mt-2">
                <div className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">
                  Business
                </div>
                <div
                  className={`font-bebas text-[48px] font-black leading-none transition-colors ${selectedPlan === "business" ? "text-[#5B50E8]" : "text-[#1A1A2E]"}`}
                >
                  ₩990K
                </div>
                <div className="text-[12px] text-[#9CA3AF] mt-2">
                  / 월 · 최대 50명
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-100 my-4" />
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
                    className="flex items-center gap-3 text-[13px] text-[#4B5563]"
                  >
                    <i className="ti ti-check text-[#10B981] text-base shrink-0 font-bold" />
                    {item.text}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3.5 rounded-xl text-[13px] font-bold transition-all ${
                  selectedPlan === "business"
                    ? "bg-gradient-to-r from-[#5B50E8] to-[#8B5CF6] text-white shadow-md shadow-[#5B50E8]/20"
                    : "border border-gray-200 text-[#1A1A2E] bg-white hover:bg-gray-50"
                }`}
              >
                지금 시작하기
              </button>
            </div>

            {/* Enterprise Plan */}
            <div
              onClick={() => setSelectedPlan("enterprise")}
              className={`reveal opacity-0 translate-y-8 transition-all duration-700 rounded-[24px] p-8 flex flex-col cursor-pointer bg-white transition-all duration-300 border ${
                selectedPlan === "enterprise"
                  ? "border-2 border-[#5B50E8] shadow-xl shadow-[#5B50E8]/10 scale-[1.02]"
                  : "border-gray-200 shadow-sm hover:border-gray-300"
              }`}
            >
              <div className="text-left mb-6">
                <div className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">
                  Enterprise
                </div>
                <div
                  className={`font-bebas text-[48px] font-black leading-none transition-colors ${selectedPlan === "enterprise" ? "text-[#5B50E8]" : "text-[#1A1A2E]"}`}
                >
                  문의
                </div>
                <div className="text-[12px] text-[#9CA3AF] mt-2">
                  / 맞춤 계약 · 무제한
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-100 my-4" />
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
                    className="flex items-center gap-3 text-[13px] text-[#4B5563]"
                  >
                    <i className="ti ti-check text-[#10B981] text-base shrink-0 font-bold" />
                    {text}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3.5 rounded-xl text-[13px] font-bold transition-all ${
                  selectedPlan === "enterprise"
                    ? "bg-gradient-to-r from-[#5B50E8] to-[#8B5CF6] text-white shadow-md shadow-[#5B50E8]/20"
                    : "border border-gray-200 text-[#1A1A2E] bg-white hover:bg-gray-50"
                }`}
              >
                영업팀 문의
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. CTA SECTION (NEW) ─── */}
      <section className="relative py-32 px-8 text-center bg-gradient-to-br from-[#FAFAFF] via-[#EEF0FF] to-[#F5F3FF] border-t border-[#5B50E8]/10 overflow-hidden">
        {/* Subtle background grids & floaters */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#5B50E8 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute -top-[100px] -left-[100px] w-[400px] h-[400px] bg-[#5B50E8]/10 blur-[60px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-[80px] -right-[80px] w-[350px] h-[350px] bg-[#8B5CF6]/8 blur-[60px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="reveal opacity-0 translate-y-8 transition-all duration-700 font-bebas text-[clamp(44px,6vw,78px)] leading-[1] tracking-wider text-[#1A1A2E] mb-6">
            HR 신용 인프라,
            <br />
            <span className="bg-gradient-to-r from-[#5B50E8] via-[#8B5CF6] to-[#F59E0B] bg-clip-text text-transparent">
              지금 시작하세요
            </span>
          </h2>

          <p className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 text-[#4B5563] text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12">
            채용 불안은 정보 부족에서 옵니다.
            <br />
            GeniCheck로 검증된 HR 데이터 기반의 채용을 시작하세요.
          </p>

          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 flex flex-wrap justify-center gap-4 mb-5">
            <button className="px-10 py-4 bg-gradient-to-br from-[#5B50E8] to-[#8B5CF6] text-white rounded-xl font-bold shadow-xl shadow-[#5B50E8]/30 hover:scale-105 transition-all flex items-center gap-2">
              <i className="ti ti-building-community text-lg" />
              기업 회원가입 — 무료 시작
            </button>
            <button className="px-8 py-4 bg-white border border-gray-200 text-[#1A1A2E] rounded-xl font-bold shadow-sm hover:border-[#5B50E8] hover:text-[#5B50E8] transition-all flex items-center gap-2">
              <i className="ti ti-login text-lg" />
              로그인
            </button>
          </div>

          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-300 text-xs text-[#9CA3AF]">
            이미 계정이 있으신가요?{" "}
            <span className="text-[#5B50E8] font-bold cursor-pointer hover:underline">
              로그인 →
            </span>
          </div>
        </div>
      </section>

      {/* ─── 8. FOOTER ─── */}
      <footer className="bg-[#1A1A2E] py-12 px-8 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5">
        <div className="font-bebas text-[22px] tracking-[2px] text-white/70">
          GeniCheck
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-[13px] font-medium">
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
        <div className="text-[12px] text-white/25">
          © 2026 GeniCheck Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
