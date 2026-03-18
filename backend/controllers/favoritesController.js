const Favorite = require("../models/Favorite");

const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ favorites });
  } catch (error) {
    console.error("Get favorites error:", error);
    res.status(500).json({ message: "Failed to fetch favorites" });
  }
};

const addFavorite = async (req, res) => {
  try {
    const { imdbId, title, year, poster, genre, imdbRating, type } = req.body;

    if (!imdbId || !title) {
      return res.status(400).json({ message: "imdbId and title are required" });
    }

    const existing = await Favorite.findOne({
      user: req.user._id,
      imdbId,
    });
    if (existing) {
      return res.status(400).json({ message: "Movie already in favorites" });
    }

    const favorite = await Favorite.create({
      user: req.user._id,
      imdbId,
      title,
      year,
      poster,
      genre,
      imdbRating,
      type,
    });

    res.status(201).json({
      message: "Added to favorites",
      favorite,
    });
  } catch (error) {
    console.error("Add favorite error:", error);
    res.status(500).json({ message: "Failed to add favorite" });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { imdbId } = req.params;

    const deleted = await Favorite.findOneAndDelete({
      user: req.user._id,
      imdbId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.json({ message: "Removed from favorites" });
  } catch (error) {
    console.error("Remove favorite error:", error);
    res.status(500).json({ message: "Failed to remove favorite" });
  }
};

const checkFavorite = async (req, res) => {
  try {
    const { imdbId } = req.params;
    const favorite = await Favorite.findOne({ user: req.user._id, imdbId });
    res.json({ isFavorited: !!favorite });
  } catch (error) {
    console.error("Check favorite error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getFavorites, addFavorite, removeFavorite, checkFavorite };
