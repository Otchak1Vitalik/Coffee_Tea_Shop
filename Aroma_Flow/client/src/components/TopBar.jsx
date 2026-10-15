import { Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TopBar() {
  return (
    <div className="bg-cream-light text-slate-700 text-sm">
      <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5"><Phone size={14} /><span>+380966697158</span></span>
          <span className="flex items-center gap-1.5"><Mail size={14} /><span>otchakv@gmail.com</span></span>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/" className="hover:text-slate-900">Головна</Link>
          <Link to="/profile" className="hover:text-slate-900">Профіль</Link>
          <Link to="/checkout" className="hover:text-slate-900">Кошик</Link>
        </div>
      </div>
    </div>
  );
}
