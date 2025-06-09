import Order from "../models/Order.mjs";
import Cart from "../models/Cart.mjs";
import Game from "../models/Game.mjs";
import AppError from "../utils/appError.mjs";

export const placeOrder = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.game");
  if (!cart || cart.items.length === 0) {
    throw new AppError("Cart is empty", 400);
  }

  let totalPrice = 0;
  const orderItems = [];

  for (const item of cart.items) {
    const game = await Game.findById(item.game._id);

    if (game.stock < item.quantity) {
      throw new AppError(`Insufficient stock for ${game.title}`, 400);
    }

    game.stock -= item.quantity;
    await game.save();

    totalPrice += game.price * item.quantity;

    orderItems.push({
      game: game._id,
      quantity: item.quantity,
      price: game.price,
    });
  }

  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalPrice,
  });

  await cart.deleteOne();

  return order;
};

export const getOrders = async (userId) => {
  const orders = await Order.find({ user: userId }).populate("items.game");
  return orders;
};

export const getAllOrders = async () => {
  const orders = await Order.find({})
    .populate("user", "name email")
    .populate("items.game", "title price");
  return orders;
};