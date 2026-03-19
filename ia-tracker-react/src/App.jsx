import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import InterviewsPage from "./pages/InterviewsPage";
import RoundsPage from "./pages/RoundsPage";
import RoundDetailPage from "./pages/RoundDetailPage";

// ─── PROTECTED ROUTE ──────────────────────────────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  return auth ? children : <Navigate to="/login" replace />;
};

// ─── PUBLIC ROUTE (redirect if logged in) ────────────────────────────────────
const PublicRoute = ({ children }) => {
  const { auth } = useAuth();
  return auth ? <Navigate to="/" replace /> : children;
};

// ─── APP ──────────────────────────────────────────────────────────────────────
const App = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login"    element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute><InterviewsPage /></ProtectedRoute>
        } />
        <Route path="/interviews/:interviewId/rounds" element={
          <ProtectedRoute><RoundsPage /></ProtectedRoute>
        } />
        <Route path="/rounds/:roundId" element={
          <ProtectedRoute><RoundDetailPage /></ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
