import Game from "../models/Game.mjs";
import "../models/Category.mjs";
import "../models/Review.mjs";
import AppError from "../utils/appError.mjs";

export const fetchGames = async (filters) => {
  const query = {};
  if (filters.genre)
    query.genre = { $regex: `^${filters.genre}$`, $options: "i" };
  if (filters.platform)
    query.platform = { $regex: `^${filters.platform}$`, $options: "i" };
  if (filters.title) query.title = { $regex: filters.title, $options: "i" };
  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = parseFloat(filters.minPrice);
    if (filters.maxPrice) query.price.$lte = parseFloat(filters.maxPrice);
  }

  const limit = 5;

  const page = filters.page || 1;
  const totalGames = await Game.countDocuments(query);
  const skip = (page - 1) * limit;

  if (totalGames === 0) {
    return {
      total: 0,
      page,
      pageSize: limit,
      games: [],
    };
  }

  if (page > Math.ceil(totalGames / limit))
    throw new AppError("page not found", 404);

  const games = await Game.find(query)
    .populate("category")
    .skip(skip)
    .limit(limit);

  return {
    total: totalGames,
    page,
    pageSize: limit,
    games: games.map((game) => ({
      ID: game._id,
      title: game.title,
      platform: game.platform,
      price: game.price,
      genre: game.genre,
      category: game.category?.name || null,
    })),
  };
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
