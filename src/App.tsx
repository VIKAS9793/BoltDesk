import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store';
import { useToast } from './hooks/useToast';
import { ToastContainer } from './components/ui/Toast';

import { AuthLayout } from './layouts/AuthLayout';
import CreatorDashboardLayout from './layouts/CreatorDashboardLayout';
import ConsumerDashboardLayout from './layouts/ConsumerDashboardLayout';
import { PublicPortalLayout } from './layouts/PublicPortalLayout';

import { Login } from './pages/auth/Login';
import { DashboardPage } from './pages/dashboard/Dashboard';
import { ContentManagementPage } from './pages/dashboard/ContentManagement';
import { AISettingsPage } from './pages/dashboard/AISettings';
import { DomainSettingsPage } from './pages/dashboard/DomainSettings';
import { AudiencePage } from './pages/dashboard/AudiencePage';
import { MonetizationPage } from './pages/dashboard/MonetizationPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';

import LicensePage from './pages/public/LicensePage';
import AboutPage from './pages/public/AboutPage';
import HomePage from './pages/public/HomePage';

import { ConsumerDashboard } from './pages/consumer/ConsumerDashboard';
import { ContentLibrary } from './pages/consumer/ContentLibrary';
import { Favorites } from './pages/consumer/Favorites';
import { Subscriptions } from './pages/consumer/Subscriptions';
import { ConsumerSettings } from './pages/consumer/ConsumerSettings';

// New legal and support pages
import TermsOfService from './pages/legal/TermsOfService';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import FAQ from './pages/support/FAQ';

function App() {
  const { isDarkMode, isAuthenticated, currentUser } = useAppStore();
  const { toasts, hideToast } = useToast();
  
  // Initialize dark mode from system preference
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  
  // Debug logging for app state
  useEffect(() => {
    console.log('=== App State ===');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('currentUser:', currentUser);
    console.log('=================');
  }, [isAuthenticated, currentUser]);
  
  return (
    <BrowserRouter>
      <Routes> 
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Creator Dashboard Routes */}
        <Route path="/dashboard" element={<CreatorDashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="content" element={<ContentManagementPage />} />
          <Route path="ai" element={<AISettingsPage />} />
          <Route path="audience" element={<AudiencePage />} />
          <Route path="monetization" element={<MonetizationPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="settings/domain" element={<DomainSettingsPage />} />
        </Route>

        {/* Consumer Dashboard Routes */}
        <Route path="/consumer" element={<ConsumerDashboardLayout />}>
          <Route index element={<ConsumerDashboard />} />
          <Route path="library" element={<ContentLibrary />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="settings" element={<ConsumerSettings />} />
        </Route>

        {/* Public Routes */}
        <Route element={<PublicPortalLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/license" element={<LicensePage />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Legal Routes */}
          <Route path="/legal/terms" element={<TermsOfService />} />
          <Route path="/legal/privacy" element={<PrivacyPolicy />} />
          
          {/* Support Routes */}
          <Route path="/support/faq" element={<FAQ />} />
        </Route>
        
        {/* Root redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Global Toast Container */}
      <ToastContainer toasts={toasts} onClose={hideToast} />
    </BrowserRouter>
  );
}

export default App;