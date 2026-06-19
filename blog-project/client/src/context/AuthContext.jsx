import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true); // checking session on mount

  // On mount — check if cookie session is still valid
  useEffect(() => {
    api.get("/user/me")
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const signup = async ({ username, email, password }) => {
    const res = await api.post("/user/signup", { username, email, password });
    setUser(res.data.user);
    return res.data;
  };

  const login = async ({ email, password }) => {
    const res = await api.post("/user/login", { email, password });
    setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    await api.post("/user/logout");
    setUser(null);
  };

  const updateUser = (updated) => setUser(updated);

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}