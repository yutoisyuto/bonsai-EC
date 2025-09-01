'use client';

import { motion } from 'framer-motion';
import { Award, Shield, Leaf, Users } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: '盆栽師よる精選',
    description: 'どの盆栽も、美的品質、全体的な健康状態、今後の発展の可能性を考慮し精選されています。',
    color: 'from-gold-400 to-gold-600'
  },
  {
    icon: Shield,
    title: '盆栽の遺産と価値',
    description: 'コレクションを築くことで来歴が改善され、価値の成長に貢献し、将来的な維持が保証されます。',
    color: 'from-gold-400 to-gold-600'
  },
  {
    icon: Leaf,
    title: 'ユニークな資産タイプ',
    description: '世代を超えた芸術家の結晶である生きる自然の芸術作品。どの盆栽もユニークで、成長する物語があります。',
    color: 'from-gold-400 to-gold-600'
  },
  {
    icon: Users,
    title: '成熟した盆栽の維持管理',
    description: '選ばれた盆栽は丈夫で耐久性に優れています。プロによる維持管理により長期的な健康を保証されます。',
    color: 'from-gold-400 to-gold-600'
  }
];

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-800 to-primary-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
            <span className="text-white">盆栽コレクター</span>
            <span className="text-gradient">になる</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            世界最高の庭園の盆栽にアクセスし、あなたのためだけのお手入れサービスで遺産継承を。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group"
            >
              <div className="flex items-start space-x-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={28} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-2xl font-serif text-white mb-8">
            世界最高の庭園から、お客様専用にお手入れされた盆栽でご自身の遺産を築きましょう。
          </p>
          <button className="btn-primary">
            コレクションを始める
          </button>
        </motion.div>
      </div>
    </section>
  );
}
