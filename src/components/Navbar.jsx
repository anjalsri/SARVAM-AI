import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu, Github, Twitter, Linkedin, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Neural Home', path: '/' },
    { name: 'Protocols', path: '/services' },
    { name: 'Insights', path: '/blog' },
    { name: 'Interface', path: '/dashboard' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'py-4 bg-background/80 backdrop-blur-xl border-b border-white/5' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:rotate-[360deg] transition-transform duration-700">
            <Cpu size={24} />
          </div>
          <span className="text-xl font-black uppercase tracking-widest font-display text-gradient">Sarvam AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 p-1 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-md">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 relative group ${
                location.pathname === link.path ? 'text-primary-light' : 'text-muted hover:text-foreground'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="nav-glow"
                  className="absolute inset-0 bg-primary/10 rounded-xl -z-10 shadow-[0_0_15px_rgba(99,102,241,0.2)]" 
                />
              )}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-muted hover:text-foreground transition-all hover:bg-white/5"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/register" className="btn-primary py-2 text-xs">Deploy Core</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold uppercase tracking-widest text-muted hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/5 w-full" />
              <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                      <Twitter className="w-5 h-5 text-muted hover:text-primary transition-colors" />
                      <Github className="w-5 h-5 text-muted hover:text-primary transition-colors" />
                      <Linkedin className="w-5 h-5 text-muted hover:text-primary transition-colors" />
                  </div>
                  <Link to="/register" className="btn-primary py-2 text-xs">Get Started</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
