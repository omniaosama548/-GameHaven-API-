// server.mjs
import app from "./app.mjs";
import connectDB from "./config/db.mjs";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 9093;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1);
  }
};

startServer();
