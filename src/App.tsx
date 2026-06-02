import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ─── 1. PUBLIC 도메인 영역 ───
import LandingPage from "./assets/pages/public/LandingPage";

// ─── 2. AUTH 도메인 영역 ───
import LoginPage from "./assets/pages/auth/LoginPage";
import SignupPage from "./assets/pages/auth/SignupPage";

// ─── 3. MAIN 대시보드 도메인 영역 ───
import MainPage from "./assets/pages/main/MainPage";
import DashboardPage from "./assets/pages/main/DashboardPage";
import VerificationPage from "./assets/pages/main/VerificationPage";
import ReferralPage from "./assets/pages/main/ReferralPage";
import AIReportsPage from "./assets/pages/main/AIReportsPage";
import SupportPage from "./assets/pages/main/SupportPage";
import CreditsPage from "./assets/pages/main/CreditsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 일반 공개 및 회원인증 주소 라인 */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 대시보드 백오피스 내부 중첩 라우트 */}
        <Route path="/main" element={<MainPage />}>
          <Route index element={<DashboardPage />} />
          <Route path="verification" element={<VerificationPage />} />
          <Route path="referral" element={<ReferralPage />} />
          <Route path="ai-reports" element={<AIReportsPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="credits" element={<CreditsPage />} />
        </Route>

        {/* 잘못된 경로 예외 처리 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
