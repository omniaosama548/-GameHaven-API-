import Cart from "../models/Cart.mjs";
import Game from "../models/Game.mjs";
import AppError from "../utils/appError.mjs";

export const addToCart = async (userId, gameId, quantity = 1) => {
  const game = await Game.findById(gameId);
  if (!game) throw new AppError("Game not found", 404);

  if (game.stock < quantity) {
    throw new AppError("Insufficient stock", 400);
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.game.toString() === gameId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ game: gameId, quantity });
  }

  await cart.save();
  return cart;
};

export const getCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.game");
  if (!cart) throw new AppError("Cart not found", 404);
  return cart;
};

export const removeFromCart = async (userId, gameId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new AppError("Cart not found", 404);

  cart.items = cart.items.filter((item) => item.game.toString() !== gameId);
  await cart.save();
  return cart;
};