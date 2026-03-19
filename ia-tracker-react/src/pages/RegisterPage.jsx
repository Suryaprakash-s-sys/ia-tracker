import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/api";
import { Input } from "../components/FormField";
import Button from "../components/Button";
import Icon, { ICONS } from "../components/Icon";
import "./AuthPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ username: "", email: "", password: "" });
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await authAPI.register(form);
      setSuccess("Account created! Redirecting to login…");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message || "Registration failed");
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
            <button className="auth-tab auth-tab--active">Register</button>
          </div>

          <h2 className="auth-heading">Create account</h2>
          <p className="auth-sub">Start tracking your interview journey</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label="Username"
              id="username"
              type="text"
              placeholder="Choose a username"
              value={form.username}
              onChange={set("username")}
              required
            />
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={set("email")}
              required
            />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={set("password")}
              required
            />

            {error   && <div className="auth-error">{error}</div>}
            {success && <div className="auth-success">{success}</div>}

            <Button type="submit" fullWidth disabled={loading} size="lg">
              {loading ? "Creating account…" : "Create Account"}
            </Button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <span className="auth-switch-link" onClick={() => navigate("/login")}>
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
