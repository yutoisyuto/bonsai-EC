'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ background: 'var(--stone-bg-hero)' }} />
        <div className="granite-overlay" />
        <div className="noise-overlay noise-overlay-strong" />
        <div className="speckle-overlay" />
        <div className="vein-overlay" />
        <div className="vignette-overlay" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-6">
            <span className="text-white">匠が手掛けた</span>
            <br />
            <span className="text-gradient">盆栽アート</span>
            <br />
            <span className="text-white">を集める</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            当社の盆栽セレクションからお気に入りの一品を選び、コレクションを始めて見ませんか。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/collection" className="btn-primary group flex items-center whitespace-nowrap">
              始める
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Link>
            
            <button className="flex items-center space-x-2 text-white/80 hover:text-gold-400 transition-colors whitespace-nowrap">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-gold-400 transition-colors">
                <Play size={20} className="ml-1" />
              </div>
              <span>ビデオを見る</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-gold-400/20 rounded-full opacity-30" />
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-gold-400/20 rounded-full opacity-30" />
      <div className="absolute top-1/2 left-5 w-16 h-16 border border-gold-400/20 rounded-full opacity-20" />
      <div className="absolute top-1/3 right-20 w-20 h-20 border border-gold-400/20 rounded-full opacity-25" />
    </section>
  );
}
