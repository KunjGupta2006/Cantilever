import { Search, Bell, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import useAuthStore from "../../store/authStore";

export function Header({ onMenuClick, searchValue, onSearchChange }) {
  const { user, logout } = useAuthStore();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-text-primary" />
          </button>

          <div className="hidden sm:flex items-center relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-64 lg:w-80 pl-10 pr-4 py-2 rounded-lg border border-border bg-surface text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        {showSearch && (
          <div className="sm:hidden flex-1 mx-3">
            <div className="flex items-center relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-text-secondary" />
          </button>

          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-text-secondary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
          </button>

          <div className="hidden sm:flex items-center gap-3 ml-2 pl-3 border-l border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-medium text-text-primary hidden md:block">
                {user?.name}
              </span>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4 text-text-secondary" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
