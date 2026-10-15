const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера при отриманні товарів' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Невірний ідентифікатор товару' });
    }

    const product = await Product.findOne({ id });
    if (!product) {
      return res.status(404).json({ message: 'Товар не знайдено' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера при отриманні товару' });
  }
};
