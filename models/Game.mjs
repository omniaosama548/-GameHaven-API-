import mongoose from 'mongoose';
const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  coverImage: String,
  stock: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true });

const Game = mongoose.model('Game', gameSchema);
export default Game;