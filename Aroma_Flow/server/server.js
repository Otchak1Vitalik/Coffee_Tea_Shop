require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/Product');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000'
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_LINK)
  .then(async () => {
    console.log('Successfully connected to MongoDB');
    await seedProducts();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Seed function
async function seedProducts() {
  try {
    const count = await Product.countDocuments();
    // Check if any product has http in its image URL. If yes, delete all and re-seed.
    let needsReseed = false;
    if (count > 0) {
      const anyHttp = await Product.findOne({ image: { $regex: '^http' } });
      if (anyHttp) {
        needsReseed = true;
        console.log('Found products with http image urls. Deleting and re-seeding...');
        await Product.deleteMany({});
      }
    }

    if (count === 0 || needsReseed) {
      const initialProducts = [
        { id: 1, title: 'Lavazza Oro Whole Beans (1kg)', price: 1850, image: '/assets/prod1.jpg', category: 'Кава в зернах', country: 'Італія', weight: '1 кг', description: 'Класична італійська суміш 100% арабіки з м\'яким смаком, медовими нотами та золотистою кремою. Ідеальна для еспресо та капучино.' },
        { id: 2, title: 'Greenfield Golden Ceylon (100 пакетиків)', price: 320, image: '/assets/prod2.jpg', category: 'Чай чорний', country: 'Шрі-Ланка', weight: '100 пакетиків', description: 'Класичний цейлонський чорний чай з насиченим терпким смаком та яскравим бурштиновим кольором настою.' },
        { id: 3, title: 'Jacobs Monarch Ground Coffee (500g)', price: 790, image: '/assets/prod3.jpg', category: 'Кава мелена', country: 'Німеччина', weight: '500 г', description: 'Натуральна смажена мелена кава з вираженим ароматом та збалансованим смаком. Підходить для турки та фільтр-кавоварок.' },
        { id: 4, title: 'Lipton Yellow Label Tea (200 пакетиків)', price: 380, image: '/assets/prod4.jpg', category: 'Чай чорний', country: 'Великобританія', weight: '200 пакетиків', description: 'Найвідоміший у світі чорний чай з добірних плантацій. Бадьорий смак та класичний аромат для будь-якого часу дня.' },
        { id: 5, title: 'Ambassador Nero Ground Coffee (250g)', price: 410, image: '/assets/prod5.jpg', category: 'Кава мелена', country: 'Польща', weight: '250 г', description: 'Темна обжарка з насиченим шоколадним смаком та довгим післясмаком. Створена для поціновувачів міцної кави.' },
        { id: 6, title: 'Loveera Premium Ceylon Tea (100g розсипний)', price: 480, image: '/assets/prod6.jpg', category: 'Чай зелений', country: 'Шрі-Ланка', weight: '100 г', description: 'Преміальний листовий цейлонський чай з квітковими та цитрусовими нотами. Збір з високогірних плантацій.' }
      ];
      await Product.insertMany(initialProducts);
      console.log('Successfully seeded initial products');
    }
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));

let PORT = process.env.PORT || 5001;
if (PORT === '5000' || PORT === 5000) {
  PORT = 5001;
}
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
