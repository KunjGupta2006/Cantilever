import { motion } from "framer-motion";
import { Edit3, Trash2, Circle, CheckCircle2, Clock, ArrowUp, ArrowDown, Minus, Calendar } from "lucide-react";
import { formatDate, isOverdue } from "../../utils/formatDate";

const priorityConfig = {
  low: { label: "Low", color: "text-success bg-success/10", icon: ArrowDown },
  medium: { label: "Medium", color: "text-warning bg-warning/10", icon: Minus },
  high: { label: "High", color: "text-danger bg-danger/10", icon: ArrowUp },
};

const statusConfig = {
  todo: { label: "To Do", color: "text-warning bg-warning/10" },
  "in-progress": { label: "In Progress", color: "text-accent bg-accent/10" },
  completed: { label: "Completed", color: "text-success bg-success/10" },
  pending: { label: "To Do", color: "text-warning bg-warning/10" },
};

export function ListView({ tasks, onEdit, onDelete, onToggleStatus, hasActiveFilters }) {
  if (tasks.length === 0) {
    return (
      <div className="card p-12 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-surface-secondary dark:bg-surface-dark-secondary rounded-xl flex items-center justify-center mb-3">
          <ListTodoIcon className="w-6 h-6 text-text-secondary dark:text-text-secondary-dark" />
        </div>
        {hasActiveFilters ? (
          <>
            <h3 className="font-semibold text-text-primary dark:text-text-primary-dark mb-1">No matching tasks</h3>
            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">Try adjusting your search or filters.</p>
          </>
        ) : (
          <>
            <h3 className="font-semibold text-text-primary dark:text-text-primary-dark mb-1">No tasks yet</h3>
            <p className="text-sm text-text-secondary dark:text-text-secondary-dark">Start by creating your first task.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border dark:border-border-dark">
              <th className="text-left text-xs font-medium text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider px-4 py-3 w-8"></th>
              <th className="text-left text-xs font-medium text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider px-4 py-3">Task</th>
              <th className="text-left text-xs font-medium text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider px-4 py-3 hidden md:table-cell">Priority</th>
              <th className="text-left text-xs font-medium text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Status</th>
              <th className="text-left text-xs font-medium text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Due Date</th>
              <th className="text-left text-xs font-medium text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Created</th>
              <th className="text-right text-xs font-medium text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => {
              const priority = priorityConfig[task.priority] || priorityConfig.medium;
              const status = statusConfig[task.status] || statusConfig.todo;
              const overdue = isOverdue(task.dueDate) && task.status !== "completed";
              const PriorityIcon = priority.icon;

              return (
                <motion.tr
                  key={task._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b border-border/50 dark:border-border-dark/50 hover:bg-surface-secondary/50 dark:hover:bg-surface-dark-secondary/50 transition-colors group"
                >
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onToggleStatus?.(task)}
                      className={`transition-colors ${task.status === "completed" ? "text-success" : "text-text-secondary dark:text-text-secondary-dark hover:text-success"}`}
                      aria-label="Toggle status"
                    >
                      {task.status === "completed" ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className={`text-sm font-medium ${task.status === "completed" ? "line-through text-text-secondary dark:text-text-secondary-dark" : "text-text-primary dark:text-text-primary-dark"}`}>
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-xs text-text-secondary dark:text-text-secondary-dark mt-0.5 line-clamp-1">{task.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`badge ${priority.color} inline-flex items-center gap-1`}>
                      <PriorityIcon className="w-3 h-3" />
                      {priority.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`badge ${status.color}`}>{status.label}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {task.dueDate ? (
                      <span className={`text-xs flex items-center gap-1 ${overdue ? "text-danger font-medium" : "text-text-secondary dark:text-text-secondary-dark"}`}>
                        <Calendar className="w-3 h-3" />
                        {formatDate(task.dueDate)}
                      </span>
                    ) : (
                      <span className="text-xs text-text-secondary/50 dark:text-text-secondary-dark/50">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs text-text-secondary dark:text-text-secondary-dark">{formatDate(task.createdAt)}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => onEdit?.(task)} className="p-1.5 rounded-lg hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark transition-colors" aria-label="Edit">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => onDelete?.(task)} className="p-1.5 rounded-lg hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary text-text-secondary dark:text-text-secondary-dark hover:text-danger transition-colors" aria-label="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ListTodoIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  );
}
