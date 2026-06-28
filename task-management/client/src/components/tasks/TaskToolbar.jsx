import { Search, Plus, LayoutList, Columns3, X } from "lucide-react";
import useTaskStore from "../../store/taskStore";

export function TaskToolbar({ viewMode, onViewModeChange, onCreate }) {
  const { filters, setFilters } = useTaskStore();

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "todo", label: "To Do" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const priorityOptions = [
    { value: "", label: "All Priority" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const sortOptions = [
    { value: "-createdAt", label: "Newest" },
    { value: "createdAt", label: "Oldest" },
    { value: "dueDate", label: "Due Date" },
    { value: "priority", label: "Priority" },
  ];

  return (
    <div className="card p-3 flex flex-wrap items-center gap-3 sticky top-[72px] z-20 bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary dark:text-text-secondary-dark" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value, page: 1 })}
          className="h-10 w-full pl-9 pr-8 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
        />
        {filters.search && (
          <button
            onClick={() => setFilters({ search: "", page: 1 })}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <select
        value={filters.status}
        onChange={(e) => setFilters({ status: e.target.value, page: 1 })}
        className="h-10 px-3 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-sm text-primary dark:text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Status filter"
      >
        {statusOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <select
        value={filters.priority}
        onChange={(e) => setFilters({ priority: e.target.value, page: 1 })}
        className="h-10 px-3 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-sm text-primary dark:text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Priority filter"
      >
        {priorityOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <select
        value={filters.sort}
        onChange={(e) => setFilters({ sort: e.target.value, page: 1 })}
        className="h-10 px-3 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-sm text-primary dark:text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Sort by"
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <div className="flex items-center border-l border-border dark:border-border-dark pl-3 gap-1">
        <button
          onClick={() => onViewModeChange("list")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-surface-secondary dark:bg-surface-dark-secondary text-primary dark:text-primary-dark" : "text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary"}`}
              aria-label="List view"
        >
          <LayoutList className="w-4 h-4" />
        </button>
        <button
          onClick={() => onViewModeChange("board")}
              className={`p-2 rounded-lg transition-colors ${viewMode === "board" ? "bg-surface-secondary dark:bg-surface-dark-secondary text-primary dark:text-primary-dark" : "text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary"}`}
              aria-label="Board view"
        >
          <Columns3 className="w-4 h-4" />
        </button>
      </div>

      <button onClick={onCreate} className="btn-primary flex items-center gap-1.5 h-10">
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">Create Task</span>
      </button>
    </div>
  );
}
