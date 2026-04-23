import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Play } from 'lucide-react';
import NeuralCanvas from './NeuralCanvas';

const TypingEffect = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="text-gradient">
      {words[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const StatCounter = ({ value, label, prefix = '' }) => {
    const [count, setCount] = useState(0);
    const target = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.]/g, '');

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start * 10) / 10);
            }
        }, 16);
        return () => clearInterval(timer);
    }, [target]);

    return (
        <div className="flex flex-col items-center gap-1 group transition-all duration-300">
            <div className="text-3xl md:text-4xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-br from-primary-light to-secondary-light">
                {prefix}{label === 'Uptime' ? count.toFixed(2) : Math.floor(count)}{suffix}
            </div>
            <div className="text-sm uppercase tracking-widest text-muted group-hover:text-primary-light transition-colors">{label}</div>
        </div>
    );
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      <NeuralCanvas />
      
      <div className="container relative z-10 px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass-card border-primary/20 bg-primary/5 rounded-full"
            >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold tracking-wide uppercase text-primary-light/80">
                    ✨ New: Sarvam AI v2.4 Platform
                </span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-7xl font-extrabold font-display leading-[1.1] mb-8"
            >
                Intelligence for the <br />
                <TypingEffect words={["Future Enterprise", "Neural Frontier", "Digital Mastery"]} />
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
            >
                Harness the power of decentralized neural networks and real-time AI processing to redefine your digital operational landscape. 
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-5"
            >
                <button className="btn-primary group relative overflow-hidden">
                    <span className="relative z-10">Start Free in 30s</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                </button>
                <button className="btn-secondary px-8">
                    View Enterprise Demo
                    <Play className="w-4 h-4 fill-current ml-1" />
                </button>
            </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 py-12 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm rounded-3xl"
        >
            <StatCounter label="Active Nodes" value="500+" />
            <StatCounter label="Neural Synapses" value="1.2B+" />
            <StatCounter label="Uptime" value="99.99%" suffix="%" />
            <StatCounter label="Global Partners" value="45+" />
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Discover</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
