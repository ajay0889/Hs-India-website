import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { getApiBase } from "../config/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.token) {
          setToken(parsed.token);
          setUser(parsed.user || null);
          axios.defaults.headers.common["Authorization"] = `Bearer ${parsed.token}`;
        }
      } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const BASE = getApiBase();
    const res = await axios.post(`${BASE}/api/auth/login`, { email, password });
    const auth = { token: res.data.token, user: res.data.user };
    setToken(auth.token);
    setUser(auth.user);
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    localStorage.setItem("auth", JSON.stringify(auth));
    return auth;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("auth");
  };

  const value = useMemo(() => ({ token, user, login, logout, loading }), [token, user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}


