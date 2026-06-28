import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  Search,
  Sun,
  Moon,
  LogOut,
  User,
  ChevronDown,
  KanbanSquare,
  Menu,
  FileText,
  X,
} from "lucide-react";
import useAuthStore from "../../store/authStore";
import useTaskStore from "../../store/taskStore";
import useNoteStore from "../../store/noteStore";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/tasks", label: "Tasks", icon: ListTodo },
];

export function TopNavigation({ dark, onToggleTheme }) {
  const { user, logout } = useAuthStore();
  const { filters, setFilters } = useTaskStore();
  const { togglePanel } = useNoteStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.search || "");
  const profileRef = useRef(null);
  const searchTimer = useRef(null);

  const handleSearchChange = useCallback((value) => {
    setLocalSearch(value);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setFilters({ search: value, page: 1 });
    }, 300);
  }, [setFilters]);

  useEffect(() => {
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        const tag = e.target.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA") {
          e.preventDefault();
          document.getElementById("global-search")?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    setLocalSearch(filters.search || "");
  }, [filters.search]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-xl border-b border-border dark:border-border-dark">
        <div className="flex items-center justify-between h-[72px] px-4 lg:px-6">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark transition-colors"
              aria-label="Menu"
            >
              {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <KanbanSquare className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-semibold text-lg hidden sm:block text-text-primary dark:text-text-primary-dark">TaskFlow</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link text-primary dark:bg-neutral-200 ${isActive(item.path) ? "active" : ""}`}
                >
                  <item.icon className="w-4 h-4 " />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className={`relative transition-all duration-150 hidden sm:block ${searchFocused ? "w-72" : "w-60"}`}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary dark:text-text-secondary-dark" />
              <input
                id="global-search"
                type="text"
                placeholder="Search tasks...  /"
                value={localSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full h-10 pl-9 pr-8 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-dark-secondary text-sm text-text-primary dark:text-text-primary-dark placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              />
              {localSearch && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? (
                <Sun className="w-4.5 h-4.5" />
              ) : (
                <Moon className="w-4.5 h-4.5" />
              )}
            </button>

            <button
              onClick={togglePanel}
              className="p-2 rounded-lg hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark transition-colors"
              aria-label="Notes"
            >
              <FileText className="w-4.5 h-4.5" />
            </button>

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary transition-colors"
              >
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-accent">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium hidden lg:block text-text-primary dark:text-text-primary-dark">
                  {user?.name}
                </span>
                <ChevronDown className="w-4 h-4 text-text-secondary dark:text-text-secondary-dark hidden lg:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-card shadow-strong py-1 z-50">
                  <div className="px-4 py-3 border-b border-border dark:border-border-dark">
                    <p className="text-sm font-medium text-text-primary dark:text-text-primary-dark">{user?.name}</p>
                    <p className="text-xs text-text-secondary dark:text-text-secondary-dark mt-0.5">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => { navigate("/profile"); setProfileOpen(false); }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-danger hover:bg-danger/5 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile navigation drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-20 lg:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setMobileDrawerOpen(false)} />
          <div className="relative top-[72px] bg-surface dark:bg-surface-dark border-b border-border dark:border-border-dark shadow-medium">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "bg-surface-secondary dark:bg-surface-dark-secondary text-text-primary dark:text-text-primary-dark"
                      : "text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary"
                  }`}
                >
                  <item.icon className="w-4.5 h-4.5" />
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="px-4 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary dark:text-text-secondary-dark" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={localSearch}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 rounded-lg border border-border dark:border-border-dark bg-surface-secondary dark:bg-surface-dark-secondary text-sm text-text-primary dark:text-text-primary-dark placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
