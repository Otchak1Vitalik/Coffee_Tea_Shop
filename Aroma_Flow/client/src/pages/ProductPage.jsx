import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Check, ArrowLeft } from 'lucide-react';
import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { getProductById } from '../api/products';

export default function ProductPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        if (data) {
          setProduct(data);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Завантаження товару...</p>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Товар не знайдено</h1>
        <p className="text-slate-600 mb-6">На жаль, такого товару немає в каталозі.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-espresso-dark text-white px-4 py-2 rounded-md hover:bg-espresso-hover">
          <ArrowLeft size={16} /> На головну
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <TopBar />
        <Header />
        <main className="container mx-auto px-4 py-8 pb-12">
          <div className="bg-white rounded-lg border border-slate-200 p-4 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 rounded-lg overflow-hidden aspect-square">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{product.title}</h1>
                <div className="text-xs text-slate-500 mb-4">Код товару: AF-{String(product.id).padStart(5, '0')}</div>
                <div className="flex items-center gap-2 text-sm text-green-700 mb-6">
                  <Check size={16} /> Є в наявності
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-6">
                  <div className="text-4xl font-bold text-slate-900 mb-4">{product.price} ₴</div>
                  <button
                    onClick={() => addItem(product)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-espresso-dark text-white text-base font-medium py-3 rounded-md hover:bg-espresso-hover transition-colors duration-200 cursor-pointer"
                  >
                    <ShoppingCart size={18} /> Купити
                  </button>
                </div>
                <dl className="text-sm border-t border-slate-200 divide-y divide-slate-200">
                  {product.category && (
                    <div className="flex justify-between py-2.5">
                      <dt className="text-slate-500">Категорія</dt>
                      <dd className="text-slate-800 font-medium">{product.category}</dd>
                    </div>
                  )}
                  {product.country && (
                    <div className="flex justify-between py-2.5">
                      <dt className="text-slate-500">Аромат</dt>
                      <dd className="text-slate-800 font-medium">{product.Aroma}</dd>
                    </div>
                  )}
                  {product.country && (
                    <div className="flex justify-between py-2.5">
                      <dt className="text-slate-500">Міцність</dt>
                      <dd className="text-slate-800 font-medium">{product.Strong}</dd>
                    </div>
                  )}
                  {product.country && (
                    <div className="flex justify-between py-2.5">
                      <dt className="text-slate-500">Тип</dt>
                      <dd className="text-slate-800 font-medium">{product.Type}</dd>
                    </div>
                  )}
                  {product.country && (
                    <div className="flex justify-between py-2.5">
                      <dt className="text-slate-500">Країна</dt>
                      <dd className="text-slate-800 font-medium">{product.country}</dd>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex justify-between py-2.5">
                      <dt className="text-slate-500">Вага / Об'єм</dt>
                      <dd className="text-slate-800 font-medium">{product.weight}</dd>
                    </div>
                  )}
                  <div className="flex justify-between py-2.5">
                    <dt className="text-slate-500">Доставка</dt>
                    <dd className="text-slate-800 font-medium">По всій Україні</dd>
                  </div>
                </dl>
              </div>
            </div>
            <section className="mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-3">Опис товару</h2>
              <p className="text-slate-700 leading-relaxed">{product.description}</p>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
