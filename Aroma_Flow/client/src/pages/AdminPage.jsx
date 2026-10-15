import { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAdminData, createProduct } from '../api/admin';
import { Shield, PlusCircle, Users, ClipboardList, LogOut, Check } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function AdminPage() {
  const { user, login, logout } = useUser();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('orders');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Існуючі стани для форми
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newCategory, setNewCategory] = useState('Кава в зернах');
  const [newCountry, setNewCountry] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Додані нові стани
  const [newType, setNewType] = useState('Кава в зернах');
  const [newStrong, setNewStrong] = useState('');
  const [newAroma, setNewAroma] = useState('');

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (user?.username === 'admin' && localStorage.getItem('af_admin_logged') === 'true') {
      setIsAdminLoggedIn(true);
    } else {
      setIsAdminLoggedIn(false);
    }
  }, [user]);

  const loadData = () => {
    setLoading(true);
    getAdminData()
      .then((res) => {
        setUsers(res.users || []);
        setOrders(res.orders || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      loadData();
    }
  }, [isAdminLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (loginUser === 'admin' && loginPass === 'admin') {
      localStorage.setItem('af_admin_logged', 'true');
      login({ username: 'admin', email: 'admin@aromaflow.ua' });
    } else {
      setLoginError('Неправильний логін або пароль адміністратора');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('af_admin_logged');
    logout();
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    
    const priceNum = Number(newPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      setErrorMsg('Введіть коректну ціну товару');
      return;
    }

    try {
      const res = await createProduct({
        title: newTitle,
        price: priceNum,
        image: newImage || '/assets/prod1.jpg',
        category: newCategory,
        country: newCountry,
        weight: newWeight,
        type: newType,
        strong: newStrong,
        aroma: newAroma,
        description: newDesc
      });

      if (res && res.success) {
        setSuccessMsg(`Товар «${res.product.title}» успішно додано до бази даних!`);
        setNewTitle('');
        setNewPrice('');
        setNewImage('');
        setNewCountry('');
        setNewWeight('');
        setNewType('Кава в зернах');
        setNewStrong('');
        setNewAroma('');
        setNewDesc('');
        loadData();
      }
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || 'Помилка при створенні товару');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <TopBar />
        <Header />

        <main className="container mx-auto px-4 py-10 max-w-5xl">
          {!isAdminLoggedIn ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm max-w-md mx-auto p-6 md:p-8">
              <div className="mx-auto w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-800 mb-4">
                <Shield size={24} />
              </div>
              <h1 className="text-xl font-bold text-slate-900 text-center mb-6">Вхід в admin-панель</h1>
              
              {loginError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md text-xs font-medium border border-red-100 mb-4">
                  {loginError}
                </div>
              )}
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Логін адміна</label>
                  <input
                    type="text"
                    required
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
                    placeholder="admin"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Пароль</label>
                  <input
                    type="password"
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-espresso-dark text-white font-medium py-2.5 rounded-md hover:bg-espresso-hover transition-colors duration-200 mt-6 cursor-pointer"
                >
                  Увійти як адмін
                </button>
              </form>
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-slate-200 pb-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Shield className="text-amber-600" /> Адміністрування Aroma Flow
                  </h1>
                  <p className="text-xs text-slate-500">Контроль бази даних, замовлень та користувачів</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
                >
                  <LogOut size={14} /> Вийти
                </button>
              </div>

              <div className="flex border-b border-slate-200 mb-6 bg-white rounded-t-lg border-l border-r border-t">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-2 py-4 px-6 text-sm font-medium transition-colors duration-200 border-b-2 cursor-pointer ${
                    activeTab === 'orders' ? 'border-amber-7700 text-amber-900 bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <ClipboardList size={16} /> Замовлення ({orders.length})
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-2 py-4 px-6 text-sm font-medium transition-colors duration-200 border-b-2 cursor-pointer ${
                    activeTab === 'users' ? 'border-amber-700 text-amber-900 bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Users size={16} /> Користувачі ({users.length})
                </button>
                <button
                  onClick={() => setActiveTab('add-product')}
                  className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-2 py-4 px-6 text-sm font-medium transition-colors duration-200 border-b-2 cursor-pointer ${
                    activeTab === 'add-product' ? 'border-amber-700 text-amber-900 bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <PlusCircle size={16} /> Додати товар
                </button>
              </div>

              {loading && activeTab !== 'add-product' ? (
                <div className="text-center py-12 text-slate-500">Завантаження даних із MongoDB...</div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-b-lg p-6 shadow-sm">
                  {activeTab === 'orders' && (
                    <div className="space-y-6">
                      <h2 className="text-lg font-bold text-slate-900">Історія замовлень клієнтів</h2>
                      {orders.length === 0 ? (
                        <div className="text-slate-500 text-sm py-4">Жодних замовлень ще не було оформлено.</div>
                      ) : (
                        <div className="space-y-4">
                          {orders.map((o) => (
                            <div key={o.id} className="border border-slate-100 rounded-lg p-4 bg-slate-50 text-sm space-y-3">
                              <div className="flex flex-wrap justify-between items-center border-b border-slate-200/60 pb-2 gap-2">
                                <div>
                                  <span className="font-bold text-slate-900">Замовлення #{o.id.slice(-6).toUpperCase()}</span>
                                  <span className="text-slate-500 text-xs ml-3">{new Date(o.createdAt).toLocaleString('uk-UA')}</span>
                                </div>
                                <div className="text-base font-extrabold text-slate-950">{o.total} ₴</div>
                              </div>
                              <div className="grid md:grid-cols-3 gap-3">
                                <div>
                                  <div className="text-xs text-slate-400 font-medium">Отримувач:</div>
                                  <div className="font-medium text-slate-800">{o.name}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-slate-400 font-medium">Телефон:</div>
                                  <div className="font-medium text-slate-800">{o.phone}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-slate-400 font-medium">Адреса доставки:</div>
                                  <div className="font-medium text-slate-800">{o.address}</div>
                                </div>
                              </div>
                              <div className="pt-2">
                                <div className="text-xs text-slate-400 font-medium mb-1.5">Придбані товари:</div>
                                <ul className="divide-y divide-slate-100 bg-white rounded-md border border-slate-100 px-3">
                                  {o.items.map((i, idx) => (
                                    <li key={idx} className="py-2 flex justify-between text-xs">
                                      <span className="text-slate-700 font-medium">{i.title} <span className="text-slate-400">({i.quantity} шт)</span></span>
                                      <span className="font-bold text-slate-900">{i.price * i.quantity} ₴</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'users' && (
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 mb-4">База зареєстрованих клієнтів</h2>
                      {users.length === 0 ? (
                        <div className="text-slate-500 text-sm">Жоден користувач ще не зареєстрований.</div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-sm">
                            <thead>
                              <tr className="border-b border-slate-200 bg-slate-50">
                                <th className="py-3 px-4 font-semibold text-slate-700">Ім'я користувача (Логін)</th>
                                <th className="py-3 px-4 font-semibold text-slate-700">Електронна пошта</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {users.map((u, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50">
                                  <td className="py-3 px-4 font-medium text-slate-900">{u.username}</td>
                                  <td className="py-3 px-4 text-slate-600">{u.email}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'add-product' && (
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 mb-4">Форма додавання нового товару в каталог</h2>
                      
                      {successMsg && (
                        <div className="bg-green-50 text-green-700 p-4 rounded-md text-xs font-semibold border border-green-100 flex items-center gap-2 mb-4">
                          <Check size={16} /> {successMsg}
                        </div>
                      )}

                      {errorMsg && (
                        <div className="bg-red-50 text-red-700 p-3 rounded-md text-xs font-medium border border-red-100 mb-4">
                          {errorMsg}
                        </div>
                      )}

                      <form onSubmit={handleAddProduct} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Назва товару</label>
                            <input
                              type="text"
                              required
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
                              placeholder="Наприклад: Кава Jacobs Monarch (250g)"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Ціна (₴)</label>
                            <input
                              type="number"
                              required
                              value={newPrice}
                              onChange={(e) => setNewPrice(e.target.value)}
                              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
                              placeholder="320"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Шлях до зображення</label>
                            <input
                              type="text"
                              required
                              value={newImage}
                              onChange={(e) => setNewImage(e.target.value)}
                              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
                              placeholder="Наприклад: /assets/prod1.jpg або /assets/prod2.jpg"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Категорія</label>
                            <select
                              value={newCategory}
                              onChange={(e) => setNewCategory(e.target.value)}
                              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400 bg-white"
                            >
                              <option value="Кава в зернах">Кава</option>
                              <option value="Чай чорний">Чай</option>
                              <option value="Китайські чаї">Китайські чай</option>
                              <option value="Китайські чаї">Американська кава</option>
                              <option value="Пуер">Пуер</option>
                              <option value="Аксесуари">Аксесуари</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Країна походження</label>
                            <input
                              type="text"
                              value={newCountry}
                              onChange={(e) => setNewCountry(e.target.value)}
                              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
                              placeholder="Італія"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Вага / Об'єм</label>
                            <input
                              type="text"
                              value={newWeight}
                              onChange={(e) => setNewWeight(e.target.value)}
                              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
                              placeholder="250 г або 1 кг"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Тип</label>
                            <select
                              value={newType}
                              onChange={(e) => setNewType(e.target.value)}
                              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400 bg-white"
                            >
                              <option value="Кава в зернах">Кава в зернах</option>
                              <option value="Кава мелена">Кава мелена</option>
                              <option value="Чай чорний">Чай чорний</option>
                              <option value="Чай зелений">Чай зелений</option>
                              <option value="Пуер">Пуер</option>
                              <option value="Аксесуари">Аксесуари</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Міцність</label>
                            <input
                              type="text"
                              value={newStrong}
                              onChange={(e) => setNewStrong(e.target.value)}
                              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
                              placeholder="Міцність: 4 або 5"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Аромат</label>
                            <input
                              type="text"
                              value={newAroma}
                              onChange={(e) => setNewAroma(e.target.value)}
                              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
                              placeholder="Цитрусовий або Тропічний"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Опис товару</label>
                          <textarea
                            rows={3}
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
                            className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400 resize-none"
                            placeholder="Детальний опис товару, смакових характеристик..."
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-green-700 text-white font-semibold py-3 rounded-md hover:bg-green-800 transition-colors duration-200 mt-6 cursor-pointer"
                        >
                          Додати товар до бази даних
                        </button>
                      </form>
                    </div>
                  )}
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