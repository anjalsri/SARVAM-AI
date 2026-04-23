import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Terminal, Cpu, Database, Cloud, Zap, Clock, ShieldCheck, Settings } from 'lucide-react';

const Node = ({ icon: Icon, label, status, x, y, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="absolute glass-card p-3 rounded-xl border-white/10 flex items-center gap-3 bg-white/[0.05] group hover:border-primary/40 transition-all cursor-move z-10"
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-[0_0_10px_rgba(99,102,241,0)] group-hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]">
      <Icon size={16} />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-muted uppercase tracking-tighter leading-none mb-1">{label}</span>
      <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
          <span className="text-[10px] font-mono leading-none">{status}</span>
      </div>
    </div>
  </motion.div>
);

const ConnectionLine = ({ x1, y1, x2, y2, delay = 0 }) => (
  <svg className="absolute inset-0 pointer-events-none w-full h-full overflow-visible z-0">
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 0.3 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1.5, ease: "easeInOut" }}
      d={`M ${x1} ${y1} C ${x1 + (x2 - x1) / 2} ${y1}, ${x1 + (x2 - x1) / 2} ${y2}, ${x2} ${y2}`}
      stroke="url(#lineGradient)"
      strokeWidth="2"
      fill="none"
      strokeDasharray="5 5"
    />
    <defs>
      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
  </svg>
);

export default function WorkflowBuilder() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 glass-card bg-primary-light/10 border-primary-light/20 text-primary-light text-xs font-bold uppercase tracking-widest rounded-full"
          >
            <Share2 className="w-4 h-4" />
            Neural Orchestration
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Autonomous <span className="text-gradient">Workflow Orchestrator</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Design and deploy complex AI workflows with a visual, drag-and-drop neural builder. Connect your core modules and automate at scale.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto h-[600px] glass-card border-white/5 bg-white/[0.02] p-0 rounded-3xl overflow-hidden shadow-2xl group"
        >
          {/* Builder UI Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Workflow::Alpha</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-muted" />
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Last Synced: 2s ago</span>
              </div>
            </div>
            <div className="flex gap-4">
                <button className="flex items-center gap-2 px-3 py-1 bg-primary/20 hover:bg-primary/30 text-primary-light text-[10px] font-bold uppercase tracking-widest rounded-lg border border-primary/20 blur-sm shadow-[0_0_15px_rgba(99,102,241,0)] hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all">
                    <Zap className="w-3 h-3" />
                    Deploy Flow
                </button>
            </div>
          </div>

          {/* Builder Workspace Area */}
          <div className="relative w-full h-[calc(100%-60px)] p-8">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ 
                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '40px 40px' 
                 }} 
            />

            {/* Neural Nodes Mapping */}
            <Node icon={Cloud} label="Data Ingest" status="Active" x={10} y={20} delay={0.2} />
            <Node icon={Database} label="Vector DB" status="Active" x={40} y={15} delay={0.4} />
            <Node icon={Cpu} label="Neural Core" status="Active" x={25} y={45} delay={0.6} />
            <Node icon={Terminal} label="API Gateway" status="Standby" x={65} y={35} delay={0.8} />
            <Node icon={ShieldCheck} label="Security" status="Active" x={55} y={65} delay={1.0} />
            <Node icon={Settings} label="Automation" status="Active" x={80} y={60} delay={1.2} />

            {/* Connecting Lines Mockup (SVG Paths) */}
            <ConnectionLine x1={180} y1={140} x2={400} y2={105} delay={1.4} /> {/* Data Ingest to Vector DB */}
            <ConnectionLine x1={180} y1={140} x2={250} y2={280} delay={1.6} /> {/* Data Ingest to Neural Core */}
            <ConnectionLine x1={400} y1={105} x2={650} y2={220} delay={1.8} /> {/* Vector DB to API Gateway */}
            <ConnectionLine x1={250} y1={280} x2={550} y2={400} delay={2.0} /> {/* Neural Core to Security */}
            <ConnectionLine x1={650} y1={220} x2={800} y2={370} delay={2.2} /> {/* API Gateway to Automation */}
            <ConnectionLine x1={550} y1={400} x2={800} y2={370} delay={2.4} /> {/* Security to Automation */}
          </div>

          {/* Floating UI Overlay */}
          <div className="absolute bottom-6 left-6 flex gap-4 pointer-events-none">
              <div className="p-4 glass-card bg-white/5 border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary-light">
                      <Zap size={20} />
                  </div>
                  <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-widest leading-none mb-1">Efficiency Boost</span>
                      <span className="text-sm font-extrabold">+42%</span>
                  </div>
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
