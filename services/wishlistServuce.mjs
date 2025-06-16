import Wishlist from "../models/Wishlist.mjs";
import Game from "../models/Game.mjs"
import User from "../models/User.mjs"
//get wishlist by user
export const getWishlistByUser = async (userId) => {
  return await Wishlist.findOne({ user: userId }).populate("games");
};
//add to wishlist
export const addToWishlist = async (userId, gameId) => {
  const wishlist = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $addToSet: { games: gameId } },
    { new: true, upsert: true }
  );

  const user = await User.findById(userId).select("name");
  const game = await Game.findById(gameId).select("title");
  const wishlistObj = wishlist.toObject();
  delete wishlistObj.games;
  wishlistObj.userName = user?.name;
  wishlistObj.gameTitle = game?.title;
  return wishlistObj;
};

export const removeFromWishlist = async (userId, gameId) => {
  const wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) {
    return { message: "No wishlist found for this user." };
  }
  const isGameInWishlist = wishlist.games.includes(gameId);
  if (!isGameInWishlist) {
    return { message: "Game was not found in your wishlist." };
  }
  await Wishlist.findOneAndUpdate(
    { user: userId },
    { $pull: { games: gameId } },
    { new: true }
  );

  return { message: "Game has been removed from your wishlist successfully" };
};


