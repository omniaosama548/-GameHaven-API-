import Wishlist from "../models/Wishlist.mjs";
import Game from "../models/Game.mjs"
import User from "../models/User.mjs"
import AppError from "../utils/appError.mjs";

//get wishlist by user
export const getWishlistByUser = async (userId) => {
  const wishlist = await Wishlist.findOne({ user: userId }).populate("games");
  if (!wishlist) {
    throw new AppError("No wishlist found for this user.", 404);
  }
  return wishlist;
};

//add to wishlist
export const addToWishlist = async (userId, gameId) => {
  const game = await Game.findById(gameId);
  if (!game) {
    throw new AppError("Game not found", 404);
  }

  const wishlist = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $addToSet: { games: gameId } },
    { new: true, upsert: true }
  );

  const user = await User.findById(userId).select("name");

  const wishlistObj = wishlist.toObject();
  delete wishlistObj.games;
  wishlistObj.userName = user?.name;
  wishlistObj.gameTitle = game?.title;

  return wishlistObj;
};

// Remove from wishlist
export const removeFromWishlist = async (userId, gameId) => {
  const wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    throw new AppError("No wishlist found for this user.", 404);
  }

  const isGameInWishlist = wishlist.games.includes(gameId);
  if (!isGameInWishlist) {
    throw new AppError("Game was not found in your wishlist.", 404);
  }

  await Wishlist.findOneAndUpdate(
    { user: userId },
    { $pull: { games: gameId } },
    { new: true }
  );

  return { message: "Game has been removed from your wishlist successfully" };
};


