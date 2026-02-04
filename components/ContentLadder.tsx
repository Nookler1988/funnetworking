import React, { useState } from 'react';
import { generateGrowthStrategy } from '../services/geminiService';
import { ContentStrategy } from '../types';
import { Loader2 } from 'lucide-react';

export const ContentLadder: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [strategy, setStrategy] = useState<ContentStrategy | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setLoading(true);
    setError('');
    setStrategy(null);

    try {
      const result = await generateGrowthStrategy(topic);
      setStrategy(result);
    } catch (err) {
      setError('Связь потеряна. Перетасовываем колоду...');
    } finally {
      setLoading(false);
    }
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
                className="w-full bg-white/20 border-2 border-white text-white py-3 md:py-4 rounded-full font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Раздать Карты'}
              </button>
            </form>
            
            <div className="absolute bottom-4 right-6 text-[10px] font-black text-white opacity-30 uppercase tracking-widest">
              Контент маркетинг против скуки
            </div>
          </div>
          {error && <div className="text-red-500 font-bold mt-4 text-center text-sm">{error}</div>}
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
          )}
        </div>
      </div>
    </div>
  );
};