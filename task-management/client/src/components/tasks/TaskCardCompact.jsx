import { motion } from "framer-motion";
import { Calendar, Edit3, Trash2, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { formatDate, isOverdue } from "../../utils/formatDate";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const priorityConfig = {
  low: { label: "Low", color: "text-success bg-success/10", icon: ArrowDown },
  medium: { label: "Medium", color: "text-warning bg-warning/10", icon: Minus },
  high: { label: "High", color: "text-danger bg-danger/10", icon: ArrowUp },
};

export function TaskCardCompact({ task, onEdit, onDelete, onToggleStatus }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priority = priorityConfig[task.priority] || priorityConfig.medium;
  const overdue = isOverdue(task.dueDate) && task.status !== "completed";
  const PriorityIcon = priority.icon;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-3.5 hover:shadow-medium transition-all duration-150 group cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="text-sm font-medium text-text-primary dark:text-text-primary-dark leading-snug">{task.title}</h4>
        </div>

        {task.description && (
          <p className="text-xs text-text-secondary dark:text-text-secondary-dark mb-2.5 line-clamp-2">{task.description}</p>
        )}

        <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
          <span className={`badge ${priority.color} inline-flex items-center gap-1`}>
            <PriorityIcon className="w-3 h-3" />
            {priority.label}
          </span>
        </div>

        {task.dueDate && (
          <div className="flex items-center gap-1 mb-3">
            <Calendar className="w-3 h-3 text-text-secondary dark:text-text-secondary-dark" />
            <span className={`text-xs ${overdue ? "text-danger font-medium" : "text-text-secondary dark:text-text-secondary-dark"}`}>
              {formatDate(task.dueDate)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-end gap-1 pt-2 border-t border-border/50 dark:border-border-dark/50 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={(e) => { e.stopPropagation(); onEdit?.(task); }} className="p-1 rounded-lg hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary text-text-secondary hover:text-text-primary transition-colors" aria-label="Edit">
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete?.(task); }} className="p-1 rounded-lg hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary text-text-secondary hover:text-danger transition-colors" aria-label="Delete">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
