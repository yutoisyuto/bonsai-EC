import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { bonsaiData } from '@/data/bonsai';

export default function CollectionPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-5xl font-serif font-bold mb-8">コレクション</h1>
          <p className="text-white/70 mb-12">厳選された名品からあなたの一品を。</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {bonsaiData.map((item) => (
              <div key={item.id} className="rounded-xl overflow-hidden bg-primary-900/60 border border-white/10">
                <div className="aspect-square overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-white font-semibold">{item.name}</h3>
                  <p className="text-white/60 text-sm line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>樹齢{item.age}年</span>
                    <span className="text-gold-400">{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', minimumFractionDigits: 0 }).format(item.price)}</span>
                  </div>
                  <div className="text-xs text-white/70">
                    <span className="mr-2">所有者:</span>
                    <span className={
                      item.status === 'sold' ? 'text-white' : item.status === 'reserved' ? 'text-amber-300' : 'text-gold-300'
                    }>
                      {item.owner ?? (item.status === 'available' ? '未所有（公開販売中）' : item.status === 'reserved' ? '予約中' : '所有者あり')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
