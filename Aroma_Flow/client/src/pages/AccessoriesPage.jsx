import { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { getProducts } from '../api/products';

export default function AccessoriesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setItems(data || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const coffeeItems = items.filter(
    (p) => p.category && p.category.toLowerCase().includes('аксесуари')
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <TopBar />
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Товари в категорії «Аксесуари»</h1>
          <div className="text-center text-slate-500 py-12 bg-white rounded-lg border border-slate-200">
            У цій категорії поки немає товарів.
          </div>
          <div className="text-center text-slate-500 py-12 bg-white rounded-lg border border-slate-200">
           {coffeeItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div> 
        </main>
      </div>
      <Footer />
    </div>
  );
}
