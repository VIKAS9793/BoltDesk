import React, { useEffect } from 'react';
import { Bot } from 'lucide-react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppStore } from '../store';

export const AuthLayout: React.FC = () => {
  const { isAuthenticated, currentUser } = useAppStore();
  const location = useLocation();

  // Debug logging
  useEffect(() => {
    console.log('AuthLayout - Mounted', { isAuthenticated, userRole: currentUser?.role });
  }, [isAuthenticated, currentUser]);

  // Redirect to appropriate dashboard if already authenticated
  if (isAuthenticated && currentUser) {
    const redirectPath = currentUser.role === 'creator' ? '/dashboard' : '/consumer';
    console.log(`AuthLayout - Already authenticated as ${currentUser.role}, redirecting to ${redirectPath}`);
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <Bot className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">BoltDesk</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            AI-powered Creator Micro-Portal
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 border border-gray-200 dark:border-gray-700">
          <Outlet />
        </div>
        
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Powered by Bolt © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};