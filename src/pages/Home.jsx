import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import InteractiveDashboard from '../components/home/InteractiveDashboard';
import FeatureGrid from '../components/home/FeatureGrid';
import AIDemoSection from '../components/home/AIDemoSection';
import WorkflowBuilder from '../components/home/WorkflowBuilder';
import ComparisonSection from '../components/home/ComparisonSection';
import TestimonialsCarousel from '../components/home/TestimonialsCarousel';
import PricingPreview from '../components/home/PricingPreview';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Custom cursor movement logic
    const cursor = document.querySelector('.cursor-glow');
    const moveCursor = (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className="relative bg-background text-foreground scroll-smooth">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[110] origin-left"
        style={{ scaleX }}
      />

      {/* Custom Cursor Glow */}
      <div className="cursor-glow hidden lg:block" />

      {/* Main Sections */}
      <main>
        <HeroSection />
        
        <div className="relative">
             {/* Section Divider with Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <InteractiveDashboard />
        </div>

        <FeatureGrid />
        
        <div className="relative">
            <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2" />
            <AIDemoSection />
        </div>

        <WorkflowBuilder />
        <ComparisonSection />
        <TestimonialsCarousel />
        
        <div className="relative mb-24">
            <div className="absolute inset-0 bg-secondary/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2" />
            <PricingPreview />
        </div>
      </main>

      {/* Call to Action Final */}
      <section className="py-24 bg-primary/10 border-y border-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-glow opacity-30 pointer-events-none" />
          <div className="container mx-auto px-6 text-center relative z-10">
              <h2 className="text-4xl md:text-6xl font-black font-display mb-8">Ready to Transmute <br/>Your Digital <span className="text-gradient">DNA?</span></h2>
              <p className="text-xl text-muted mb-12 max-w-2xl mx-auto font-medium">Join the neural elite and deploy your first AI cluster in under 30 seconds. Experience the future of organizational intelligence.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button className="btn-primary scale-110 px-12 py-4">Deploy Core Interface</button>
                  <button className="btn-secondary px-12 py-4">Schedule Neural Audit</button>
              </div>
          </div>
      </section>
    </div>
  );
}
