
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
  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 将当前产品的主题色应用到全局 CSS 变量
  useEffect(() => {
    document.documentElement.style.setProperty('--active-theme-color', activeThemeColor);
  }, [activeThemeColor]);

  // 动态背景逻辑：基于滚动深度调节
  const bgOpacity = Math.min(scrollY / 1000, 1);
  const bgColor = `rgba(${Math.round(10 * (1 - bgOpacity))}, 0, 0, 1)`;

  return (
    <div className="relative min-h-screen transition-colors duration-1000 ease-out" style={{ backgroundColor: bgColor }}>
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

      {/* 粒子系统：颜色与当前选中的产品色同步 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <SpicyParticles count={25} scrollY={scrollY} color={activeThemeColor} />
      </div>
    </div>
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
