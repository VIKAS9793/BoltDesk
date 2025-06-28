import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';
import { LogIn, Moon, Sun, LayoutDashboard, LogOut, User } from 'lucide-react';

const PublicHeader = () => {
  const { isDarkMode, toggleDarkMode, isAuthenticated, currentUser, setCurrentUser, setAuthenticated } = useAppStore();
  const navigate = useNavigate();
  const { success } = useToast();

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthenticated(false);
    success('You have been logged out');
    navigate('/');
  };

  const handleDashboardClick = () => {
    if (currentUser?.role === 'creator') {
      navigate('/dashboard');
    } else if (currentUser?.role === 'audience') {
      navigate('/consumer');
    }
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
              <img src="/black_circle_360x360.png" alt="Bolt Logo" className="h-12 w-12" />
              <span>BoltDesk</span>
            </Link>
            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400"
            >
              Built with bolt.new
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-blue-800" />
              )}
            </motion.button>
            
            {isAuthenticated && currentUser ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary text-xs font-bold border-2 border-primary-200">
                    {currentUser.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                    {currentUser.name}
                  </span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDashboardClick} 
                  elevation={2}
                  className="border-gray-300 bg-white text-gray-800 py-1.5 px-3"
                  leftIcon={<LayoutDashboard className="h-4 w-4 mr-1.5 text-primary-600" />}
                >
                  Dashboard
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout} 
                  elevation={1}
                  className="border-gray-300 bg-white text-gray-800 py-1.5 px-3"
                  leftIcon={<LogOut className="h-4 w-4 mr-1.5 text-gray-700" />}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button 
                  variant="primary" 
                  elevation={3}
                  className="flex items-center shadow-lg hover:shadow-xl py-2 px-4"
                  leftIcon={<LogIn className="h-5 w-5 mr-2" />}
                >
                  <span>Sign In</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;

export { PublicHeader }