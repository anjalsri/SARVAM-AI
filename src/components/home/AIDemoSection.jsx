import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Terminal, Code, Cpu } from 'lucide-react';

const AIResponse = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text[index]);
      index++;
      if (index === text.length) {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="flex gap-4 items-start">
      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 border border-primary/30 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
        <Bot className="w-4 h-4 text-primary-light" />
      </div>
      <div className="glass-card bg-primary/5 p-4 rounded-2xl rounded-tl-none border-primary/20 max-w-[85%]">
        <div className="text-sm leading-relaxed text-foreground/90 font-medium">
          {displayText}
          {isTyping && <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-1.5 h-4 bg-primary-light ml-1 mb-[-2px]" />}
        </div>
      </div>
    </div>
  );
};

export default function AIDemoSection() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Initialize Sarvam AI protocols. How can I assist your neural transformation today?' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || isProcessing) return;

    const userMsg = query;
    setQuery("");
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setIsProcessing(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const responses = [
        "Analyzing organizational data vectors... Optimal neural alignment achieved. I recommend scaling your node clusters by 14% for maximum throughput.",
        "Security protocols verified. Implementing quantum-safe encryption across all decentralized nodes. System integrity: 100%.",
        "Workflow automation initialized. Connecting your 12 core operational modules with zero-latency synchronization.",
        "Predictive analytics suggest a 24% increase in operational efficiency by re-routing neural processing through Tier-1 clusters."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { role: 'bot', text: randomResponse }]);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 glass-card bg-emerald-500/10 border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-full w-fit">
              <Sparkles className="w-3 h-3" />
              Real-time Interaction Demo
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight">
              Interact with the <br />
              <span className="text-gradient">Sarvam Neural Core</span>
            </h2>
            <p className="text-muted text-lg leading-relaxed">
              Experience the future of organizational intelligence. Our AI core doesn't just respond; it analyzes, predicts, and optimizes your entire digital ecosystem in milliseconds.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { icon: <Terminal className="w-5 h-5" />, label: "Predictive Analytics", desc: "Forecast operational outcomes" },
                    { icon: <Code className="w-5 h-5" />, label: "Autonomous Repair", desc: "Self-healing neural clusters" }
                ].map((item, i) => (
                    <div key={i} className="glass-card p-4 hover:border-primary/40 group transition-all">
                        <div className="p-2 rounded-xl bg-white/5 w-fit mb-3 group-hover:text-primary-light transition-colors">{item.icon}</div>
                        <div className="text-sm font-bold mb-1">{item.label}</div>
                        <div className="text-xs text-muted">{item.desc}</div>
                    </div>
                ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Animated Glow behind the chat */}
            <div className="absolute inset-[-40px] bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="glass-card border-white/5 bg-white/[0.02] p-0 rounded-3xl overflow-hidden shadow-2xl relative">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse absolute inset-0" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-tighter text-muted">Neural Core v2.4</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                </div>
              </div>

              {/* Chat Content */}
              <div ref={scrollRef} className="h-[400px] overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
                {messages.map((msg, i) => (
                  msg.role === 'bot' ? (
                    <AIResponse key={i} text={msg.text} />
                  ) : (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.95, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        className="flex gap-4 items-start justify-end"
                    >
                        <div className="glass-card bg-primary text-white p-4 rounded-2xl rounded-tr-none border-none shadow-lg shadow-primary/20 max-w-[85%]">
                            <div className="text-sm font-medium">{msg.text}</div>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                            <User className="w-4 h-4 text-white/70" />
                        </div>
                    </motion.div>
                  )
                ))}
                {isProcessing && (
                  <div className="flex gap-4 items-start animate-pulse">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary-light" />
                    </div>
                    <div className="glass-card bg-primary/5 p-4 rounded-xl">
                        <div className="flex gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-light animate-bounce" />
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-light animate-bounce [animation-delay:0.2s]" />
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-light animate-bounce [animation-delay:0.4s]" />
                        </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSubmit} className="p-6 bg-white/[0.03] border-t border-white/5 flex gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask Sarvam AI something..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-sm font-medium focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!query.trim() || isProcessing}
                  className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
