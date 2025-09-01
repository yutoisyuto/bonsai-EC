'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LiveAuctionStatus from '@/components/sections/LiveAuctionStatus';
import { liveAuction, auctionItems } from '@/data/auction';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Trophy } from 'lucide-react';

export default function AuctionPage() {
  const [selectedTab, setSelectedTab] = useState<'live' | 'upcoming' | 'ended'>('live');

  const liveItems = auctionItems.filter(item => item.status === 'live');
  const upcomingItems = auctionItems.filter(item => item.status === 'upcoming');
  const endedItems = auctionItems.filter(item => item.status === 'ended');

  const handleBid = (itemId: string, amount: number) => {
    // 実際の実装では API を呼び出し
    console.log(`入札: アイテム ${itemId} に ${amount}円`);
    alert(`${amount.toLocaleString()}円で入札を受け付けました。`);
  };

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* ヒーロー */}
      <section className="section-padding bg-gradient-to-b from-primary-800 to-primary-900">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-6">
              <span className="text-white">ライブ</span>
              <span className="text-gradient">オークション</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              {liveAuction.title} - ダッチオークション方式で価格が下降、最初の入札で即座に落札決定
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2 bg-black/20 px-4 py-2 rounded-lg">
                <Users className="w-4 h-4 text-gold-400" />
                <span className="text-white/80">参加者数: 47名</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/20 px-4 py-2 rounded-lg">
                <Trophy className="w-4 h-4 text-gold-400" />
                <span className="text-white/80">今回出品: {auctionItems.length}点</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* タブナビゲーション */}
      <section className="py-8">
        <div className="container-custom">
          <div className="flex justify-center mb-8">
            <div className="flex bg-black/20 rounded-lg p-1">
              {[
                { key: 'live' as const, label: 'ライブ中', count: liveItems.length },
                { key: 'upcoming' as const, label: '開催予定', count: upcomingItems.length },
                { key: 'ended' as const, label: '終了済み', count: endedItems.length },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key)}
                  className={`px-6 py-3 rounded-md transition-all whitespace-nowrap ${
                    selectedTab === tab.key
                      ? 'bg-gold-500 text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* ライブオークション */}
          {selectedTab === 'live' && (
            <div className="space-y-8">
              {liveItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <LiveAuctionStatus item={item} onBid={handleBid} />
                </motion.div>
              ))}
            </div>
          )}

          {/* 開催予定 */}
          {selectedTab === 'upcoming' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card"
                >
                  <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                    <img
                      src={item.bonsai.image}
                      alt={item.bonsai.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.bonsai.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">{item.bonsai.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/60">
                      <div className="flex items-center space-x-1 mb-1">
                        <Calendar className="w-3 h-3" />
                        <span>開始: {new Date(item.startTime).toLocaleString('ja-JP')}</span>
                      </div>
                      <div className="text-gold-400 font-semibold">
                        開始価格: {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', minimumFractionDigits: 0 }).format(item.startPrice)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* 終了済み */}
          {selectedTab === 'ended' && (
            <div className="text-center py-16">
              <Clock className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl text-white/70">終了したオークションはありません</h3>
              <p className="text-white/50">過去のオークション結果は会員ページで確認できます。</p>
            </div>
          )}
        </div>
      </section>

      {/* オークション説明 */}
      <section className="section-padding bg-gradient-to-br from-primary-800 to-primary-900">
        <div className="container-custom">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            <span className="text-white">ダッチオークション</span>
            <span className="text-gradient">について</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">参加方法</h3>
              <p className="text-white/70">会員登録後、招待コードを受け取りサインイン。事前に入札上限を設定します。</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">価格の下降</h3>
              <p className="text-white/70">オークション開始後、一定間隔で価格が下がっていきます。最初の入札で即時確定です。</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">受け渡し</h3>
              <p className="text-white/70">落札後はプロの庭園にて保管・維持管理。希望により輸出や短期レンタルも可能です。</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
