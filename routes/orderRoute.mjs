import express from "express";
import {
  placeOrderController,
  getOrdersController,
} from "../controllers/orderController.mjs";
import { isAuthenticated } from "../middlewares/authMiddleware.mjs";

const orderRouter = express.Router();

orderRouter.use(isAuthenticated);
orderRouter.post("/", placeOrderController);
orderRouter.get("/", getOrdersController);

export default orderRouter;