import express from "express";
import { getAllOrdersController } from "../controllers/orderController.mjs";
import { isAuthenticated } from "../middlewares/authMiddleware.mjs";
import { isAuthorized } from "../middlewares/roleMiddleware.mjs";

const adminOrderRouter = express.Router();

adminOrderRouter.get(
  "/orders",
  isAuthenticated,
  isAuthorized("admin"),
  getAllOrdersController
);

export default adminOrderRouter;