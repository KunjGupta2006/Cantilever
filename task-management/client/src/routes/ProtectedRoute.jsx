import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

export function ProtectedRoute({ children }) {
  const { token } = useAuthStore();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export function PublicRoute({ children }) {
  const { token } = useAuthStore();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
