import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchUsers, toggleUserStatus, toggleUserRole, deleteUser } from '../../store/slices/adminSlice';
import { Search, Edit, Trash2, Ban, Shield, ShieldOff, CheckCircle } from 'lucide-react';

export default function UserManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.admin);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>User Management</h2>
          <p className="text-muted">Manage all registered users and administrators.</p>
        </div>
        <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center' }}>
          <Search size={18} className="text-muted mr-2" />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)' }} 
          />
        </div>
      </div>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <div className="glass-card overflow-hidden">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Name</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Email</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Role</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem' }}>{user.name}</td>
                  <td style={{ padding: '1rem' }}>{user.email}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '12px', 
                      fontSize: '0.75rem', 
                      fontWeight: 600,
                      background: user.role === 'admin' ? 'rgba(168, 85, 247, 0.2)' : 'var(--bg-secondary)',
                      color: user.role === 'admin' ? '#a855f7' : 'var(--text-secondary)'
                    }}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                     <span style={{ 
                      display: 'flex', alignItems: 'center', gap: '0.25rem',
                      color: user.is_active ? 'var(--success)' : 'var(--danger)',
                      fontWeight: 500, fontSize: '0.875rem'
                    }}>
                      {user.is_active ? <CheckCircle size={14} /> : <Ban size={14} />}
                      {user.is_active ? 'Active' : 'Blocked'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div className="flex justify-end gap-2">
                       <button 
                        onClick={() => dispatch(toggleUserRole({ id: user.id, role: user.role }))}
                        className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '8px' }}
                        title={user.role === 'admin' ? "Demote to User" : "Promote to Admin"}
                      >
                        {user.role === 'admin' ? <ShieldOff size={16} /> : <Shield size={16} />}
                      </button>
                      <button 
                        onClick={() => dispatch(toggleUserStatus({ id: user.id, is_active: user.is_active }))}
                        className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '8px' }}
                        title={user.is_active ? "Block User" : "Unblock User"}
                      >
                        <Ban size={16} />
                      </button>
                      <button 
                        onClick={() => dispatch(deleteUser(user.id))}
                        className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '8px', color: 'var(--danger)' }}
                        title="Delete User"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No users found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
