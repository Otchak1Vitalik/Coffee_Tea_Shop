import heroImg from '../assets/hero-coffee.jpg';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="container mx-auto px-4 mt-6">
      <div className="rounded-lg overflow-hidden bg-espresso-dark text-white">
        <div className="grid md:grid-cols-2 items-center">
          <div className="p-8 md:p-12">
            <p className="text-amber-300 font-semibold tracking-widest text-sm mb-3">СПЕЦПРОПОЗИЦІЯ</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Знижка <span className="text-amber-300">-25%</span><br />НА ДРІПИ
            </h1>
            
            
            <Link 
              to="/product/4" 
              className="inline-block bg-white text-slate-900 font-semibold px-8 py-3 rounded-md hover:bg-slate-100 transition-colors duration-200"
            >
              ЗАМОВИТИ
            </Link>
            
          </div>
          <div className="p-6 md:p-8 flex justify-center">
            <img src={heroImg} alt="Кава Aroma Flow" width={500} height={375} className="rounded-md max-h-72 object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}