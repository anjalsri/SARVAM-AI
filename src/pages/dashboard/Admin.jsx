import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Admin() {
  const { user } = useAuth();

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Admin Settings</h2>
        <p className="text-muted">Manage your organization and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card md:col-span-1 flex flex-col gap-2">
          <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'var(--bg-tertiary)', fontWeight: 500 }}>Profile</div>
          <div style={{ padding: '0.5rem', borderRadius: '8px', color: 'var(--text-muted)', cursor: 'pointer' }}>Team</div>
          <div style={{ padding: '0.5rem', borderRadius: '8px', color: 'var(--text-muted)', cursor: 'pointer' }}>Billing</div>
          <div style={{ padding: '0.5rem', borderRadius: '8px', color: 'var(--text-muted)', cursor: 'pointer' }}>API Keys</div>
        </div>

        <div className="glass-card md:col-span-2 flex flex-col gap-6">
          <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Full Name</label>
                <input type="text" className="input" defaultValue={user?.name} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Email Role</label>
                <input type="text" className="input" defaultValue={user?.email} disabled />
              </div>
            </div>
            <button className="btn btn-primary mt-4">Save Changes</button>
          </div>

          <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginTop: '1rem' }}>
              Preferences
            </h3>
            <div className="flex items-center justify-between" style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
              <div>
                <div style={{ fontWeight: 500 }}>Email Notifications</div>
                <div className="text-muted" style={{ fontSize: '0.875rem' }}>Receive daily summary emails.</div>
              </div>
              <div style={{ width: '40px', height: '24px', background: 'var(--accent-primary)', borderRadius: '12px', position: 'relative' }}>
                <div style={{ position: 'absolute', right: '2px', top: '2px', width: '20px', height: '20px', background: '#fff', borderRadius: '50%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
