// ============================================================
// src/App.jsx — Root component with all routes
// ============================================================

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import SearchPage from "./pages/SearchPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const { loading } = useAuth();

  // Don't render routes until auth state is restored
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-2 border-cinema-border border-t-cinema-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:imdbId" element={<MovieDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes */}
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-cinema-border py-6 text-center text-cinema-muted text-xs font-mono">
        <span className="text-cinema-accent">MOVIE EXPLORER</span> · Powered by{" "}
        <a
          href="https://www.omdbapi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cinema-accent transition-colors"
        >
          OMDb API
        </a>
      </footer>
    </div>
  );
};

export default App;
