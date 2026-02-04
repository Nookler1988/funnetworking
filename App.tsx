import React, { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { ContentLadder } from './components/ContentLadder';
import { 
  Zap, 
  Users2, 
  Hash, 
  Brain, 
  Sparkles, 
  Send, 
  Calendar,
  Layers,
  Users,
  TrendingUp
} from 'lucide-react';

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSystem = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('system');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-black min-h-screen selection:bg-white selection:text-black font-sans scroll-smooth">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-[42px] md:text-[62px] lg:text-[82px] font-black text-white leading-[0.88] tracking-tighter mb-10 uppercase">
              Контент-маркетинг<br/>
              в <span className="text-white">TELEGRAM</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-bold text-white/70 max-w-md leading-snug mb-10">
              Текстовая система роста для тех, кто делает ставку на смыслы, а не на пустые охваты.
            </p>
            <div className="flex flex-wrap gap-4">
               <a 
                 href="#system" 
                 onClick={scrollToSystem}
                 className="bg-white text-black px-10 py-5 rounded-full font-black uppercase tracking-wider hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95"
               >
                 Смотреть систему
               </a>
            </div>
          </div>
          
          {/* Hero Visual - Scattered Cards */}
          <div className="relative h-[500px] hidden lg:block">
             <div className="absolute top-0 right-20 w-64 h-80 bg-white rounded-3xl p-6 transform rotate-6 shadow-2xl animate-float" style={{ animationDelay: '0s' }}>
                <h3 className="text-3xl font-black text-black leading-none mb-4 uppercase">Вирусный Хук</h3>
                <p className="text-black font-bold text-sm leading-tight opacity-80">Короткий текст на видео, чтобы захватить внимание и перевести в блог.</p>
                <div className="absolute bottom-6 left-6 font-black text-[10px] uppercase bg-black text-white px-3 py-1 rounded-sm tracking-widest">Reels</div>
             </div>
             <div className="absolute top-16 right-40 w-64 h-80 bg-white rounded-3xl p-6 transform -rotate-6 shadow-2xl animate-float" style={{ animationDelay: '1s', zIndex: 2 }}>
                <h3 className="text-3xl font-black text-black leading-none mb-4 uppercase">Экспертиза</h3>
                <p className="text-black font-bold text-sm leading-tight opacity-80">Лонгриды, которые доказывают твою ценность и строят доверие.</p>
                <div className="absolute bottom-6 left-6 font-black text-[10px] uppercase bg-black text-white px-3 py-1 rounded-sm tracking-widest">VC.ru</div>
             </div>
             <div className="absolute top-32 right-10 w-64 h-80 bg-black border-4 border-white rounded-3xl p-6 transform rotate-12 shadow-2xl animate-float" style={{ animationDelay: '2s', zIndex: 3 }}>
                <h3 className="text-3xl font-black text-white leading-none mb-4 uppercase">Канал</h3>
                <p className="text-white font-bold text-sm leading-tight opacity-80">Твое ядро. Место, где смыслы превращаются в лояльных подписчиков.</p>
                <div className="absolute bottom-6 left-6 font-black text-[10px] uppercase bg-white text-black px-3 py-1 rounded-sm tracking-widest">Telegram</div>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 bg-black border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: "Лет в блоге", value: "10+", icon: <Calendar size={18} /> },
              { label: "Соцсетей", value: "5", sub: "Сетка, Тенчат, Дзен, Тредс, ТГ", icon: <Layers size={18} /> },
              { label: "Аудитория", value: "45k+", icon: <Users size={18} /> },
              { label: "Новых / мес", value: "1-2k", icon: <TrendingUp size={18} /> },
              { label: "Telegram", value: "+750", sub: "с нуля за 6 месяцев", icon: <Send size={18} /> },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col min-h-[140px] hover:bg-white/10 transition-all group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-white/40 uppercase font-black text-[9px] tracking-[0.2em]">
                    {stat.label}
                  </span>
                  <span className="text-white/20 group-hover:text-white/60 transition-colors">
                    {stat.icon}
                  </span>
                </div>
                <div className="mt-auto">
                  <div className="text-4xl font-black text-white leading-none">{stat.value}</div>
                  {stat.sub && <div className="text-[10px] text-white/30 font-bold uppercase mt-2">{stat.sub}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 bg-white text-black relative overflow-hidden scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl md:text-8xl font-black mb-16 tracking-tighter uppercase leading-[0.9]">
            Как выиграть<br/>в эту игру.
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-10 border-4 border-black rounded-[40px] hover:bg-black hover:text-white transition-all group">
              <h3 className="text-3xl font-black mb-6 uppercase leading-none">1. Хватит кормить алгоритмы</h3>
              <p className="text-xl font-bold leading-tight opacity-80">
                Тренды умирают за 24 часа. Хороший текст живет вечно. Мы строим актив, который принадлежит тебе: сообщество в Telegram.
              </p>
            </div>
            <div className="p-10 bg-black text-white rounded-[40px] hover:scale-[1.02] transition-transform">
              <h3 className="text-3xl font-black mb-6 uppercase leading-none">2. Стратегия Лестницы</h3>
              <p className="text-xl font-bold leading-tight opacity-80">
                Мы не просто постим. Мы двигаем людей. От Внимания (Reels) -> к Доверию (Статьи) -> к Продажам (Telegram).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The System */}
      <section id="system" className="py-32 px-6 bg-black scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-5xl md:text-9xl font-black text-white mb-8 uppercase tracking-tighter">Система.</h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-bold uppercase tracking-widest leading-tight">
              Шесть элементов перелива трафика в смыслы
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Зацеп", sub: "Крючок", desc: "Картинка + триггерный заголовок. Захват внимания через визуальные смыслы.", color: "#7501FF" },
              { title: "Сетка, Тенчат", sub: "Костюм", desc: "Деловой нетворкинг и профессиональное признание в профильных сетях.", color: "#FFFFFF" },
              { title: "Тредс", sub: "Шум", desc: "Быстрые мысли и диалоги для вирального роста и вовлечения.", color: "#FFFFFF" },
              { title: "Лонгриды", sub: "Мозг", desc: "Статьи на Дзен, VC, Т-Ж. Глубокий контент, формирующий фундамент доверия.", color: "#FFFFFF" },
              { title: "1 пост — 5 форматов", sub: "Вирус", desc: "Трансформация контента через ИИ для охвата всех площадок за 30 минут.", color: "#FFFFFF" },
              { title: "Telegram", sub: "Грааль", desc: "Конечная точка. Место, где тебя действительно слушают и покупают.", color: "#000000", border: true },
            ].map((item, idx) => {
              const isDarkBackground = item.color === '#000000' || item.color === '#7501FF';
              const textColorClass = isDarkBackground ? 'text-white' : 'text-black';
              const borderClass = item.color === '#000000' ? 'border-4 border-white' : '';

              return (
                <div 
                  key={idx} 
                  className={`
                    rounded-[40px] p-10 flex flex-col justify-between h-[420px] transition-all hover:-translate-y-2 group
                    ${textColorClass} ${borderClass}
                  `}
                  style={{ backgroundColor: item.color }}
                >
                  <div>
                    <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-40 ${textColorClass}`}>
                      {item.sub}
                    </div>
                    <h3 className="text-3xl font-black mb-4 uppercase leading-none">{item.title}</h3>
                    <p className={`text-lg font-bold leading-tight opacity-70 group-hover:opacity-100 transition-opacity ${textColorClass}`}>
                      {item.desc}
                    </p>
                  </div>
                  <div className={`font-black text-sm uppercase opacity-30 ${textColorClass}`}>
                    Элемент {idx + 1}/6
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section id="generator" className="bg-white scroll-mt-24">
        <ContentLadder />
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black py-24 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="text-center md:text-left">
            <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none uppercase mb-8">
              Твой ход.
            </h2>
            <a href="https://t.me/funnetworking" target="_blank" className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-black text-2xl uppercase hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              <Send size={24} fill="currentColor" />
              Написать
            </a>
          </div>
          <div className="md:text-right">
            <p className="text-white/40 font-black uppercase tracking-widest text-sm mb-4">© Нескучный Нетворкинг</p>
            <p className="text-white/20 text-xs max-w-[200px] leading-relaxed">Развиваем телеграм-каналы через контент-маркетинг, который читают.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;