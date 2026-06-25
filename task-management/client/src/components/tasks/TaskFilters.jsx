import { Filter, ArrowUpDown } from "lucide-react";
import useTaskStore from "../../store/taskStore";

export function TaskFilters() {
  const { filters, setFilters } = useTaskStore();

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
  ];

  const priorityOptions = [
    { value: "", label: "All Priority" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const sortOptions = [
    { value: "-createdAt", label: "Newest First" },
    { value: "createdAt", label: "Oldest First" },
    { value: "dueDate", label: "Due Date" },
    { value: "priority", label: "Priority" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5 text-text-secondary text-sm">
        <Filter className="w-4 h-4" />
        <span>Filters:</span>
      </div>

      <select
        value={filters.status}
        onChange={(e) => setFilters({ status: e.target.value, page: 1 })}
        className="input-field w-auto min-w-[130px] text-sm py-2"
        aria-label="Filter by status"
      >
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        value={filters.priority}
        onChange={(e) => setFilters({ priority: e.target.value, page: 1 })}
        className="input-field w-auto min-w-[130px] text-sm py-2"
        aria-label="Filter by priority"
      >
        {priorityOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-1.5 text-text-secondary text-sm ml-2">
        <ArrowUpDown className="w-4 h-4" />
        <span>Sort:</span>
      </div>

      <select
        value={filters.sort}
        onChange={(e) => setFilters({ sort: e.target.value, page: 1 })}
        className="input-field w-auto min-w-[140px] text-sm py-2"
        aria-label="Sort by"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
