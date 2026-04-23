import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiFetch } from '../../utils/api';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
}

export interface DashboardStats {
  total_users: number;
  active_subscriptions: number;
  total_revenue: number;
  api_calls: number;
}

interface AdminState {
  users: User[];
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  users: [],
  stats: null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('admin/fetchUsers', async () => {
  const res = await apiFetch('/admin/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
});

export const fetchStats = createAsyncThunk('admin/fetchStats', async () => {
  const res = await apiFetch('/admin/stats');
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
});

export const toggleUserStatus = createAsyncThunk('admin/toggleUserStatus', async ({ id, is_active }: { id: number, is_active: boolean }) => {
  const res = await apiFetch(`/admin/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ is_active: !is_active })
  });
  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
});

export const toggleUserRole = createAsyncThunk('admin/toggleUserRole', async ({ id, role }: { id: number, role: string }) => {
  const newRole = role === 'admin' ? 'user' : 'admin';
  const res = await apiFetch(`/admin/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: newRole })
  });
  if (!res.ok) throw new Error('Failed to update user role');
  return res.json();
});

export const deleteUser = createAsyncThunk('admin/deleteUser', async (id: number) => {
  const res = await apiFetch(`/admin/users/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete user');
  return id;
});

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching users';
      })
      // Fetch Stats
      .addCase(fetchStats.fulfilled, (state, action: PayloadAction<DashboardStats>) => {
        state.stats = action.payload;
      })
      // Toggles
      .addCase(toggleUserStatus.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(toggleUserRole.fulfilled, (state, action: PayloadAction<User>) => {
         const index = state.users.findIndex(u => u.id === action.payload.id);
         if (index !== -1) state.users[index] = action.payload;
      })
      // Delete
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter(u => u.id !== action.payload);
      });
  },
});

export default adminSlice.reducer;
