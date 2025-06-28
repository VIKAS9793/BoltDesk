import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store';
import { Button } from '../ui/Button';
import { LogIn, Moon, Sun, LayoutDashboard, LogOut } from 'lucide-react';

const PublicHeader = () => {
  const { isDarkMode, toggleDarkMode, isAuthenticated, currentUser, setCurrentUser, setAuthenticated } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthenticated(false);
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
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white">
              <img src="/black_circle_360x360.png" alt="Bolt Logo" className="h-16 w-16" />
              <span>BoltDesk</span>
            </Link>
            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400"
            >
              Built with bolt.new
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-sm"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </motion.button>
            
            {isAuthenticated && currentUser ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    {currentUser.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                    {currentUser.name}
                  </span>
                </div>
                
                <Button variant="outline" size="sm" onClick={handleDashboardClick} elevation={3}>
                  <LayoutDashboard className="h-4 w-4 mr-1" />
                  Dashboard
                </Button>
                
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button 
                  variant="primary" 
                  className="flex items-center space-x-2 shadow-lg hover:shadow-xl"
                  elevation={3}
                >
                  <LogIn className="h-5 w-5" />
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