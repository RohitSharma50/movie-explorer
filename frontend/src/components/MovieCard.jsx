import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const FALLBACK_POSTER = "https://placehold.co/300x450?text=No+Poster";

const MovieCard = ({ movie, onToggleFavorite, isFavorited }) => {
  const { isAuthenticated } = useAuth();

  const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(movie);
  };

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="card group cursor-pointer hover:border-cinema-accent/50 hover:shadow-[0_4px_30px_rgba(232,197,71,0.1)] hover:-translate-y-1 transition-all duration-300 block"
    >
      <div className="relative overflow-hidden aspect-[2/3]">
        <img
          src={poster}
          alt={movie.Title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            if (e.target.src !== FALLBACK_POSTER) {
              e.target.src = FALLBACK_POSTER;
            }
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {movie.Type && movie.Type !== "movie" && (
          <span className="absolute top-2 left-2 bg-cinema-black/80 text-cinema-accent text-xs font-mono px-2 py-0.5 rounded capitalize">
            {movie.Type}
          </span>
        )}

        {isAuthenticated && (
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center
              transition-all duration-200 backdrop-blur-sm
              ${
                isFavorited
                  ? "bg-cinema-accent text-cinema-black scale-110"
                  : "bg-cinema-black/70 text-cinema-muted hover:text-cinema-accent hover:bg-cinema-black"
              }`}
            title={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isFavorited ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935
                   0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733
                   -4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9
                   12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="p-3">
        <h3
          className="text-cinema-text font-medium text-sm leading-tight line-clamp-2 group-hover:text-cinema-accent transition-colors duration-200"
          title={movie.Title}
        >
          {movie.Title}
        </h3>
        <p className="text-cinema-muted text-xs mt-1 font-mono">{movie.Year}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
