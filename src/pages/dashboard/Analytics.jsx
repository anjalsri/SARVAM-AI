import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { Check, Download, Calendar } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function Analytics() {
  const { theme } = useTheme();
  
  // Theme-aware colors
  const colors = {
    primary: theme === 'dark' ? '#6366f1' : '#4f46e5',
    secondary: theme === 'dark' ? '#10b981' : '#059669',
    tertiary: theme === 'dark' ? '#8b5cf6' : '#7c3aed',
    text: theme === 'dark' ? '#cbd5e1' : '#475569',
    grid: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setData([
        { name: 'Jan', revenue: 4000, users: 2400, sessions: 2400 },
        { name: 'Feb', revenue: 3000, users: 1398, sessions: 2210 },
        { name: 'Mar', revenue: 2000, users: 9800, sessions: 2290 },
        { name: 'Apr', revenue: 2780, users: 3908, sessions: 2000 },
        { name: 'May', revenue: 1890, users: 4800, sessions: 2181 },
        { name: 'Jun', revenue: 2390, users: 3800, sessions: 2500 },
        { name: 'Jul', revenue: 3490, users: 4300, sessions: 2100 },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '8px', backdropFilter: 'blur(8px)', boxShadow: 'var(--glass-shadow)' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: '0.25rem 0', color: entry.color, display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <span>{entry.name}:</span>
              <span style={{ fontWeight: 600 }}>
                {entry.name === 'revenue' ? '$' : ''}{entry.value.toLocaleString()}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Analytics Dashboard</h2>
          <p className="text-muted" style={{ margin: 0 }}>Review your platform performance.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-secondary"><Calendar size={18} /> Last 7 Months</button>
          <button className="btn btn-primary"><Download size={18} /> Export</button>
        </div>
      </div>

      {loading ? (
        <div className="glass-card flex items-center justify-center" style={{ height: '400px' }}>
          Loading charts...
        </div>
      ) : (
        <>
          {/* Main Chart */}
          <div className="glass-card">
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Revenue vs Users</h3>
            <div style={{ width: '100%', height: '400px' }}>
              <ResponsiveContainer>
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={colors.secondary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="name" stroke={colors.text} axisLine={false} tickLine={false} />
                  <YAxis stroke={colors.text} axisLine={false} tickLine={false} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" />
                  <Area type="monotone" dataKey="revenue" stroke={colors.primary} strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="users" stroke={colors.secondary} strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="glass-card">
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Monthly Sessions</h3>
              <div style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
                    <XAxis dataKey="name" stroke={colors.text} axisLine={false} tickLine={false} />
                    <YAxis stroke={colors.text} axisLine={false} tickLine={false} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Bar dataKey="sessions" fill={colors.tertiary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Line Chart */}
            <div className="glass-card">
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Growth Trajectory</h3>
              <div style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
                    <XAxis dataKey="name" stroke={colors.text} axisLine={false} tickLine={false} />
                    <YAxis stroke={colors.text} axisLine={false} tickLine={false} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="users" stroke={colors.primary} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
