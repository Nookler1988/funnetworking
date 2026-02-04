import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <img 
      src="https://i.postimg.cc/HWh27vjQ/Frame-713-(1).jpg" 
      alt="Нескучный Нетворкинг Лого" 
      className={`${className} object-contain rounded-sm grayscale hover:grayscale-0 transition-all duration-300`}
    />
  );
};