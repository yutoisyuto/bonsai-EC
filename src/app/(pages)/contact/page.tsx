'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen">
      <Header />
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl lg:text-5xl font-serif font-bold mb-6">お問い合わせ</h1>
          <p className="text-white/70 mb-8">ご質問やご相談は下記フォームからお気軽にお送りください。</p>

          {!submitted ? (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="space-y-6 card"
            >
              <div>
                <label className="block text-sm text-white/80 mb-2">お名前</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-gold-500" required />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-2">メールアドレス</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-gold-500" required />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-2">内容</label>
                <textarea rows={6} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-gold-500" required />
              </div>
              <button className="btn-primary">送信</button>
            </form>
          ) : (
            <div className="card">
              <p className="text-white">送信ありがとうございました。担当者よりご連絡いたします。</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
