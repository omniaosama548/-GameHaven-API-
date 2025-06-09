import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";
import morgan from "morgan";
import authRouter from "./routes/authRoute.mjs";
import globalErrorHandler from "./controllers/errorController.mjs";
import cartRouter from "./routes/cartRoute.mjs";
import orderRouter from "./routes/orderRoute.mjs";
import adminOrderRouter from "./routes/adminRoute.mjs";

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin", adminOrderRouter);

app.use(globalErrorHandler);

connectDB();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});