import { create } from "zustand";
import api from "../api/axios";

const useNoteStore = create((set) => ({
  notes: [],
  loading: false,
  activeNote: null,
  panelOpen: false,

  togglePanel: () => set((s) => ({ panelOpen: !s.panelOpen })),
  setActiveNote: (note) => set({ activeNote: note }),

  fetchNotes: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/notes");
      set({ notes: res.data.notes, loading: false });
    } catch { set({ loading: false }); }
  },

  createNote: async () => {
    const res = await api.post("/notes", { title: "Untitled", content: "" });
    return res.data.note;
  },

  updateNote: async (id, data) => {
    const res = await api.put(`/notes/${id}`, data);
    set((state) => ({
      notes: state.notes.map((n) => (n._id === id ? res.data.note : n)),
      activeNote: state.activeNote?._id === id ? res.data.note : state.activeNote,
    }));
    return res.data;
  },

  deleteNote: async (id) => {
    await api.delete(`/notes/${id}`);
    set((state) => ({
      notes: state.notes.filter((n) => n._id !== id),
      activeNote: state.activeNote?._id === id ? null : state.activeNote,
    }));
  },
}));

export default useNoteStore;
