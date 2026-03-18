// Wrap any route that requires login.
// Redirects unauthenticated users to /login.
// Shows a spinner while auth state is being restored.

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Still restoring session from localStorage
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-2 border-cinema-border border-t-cinema-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Save the attempted URL so we can redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
