import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">404</h1>
      <p className="text-lg text-slate-600 mb-6">Сторінку не знайдено</p>
      <Link to="/" className="inline-flex items-center gap-2 bg-espresso-dark text-white px-5 py-2.5 rounded-md hover:bg-espresso-hover transition-colors duration-200">
        <ArrowLeft size={16} /> На головну
      </Link>
    </div>
  );
}
