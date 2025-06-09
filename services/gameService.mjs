import Game from "../models/Game.mjs";
import "../models/Category.mjs";
import "../models/Review.mjs";

export const fetchGames = async (filters) => {
  const query = {};
  if (filters.genre) query.genre = filters.genre;
  if (filters.platform) query.platform = filters.platform;
  if (filters.title) query.title = { $regex: filters.title, $options: "i" };
  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = parseFloat(filters.minPrice);
    if (filters.maxPrice) query.price.$lte = parseFloat(filters.maxPrice);
  }

  const games = await Game.find(query).populate("category");

  return games.map((game) => ({
    ID: game._id,
    title: game.title,
    platform: game.platform,
    price: game.price,
    genre: game.genre,
    category: game.category?.name || null,
  }));
};

export const fetchGameById = async (id) => {
  const game = await Game.findById(id).populate("category").populate("reviews");

  return !game
    ? null
    : {
        ID: game._id,
        title: game.title,
        platform: game.platform,
        price: game.price,
        genre: game.genre,
        category: game.category?.name || null,
        reviews: game.reviews || [],
      };
};

export const createGame = async (data) => {
  const game = new Game(data);
  return await game.save();
};

export const updateGame = async (id, data) => {
  return await Game.findByIdAndUpdate(id, data, { new: true });
};

export const deleteGame = async (id) => {
  return await Game.findByIdAndDelete(id);
};
