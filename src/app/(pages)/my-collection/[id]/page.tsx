'use client';

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { userBonsaiCollection } from '@/data/user';
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Droplets, 
  Scissors, 
  Package, 
  BarChart3, 
  Star, 
  MapPin, 
  Award, 
  ArrowLeft,
  Camera,
  User,
  History,
  Wrench
} from 'lucide-react';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BonsaiDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'maintenance' | 'gallery'>('overview');

  const bonsaiItem = userBonsaiCollection.find(item => item.id === params.id);

  if (!bonsaiItem) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="section-padding">
          <div className="container-custom text-center">
            <h1 className="text-2xl font-bold text-white mb-4">盆栽が見つかりません</h1>
            <Link href="/my-collection" className="btn-primary">
              コレクションに戻る
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-gold-400 fill-current' : 'text-gray-400'}
      />
    ));
  };

  const getMaintenanceIcon = (type: string) => {
    switch (type) {
      case 'watering': return <Droplets className="w-5 h-5 text-blue-400" />;
      case 'pruning': return <Scissors className="w-5 h-5 text-green-400" />;
      case 'repotting': return <Package className="w-5 h-5 text-amber-400" />;
      case 'fertilizing': return <Wrench className="w-5 h-5 text-purple-400" />;
      case 'inspection': return <Calendar className="w-5 h-5 text-gray-400" />;
      default: return <Calendar className="w-5 h-5 text-gray-400" />;
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

  const gain = bonsaiItem.currentValue - bonsaiItem.purchasePrice;
  const gainPercentage = ((gain / bonsaiItem.purchasePrice) * 100).toFixed(1);

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* ナビゲーション */}
      <section className="py-6 bg-primary-800">
        <div className="container-custom">
          <Link 
            href="/my-collection"
            className="flex items-center space-x-2 text-gold-400 hover:text-gold-300 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>マイコレクションに戻る</span>
          </Link>
        </div>
      </section>

      {/* ヒーロー */}
      <section className="section-padding bg-gradient-to-b from-primary-800 to-primary-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 盆栽画像 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={bonsaiItem.bonsai.image}
                  alt={bonsaiItem.bonsai.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-4 right-4 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                <Camera className="w-6 h-6 text-white" />
              </button>
            </motion.div>

            {/* 基本情報 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
                  {bonsaiItem.bonsai.name}
                </h1>
                <p className="text-xl text-white/80 mb-6">
                  {bonsaiItem.bonsai.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-black/20 rounded-lg p-4">
                    <p className="text-white/60 text-sm mb-1">樹種</p>
                    <p className="text-white font-semibold">{bonsaiItem.bonsai.species}</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4">
                    <p className="text-white/60 text-sm mb-1">樹齢</p>
                    <p className="text-white font-semibold">{bonsaiItem.bonsai.age}年</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4">
                    <p className="text-white/60 text-sm mb-1">職人</p>
                    <p className="text-white font-semibold">{bonsaiItem.bonsai.master}</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4">
                    <p className="text-white/60 text-sm mb-1">購入日</p>
                    <p className="text-white font-semibold">
                      {new Date(bonsaiItem.purchaseDate).toLocaleDateString('ja-JP')}
                    </p>
                  </div>
                </div>
              </div>

              {/* 価格情報 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card bg-gradient-to-br from-gold-600 to-gold-700 text-center">
                  <BarChart3 className="w-8 h-8 text-gold-200 mx-auto mb-2" />
                  <p className="text-gold-100 text-sm mb-1">現在価値</p>
                  <p className="text-xl font-bold text-white">{formatPrice(bonsaiItem.currentValue)}</p>
                </div>
                
                <div className="card text-center">
                  <Package className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-white/70 text-sm mb-1">購入価格</p>
                  <p className="text-xl font-bold text-white">{formatPrice(bonsaiItem.purchasePrice)}</p>
                </div>
                
                <div className="card text-center">
                  {gain >= 0 ? 
                    <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" /> : 
                    <TrendingDown className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  }
                  <p className="text-white/70 text-sm mb-1">評価損益</p>
                  <p className={`text-xl font-bold ${gain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {gain >= 0 ? '+' : ''}{formatPrice(gain)}
                  </p>
                  <p className={`text-sm ${gain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ({gain >= 0 ? '+' : ''}{gainPercentage}%)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* タブナビゲーション */}
      <section className="py-8">
        <div className="container-custom">
          <div className="flex flex-wrap space-x-0 md:space-x-4 space-y-2 md:space-y-0 mb-8 border-b border-white/10">
            {[
              { id: 'overview', label: '概要', icon: BarChart3 },
              { id: 'history', label: '所有者履歴', icon: History },
              { id: 'maintenance', label: 'メンテナンス', icon: Wrench },
              { id: 'gallery', label: 'ギャラリー', icon: Camera }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-gold-600 text-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* タブコンテンツ */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 概要タブ */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 販売者情報 */}
                <div className="card">
                  <h3 className="text-xl font-serif font-bold text-white mb-4">販売者情報</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-medium">{bonsaiItem.sellerInfo.name}</h4>
                      <div className="flex items-center space-x-1">
                        {renderStars(Math.floor(bonsaiItem.sellerInfo.reputation))}
                        <span className="text-white/70 text-sm ml-2">
                          {bonsaiItem.sellerInfo.reputation.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} className="text-gold-400" />
                        <span className="text-white/70">{bonsaiItem.sellerInfo.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award size={16} className="text-gold-400" />
                        <span className="text-white/70">販売実績: {bonsaiItem.sellerInfo.totalSales}点</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gold-400" />
                        <span className="text-white/70">
                          会員歴: {new Date(bonsaiItem.sellerInfo.memberSince).toLocaleDateString('ja-JP')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Package size={16} className="text-gold-400" />
                        <span className="text-white/70">専門: {bonsaiItem.sellerInfo.speciality}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 最近のメンテナンス */}
                <div className="card">
                  <h3 className="text-xl font-serif font-bold text-white mb-4">最近のメンテナンス</h3>
                  <div className="space-y-3">
                    {bonsaiItem.maintenanceRecords.slice(0, 3).map((record) => (
                      <div key={record.id} className="bg-black/20 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          {getMaintenanceIcon(record.type)}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-white font-medium">
                                {getMaintenanceTypeLabel(record.type)}
                              </span>
                              <span className="text-white/60 text-sm">
                                {new Date(record.date).toLocaleDateString('ja-JP')}
                              </span>
                            </div>
                            <p className="text-white/70 text-sm mt-1">{record.notes}</p>
                            <p className="text-white/50 text-xs mt-1">担当: {record.technician}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 所有者履歴タブ */}
            {activeTab === 'history' && (
              <div className="card">
                <h3 className="text-xl font-serif font-bold text-white mb-6">所有者履歴</h3>
                <div className="space-y-6">
                  {bonsaiItem.ownershipHistory.map((owner, index) => (
                    <motion.div
                      key={owner.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* タイムライン線 */}
                      {index !== bonsaiItem.ownershipHistory.length - 1 && (
                        <div className="absolute left-6 top-12 w-px h-16 bg-gradient-to-b from-gold-400 to-gold-600"></div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        {/* タイムライン点 */}
                        <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        
                        {/* コンテンツ */}
                        <div className="flex-1 bg-black/20 rounded-lg p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                            <h4 className="text-white font-semibold text-lg">{owner.ownerName}</h4>
                            <div className="text-white/60 text-sm">
                              {new Date(owner.startDate).toLocaleDateString('ja-JP')} - {
                                owner.endDate ? new Date(owner.endDate).toLocaleDateString('ja-JP') : '現在'
                              }
                            </div>
                          </div>
                          
                          {owner.purchasePrice && (
                            <div className="mb-3">
                              <span className="inline-block bg-gold-600 text-white text-xs px-3 py-1 rounded-full">
                                購入価格: {formatPrice(owner.purchasePrice)}
                              </span>
                            </div>
                          )}
                          
                          <p className="text-white/80">{owner.notes}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* メンテナンスタブ */}
            {activeTab === 'maintenance' && (
              <div className="card">
                <h3 className="text-xl font-serif font-bold text-white mb-6">メンテナンス記録</h3>
                <div className="space-y-4">
                  {bonsaiItem.maintenanceRecords.map((record, index) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-black/20 rounded-lg p-6"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          {getMaintenanceIcon(record.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                            <h4 className="text-white font-semibold text-lg">
                              {getMaintenanceTypeLabel(record.type)}
                            </h4>
                            <span className="text-white/60">
                              {new Date(record.date).toLocaleDateString('ja-JP')}
                            </span>
                          </div>
                          
                          <p className="text-white/80 mb-3">{record.notes}</p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-white/60 text-sm">担当: {record.technician}</span>
                            {record.photos && record.photos.length > 0 && (
                              <span className="text-gold-400 text-sm flex items-center space-x-1">
                                <Camera size={16} />
                                <span>{record.photos.length}枚の写真</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ギャラリータブ */}
            {activeTab === 'gallery' && (
              <div className="card">
                <h3 className="text-xl font-serif font-bold text-white mb-6">ギャラリー</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* メイン画像 */}
                  <div className="md:col-span-2 lg:col-span-2">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={bonsaiItem.bonsai.image}
                        alt={bonsaiItem.bonsai.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-white/70 text-sm mt-2">メイン写真</p>
                  </div>
                  
                  {/* メンテナンス写真 */}
                  {bonsaiItem.maintenanceRecords
                    .filter(record => record.photos && record.photos.length > 0)
                    .slice(0, 4)
                    .map((record, index) => (
                      <div key={record.id} className="space-y-2">
                        <div className="aspect-square rounded-lg overflow-hidden">
                          <img
                            src={record.photos![0]}
                            alt={`${getMaintenanceTypeLabel(record.type)}記録`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-white/70 text-sm">
                          {getMaintenanceTypeLabel(record.type)} - {new Date(record.date).toLocaleDateString('ja-JP')}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
