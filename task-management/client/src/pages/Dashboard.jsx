import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import useTaskStore from "../store/taskStore";
import { TaskStats } from "../components/tasks/TaskStats";
import { TaskFilters } from "../components/tasks/TaskFilters";
import { TaskCard } from "../components/tasks/TaskCard";
import { TaskForm } from "../components/tasks/TaskForm";
import { Modal } from "../components/common/Modal";
import { ConfirmModal } from "../components/common/ConfirmModal";
import { EmptyState } from "../components/common/EmptyState";
import { SkeletonCard } from "../components/common/Loader";

export default function Dashboard() {
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

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStats();
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
      // handled by interceptor
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
      // handled by interceptor
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
      // handled by interceptor
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    try {
      await updateTask(task._id, { status: newStatus });
      fetchStats();
    } catch {
      // handled by interceptor
    }
  };

  const handlePageChange = (newPage) => {
    setFilters({ page: newPage });
  };

  const isFiltered =
    filters.status || filters.priority || filters.search || filters.sort !== "-createdAt";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary text-sm">
            Welcome back! Here&apos;s your task overview.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      <TaskStats stats={stats} />

      <div className="card p-4">
        <TaskFilters />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <EmptyState onCreate={() => setShowCreateModal(true)} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={setEditingTask}
                  onDelete={setDeletingTask}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </AnimatePresence>
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={filters.page <= 1}
                className="btn-secondary text-sm py-2"
              >
                Previous
              </button>
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      filters.page === page
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={filters.page >= pagination.totalPages}
                className="btn-secondary text-sm py-2"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Task"
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
                  dueDate: editingTask.dueDate
                    ? editingTask.dueDate.split("T")[0]
                    : "",
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
        message={`Are you sure you want to delete "${deletingTask?.title}"?`}
      />
    </div>
  );
}
