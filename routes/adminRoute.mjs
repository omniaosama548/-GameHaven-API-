import express from "express";
import { getAllOrdersController } from "../controllers/orderController.mjs";
import { isAuthenticated } from "../middlewares/authMiddleware.mjs";
import { isAuthorized } from "../middlewares/roleMiddleware.mjs";

import {
  createGame,
  updateGame,
  deleteGame,
} from "../controllers/adminController.mjs";
import upload from "../utils/upload.mjs";

const adminRouter = express.Router();

adminRouter.get(
  "/orders",
  isAuthenticated,
  isAuthorized("admin"),
  getAllOrdersController
);

adminRouter.post(
  "/games",
  isAuthenticated,
  isAuthorized("admin"),
  upload.single("coverImage"),
  createGame
);
adminRouter.put(
  "/games/:id",
  isAuthenticated,
  isAuthorized("admin"),
  upload.single("coverImage"),
  updateGame
);
adminRouter.delete(
  "/games/:id",
  isAuthenticated,
  isAuthorized("admin"),
  deleteGame
);

export default adminRouter;
