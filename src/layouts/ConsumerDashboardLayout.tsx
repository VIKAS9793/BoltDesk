import React, { useEffect } from 'react';
import { useAppStore } from '../store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    // Debug logging
    console.log('ConsumerDashboardLayout - Mounted', { 
      isAuthenticated, 
      userRole: currentUser?.role,
      pathname: location.pathname
    });
  }, [isDarkMode, isAuthenticated, currentUser, location.pathname]);
  
  // Enhanced authentication check with proper role validation
  if (!isAuthenticated || !currentUser) {
    console.log('ConsumerDashboardLayout - Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Ensure only audience users can access consumer dashboard
  if (currentUser.role !== 'audience') {
    console.log('ConsumerDashboardLayout - Not audience role, redirecting to creator dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="flex flex-1 h-[calc(100vh-0px)] overflow-hidden">
        <ConsumerSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <ConsumerTopBar />
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 pt-4 px-4 pb-6 md:p-6">
            <div className="container mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <Toaster position="top-right" closeButton richColors />
    </div>
  );
};

export { ConsumerDashboardLayout as default };