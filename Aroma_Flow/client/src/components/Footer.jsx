import { Phone, MessageCircle, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-espresso-dark text-slate-300 mt-12">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Закони</h3>
            <ul className="space-y-2 text-sm">
              <li>ДСТУ 3984-2000 «Кава смажена: Технічні умови»</li>
              <li>ДСТУ 2121-93 «Чай чорний байховий фасований: Технічні умови»</li>
              <li>Закон України «Про основні принципи та вимоги до безпечності та якості харчових продуктів»</li>
              <li>Правила торгівлі продовольчими товарами (для ФОП)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Корисні посилання</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Гід по сортах кави та арабіки</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Як правильно заварювати різні види чаю (блог)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Правила повернення продовольчих товарів (особливості)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Програми лояльності для постійних клієнтів</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Контакти</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone size={16} /><a href="tel:+380968697158" className="hover:text-white transition-colors">+380968697158</a></li>
              <li className="flex items-center gap-2"><MessageCircle size={16} /><a href="https://wa.me/380968697158" className="hover:text-white transition-colors">+380968697158</a></li>
              <li className="flex items-center gap-2"><Clock size={16} /><span>Пн-Нд (8:00 - 20:00)</span></li>
              <li className="flex items-center gap-2"><Mail size={16} /><a href="mailto:otchakv@gmail.com" className="hover:text-white transition-colors">otchakv@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-400 w-full">
  <div className="flex space-x-6">
    <a href="https://www.visa.com.ua/uk_UA" className="hover:text-white transition-colors">
      <img src="/visa.png" alt="YouTube" className="w-11 h-11" />
    </a>
    <a href="https://www.mastercard.com/ua/uk.html" className="hover:text-white transition-colors">
      <img src="/mastercard.png" alt="MasterCard" className="w-11 h-11" />
    </a>
    <a href="https://bitcoin.org/uk/" className="hover:text-white transition-colors">
      <img src="/bitcoin.png" alt="Bitcoin" className="w-11 h-11" />
    </a>
  </div>
  <div className="text-center">
    <h6 className="text-white font-semibold text-base md:text-lg m-0">
      © 2026 Aroma Flow. Усі права захищено.
    </h6>
  </div>
  <div className="flex space-x-6">
    <a href="https://www.instagram.com/aroma_flow_ua" className="hover:text-white transition-colors">
      <img src="/instagram.png" alt="Instagram" className="w-9 h-9" />
    </a>
    <a href="https://t.me/aroma_flow_ua" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
      <img src="/telegram.png" alt="Telegram" className="w-9 h-9" />
    </a>
    <a href="https://x.com/?lang=uk/aroma_flow_ua" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
      <img src="/twitter.png" alt="Twitter" className="w-9 h-9" />
    </a>
    <a href="https://www.facebook.com/aromaflow.ua" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
      <img src="/facebook.png" alt="Facebook" className="w-9 h-9" />
    </a>
    <a href="https://www.tiktok.com/@aroma_flow_ua" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
      <img src="/tiktok.png" alt="TikTok" className="w-9 h-9" />
    </a>
  </div>
</div>
      </div>
    </footer>
  );
}