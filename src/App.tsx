import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./assets/pages/LandingPage";
import LoginPage from "./assets/pages/LoginPage";
import SignupPage from "./assets/pages/SignupPage";
import MainPage from "./assets/pages/MainPage";
import VerificationPage from "./assets/pages/VerificationPage";
import ReferralPage from "./assets/pages/ReferralPage";
import AIReportsPage from "./assets/pages/AIReportsPage"; // ★ 파일명 매핑 수정 완료

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/referral" element={<ReferralPage />} />
        <Route path="/ai-reports" element={<AIReportsPage />} />{" "}
        {/* ★ 라우트 경로 /ai-reports 세팅 */}
      </Routes>
    </Router>
  );
}

export default App;
