import React from 'react';
import { useAppStore } from '../../store';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  Bell, 
  Moon, 
  Sun, 
  Search,
  Home,
  ArrowLeft
} from 'lucide-react';

export const ConsumerTopBar: React.FC = () => {
  const { 
    toggleSidebar,
    toggleDarkMode,
    isDarkMode,
    currentUser,
    notifications
  } = useAppStore();

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-between z-10">
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
            className="hidden md:flex text-gray-600 dark:text-gray-400 hover:text-primary"
          >
            Main Site
          </Button>
        </Link>
        
        <div className="relative flex items-center max-w-md w-full">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <input
            type="search"
            placeholder="Search courses..."
            className="h-9 w-full rounded-md border border-input bg-white px-3 py-1 pl-9 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="text-gray-700 dark:text-gray-300"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
        
        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 dark:text-gray-300 relative"
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
            className="h-8 w-8 rounded-full overflow-hidden bg-primary-100 dark:bg-primary-900 text-primary"
            aria-label="User menu"
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs font-medium">
                {currentUser?.name.substring(0, 2).toUpperCase() || 'U'}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};