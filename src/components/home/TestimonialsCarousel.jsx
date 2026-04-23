import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, User } from 'lucide-react';

const testimonials = [
  {
    quote: "Sarvam AI completely overhauled our decentralized data pipeline. The predictive models reduced our operational churn by 24% in the first quarter alone.",
    author: "Sarah Jenkins",
    role: "Neural Architect, FinTech Global",
    rating: 5,
    avatar: "S"
  },
  {
    quote: "The most robust AI orchestration platform we've deployed. It allowed us to integrate 42 internal neural clusters 10x faster with zero security breaches.",
    author: "David Chen",
    role: "VP Engineering, QuantumSync",
    rating: 5,
    avatar: "D"
  },
  {
    quote: "Autonomous node repair saved our infrastructure during a Tier-1 stress cycle. The system self-healed in milliseconds without any human intervention.",
    author: "Elena Rodriguez",
    role: "Infrastructure Lead, CyberNexus",
    rating: 5,
    avatar: "E"
  }
];

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 underline-offset-8">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Trusted by <span className="text-gradient">Neural Pioneers</span></h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">Join the leading enterprises redefining the digital frontier with Sarvam AI's decentralized protocols.</p>
        </div>

        <div className="relative max-w-4xl mx-auto min-h-[450px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full glass-card bg-white/[0.02] border-white/5 p-10 md:p-16 flex flex-col items-center text-center relative group"
            >
                <div className="absolute top-8 left-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                    <Quote size={80} strokeWidth={1} />
                </div>
              
              <div className="flex gap-1 mb-8">
                {[...Array(testimonials[index].rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-emerald-400 text-emerald-400" />
                ))}
              </div>

              <p className="text-xl md:text-2xl font-medium leading-relaxed mb-10 italic text-foreground/90">
                "{testimonials[index].quote}"
              </p>

              <div className="flex items-center gap-4 text-left">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-primary/20">
                  {testimonials[index].avatar}
                </div>
                <div>
                  <h4 className="text-lg font-bold font-display">{testimonials[index].author}</h4>
                  <p className="text-sm text-muted uppercase tracking-widest font-bold">{testimonials[index].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 lg:-left-20">
              <button 
                onClick={prev}
                className="w-12 h-12 rounded-full glass-card border-white/10 hover:border-primary/50 flex items-center justify-center text-muted hover:text-primary-light transition-all bg-white/5 hover:bg-white/10 backdrop-blur-xl group"
              >
                  <ChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 lg:-right-20">
                <button 
                  onClick={next}
                  className="w-12 h-12 rounded-full glass-card border-white/10 hover:border-primary/50 flex items-center justify-center text-muted hover:text-primary-light transition-all bg-white/5 hover:bg-white/10 backdrop-blur-xl group"
                >
                    <ChevronRight className="group-hover:translate-x-0.5 transition-transform" />
                </button>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex gap-3">
              {testimonials.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? 'w-8 bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'w-2 bg-white/10 hover:bg-white/20'}`}
                  />
              ))}
          </div>
        </div>

        {/* Company Logos Mockup */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-30 grayscale hover:grayscale-0 transition-all duration-1000">
            {['CyberFlow', 'NeuralNet', 'DataSync', 'Quantum', 'Synapse', 'Aether'].map((company, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer transition-all">
                    <div className="text-lg font-black uppercase tracking-tighter group-hover:text-primary transition-colors">{company}</div>
                    <div className="h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-500" />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
