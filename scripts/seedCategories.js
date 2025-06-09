import mongoose from "mongoose";
import Category from "../models/Category.mjs";
import dotenv from "dotenv";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const data = fs.readFileSync(path.join(__dirname, '../data/categories.json'), 'utf-8');
const categories = JSON.parse(data);

await Category.deleteMany();
await Category.insertMany(categories);

console.log(' Categories seeded successfully!');
process.exit();
