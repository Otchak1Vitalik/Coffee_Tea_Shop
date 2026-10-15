import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3 flex flex-col shadow-sm">
      <Link
        to={`/product/${product.id}`}
        className="aspect-square bg-slate-50 rounded-md overflow-hidden mb-3 block"
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </Link>
      <Link
        to={`/product/${product.id}`}
        className="text-sm font-medium text-slate-800 line-clamp-2 min-h-[2.5rem] mb-2 hover:text-espresso-accent transition-colors duration-200"
      >
        {product.title}
      </Link>
      <div className="text-lg font-bold text-slate-900">{product.price} ₴</div>
      <div className="text-xs text-green-600 font-medium mb-3">Є в наявності</div>

      <button
        onClick={() => addItem(product)}
        className="mt-auto w-full inline-flex items-center justify-center gap-1.5 bg-espresso-dark text-white text-xs font-medium py-2.5 rounded-md hover:bg-espresso-hover transition-colors duration-200 cursor-pointer"
      >
        <ShoppingCart size={14} /> В кошик
      </button>
    </div>
  );
}
