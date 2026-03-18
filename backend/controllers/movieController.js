const axios = require("axios");

const OMDB_BASE = "https://www.omdbapi.com";

const omdbParams = (extra) => ({
  apikey: process.env.OMDB_API_KEY,
  ...extra,
});

const searchMovies = async (req, res) => {
  try {
    const { q, page = 1, type } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const params = omdbParams({ s: q.trim(), page });
    if (type && type !== "all") params.type = type; // movie | series | episode

    const { data } = await axios.get(OMDB_BASE, { params });

    if (data.Response === "False") {
      return res
        .status(404)
        .json({ message: data.Error || "No results found" });
    }

    // OMDb returns: { Search: [...], totalResults: "N", Response: "True" }
    res.json({
      results: data.Search,
      totalResults: parseInt(data.totalResults, 10),
      page: parseInt(page, 10),
      totalPages: Math.ceil(parseInt(data.totalResults, 10) / 10),
    });
  } catch (error) {
    console.error("Search error:", error.message);
    res.status(500).json({ message: "Failed to fetch movies from OMDb" });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { imdbId } = req.params;

    if (!imdbId || !imdbId.startsWith("tt")) {
      return res.status(400).json({ message: "Invalid IMDb ID" });
    }

    const params = omdbParams({ i: imdbId, plot: "full" });
    const { data } = await axios.get(OMDB_BASE, { params });

    if (data.Response === "False") {
      return res.status(404).json({ message: data.Error || "Movie not found" });
    }

    res.json(data);
  } catch (error) {
    console.error("Get movie error:", error.message);
    res.status(500).json({ message: "Failed to fetch movie details" });
  }
};

module.exports = { searchMovies, getMovieById };
