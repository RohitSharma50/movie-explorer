import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { useAuth } from "../context/AuthContext";

const FALLBACK_POSTER =
  "https://via.placeholder.com/300x450/16161f/6b7280?text=No+Poster";

const FavoritesPage = () => {
  const { user } = useAuth();
  const { favorites, loading, removeFavorite } = useFavorites();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="h-8 skeleton w-48 rounded mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="skeleton aspect-[2/3]" />
              <div className="p-3 space-y-2">
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-3 w-1/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* ── Header ──────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="font-display text-5xl text-gradient-gold tracking-wider">
          MY FAVORITES
        </h1>
        <p className="text-cinema-subtext mt-1 text-sm">
          {user?.username}'s saved movies ·{" "}
          <span className="text-cinema-accent font-medium">
            {favorites.length} {favorites.length === 1 ? "title" : "titles"}
          </span>
        </p>
      </div>

      {/* ── Empty state ──────────────────────────────────── */}
      {favorites.length === 0 && (
        <div className="text-center py-24 animate-fade-in">
          <p className="text-6xl mb-4">💔</p>
          <p className="text-cinema-subtext text-lg mb-2">No favorites yet</p>
          <p className="text-cinema-muted text-sm mb-8">
            Search for movies and tap the heart to save them here
          </p>
          <Link to="/" className="btn-gold">
            Discover Movies
          </Link>
        </div>
      )}

      {/* ── Favorites grid ───────────────────────────────── */}
      {favorites.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map((fav) => {
            const poster =
              fav.poster && fav.poster !== "N/A" ? fav.poster : FALLBACK_POSTER;

            return (
              <div
                key={fav.imdbId}
                className="card group relative hover:-translate-y-1 transition-all duration-300 hover:border-cinema-accent/50"
              >
                <Link to={`/movie/${fav.imdbId}`} className="block">
                  {/* Poster */}
                  <div className="relative overflow-hidden aspect-[2/3]">
                    <img
                      src={poster}
                      alt={fav.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = FALLBACK_POSTER;
                      }}
                    />
                    {/* IMDb rating badge */}
                    {fav.imdbRating && fav.imdbRating !== "N/A" && (
                      <div className="absolute bottom-2 left-2 bg-cinema-black/80 text-cinema-accent text-xs font-mono px-2 py-0.5 rounded flex items-center gap-1">
                        ⭐ {fav.imdbRating}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3
                      className="text-cinema-text font-medium text-sm leading-tight line-clamp-2 group-hover:text-cinema-accent transition-colors"
                      title={fav.title}
                    >
                      {fav.title}
                    </h3>
                    <p className="text-cinema-muted text-xs mt-1 font-mono">
                      {fav.year}
                    </p>
                    {fav.genre && fav.genre !== "N/A" && (
                      <p className="text-cinema-muted text-xs mt-0.5 line-clamp-1">
                        {fav.genre}
                      </p>
                    )}
                  </div>
                </Link>

                {/* Remove button — appears on hover */}
                <button
                  onClick={() => removeFavorite(fav.imdbId, fav.title)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-cinema-red/90 text-white
                    flex items-center justify-center opacity-0 group-hover:opacity-100
                    transition-all duration-200 hover:bg-cinema-red hover:scale-110"
                  title="Remove from favorites"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
