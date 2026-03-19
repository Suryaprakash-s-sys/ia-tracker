import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../api/api";
import { Input } from "../components/FormField";
import Button from "../components/Button";
import Icon, { ICONS } from "../components/Icon";
import "./AuthPage.css";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm]       = useState({ username: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await authAPI.login(form);
      login(data.token, data.username);
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow" />

      <div className="auth-container">
        {/* Logo */}
        <div className="auth-logo-wrap">
          <div className="auth-logo">
            <Icon d={ICONS.bag} size={30} color="#fff" />
          </div>
          <h1 className="auth-app-name">IA Tracker</h1>
          <p className="auth-tagline">Interview Assessment Platform</p>
          <div className="auth-db-badge">
            <Icon d={ICONS.db} size={11} color="var(--green)" />
            <span>MySQL Powered</span>
          </div>
        </div>

        {/* Card */}
        <div className="auth-card">
          <div className="auth-tabs">
            <button className="auth-tab" onClick={() => navigate("/login")}>Login</button>
            <button className="auth-tab auth-tab--active">Sign In</button>
            <button className="auth-tab" onClick={() => navigate("/register")}>Register</button>
          </div>

          <h2 className="auth-heading">Welcome back</h2>
          <p className="auth-sub">Sign in to continue tracking your interviews</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label="Username"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={form.username}
              onChange={set("username")}
              required
            />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={set("password")}
              required
            />

            {error && <div className="auth-error">{error}</div>}

            <Button type="submit" fullWidth disabled={loading} size="lg">
              {loading ? "Signing in…" : "Sign In →"}
            </Button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <span className="auth-switch-link" onClick={() => navigate("/register")}>
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
