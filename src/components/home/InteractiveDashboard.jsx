import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { Zap, Shield, Cpu, Activity } from 'lucide-react';

const data = [
  { name: '00:00', value: 400, process: 240 },
  { name: '04:00', value: 300, process: 139 },
  { name: '08:00', value: 200, process: 980 },
  { name: '12:00', value: 278, process: 390 },
  { name: '16:00', value: 189, process: 480 },
  { name: '20:00', value: 239, process: 380 },
  { name: '23:59', value: 349, process: 430 },
];

const GlowingNode = ({ delay }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0.2 }}
    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.8, 0.2] }}
    transition={{ duration: 2, repeat: Infinity, delay }}
    className="w-3 h-3 rounded-full bg-primary-light shadow-[0_0_15px_rgba(99,102,241,0.6)]"
  />
);

export default function InteractiveDashboard() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="text-4xl md:text-5xl font-bold mb-6 text-gradient"
          >
            Neural Operations Interface
          </motion.h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Experience real-time AI observability with our low-latency dashboard, designed for millisecond-level precision.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto glass-card border-white/5 bg-white/[0.03] p-1 md:p-4 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Dashboard Header UI Mockup */}
          <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5 rounded-t-2xl">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                <div className="w-3 h-3 rounded-full bg-green-400/50" />
              </div>
              <div className="h-6 w-px bg-white/10 mx-2" />
              <div className="text-xs font-mono text-muted tracking-widest uppercase">System::Status: <span className="text-emerald-400">OPTIMAL</span></div>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 group cursor-pointer tooltip" data-tip="AI Processing">
                    <Activity className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">Lat: 12ms</span>
                </div>
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">SEC: ACTIVE</span>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
            {/* Sidebar Mockup */}
            <div className="hidden lg:flex flex-col gap-4 p-6 bg-white/[0.02] border-r border-white/5">
                {[
                    { icon: <Cpu />, label: 'Neural Processing', val: '94%' },
                    { icon: <Zap />, label: 'Automation Flow', val: 'Active' },
                    { icon: <Shield />, label: 'Encryption', val: 'AES-256' }
                ].map((item, i) => (
                    <motion.div key={i} whileHover={{ x: 5 }} className="flex items-center justify-between p-4 glass-card bg-transparent border-white/5 hover:bg-white/5 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <span className="text-primary-light/70">{item.icon}</span>
                            <span className="text-xs font-semibold">{item.label}</span>
                        </div>
                        <span className="text-[10px] font-bold py-1 px-2 rounded bg-primary/20 text-primary-light">{item.val}</span>
                    </motion.div>
                ))}
                
                <div className="mt-auto p-4 glass-card border-dashed border-primary/30 text-center">
                    <div className="text-[10px] uppercase font-bold text-muted mb-2">AI Suggestions</div>
                    <div className="text-xs text-primary-light italic leading-relaxed">"Optimize node cluster delta for 14% higher throughput."</div>
                </div>
            </div>

            {/* Main Graph Area */}
            <div className="lg:col-span-2 p-4 md:p-8 flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold font-display">Neural Throughput</h3>
                    <div className="flex items-center gap-2">
                        <GlowingNode delay={0} />
                        <span className="text-[10px] font-bold text-muted uppercase">Live Monitoring</span>
                    </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#64748b', fontSize: 10 }}
                            />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '8px', fontSize: '10px' }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#6366f1" 
                                strokeWidth={3}
                                fillOpacity={1} 
                                fill="url(#colorValue)" 
                                animationDuration={2000}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="process" 
                                stroke="#a855f7" 
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                fillOpacity={0} 
                                animationDuration={3000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="glass-card p-4 text-center">
                        <div className="text-[10px] text-muted uppercase font-bold mb-1">Total Requests</div>
                        <div className="text-lg font-bold">1.2M</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <div className="text-[10px] text-muted uppercase font-bold mb-1">Avg Latency</div>
                        <div className="text-lg font-bold text-emerald-400">14ms</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <div className="text-[10px] text-muted uppercase font-bold mb-1">AI Confidence</div>
                        <div className="text-lg font-bold text-primary-light">99.8%</div>
                    </div>
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
