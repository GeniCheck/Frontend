import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./assets/pages/LandingPage";
import LoginPage from "./assets/pages/LoginPage";
import SignupPage from "./assets/pages/SignupPage";

// ★ 신설된 pages/main/ 폴더 구조에 맞춰 임포트 경로 최적화
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
        {/* 퍼블릭 페이지 라인 */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* ─── 대시보드 통합 오피스 인프라 중첩 라우트 세팅 ─── */}
        <Route path="/main" element={<MainPage />}>
          {/* /main 주소창 기본 진입 시 대시보드 메인 서브 패널 바인딩 */}
          <Route index element={<DashboardPage />} />

          {/* 자식 라우트들은 부모 주소 뒤에 붙으므로 앞에 슬래시(/)를 빼고 선언하는 것이 정석입니다 */}
          <Route path="verification" element={<VerificationPage />} />
          <Route path="referral" element={<ReferralPage />} />
          <Route path="ai-reports" element={<AIReportsPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="credits" element={<CreditsPage />} />
        </Route>

        {/* 예외 주소 입력 시 랜딩 페이지로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
