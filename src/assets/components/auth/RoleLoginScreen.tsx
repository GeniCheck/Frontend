import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../context/roleContext";
import type { Role } from "../../context/roleContext";
import OtpInput from "./OtpInput";

// 백엔드 연동 전까지 고정 데모 인증번호
const MOCK_OTP = "123456";
const RESEND_COOLDOWN = 30;

type Tone = "purple" | "amber";

const TONES: Record<
  Tone,
  {
    solid: string;
    bannerBg: string;
    blob: string;
    inputFocus: string;
    otpFocus: string;
    link: string;
    iconBox: string;
  }
> = {
  purple: {
    solid: "bg-[#5B50E8] hover:bg-[#493fd1] shadow-[#5B50E8]/20",
    bannerBg: "bg-[#5B50E8]",
    blob: "bg-[#8B5CF6]/40",
    inputFocus: "focus:border-[#5B50E8] focus:ring-[#5B50E8]/15",
    otpFocus: "focus:border-[#5B50E8] focus:ring-[#5B50E8]/25",
    link: "text-[#5B50E8]",
    iconBox: "bg-[#EEF0FF] text-[#5B50E8]",
  },
  amber: {
    solid: "bg-[#F59E0B] hover:bg-[#d98a09] shadow-[#F59E0B]/20",
    bannerBg: "bg-[#F59E0B]",
    blob: "bg-[#FBBF24]/40",
    inputFocus: "focus:border-[#F59E0B] focus:ring-[#F59E0B]/15",
    otpFocus: "focus:border-[#F59E0B] focus:ring-[#F59E0B]/25",
    link: "text-[#F59E0B]",
    iconBox: "bg-[#FFFBEB] text-[#F59E0B]",
  },
};

export interface RoleLoginScreenProps {
  role: Role;
  tone: Tone;
  // 좌측 브랜드 배너
  bannerHeadline: React.ReactNode;
  bannerCaption: string;
  // 우측 폼: 1단계(ID/PW)
  heading: string;
  subheading: string;
  idLabel: string;
  idPlaceholder: string;
  // 우측 폼: 2단계(인증번호) 안내 문구
  otpNotice: React.ReactNode;
  allowResend: boolean;
  // 인증 성공 시 이동 경로
  redirectTo: string;
  // 하단 반대 역할 안내 링크
  switchPrompt: { question: string; linkLabel: string; to: string };
}

const RoleLoginScreen: React.FC<RoleLoginScreenProps> = ({
  role,
  tone,
  bannerHeadline,
  bannerCaption,
  heading,
  subheading,
  idLabel,
  idPlaceholder,
  otpNotice,
  allowResend,
  redirectTo,
  switchPrompt,
}) => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const t = TONES[tone];

  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resent, setResent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // 재발송 쿨다운 카운트다운
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const goToOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginId.trim() || !password.trim()) return;
    // 백엔드 없음: ID/PW 검증은 생략하고 인증번호 단계로 이동
    setStep("otp");
    setError(null);
    setCode("");
    if (allowResend) setCooldown(RESEND_COOLDOWN);
  };

  const backToCredentials = () => {
    setStep("credentials");
    setError(null);
    setCode("");
    setResent(false);
  };

  const verify = () => {
    if (code !== MOCK_OTP) {
      setError("인증번호가 올바르지 않습니다. 다시 확인해 주세요.");
      return;
    }
    setRole(role);
    navigate(redirectTo, { replace: true });
  };

  const resend = () => {
    if (cooldown > 0) return;
    setCode("");
    setError(null);
    setResent(true);
    setCooldown(RESEND_COOLDOWN);
  };

  const inputClass = `w-full rounded-xl border border-gray-200 py-3.5 pr-4 pl-11 text-sm transition-all placeholder:text-gray-300 focus:ring-1 focus:outline-none ${t.inputFocus}`;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-sans text-[#1A1A2E] selection:bg-[#5B50E8]/20">
      {/* ─── 좌측: 브랜드 배너 (데스크톱 전용) ─── */}
      <div
        className={`relative hidden items-center justify-center overflow-hidden p-12 lg:flex lg:w-1/2 ${t.bannerBg}`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div
          className={`absolute top-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full blur-[90px] ${t.blob}`}
        />
        <div className="absolute bottom-[-12%] left-[-8%] h-[320px] w-[320px] rounded-full bg-white/10 blur-[90px]" />

        <div className="relative z-10 max-w-md text-left text-white">
          <div
            onClick={() => navigate("/")}
            className="group mb-16 flex w-fit cursor-pointer items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-lg shadow-black/10 transition-transform group-hover:rotate-[-8deg]">
              <i className={`ti ti-shield-check text-2xl ${t.link}`}></i>
            </div>
            <span className="font-bebas text-[26px] tracking-[2px] text-white opacity-90">
              GeniCheck
            </span>
          </div>

          <h2 className="mb-6 text-4xl leading-tight font-black tracking-tight">
            {bannerHeadline}
          </h2>
          <p className="text-sm leading-relaxed text-white/80">
            {bannerCaption}
          </p>
        </div>
      </div>

      {/* ─── 우측: 폼 ─── */}
      <div className="relative flex w-full flex-col justify-center bg-white px-6 py-12 md:px-16 lg:w-1/2 lg:px-24">
        {/* 모바일 상단 로고 */}
        <div
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 flex cursor-pointer items-center gap-2 lg:hidden"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5B50E8] shadow-md">
            <i className="ti ti-shield-check text-base text-white"></i>
          </div>
          <span className="font-bebas text-xl tracking-[1px]">GeniCheck</span>
        </div>

        <div className="mx-auto w-full max-w-md text-left">
          {step === "credentials" ? (
            <>
              <h3 className="mb-2 text-3xl font-black tracking-tight text-[#1A1A2E]">
                {heading}
              </h3>
              <p className="mb-8 text-xs font-medium text-[#4B5563]">
                {subheading}
              </p>

              <form onSubmit={goToOtp} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-wide text-[#4B5563]">
                    {idLabel}
                  </label>
                  <div className="relative">
                    <i className="ti ti-user absolute top-1/2 left-4 -translate-y-1/2 text-base text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder={idPlaceholder}
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-wide text-[#4B5563]">
                    비밀번호
                  </label>
                  <div className="relative">
                    <i className="ti ti-lock absolute top-1/2 left-4 -translate-y-1/2 text-base text-gray-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`mt-2 w-full rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:translate-y-[-1px] ${t.solid}`}
                >
                  인증번호 받기
                </button>
              </form>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={backToCredentials}
                className="mb-6 flex items-center gap-1.5 text-xs font-bold text-gray-400 transition-colors hover:text-[#1A1A2E]"
              >
                <i className="ti ti-arrow-left text-sm" />
                아이디 입력으로
              </button>

              <div
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${t.iconBox}`}
              >
                <i className="ti ti-mail-check" />
              </div>

              <h3 className="mb-2 text-3xl font-black tracking-tight text-[#1A1A2E]">
                인증번호 입력
              </h3>
              <p className="mb-6 text-xs leading-relaxed font-medium text-[#4B5563]">
                {otpNotice}
              </p>

              <OtpInput
                value={code}
                onChange={(next) => {
                  setCode(next);
                  if (error) setError(null);
                }}
                autoFocus
                focusClass={t.otpFocus}
              />

              {error && (
                <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-red-500">
                  <i className="ti ti-alert-circle text-sm" />
                  {error}
                </p>
              )}
              {resent && !error && (
                <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <i className="ti ti-check text-sm" />
                  인증번호를 다시 보냈어요.
                </p>
              )}

              <button
                type="button"
                onClick={verify}
                disabled={code.length < 6}
                className={`mt-6 w-full rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 ${t.solid}`}
              >
                로그인
              </button>

              {allowResend && (
                <div className="mt-4 text-center text-xs text-[#4B5563]">
                  인증번호를 못 받으셨나요?{" "}
                  <button
                    type="button"
                    onClick={resend}
                    disabled={cooldown > 0}
                    className={`font-bold hover:underline disabled:cursor-not-allowed disabled:text-gray-300 disabled:no-underline ${t.link}`}
                  >
                    {cooldown > 0 ? `재발송 (${cooldown}초)` : "재발송"}
                  </button>
                </div>
              )}
            </>
          )}

          {/* 하단: 반대 역할 안내 */}
          <div className="mt-10 border-t border-gray-100 pt-6 text-center text-xs text-[#4B5563]">
            {switchPrompt.question}{" "}
            <span
              onClick={() => navigate(switchPrompt.to)}
              className={`cursor-pointer font-bold hover:underline ${t.link}`}
            >
              {switchPrompt.linkLabel}
            </span>
          </div>
        </div>

        {/* 최하단 돌아가기 */}
        <div
          onClick={() => navigate("/login")}
          className="absolute right-6 bottom-6 flex cursor-pointer items-center gap-1.5 text-xs font-bold text-gray-400 transition-colors hover:text-[#5B50E8]"
        >
          <i className="ti ti-arrow-back text-base" />
          역할 선택으로
        </div>
      </div>
    </div>
  );
};

export default RoleLoginScreen;
