
import React from 'react';
import { STORY_DATA } from '../constants';

export const Story: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      {/* 品牌叙事核心抬头 */}
      <div className="max-w-4xl mx-auto text-center mb-24 reveal">
        <span className="text-red-600 font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Brand Philosophy</span>
        <h2 className="text-5xl md:text-7xl font-black mb-8 italic uppercase tracking-tighter">
          辣 · <span className="text-red-500 underline decoration-red-900 decoration-4 underline-offset-8">初心</span>
        </h2>
        <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed italic">
          “有一块辣条，不止是辣的味道。它来自手工的坚持，是一场味蕾与回忆的碰撞。”
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 reveal">
        <div>
          <span className="text-red-600 font-bold tracking-widest text-sm uppercase">Our Narrative</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2">故事主题</h2>
        </div>
        <p className="max-w-md text-zinc-500 text-sm leading-relaxed">
          我们不仅是在制作食物，更是在烟火气中寻找那份最真诚的情感连接。
        </p>
      </div>

      <div className="space-y-32">
        {STORY_DATA.map((node, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 group`}
          >
            <div className={`flex-1 relative overflow-hidden rounded-2xl ${index % 2 === 0 ? 'reveal-left' : 'reveal-right'}`}>
              <div className="absolute inset-0 bg-red-900/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img 
                src={node.image} 
                alt={node.title} 
                className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
            <div className={`flex-1 space-y-8 ${index % 2 === 0 ? 'reveal-right' : 'reveal-left'}`}>
              <div className="inline-block px-4 py-2 bg-red-600/10 border border-red-900/30 rounded-full">
                <span className="text-red-500 font-black italic">{node.year}</span>
              </div>
              <h3 className="text-4xl font-bold tracking-tight text-white">{node.title}</h3>
              <p className="text-zinc-400 text-xl font-light leading-loose">
                {node.content}
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-0.5 w-16 bg-red-600 group-hover:w-32 transition-all duration-700" />
                <span className="text-zinc-600 text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-all duration-700">Explore Depth</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
