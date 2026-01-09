
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-red-900/30' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => scrollTo('hero')}>
          <div className="w-8 h-8 bg-red-600 rounded-sm rotate-45 flex items-center justify-center group-hover:bg-red-500 transition-colors">
            <span className="text-white font-bold -rotate-45">辣</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase italic">SpicyLatiao</span>
        </div>

        <div className="hidden md:flex space-x-10 text-sm font-bold uppercase tracking-widest text-zinc-400">
          {['story', 'products', 'craft', 'hotzone'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="hover:text-red-500 transition-colors relative group"
            >
              {item === 'hotzone' ? 'Blast Hot Zone' : item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
            </button>
          ))}
        </div>

        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold text-sm transition-all shadow-lg shadow-red-900/20 active:scale-95">
          立即订购
        </button>
      </div>
    </nav>
  );
};
