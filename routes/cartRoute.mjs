import express from "express";
import {
  addToCartController,
  getCartController,
  removeFromCartController,
} from "../controllers/cartController.mjs";
import { isAuthenticated } from "../middlewares/authMiddleware.mjs";

const cartRouter = express.Router();

cartRouter.use(isAuthenticated);
cartRouter.post("/", addToCartController);
cartRouter.get("/", getCartController);
cartRouter.delete("/:gameId", removeFromCartController);

export default cartRouter;