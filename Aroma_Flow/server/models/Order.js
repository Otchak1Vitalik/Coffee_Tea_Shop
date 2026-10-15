const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [{
    id: Number,
    title: String,
    price: Number,
    quantity: Number
  }],
  total: { type: Number, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
