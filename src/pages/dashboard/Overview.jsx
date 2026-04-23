import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Activity, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStats } from '../../store/slices/adminSlice';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export default function Overview() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { stats } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);
  
  const formattedRevenue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stats?.total_revenue || 45231);
  
  const displayStats = [
    { name: 'Synaptic Revenue', value: formattedRevenue, trend: '+20.1%', positive: true, icon: <CreditCard size={20} />, color: 'text-primary-light' },
    { name: 'Neural Nodes', value: stats?.total_users || 1240, trend: '+15.2%', positive: true, icon: <Users size={20} />, color: 'text-secondary-light' },
    { name: 'Uplink Requests', value: stats?.api_calls || 89234, trend: '-2.4%', positive: false, icon: <Activity size={20} />, color: 'text-accent-cyan' },
  ];

  const revenueData = [
    { name: 'Jan', value: 30000 },
    { name: 'Feb', value: 32000 },
    { name: 'Mar', value: 35000 },
    { name: 'Apr', value: 34000 },
    { name: 'May', value: 38000 },
    { name: 'Jun', value: stats?.total_revenue || 45231 },
  ];

  const userGrowthData = [
    { name: 'W1', users: 120 },
    { name: 'W2', users: 200 },
    { name: 'W3', users: 150 },
    { name: 'W4', users: stats?.total_users || 250 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Hero */}
      <div className="relative h-64 rounded-[2.5rem] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-background to-secondary/10 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" 
          alt="Neural Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" 
        />
        <div className="relative z-20 h-full flex flex-col justify-center px-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl font-black font-display mb-4">Welcome, <span className="text-gradient uppercase tracking-tight">{user?.name}</span></h2>
            <p className="text-muted-foreground max-w-lg font-medium leading-relaxed">
              Your neural ecosystem is operating at <span className="text-primary-light">peak efficiency</span>. Data synchronicity is up by 24% across all nodes.
            </p>
          </motion.div>
        </div>
        {/* Abstract elements */}
        <div className="absolute top-1/2 right-12 -translate-y-1/2 w-32 h-32 border border-white/5 rounded-full animate-pulse-slow z-20" />
        <div className="absolute top-1/3 right-24 w-16 h-16 border border-primary/20 rounded-full animate-float z-20" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayStats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 group hover:-translate-y-1 transition-all duration-300 border-white/5"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">{stat.name}</div>
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color} group-hover:bg-primary/10 transition-colors`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-4xl font-black font-display mb-4 tracking-tight">
              {stat.value}
            </div>
            <div className={`flex items-center gap-2 text-xs font-bold ${stat.positive ? 'text-accent-emerald' : 'text-accent-rose'}`}>
              <div className={`p-1 rounded-md ${stat.positive ? 'bg-accent-emerald/10' : 'bg-accent-rose/10'}`}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
              <span>{stat.trend}</span>
              <span className="text-muted-foreground font-medium uppercase tracking-widest text-[8px] ml-1">vs Last Epoch</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full" />
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-sm font-black uppercase tracking-widest">Revenue Propagation</h3>
            <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="text-[8px] font-black uppercase tracking-widest text-muted">Synaptic Streams</div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(10,10,10,0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }} 
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--color-primary)" 
                  strokeWidth={4} 
                  dot={false}
                  activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-[60px] rounded-full" />
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-sm font-black uppercase tracking-widest">Node Acquisition</h3>
            <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <div className="text-[8px] font-black uppercase tracking-widest text-muted">Active Uplinks</div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(10,10,10,0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }} 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar 
                  dataKey="users" 
                  fill="var(--color-secondary)" 
                  radius={[6, 6, 0, 0]} 
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Ops */}
      <div className="glass-card p-8 border-white/5">
        <h3 className="text-sm font-black uppercase tracking-widest mb-8">Rapid Protocols</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Initialize Node', icon: <Users size={16} /> },
            { name: 'Data Uplink', icon: <FileText size={16} /> },
            { name: 'Sync Keys', icon: <Sparkles size={16} /> },
            { name: 'System Logs', icon: <Activity size={16} /> },
          ].map((op, i) => (
            <button 
              key={i} 
              className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all group"
            >
              <span className="text-muted group-hover:text-primary transition-colors">{op.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-widest">{op.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
