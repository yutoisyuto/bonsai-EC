'use client';

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { sampleUser, userBonsaiCollection } from '@/data/user';
import { Calendar, TrendingUp, TrendingDown, Droplets, Scissors, Package, Eye, BarChart3, Star, User, MapPin, Award } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function MyCollectionPage() {
  const [selectedSort, setSelectedSort] = useState<'date' | 'value' | 'gain'>('date');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const sortedCollection = [...userBonsaiCollection].sort((a, b) => {
    switch (selectedSort) {
      case 'value':
        return b.currentValue - a.currentValue;
      case 'gain':
        return (b.currentValue - b.purchasePrice) - (a.currentValue - a.purchasePrice);
      case 'date':
      default:
        return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
    }
  });

  const getMaintenanceIcon = (type: string) => {
    switch (type) {
      case 'watering': return <Droplets className="w-4 h-4 text-blue-400" />;
      case 'pruning': return <Scissors className="w-4 h-4 text-green-400" />;
      case 'repotting': return <Package className="w-4 h-4 text-amber-400" />;
      default: return <Calendar className="w-4 h-4 text-gray-400" />;
    }
  };

  const getMaintenanceTypeLabel = (type: string) => {
    const labels = {
      watering: '水やり',
      pruning: '剪定',
      repotting: '植え替え',
      fertilizing: '施肥',
      inspection: '点検'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const totalCurrentValue = userBonsaiCollection.reduce((sum, item) => sum + item.currentValue, 0);
  const totalPurchaseValue = userBonsaiCollection.reduce((sum, item) => sum + item.purchasePrice, 0);
  const totalGain = totalCurrentValue - totalPurchaseValue;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-gold-400 fill-current' : 'text-gray-400'}
      />
    ));
  };

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
          >
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
              <span className="text-white">マイ</span>
              <span className="text-gradient">コレクション</span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              {sampleUser.name}さんの盆栽コレクション - {userBonsaiCollection.length}点を管理中
            </p>

            {/* 概要統計 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card bg-gradient-to-br from-gold-600 to-gold-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gold-100 text-sm mb-1">総現在価値</p>
                    <p className="text-2xl font-bold text-white">{formatPrice(totalCurrentValue)}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-gold-200" />
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm mb-1">総購入価格</p>
                    <p className="text-2xl font-bold text-white">{formatPrice(totalPurchaseValue)}</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-400" />
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm mb-1">評価損益</p>
                    <p className={`text-2xl font-bold ${totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {totalGain >= 0 ? '+' : ''}{formatPrice(totalGain)}
                    </p>
                  </div>
                  {totalGain >= 0 ? 
                    <TrendingUp className="w-8 h-8 text-green-400" /> : 
                    <TrendingDown className="w-8 h-8 text-red-400" />
                  }
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* フィルターとソート */}
      <section className="py-8">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-white">コレクション一覧</h2>
            <div className="flex items-center space-x-4">
              <span className="text-white/70 text-sm">並び順:</span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as any)}
                className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="date">購入日順</option>
                <option value="value">現在価値順</option>
                <option value="gain">評価損益順</option>
              </select>
            </div>
          </div>

          {/* コレクション一覧 */}
          <div className="space-y-8">
            {sortedCollection.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* 盆栽画像 */}
                  <div className="relative aspect-square lg:aspect-auto rounded-xl overflow-hidden">
                    <img
                      src={item.bonsai.image}
                      alt={item.bonsai.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 基本情報 */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-2">
                        {item.bonsai.name}
                      </h3>
                      <p className="text-white/70 mb-3">{item.bonsai.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-white/60">樹種:</span>
                          <span className="text-white ml-2">{item.bonsai.species}</span>
                        </div>
                        <div>
                          <span className="text-white/60">樹齢:</span>
                          <span className="text-white ml-2">{item.bonsai.age}年</span>
                        </div>
                        <div>
                          <span className="text-white/60">職人:</span>
                          <span className="text-white ml-2">{item.bonsai.master}</span>
                        </div>
                        <div>
                          <span className="text-white/60">購入日:</span>
                          <span className="text-white ml-2">{new Date(item.purchaseDate).toLocaleDateString('ja-JP')}</span>
                        </div>
                      </div>
                    </div>

                    {/* 価格情報 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/20 rounded-lg p-4">
                        <p className="text-white/60 text-sm mb-1">購入価格</p>
                        <p className="text-white font-semibold">{formatPrice(item.purchasePrice)}</p>
                      </div>
                      <div className="bg-black/20 rounded-lg p-4">
                        <p className="text-white/60 text-sm mb-1">現在価値</p>
                        <p className="text-gold-400 font-semibold">{formatPrice(item.currentValue)}</p>
                      </div>
                    </div>

                    <div className="bg-black/20 rounded-lg p-4">
                      <p className="text-white/60 text-sm mb-1">評価損益</p>
                      <div className="flex items-center space-x-2">
                        <p className={`text-lg font-bold ${item.currentValue >= item.purchasePrice ? 'text-green-400' : 'text-red-400'}`}>
                          {item.currentValue >= item.purchasePrice ? '+' : ''}{formatPrice(item.currentValue - item.purchasePrice)}
                        </p>
                        <span className={`text-sm ${item.currentValue >= item.purchasePrice ? 'text-green-400' : 'text-red-400'}`}>
                          ({((item.currentValue - item.purchasePrice) / item.purchasePrice * 100).toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 販売者情報・履歴・メンテナンス */}
                  <div className="space-y-6">
                    {/* 販売者情報 */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">販売者情報</h4>
                      <div className="bg-black/20 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-white font-medium">{item.sellerInfo.name}</h5>
                          <div className="flex items-center space-x-1">
                            {renderStars(Math.floor(item.sellerInfo.reputation))}
                            <span className="text-white/70 text-sm ml-2">
                              {item.sellerInfo.reputation.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center space-x-2">
                            <MapPin size={14} className="text-gold-400" />
                            <span className="text-white/70">{item.sellerInfo.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Award size={14} className="text-gold-400" />
                            <span className="text-white/70">販売実績: {item.sellerInfo.totalSales}点</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar size={14} className="text-gold-400" />
                            <span className="text-white/70">会員歴: {new Date(item.sellerInfo.memberSince).toLocaleDateString('ja-JP')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Package size={14} className="text-gold-400" />
                            <span className="text-white/70">専門: {item.sellerInfo.speciality}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 所有者履歴 */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-white">所有者履歴</h4>
                        <button
                          onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                          className="text-gold-400 text-sm hover:text-gold-300 transition-colors"
                        >
                          {expandedItem === item.id ? '詳細を閉じる' : '詳細を見る'}
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(expandedItem === item.id ? item.ownershipHistory : item.ownershipHistory.slice(-2)).map((owner, idx) => (
                          <div key={owner.id} className="bg-black/20 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white font-medium text-sm">{owner.ownerName}</span>
                              <span className="text-white/60 text-xs">
                                {new Date(owner.startDate).toLocaleDateString('ja-JP')} - {owner.endDate ? new Date(owner.endDate).toLocaleDateString('ja-JP') : '現在'}
                              </span>
                            </div>
                            {owner.purchasePrice && (
                              <p className="text-gold-400 text-xs mb-1">
                                購入価格: {formatPrice(owner.purchasePrice)}
                              </p>
                            )}
                            <p className="text-white/70 text-xs">{owner.notes}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* メンテナンス記録 */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">メンテナンス記録</h4>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {item.maintenanceRecords.slice(0, 5).map((record) => (
                          <div key={record.id} className="bg-black/20 rounded-lg p-3">
                            <div className="flex items-center space-x-2 mb-2">
                              {getMaintenanceIcon(record.type)}
                              <span className="text-white font-medium text-sm">
                                {getMaintenanceTypeLabel(record.type)}
                              </span>
                              <span className="text-white/60 text-xs ml-auto">
                                {new Date(record.date).toLocaleDateString('ja-JP')}
                              </span>
                            </div>
                            <p className="text-white/70 text-xs mb-1">{record.notes}</p>
                            <p className="text-white/50 text-xs">担当: {record.technician}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Link
                      href={`/my-collection/${item.id}`}
                      className="w-full flex items-center justify-center space-x-2 bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap"
                    >
                      <Eye size={16} />
                      <span>詳細・管理</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
