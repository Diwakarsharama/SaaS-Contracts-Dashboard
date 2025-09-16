import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("mock_jwt"));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // For demo: decode minimal info or set user = { username: "demo" }
      setUser({ username: "demo" });
    } else {
      setUser(null);
    }
  }, [token]);

  const login = ({ username, password }) => {
    // Accept any username, password must be test123.
    if (password !== "test123") {
      return { ok: false, message: "Invalid credentials" };
    }
    const fakeJwt = btoa(JSON.stringify({ username, iat: Date.now() }));
    localStorage.setItem("mock_jwt", fakeJwt);
    setToken(fakeJwt);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem("mock_jwt");
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
