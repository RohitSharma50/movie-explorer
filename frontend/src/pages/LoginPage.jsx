// ============================================================
// src/pages/LoginPage.jsx
// ============================================================
// Login form. On success redirects to the page the user
// tried to access, or to home.
// ============================================================

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect target after login
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-slide-up">

        {/* Card */}
        <div className="card p-8">
          <div className="text-center mb-8">
            <span className="text-4xl">🎬</span>
            <h1 className="font-display text-4xl text-gradient-gold tracking-wider mt-2">
              WELCOME BACK
            </h1>
            <p className="text-cinema-subtext text-sm mt-1">
              Sign in to access your favorites
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-cinema-red/10 border border-cinema-red/30 text-cinema-red text-sm rounded-lg px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-cinema-subtext text-sm mb-1.5 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="input-base"
              />
            </div>

            <div>
              <label className="block text-cinema-subtext text-sm mb-1.5 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="input-base"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-cinema-black/30 border-t-cinema-black rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-cinema-muted text-sm mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-cinema-accent hover:underline font-medium"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
