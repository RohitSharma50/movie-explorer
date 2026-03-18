// ============================================================
// src/hooks/useFavorites.js
// ============================================================
// Manages favorites state globally — fetch, add, remove.
// Use this hook in any component that needs favorites data.
// ============================================================

import { useState, useEffect, useCallback } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export const useFavorites = () => {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // ── Fetch all favorites from backend ──────────────────────
  const fetchFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      setFavorites([]);
      return;
    }
    setLoading(true);
    try {
      const res = await api.get("/favorites");
      setFavorites(res.data.favorites);
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch on mount and when auth changes
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  // ── Check if a movie is already favorited ─────────────────
  const isFavorited = useCallback(
    (imdbId) => favorites.some((f) => f.imdbId === imdbId),
    [favorites]
  );

  // ── Add favorite ──────────────────────────────────────────
  // movie: { imdbID, Title, Year, Poster, Genre, imdbRating, Type }
  const addFavorite = useCallback(
    async (movie) => {
      if (!isAuthenticated) {
        toast.error("Please log in to save favorites");
        return;
      }
      try {
        const payload = {
          imdbId: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
          genre: movie.Genre,
          imdbRating: movie.imdbRating,
          type: movie.Type,
        };
        const res = await api.post("/favorites", payload);
        setFavorites((prev) => [res.data.favorite, ...prev]);
        toast.success(`"${movie.Title}" added to favorites`);
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to add favorite";
        toast.error(msg);
      }
    },
    [isAuthenticated]
  );

  // ── Remove favorite ───────────────────────────────────────
  const removeFavorite = useCallback(
    async (imdbId, title) => {
      try {
        await api.delete(`/favorites/${imdbId}`);
        setFavorites((prev) => prev.filter((f) => f.imdbId !== imdbId));
        toast.success(title ? `"${title}" removed from favorites` : "Removed from favorites");
      } catch (err) {
        toast.error("Failed to remove favorite");
      }
    },
    []
  );

  // ── Toggle (add if not favorited, remove if favorited) ────
  const toggleFavorite = useCallback(
    (movie) => {
      const id = movie.imdbID || movie.imdbId;
      if (isFavorited(id)) {
        removeFavorite(id, movie.Title || movie.title);
      } else {
        addFavorite(movie);
      }
    },
    [isFavorited, addFavorite, removeFavorite]
  );

  return {
    favorites,
    loading,
    isFavorited,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    refetch: fetchFavorites,
  };
};
