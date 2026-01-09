
import { Product, StoryNode } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '爆辣绝响',
    spicyLevel: 5,
    description: '采用特级魔鬼椒，十八道工序手工锤炼，辣感层层递进，挑战极限。',
    color: '#991b1b',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800',
    tagline: '辣出真味，手作不将就'
  },
  {
    id: '2',
    name: '椒香暖流',
    spicyLevel: 3,
    description: '浓郁芝麻与汉源花椒碰撞，手工拉丝，每一口都是温柔的辛香。',
    color: '#ea580c',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800',
    tagline: '热辣一刻，回味一生'
  },
  {
    id: '3',
    name: '秘制酸辣',
    spicyLevel: 2,
    description: '古法窖藏老醋，配以鲜椒碎，酸爽开胃，手工辣条的现代变奏。',
    color: '#854d0e',
    image: 'https://images.unsplash.com/photo-1512058560366-cd2429598a60?auto=format&fit=crop&q=80&w=800',
    tagline: '每一片，都有故事'
  },
  {
    id: '4',
    name: '芝麻脆香',
    spicyLevel: 1,
    description: '满满芝麻包裹，酥脆可口，辣度适中，是休闲时刻的最佳伴侣。',
    color: '#d97706',
    image: 'https://images.unsplash.com/photo-1606914469683-bd3fe2e54911?auto=format&fit=crop&q=80&w=800',
    tagline: '辣得刚好，不止刺激'
  },
  {
    id: '5',
    name: '深夜之吻',
    spicyLevel: 4,
    description: '黑鸭风味秘方，甜辣交织，深邃诱惑，专为深夜追剧而生。',
    color: '#4c1d95',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    tagline: '吃出热辣好心情'
  },
  {
    id: '6',
    name: '咸蛋黄爆浆',
    spicyLevel: 3,
    description: '沙沙咸蛋黄遇上劲道辣条，咸香热辣在口腔瞬间炸裂。',
    color: '#b45309',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800',
    tagline: '辣条也讲态度'
  }
];

export const STORY_DATA: StoryNode[] = [
  {
    year: '初心',
    title: '不止是辣的味道',
    content: '它来自手工的坚持，是一场味蕾与回忆的碰撞。在烟火与热辣之间，我们把每一片辣条当成最真诚的作品。',
    image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&q=80&w=600'
  },
  {
    year: '手作',
    title: '连接瞬间的温度',
    content: '它不是快餐文化的标签，而是连接你我每一个“想吃就吃”的瞬间。无论是仲夏谈笑，还是深夜追剧。',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600'
  },
  {
    year: '回响',
    title: '老朋友的问候',
    content: '它像一个老朋友在说：“来呀，再来一口”。香辣在口，热情在心，让每一口都有温度。',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600'
  }
];
