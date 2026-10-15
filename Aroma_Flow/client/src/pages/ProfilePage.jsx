import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';
import { loginUser, registerUser } from '../api/auth';
import { LogIn, UserPlus, LogOut, User } from 'lucide-react';

export default function ProfilePage() {
  const { user, login, logout } = useUser();
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  
  const [loginVal, setLoginVal] = useState('');
  const [loginPwd, setLoginPwd] = useState('');
  const [loginErr, setLoginErr] = useState('');
  
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPwd, setRegPwd] = useState('');
  const [regErr, setRegErr] = useState('');
  const [regOk, setRegOk] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginErr('');
    
    if (loginVal === 'admin' && loginPwd === 'admin') {
      login({ username: 'admin', email: 'admin@aromaflow.ua' });
      localStorage.setItem('af_admin_logged', 'true');
      navigate('/admin');
      return;
    }
    
    try {
      const res = await loginUser({
        username: loginVal,
        password: loginPwd
      });
      if (res && res.success) {
        login(res.user);
      }
    } catch (err) {
      setLoginErr(err?.response?.data?.message || 'Невірні дані для входу');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegErr('');
    setRegOk(false);
    try {
      const res = await registerUser({
        username: regName,
        email: regEmail,
        password: regPwd
      });
      if (res && res.success) {
        setRegOk(true);
        login(res.user);
        setRegName('');
        setRegEmail('');
        setRegPwd('');
      }
    } catch (err) {
      setRegErr(err?.response?.data?.message || 'Помилка при реєстрації');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <TopBar />
        <Header />
        
        <main className="container mx-auto px-4 py-12 flex justify-center">
          {user ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-md w-full shadow-sm text-center">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 mb-4">
                <User size={32} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Особистий кабінет</h1>
              <p className="text-slate-600 mb-6">Вітаємо вас, <span className="font-semibold text-slate-800">{user.username}</span>!</p>
              
              <div className="border-t border-b border-slate-100 py-4 mb-6 text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Ім'я користувача:</span>
                  <span className="font-medium text-slate-800">{user.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Електронна пошта:</span>
                  <span className="font-medium text-slate-800">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Статус аккаунту:</span>
                  <span className="font-medium text-green-700">Постійний клієнт</span>
                </div>
              </div>

              <button
                onClick={logout}
                className="w-full inline-flex items-center justify-center gap-2 bg-red-600 text-white font-medium py-2.5 rounded-md hover:bg-red-700 transition-colors duration-200 cursor-pointer"
              >
                <LogOut size={16} /> Вийти з акаунту
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm max-w-md w-full overflow-hidden">
              <div className="flex border-b border-slate-200">
                <button
                  onClick={() => setIsLoginView(true)}
                  className={`flex-1 py-4 text-center text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isLoginView ? 'bg-slate-50 text-espresso-dark border-b-2 border-espresso-dark' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Вхід
                </button>
                <button
                  onClick={() => setIsLoginView(false)}
                  className={`flex-1 py-4 text-center text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    !isLoginView ? 'bg-slate-50 text-espresso-dark border-b-2 border-espresso-dark' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Реєстрація
                </button>
              </div>

              <div className="p-6 md:p-8">
                {isLoginView ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900 text-center mb-4 flex items-center justify-center gap-2">
                      <LogIn size={20} className="text-slate-600" /> Авторизація
                    </h2>
                    
                    {loginErr && (
                      <div className="bg-red-50 text-red-700 p-3 rounded-md text-xs font-medium border border-red-100">
                        {loginErr}
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Пошта або логін</label>
                      <input
                        type="text"
                        required
                        value={loginVal}
                        onChange={(e) => setLoginVal(e.target.value)}
                        className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
                        placeholder="john@example.com або john_doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Пароль</label>
                      <input
                        type="password"
                        required
                        value={loginPwd}
                        onChange={(e) => setLoginPwd(e.target.value)}
                        className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
                        placeholder="••••••••"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-espresso-dark text-white font-medium py-2.5 rounded-md hover:bg-espresso-hover transition-colors duration-200 mt-6 cursor-pointer"
                    >
                      Увійти
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900 text-center mb-4 flex items-center justify-center gap-2">
                      <UserPlus size={20} className="text-slate-600" /> Реєстрація аккаунту
                    </h2>
                    
                    {regErr && (
                      <div className="bg-red-50 text-red-700 p-3 rounded-md text-xs font-medium border border-red-100">
                        {regErr}
                      </div>
                    )}
                    
                    {regOk && (
                      <div className="bg-green-50 text-green-700 p-3 rounded-md text-xs font-medium border border-green-100">
                        Ви успішно зареєструвалися та авторизувалися!
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Логін / Ім'я</label>
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
                        placeholder="john_doe"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Електронна пошта</label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Пароль</label>
                      <input
                        type="password"
                        required
                        value={regPwd}
                        onChange={(e) => setRegPwd(e.target.value)}
                        className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
                        placeholder="••••••••"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-espresso-dark text-white font-medium py-2.5 rounded-md hover:bg-espresso-hover transition-colors duration-200 mt-6 cursor-pointer"
                    >
                      Зареєструватися
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
