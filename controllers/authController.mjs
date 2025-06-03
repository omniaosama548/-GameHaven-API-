import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.mjs";
import AppError from "../utils/appError.mjs";
import "dotenv/config";
import { getOneUser, addUser } from "../services/authService.mjs";

export const JWT_SECRET = process.env.JWT_SECRET;

export const loginController = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1)check if email and password exist
  if (!email || !password) {
    return next(new AppError("please provide email and password !", 400));
  }
  // 2) check if the user exist && password is correct
  const user = await getOneUser({ email });

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 401));
  }

  // 3) if everything is OK , send token to the client

  const token = jwt.sign(
    { email: user.email, _id: user._id, role: "user" },
    JWT_SECRET,
    {
      expiresIn: "12h",
    }
  );

  res.status(200).json({
    token,
  });
});

export const registerController = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new AppError("All fields are requiered", 400));
  }

  const existingUser = await getOneUser({ email });

  if (existingUser) {
    return next(new AppError("User already exists", 400));
  }

  const newUser = { name, email, password };
  await addUser(newUser);

  res.status(201).json({
    message: "User registered successfully",
    data: newUser,
  });
});
