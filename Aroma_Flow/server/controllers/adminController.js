const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.getAdminData = async (req, res) => {
  try {
    const dbUsers = await User.find({});
    const dbOrders = await Order.find({}).sort({ createdAt: -1 });

    const users = dbUsers.map(u => ({
      username: u.username,
      email: u.email
    }));

    const orders = dbOrders.map(o => ({
      id: o._id,
      name: o.name,
      phone: o.phone,
      address: o.address,
      total: o.total,
      createdAt: o.createdAt,
      items: o.items
    }));

    res.status(200).json({ users, orders });
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера при отриманні адмін-даних' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { title, price, image, category, country, weight, description } = req.body;
    if (!title || !price || !image) {
      return res.status(400).json({ message: 'Заповніть обов\'язкові поля: назва, ціна, зображення' });
    }

    const lastProduct = await Product.findOne({}).sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    const newProduct = new Product({
      id: newId,
      title,
      price: Number(price),
      image,
      category,
      country,
      weight,
      description
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      product: newProduct
    });
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера при створенні товару' });
  }
};
