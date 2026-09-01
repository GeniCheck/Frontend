import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { RoleProvider } from "@/context/RoleProvider";
import RoleGuard from "@/components/common/RoleGuard";

// ─── 1. PUBLIC 도메인 영역 ───
import LandingPage from "@/pages/public/LandingPage";

// ─── 2. AUTH 도메인 영역 ───
import LoginPage from "@/pages/auth/LoginPage"; // 역할 선택 화면
import CeoLoginPage from "@/pages/auth/CeoLoginPage";
import HrLoginPage from "@/pages/auth/HrLoginPage";
import SignupPage from "@/pages/auth/SignupPage"; // 여기서 내부 분기 처리

// ─── 3. VERIFICATION 도메인 영역 (링크 토큰 기반, 로그인 불필요) ───
import SelfDeclarePage from "@/pages/verification/SelfDeclarePage";

// ─── 4. MAIN 대시보드 도메인 영역 ───
import MainPage from "@/pages/main/MainPage";
import DashboardPage from "@/pages/main/DashboardPage";
import VerificationPage from "@/pages/main/VerificationPage";
import QuestionTemplatePage from "@/pages/main/QuestionTemplatePage";
import EvaluationPage from "@/pages/main/EvaluationPage";
import ReferralPage from "@/pages/main/ReferralPage";
import AIReportsPage from "@/pages/main/AIReportsPage";
import SupportPage from "@/pages/main/SupportPage";
import CreditsPage from "@/pages/main/CreditsPage";

// ─── 5. 에러/폴백 ───
import NotFoundPage from "@/pages/error/NotFoundPage";

function App() {
  return (
    <RoleProvider>
      <Router>
        <Routes>
          {/* 일반 공개 및 회원인증 주소 라인 */}
          <Route path="/" element={<LandingPage />} />

          {/* 로그인: /login = 역할 선택, 하위에서 대표/인사팀장 폼 분기 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/ceo" element={<CeoLoginPage />} />
          <Route path="/login/hr" element={<HrLoginPage />} />

          {/* 회원가입 루트 경로 */}
          <Route path="/signup" element={<SignupPage />} />

          {/* 직원용 자기선언 페이지: 1회성 링크 토큰 기반, 로그인 불필요 */}
          <Route
            path="/verification/self-declare/:token"
            element={<SelfDeclarePage />}
          />

          {/* 대시보드 백오피스 내부 중첩 라우트 */}
          <Route path="/main" element={<MainPage />}>
            {/* 대표(ceo) 전용 — 인사팀장(hr)은 404 처리 */}
            <Route element={<RoleGuard allow={["ceo"]} />}>
              <Route index element={<DashboardPage />} />
              <Route path="verification" element={<VerificationPage />} />
              <Route
                path="verification/question-template"
                element={<QuestionTemplatePage />}
              />
              <Route
                path="verification/evaluation/:employeeId"
                element={<EvaluationPage />}
              />
              <Route path="ai-reports" element={<AIReportsPage />} />
            </Route>

            {/* 대표 + 인사팀장 공통 접근 */}
            <Route path="referral" element={<ReferralPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="credits" element={<CreditsPage />} />

            {/* /main 하위 잘못된 경로 */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* 잘못된 경로 예외 처리 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </RoleProvider>
  );
}

export default App;
