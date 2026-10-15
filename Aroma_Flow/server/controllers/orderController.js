const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { items, total, name, phone, address } = req.body;
    if (!items || items.length === 0 || !total || !name || !phone || !address) {
      return res.status(400).json({ message: 'Заповніть всі обов\'язкові дані замовлення' });
    }

    const newOrder = new Order({
      items,
      total,
      name,
      phone,
      address
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      orderId: newOrder._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера при створенні замовлення' });
  }
};
