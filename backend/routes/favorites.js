// ============================================================
// routes/favorites.js — Favorites routes (all protected)
// ============================================================
// GET    /api/favorites              → list user's favorites
// POST   /api/favorites              → add favorite
// DELETE /api/favorites/:imdbId      → remove favorite
// GET    /api/favorites/:imdbId/check → check if favorited
// ============================================================

const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
} = require("../controllers/favoritesController");

// All favorites routes require authentication
router.use(protect);

router.get("/", getFavorites);
router.post("/", addFavorite);
router.delete("/:imdbId", removeFavorite);
router.get("/:imdbId/check", checkFavorite);

module.exports = router;
