import React from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../context/roleContext";

interface NotFoundPageProps {
  // 권한 부족으로 막힌 경우(RoleGuard) true, 잘못된 경로면 false
  forbidden?: boolean;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ forbidden = false }) => {
  const navigate = useNavigate();
  const { role } = useRole();

  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center bg-[#F9FAFB] px-6 text-center font-sans text-[#1A1A2E] md:pl-[260px]">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF0FF] text-3xl text-[#5B50E8]">
        <i className={`ti ${forbidden ? "ti-lock" : "ti-error-404"}`} />
      </div>

      <h1 className="font-bebas mt-8 text-[64px] leading-none tracking-tight text-[#1A1A2E]">
        {forbidden ? "403" : "404"}
      </h1>

      <p className="mt-2 text-lg font-black text-[#1A1A2E]">
        {forbidden
          ? "이 페이지에 접근할 권한이 없습니다"
          : "페이지를 찾을 수 없습니다"}
      </p>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-[#4B5563]">
        {forbidden
          ? "인사팀장 계정은 인재 추천 게시판만 이용할 수 있습니다. 다른 메뉴는 대표 계정으로 로그인해 주세요."
          : "요청하신 주소가 잘못되었거나 삭제된 페이지입니다."}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => navigate(role === "hr" ? "/main/referral" : "/main")}
          className="rounded-xl bg-[#5B50E8] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#5B50E8]/20 transition-all hover:bg-[#493fd1] active:scale-95"
        >
          {role === "hr" ? "인재 추천 게시판으로" : "대시보드로 이동"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-[#4B5563] shadow-sm transition-all hover:bg-gray-50 active:scale-95"
        >
          랜딩 페이지로
        </button>
      </div>
    </main>
  );
};

export default NotFoundPage;
