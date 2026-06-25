import { create } from "zustand";
import api from "../api/axios";

const useTaskStore = create((set) => ({
  tasks: [],
  stats: { total: 0, completed: 0, pending: 0, inProgress: 0, completionRate: 0 },
  pagination: { total: 0, page: 1, limit: 12, totalPages: 0 },
  loading: false,
  filters: {
    search: "",
    status: "",
    priority: "",
    sort: "-createdAt",
    page: 1,
  },

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  fetchTasks: async (filters = {}) => {
    set({ loading: true });
    try {
      const params = { ...filters };
      const res = await api.get("/tasks", { params });
      set({
        tasks: res.data.tasks,
        pagination: res.data.pagination,
        loading: false,
      });
    } catch {
      set({ loading: false });
    }
  },

  fetchStats: async () => {
    try {
      const res = await api.get("/tasks/stats");
      set({ stats: res.data });
    } catch {}
  },

  createTask: async (data) => {
    const res = await api.post("/tasks", data);
    return res.data;
  },

  updateTask: async (id, data) => {
    const res = await api.put(`/tasks/${id}`, data);
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t._id === id ? res.data.task : t
      ),
    }));
    return res.data;
  },

  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`);
    set((state) => ({
      tasks: state.tasks.filter((t) => t._id !== id),
    }));
  },
}));

export default useTaskStore;
