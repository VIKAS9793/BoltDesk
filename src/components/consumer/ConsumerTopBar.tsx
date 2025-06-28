import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { Button } from '../ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Bell, 
  Moon, 
  Sun, 
  Search,
  Home,
  User,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const ConsumerTopBar: React.FC = () => {
  const { 
    toggleSidebar,
    toggleDarkMode,
    isDarkMode,
    currentUser,
    notifications,
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
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-between z-10 shadow-md">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </Button>
        
        {/* Quick navigation to main site */}
        <Link to="/" className="hidden md:flex">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Home size={16} />}
            className="text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          >
            Main Site
          </Button>
        </Link>
        
        <div className="relative flex items-center max-w-md w-full ml-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <input
            type="search"
            placeholder="Search courses..."
            className="h-9 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white px-3 py-1 pl-9 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
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
        
        {/* Notifications */}
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
            className="flex items-center gap-2 h-9 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 shadow-sm"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="h-7 w-7 rounded-full overflow-hidden bg-secondary-100 dark:bg-secondary-900/30 border border-secondary-200 dark:border-secondary-700/50 text-secondary flex items-center justify-center">
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
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">{currentUser?.name?.split(' ')[0] || 'User'}</span>
            <ChevronDown size={16} className={`text-gray-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
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
                  <Link to="/consumer/settings" className="text-left w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center">
                    <User className="mr-2 h-4 w-4 text-gray-500" />
                    Profile
                  </Link>
                  <Link to="/consumer/settings" className="text-left w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center">
                    <Settings className="mr-2 h-4 w-4 text-gray-500" />
                    Settings
                  </Link>
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