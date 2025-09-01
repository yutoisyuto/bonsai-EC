'use client';

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { sampleUser, userBonsaiCollection } from '@/data/user';
import { BarChart3, TrendingUp, Leaf, Calendar, Eye, Settings } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalCurrentValue = userBonsaiCollection.reduce((sum, item) => sum + item.currentValue, 0);
  const totalPurchaseValue = userBonsaiCollection.reduce((sum, item) => sum + item.purchasePrice, 0);
  const totalGain = totalCurrentValue - totalPurchaseValue;
  const gainPercentage = ((totalGain / totalPurchaseValue) * 100).toFixed(1);

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* ヒーロー */}
      <section className="section-padding bg-gradient-to-b from-primary-800 to-primary-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
                おかえりなさい、<span className="text-gradient">{sampleUser.name}</span>さん
              </h1>
              <p className="text-xl text-white/80">
                あなたのコレクションの最新状況をご確認ください
              </p>
            </div>
            <div className="hidden md:block w-20 h-20 rounded-full overflow-hidden border-2 border-gold-400">
              <img
                src={sampleUser.avatar}
                alt={sampleUser.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* 概要統計 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card bg-gradient-to-br from-gold-600 to-gold-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gold-100 text-sm mb-1">総資産価値</p>
                  <p className="text-2xl font-bold text-white">{formatPrice(totalCurrentValue)}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-gold-200" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm mb-1">評価損益</p>
                  <p className={`text-2xl font-bold ${totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {totalGain >= 0 ? '+' : ''}{formatPrice(totalGain)}
                  </p>
                  <p className={`text-sm ${totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ({totalGain >= 0 ? '+' : ''}{gainPercentage}%)
                  </p>
                </div>
                <TrendingUp className={`w-8 h-8 ${totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm mb-1">保有数</p>
                  <p className="text-2xl font-bold text-white">{userBonsaiCollection.length}点</p>
                </div>
                <Leaf className="w-8 h-8 text-green-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm mb-1">会員歴</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.floor((new Date().getTime() - new Date(sampleUser.memberSince).getTime()) / (1000 * 60 * 60 * 24 * 365))}年
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-blue-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* クイックアクション */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-2xl font-serif font-bold text-white mb-8">クイックアクション</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/my-collection" className="card hover:border-gold-500/50 transition-colors">
              <div className="text-center">
                <Leaf className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">マイコレクション</h3>
                <p className="text-white/70 text-sm">あなたの盆栽コレクションを管理</p>
              </div>
            </Link>
            
            <Link href="/auction" className="card hover:border-gold-500/50 transition-colors">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">ライブオークション</h3>
                <p className="text-white/70 text-sm">新しい盆栽を入札で獲得</p>
              </div>
            </Link>
            
            <Link href="/profile" className="card hover:border-gold-500/50 transition-colors">
              <div className="text-center">
                <Settings className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">プロフィール設定</h3>
                <p className="text-white/70 text-sm">アカウント情報の管理</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 最近のコレクション */}
      <section className="section-padding bg-gradient-to-br from-primary-800 to-primary-900">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-white">最近のコレクション</h2>
            <Link href="/my-collection" className="btn-secondary">
              すべて見る
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBonsaiCollection.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card group"
              >
                <div className="aspect-square mb-4 rounded-lg overflow-hidden">
                  <img
                    src={item.bonsai.image}
                    alt={item.bonsai.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.bonsai.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">購入価格</span>
                    <span className="text-white">{formatPrice(item.purchasePrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">現在価値</span>
                    <span className="text-gold-400">{formatPrice(item.currentValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">評価損益</span>
                    <span className={item.currentValue >= item.purchasePrice ? 'text-green-400' : 'text-red-400'}>
                      {item.currentValue >= item.purchasePrice ? '+' : ''}{formatPrice(item.currentValue - item.purchasePrice)}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/my-collection/${item.id}`}
                  className="mt-4 flex items-center justify-center space-x-2 bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap"
                >
                  <Eye size={16} />
                  <span>詳細を見る</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
