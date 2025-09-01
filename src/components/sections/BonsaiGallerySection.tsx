'use client';

import { motion } from 'framer-motion';
import { bonsaiData } from '@/data/bonsai';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function BonsaiGallerySection() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
            <span className="text-white">会員様の</span>
            <span className="text-gradient">名品</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            ほんの数分でコレクションが始められます。コレクターのコミュニティに参加しましょう
          </p>
          <Link href="/collection" className="btn-primary">
            すべての盆栽を見る
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {bonsaiData.slice(0, 8).map((bonsai, index) => (
            <motion.div
              key={bonsai.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-800 to-primary-900 border border-white/10 hover-lift">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={bonsai.image}
                    alt={bonsai.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 space-y-2">
                    {bonsai.status === 'available' && (
                      <span className="px-3 py-1 bg-gold-600/90 text-white text-xs rounded-full">
                        購入可能
                      </span>
                    )}
                    {bonsai.status === 'reserved' && (
                      <span className="px-3 py-1 bg-amber-500/90 text-white text-xs rounded-full">
                        予約済み
                      </span>
                    )}
                    {bonsai.status === 'sold' && (
                      <span className="px-3 py-1 bg-rose-600/90 text-white text-xs rounded-full">
                        売約済み
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Eye size={16} className="text-white" />
                    </button>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Heart size={16} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                    {bonsai.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gold-400 font-medium">
                      {formatPrice(bonsai.price)}
                    </span>
                    <span className="text-white/60 text-sm">
                      樹齢{bonsai.age}年
                    </span>
                  </div>

                  <p className="text-white/70 text-sm mb-3 line-clamp-2">
                    {bonsai.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-white/60 text-xs">
                      <p>職人: {bonsai.master}</p>
                      <p>場所: {bonsai.location}</p>
                      <p>所有者: <span className={
                        bonsai.status === 'sold' ? 'text-white' : bonsai.status === 'reserved' ? 'text-amber-300' : 'text-gold-300'
                      }>{bonsai.owner ?? (bonsai.status === 'available' ? '未所有（公開販売中）' : bonsai.status === 'reserved' ? '予約中' : '所有者あり')}</span></p>
                    </div>
                    
                    {bonsai.status === 'available' && (
                      <button className="flex items-center space-x-2 bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                        <ShoppingCart size={16} />
                        <span>購入</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
