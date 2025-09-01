import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BonsaiGallerySection from '@/components/sections/BonsaiGallerySection';
import FeaturesSection from '@/components/sections/FeaturesSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <TestimonialsSection />
      <BonsaiGallerySection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
