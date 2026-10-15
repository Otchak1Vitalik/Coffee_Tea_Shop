import { useState } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/orders';
import { CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const orderItems = items.map((i) => ({
        id: i.id,
        title: i.title,
        price: i.price,
        quantity: i.quantity
      }));

      const res = await createOrder({
        items: orderItems,
        total,
        name,
        phone,
        address
      });

      if (res && res.success) {
        setSuccessOrderId(res.orderId);
        clearCart();
      }
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || 'Не вдалося зберегти замовлення. Спробуйте пізніше.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <TopBar />
        <Header />
        
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          {successOrderId ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center max-w-md mx-auto shadow-sm">
              <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4">
                <CheckCircle size={36} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Замовлення оформлено!</h1>
              <p className="text-slate-600 mb-4 text-sm">
                Дякуємо за покупку. Номер вашого замовлення: <br />
                <span className="font-mono font-bold text-slate-800 text-base">{successOrderId}</span>
              </p>
              <p className="text-slate-500 text-xs mb-6">
                Наш менеджер зв'яжеться з вами найближчим часом для підтвердження доставки.
              </p>
              <Link
                to="/"
                className="w-full inline-flex items-center justify-center gap-2 bg-espresso-dark text-white font-medium py-2.5 rounded-md hover:bg-espresso-hover transition-colors duration-200"
              >
                Повернутися до каталогу
              </Link>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-8">Оформлення замовлення</h1>
              
              {items.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
                  <div className="mx-auto w-12 h-12 text-slate-400 mb-3 flex items-center justify-center">
                    <ShoppingBag size={32} />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-800 mb-2">Ваш кошик порожній</h2>
                  <p className="text-slate-500 text-sm mb-6">Додайте товари з каталогу, щоб оформити замовлення.</p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-espresso-dark text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-espresso-hover transition-colors duration-200"
                  >
                    <ArrowLeft size={16} /> До товарів
                  </Link>
                </div>
              ) : (
                <div className="grid md:grid-cols-5 gap-8">
                  <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 p-6 shadow-sm h-fit">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Контактні дані доставки</h2>
                    
                    {errorMsg && (
                      <div className="bg-red-50 text-red-700 p-3 rounded-md text-xs font-medium border border-red-100 mb-4">
                        {errorMsg}
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Прізвище та ім'я</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
                          placeholder="Іван Іванов"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Телефон</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
                          placeholder="+380991234567"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Адреса доставки (Місто, відділення Нової Пошти або адреса)</label>
                        <textarea
                          required
                          rows={3}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400 resize-none"
                          placeholder="Київ, Відділення Нової Пошти №15, вул. Хрещатик 20"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-espresso-dark text-white font-semibold py-3 rounded-md hover:bg-espresso-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6 cursor-pointer"
                      >
                        {isSubmitting ? "Зберігаємо замовлення..." : `Підтвердити замовлення на ${total} ₴`}
                      </button>
                    </form>
                  </div>

                  <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm h-fit">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Ваше замовлення</h2>
                    <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto pr-1">
                      {items.map((i) => (
                        <div key={i.id} className="flex gap-3 py-3 text-sm">
                          <img src={i.image} alt={i.title} className="w-12 h-12 rounded object-cover" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-slate-800 truncate">{i.title}</div>
                            <div className="text-slate-500 text-xs">{i.quantity} x {i.price} ₴</div>
                          </div>
                          <div className="font-bold text-slate-950 self-center">{i.price * i.quantity} ₴</div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-slate-100 pt-4 mt-2 flex justify-between items-center">
                      <span className="text-slate-600 font-medium">Всього до сплати:</span>
                      <span className="text-xl font-extrabold text-slate-900">{total} ₴</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
