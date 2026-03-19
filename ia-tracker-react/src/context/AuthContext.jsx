import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token    = localStorage.getItem("ia_token");
    const username = localStorage.getItem("ia_user");
    return token ? { token, username } : null;
  });

  const login = (token, username) => {
    localStorage.setItem("ia_token", token);
    localStorage.setItem("ia_user",  username);
    setAuth({ token, username });
  };

  const logout = () => {
    localStorage.removeItem("ia_token");
    localStorage.removeItem("ia_user");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
