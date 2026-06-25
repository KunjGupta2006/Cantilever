import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import useTaskStore from "../../store/taskStore";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect } from "react";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { filters, setFilters, fetchTasks } = useTaskStore();
  const debouncedSearch = useDebounce(filters.search, 400);

  useEffect(() => {
    fetchTasks({ ...filters, search: debouncedSearch });
  }, [debouncedSearch, filters.status, filters.priority, filters.sort, filters.page]);

  const handleSearchChange = (value) => {
    setFilters({ search: value, page: 1 });
  };

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="lg:pl-64">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          searchValue={filters.search}
          onSearchChange={handleSearchChange}
        />
        <main className="p-4 lg:p-6 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
