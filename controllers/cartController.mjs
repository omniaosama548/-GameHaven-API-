import catchAsync from "../utils/catchAsync.mjs";
import AppError from "../utils/appError.mjs";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../services/cartService.mjs";

export const addToCartController = catchAsync(async (req, res, next) => {
  const { gameId, quantity } = req.body;
  if (!gameId) {
    return next(new AppError("Game ID is required", 400));
  }
  const cart = await addToCart(req.user._id, gameId, quantity);
  res.status(200).json({ message: "Game added to cart", cart });
});

export const getCartController = catchAsync(async (req, res, next) => {
  const cart = await getCart(req.user._id);
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }
  res.status(200).json(cart);
});

export const removeFromCartController = catchAsync(async (req, res, next) => {
  const { gameId } = req.params;
  if (!gameId) {
    return next(new AppError("Game ID is required to remove", 400));
  }
  const cart = await removeFromCart(req.user._id, gameId);
  res.status(200).json({ message: "Game removed from cart", cart });
});