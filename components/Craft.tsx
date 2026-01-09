
import React, { useState } from 'react';

const steps = [
  { 
    id: '01', 
    title: '匠心选料', 
    label: 'SELECTION',
    desc: '选自北纬36度特定产区优质小麦，天然纯度，保证每一根辣条的劲道源头。',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    id: '02', 
    title: '古法研磨', 
    label: 'GRINDING',
    desc: '坚持低温石磨粉碎，不破坏谷物细胞壁，最大限度保留原始麦香与营养成分。',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    id: '03', 
    title: '手工揉捏', 
    label: 'KNEADING',
    desc: '老师傅千次手工摔打揉捏，在面团中形成独特的蜂窝状呼吸结构，口感丰盈。',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    id: '04', 
    title: '秘制浸渍', 
    label: 'INFUSION',
    desc: '72小时恒温红油浸渍，加入24味天然香料，让热辣穿透每一层纤维空间。',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200'
  },
];

export const Craft: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="container mx-auto px-6">
      <div className="relative bg-zinc-950 rounded-[3rem] p-8 md:p-20 border border-zinc-800/30 overflow-hidden reveal shadow-2xl">
        
        {/* 背景装饰：流动的工艺水印 */}
        <div className="absolute top-10 left-0 w-full whitespace-nowrap opacity-[0.02] pointer-events-none select-none">
          <span className="text-[12rem] font-black italic uppercase tracking-tighter inline-block animate-marquee">
            Handmade Craftsmanship • Stone Ground • Slow Process • Pure Wheat • 
          </span>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row gap-16">
          {/* 左侧：文字叙述与垂直进度轴 */}
          <div className="flex-1 space-y-12">
            <div className="reveal">
              <span className="text-red-600 font-bold uppercase tracking-[0.4em] text-xs">The Art of Making</span>
              <h2 className="text-5xl md:text-7xl font-black mt-4 mb-8 italic uppercase tracking-tighter leading-none">
                慢工出细活<br/>
                <span className="text-zinc-600">辣是</span><span className="text-red-500 underline decoration-red-900/50 underline-offset-8">磨</span><span className="text-zinc-600">出来的</span>
              </h2>
            </div>

            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div 
                  key={step.id}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`group relative pl-12 py-6 cursor-pointer border-l-2 transition-all duration-500 ${
                    activeStep === idx ? 'border-red-600 bg-red-600/5' : 'border-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  {/* 数字装饰 */}
                  <span className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all duration-500 ${
                    activeStep === idx ? 'bg-red-600 border-red-600 text-white' : 'bg-black border-zinc-800 text-zinc-600'
                  }`}>
                    {step.id}
                  </span>

                  <div className="flex flex-col">
                    <span className={`text-[10px] font-bold tracking-widest uppercase mb-1 transition-colors ${
                      activeStep === idx ? 'text-red-400' : 'text-zinc-600'
                    }`}>
                      {step.label}
                    </span>
                    <h3 className={`text-2xl font-black transition-colors ${
                      activeStep === idx ? 'text-white' : 'text-zinc-500'
                    }`}>
                      {step.title}
                    </h3>
                    <div className={`overflow-hidden transition-all duration-500 ${
                      activeStep === idx ? 'max-h-32 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-zinc-400 leading-relaxed text-sm font-light">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧：大型动态视觉容器 */}
          <div className="flex-1 relative h-[500px] lg:h-auto reveal">
            <div className="sticky top-20 w-full h-full rounded-2xl overflow-hidden border border-zinc-800 group/img shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]">
              {/* 装饰性的叠加层 */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 z-20 border-[20px] border-black/10 mix-blend-overlay pointer-events-none" />
              
              {/* 图片切换层 */}
              {steps.map((step, idx) => (
                <div
                  key={step.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${
                    activeStep === idx ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-110 rotate-2'
                  }`}
                >
                  <img 
                    src={step.image} 
                    className="w-full h-full object-cover" 
                    alt={step.title} 
                  />
                  {/* 工艺状态指示器 */}
                  <div className="absolute bottom-10 left-10 z-30">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center">
                        <span className="text-xs font-black text-white">{step.id}</span>
                      </div>
                      <div>
                        <div className="h-[1px] w-24 bg-red-600 mb-2"></div>
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-300">Phase Complete</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 外部角装饰 */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-red-600/30 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-red-600/30 -z-10" />
          </div>
        </div>

        {/* 底部：实拍短视频展示区 */}
        <div className="mt-24 pt-16 border-t border-zinc-900 reveal">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-[10px]">Process Cinema</span>
              <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mt-2 text-white">
                纪录片：匠心之“慢”
              </h3>
              <p className="text-zinc-500 mt-4 text-sm leading-relaxed font-light">
                在这个快节奏的时代，我们选择用时间交换质感。每一帧画面，都是对传统手工艺术最诚挚的致敬。点击观看我们的慢工哲学。
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Available in 4K</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 rounded-full bg-red-600 animate-pulse"></div>
                <div className="w-1 h-1 rounded-full bg-red-600 animate-pulse delay-75"></div>
                <div className="w-1 h-1 rounded-full bg-red-600 animate-pulse delay-150"></div>
              </div>
            </div>
          </div>

          <div 
            className="group relative w-full aspect-video rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl cursor-pointer"
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
          >
            {/* 模拟视频封面/播放器 */}
            <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-black/20 transition-all duration-700" />
            
            {/* 电影感装饰线条 */}
            <div className="absolute top-8 left-8 z-20 flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[10px] font-black text-white tracking-[0.2em] uppercase">REC • CRAFT_LOG.MP4</span>
            </div>
            
            <div className="absolute bottom-8 right-8 z-20">
               <span className="text-[10px] font-mono text-zinc-400 tracking-widest">TC 00:04:72:24</span>
            </div>

            {/* 居中播放按钮 */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className={`w-24 h-24 rounded-full border-2 border-white/20 backdrop-blur-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-red-600 group-hover:bg-red-600/10 ${isVideoPlaying ? 'opacity-0 scale-150' : 'opacity-100'}`}>
                 <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M8 5v14l11-7z" />
                 </svg>
              </div>
            </div>

            {/* 视频背景（此处使用一张极具质感的慢动作视频封面图模拟） */}
            <img 
              src="https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=2000" 
              className={`w-full h-full object-cover transition-transform duration-[10s] ease-linear ${isVideoPlaying ? 'scale-125 brightness-110' : 'scale-100 brightness-75 group-hover:scale-105'}`}
              alt="Craft Process Film"
            />

            {/* 底部信息条 */}
            <div className="absolute bottom-0 left-0 w-full p-8 z-20 bg-gradient-to-t from-black via-black/20 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Cinematography</span>
                    <span className="text-white text-sm font-bold">SPICY_STUDIO</span>
                  </div>
                  <div className="w-[1px] h-6 bg-zinc-800"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Duration</span>
                    <span className="text-white text-sm font-bold">03:45</span>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-[10px] font-bold text-white underline underline-offset-4 tracking-[0.2em] uppercase">Enter Full Cinema</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};
