'use client';

import { motion } from 'framer-motion';
import { testimonialsData } from '@/data/testimonials';
import { Quote } from 'lucide-react';

export default function TestimonialsSection() {
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
            <span className="text-white">お客様の</span>
            <span className="text-gradient">声</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            世界中の盆栽愛好家から寄せられた、心からの声をご紹介します。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-gold-400 text-sm">{testimonial.title}</p>
                </div>
                <Quote size={24} className="text-gold-400/50 group-hover:text-gold-400 transition-colors" />
              </div>
              
              <blockquote className="text-white/90 leading-relaxed italic">
                "{testimonial.quote}"
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
