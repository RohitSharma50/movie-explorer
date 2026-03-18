// GET /api/movies/search?q=batman&page=1&type=movie
// GET /api/movies/:imdbId
//
// Note: These routes are PUBLIC — no auth required for search.

const express = require("express");
const router = express.Router();
const {
  searchMovies,
  getMovieById,
} = require("../controllers/movieController");

router.get("/search", searchMovies);
router.get("/:imdbId", getMovieById);

module.exports = router;
