import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, User, ArrowRight, Loader2, Database, Globe, Sparkles, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(name, email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Onboarding initialization failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-background z-0" />
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse-slow" />
      
      <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side: Onboarding Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block space-y-12"
        >
          <div className="space-y-6">
             <div className="inline-flex items-center gap-2 px-4 py-2 glass-card border-secondary/20 bg-secondary/5 rounded-full">
                <Sparkles size={14} className="text-secondary-light" />
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary-light">New Node Registration</span>
             </div>
             <h1 className="text-6xl font-black font-display leading-[1.1]">
                Join the <br />
                <span className="text-gradient">Neural Elite</span>
             </h1>
             <p className="text-xl text-muted leading-relaxed max-w-md font-medium">
                Initialize your identity on the global neural substrate. Unlock the power of decentralized intelligence.
             </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: <Database size={18} />, title: "Vault-Grade Security", desc: "Your cognitive data is encrypted with post-quantum protocols." },
              { icon: <Globe size={18} />, title: "Global Mesh Access", desc: "Instantly deploy agents across our worldwide node network." }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary-light flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">{feature.title}</h4>
                  <p className="text-xs text-muted mt-1 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 p-6 glass-card border-white/5 bg-white/5 rounded-3xl max-w-sm">
            <div className="flex items-center gap-3 mb-3 text-secondary-light">
              <ShieldAlert size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Architect Ethics Protocol</span>
            </div>
            <p className="text-[10px] text-muted italic leading-relaxed">
              By initializing onboarding, you agree to the Neural Alignment Charter and the ethical deployment of autonomous agents.
            </p>
          </div>
        </motion.div>

        {/* Right Side: Register Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="glass-card p-10 md:p-12 border-white/5 relative group">
            {/* Corner Glow */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-secondary/10 transition-colors" />
            
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6 text-secondary-light">
                <User size={32} />
              </div>
              <h2 className="text-2xl font-black font-display uppercase tracking-tight mb-2">Create Identity</h2>
              <p className="text-sm text-muted font-medium">Provision your neural architect credentials</p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-8 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold text-center uppercase tracking-widest"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">Full Architect Name</label>
                <div className="relative group/input">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within/input:text-secondary transition-colors" />
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:border-secondary/30 focus:bg-white/10 outline-none transition-all"
                    placeholder="e.g. Satoshi Nakamoto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">Communication Channel</label>
                <div className="relative group/input">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within/input:text-secondary transition-colors" />
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:border-secondary/30 focus:bg-white/10 outline-none transition-all"
                    placeholder="architect@sarvam.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">Secret Access Key</label>
                <div className="relative group/input">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within/input:text-secondary transition-colors" />
                  <input
                    type="password"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:border-secondary/30 focus:bg-white/10 outline-none transition-all"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-secondary w-full py-4 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 relative overflow-hidden group/btn" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <span>Initialize Node</span>
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              </button>
            </form>

            <div className="text-center mt-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Already Authenticated? </span>
              <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-secondary-light hover:text-white transition-colors ml-2 flex items-center justify-center gap-2 mt-4 group/link">
                Re-establish Connection
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

