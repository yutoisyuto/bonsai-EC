import { LiveAuction, AuctionItem } from '@/types';
import { bonsaiData } from './bonsai';

// 現在時刻から相対的な時間を生成
const now = new Date();
const liveStart = new Date(now.getTime() - 10 * 60 * 1000); // 10分前開始
const liveEnd = new Date(now.getTime() + 20 * 60 * 1000); // 20分後終了
const upcomingStart = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2時間後開始
const upcomingEnd = new Date(now.getTime() + 3 * 60 * 60 * 1000); // 3時間後終了

export const auctionItems: AuctionItem[] = [
  {
    id: 'auction-1',
    bonsai: bonsaiData[0], // 松の名品 - 雲龍
    startPrice: 3000000,
    currentPrice: 2650000,
    minimumPrice: 2000000,
    startTime: liveStart.toISOString(),
    endTime: liveEnd.toISOString(),
    status: 'live',
    priceDropInterval: 30, // 30秒ごと
    priceDropAmount: 50000, // 5万円ずつ下降
    bidHistory: [
      {
        id: 'bid-1',
        bidderName: '会員 H.T.',
        amount: 2700000,
        timestamp: new Date(now.getTime() - 5 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: 'auction-2',
    bonsai: bonsaiData[3], // 梅の香 - 雪月花
    startPrice: 5000000,
    currentPrice: 4200000,
    minimumPrice: 3500000,
    startTime: liveStart.toISOString(),
    endTime: liveEnd.toISOString(),
    status: 'live',
    priceDropInterval: 45,
    priceDropAmount: 100000,
    bidHistory: []
  },
  {
    id: 'auction-3',
    bonsai: bonsaiData[1], // 楓の雅 - 紅葉
    startPrice: 2200000,
    currentPrice: 2200000,
    minimumPrice: 1500000,
    startTime: upcomingStart.toISOString(),
    endTime: upcomingEnd.toISOString(),
    status: 'upcoming',
    priceDropInterval: 30,
    priceDropAmount: 30000,
    bidHistory: []
  }
];

export const liveAuction: LiveAuction = {
  id: 'live-auction-2025-01',
  title: '2025年新春特別オークション',
  description: '新年を迎えるにふさわしい名品盆栽をダッチオークション形式でご提供いたします。',
  items: auctionItems,
  status: 'live',
  startTime: liveStart.toISOString(),
  endTime: liveEnd.toISOString()
};
