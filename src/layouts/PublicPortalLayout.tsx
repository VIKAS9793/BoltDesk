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
      
      {/* Bolt.new Badge */}
      <style>
        {`
          .bolt-badge {
            transition: all 0.3s ease;
          }
          @keyframes badgeIntro {
            0% { transform: rotateY(-90deg); opacity: 0; }
            100% { transform: rotateY(0deg); opacity: 1; }
          }
          .bolt-badge-intro {
            animation: badgeIntro 0.8s ease-out 1s both;
          }
          .bolt-badge-intro.animated {
            animation: none;
          }
          @keyframes badgeHover {
            0% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.1) rotate(22deg); }
            100% { transform: scale(1) rotate(0deg); }
          }
          .bolt-badge:hover {
            animation: badgeHover 0.6s ease-in-out;
          }
        `}
      </style>
      <div className="fixed top-4 right-4 z-50">
        <a href="https://bolt.new/?rid=os72mi" target="_blank" rel="noopener noreferrer" 
           className="block transition-all duration-300 hover:shadow-2xl">
          <img src="https://storage.bolt.army/white_circle_360x360.png" 
               alt="Built with Bolt.new badge" 
               className="w-20 h-20 md:w-28 md:h-28 rounded-full shadow-lg bolt-badge bolt-badge-intro"
               onAnimationEnd={(e) => e.currentTarget.classList.add('animated')} />
        </a>
      </div>
    </div>
  );
};