// ============================================================
// src/components/Navbar.jsx
// ============================================================

import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-cinema-accent"
        : "text-cinema-subtext hover:text-cinema-text"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-cinema-dark/90 backdrop-blur-md border-b border-cinema-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ───────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🎬</span>
            <span className="font-display text-2xl text-gradient-gold tracking-wider">
              MOVIE EXPLORER
            </span>
          </Link>

          {/* ── Desktop Nav ────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" end className={navLinkClass}>
              Search
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/favorites" className={navLinkClass}>
                Favorites
              </NavLink>
            )}
          </div>

          {/* ── Auth section ───────────────────────────────── */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-cinema-subtext">
                  Hey,{" "}
                  <span className="text-cinema-accent font-medium">
                    {user?.username}
                  </span>
                </span>
                <button onClick={handleLogout} className="btn-ghost text-sm py-2 px-4">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-cinema-subtext hover:text-cinema-text transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-gold text-sm py-2 px-4">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile menu button ─────────────────────────── */}
          <button
            className="md:hidden text-cinema-subtext hover:text-cinema-text p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 space-y-1">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile menu ────────────────────────────────────── */}
      {menuOpen && (
        <div className="md:hidden border-t border-cinema-border bg-cinema-dark animate-fade-in">
          <div className="px-4 py-4 space-y-4">
            <NavLink
              to="/"
              end
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Search
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/favorites"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Favorites
              </NavLink>
            )}
            <div className="pt-2 border-t border-cinema-border space-y-3">
              {isAuthenticated ? (
                <>
                  <p className="text-sm text-cinema-subtext">
                    Logged in as{" "}
                    <span className="text-cinema-accent">{user?.username}</span>
                  </p>
                  <button onClick={handleLogout} className="btn-ghost w-full text-sm py-2">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block btn-ghost text-sm py-2 text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block btn-gold text-sm py-2 text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
