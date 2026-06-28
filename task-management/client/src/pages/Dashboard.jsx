import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useTaskStore from "../store/taskStore";
import { MetricsRow } from "../components/tasks/MetricsRow";
import { TaskToolbar } from "../components/tasks/TaskToolbar";
import { ListView } from "../components/tasks/ListView";
import { BoardView } from "../components/tasks/BoardView";
import { TaskForm } from "../components/common/TaskForm";
import { Modal } from "../components/common/Modal";
import { ConfirmModal } from "../components/common/ConfirmModal";
import { CommandPalette } from "../components/common/CommandPalette";

export default function Dashboard({ onToggleTheme, dark }) {
  const {
    tasks,
    stats,
    pagination,
    loading,
    filters,
    setFilters,
    fetchTasks,
    fetchStats,
    createTask,
    updateTask,
    deleteTask,
  } = useTaskStore();

  const [viewMode, setViewMode] = useState(() => localStorage.getItem("viewMode") || "list");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchTasks(filters);
  }, [filters, fetchTasks]);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCmdPaletteOpen((p) => !p);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "n" && !e.ctrlKey && !e.metaKey && !e.target.closest("input,textarea,select")) {
        e.preventDefault();
        setShowCreateModal(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleCreateTask = async (data) => {
    setSubmitting(true);
    try {
      await createTask(data);
      toast.success("Task Created Successfully");
      setShowCreateModal(false);
      fetchTasks(filters);
      fetchStats();
    } catch {
      toast.error("Failed to create task");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateTask = async (data) => {
    if (!editingTask) return;
    setSubmitting(true);
    try {
      await updateTask(editingTask._id, data);
      toast.success("Task Updated Successfully");
      setEditingTask(null);
      fetchStats();
    } catch {
      toast.error("Failed to update task");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTask = async () => {
    if (!deletingTask) return;
    try {
      await deleteTask(deletingTask._id);
      toast.success("Task Deleted Successfully");
      setDeletingTask(null);
      fetchTasks(filters);
      fetchStats();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const handleToggleStatus = useCallback(async (task) => {
    const statusOrder = ["todo", "in-progress", "completed", "todo"];
    const currentIdx = statusOrder.indexOf(task.status);
    const newStatus = statusOrder[currentIdx + 1];
    try {
      await updateTask(task._id, { status: newStatus });
      fetchStats();
    } catch {
      toast.error("Failed to update status");
    }
  }, [updateTask, fetchStats]);

  const handleStatusChange = useCallback(async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      fetchStats();
    } catch {
      toast.error("Failed to update status");
    }
  }, [updateTask, fetchStats]);

  const handlePageChange = (newPage) => {
    setFilters({ page: newPage });
  };

  const pageTitle = filters.status
    ? `${filters.status === "todo" ? "To Do" : filters.status === "in-progress" ? "In Progress" : "Completed"} Tasks`
    : "Tasks";

  return (
    <div className="space-y-4 pb-20 lg:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-page-heading font-bold text-text-primary dark:text-text-primary-dark">{pageTitle}</h1>
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark mt-0.5">
            {pagination.total} task{pagination.total !== 1 ? "s" : ""} total
          </p>
        </div>
      </div>

      <MetricsRow stats={stats} />

      <TaskToolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onCreate={() => setShowCreateModal(true)}
      />

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card p-4">
              <div className="skeleton h-4 w-3/4 mb-2" />
              <div className="skeleton h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : viewMode === "list" ? (
        <>
          <ListView
            tasks={tasks}
            onEdit={setEditingTask}
            onDelete={setDeletingTask}
            onToggleStatus={handleToggleStatus}
            hasActiveFilters={!!(filters.search || filters.status || filters.priority)}
          />
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={filters.page <= 1}
                className="btn-secondary text-xs py-2"
              >
                Previous
              </button>
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filters.page === p
                      ? "bg-primary text-white dark:bg-primary-dark dark:text-bg-dark"
                      : "text-text-secondary dark:text-text-secondary-dark hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={filters.page >= pagination.totalPages}
                className="btn-secondary text-xs py-2"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <BoardView
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={setDeletingTask}
          onToggleStatus={handleToggleStatus}
          onStatusChange={handleStatusChange}
        />
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Task"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          loading={submitting}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Edit Task"
      >
        <TaskForm
          initialData={
            editingTask
              ? {
                  title: editingTask.title,
                  description: editingTask.description,
                  priority: editingTask.priority,
                  status: editingTask.status,
                  dueDate: editingTask.dueDate ? editingTask.dueDate.split("T")[0] : "",
                }
              : undefined
          }
          onSubmit={handleUpdateTask}
          loading={submitting}
          onCancel={() => setEditingTask(null)}
        />
      </Modal>

      <ConfirmModal
        isOpen={!!deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleDeleteTask}
        title="Delete Task"
        message={`Delete "${deletingTask?.title}"? This cannot be undone.`}
      />

      <CommandPalette
        open={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
        onCreateTask={() => setShowCreateModal(true)}
        onViewChange={setViewMode}
        onToggleTheme={onToggleTheme}
        dark={dark}
      />
    </div>
  );
}
