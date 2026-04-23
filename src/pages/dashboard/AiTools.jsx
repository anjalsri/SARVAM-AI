import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, Copy, Check } from 'lucide-react';

export default function AiTools() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am the Sarvam AI assistant powered by simulated Anthropic Claude. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const simulateAnthropicCall = async (userPrompt) => {
    // Simulated API latency
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple simulated responses based on keywords
    const lowerPrompt = userPrompt.toLowerCase();
    let response = "I'm a simulated AI assistant for this Sarvam platform demonstration. I don't have a real backend connected right now, but I can pretend to generate insightful analytics or code for you!";
    
    if (lowerPrompt.includes('code') || lowerPrompt.includes('react')) {
      response = "Here's an example of a simple React component snippet you could use:\n\n```jsx\nconst Welcome = ({ name }) => {\n  return <div>Welcome to Sarvam, {name}!</div>;\n};\nexport default Welcome;\n```";
    } else if (lowerPrompt.includes('analytics') || lowerPrompt.includes('data')) {
      response = "Based on our simulated data warehouse, I'm analyzing the recent trends...\n1. Revenue is up **20.1%** quarter-over-quarter.\n2. User retention stabilized at **84%**.\nI recommend focusing marketing spend on the enterprise segment.";
    } else if (lowerPrompt.includes('hello') || lowerPrompt.includes('hi')) {
      response = "Hello there! How can I assist you with your digital transformation today?";
    }

    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await simulateAnthropicCall(userMessage.content);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Failed to fetch AI response.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in flex flex-col h-full" style={{ height: 'calc(100vh - 140px)' }}>
      <div className="mb-6 flex items-center gap-3">
        <div style={{ padding: '0.5rem', background: 'var(--accent-primary)', borderRadius: '8px', color: '#fff' }}>
          <Sparkles size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Cognitive AI</h2>
          <p className="text-muted" style={{ margin: 0 }}>Natural language processing & code generation.</p>
        </div>
      </div>

      <div className="glass-card flex-1 flex flex-col" style={{ overflow: 'hidden', padding: 0 }}>
        {/* Chat Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {messages.map((msg, index) => (
            <div key={index} className="flex gap-4" style={{ flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: msg.role === 'user' ? 'var(--accent-primary)' : 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: msg.role === 'user' ? '#fff' : 'var(--text-primary)', flexShrink: 0 }}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div style={{ 
                maxWidth: '80%', 
                background: msg.role === 'user' ? 'var(--accent-primary)' : 'var(--bg-secondary)', 
                color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
                padding: '1rem', 
                borderRadius: '16px',
                borderTopRightRadius: msg.role === 'user' ? 0 : '16px',
                borderTopLeftRadius: msg.role === 'user' ? '16px' : 0,
                border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)',
                position: 'relative'
              }}>
                {msg.role === 'assistant' && (
                  <button 
                    onClick={() => handleCopy(msg.content, index)}
                    style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    {copiedIndex === index ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                  </button>
                )}
                <div style={{ whiteSpace: 'pre-wrap', fontFamily: msg.content.includes('```') ? 'monospace' : 'inherit', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
                <Bot size={18} />
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '16px', borderTopLeftRadius: 0, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Loader2 size={18} className="animate-spin text-accent" />
                <span className="text-muted" style={{ fontSize: '0.875rem' }}>Analyzing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', background: 'var(--card-bg)' }}>
          <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything or request analytics insights..."
              className="input"
              style={{ paddingRight: '4rem', paddingLeft: '1.5rem', borderRadius: '999px', height: '56px' }}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              style={{
                position: 'absolute', right: '8px', top: '8px',
                width: '40px', height: '40px', borderRadius: '50%',
                background: input.trim() && !isLoading ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                color: input.trim() && !isLoading ? '#fff' : 'var(--text-muted)',
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s', cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed'
              }}
            >
              <Send size={18} style={{ transform: 'translateX(1px)' }} />
            </button>
          </form>
          <div className="text-center text-muted mt-2" style={{ fontSize: '0.75rem' }}>
            AI-generated content may be inaccurate.
          </div>
        </div>
      </div>
    </div>
  );
}
