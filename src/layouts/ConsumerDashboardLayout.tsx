import React, { useEffect } from 'react';
import { useAppStore } from '../store';
import { Navigate, Outlet } from 'react-router-dom';
import { ConsumerSidebar } from '../components/consumer/ConsumerSidebar';
import { ConsumerTopBar } from '../components/consumer/ConsumerTopBar';
import { Toaster } from 'sonner';

export const ConsumerDashboardLayout: React.FC = () => {
  const { 
    isAuthenticated,
    currentUser,
    isSidebarOpen, 
    toggleSidebar, 
    isDarkMode 
  } = useAppStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  
  // Enhanced authentication check with proper role validation
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Ensure only audience users can access consumer dashboard
  if (currentUser.role !== 'audience') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen overflow-hidden">
        <ConsumerSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <ConsumerTopBar />
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <Toaster position="top-right" closeButton />
    </div>
  );
};

export { ConsumerDashboardLayout as default };