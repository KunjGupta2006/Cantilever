import { create } from "zustand";
import api from "../api/axios";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
  loading: false,

  register: async (data) => {
    set({ loading: true });
    try {
      const res = await api.post("/auth/register", data);
      return res.data;
    } finally {
      set({ loading: false });
    }
  },

  login: async (data) => {
    set({ loading: true });
    try {
      const res = await api.post("/auth/login", data);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, token, loading: false });
      return res.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
