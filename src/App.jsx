import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import RootLayout from './layouts/RootLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import { Services, About, Blog, BlogPost, Contact } from './pages/PublicPages';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard Pages
import Overview from './pages/dashboard/Overview';
import AiTools from './pages/dashboard/AiTools';
import Analytics from './pages/dashboard/Analytics';
import Admin from './pages/dashboard/Admin';
import UserManagement from './pages/dashboard/UserManagement';
import ContentManagement from './pages/dashboard/ContentManagement';
import { DashboardBlog, DashboardServices, DashboardPricing, DashboardPayments, Notifications, Settings } from './pages/dashboard/DashboardPages';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes with Navbar/Footer */}
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="about" element={<About />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blogs" element={<Navigate to="/blog" replace />} />
              <Route path="blog/:id" element={<BlogPost />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="content" element={<ContentManagement />} />
              <Route path="blog" element={<DashboardBlog />} />
              <Route path="services" element={<DashboardServices />} />
              <Route path="pricing" element={<DashboardPricing />} />
              <Route path="payments" element={<DashboardPayments />} />
              <Route path="ai" element={<AiTools />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
              <Route path="admin" element={<Admin />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
