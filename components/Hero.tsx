
import React, { useEffect, useState } from 'react';

interface HeroProps {
  scrollY?: number;
}

export const Hero: React.FC<HeroProps> = ({ scrollY = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Parallax calculation
  const parallaxOffset = scrollY * 0.4;
  const scaleEffect = 1.1 + (scrollY * 0.0002);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Cinematic Background Image */}
        <div 
          className="absolute inset-0 w-full h-full transition-transform duration-100 ease-out"
          style={{ 
            transform: `translateY(${parallaxOffset}px) scale(${scaleEffect})`,
            backgroundImage: `url('https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=90&w=2000')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
        
        {/* Dynamic Red Glow Effect */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(153,27,27,0.4)_0%,transparent_70%)] animate-pulse mix-blend-screen opacity-60" />

        {/* Textured Overlays */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-black/20 to-black" />
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        
        {/* Grunge/Paper Texture Overlay */}
        <div 
          className="absolute inset-0 z-25 opacity-20 mix-blend-multiply" 
          style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/p6.png')` }}
        />
      </div>

      {/* Content Layer */}
      <div className={`relative z-30 text-center px-6 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="inline-flex items-center space-x-4 mb-6">
          <span className="h-[1px] w-8 bg-red-600"></span>
          <h2 className="text-red-500 font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs">
            Handmade • Sincere • Emotional
          </h2>
          <span className="h-[1px] w-8 bg-red-600"></span>
        </div>

        <h1 className="text-6xl md:text-[9rem] font-black italic mb-6 leading-none uppercase tracking-tighter">
          辣，让味蕾<span className="text-red-600 drop-shadow-[0_0_50px_rgba(220,38,38,0.8)]">跳舞</span>🍷
        </h1>
        
        <p className="max-w-3xl mx-auto text-zinc-300 text-lg md:text-2xl font-light mb-12 leading-relaxed italic drop-shadow-lg">
          “香辣在口，热情在心。这不只是一块辣条，这是你的<span className="text-white border-b border-red-600">热辣态度</span>。”
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button 
            onClick={() => scrollToSection('story')}
            className="group relative px-10 py-5 bg-red-600 text-white font-black uppercase tracking-widest text-sm rounded-sm overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-red-900/40"
          >
            <span className="relative z-10">阅览“辣·初心”</span>
            <div className="absolute top-0 right-0 w-0 h-full bg-red-800 transition-all group-hover:w-full" />
          </button>
          
          <button 
            onClick={() => scrollToSection('products')}
            className="px-10 py-5 border border-zinc-700 bg-black/40 backdrop-blur-sm text-zinc-300 font-black uppercase tracking-widest text-sm rounded-sm hover:bg-zinc-800 hover:text-white transition-all active:scale-95"
          >
            辣出真味
          </button>
        </div>
      </div>

      {/* Hero Bottom Deco */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-40" />

      {/* Down Arrow with Smooth Scroll Action */}
      <div 
        onClick={() => scrollToSection('story')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-40 hover:opacity-100 transition-all hover:scale-125 z-50 p-4"
      >
        <div className="w-10 h-16 border-2 border-white/20 rounded-full flex justify-center p-2">
           <div className="w-1 h-3 bg-red-600 rounded-full animate-scrolldown" />
        </div>
      </div>

      <style>{`
        @keyframes scrolldown {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        .animate-scrolldown {
          animation: scrolldown 2s infinite;
        }
      `}</style>
    </div>
  );
};
