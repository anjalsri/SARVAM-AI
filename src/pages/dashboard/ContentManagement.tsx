import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
import { Save, Plus, GripVertical, Trash2, Edit3, Image as ImageIcon } from 'lucide-react';

interface ContentSection {
  id: string;
  type: 'hero' | 'text' | 'features' | 'pricing';
  title?: string;
  content?: string;
  imageUrl?: string;
}

export default function ContentManagement() {
  const [pages] = useState(['home', 'about', 'services', 'pricing', 'contact']);
  const [activePage, setActivePage] = useState('home');
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [saving, setSaving] = useState(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchPageContent(activePage);
  }, [activePage]);

  const fetchPageContent = async (pageRoute: string) => {
    try {
      const res = await apiFetch(`/content/${pageRoute}`);
      if (res.ok) {
         const data = await res.json();
         setSections(data.content_data?.sections || []);
      }
    } catch (e) {
      console.error(e);
      setSections([]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiFetch('/content/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: activePage, content_data: { sections } })
      });
      alert('Content saved successfully!');
    } catch (e) {
      alert('Failed to save content.');
    } finally {
      setSaving(false);
    }
  };

  const overrideSectionContent = (index: number, key: keyof ContentSection, value: string) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [key]: value };
    setSections(updated);
  };

  const removeSection = (index: number) => {
    const updated = [...sections];
    updated.splice(index, 1);
    setSections(updated);
  };

  const addSection = (type: ContentSection['type']) => {
    setSections([...sections, { id: Date.now().toString(), type, title: 'New Section', content: '' }]);
  };

  // HTML5 Drag & Drop
  const onDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === index) return;
    
    // Reorder
    const updated = [...sections];
    const draggedItem = updated[draggedItemIndex];
    updated.splice(draggedItemIndex, 1);
    updated.splice(index, 0, draggedItem);
    
    setSections(updated);
    setDraggedItemIndex(index);
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Content Management</h2>
          <p className="text-muted">Edit website content dynamically.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
          <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex gap-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
        {pages.map(p => (
           <button 
             key={p} 
             onClick={() => setActivePage(p)}
             style={{
               padding: '0.75rem 1rem', background: 'transparent',
               borderBottom: activePage === p ? '2px solid var(--accent-primary)' : '2px solid transparent',
               color: activePage === p ? 'var(--text-primary)' : 'var(--text-muted)',
               fontWeight: activePage === p ? 600 : 400
             }}
           >
             {p.toUpperCase()}
           </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sections.map((section, idx) => (
          <div 
            key={section.id} 
            draggable 
            onDragStart={(e) => onDragStart(e, idx)} 
            onDragOver={(e) => onDragOver(e, idx)}
            onDragEnd={() => setDraggedItemIndex(null)}
            className="glass-card flex gap-4" 
            style={{ 
              padding: '1rem', 
              cursor: draggedItemIndex === idx ? 'grabbing' : 'grab',
              opacity: draggedItemIndex === idx ? 0.5 : 1
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>
               <GripVertical />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
               <div className="flex justify-between items-center">
                 <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', background: 'var(--bg-secondary)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                   {section.type} BLOCK
                 </span>
                 <button onClick={() => removeSection(idx)} style={{ color: 'var(--danger)', background: 'transparent', border: 'none' }}>
                   <Trash2 size={18} />
                 </button>
               </div>
               
               <div className="flex flex-col gap-2">
                 <label style={{ fontSize: '0.875rem' }}>Title/Heading</label>
                 <input 
                   type="text" 
                   value={section.title || ''} 
                   onChange={(e) => overrideSectionContent(idx, 'title', e.target.value)}
                   style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)' }}
                 />
               </div>
               
               <div className="flex flex-col gap-2">
                 <label style={{ fontSize: '0.875rem' }}>Content/Text</label>
                 <textarea 
                   value={section.content || ''} 
                   onChange={(e) => overrideSectionContent(idx, 'content', e.target.value)}
                   rows={3}
                   style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)' }}
                 />
               </div>

               {(section.type === 'hero' || section.type === 'features') && (
                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}><ImageIcon size={14}/> Image URL</label>
                    <input 
                      type="text" 
                      value={section.imageUrl || ''} 
                      onChange={(e) => overrideSectionContent(idx, 'imageUrl', e.target.value)}
                      placeholder="https://..."
                      style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)' }}
                    />
                 </div>
               )}
            </div>
          </div>
        ))}
        {sections.length === 0 && (
           <div style={{ padding: '3rem', textAlign: 'center', border: '2px dashed var(--border-color)', borderRadius: '12px' }}>
             <p className="text-muted">No content sections mapped for this page.</p>
           </div>
        )}
      </div>

      {/* Add Section Buttons */}
      <div className="flex flex-wrap gap-2 mt-4">
         <button onClick={() => addSection('hero')} className="btn-secondary" style={{ padding: '0.5rem' }}><Plus size={16}/> Header / Hero</button>
         <button onClick={() => addSection('text')} className="btn-secondary" style={{ padding: '0.5rem' }}><Plus size={16}/> Text Block</button>
         <button onClick={() => addSection('features')} className="btn-secondary" style={{ padding: '0.5rem' }}><Plus size={16}/> Features</button>
         <button onClick={() => addSection('pricing')} className="btn-secondary" style={{ padding: '0.5rem' }}><Plus size={16}/> Pricing Plans</button>
      </div>

    </div>
  );
}
