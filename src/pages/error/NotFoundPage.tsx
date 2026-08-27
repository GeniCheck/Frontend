import React from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/context/roleContext";

interface NotFoundPageProps {
  // 권한 부족으로 막힌 경우(RoleGuard) true, 잘못된 경로면 false
  forbidden?: boolean;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ forbidden = false }) => {
  const navigate = useNavigate();
  const { role } = useRole();

  return (
    <main className="bg-surface text-text1 flex min-h-screen flex-1 flex-col items-center justify-center px-6 text-center font-sans">
      <div className="bg-brand-light text-brand flex h-16 w-16 items-center justify-center rounded-2xl text-3xl">
        <i className={`ti ${forbidden ? "ti-lock" : "ti-error-404"}`} />
      </div>

      <h1 className="text-text1 mt-8 text-[64px] leading-none font-black tracking-tight">
        {forbidden ? "403" : "404"}
      </h1>

      <p className="text-text1 mt-2 text-lg font-black">
        {forbidden
          ? "이 페이지에 접근할 권한이 없습니다"
          : "페이지를 찾을 수 없습니다"}
      </p>

      <p className="text-text2 mt-3 max-w-md text-sm leading-relaxed">
        {forbidden
          ? "인사팀장 계정은 인재 추천 게시판만 이용할 수 있습니다. 다른 메뉴는 대표 계정으로 로그인해 주세요."
          : "요청하신 주소가 잘못되었거나 삭제된 페이지입니다."}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => navigate(role === "hr" ? "/main/referral" : "/main")}
          className="bg-brand shadow-brand/20 hover:bg-brand-dark rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-95"
        >
          {role === "hr" ? "인재 추천 게시판으로" : "대시보드로 이동"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-text2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold shadow-sm transition-all hover:bg-gray-50 active:scale-95"
        >
          랜딩 페이지로
        </button>
      </div>
    </main>
  );
};

export default NotFoundPage;
