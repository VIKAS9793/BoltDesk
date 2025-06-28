import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppStore } from '../store';
import { PublicHeader } from '../components/public/PublicHeader';
import { PublicFooter } from '../components/public/PublicFooter';
import { AIFloatingButton } from '../components/public/AIFloatingButton';
import { Toaster } from 'sonner';

export const PublicPortalLayout: React.FC = () => {
  const { isDarkMode, isAuthenticated, currentUser } = useAppStore();
  
  // Set dark mode class on document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Debug logging
  useEffect(() => {
    console.log('PublicPortalLayout - Auth State:', { 
      isAuthenticated, 
      currentUserRole: currentUser?.role
    });
  }, [isAuthenticated, currentUser]);

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