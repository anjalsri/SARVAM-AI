import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Github, Twitter, Linkedin, Mail, ArrowRight, Shield, Database, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer bg-background relative overflow-hidden pt-24 pb-12 border-t border-white/5">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Identity */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:rotate-[360deg] transition-transform duration-700">
                <Cpu size={24} />
              </div>
              <span className="text-xl font-black uppercase tracking-widest font-display text-gradient">Sarvam AI</span>
            </Link>
            
            <p className="text-muted text-lg max-w-sm leading-relaxed">
              Empowering the next generation of digital transformation with decentralized neural networks and quantum-safe protocols.
            </p>

            <div className="flex gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl glass-card border-white/10 hover:border-primary/50 flex items-center justify-center text-muted hover:text-primary-light transition-all bg-white/5 hover:bg-white/10 backdrop-blur-xl group">
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <div className="mt-8 p-6 glass-card border-primary/20 bg-primary/5 rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-primary/10 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary-light">
                        <Zap size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest">Neural Newsletter</h4>
                        <p className="text-[10px] text-muted italic leading-none mt-1">Join 22k+ neural architects.</p>
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-primary-light group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Quick Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-6">
              <h5 className="text-sm font-black uppercase tracking-widest text-primary-light">Ecosystem</h5>
              <ul className="flex flex-col gap-4">
                {['Neural Home', 'Protocols', 'Cloud Orbit', 'Secure Core', 'Workflow Base'].map(link => (
                  <li key={link}><a href="#" className="text-sm text-muted hover:text-foreground transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col gap-6">
              <h5 className="text-sm font-black uppercase tracking-widest text-primary-light">Insights</h5>
              <ul className="flex flex-col gap-4">
                {['Neural Blog', 'Case Studies', 'Documentation', 'API Reference', 'Status Interface'].map(link => (
                  <li key={link}><a href="#" className="text-sm text-muted hover:text-foreground transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6 col-span-2 md:col-span-1">
              <h5 className="text-sm font-black uppercase tracking-widest text-primary-light">Company</h5>
              <ul className="flex flex-col gap-4">
                {['Our Vision', 'The Team', 'Security Standards', 'Partner Network', 'Contact Neural'].map(link => (
                  <li key={link}><a href="#" className="text-sm text-muted hover:text-foreground transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-12 text-xs font-bold uppercase tracking-tighter text-muted">
                <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-emerald-400" />
                    <span>Post-Quantum Ready</span>
                </div>
                <div className="flex items-center gap-2">
                    <Database className="w-3 h-3 text-primary-light" />
                    <span>Decentralized Storage</span>
                </div>
            </div>

            <div className="text-xs font-bold text-muted uppercase tracking-widest">
                © 2026 Sarvam AI Protocols. All neural rights reserved.
            </div>
        </div>
      </div>
    </footer>
  );
}
