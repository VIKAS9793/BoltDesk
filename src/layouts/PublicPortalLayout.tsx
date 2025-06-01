import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppStore } from '../store';
import { PublicHeader } from '../components/public/PublicHeader';
import { PublicFooter } from '../components/public/PublicFooter';
import { AIFloatingButton } from '../components/public/AIFloatingButton';

export const PublicPortalLayout: React.FC = () => {
  const { isDarkMode } = useAppStore();
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <AIFloatingButton />
      <PublicFooter />
    </div>
  );
};