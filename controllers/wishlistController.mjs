import catchAsync from '../utils/catchAsync.mjs';
import AppError from '../utils/appError.mjs'; 
import * as wishlistService from '../services/wishlistServuce.mjs';

export const getWishlist = catchAsync(async (req, res) => {
  const wishlist = await wishlistService.getWishlistByUser(req.user._id);
  if (!wishlist) {
    return res.json({ user: req.user._id, games: [] });
  }
  res.json(wishlist);
});


export const addWishlistItem = catchAsync(async (req, res, next) => {
  const { gameId } = req.body;
  if (!gameId) {
    return next(new AppError("Game ID is required", 400));
  }
  const wishlist = await wishlistService.addToWishlist(req.user._id, gameId);
  res.status(200).json(wishlist);
});

export const removeWishlistItem = catchAsync(async (req, res, next) => {
  const { gameId } = req.body;
  if (!gameId) {
    return next(new AppError("Game ID is required to remove", 400));
  }
  const wishlist = await wishlistService.removeFromWishlist(req.user._id, gameId);
  if (!wishlist) {
    return next(new AppError("Wishlist not found or game not in wishlist", 404));
  }

  res.status(200).json({
    message:"game deleted successfully",
    data:wishlist
  });
});
