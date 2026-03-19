import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Icon, { ICONS } from "./Icon";
import Button from "./Button";
import "./Navbar.css";

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/")}>
        <div className="navbar-logo">
          <Icon d={ICONS.bag} size={17} color="#fff" />
        </div>
        <span className="navbar-name">IA Tracker</span>
      </div>

      <div className="navbar-right">
        {auth && (
          <>
            <div className="navbar-user">
              <Icon d={ICONS.user} size={13} color="var(--muted)" />
              <span>{auth.username}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <Icon d={ICONS.logout} size={13} color="currentColor" />
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
