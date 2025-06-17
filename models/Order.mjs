import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  orderedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
