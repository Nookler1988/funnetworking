import React, { useState } from 'react';
import { Logo } from './Logo';
import { Send, Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Смыслы', href: '#philosophy', id: 'philosophy' },
    { name: 'Система', href: '#system', id: 'system' },
    { name: 'Игра', href: '#generator', id: 'generator' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Высота шапки
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/20 py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 md:gap-4 group">
          <Logo className="h-10 md:h-12" />
          <span className="font-sans text-lg md:text-2xl font-black tracking-tight text-white uppercase leading-none">Нескучный Нетворкинг</span>
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-wide">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleScroll(e, link.id)}
              className="text-white hover:text-gray-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://t.me/funnetworking" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-black px-6 py-3 rounded-full font-black hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Send size={18} fill="currentColor" />
            Написать
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[73px] bg-black z-40 md:hidden flex flex-col p-8 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleScroll(e, link.id)}
              className="text-4xl font-black text-white uppercase tracking-tighter"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://t.me/funnetworking" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-auto bg-white text-black px-6 py-4 rounded-full font-black text-center text-xl uppercase tracking-wider flex items-center justify-center gap-3"
          >
            <Send size={24} fill="currentColor" />
            Telegram
          </a>
        </div>
      )}
    </nav>
  );
};