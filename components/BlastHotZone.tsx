
import React, { useState, useEffect, useRef } from 'react';

export const BlastHotZone: React.FC = () => {
  const [level, setLevel] = useState(3);
  const [status, setStatus] = useState<'idle' | 'charging' | 'exploding'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);

  const getLevelInfo = (lvl: number) => {
    switch (lvl) {
      case 1: return { label: '微辣萌芽', color: '#fbbf24', glow: '0 0 20px #fbbf24', desc: 'MILD_IGNITION: 像初吻般温柔，微微的麻。' };
      case 2: return { label: '中辣热流', color: '#f97316', glow: '0 0-30px #f97316', desc: 'THERMAL_FLOW: 血液开始沸腾，额头微出汗。' };
      case 3: return { label: '爆辣战歌', color: '#ef4444', glow: '0 0 50px #ef4444', desc: 'SONIC_BLAST: 舌尖的蹦迪，灵魂的战栗。' };
      case 4: return { label: '地狱熔岩', color: '#b91c1c', glow: '0 0 80px #b91c1c', desc: 'MAGMA_SURGE: 火光冲天，味觉进入无尽荒野。' };
      case 5: return { label: '终焉禁忌', color: '#7f1d1d', glow: '0 0 120px #7f1d1d', desc: 'VOID_CRITICAL: 不可言说的力量，这一刻你是神。' };
      default: return { label: '', color: '', glow: '', desc: '' };
    }
  };

  const info = getLevelInfo(level);

  const handleStartBlast = () => {
    setStatus('charging');
    // 蓄能阶段
    setTimeout(() => {
      setStatus('exploding');
      // 爆炸阶段持续时间
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-6 reveal">
      <div 
        ref={containerRef}
        className={`relative overflow-hidden rounded-[4rem] p-12 md:p-24 bg-zinc-950 border transition-all duration-700 ${
          status === 'exploding' ? 'animate-[heavyShake_0.1s_infinite] border-red-500 shadow-[0_0_100px_rgba(220,38,38,0.3)]' : 'border-zinc-800'
        }`}
      >
        
        {/* 背景：热浪纹理叠加层 */}
        <div className={`absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-1000 ${status !== 'idle' ? 'opacity-40' : 'opacity-10'}`}>
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--level-color)_0%,transparent_70%)]" style={{ '--level-color': info.color } as any} />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] mix-blend-overlay" />
        </div>

        {/* 热浪畸变模拟（仅在爆炸或高等级时显示） */}
        {level >= 4 && (
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
            <div className="absolute inset-0 animate-[heatHaze_4s_ease-in-out_infinite] backdrop-blur-[2px]" />
          </div>
        )}

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-4">
             <span className="text-red-600 font-bold tracking-[0.5em] text-[10px] uppercase block mb-2">Sensory Laboratory</span>
             <h2 className={`text-4xl md:text-7xl font-black mb-4 uppercase tracking-tighter italic transition-all duration-500 ${level === 5 ? 'animate-[glitch_0.3s_infinite]' : ''}`}>
                Blast <span className="text-red-600">Hot</span> Zone
             </h2>
          </div>

          <div className="flex flex-col items-center mb-16">
            {/* 动态热力仪表盘 */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 mb-12 flex items-center justify-center">
              {/* 装饰外圈 */}
              <div className="absolute inset-0 rounded-full border border-zinc-800 border-dashed animate-[spin_20s_linear_infinite]" />
              
              {/* 进度弧线 */}
              <svg className="w-full h-full -rotate-90 transform">
                <circle
                  cx="50%" cy="50%" r="45%"
                  fill="none"
                  stroke="#18181b"
                  strokeWidth="8"
                />
                <circle
                  cx="50%" cy="50%" r="45%"
                  fill="none"
                  stroke={info.color}
                  strokeWidth="8"
                  strokeDasharray="282.6"
                  strokeDashoffset={282.6 - (282.6 * level) / 5}
                  className="transition-all duration-700 ease-out"
                  style={{ filter: `drop-shadow(${info.glow})` }}
                />
              </svg>

              {/* 中心等级显示 */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">Level</span>
                <span className="text-6xl md:text-8xl font-black italic transition-colors duration-500" style={{ color: info.color }}>
                   0{level}
                </span>
              </div>
            </div>

            {/* 交互控制区 */}
            <div className="w-full max-w-lg space-y-8">
               <div className="relative py-4">
                  <input 
                    type="range" min="1" max="5" step="1" 
                    value={level} 
                    onChange={(e) => setLevel(parseInt(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600 relative z-10"
                  />
                  {/* 滑动条背景装饰 */}
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 h-4 w-full bg-red-950/20 rounded-full blur-sm" />
               </div>
               <div className="flex justify-between text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                {['Mild', 'Flow', 'Blast', 'Surge', 'Void'].map((t, i) => (
                  <span key={t} className={level === i+1 ? 'text-white' : ''}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* 状态描述 */}
          <div className="min-h-[100px] mb-12 transform transition-all duration-500" style={{ opacity: status === 'charging' ? 0.3 : 1 }}>
            <h3 
              className="text-4xl md:text-6xl font-black italic mb-4 transition-all duration-500"
              style={{ color: info.color, textShadow: status === 'exploding' ? info.glow : 'none' }}
            >
              {info.label}
            </h3>
            <p className="text-zinc-400 font-mono tracking-tighter text-sm md:text-lg opacity-70">
              {info.desc}
            </p>
          </div>

          {/* 核心动作按钮 */}
          <button 
            disabled={status !== 'idle'}
            onClick={handleStartBlast}
            className={`group relative px-16 py-6 rounded-full font-black text-xl uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 active:scale-95 ${
              status === 'idle' 
                ? 'bg-white text-black hover:bg-red-600 hover:text-white' 
                : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
            }`}
          >
            <span className="relative z-10">
              {status === 'idle' && '开启爆辣模拟'}
              {status === 'charging' && '系统蓄能中...'}
              {status === 'exploding' && 'CRITICAL ERROR!'}
            </span>
            {/* 蓄能填充动画 */}
            {status === 'charging' && (
              <div className="absolute inset-0 bg-red-600 origin-left animate-[fillProgress_1.5s_linear]" />
            )}
          </button>
        </div>

        {/* 爆炸特效层：火星粒子 */}
        {status === 'exploding' && (
          <div className="absolute inset-0 pointer-events-none z-0">
             <div className="absolute inset-0 bg-red-600/20 animate-pulse" />
             {Array.from({ length: 40 }).map((_, i) => (
               <div 
                 key={i}
                 className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-[spark_1s_ease-out_infinite]"
                 style={{ 
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                   animationDelay: `${Math.random()}s`,
                   '--tx': `${(Math.random() - 0.5) * 400}px`,
                   '--ty': `${(Math.random() - 0.5) * 400}px`
                 } as any}
               />
             ))}
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes fillProgress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes heavyShake {
          0%, 100% { transform: translate(0, 0) rotate(0); }
          25% { transform: translate(-4px, 4px) rotate(-1deg); }
          50% { transform: translate(4px, -4px) rotate(1deg); }
          75% { transform: translate(-4px, -4px) rotate(-1deg); }
        }
        @keyframes spark {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        @keyframes heatHaze {
          0%, 100% { transform: translateY(0) skewX(0); }
          50% { transform: translateY(-10px) skewX(2deg); }
        }
        @keyframes glitch {
          0% { transform: translate(0); text-shadow: -2px 0 red, 2px 0 blue; }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); text-shadow: 2px 0 red, -2px 0 blue; }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.8);
          border: 4px solid #fff;
          transition: all 0.2s;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 30px rgba(239, 68, 68, 1);
        }
      `}</style>
    </div>
  );
};
