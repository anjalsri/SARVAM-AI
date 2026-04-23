import React, { useState, useEffect, useRef } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { LayoutDashboard, Sparkles, BarChart2, Settings, LogOut, Sun, Moon, Menu, X, Users, FileText, Edit3, Briefcase, DollarSign, CreditCard, Bell, Search, ChevronDown, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout() {
  const { user, loading, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { name: 'Core Overview', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Neural Nodes', path: '/dashboard/users', icon: <Users size={18} /> },
    { name: 'Data Management', path: '/dashboard/content', icon: <FileText size={18} /> },
    { name: 'Logbook Edits', path: '/dashboard/blog', icon: <Edit3 size={18} /> },
    { name: 'Protocol Ops', path: '/dashboard/services', icon: <Briefcase size={18} /> },
    { name: 'Energy Units', path: '/dashboard/pricing', icon: <DollarSign size={18} /> },
    { name: 'Transmissions', path: '/dashboard/payments', icon: <CreditCard size={18} /> },
    { name: 'Neural Tools', path: '/dashboard/ai', icon: <Sparkles size={18} /> },
    { name: 'Synapse Analytics', path: '/dashboard/analytics', icon: <BarChart2 size={18} /> },
    { name: 'Uplink Alerts', path: '/dashboard/notifications', icon: <Bell size={18} /> },
    { name: 'System Config', path: '/dashboard/settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-72 bg-background/50 backdrop-blur-2xl border-r border-white/5 
        transform transition-transform duration-500 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="h-20 flex items-center px-8 border-b border-white/5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:rotate-[360deg] transition-transform duration-700">
                <LayoutDashboard size={18} />
              </div>
              <span className="text-lg font-black uppercase tracking-widest font-display text-gradient">Sarvam</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto py-8 px-4 custom-scrollbar">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-6 px-4">Operations Control</div>
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                return (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group
                      ${isActive ? 'text-primary-light bg-primary/10' : 'text-muted hover:text-foreground hover:bg-white/5'}
                    `}
                  >
                    <span className={`${isActive ? 'text-primary-light' : 'text-muted-foreground group-hover:text-primary-light transition-colors'}`}>
                      {item.icon}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest">{item.name}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="sidebar-glow"
                        className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="p-4 border-t border-white/5">
            <button 
              onClick={logout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-muted hover:text-rose-400 hover:bg-rose-400/5 transition-all duration-300"
            >
              <LogOut size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Terminate Session</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-20 flex items-center justify-between px-8 bg-background/50 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted hover:text-foreground transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="relative hidden md:block group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Query neural network..." 
                className="bg-white/5 border border-white/5 rounded-full py-2.5 pl-12 pr-6 text-xs font-medium w-80 focus:w-96 focus:border-primary/30 focus:bg-white/10 outline-none transition-all duration-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted hover:text-foreground transition-all border border-transparent hover:border-white/10 relative">
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)] border-2 border-background" />
            </button>

            <div className="h-8 w-px bg-white/5 mx-2" />

            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/5 border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-[10px] font-black uppercase">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-[10px] font-black uppercase tracking-widest leading-none">{user.name}</div>
                  <div className="text-[8px] text-muted-foreground uppercase tracking-widest mt-1 font-bold">{user.role}</div>
                </div>
                <ChevronDown size={14} className={`text-muted transition-transform duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-56 bg-background/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2 z-[100]"
                  >
                    <div className="px-4 py-3 border-b border-white/5 mb-2">
                        <div className="text-[10px] font-black uppercase tracking-widest">{user.name}</div>
                        <div className="text-[8px] text-muted-foreground truncate font-bold mt-1">{user.email}</div>
                    </div>
                    <Link to="/dashboard/settings" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-muted hover:text-foreground hover:bg-white/5 transition-all">
                      <UserIcon size={14} /> Identity Profile
                    </Link>
                    <Link to="/dashboard/settings" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-muted hover:text-foreground hover:bg-white/5 transition-all">
                      <Settings size={14} /> Node Config
                    </Link>
                    <div className="h-px bg-white/5 my-2" />
                    <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-rose-400 hover:bg-rose-400/5 transition-all">
                      <LogOut size={14} /> Terminate
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
