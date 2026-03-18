import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { useFavorites } from "../hooks/useFavorites";
import { useAuth } from "../context/AuthContext";

const FALLBACK_POSTER = "https://placehold.co/300x450?text=No+Poster";

const Badge = ({ label, value }) => {
  if (!value || value === "N/A") return null;
  return (
    <div className="bg-cinema-dark border border-cinema-border rounded-lg px-4 py-3 text-center">
      <p className="text-cinema-muted text-xs mb-1 uppercase tracking-wider font-mono">
        {label}
      </p>
      <p className="text-cinema-text font-semibold text-sm">{value}</p>
    </div>
  );
};

const Pill = ({ text }) => (
  <span className="inline-block bg-cinema-dark border border-cinema-border text-cinema-subtext text-xs px-3 py-1 rounded-full">
    {text.trim()}
  </span>
);

const MovieDetailPage = () => {
  const { imdbId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isFavorited, toggleFavorite } = useFavorites();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError("");

      try {
        const API_KEY = import.meta.env.VITE_API_KEY;

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbId}`,
        );

        const data = await res.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError("Failed to load movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [imdbId]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 animate-pulse">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="skeleton w-full md:w-72 h-[430px] rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-4 pt-2">
            <div className="skeleton h-10 w-3/4 rounded" />
            <div className="skeleton h-5 w-1/4 rounded" />
            <div className="skeleton h-4 w-full rounded mt-4" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-2/3 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">😕</p>
        <p className="text-cinema-subtext text-lg mb-6">{error}</p>
        <button onClick={() => navigate(-1)} className="btn-ghost">
          ← Go Back
        </button>
      </div>
    );
  }

  if (!movie) return null;

  const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER;

  const genres = movie.Genre !== "N/A" ? movie.Genre?.split(",") : [];
  const favorited = isFavorited(movie.imdbID);

  const ratings = movie.Ratings || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-cinema-subtext hover:text-cinema-accent transition-colors mb-8 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">
          ←
        </span>
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-shrink-0 w-full md:w-72">
          <div className="relative rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <img
              src={poster}
              alt={movie.Title}
              className="w-full object-cover"
              onError={(e) => {
                e.target.src = FALLBACK_POSTER;
              }}
            />
            {favorited && (
              <div className="absolute inset-0 rounded-xl border-2 border-cinema-accent pointer-events-none" />
            )}
          </div>

          {isAuthenticated && (
            <button
              onClick={() => toggleFavorite(movie)}
              className={`mt-4 w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200
                ${
                  favorited
                    ? "bg-cinema-accent text-cinema-black hover:bg-cinema-accent-hover"
                    : "border border-cinema-border text-cinema-subtext hover:border-cinema-accent hover:text-cinema-accent"
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={favorited ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
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
              {favorited ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          )}

          {!isAuthenticated && (
            <p className="mt-4 text-center text-cinema-muted text-xs">
              <Link to="/login" className="text-cinema-accent hover:underline">
                Log in
              </Link>{" "}
              to save favorites
            </p>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-2">
            {movie.Type && movie.Type !== "movie" && (
              <span className="text-cinema-accent text-xs font-mono uppercase tracking-widest">
                {movie.Type}
              </span>
            )}
            <h1 className="font-display text-5xl sm:text-6xl text-cinema-text leading-tight tracking-wide mt-1">
              {movie.Title}
            </h1>
            <div className="flex items-center gap-3 mt-2 text-cinema-subtext text-sm font-mono flex-wrap">
              <span>{movie.Year}</span>
              {movie.Rated && movie.Rated !== "N/A" && (
                <>
                  <span className="text-cinema-border">·</span>
                  <span className="border border-cinema-border px-1.5 py-0.5 rounded text-xs">
                    {movie.Rated}
                  </span>
                </>
              )}
              {movie.Runtime && movie.Runtime !== "N/A" && (
                <>
                  <span className="text-cinema-border">·</span>
                  <span>{movie.Runtime}</span>
                </>
              )}
              {movie.totalSeasons && (
                <>
                  <span className="text-cinema-border">·</span>
                  <span>{movie.totalSeasons} seasons</span>
                </>
              )}
            </div>
          </div>

          {/* Genres */}
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {genres.map((g) => (
                <Pill key={g} text={g} />
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <Badge
              label="IMDb Rating"
              value={
                movie.imdbRating !== "N/A" ? `⭐ ${movie.imdbRating}/10` : null
              }
            />
            <Badge label="IMDb Votes" value={movie.imdbVotes} />
            <Badge label="Released" value={movie.Released} />
            <Badge label="Country" value={movie.Country} />
          </div>

          {ratings.length > 0 && (
            <div className="flex gap-3 mt-4 flex-wrap">
              {ratings.map((r) => (
                <div
                  key={r.Source}
                  className="bg-cinema-dark border border-cinema-border rounded-lg px-4 py-2"
                >
                  <p className="text-cinema-muted text-xs font-mono">
                    {r.Source}
                  </p>
                  <p className="text-cinema-accent font-semibold text-sm mt-0.5">
                    {r.Value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {movie.Plot && movie.Plot !== "N/A" && (
            <div className="mt-6">
              <h2 className="text-cinema-muted text-xs uppercase tracking-widest font-mono mb-2">
                Plot
              </h2>
              <p className="text-cinema-subtext leading-relaxed">
                {movie.Plot}
              </p>
            </div>
          )}

          <div className="mt-6 space-y-3">
            {movie.Director && movie.Director !== "N/A" && (
              <div>
                <span className="text-cinema-muted text-xs uppercase tracking-widest font-mono">
                  Director ·{" "}
                </span>
                <span className="text-cinema-text text-sm">
                  {movie.Director}
                </span>
              </div>
            )}
            {movie.Writer && movie.Writer !== "N/A" && (
              <div>
                <span className="text-cinema-muted text-xs uppercase tracking-widest font-mono">
                  Writer ·{" "}
                </span>
                <span className="text-cinema-text text-sm">{movie.Writer}</span>
              </div>
            )}
            {movie.Actors && movie.Actors !== "N/A" && (
              <div>
                <span className="text-cinema-muted text-xs uppercase tracking-widest font-mono">
                  Cast ·{" "}
                </span>
                <span className="text-cinema-text text-sm">{movie.Actors}</span>
              </div>
            )}
            {movie.Language && movie.Language !== "N/A" && (
              <div>
                <span className="text-cinema-muted text-xs uppercase tracking-widest font-mono">
                  Language ·{" "}
                </span>
                <span className="text-cinema-text text-sm">
                  {movie.Language}
                </span>
              </div>
            )}
            {movie.Awards && movie.Awards !== "N/A" && (
              <div>
                <span className="text-cinema-muted text-xs uppercase tracking-widest font-mono">
                  Awards ·{" "}
                </span>
                <span className="text-cinema-accent text-sm">
                  🏆 {movie.Awards}
                </span>
              </div>
            )}
          </div>

          <a
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 btn-ghost text-sm py-2 px-4"
          >
            View on IMDb ↗
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
