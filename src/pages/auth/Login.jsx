import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, ArrowRight, Loader2, Cpu, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Identity verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-background z-0" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full animate-pulse-slow" />
      
      <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side: Branding/Visual */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block space-y-12"
        >
          <div className="space-y-6">
             <div className="inline-flex items-center gap-2 px-4 py-2 glass-card border-primary/20 bg-primary/5 rounded-full">
                <ShieldCheck size={14} className="text-primary-light" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary-light">Secure Neural Link</span>
             </div>
             <h1 className="text-6xl font-black font-display leading-[1.1]">
                Access the <br />
                <span className="text-gradient">Neural Nexus</span>
             </h1>
             <p className="text-xl text-muted leading-relaxed max-w-md font-medium">
                Re-establish your cognitive link to the global mesh. Your decentralized intelligence awaits.
             </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">256-bit</div>
                <div className="text-[10px] uppercase tracking-widest text-muted font-bold">Quantum Encryption</div>
            </div>
            <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">Sub-10ms</div>
                <div className="text-[10px] uppercase tracking-widest text-muted font-bold">Inference Latency</div>
            </div>
          </div>

          <div className="pt-8 flex items-center gap-4 text-muted">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-white/5 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                </div>
              ))}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">Joined by 12,402+ Architects</span>
          </div>
        </motion.div>

        {/* Right Side: Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="glass-card p-10 md:p-12 border-white/5 relative group">
            {/* Corner Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors" />
            
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary-light">
                <Cpu size={32} />
              </div>
              <h2 className="text-2xl font-black font-display uppercase tracking-tight mb-2">Identify Yourself</h2>
              <p className="text-sm text-muted font-medium">Initialize neural authentication sequence</p>
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
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">Identity Mail</label>
                <div className="relative group/input">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within/input:text-primary transition-colors" />
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:border-primary/30 focus:bg-white/10 outline-none transition-all"
                    placeholder="architect@sarvam.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Access Key</label>
                  <a href="#" className="text-[10px] font-black uppercase tracking-widest text-primary-light hover:text-white transition-colors">Recover Key</a>
                </div>
                <div className="relative group/input">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within/input:text-primary transition-colors" />
                  <input
                    type="password"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:border-primary/30 focus:bg-white/10 outline-none transition-all"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary w-full py-4 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 relative overflow-hidden group/btn" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <span>Authenticate</span>
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              </button>
            </form>

            <div className="text-center mt-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted">New Architect? </span>
              <Link to="/register" className="text-[10px] font-black uppercase tracking-widest text-primary-light hover:text-white transition-colors ml-2 flex items-center justify-center gap-2 mt-4 group/link">
                Initiate Onboarding
                <Sparkles size={14} className="group-hover/link:rotate-12 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

