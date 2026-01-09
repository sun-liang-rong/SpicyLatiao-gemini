
import React, { useState, useRef, useEffect } from 'react';
import { PRODUCTS } from '../constants';

interface ProductsProps {
  onThemeColorChange?: (color: string) => void;
}

export const Products: React.FC<ProductsProps> = ({ onThemeColorChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // 当 activeIndex 变化时通知父组件更新主题色
  useEffect(() => {
    if (onThemeColorChange) {
      onThemeColorChange(PRODUCTS[activeIndex].color);
    }
  }, [activeIndex, onThemeColorChange]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const center = container.scrollLeft + container.offsetWidth / 2;
    
    let minDistance = Infinity;
    let closestIndex = 0;

    const children = container.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.scrollSnapType = 'none'; 
    scrollRef.current.style.scrollBehavior = 'auto'; 
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; 
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    if (!isDragging.current || !scrollRef.current) return;
    isDragging.current = false;
    scrollRef.current.style.scrollSnapType = 'x mandatory';
    scrollRef.current.style.scrollBehavior = 'smooth';
    handleScroll();
  };

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const target = scrollRef.current.children[index] as HTMLElement;
    if (target) {
      scrollRef.current.scrollTo({
        left: target.offsetLeft - (scrollRef.current.offsetWidth / 2) + (target.offsetWidth / 2),
        behavior: 'smooth'
      });
    }
  };

  const activeProduct = PRODUCTS[activeIndex];

  return (
    <div id="products" className="container mx-auto px-6 overflow-hidden select-none">
      <div className="text-center mb-12 reveal">
        <span className="text-red-600 font-bold uppercase tracking-widest text-sm">Visual Stage</span>
        <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase italic tracking-tighter">视觉主舞台</h2>
        <p className="text-zinc-500 max-w-xl mx-auto text-sm md:text-base">
          横向平铺展示，点击或拖动发现更多“爆辣”选择。
        </p>
      </div>

      <div className="relative">
        {/* 产品信息区 - 动态颜色同步 */}
        <div className="mb-10 h-40 md:h-52 flex flex-col items-center justify-center reveal">
          <div className="text-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform" key={activeIndex}>
            <div 
              className="inline-block px-4 py-1 border text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4 animate-[fadeIn_0.4s] transition-colors duration-700"
              style={{ borderColor: `${activeProduct.color}55`, color: activeProduct.color }}
            >
              Intensity Level 0{activeProduct.spicyLevel}
            </div>
            <h3 
              className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-2 animate-[slideUp_0.5s] transition-colors duration-700"
              style={{ color: activeProduct.color }}
            >
              {activeProduct.name}
            </h3>
            <p className="text-base md:text-xl text-zinc-400 font-serif italic animate-[slideUp_0.7s]">
              {activeProduct.tagline}
            </p>
          </div>
        </div>

        <div className="relative group">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex space-x-6 md:space-x-10 overflow-x-auto pb-16 pt-10 scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing px-[10vw] md:px-[20vw]"
            style={{ scrollBehavior: 'smooth' }}
          >
            {PRODUCTS.map((product, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={product.id}
                  onClick={() => scrollToCard(index)}
                  className={`relative flex-shrink-0 w-72 md:w-96 h-[450px] md:h-[550px] snap-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                    isActive 
                      ? 'scale-100 z-20 border-white/20' 
                      : 'scale-90 opacity-40 z-10 border-transparent'
                  } rounded-2xl overflow-hidden border backdrop-blur-sm group/card`}
                  style={{ 
                    boxShadow: isActive ? `0 40px 100px -20px ${product.color}66` : 'none'
                  }}
                >
                  <img 
                    src={product.image} 
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[5s] ease-out ${isActive ? 'scale-110' : 'scale-100'}`} 
                    alt={product.name} 
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-60'}`} />
                  
                  <div className={`absolute bottom-8 left-8 right-8 transition-all duration-700 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-50'}`}>
                    <div className="flex items-center space-x-3 mb-2">
                       <span 
                         className="h-[2px] flex-1 transition-colors duration-700"
                         style={{ backgroundColor: isActive ? product.color : '#3f3f46' }}
                       ></span>
                       <span 
                        className="text-[10px] font-bold tracking-[0.3em] uppercase whitespace-nowrap transition-colors duration-700"
                        style={{ color: isActive ? product.color : '#71717a' }}
                       >
                         SERIES 0{product.id}
                       </span>
                    </div>
                    <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter">{product.name}</h4>
                  </div>

                  <div className="absolute top-6 right-6 opacity-0 group-hover/card:opacity-100 transition-opacity">
                     <div 
                        className="w-12 h-12 rounded-full border flex items-center justify-center font-bold text-xs backdrop-blur-md transition-colors"
                        style={{ borderColor: product.color, color: product.color }}
                     >
                        {product.spicyLevel}🔥
                     </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 动态进度条：颜色随产品变化 */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-64 h-1 bg-zinc-900 rounded-full overflow-hidden">
             <div 
                className="h-full transition-all duration-700 ease-out"
                style={{ 
                  width: `${((activeIndex + 1) / PRODUCTS.length) * 100}%`,
                  backgroundColor: activeProduct.color,
                  boxShadow: `0 0 15px ${activeProduct.color}`
                }}
             />
          </div>

          {/* 导航按钮：悬停颜色同步 */}
          <button 
            onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
            style={{ '--hover-color': activeProduct.color } as any}
            className="absolute top-1/2 left-8 md:left-20 -translate-y-1/2 w-14 h-14 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-[var(--hover-color)] hover:border-[var(--hover-color)] transition-all opacity-0 group-hover:opacity-100 z-30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={() => scrollToCard(Math.min(PRODUCTS.length - 1, activeIndex + 1))}
            style={{ '--hover-color': activeProduct.color } as any}
            className="absolute top-1/2 right-8 md:right-20 -translate-y-1/2 w-14 h-14 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-[var(--hover-color)] hover:border-[var(--hover-color)] transition-all opacity-0 group-hover:opacity-100 z-30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* 动态 CTA 按钮：悬停背景色变为产品主题色 */}
        <div className="mt-20 flex justify-center reveal" style={{ transitionDelay: '0.2s' }}>
           <button 
            className="group relative px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-sm overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl"
            style={{ boxShadow: `0 20px 40px -10px ${activeProduct.color}33` }}
           >
              <span className="relative z-10 transition-colors group-hover:text-white">立即选购 {activeProduct.name}</span>
              <div 
                className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" 
                style={{ backgroundColor: activeProduct.color }}
              />
           </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
