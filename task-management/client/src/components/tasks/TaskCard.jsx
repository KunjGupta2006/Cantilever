import { motion } from "framer-motion";
import {
  Calendar,
  Edit3,
  Trash2,
  CheckCircle2,
  Circle,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";
import { formatDate, isOverdue } from "../../utils/formatDate";

const priorityConfig = {
  low: {
    label: "Low",
    color: "bg-green-100 text-green-700",
    icon: ArrowDown,
  },
  medium: {
    label: "Medium",
    color: "bg-yellow-100 text-yellow-700",
    icon: Minus,
  },
  high: {
    label: "High",
    color: "bg-red-100 text-red-700",
    icon: ArrowUp,
  },
};

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-orange-100 text-orange-700",
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700",
  },
};

export function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  const priority = priorityConfig[task.priority];
  const status = statusConfig[task.status];
  const overdue = isOverdue(task.dueDate) && task.status === "pending";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="card p-5 hover:shadow-md transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={() => onToggleStatus?.(task)}
              className={`flex-shrink-0 transition-colors ${
                task.status === "completed"
                  ? "text-success"
                  : "text-text-secondary hover:text-success"
              }`}
              aria-label={
                task.status === "completed"
                  ? "Mark as pending"
                  : "Mark as completed"
              }
            >
              {task.status === "completed" ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>
            <h3
              className={`font-semibold text-text-primary truncate ${
                task.status === "completed" ? "line-through text-text-secondary" : ""
              }`}
            >
              {task.title}
            </h3>
          </div>
          {task.description && (
            <p className="text-sm text-text-secondary ml-7 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 ml-7 mb-3">
        <span
          className={`badge ${priority.color} inline-flex items-center gap-1`}
        >
          <priority.icon className="w-3 h-3" />
          {priority.label}
        </span>
        <span className={`badge ${status.color}`}>{status.label}</span>
      </div>

      {task.dueDate && (
        <div className="flex items-center gap-1.5 ml-7 mb-3">
          <Calendar className="w-3.5 h-3.5 text-text-secondary" />
          <span
            className={`text-xs ${
              overdue ? "text-danger font-medium" : "text-text-secondary"
            }`}
          >
            {formatDate(task.dueDate)}
            {overdue && " (Overdue)"}
          </span>
        </div>
      )}

      <div className="flex items-center justify-end gap-1 pt-2 border-t border-border ml-7 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit?.(task)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-text-secondary hover:text-primary transition-colors"
          aria-label="Edit task"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete?.(task)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-text-secondary hover:text-danger transition-colors"
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
