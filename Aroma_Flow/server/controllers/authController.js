const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Будь ласка, заповніть всі поля' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Користувач з таким email вже існує' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({
      success: true,
      user: { username: newUser.username, email: newUser.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера при реєстрації' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Будь ласка, введіть ім\'я користувача та пароль' });
    }

    const user = await User.findOne({
      $or: [{ email: username }, { username: username }]
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Невірне ім\'я користувача або пароль' });
    }

    res.status(200).json({
      success: true,
      user: { username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера при вході' });
  }
};
