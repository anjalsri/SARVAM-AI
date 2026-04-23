import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Smartphone, Megaphone, Globe, PenTool, Bot, BarChart, Shield, Zap, Cpu, Activity, Database, Lock } from 'lucide-react';

const Card = ({ icon, title, desc, features, colorCls }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-[400px] w-full cursor-pointer group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 200, damping: 20 }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
        className="relative"
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 glass-card flex flex-col items-center justify-center p-8 border-white/10"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={`p-4 rounded-2xl bg-white/5 mb-6 group-hover:scale-110 group-hover:${colorCls} transition-all duration-300`}>
             {React.cloneElement(icon, { size: 40 })}
          </div>
          <h3 className="text-2xl font-bold mb-4 font-display">{title}</h3>
          <p className="text-muted text-center leading-relaxed font-medium">{desc}</p>
          
          <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-light opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Discover Neural Specs</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary-light animate-ping" />
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 glass-card bg-primary/10 border-primary/20 flex flex-col p-8 rotate-y-180"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h4 className="text-xl font-bold mb-4 font-display text-primary-light">Core Features</h4>
          <ul className="space-y-4 flex-1 overflow-y-auto">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary-light shadow-[0_0_5px_rgba(99,102,241,1)]" />
                <span className="text-sm font-medium leading-normal">{f}</span>
              </li>
            ))}
          </ul>
          <button className="btn-primary w-full mt-6 py-2 text-sm">Deploy Model</button>
        </div>
      </motion.div>
    </div>
  );
};

export default function FeatureGrid() {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Protocols' },
    { id: 'ai', label: 'Neural AI' },
    { id: 'analytics', label: 'Data Flows' },
    { id: 'security', label: 'Secure Core' }
  ];

  const features = [
    {
      id: 1,
      category: 'ai',
      icon: <Bot />,
      title: "Cognitive AI",
      desc: "Autonomously learn and adapt to proprietary datasets with neural precision.",
      colorCls: "text-primary-light",
      features: ["Fine-tuned LLM architectures", "Context-aware processing", "Zero-shot adaptability", "Proprietary vector embeddings", "Multi-modal synthesis"]
    },
    {
      id: 2,
      category: 'analytics',
      icon: <BarChart />,
      title: "Predictive Flows",
      desc: "Turn fragmented data streams into actionable intelligence in real-time.",
      colorCls: "text-secondary-light",
      features: ["Millisecond stream processing", "Anomaly detection neural nets", "Probability-based forecasting", "Custom insight generators", "Real-time edge analytics"]
    },
    {
        id: 3,
        category: 'security',
        icon: <Shield />,
        title: "Quantum-Safe",
        desc: "Protect intellectual assets with post-quantum encryption protocols.",
        colorCls: "text-emerald-400",
        features: ["Post-quantum cryptographic layers", "Zero-trust neural access", "Immutable ledger auditing", "Biometric behavioral analysis", "Automated threat isolation"]
    },
    {
        id: 4,
        category: 'ai',
        icon: <Database />,
        title: "Model Orchestration",
        desc: "Coordinate multiple AI clusters for maximum horizontal scalability.",
        colorCls: "text-accent-cyan",
        features: ["Load-balanced neural nodes", "Distributed training cycles", "Seamless API integration", "Model versioning & fallback", "GPU-optimized throughput"]
    },
    {
        id: 5,
        category: 'analytics',
        icon: <Database />,
        title: "Vector DB Gen2",
        desc: "Advanced neural storage designed for high-dimensional vector search.",
        colorCls: "text-rose-400",
        features: ["High-dimensional indexing", "Semantic search supremacy", "Lightning-fast retrieval", "Auto-scaling storage clusters", "Multi-region replication"]
    },
    {
        id: 6,
        category: 'security',
        icon: <Lock />,
        title: "Secure Sandbox",
        desc: "Isolated environments for testing experimental AI deployments safely.",
        colorCls: "text-amber-400",
        features: ["Deterministic isolation", "Resource containment", "Automated rollbacks", "Live security auditing", "Sandboxed API gateway"]
    }
  ];

  const filteredFeatures = filter === 'all' ? features : features.filter(f => f.category === filter);

  return (
    <section className="py-24 bg-[#050b1a] relative z-10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Intelligent Ecosystem</h2>
                <p className="text-muted text-lg">Deploy the next generation of AI protocols across your entire organizational stack with unparalleled performance.</p>
            </div>
            
            <div className="flex flex-wrap gap-2 p-1 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setFilter(cat.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                            filter === cat.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted hover:text-foreground'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>

        <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredFeatures.map((f) => (
              <motion.div
                key={f.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Card {...f} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
