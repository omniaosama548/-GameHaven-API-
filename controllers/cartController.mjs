import catchAsync from "../utils/catchAsync.mjs";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../services/cartService.mjs";

export const addToCartController = catchAsync(async (req, res, next) => {
  const { gameId, quantity } = req.body;
  const cart = await addToCart(req.user._id, gameId, quantity);
  res.status(200).json({ message: "Game added to cart", cart });
});

export const getCartController = catchAsync(async (req, res, next) => {
  const cart = await getCart(req.user._id);
  res.status(200).json(cart);
});

export const removeFromCartController = catchAsync(async (req, res, next) => {
  const { gameId } = req.params;
  const cart = await removeFromCart(req.user._id, gameId);
  res.status(200).json({ message: "Game removed from cart", cart });
});