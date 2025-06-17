import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.mjs";
import {
  loginValidation,
  registerValidation,
} from "../middlewares/validateMiddleware.mjs";

const authRouter = express.Router();

authRouter.post("/login", loginValidation, loginController);
authRouter.post("/register", registerValidation, registerController);

export default authRouter;
