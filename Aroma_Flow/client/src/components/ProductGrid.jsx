import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '../api/products';
import { useSearchParams } from 'react-router-dom';

export default function ProductGrid() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-slate-500">
        Завантаження товарів з бази даних...
      </div>
    );
  }

  const query = (searchParams.get('search') || '').toLowerCase();
  const filteredItems = items.filter((p) =>
    p.title.toLowerCase().includes(query) ||
    (p.category && p.category.toLowerCase().includes(query))
  );

  return (
    <section id="catalog" className="container mx-auto px-4 mt-10 mb-16 scroll-mt-24">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Каталог товарів</h2>

      {filteredItems.length === 0 ? (
        <div className="text-center text-slate-500 py-12">
          Товарів за вашим запитом не знайдено.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredItems.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
