'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Gavel, TrendingDown, Users } from 'lucide-react';
import { AuctionItem } from '@/types';

interface LiveAuctionStatusProps {
  item: AuctionItem;
  onBid?: (itemId: string, amount: number) => void;
}

export default function LiveAuctionStatus({ item, onBid }: LiveAuctionStatusProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [currentPrice, setCurrentPrice] = useState(item.currentPrice);
  const [nextDropIn, setNextDropIn] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endTime = new Date(item.endTime);
      const diff = endTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('終了');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

      // 価格下降のカウントダウン
      const nextDrop = item.priceDropInterval - (seconds % item.priceDropInterval);
      setNextDropIn(nextDrop);

      // 価格下降シミュレーション（実際の実装では WebSocket 等を使用）
      if (item.status === 'live' && seconds % item.priceDropInterval === 0 && currentPrice > item.minimumPrice) {
        setCurrentPrice(prev => Math.max(prev - item.priceDropAmount, item.minimumPrice));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [item, currentPrice]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleBid = () => {
    if (onBid && item.status === 'live') {
      onBid(item.id, currentPrice);
    }
  };

  return (
    <div className="card bg-gradient-to-br from-primary-800 to-primary-900 border-2 border-gold-500/30">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 盆栽画像 */}
        <div className="relative aspect-square rounded-xl overflow-hidden">
          <img
            src={item.bonsai.image}
            alt={item.bonsai.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            {item.status === 'live' && (
              <span className="px-3 py-1 bg-red-600/90 text-white text-sm rounded-full flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                ライブ中
              </span>
            )}
          </div>
        </div>

        {/* オークション情報 */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              {item.bonsai.name}
            </h3>
            <p className="text-white/70">{item.bonsai.description}</p>
          </div>

          {/* 価格情報 */}
          <div className="space-y-4">
            <div className="text-center p-6 bg-black/30 rounded-lg">
              <motion.div
                key={currentPrice}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-4xl font-bold text-gold-400 mb-2"
              >
                {formatPrice(currentPrice)}
              </motion.div>
              <div className="text-white/60 text-sm">現在価格</div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-white/60">開始価格</div>
                <div className="text-white font-semibold">{formatPrice(item.startPrice)}</div>
              </div>
              <div className="text-center">
                <div className="text-white/60">最低価格</div>
                <div className="text-white font-semibold">{formatPrice(item.minimumPrice)}</div>
              </div>
            </div>
          </div>

          {/* タイマー情報 */}
          {item.status === 'live' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-black/20 rounded-lg">
                <Clock className="w-6 h-6 text-gold-400 mx-auto mb-2" />
                <div className="text-white font-mono text-lg">{timeLeft}</div>
                <div className="text-white/60 text-xs">残り時間</div>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-lg">
                <TrendingDown className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <div className="text-white font-mono text-lg">{nextDropIn}秒</div>
                <div className="text-white/60 text-xs">次の価格下降</div>
              </div>
            </div>
          )}

          {/* 入札ボタン */}
          {item.status === 'live' && (
            <button
              onClick={handleBid}
              className="w-full btn-primary flex items-center justify-center space-x-2 text-lg py-4"
            >
              <Gavel className="w-6 h-6" />
              <span>この価格で入札</span>
            </button>
          )}

          {/* 入札履歴 */}
          {item.bidHistory.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white/80">
                <Users className="w-4 h-4" />
                <span className="text-sm">入札履歴</span>
              </div>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {item.bidHistory.map((bid) => (
                  <div key={bid.id} className="flex justify-between text-sm bg-black/20 rounded p-2">
                    <span className="text-white/70">{bid.bidderName}</span>
                    <span className="text-gold-400">{formatPrice(bid.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
