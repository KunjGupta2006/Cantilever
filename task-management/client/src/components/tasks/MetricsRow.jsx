import { motion } from "framer-motion";
import { ListTodo, CheckCircle2, Clock, TrendingUp, BarChart3 } from "lucide-react";

const metrics = [
  {
    key: "total",
    label: "Total Tasks",
    icon: ListTodo,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    key: "pending",
    label: "To Do",
    icon: Clock,
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    key: "inProgress",
    label: "In Progress",
    icon: BarChart3,
    color: "text-accent",
    bg: "bg-accent/5",
  },
  {
    key: "completionRate",
    label: "Productivity",
    icon: TrendingUp,
    color: "text-success",
    bg: "bg-success/10",
    suffix: "%",
  },
];

export function MetricsRow({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {metrics.map((m, i) => {
        const Icon = m.icon;
        const value = stats[m.key] ?? 0;
        return (
          <motion.div
            key={m.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.2 }}
            className="card p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${m.bg}`}>
                <Icon className={`w-4 h-4 ${m.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">
              {value}{m.suffix || ""}
            </p>
            <p className="text-xs text-text-secondary dark:text-text-secondary-dark mt-0.5">{m.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
