import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useTheme } from "./hooks/useTheme";
import { TopNavigation } from "./components/layouts/TopNavigation";
import { MobileBottomNav } from "./components/layouts/MobileBottomNav";
import { NotesPanel } from "./components/notes/NotesPanel";
import { ProtectedRoute, PublicRoute } from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

export default function App() {
  const { dark, toggle } = useTheme();

  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: dark ? "#18181B" : "#fff",
            color: dark ? "#FAFAFA" : "#18181B",
            border: dark ? "1px solid #3F3F46" : "1px solid #E4E4E7",
            fontSize: "13px",
            borderRadius: "12px",
          },
          success: { iconTheme: { primary: "#16A34A", secondary: "#fff" } },
          error: { iconTheme: { primary: "#DC2626", secondary: "#fff" } },
        }}
      />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-bg dark:bg-bg-dark">
                <TopNavigation dark={dark} onToggleTheme={toggle} />
                <main className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
                  <Outlet />
                </main>
                <MobileBottomNav />
                <NotesPanel />
              </div>
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard dark={dark} onToggleTheme={toggle} />} />
          <Route path="/tasks" element={<Dashboard dark={dark} onToggleTheme={toggle} />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
