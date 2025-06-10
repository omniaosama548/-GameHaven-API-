import Wishlist from "../models/Wishlist.mjs";
//get wishlist by user
export const getWishlistByUser = async (userId) => {
  return await Wishlist.findOne({ user: userId }).populate("games");
};
//add to wishlist
export const addToWishlist = async (userId, gameId) => {
  return await Wishlist.findOneAndUpdate(
    { user: userId },
    { $addToSet: { games: gameId } },
    { new: true, upsert: true }
  ).populate("games", "title"); 
};

//remove from wishlist
export const removeFromWishlist = async (userId, gameId) => {
  return await Wishlist.findOneAndUpdate(
    { user: userId },
    { $pull: { games: gameId } },
    { new: true }
  );
};
