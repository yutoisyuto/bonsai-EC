import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-5xl font-serif font-bold mb-6">イベントプログラム</h1>
          <p className="text-white/70 max-w-3xl mb-10">
            公開イベントからプライベートディナーまで、コミュニティのための多彩な体験をご用意しています。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">ギャラリー公開展示</h3>
              <p className="text-white/70">匠が手掛けた名品を間近で鑑賞。写真撮影も可能です。</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">プライベートディナー</h3>
              <p className="text-white/70">コレクター限定の親密な夕食会で、盆栽談義に花を咲かせます。</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
