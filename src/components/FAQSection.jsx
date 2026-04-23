import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const faqs = [
  { q: "1. What is Sarvam Digital?", a: "Sarvam Digital is an AI-powered digital marketing platform that helps businesses grow using automation, smart analytics, and modern marketing strategies like SEO, social media, and paid advertising." },
  { q: "2. What services does Sarvam Digital offer?", a: "We provide SEO optimization, social media marketing, paid advertising, website development, content creation, email marketing, and AI-powered marketing tools." },
  { q: "3. How does AI help in digital marketing?", a: "AI helps automate repetitive tasks, analyze customer behavior, generate content, and improve targeting accuracy, making marketing faster and more effective." },
  { q: "4. Who can use Sarvam Digital?", a: "Our platform is designed for startups, small businesses, entrepreneurs, and enterprises who want to grow their online presence efficiently." },
  { q: "5. Is Sarvam Digital beginner-friendly?", a: "Yes, our platform is easy to use with a simple dashboard, making it suitable for beginners as well as professionals." },
  { q: "6. What makes Sarvam Digital different?", a: "Our unique combination of AI tools and marketing strategies allows businesses to automate processes, save time, and achieve better results compared to traditional methods." },
  { q: "7. Do you provide customer support?", a: "Yes, we offer customer support through email, chat, and WhatsApp to help users with any issues or queries." },
  { q: "8. Is my data secure?", a: "Yes, we follow industry-standard security practices to ensure your data is safe and protected." }
];

function FAQAccordion({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-card" style={{ padding: '0', cursor: 'pointer', overflow: 'hidden', transition: 'border-color 0.3s' }} onClick={() => setIsOpen(!isOpen)}>
      <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '1.125rem', fontWeight: 600, color: isOpen ? 'var(--accent-light)' : 'inherit', transition: 'color 0.2s' }}>{faq.q}</span>
        <div style={{ color: isOpen ? 'var(--accent-light)' : 'var(--text-muted)' }}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </div>
      <div 
        style={{ 
          maxHeight: isOpen ? '300px' : '0', 
          opacity: isOpen ? 1 : 0, 
          padding: isOpen ? '0 1.5rem 1.5rem 1.5rem' : '0 1.5rem',
          transition: 'all 0.3s ease-in-out' 
        }}
      >
        <p className="text-muted" style={{ lineHeight: 1.6 }}>{faq.a}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="container" style={{ padding: '6rem 1.5rem' }}>
      <div className="text-center mb-12">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Frequently Asked Questions</h2>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>Everything you need to know about Sarvam Digital and our services.</p>
      </div>
      <div className="flex flex-col gap-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {faqs.map((faq, index) => (
          <AnimatedSection key={index} delay={index * 100}>
            <FAQAccordion faq={faq} />
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
