// ============================================================
// models/Favorite.js — Mongoose Favorite schema
// ============================================================
// Stores a user's favorited movies with key OMDb data
// so the favorites page works even without extra API calls.
// ============================================================

const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imdbId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    year: String,
    poster: String,   // URL string or "N/A"
    genre: String,
    imdbRating: String,
    type: {
      type: String,   // "movie", "series", "episode"
      default: "movie",
    },
  },
  {
    timestamps: true,
  }
);

// ── Compound unique index: one favorite per user per movie ─
favoriteSchema.index({ user: 1, imdbId: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
