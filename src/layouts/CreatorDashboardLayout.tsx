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
  }, [isDarkMode]);
  
  // Comprehensive debug logging
  useEffect(() => {
    console.log('=== CreatorDashboardLayout Debug ===');
    console.log('Location:', location.pathname);
    console.log('isAuthenticated:', isAuthenticated);
    console.log('currentUser:', currentUser);
    console.log('currentUser?.role:', currentUser?.role);
    console.log('===================================');
  }, [location.pathname, isAuthenticated, currentUser]);
  
  // Check authentication first
  if (!isAuthenticated) {
    console.log('❌ Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Check if user exists
  if (!currentUser) {
    console.log('❌ No current user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Check user role
  if (currentUser.role !== 'creator') {
    console.log('❌ User role is not creator, role:', currentUser.role);
    if (currentUser.role === 'audience') {
      return <Navigate to="/consumer" replace />;
    }
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
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