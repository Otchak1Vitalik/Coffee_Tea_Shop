import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import HomePage from './pages/HomePage';
import CoffeePage from './pages/CoffeePage';
import TeaPage from './pages/TeaPage';
import ChineseTeasPage from './pages/ChineseTeasPage';
import AmericanCoffeePage from './pages/AmericanCoffeePage';
import PuerPage from './pages/PuerPage';
import AccessoriesPage from './pages/AccessoriesPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coffee" element={<CoffeePage />} />
          <Route path="/tea" element={<TeaPage />} />
          <Route path="/chinese-teas" element={<ChineseTeasPage />} />
          <Route path="/american-coffee" element={<AmericanCoffeePage />} />
          <Route path="/puer" element={<PuerPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
