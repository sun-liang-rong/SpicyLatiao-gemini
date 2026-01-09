
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-zinc-900 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-10 h-10 bg-red-600 rounded-sm rotate-45 flex items-center justify-center">
                <span className="text-white font-bold -rotate-45">辣</span>
              </div>
              <span className="text-3xl font-black tracking-tighter text-white uppercase italic">SpicyLatiao</span>
            </div>
            <p className="text-zinc-500 max-w-sm mb-8 leading-loose">
              我们不仅制造辣条，我们创造关于“痛并快乐着”的独特记忆。加入全球数百万“辣友”的行列，发现你的新境界。
            </p>
            <div className="flex space-x-6">
               {['WeChat', 'RedBook', 'TikTok', 'Instagram'].map(social => (
                 <a key={social} href="#" className="text-zinc-500 hover:text-red-500 transition-colors text-sm uppercase tracking-widest font-bold">
                   {social}
                 </a>
               ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">探索品牌</h4>
            <ul className="space-y-4 text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">品牌故事</a></li>
              <li><a href="#" className="hover:text-white transition-colors">手工工艺</a></li>
              <li><a href="#" className="hover:text-white transition-colors">原材料追溯</a></li>
              <li><a href="#" className="hover:text-white transition-colors">常见问题</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">联系我们</h4>
            <ul className="space-y-4 text-zinc-500">
              <li>客服热线: 400-888-HOT</li>
              <li>官方邮箱: hello@spicylatiao.art</li>
              <li>合作洽谈: biz@spicylatiao.art</li>
              <li className="pt-4">
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-full text-xs font-bold uppercase transition-all">
                  下载品牌手册 (PDF)
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-xs uppercase tracking-widest font-bold">
            © 2024 SPICY LATIAO BRANDING STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-8 text-zinc-600 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
