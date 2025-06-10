import catchAsync from "../utils/catchAsync.mjs";
import {
  placeOrder,
  getOrders,
  getAllOrders
} from "../services/orderService.mjs";

export const placeOrderController = catchAsync(async (req, res, next) => {
  const order = await placeOrder(req.user._id);
  res.status(201).json({ message: "Order placed successfully", order });
});

export const getOrdersController = catchAsync(async (req, res, next) => {
  const orders = await getOrders(req.user._id);
  res.status(200).json(orders);
});

export const getAllOrdersController = catchAsync(async (req, res, next) => {
  const orders = await getAllOrders();
  res.status(200).json({
    message: "All orders retrieved successfully",
    orders,
  });
});