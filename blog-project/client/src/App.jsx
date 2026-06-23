import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home       from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import Login      from "./pages/Login";
import Signup     from "./pages/Signup";
import WriteBlog  from "./pages/WriteBlog";
import Authors    from "./pages/Authors";
import AuthorProfile from "./components/AuthorProfile.jsx";
import Profile    from "./pages/Profile";

// Redirect logged-out users away from protected pages
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// Redirect logged-in users away from auth pages
function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-cream)" }}>
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/blog/:id"    element={<BlogDetail />} />
          <Route path="/authors"     element={<Authors />} />
          <Route path="/authors/:id"     element={<AuthorProfile />} />

          <Route path="/login"  element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />

          <Route path="/write"   element={<ProtectedRoute><WriteBlog /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}