import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import SearchBar from '@/components/SearchBar';
import BestSellers from '@/components/BestSellers';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />
      <HeroCarousel />
      <SearchBar />
      <BestSellers />
      <Features />
      <Footer />
    </main>
  );
}
