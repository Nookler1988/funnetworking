import React, { useState, useEffect } from 'react';
import { ContentStrategy } from '../types';
import { Loader2, Trash2, CheckCircle2 } from 'lucide-react';

// Demo strategy generator without API
const generateDemoStrategy = (topic: string): ContentStrategy => {
  const strategies: Record<string, ContentStrategy> = {
    default: {
      niche: topic,
      steps: [
        {
          platform: "Reels / Shorts",
          title: "Вирусный хук",
          description: `Создай 15-секундное видео с провокационным вопросом о ${topic}. Используй трендовый звук и быстрые смены кадров.`
        },
        {
          platform: "Telegram / VC.ru",
          title: "Глубокий разбор",
          description: `Напиши статью с кейсом: "Как я заработал первые $1000 в нише ${topic}". Добавь конкретные цифры и скриншоты.`
        },
        {
          platform: "Telegram-канал",
          title: "Лид-магнит",
          description: `Создай чек-лист "Топ-10 ошибок в ${topic}, которые стоят тебе денег". Доступ по подписке.`
        }
      ]
    }
  };
  
  return strategies.default;
};

export const ContentLadder: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [strategy, setStrategy] = useState<ContentStrategy | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedStrategy = localStorage.getItem('fun_ladder_strategy');
    const savedTopic = localStorage.getItem('fun_ladder_topic');
    
    if (savedStrategy) {
      try {
        setStrategy(JSON.parse(savedStrategy));
      } catch (e) {
        console.error("Failed to parse saved strategy");
      }
    }
    if (savedTopic) {
      setTopic(savedTopic);
    }
  }, []);

  // Save to localStorage when strategy changes
  useEffect(() => {
    if (strategy) {
      localStorage.setItem('fun_ladder_strategy', JSON.stringify(strategy));
      localStorage.setItem('fun_ladder_topic', topic);
      setIsSaved(true);
      const timer = setTimeout(() => setIsSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [strategy]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setLoading(true);
    setError('');
    setStrategy(null);

    // Simulate API delay
    setTimeout(() => {
      const result = generateDemoStrategy(topic);
      setStrategy(result);
      setLoading(false);
    }, 1500);
  };

  const handleClear = () => {
    localStorage.removeItem('fun_ladder_strategy');
    localStorage.removeItem('fun_ladder_topic');
    setStrategy(null);
    setTopic('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-16 md:py-24 px-4 md:px-6">
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* The "Black Card" (Input) */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
          <div className="bg-black border-2 md:border-4 border-white rounded-3xl p-6 md:p-8 min-h-[400px] md:aspect-[2.5/3.5] flex flex-col justify-between shadow-[0_0_50px_rgba(255,255,255,0.1)] relative overflow-hidden">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-white mb-6 leading-tight uppercase tracking-tighter">
                Моя контент-стратегия для ниши
                <span className="border-b-2 md:border-b-4 border-white inline-block w-full mt-2"></span>
                разорвет охваты в клочья.
              </h3>
            </div>
            
            <form onSubmit={handleGenerate} className="mt-auto relative z-10">
               <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">
                 Заполни пробел
               </label>
               <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Например: Крипта, Таро..."
                className="w-full bg-white text-black text-lg md:text-xl font-black p-3 md:p-4 rounded-xl mb-4 outline-none focus:ring-4 focus:ring-white/20 placeholder:text-gray-400 transition-all"
              />
              <button
                type="submit"
                disabled={loading || !topic}
                className="w-full bg-white/20 border-2 border-white text-white py-3 md:py-4 rounded-full font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Раздать Карты'}
              </button>
            </form>
            
            <div className="absolute bottom-16 right-6 text-[10px] font-black text-white opacity-30 uppercase tracking-widest">
              Контент маркетинг против скуки
            </div>
          </div>
          {error && <div className="text-red-500 font-bold mt-4 text-center text-sm">{error}</div>}
          
          {strategy && (
            <div className="mt-6 flex justify-center gap-4">
              <button 
                onClick={handleClear}
                className="text-black/40 hover:text-red-600 transition-colors flex items-center gap-2 font-black uppercase text-[10px] tracking-widest"
              >
                <Trash2 size={14} /> Сбросить прогресс
              </button>
            </div>
          )}
        </div>

        {/* The "White Cards" (Output) */}
        <div className="w-full lg:w-2/3 min-h-[400px] flex flex-col gap-8 lg:block relative">
          {!strategy && !loading && (
             <div className="flex items-center justify-center h-full min-h-[300px] opacity-20">
               <h2 className="text-2xl md:text-4xl font-black uppercase text-center max-w-md leading-none">
                 Ждем новых <br/> игроков...
               </h2>
             </div>
          )}

          {strategy && (
            <div className="relative">
              {isSaved && (
                <div className="absolute -top-12 left-0 right-0 flex justify-center animate-in fade-in slide-in-from-bottom-2">
                  <div className="bg-black text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-white/20">
                    <CheckCircle2 size={12} className="text-green-400" /> Сохранено в память
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {strategy.steps.map((step, index) => (
                  <div 
                    key={index} 
                    className="bg-white text-black rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between transform transition-all hover:-translate-y-2 hover:rotate-0 animate-deal-card aspect-[2.5/3.5] border border-gray-100"
                    style={{ 
                      '--rotation': `${(index % 2 === 0 ? -1 : 1) * (index + 1)}deg` 
                    } as React.CSSProperties}
                  >
                    <div>
                      <h4 className="text-xl md:text-2xl font-black mb-3 md:mb-4 leading-none uppercase tracking-tighter">{step.title}</h4>
                      <p className="text-base md:text-lg font-bold leading-tight text-gray-800">{step.description}</p>
                    </div>
                    
                    <div className="mt-8 pt-4 border-t-2 border-black flex justify-between items-end">
                       <span className="font-black uppercase tracking-tighter text-[10px] md:text-xs bg-black text-white px-3 py-1 rounded-full">
                         {step.platform}
                       </span>
                       <div className="flex items-center gap-1">
                          <div className="w-3 h-3 md:w-4 md:h-4 bg-black rounded-full"></div>
                          <span className="font-black text-[10px]">Ladder</span>
                       </div>
                    </div>
                  </div>
                ))}
                
                <div className="bg-black border-2 border-white rounded-3xl p-8 flex flex-col justify-center items-center text-center aspect-[2.5/3.5] transform rotate-2 shadow-2xl">
                   <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase">Ты выиграл.</h3>
                   <p className="text-white text-sm font-bold mb-8 opacity-80 uppercase tracking-tight">Это только демо-версия. Готов забрать полную стратегию?</p>
                   <a href="#contact" className="bg-white text-black px-8 py-3 rounded-full font-black uppercase text-sm hover:scale-105 transition-transform">
                     Начать Игру
                   </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
