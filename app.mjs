import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.mjs'
import morgan from 'morgan';


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(morgan('dev'));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
