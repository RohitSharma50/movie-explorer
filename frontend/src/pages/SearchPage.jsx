import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/api";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import Pagination from "../components/Pagination";
import { useFavorites } from "../hooks/useFavorites";

const TYPES = [
  { label: "All", value: "all" },
  { label: "Movies", value: "movie" },
  { label: "Series", value: "series" },
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [type, setType] = useState(searchParams.get("type") || "all");
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1"),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const { isFavorited, toggleFavorite } = useFavorites();
  const inputRef = useRef(null);
  const API_KEY = import.meta.env.VITE_API_KEY;
  // ── Perform search ────────────────────────────────────────
  const performSearch = useCallback(
    async (q, t, page) => {
      if (!q.trim()) return;

      setLoading(true);
      setError("");
      setHasSearched(true);

      try {
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${q}&page=${page}${
          t !== "all" ? `&type=${t}` : ""
        }`;

        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        if (data.Response === "True") {
          setResults(data.Search);
          setTotalResults(Number(data.totalResults));
          setTotalPages(Math.ceil(data.totalResults / 10));
          setCurrentPage(page);
        } else {
          setError(data.Error);
          setResults([]);
          setTotalResults(0);
          setTotalPages(0);
        }

        setSearchParams({ q, type: t, page });
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [setSearchParams],
  );

  // ── Handlers ──────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    performSearch(query, type, 1);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setCurrentPage(1);
    if (query.trim()) performSearch(query, newType, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    performSearch(query, type, page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Hero / search area ───────────────────────────── */}
      <div className="text-center mb-10 animate-fade-in">
        {!hasSearched && (
          <>
            <h1 className="font-display text-6xl sm:text-8xl text-gradient-gold tracking-widest mb-3">
              DISCOVER
            </h1>
            <p className="text-cinema-subtext text-lg mb-8">
              Search millions of movies and series
            </p>
          </>
        )}

        {/* Search form */}
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cinema-muted">
              🔍
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie or series…"
              className="input-base pl-10"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Search
          </button>
        </form>

        {/* Type filter */}
        {hasSearched && (
          <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
            {TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => handleTypeChange(t.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  type === t.value
                    ? "bg-cinema-accent text-cinema-black border-cinema-accent"
                    : "border-cinema-border text-cinema-subtext hover:border-cinema-accent hover:text-cinema-accent"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Results count ────────────────────────────────── */}
      {hasSearched && !loading && !error && totalResults > 0 && (
        <p className="text-cinema-subtext text-sm mb-6">
          Found{" "}
          <span className="text-cinema-accent font-semibold">
            {totalResults.toLocaleString()}
          </span>{" "}
          results for{" "}
          <span className="text-cinema-text font-medium">"{query}"</span>
        </p>
      )}

      {/* ── Loading skeleton grid ─────────────────────────── */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* ── Error state ──────────────────────────────────── */}
      {!loading && error && (
        <div className="text-center py-20 animate-fade-in">
          <p className="text-5xl mb-4">🎭</p>
          <p className="text-cinema-subtext text-lg">{error}</p>
          <p className="text-cinema-muted text-sm mt-2">
            Try a different search term
          </p>
        </div>
      )}

      {/* ── Empty state (searched but no results) ────────── */}
      {!loading && !error && hasSearched && results.length === 0 && (
        <div className="text-center py-20 animate-fade-in">
          <p className="text-5xl mb-4">🍿</p>
          <p className="text-cinema-subtext">No results found</p>
        </div>
      )}

      {/* ── Landing empty state ───────────────────────────── */}
      {!hasSearched && (
        <div className="text-center py-16 animate-fade-in">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-md mx-auto opacity-20 mb-10 pointer-events-none select-none">
            {["🎬", "🎥", "🍿", "⭐", "🎭", "🏆"].map((e, i) => (
              <span key={i} className="text-4xl text-center">
                {e}
              </span>
            ))}
          </div>
          <p className="text-cinema-muted text-sm">
            Try searching for <span className="text-cinema-accent">Batman</span>
            , <span className="text-cinema-accent">Inception</span>, or{" "}
            <span className="text-cinema-accent">Breaking Bad</span>
          </p>
        </div>
      )}

      {/* ── Results grid ─────────────────────────────────── */}
      {!loading && results.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fade-in">
            {results.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isFavorited={isFavorited(movie.imdbID)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default SearchPage;
