
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Products } from './components/Products';
import { Craft } from './components/Craft';
import { BlastHotZone } from './components/BlastHotZone';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { useScrollReveal } from './hooks/useScrollReveal';
import { PRODUCTS } from './constants';

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeThemeColor, setActiveThemeColor] = useState(PRODUCTS[0].color);
  const [isReady, setIsReady] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  useScrollReveal();

  useEffect(() => {
    // 监听字体加载状态
    document.fonts.ready.then(() => {
      // 字体准备就绪，延迟一小段时间以保证 CSS 计算完成
      setTimeout(() => {
        setIsReady(true);
        // 给予淡出动画的时间
        setTimeout(() => setShowContent(true), 100);
      }, 800);
    });

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--active-theme-color', activeThemeColor);
  }, [activeThemeColor]);

  const bgOpacity = Math.min(scrollY / 1000, 1);
  const bgColor = `rgba(${Math.round(10 * (1 - bgOpacity))}, 0, 0, 1)`;

  return (
    <>
      {/* 极简电影感加载器 */}
      <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-all duration-1000 ease-in-out pointer-events-none ${isReady ? 'opacity-0 scale-150 invisible' : 'opacity-100 scale-100 visible'}`}>
        <div className="relative mb-8">
           <div className="w-20 h-20 bg-red-600 rounded-sm rotate-45 flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(220,38,38,0.5)]">
             <span className="text-white text-3xl font-bold -rotate-45">辣</span>
           </div>
           <div className="absolute inset-0 border border-red-600/30 rounded-sm rotate-45 scale-125 animate-ping" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-red-600 font-bold uppercase tracking-[0.5em] text-[10px] animate-pulse">Initializing Lab</span>
          <div className="w-48 h-[1px] bg-zinc-800 mt-4 overflow-hidden">
             <div className="h-full bg-red-600 animate-[loadingLine_2s_infinite]" />
          </div>
        </div>
      </div>

      <div className={`relative min-h-screen transition-all duration-1000 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ backgroundColor: bgColor }}>
        <Navbar scrollY={scrollY} />
        
        <main>
          <section id="hero">
            <Hero scrollY={scrollY} />
          </section>

          <section id="story" className="py-24 overflow-hidden">
            <Story />
          </section>

          <section id="products" className="py-24 bg-zinc-950/50">
            <Products onThemeColorChange={setActiveThemeColor} />
          </section>

          <section id="craft" className="py-24">
            <Craft />
          </section>

          <section id="hotzone" className="py-24">
            <BlastHotZone />
          </section>
        </main>

        <Footer />

        <div className="fixed inset-0 pointer-events-none z-0">
          <SpicyParticles count={25} scrollY={scrollY} color={activeThemeColor} />
        </div>
      </div>

      <style>{`
        @keyframes loadingLine {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
};

const SpicyParticles: React.FC<{ count: number; scrollY: number; color: string }> = ({ count, scrollY, color }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const speed = 0.05 + (i % 5) * 0.02;
        const yOffset = scrollY * speed;
        return (
          <div
            key={i}
            className="absolute rounded-full animate-pulse blur-[1px] transition-colors duration-1000"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
              width: `${(i % 5) + 3}px`,
              height: `${(i % 5) + 3}px`,
              transform: `translateY(${-yOffset}px)`,
              backgroundColor: `${color}44`, // 25% opacity
              transition: 'transform 0.1s linear, background-color 1s ease',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        );
      })}
    </>
  );
};

export default App;
