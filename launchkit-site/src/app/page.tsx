import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TemplateShowcase from '@/components/TemplateShowcase';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none grain z-50" />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <Hero />
      <TemplateShowcase />
      <Features />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
