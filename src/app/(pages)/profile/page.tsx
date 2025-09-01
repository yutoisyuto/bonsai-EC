'use client';

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { sampleUser, userBonsaiCollection } from '@/data/user';
import { User, Mail, Calendar, Heart, Award, Settings, Camera } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(sampleUser);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalCurrentValue = userBonsaiCollection.reduce((sum, item) => sum + item.currentValue, 0);
  const memberYears = Math.floor((new Date().getTime() - new Date(sampleUser.memberSince).getTime()) / (1000 * 60 * 60 * 24 * 365));

  const handleSave = () => {
    // 実際の実装では API を呼び出し
    setIsEditing(false);
    alert('プロフィールを更新しました。');
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
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-8 text-center">
              <span className="text-white">プロフィール</span>
              <span className="text-gradient">設定</span>
            </h1>

            {/* プロフィール情報 */}
            <div className="card">
              <div className="flex flex-col md:flex-row gap-8">
                {/* アバター */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gold-400">
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-gold-600 rounded-full flex items-center justify-center hover:bg-gold-700 transition-colors">
                      <Camera size={20} className="text-white" />
                    </button>
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                    <p className="text-gold-400">プレミアム会員</p>
                  </div>
                </div>

                {/* 基本情報 */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">基本情報</h3>
                    <button
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      className="flex items-center space-x-2 bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap"
                    >
                      <Settings size={16} />
                      <span>{isEditing ? '保存' : '編集'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center space-x-2 text-white/70 text-sm mb-2">
                        <User size={16} />
                        <span>名前</span>
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white"
                        />
                      ) : (
                        <p className="text-white font-medium">{profile.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-white/70 text-sm mb-2">
                        <Mail size={16} />
                        <span>メールアドレス</span>
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white"
                        />
                      ) : (
                        <p className="text-white font-medium">{profile.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-white/70 text-sm mb-2">
                        <Calendar size={16} />
                        <span>会員登録日</span>
                      </label>
                      <p className="text-white font-medium">
                        {new Date(profile.memberSince).toLocaleDateString('ja-JP')}
                      </p>
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-white/70 text-sm mb-2">
                        <Heart size={16} />
                        <span>好きな樹種</span>
                      </label>
                      {isEditing ? (
                        <select
                          value={profile.favoriteSpecies}
                          onChange={(e) => setProfile({...profile, favoriteSpecies: e.target.value})}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white"
                        >
                          <option value="松">松</option>
                          <option value="楓">楓</option>
                          <option value="桜">桜</option>
                          <option value="梅">梅</option>
                          <option value="竹">竹</option>
                          <option value="杉">杉</option>
                        </select>
                      ) : (
                        <p className="text-white font-medium">{profile.favoriteSpecies}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 統計情報 */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-white mb-8 text-center">あなたの実績</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card text-center"
            >
              <Award className="w-12 h-12 text-gold-400 mx-auto mb-4" />
              <p className="text-2xl font-bold text-white mb-2">{userBonsaiCollection.length}</p>
              <p className="text-white/70 text-sm">保有盆栽数</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card text-center"
            >
              <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <p className="text-2xl font-bold text-white mb-2">{memberYears}</p>
              <p className="text-white/70 text-sm">会員歴（年）</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card text-center"
            >
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">¥</span>
              </div>
              <p className="text-2xl font-bold text-white mb-2">{formatPrice(totalCurrentValue)}</p>
              <p className="text-white/70 text-sm">総資産価値</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card text-center"
            >
              <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-2xl font-bold text-white mb-2">{profile.favoriteSpecies}</p>
              <p className="text-white/70 text-sm">お気に入り樹種</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 設定メニュー */}
      <section className="section-padding bg-gradient-to-br from-primary-800 to-primary-900">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-white mb-8 text-center">アカウント設定</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card hover:border-gold-500/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gold-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">通知設定</h3>
                  <p className="text-white/70 text-sm">メール・プッシュ通知の管理</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card hover:border-gold-500/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">プライバシー</h3>
                  <p className="text-white/70 text-sm">公開範囲・データ管理</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card hover:border-gold-500/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">サブスクリプション</h3>
                  <p className="text-white/70 text-sm">プラン・支払い管理</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card hover:border-red-500/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">アカウント削除</h3>
                  <p className="text-white/70 text-sm">アカウントの完全削除</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
