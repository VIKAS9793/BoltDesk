import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store';

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

function App() {
  const { isDarkMode } = useAppStore();
  
  // Initialize dark mode from system preference
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  
  return (
    <BrowserRouter>
      <Routes> 
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<CreatorDashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="content" element={<ContentManagementPage />} />
          <Route path="ai" element={<AISettingsPage />} />
          <Route path="audience" element={<AudiencePage />} />
          <Route path="monetization" element={<MonetizationPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="settings/domain" element={<DomainSettingsPage />} />
        </Route>

        {/* Consumer Routes */}
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
        </Route>
        
        {/* Root redirect */}
        <Route path="*" element={<Navigate to="/\" replace />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;