import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <h1 className="text-3xl lg:text-5xl font-serif font-bold mb-6">会社概要</h1>
          <p className="text-white/70 mb-6">
            盆栽をすべての人に。世界最高の庭園の盆栽とコレクターをつなぐプラットフォームを提供しています。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-semibold mb-2">ミッション</h3>
              <p className="text-white/70">生きる芸術としての盆栽の価値を次世代に受け渡す。</p>
            </div>
            <div className="card">
              <h3 className="font-semibold mb-2">拠点</h3>
              <p className="text-white/70">東京・京都・パリ</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
