import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Shield, Zap, Cpu, Globe, Infinity as InfinityIcon } from 'lucide-react';

const ComparisonRow = ({ label, sarvam, others, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="grid grid-cols-3 py-6 border-b border-white/5 items-center group hover:bg-white/[0.02] transition-colors px-4"
  >
    <div className="text-sm font-bold tracking-wide uppercase text-muted group-hover:text-foreground transition-colors">{label}</div>
    <div className="flex justify-center">
      {sarvam ? (
        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <Check size={18} />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 border border-red-500/20">
          <X size={18} />
        </div>
      )}
    </div>
    <div className="flex justify-center">
      {others ? (
        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-muted">
          <Check size={14} />
        </div>
      ) : (
        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-muted">
          <X size={14} />
        </div>
      )}
    </div>
  </motion.div>
);

export default function ComparisonSection() {
  const features = [
    { label: "Quantum-Safe Encryption", sarvam: true, others: false },
    { label: "Millisecond Neural Sync", sarvam: true, others: false },
    { label: "Autonomous Node Repair", sarvam: true, others: false },
    { label: "Predictive Analytics Engine", sarvam: true, others: true },
    { label: "Visual Neural Orchestrator", sarvam: true, others: false },
    { label: "Multi-Region Vector Replication", sarvam: true, others: true },
    { label: "Zero-Latency Edge Processing", sarvam: true, others: false },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 glass-card bg-primary-light/10 border-primary-light/20 text-primary-light text-xs font-bold uppercase tracking-widest rounded-full"
          >
            <Zap className="w-4 h-4" />
            Competitive Analysis
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Why <span className="text-gradient">Sarvam AI</span> Leads</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">Compare the neural frontier with traditional legacy systems. Experience the delta in performance, security, and scale.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 py-8 px-4 border-b border-primary/20 items-center">
            <div className="text-xs font-black uppercase tracking-widest text-muted">Feature Protocol</div>
            <div className="flex flex-col items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/20 text-primary-light border border-primary/30">
                    <Cpu size={24} />
                </div>
                <span className="text-sm font-black uppercase tracking-widest text-primary-light">Sarvam AI</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="p-2 rounded-xl bg-white/5 text-muted border border-white/10">
                    <Globe size={24} />
                </div>
                <span className="text-sm font-black uppercase tracking-widest text-muted">Legacy Systems</span>
            </div>
          </div>

          <div className="glass-card bg-white/[0.01] border-white/5 p-0 mb-12">
            {features.map((f, i) => (
              <ComparisonRow key={i} {...f} delay={0.1 + (i * 0.05)} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between p-8 glass-card bg-primary/5 border-primary/20 rounded-3xl"
          >
            <div className="flex items-center gap-6 mb-6 md:mb-0">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-light animate-float">
                    <InfinityIcon size={32} />
                </div>
                <div>
                    <h4 className="text-xl font-bold">Unparalleled Scalability</h4>
                    <p className="text-sm text-muted max-w-sm">Our decentralized architecture ensures 100% linear growth with zero performance degradation.</p>
                </div>
            </div>
            <button className="btn-primary">Experience the Delta</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
