const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: String,
  country: String,
  weight: String,
  description: String
});

module.exports = mongoose.model('Product', ProductSchema);
