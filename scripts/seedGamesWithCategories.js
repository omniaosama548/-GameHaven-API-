import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Game from '../models/Game.mjs';
import Category from '../models/Category.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);


const rawGames = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/games_raw.json'), 'utf-8')
);


const categories = await Category.find();
const categoryMap = {};
categories.forEach(cat => {
  categoryMap[cat.name.toLowerCase()] = cat._id;
});


const finalGames = rawGames.map(game => ({
  ...game,
  category: categoryMap[game.category.toLowerCase()]
}));


await Game.deleteMany(); 
await Game.insertMany(finalGames); 

console.log('Games seeded with category references!');
process.exit();
