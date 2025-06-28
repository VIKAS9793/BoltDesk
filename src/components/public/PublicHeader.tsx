import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';
import { LogIn, Moon, Sun, LayoutDashboard, LogOut, User, Menu, ChevronDown } from 'lucide-react';

const PublicHeader = () => {
  const { isDarkMode, toggleDarkMode, isAuthenticated, currentUser, setCurrentUser, setAuthenticated } = useAppStore();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { success } = useToast();

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthenticated(false);
    success('You have been logged out');
    navigate('/');
    setShowUserMenu(false);
  };

  const handleDashboardClick = () => {
    if (currentUser?.role === 'creator') {
      navigate('/dashboard');
    } else if (currentUser?.role === 'audience') {
      navigate('/consumer');
    }
    setShowUserMenu(false);
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src="/black_circle_360x360.png" alt="Bolt Logo" className="h-12 w-12" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">BoltDesk</span>
            </Link>
            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 px-2 py-1 rounded-md"
            >
              Built with bolt.new
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2"
            >
              <Menu size={24} />
            </Button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center space-x-4 mr-4">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/content" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 px-3 py-2 text-sm font-medium">
                Content
              </Link>
              <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 px-3 py-2 text-sm font-medium">
                About
              </Link>
              <Link to="/support/faq" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 px-3 py-2 text-sm font-medium">
                FAQs
              </Link>
            </nav>
            
            {/* Theme toggle */}
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
                <Moon className="h-5 w-5 text-blue-700" />
              )}
            </motion.button>
            
            {/* User account / auth actions */}
            {isAuthenticated && currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary text-xs font-bold border-2 border-primary-200 dark:border-primary-700">
                    {currentUser.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{currentUser.name}</span>
                  <ChevronDown size={16} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {/* User dropdown menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                    <div className="py-1">
                      <button 
                        onClick={handleDashboardClick}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LayoutDashboard size={16} className="inline mr-2" />
                        Dashboard
                      </button>
                      <button 
                        onClick={() => {
                          navigate(`/${currentUser.role === 'creator' ? 'dashboard' : 'consumer'}/settings`);
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <User size={16} className="inline mr-2" />
                        Profile
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <LogOut size={16} className="inline mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button 
                  variant="primary" 
                  elevation={3}
                  className="shadow-lg hover:shadow-xl py-2 px-4"
                  leftIcon={<LogIn className="h-5 w-5 mr-1.5" />}
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-3">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md"
                onClick={() => setShowMobileMenu(false)}
              >
                Home
              </Link>
              <Link 
                to="/content" 
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md"
                onClick={() => setShowMobileMenu(false)}
              >
                Content
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md"
                onClick={() => setShowMobileMenu(false)}
              >
                About
              </Link>
              <Link 
                to="/support/faq" 
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md"
                onClick={() => setShowMobileMenu(false)}
              >
                FAQs
              </Link>
              
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                {isAuthenticated && currentUser ? (
                  <>
                    <div className="flex items-center px-3 py-2">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary text-xs font-bold">
                        {currentUser.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="ml-3 font-medium">{currentUser.name}</span>
                    </div>
                    <button 
                      onClick={handleDashboardClick}
                      className="w-full text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md"
                    >
                      <LayoutDashboard size={16} className="inline mr-2" />
                      Dashboard
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-md"
                    >
                      <LogOut size={16} className="inline mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login"
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md"
                  >
                    <LogIn size={16} className="mr-2" />
                    Sign In
                  </Link>
                )}
              </div>
              
              <div className="px-3 py-2 flex justify-between items-center">
                <a
                  href="https://bolt.new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Built with bolt.new
                </a>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {isDarkMode ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} className="text-blue-700" />}
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;

export { PublicHeader };