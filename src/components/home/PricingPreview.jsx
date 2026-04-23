import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Shield, Cpu, ArrowRight } from 'lucide-react';

const PricingCard = ({ tier, price, features, isPopular, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className={`relative glass-card flex flex-col p-8 ${isPopular ? 'border-primary/40 ring-1 ring-primary/20 bg-primary/5' : 'border-white/5'}`}
  >
    {isPopular && (
      <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-primary/20">
        Most Advanced
      </div>
    )}
    
    <div className="mb-8">
      <h3 className="text-xl font-bold font-display mb-2">{tier}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-extrabold font-display leading-tight">{price}</span>
        {price !== 'Custom' && <span className="text-muted text-sm font-medium">/month</span>}
      </div>
    </div>

    <ul className="space-y-4 mb-10 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <Check size={12} />
          </div>
          <span className="text-sm font-medium text-foreground/80 leading-snug">{f}</span>
        </li>
      ))}
    </ul>

    <button className={`btn w-full ${isPopular ? 'btn-primary' : 'btn-secondary'} group`}>
      <span>Get Started</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  </motion.div>
);

export default function PricingPreview() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      tier: "Neural Starter",
      price: isAnnual ? "$0" : "$0",
      features: ["Single Node access", "Standard Neural processing", "Batch Data Analysis", "Community Support", "Basic Security Layers"],
      isPopular: false
    },
    {
      tier: "Neural Plus",
      price: isAnnual ? "$79" : "$99",
      features: ["Up to 10 active Nodes", "Real-time Neural Sync", "Predictive Analytics Engine", "Private Vector DB access", "24/7 Priority Support", "Quantum-Safe Encryption"],
      isPopular: true
    },
    {
      tier: "Neural Enterprise",
      price: "Custom",
      features: ["Unlimited Neural Clusters", "Multi-region replication", "Autonomous Self-healing Nodes", "Dedicated Hardware Isolation", "White-glove Implementation", "Unlimited API throughput"],
      isPopular: false
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Transparent <span className="text-gradient">Neural Compute</span></h2>
          <p className="text-muted text-lg max-w-2xl mx-auto mb-10">Choose the optimal compute tier for your organizational transformation. Scale seamlessly as your neural footprint grows.</p>

          <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-bold tracking-widest uppercase transition-colors ${!isAnnual ? 'text-primary' : 'text-muted'}`}>Monthly</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-14 h-8 rounded-full bg-white/5 border border-white/10 p-1 flex items-center relative group"
              >
                  <motion.div 
                    animate={{ x: isAnnual ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="w-6 h-6 rounded-full bg-primary shadow-lg shadow-primary/20" 
                  />
              </button>
              <span className={`text-sm font-bold tracking-widest uppercase transition-colors ${isAnnual ? 'text-primary' : 'text-muted'}`}>Annual <span className="text-[10px] text-emerald-400 ml-1">(20% OFF)</span></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tiers.map((t, i) => (
                <PricingCard key={t.tier} {...t} delay={0.2 + (i * 0.1)} />
            ))}
        </div>

        <div className="mt-20 glass-card bg-white/[0.01] border-white/5 p-8 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
            <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-light">
                    <Shield size={24} />
                </div>
                <div>
                    <h4 className="text-lg font-bold">Enterprise Security Standard</h4>
                    <p className="text-sm text-muted">All plans include bank-grade encryption and 99.9% uptime guarantee.</p>
                </div>
            </div>
            <div className="flex items-center gap-8">
                <div className="text-center">
                    <div className="text-xl font-bold">99.99%</div>
                    <div className="text-[10px] uppercase font-bold text-muted">Uptime</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                    <div className="text-xl font-bold">1.2B+</div>
                    <div className="text-[10px] uppercase font-bold text-muted">Neural Ops</div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
