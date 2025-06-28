import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';
import { LogIn, Moon, Sun, LayoutDashboard, LogOut, User, Menu, ChevronDown, X } from 'lucide-react';

const PublicHeader: React.FC = () => {
  const { isDarkMode, toggleDarkMode, isAuthenticated, currentUser, setCurrentUser, setAuthenticated } = useAppStore();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { success } = useToast();

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && buttonRef.current && 
          !userMenuRef.current.contains(event.target as Node) && 
          !buttonRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  // Log state for debugging
  useEffect(() => {
    console.log('PublicHeader - Auth state:', { isAuthenticated, currentUser });
  }, [isAuthenticated, currentUser]);

  const handleLogout = () => {
    console.log('Logging out user');
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
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src="/black_circle_360x360.png" alt="Bolt Logo" className="h-10 w-10" />
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
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center space-x-1 mr-2">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 text-sm font-medium rounded-md transition-colors">
                Home
              </Link>
              <Link to="/content/c1" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 text-sm font-medium rounded-md transition-colors">
                Content
              </Link>
              <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 text-sm font-medium rounded-md transition-colors">
                About
              </Link>
              <Link to="/support/faq" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 text-sm font-medium rounded-md transition-colors">
                FAQs
              </Link>
            </nav>
            
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
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
                  ref={buttonRef}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary text-xs font-bold border-2 border-primary-200 dark:border-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                    {currentUser.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{currentUser.name}</span>
                  <ChevronDown size={16} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {/* User dropdown menu */}
                {showUserMenu && (
                  <div 
                    ref={userMenuRef}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{currentUser.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{currentUser.email}</p>
                    </div>
                    <div className="py-1">
                      <button 
                        onClick={handleDashboardClick}
                        className="flex w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LayoutDashboard size={16} className="inline mr-2 text-gray-500 dark:text-gray-400" />
                        Dashboard
                      </button>
                      <button 
                        onClick={() => {
                          navigate(`/${currentUser.role === 'creator' ? 'dashboard' : 'consumer'}/settings`);
                          setShowUserMenu(false);
                        }}
                        className="flex w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <User size={16} className="inline mr-2 text-gray-500 dark:text-gray-400" />
                        Profile
                      </button>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <button 
                        onClick={handleLogout}
                        className="flex w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <LogOut size={16} className="inline mr-2 text-red-500" />
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
                  className="shadow-md hover:shadow-lg font-medium"
                  leftIcon={<LogIn className="h-5 w-5" />}
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Theme toggle for mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} className="text-blue-700" />}
            </button>
            
            {/* Sign in button for mobile */}
            {!isAuthenticated && (
              <Link to="/login">
                <Button 
                  variant="primary" 
                  size="sm"
                  leftIcon={<LogIn className="h-4 w-4" />}
                >
                  Sign In
                </Button>
              </Link>
            )}
            
            {/* User button for mobile */}
            {isAuthenticated && currentUser && (
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary dark:text-primary-400 border-2 border-primary-200 dark:border-primary-700/50"
              >
                {currentUser.name.substring(0, 2).toUpperCase()}
              </button>
            )}
            
            {/* Menu toggle button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              aria-label={showMobileMenu ? "Close menu" : "Open menu"}
            >
              {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-3 pb-4 space-y-1">
            <Link 
              to="/" 
              className="block text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md font-medium"
            >
              Home
            </Link>
            <Link 
              to="/content/c1" 
              className="block text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md font-medium"
            >
              Content
            </Link>
            <Link 
              to="/about" 
              className="block text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md font-medium"
            >
              About
            </Link>
            <Link 
              to="/support/faq" 
              className="block text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md font-medium"
            >
              FAQs
            </Link>
            
            {/* User actions on mobile */}
            {isAuthenticated && currentUser && (
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                <div className="flex items-center px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary dark:text-primary-400 text-xs font-bold border-2 border-primary-200 dark:border-primary-700/50">
                    {currentUser.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="ml-3 font-medium text-gray-800 dark:text-white">{currentUser.name}</span>
                </div>
                <button 
                  onClick={handleDashboardClick}
                  className="w-full text-left flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md"
                >
                  <LayoutDashboard size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                  Dashboard
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left flex items-center text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-md"
                >
                  <LogOut size={16} className="mr-2 text-red-500" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;

export { PublicHeader };