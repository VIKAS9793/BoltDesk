import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppStore } from '../store';
import { PublicHeader } from '../components/public/PublicHeader';
import { PublicFooter } from '../components/public/PublicFooter';
import { AIFloatingButton } from '../components/public/AIFloatingButton';
import { Toaster } from 'sonner';

export const PublicPortalLayout: React.FC = () => {
  const { isDarkMode, isAuthenticated, currentUser } = useAppStore();
  const location = useLocation();
  
  // Set dark mode class on document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Debug logging
  useEffect(() => {
    console.log('PublicPortalLayout - Mounted', { 
      isAuthenticated, 
      userRole: currentUser?.role,
      pathname: location.pathname 
    });
  }, [isAuthenticated, currentUser, location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <PublicHeader />
      <main className="flex-1 pt-16"> {/* Add padding to account for fixed header */}
        <Outlet />
      </main>
      <AIFloatingButton />
      <PublicFooter />
      <Toaster position="top-right" closeButton richColors />
    </div>
  );
};