import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store';
import { Button } from '../ui/Button';
import { LogIn, Moon, Sun } from 'lucide-react';

const PublicHeader = () => {
  const { isDarkMode, toggleDarkMode } = useAppStore();

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white" onClick={() => window.location.href = '/'}>
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
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </motion.button>
            
            <Link to="/login">
              <Button variant="primary" className="flex items-center space-x-2">
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;

export { PublicHeader }