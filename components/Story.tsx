
import React from 'react';
import { STORY_DATA } from '../constants';

export const Story: React.FC = () => {
  return (
    <div className="container mx-auto px-6 relative">
      {/* 背景装饰：巨型浮雕文字 */}
      <div className="absolute -top-20 -left-10 opacity-[0.03] select-none pointer-events-none">
        <span className="text-[20rem] font-black italic uppercase tracking-tighter">Narrative</span>
      </div>

      {/* 品牌叙事核心抬头 */}
      <div className="max-w-4xl mx-auto text-center mb-32 reveal">
        <div className="inline-flex items-center space-x-4 mb-4">
          <span className="h-[1px] w-12 bg-red-900/50"></span>
          <span className="text-red-600 font-bold tracking-[0.4em] text-[10px] uppercase">Brand Philosophy</span>
          <span className="h-[1px] w-12 bg-red-900/50"></span>
        </div>
        
        <h2 className="text-6xl md:text-[8rem] font-black mb-10 italic uppercase tracking-tighter leading-none">
          <span className="inline-block hover:animate-[flicker_0.5s_infinite] transition-all">辣</span> 
          <span className="text-zinc-800 mx-4 md:mx-8">·</span> 
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-red-600 to-red-900">
            初心
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-600/30 blur-[2px]"></span>
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-red-600"></span>
          </span>
        </h2>
        
        <p className="text-xl md:text-3xl text-zinc-400 font-light leading-relaxed italic max-w-2xl mx-auto">
          “有一块辣条，不止是辣的味道。它是<span className="text-white">手工的执念</span>，是味蕾与岁月的<span className="text-red-600">热烈碰撞</span>。”
        </p>
      </div>

      {/* 故事主题次级抬头 */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 reveal">
        <div className="relative group">
          <span className="text-red-600 font-bold tracking-[0.3em] text-[10px] uppercase block mb-2">The Archive</span>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter relative">
            <span className="relative z-10 text-white group-hover:text-red-500 transition-colors duration-500">故事主题</span>
            {/* 故障艺术阴影效果 */}
            <span className="absolute top-0 left-0 -z-10 text-red-900/30 translate-x-[2px] translate-y-[2px] group-hover:translate-x-[4px] group-hover:translate-y-[4px] transition-transform">故事主题</span>
            <span className="absolute top-0 left-0 -z-20 text-zinc-800/50 -translate-x-[2px] -translate-y-[2px] group-hover:-translate-x-[4px] group-hover:-translate-y-[4px] transition-transform">故事主题</span>
          </h2>
          <div className="h-1 w-20 bg-red-600 mt-4 group-hover:w-full transition-all duration-700"></div>
        </div>
        <p className="max-w-md text-zinc-500 text-sm md:text-base leading-relaxed font-light border-l border-zinc-800 pl-6">
          我们不仅是在制作食物，更是在烟火气中寻找那份最真诚的情感连接。每一道工序，都藏着一段未曾言说的时光。
        </p>
      </div>

      <div className="space-y-40">
        {STORY_DATA.map((node, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 group`}
          >
            {/* 图片容器：增加视差感与呼吸光圈 */}
            <div className={`flex-1 relative aspect-[4/5] md:aspect-auto md:h-[600px] w-full overflow-hidden rounded-3xl ${index % 2 === 0 ? 'reveal-left' : 'reveal-right'}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />
              <div className="absolute inset-0 border-[1px] border-white/5 z-20 pointer-events-none" />
              
              <img 
                src={node.image} 
                alt={node.title} 
                className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110"
              />
              
              {/* 图片浮层文字：节点年份 */}
              <div className={`absolute top-10 ${index % 2 === 0 ? 'right-10' : 'left-10'} z-20`}>
                <span className="text-8xl font-black text-white/5 italic select-none leading-none">
                  {index + 1}
                </span>
              </div>
            </div>

            {/* 内容容器 */}
            <div className={`flex-1 space-y-10 ${index % 2 === 0 ? 'reveal-right' : 'reveal-left'}`}>
              <div className="inline-flex items-center space-x-4">
                <span className="w-10 h-[1px] bg-red-600"></span>
                <span className="text-red-500 font-black italic tracking-widest uppercase text-sm">{node.year}</span>
              </div>

              <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic leading-tight">
                {node.title.split('').map((char, i) => (
                  <span key={i} className="inline-block hover:text-red-600 hover:-translate-y-1 transition-all duration-300">
                    {char}
                  </span>
                ))}
              </h3>

              <p className="text-zinc-400 text-lg md:text-2xl font-light leading-relaxed">
                {node.content}
              </p>

              <button className="flex items-center space-x-6 group/btn py-4">
                <div className="relative flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-zinc-800 group-hover/btn:border-red-600 group-hover/btn:scale-110 transition-all duration-500"></div>
                  <svg className="w-4 h-4 absolute text-zinc-500 group-hover/btn:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <span className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] font-black group-hover/btn:text-white transition-colors">
                  Dive into Detail
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 5px #ef4444); }
          50% { opacity: 0.7; filter: drop-shadow(0 0 20px #ef4444); }
        }
      `}</style>
    </div>
  );
};
