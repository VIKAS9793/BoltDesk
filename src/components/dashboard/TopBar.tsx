import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { Button } from '../ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Bell, 
  Moon, 
  Sun, 
  ExternalLink,
  Search,
  Home,
  ArrowLeft,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const TopBar: React.FC = () => {
  const { 
    toggleSidebar,
    toggleDarkMode,
    isDarkMode,
    currentUser,
    notifications,
    removeNotification,
    setAuthenticated,
    setCurrentUser
  } = useAppStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { success } = useToast();

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthenticated(false);
    success('Successfully logged out');
    navigate('/');
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-between z-10 shadow-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden mr-2"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </Button>
        
        {/* Quick navigation to main site */}
        <Link to="/">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Home size={16} />}
            className="hidden md:flex text-gray-700 dark:text-gray-300 hover:text-primary"
          >
            Main Site
          </Button>
        </Link>
        
        <div className="relative flex items-center max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="h-9 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white px-3 py-1 pl-9 text-sm shadow-sm transition-colors focus-visible:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Visit public portal button */}
        <Link to="/" className="text-sm font-medium px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-300 hover:text-primary hover:border-primary/30 transition-colors flex items-center shadow-sm">
          <span className="hidden md:inline-block mr-1.5">View Portal</span>
          <ExternalLink size={16} />
        </Link>
        
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} className="text-blue-700" />}
        </Button>
        
        {/* Notifications dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 dark:text-gray-300 relative bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                {notifications.length > 9 ? '9+' : notifications.length}
              </span>
            )}
          </Button>
        </div>
        
        {/* User menu */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full overflow-hidden bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-200 dark:border-primary-700/50 text-primary flex items-center justify-center shadow-sm"
            aria-label="User menu"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs font-medium">
                {currentUser?.name.substring(0, 2).toUpperCase() || 'VI'}
              </span>
            )}
          </Button>
          
          {/* User dropdown menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 border border-gray-200 dark:border-gray-700">
              <div className="p-2">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{currentUser?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser?.email}</p>
                </div>
                <div className="py-1 mt-1">
                  <button className="text-left w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center">
                    <User className="mr-2 h-4 w-4 text-gray-500" />
                    Profile
                  </button>
                  <button className="text-left w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center">
                    <Settings className="mr-2 h-4 w-4 text-gray-500" />
                    Settings
                  </button>
                  <button 
                    className="text-left w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md flex items-center"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4 text-red-500" />
                    Log out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};