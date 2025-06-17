// app.mjs
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authRouter from "./routes/authRoute.mjs";
import categoryRoutes from "./routes/categoryRoute.mjs";
import cartRouter from "./routes/cartRoute.mjs";
import orderRouter from "./routes/orderRoute.mjs";
import adminRouter from "./routes/adminRoute.mjs";
import gameRouter from "./routes/gameRoute.mjs";
import wishlistRouter from "./routes/wishlistRoute.mjs";
import reviewRouter from './routes/reviewRoute.mjs';
import globalErrorHandler from "./controllers/errorController.mjs";

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin", adminRouter);
app.use("/api/games", gameRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/reviews", reviewRouter);

app.use(globalErrorHandler);

export default app;
