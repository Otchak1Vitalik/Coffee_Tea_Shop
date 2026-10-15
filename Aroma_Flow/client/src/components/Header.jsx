import { Coffee, ShoppingCart, User, LogOut, Search, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';

const navItems = ['Кава', 'Чай', 'Китайські чаї', 'Американська кава', 'Пуер', 'Аксесуари'];

const navLinks = {
  'Кава': '/coffee',
  'Чай': '/tea',
  'Китайські чаї': '/chinese-teas',
  'Американська кава': '/american-coffee',
  'Пуер': '/puer',
  'Аксесуари': '/accessories'
};

export default function Header() {
  const { count } = useCart();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isHomePage = location.pathname === '/';

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
    if (!isHomePage) {
      navigate('/?search=' + encodeURIComponent(value));
    }
  };

  return (
    <header className="bg-espresso-dark text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-6 flex-wrap">
        <Link to="/" className="flex items-center gap-2 hover:text-amber-300 transition-colors duration-200">
          <Coffee size={28} className="text-amber-300" />
          <div>
            <div className="text-xl font-bold leading-tight">Aroma Flow</div>
            <div className="text-xs text-slate-300 leading-tight">Справжній смак</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {navItems.map((n) => (
            <Link
              key={n}
              to={navLinks[n] || '/'}
              className="hover:text-amber-300 transition-colors duration-200"
            >
              {n}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-amber-300">UA</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-400">EN</span>
          </div>

          <div className="relative flex items-center bg-white/10 rounded-md px-2.5 py-1.5 text-white border border-white/10">
            <Search size={16} className="text-slate-300 mr-2" />
            <input
              type="text"
              value={searchParams.get('search') || ''}
              onChange={handleSearchChange}
              placeholder="Пошук товарів..."
              className="bg-transparent text-sm focus:outline-none placeholder-slate-300 text-white w-28 md:w-40"
            />
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="hover:text-amber-300 transition-colors duration-200 flex items-center gap-1">
                <User size={16} />
                <span>{user.username}</span>
              </Link>
              {user.username === 'admin' && (
                <Link to="/admin" className="hover:text-amber-300 transition-colors duration-200 flex items-center gap-1">
                  <Shield size={16} className="text-amber-400" />
                  <span>Адмін</span>
                </Link>
              )}
              <button onClick={logout} className="hover:text-red-400 transition-colors duration-200 p-1" aria-label="Вийти">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/profile" className="hover:text-amber-300 transition-colors duration-200 flex items-center gap-1">
              <User size={16} />
              <span>Увійти</span>
            </Link>
          )}

          <Link
            to="/checkout"
            className="relative p-2 hover:bg-white/10 rounded-md transition-colors duration-200 block"
            aria-label="Кошик"
          >
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="lg:hidden border-t border-white/10 overflow-x-auto">
        <div className="container mx-auto px-4 py-2 flex gap-4 text-sm whitespace-nowrap">
          {navItems.map((n) => (
            <Link
              key={n}
              to={navLinks[n] || '/'}
              className="hover:text-amber-300"
            >
              {n}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
