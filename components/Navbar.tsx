
import React from 'react';

interface NavbarProps {
  scrollY: number;
}

export const Navbar: React.FC<NavbarProps> = ({ scrollY }) => {
  const isScrolled = scrollY > 50;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-xl py-4 border-b border-red-600/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent py-10 border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo 区域 */}
        <div 
          className="flex items-center space-x-3 group cursor-pointer" 
          onClick={() => scrollTo('hero')}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-red-600 rounded-sm rotate-45 flex items-center justify-center group-hover:bg-red-500 transition-all duration-500 group-hover:rotate-[225deg] shadow-[0_0_20px_rgba(220,38,38,0.3)]">
              <span className="text-white font-black text-xl -rotate-45 group-hover:rotate-[-225deg] transition-all duration-500">辣</span>
            </div>
            {/* 呼吸光效 */}
            <div className="absolute inset-0 bg-red-600/20 blur-xl rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">SpicyLatiao</span>
            <span className="text-[8px] text-red-600 font-bold tracking-[0.4em] uppercase opacity-80">Sensory Lab</span>
          </div>
        </div>

        {/* 导航链接 */}
        <div className="hidden md:flex items-center space-x-12 text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
          {['story', 'products', 'craft', 'hotzone'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="hover:text-white transition-all relative group py-2"
            >
              <span className="relative z-10">{item === 'hotzone' ? 'Blast Zone' : item}</span>
              {/* 动态指示器线 */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-500 ease-out group-hover:w-full"></span>
              <span className="absolute -bottom-1 left-0 w-0 h-[4px] bg-red-600/20 blur-sm transition-all duration-700 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* 动作按钮 */}
        <div className="flex items-center space-x-6">
          <button className="hidden lg:block text-[10px] font-bold text-zinc-500 hover:text-white transition-colors tracking-widest uppercase">
            Sign In
          </button>
          <button className="group relative bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-[0_10px_20px_-5px_rgba(220,38,38,0.4)] active:scale-95 overflow-hidden">
            <span className="relative z-10">立即订购</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>

      {/* 顶部进度条（可选装饰） */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent w-full opacity-0 transition-opacity duration-700" style={{ opacity: isScrolled ? 1 : 0 }}></div>
    </nav>
  );
};
