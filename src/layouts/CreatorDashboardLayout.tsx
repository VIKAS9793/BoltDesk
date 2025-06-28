import React, { useEffect } from 'react';
import { useAppStore } from '../store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/dashboard/Sidebar';
import { TopBar } from '../components/dashboard/TopBar';
import { Toaster } from 'sonner';

export const CreatorDashboardLayout: React.FC = () => {
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
    console.log('CreatorDashboardLayout - Mounted', { 
      isAuthenticated, 
      userRole: currentUser?.role,
      pathname: location.pathname
    });
  }, [isDarkMode, isAuthenticated, currentUser, location.pathname]);
  
  // Enhanced authentication check with proper role validation
  if (!isAuthenticated || !currentUser) {
    console.log('CreatorDashboardLayout - Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Ensure only creators can access creator dashboard
  if (currentUser.role !== 'creator') {
    console.log('CreatorDashboardLayout - Not creator role, redirecting to consumer dashboard');
    return <Navigate to="/consumer" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="flex flex-1 h-[calc(100vh-0px)] overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
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

export default CreatorDashboardLayout;