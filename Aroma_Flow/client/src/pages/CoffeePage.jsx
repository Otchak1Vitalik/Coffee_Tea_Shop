import { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { getProducts } from '../api/products';

export default function CoffeePage() {
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
    (p) => p.category && p.category.toLowerCase().includes('кава')
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <TopBar />
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Товари в категорії «Кава»</h1>      
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-12">
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
