import catchAsync from "../utils/catchAsync.mjs";
import AppError from "../utils/appError.mjs";
import {
  placeOrder,
  getOrders,
  getAllOrders
} from "../services/orderService.mjs";

export const placeOrderController = catchAsync(async (req, res, next) => {
  const order = await placeOrder(req.user._id);
  if (!order) {
    return next(new AppError("Failed to place order", 500));
  }
  res.status(201).json({ message: "Order placed successfully", order });
});

export const getOrdersController = catchAsync(async (req, res, next) => {
  const orders = await getOrders(req.user._id);
  if (!orders || orders.length === 0) {
    return next(new AppError("No orders found for this user", 404));
  }
  res.status(200).json(orders);
});

export const getAllOrdersController = catchAsync(async (req, res, next) => {
  const orders = await getAllOrders();
  if (!orders || orders.length === 0) {
    return next(new AppError("No orders found in the system", 404));
  }
  res.status(200).json({
    message: "All orders retrieved successfully",
    orders,
  });
});