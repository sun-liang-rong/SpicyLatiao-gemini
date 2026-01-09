
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PRODUCTS } from '../constants';

// Define the interface for Products component props
interface ProductsProps {
  onThemeColorChange: (color: string) => void;
}

// 内部组件：燃烧的辣椒图标
const BurningChili: React.FC<{ delay: number }> = ({ delay }) => (
  <div className="relative inline-block animate-[chili-burn_1.5s_ease-in-out_infinite]" style={{ animationDelay: `${delay}s` }}>
    <svg 
      viewBox="0 0 24 24" 
      className="w-5 h-5 md:w-6 md:h-6 text-red-600 fill-current drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
      style={{ filter: 'drop-shadow(0 0 4px #ff4d4d)' }}
    >
      <path d="M14.5,3C14.5,3 13.5,3 12,5C10.5,7 9.5,9 9,11C8.5,13 8.5,15 9,17C9.5,19 11,21 13,21.5C15,22 17,21.5 18.5,20C20,18.5 20.5,16.5 20,14.5C19.5,12.5 18,10.5 16,9.5C14,8.5 14.5,3 14.5,3M12,14C11,14 10,13.5 10,12.5C10,11.5 11,11 12,11C13,11 14,11.5 14,12.5C14,13.5 13,14 12,14Z" />
      <path d="M12,2C12,2 11,4 10,6" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    {/* 火焰微光粒子 */}
    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-orange-400 blur-sm rounded-full animate-[fire-particle_2s_linear_infinite]" style={{ animationDelay: `${delay + 0.5}s` }} />
  </div>
);

// 内部组件：单个 3D 卡片
const ProductCard: React.FC<{
  product: any;
  index: number;
  offset: number;
  isActive: boolean;
  onClick: () => void;
}> = ({ product, index, offset, isActive, onClick }) => {
  const diff = index - offset;
  const scale = 1 - Math.min(Math.abs(diff) * 0.15, 0.4);
  const translateX = diff * 110; 
  const rotateY = diff * -25;
  const opacity = 1 - Math.min(Math.abs(diff) * 0.5, 0.8);
  const blur = Math.min(Math.abs(diff) * 4, 8);
  const brightness = 1 - Math.min(Math.abs(diff) * 0.5, 0.7);
  const zIndex = Math.round(100 - Math.abs(diff) * 20);

  return (
    <div
      onClick={onClick}
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing transition-shadow duration-500"
      style={{
        width: '320px',
        height: '480px',
        zIndex,
        transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
        opacity,
        filter: `blur(${blur}px) brightness(${brightness})`,
        willChange: 'transform, opacity, filter',
        transformStyle: 'preserve-3d',
        top: '0'
      }}
    >
      <div className={`relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group bg-zinc-900`}>
        <img 
          src={product.image} 
          className="absolute inset-0 w-full h-full object-cover select-none" 
          alt={product.name} 
          draggable={false}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent" />

        {/* 顶部标签 */}
        <div className="absolute top-6 left-6">
          <div className="bg-red-600 px-3 py-1 rounded-[4px] shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            <span className="text-[10px] font-black text-white uppercase tracking-widest">PREMIUM</span>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="absolute bottom-8 left-8 right-8">
          {/* 辣度展示：燃烧的辣椒 */}
          <div className="flex space-x-1 mb-3">
            {Array.from({ length: product.spicyLevel }).map((_, i) => (
              <BurningChili key={i} delay={i * 0.1} />
            ))}
          </div>
          
          <h4 className="text-3xl font-black text-white leading-tight uppercase mb-4 tracking-tighter italic">
            {product.name}
          </h4>
          <div className="flex items-center space-x-3 opacity-60 group-hover:opacity-100 transition-opacity">
            <div className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center bg-white/5">
               <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
               </svg>
            </div>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Detail Lab</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Products: React.FC<ProductsProps> = ({ onThemeColorChange }) => {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const requestRef = useRef<number>(null);
  const targetOffsetRef = useRef(0);
  const dragStartPos = useRef(0);
  const dragStartOffset = useRef(0);
  const lastMoveTime = useRef(0);
  const lastMovePos = useRef(0);
  const velocity = useRef(0);

  const animate = useCallback(() => {
    if (!isDragging) {
      const diff = targetOffsetRef.current - offset;
      if (Math.abs(diff) > 0.001) {
        setOffset(prev => prev + diff * 0.1);
      } else {
        setOffset(targetOffsetRef.current);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        return;
      }
    }
    requestRef.current = requestAnimationFrame(animate);
  }, [isDragging, offset]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  useEffect(() => {
    const activeIndex = Math.round(offset);
    const safeIndex = ((activeIndex % PRODUCTS.length) + PRODUCTS.length) % PRODUCTS.length;
    if (onThemeColorChange) onThemeColorChange(PRODUCTS[safeIndex].color);
  }, [offset, onThemeColorChange]);

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartPos.current = e.clientX;
    dragStartOffset.current = offset;
    lastMoveTime.current = Date.now();
    lastMovePos.current = e.clientX;
    velocity.current = 0;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const currentPos = e.clientX;
    const delta = (currentPos - dragStartPos.current) / 400;
    setOffset(dragStartOffset.current - delta);

    const now = Date.now();
    const dt = now - lastMoveTime.current;
    if (dt > 0) {
      velocity.current = (currentPos - lastMovePos.current) / dt;
    }
    lastMoveTime.current = now;
    lastMovePos.current = currentPos;
  };

  const onPointerUp = () => {
    setIsDragging(false);
    const inertia = velocity.current * 15;
    const finalOffset = offset - inertia;
    targetOffsetRef.current = Math.round(Math.max(0, Math.min(PRODUCTS.length - 1, finalOffset)));
  };

  return (
    <div 
      className="relative min-h-screen py-24 flex flex-col justify-center overflow-hidden transition-colors duration-1000 select-none touch-none"
      style={{ 
        backgroundColor: `${PRODUCTS[Math.round(Math.max(0, Math.min(PRODUCTS.length - 1, offset)))].color}ee`,
        perspective: '1200px'
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-20 pointer-events-none mix-blend-overlay" />

      <div className="container mx-auto px-6 relative z-10 h-[640px]">
        {/* 间隙已调小：mb-4 */}
        <div className="mb-2 reveal text-center">
           <span className="text-white/60 font-black text-[10px] uppercase tracking-[0.5em] block mb-2">Exclusive Preview</span>
           <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">
             爆辣 <span className="opacity-40 italic">Series</span>
           </h2>
        </div>

        {/* 3.D 轮播主舞台 */}
        <div className="relative h-[480px] w-full transform-gpu">
          {PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              offset={offset}
              isActive={Math.round(offset) === index}
              onClick={() => {
                targetOffsetRef.current = index;
              }}
            />
          ))}
        </div>

        {/* 指示器 */}
        <div className="mt-8 flex justify-center space-x-3">
          {PRODUCTS.map((_, i) => (
            <div 
              key={i}
              className={`h-1 transition-all duration-500 rounded-full ${Math.round(offset) === i ? 'w-12 bg-white' : 'w-4 bg-white/20'}`}
            />
          ))}
        </div>

        <div className="mt-8 text-center max-w-2xl mx-auto reveal">
            <p className="text-white/80 text-xl font-light italic leading-relaxed">
              “{PRODUCTS[Math.round(Math.max(0, Math.min(PRODUCTS.length - 1, offset)))].description}”
            </p>
        </div>
      </div>

      <style>{`
        @keyframes chili-burn {
          0%, 100% { transform: scale(1) rotate(-2deg); filter: brightness(1); }
          50% { transform: scale(1.1) rotate(3deg); filter: brightness(1.5) drop-shadow(0 0 12px #ff4d4d); }
        }
        @keyframes fire-particle {
          0% { transform: translate(-50%, 0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translate(-50%, -20px) scale(0); opacity: 0; }
        }
        .product-card {
          user-select: none;
          -webkit-user-drag: none;
        }
      `}</style>
    </div>
  );
};
