import { motion } from "framer-motion";
import { ListTodo, CheckCircle2, Clock, TrendingUp } from "lucide-react";

const statCards = [
  {
    key: "total",
    label: "Total Tasks",
    icon: ListTodo,
    gradient: "from-primary/10 to-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle2,
    gradient: "from-success/10 to-success/5",
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  {
    key: "pending",
    label: "Pending",
    icon: Clock,
    gradient: "from-warning/10 to-warning/5",
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
  {
    key: "completionRate",
    label: "Completion Rate",
    icon: TrendingUp,
    gradient: "from-primary/10 to-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    suffix: "%",
  },
];

export function TaskStats({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        const value = stats[card.key] ?? 0;

        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`card p-4 lg:p-5 bg-gradient-to-br ${card.gradient}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${card.iconBg}`}>
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-text-primary">
              {value}
              {card.suffix}
            </p>
            <p className="text-sm text-text-secondary mt-1">{card.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
