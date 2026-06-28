import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, LayoutList, Columns3, ArrowRight, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CommandPalette({ open, onClose, onCreateTask, onViewChange, onToggleTheme, dark }) {
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const navigate = useNavigate();

  const actions = [
    { id: "new-task", label: "Create new task", icon: Plus, shortcut: "N" },
    { id: "view-list", label: "Switch to List view", icon: LayoutList },
    { id: "view-board", label: "Switch to Board view", icon: Columns3 },
    { id: "go-dashboard", label: "Go to Dashboard", icon: ArrowRight },
    { id: "go-tasks", label: "Go to Tasks", icon: ArrowRight },
    { id: "toggle-theme", label: dark ? "Switch to Light mode" : "Switch to Dark mode", icon: dark ? Sun : Moon },
  ];

  const filtered = query
    ? actions.filter((a) =>
        a.label.toLowerCase().includes(query.toLowerCase())
      )
    : actions;

  useEffect(() => {
    if (!open) {
      setQuery("");
      setSelectedIdx(0);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filtered[selectedIdx]) {
        executeAction(filtered[selectedIdx]);
      }
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, selectedIdx, filtered]);

  const executeAction = useCallback((action) => {
    switch (action.id) {
      case "new-task":
        onCreateTask?.();
        onClose();
        break;
      case "view-list":
        onViewChange?.("list");
        onClose();
        break;
      case "view-board":
        onViewChange?.("board");
        onClose();
        break;
      case "toggle-theme":
        onToggleTheme?.();
        onClose();
        break;
      case "go-dashboard":
        navigate("/dashboard");
        onClose();
        break;
      case "go-tasks":
        navigate("/tasks");
        onClose();
        break;
      default:
        onClose();
    }
  }, [navigate, onCreateTask, onViewChange, onClose, onToggleTheme]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-lg bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-modal shadow-strong overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border dark:border-border-dark">
              <Search className="w-4 h-4 text-text-secondary" />
              <input
                autoFocus
                type="text"
                placeholder="Search actions..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIdx(0); }}
                className="flex-1 bg-transparent text-sm text-text-primary dark:text-text-primary-dark placeholder:text-text-secondary/60 focus:outline-none"
              />
            </div>
            <div className="py-1 max-h-64 overflow-y-auto">
              {filtered.map((action, i) => (
                <button
                  key={action.id}
                  onClick={() => executeAction(action)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    i === selectedIdx
                      ? "bg-accent/10 text-accent"
                      : "text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary"
                  }`}
                >
                  <action.icon className="w-4 h-4" />
                  <span>{action.label}</span>
                  {action.shortcut && (
                    <span className="ml-auto text-xs text-text-secondary/50 bg-surface-secondary dark:bg-surface-dark-secondary px-1.5 py-0.5 rounded">
                      {action.shortcut}
                    </span>
                  )}
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-sm text-text-secondary dark:text-text-secondary-dark text-center">No results</p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
