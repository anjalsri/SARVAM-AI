import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Smartphone, Megaphone, Globe, PenTool, Bot, Mail, BarChart, ArrowRight, CheckCircle2, Lightbulb, Eye, TrendingUp, Monitor, Zap, Target, Compass, MapPin, Phone, Cpu, Twitter, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { blogData } from '../data/blogData';
import FAQSection from '../components/FAQSection';
import AnimatedSection from '../components/AnimatedSection';

export function Services() {
  const serviceCategories = [
    {
      title: "Neural Intelligence",
      items: [
        {
          icon: <Bot className="text-primary-light" size={32} />,
          title: "Autonomous Agents",
          desc: "Deploy self-learning AI agents that orchestrate complex workflows without human intervention.",
          features: ["Real-time decisioning", "Recursive learning loops", "Multi-modal processing", "Self-healing protocols"],
        },
        {
          icon: <Cpu className="text-secondary-light" size={32} />,
          title: "Neural Fine-Tuning",
          desc: "Custom-train foundational models on your proprietary data clusters with zero leakage.",
          features: ["PEFT/LoRA adapters", "Secure data vaulting", "Hyper-parameter optimization", "Private weights"],
        },
        {
          icon: <Zap className="text-accent-cyan" size={32} />,
          title: "Predictive Synapse",
          desc: "Forecast market shifts and user behavior with sub-second latency and 99% accuracy.",
          features: ["Anomaly detection", "Pattern recognition", "Temporal analysis", "Drift monitoring"],
        }
      ]
    },
    {
      title: "Decentralized Infrastructure",
      items: [
        {
          icon: <Globe className="text-accent-emerald" size={32} />,
          title: "Global Mesh Network",
          desc: "Execute workloads across a distributed neural mesh for ultra-low latency edge computing.",
          features: ["Edge deployment", "Auto-scaling nodes", "Failover redundancy", "P2P data routing"],
        },
        {
          icon: <Smartphone className="text-accent-rose" size={32} />,
          title: "Mobile Neural Engines",
          desc: "Run optimized LLMs directly on mobile hardware with minimal battery impact.",
          features: ["On-device inference", "Model quantization", "Local privacy", "Offline capabilities"],
        }
      ]
    },
    {
      title: "Cognitive Security",
      items: [
        {
          icon: <Eye className="text-primary-light" size={32} />,
          title: "Neural Firewall",
          desc: "Protect your AI assets from prompt injection, data poisoning, and model inversion attacks.",
          features: ["Adversarial filtering", "Input sanitization", "Guardrail enforcement", "Audit logging"],
          usp: true
        },
        {
          icon: <Target className="text-accent-cyan" size={32} />,
          title: "Ethics Alignment",
          desc: "Ensure your AI output remains compliant with global regulations and corporate values.",
          features: ["Bias detection", "Toxicity filtering", "Hallucination control", "Regulatory mapping"],
        }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 container mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass-card border-primary/20 bg-primary/5 rounded-full"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary-light">The Neural Protocols</span>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black font-display mb-8 leading-tight">
          Redefining the <br /> <span className="text-gradient">Neural Landscape</span>
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed font-medium">
          Deploy enterprise-grade intelligence with our suite of decentralized protocols and autonomous agents.
        </p>
      </div>

      {/* Featured Service Hero */}
      <div className="glass-card mb-32 overflow-hidden border-white/5 relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 p-8 md:p-16">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black font-display leading-tight">
              Enterprise <br />
              <span className="text-gradient">Neural Clusters</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              Our Neural Clusters provide a dedicated environment for your most demanding AI workloads. Secure, scalable, and fully integrated with our global mesh network.
            </p>
            <div className="flex flex-wrap gap-8">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-foreground">99.99%</div>
                <div className="text-[10px] uppercase tracking-widest text-muted font-bold">Inference Uptime</div>
              </div>
              <div className="w-px h-10 bg-white/10 hidden md:block" />
              <div className="space-y-1">
                <div className="text-3xl font-bold text-foreground">{'<'}12ms</div>
                <div className="text-[10px] uppercase tracking-widest text-muted font-bold">Mean Latency</div>
              </div>
            </div>
            <button className="btn-primary">Provision Cluster</button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-50 animate-pulse" />
            <img 
              src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200" 
              alt="Neural Network" 
              className="rounded-2xl border border-white/10 shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-700" 
            />
          </div>
        </div>
      </div>

      {/* Protocols Grid */}
      {serviceCategories.map((category, catIndex) => (
        <div key={catIndex} className="mb-32">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-3xl font-black font-display uppercase tracking-widest whitespace-nowrap">{category.title}</h2>
            <div className="h-px bg-gradient-to-r from-white/10 to-transparent w-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.items.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 group hover:-translate-y-2 transition-all duration-500 border-white/5 relative flex flex-col h-full"
              >
                {service.usp && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20">
                    Proprietary Protocol
                  </div>
                )}
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-black font-display mb-4">{service.title}</h3>
                <p className="text-muted mb-8 flex-grow">{service.desc}</p>
                
                <div className="space-y-3 mb-10">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <button className="btn-secondary w-full py-2 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Read Documentation
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}



export function About() {
  const values = [
    { icon: <Lightbulb className="text-primary-light" size={24} />, title: "Neural Innovation", desc: "Pushing the boundaries of recursive self-learning models." },
    { icon: <Eye className="text-secondary-light" size={24} />, title: "Radical Transparency", desc: "Open-weights protocols for the decentralized web." },
    { icon: <TrendingUp className="text-accent-cyan" size={24} />, title: "Exponential Growth", desc: "Scaling intelligence at the speed of light." },
    { icon: <Monitor className="text-accent-emerald" size={24} />, title: "Unified Interface", desc: "One seamless portal for all cognitive operations." },
    { icon: <Zap className="text-accent-rose" size={24} />, title: "Quantum Speed", desc: "Sub-millisecond inference across the global mesh." }
  ];

  return (
    <div className="pt-32 pb-24 px-6 container mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass-card border-primary/20 bg-primary/5 rounded-full"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary-light">The Neural Frontier</span>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black font-display mb-8 leading-tight">
          Architecting the <br /> <span className="text-gradient">Cognitive Future</span>
        </h1>
        <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed font-medium">
          Sarvam AI is a decentralized intelligence collective dedicated to building the foundational layer of the next digital era.
        </p>
      </section>

      {/* Story Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
          <div className="glass-card p-4 rounded-[2rem] border-white/10 relative z-10 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" 
              alt="Digital Universe" 
              className="rounded-[1.5rem] w-full grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-10 right-10 glass-card p-6 rounded-2xl border-white/20 animate-float">
              <div className="text-4xl font-black text-gradient">2026</div>
              <div className="text-[10px] uppercase tracking-widest text-muted font-black">The Neural Awakening</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-primary w-12" />
            <span className="text-sm font-bold uppercase tracking-widest text-primary-light">Our Genesis</span>
          </div>
          <h2 className="text-4xl font-black font-display leading-tight">Born from the <br /> <span className="text-gradient">Digital Void</span></h2>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              Sarvam AI emerged from a simple observation: the current centralized intelligence models are fragile, biased, and inefficient. We envisioned a world where intelligence is fluid, decentralized, and accessible to all.
            </p>
            <p>
              Our journey started with a small group of neural architects and cryptographers working in the shadows to build the first decentralized inference mesh. Today, that mesh powers thousands of autonomous agents across the globe.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-8">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-foreground">1.2B+</div>
              <div className="text-[10px] uppercase tracking-widest text-muted font-bold">Synaptic Connections</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-foreground">45k</div>
              <div className="text-[10px] uppercase tracking-widest text-muted font-bold">Active Nodes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black font-display uppercase tracking-widest mb-4">Core Directives</h2>
          <p className="text-muted font-medium">The fundamental protocols that govern our collective.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 text-center flex flex-col items-center hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-xl shadow-black/20">
                {v.icon}
              </div>
              <h4 className="text-xl font-black font-display mb-4 uppercase tracking-widest">{v.title}</h4>
              <p className="text-muted leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Founder Section */}
      <section className="glass-card p-12 md:p-24 border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-px bg-secondary w-12" />
              <span className="text-sm font-bold uppercase tracking-widest text-secondary-light">The Architect</span>
            </div>
            <h2 className="text-5xl font-black font-display leading-tight">Anjal <span className="text-gradient">Srivastav</span></h2>
            <p className="text-xl text-muted-foreground leading-relaxed italic">
              "We aren't just building tools; we are creating the neural substrate for the next iteration of human consciousness. Sarvam AI is the bridge to that frontier."
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Anjal Srivastav is the lead neural architect and visionary behind the Sarvam protocols. With over a decade of experience in quantum computing and distributed systems, he has pioneered the concept of 'Cognitive Decentralization'.
              </p>
              <p>
                His work focuses on the intersection of human-computer interaction and autonomous agent swarms, ensuring that AI remains a tool for empowerment rather than control.
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <Twitter size={18} className="text-muted" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <Linkedin size={18} className="text-muted" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <Github size={18} className="text-muted" />
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-secondary/30 blur-[120px] rounded-full opacity-30 animate-pulse" />
            <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 relative z-10 bg-gradient-to-br from-white/10 to-transparent p-1">
              <div className="w-full h-full rounded-[2.8rem] overflow-hidden bg-background flex items-center justify-center text-8xl font-black text-white/5 select-none">
                AS
              </div>
            </div>
            {/* Abstract elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 border border-primary/20 rounded-full animate-pulse-slow" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 border border-secondary/20 rounded-full animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  );
}


export function Blog() {
  return (
    <div className="pt-32 pb-24 px-6 container mx-auto">
      <div className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass-card border-primary/20 bg-primary/5 rounded-full"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary-light">Cognitive Insights</span>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black font-display mb-8">
          The Neural <span className="text-gradient">Logbook</span>
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          Exploring the frontiers of decentralized intelligence, quantum neural networks, and the future of human-AI symbiosis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogData.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card group flex flex-col h-full hover:-translate-y-2 transition-all duration-500 overflow-hidden border-white/5"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
              />
              <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {blog.category}
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center gap-4 mb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span>{blog.date}</span>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <span>5 min read</span>
              </div>
              <h3 className="text-xl font-black font-display mb-4 leading-tight group-hover:text-primary-light transition-colors">{blog.title}</h3>
              <p className="text-muted text-sm mb-8 line-clamp-3 leading-relaxed flex-grow">
                {blog.shortDesc}
              </p>
              
              <Link to={`/blog/${blog.id}`} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground group-hover:text-primary-light transition-all">
                Access Data <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function BlogPost() {
  const { id } = useParams();
  const blog = blogData.find(b => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="pt-40 pb-24 px-6 container mx-auto text-center">
        <h2 className="text-3xl font-black font-display">Data Stream Interrupted</h2>
        <p className="text-muted mt-4">The requested node could not be located in the neural mesh.</p>
        <Link to="/blog" className="btn-secondary mt-8 inline-block">Return to Logbook</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 container mx-auto max-w-4xl">
      <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted hover:text-primary-light mb-12 transition-colors">
         <ArrowRight size={16} className="rotate-180" /> Back to Mesh
      </Link>
      
      <header className="mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/10 border border-primary/20 text-primary-light px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-6"
        >
          {blog.category}
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-black font-display leading-tight mb-8">{blog.title}</h1>
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary" />
                <div>
                    <div className="text-xs font-black uppercase tracking-widest">Neural Archon</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{blog.date}</div>
                </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-[10px] font-black uppercase tracking-widest text-muted">Node ID: #SN-294-X</div>
        </div>
      </header>
      
      <div className="aspect-video rounded-[2rem] overflow-hidden border border-white/5 mb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
      </div>
      
      <article className="glass-card p-10 md:p-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent-cyan" />
        <div className="prose prose-invert max-w-none space-y-8 text-lg text-muted-foreground leading-relaxed font-medium">
          {blog.content.split('\n').map((paragraph, index) => (
             <p key={index} className="first-letter:text-5xl first-letter:font-black first-letter:text-primary-light first-letter:mr-3 first-letter:float-left">
               {paragraph}
             </p>
          ))}
        </div>
      </article>

      <div className="mt-24 p-12 glass-card border-white/5 text-center">
          <h3 className="text-2xl font-black font-display mb-4">Continue the Exploration</h3>
          <p className="text-muted mb-8">Join our neural network to receive deep-dive reports directly to your interface.</p>
          <div className="flex max-w-md mx-auto gap-4">
              <input type="email" placeholder="neural_id@network.com" className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-primary/50 outline-none transition-colors" />
              <button className="btn-primary py-2 px-6 text-xs whitespace-nowrap">Sync ID</button>
          </div>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <div className="pt-32 pb-24 px-6 container mx-auto">
      <div className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass-card border-primary/20 bg-primary/5 rounded-full"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary-light">The Neural Nexus</span>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black font-display mb-8">
          Establish <span className="text-gradient">Connection</span>
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          The Sarvam collective is ready to synchronize with your enterprise objectives. Initiate the uplink below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
        <div className="space-y-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="glass-card p-2 rounded-[2rem] border-white/10 relative z-10 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
                  alt="Terminal" 
                  className="rounded-[1.8rem] w-full grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
            </div>
          </div>
          
          <div className="grid gap-8">
            {[
                { icon: <Mail className="text-primary-light" />, label: "Encrypted Uplink", value: "nexus@sarvam.ai" },
                { icon: <Phone className="text-secondary-light" />, label: "Direct Comms", value: "+91 8303614718" },
                { icon: <MapPin className="text-accent-cyan" />, label: "Physical Node", value: "Lucknow, Uttar Pradesh, India" }
            ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">{item.label}</div>
                    <div className="text-lg font-bold group-hover:text-primary-light transition-colors">{item.value}</div>
                  </div>
                </div>
            ))}
          </div>
        </div>
        
        <div className="glass-card p-10 md:p-16 border-white/5 relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <form className="space-y-8 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Entity Identifier</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-foreground outline-none focus:border-primary/50 transition-all font-medium" placeholder="Full Name or Org" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Uplink Address</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-foreground outline-none focus:border-primary/50 transition-all font-medium" placeholder="email@nexus.com" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Protocol Specification</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-foreground outline-none focus:border-primary/50 transition-all font-medium appearance-none">
                  <option className="bg-background">Neural Fine-Tuning</option>
                  <option className="bg-background">Autonomous Agents</option>
                  <option className="bg-background">Cognitive Security</option>
                  <option className="bg-background">Other Uplink</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Transmission Data</label>
              <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-foreground outline-none focus:border-primary/50 transition-all font-medium min-h-[150px]" placeholder="Specify your requirements..."></textarea>
            </div>
            <button className="btn-primary w-full py-4 text-sm tracking-widest font-black" type="button">Initiate Sync</button>
          </form>
        </div>
      </div>
    </div>
  );
}
