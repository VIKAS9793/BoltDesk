import React, { useEffect } from 'react';
import { useAppStore } from '../store';
import { Navigate, Outlet } from 'react-router-dom';
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

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  
  if (!isAuthenticated || currentUser?.role !== 'creator') {
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
      <Toaster position="top-right" closeButton />
    </div>
  );
};

export default CreatorDashboardLayout;