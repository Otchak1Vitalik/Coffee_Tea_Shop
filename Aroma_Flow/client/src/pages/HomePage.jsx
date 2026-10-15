import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}
