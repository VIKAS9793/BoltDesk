import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '../../store';
import { 
  Home,
  Library,
  LayoutDashboard,
  Heart,
  Settings,
  LogOut,
  ChevronLeft,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/consumer' },
  { icon: <Library size={20} />, label: 'Content Library', path: '/consumer/library' },
  { icon: <Heart size={20} />, label: 'Favorites', path: '/consumer/favorites' },
  { icon: <Settings size={20} />, label: 'Settings', path: '/consumer/settings' },
];

export const ConsumerSidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { currentUser, setCurrentUser, setAuthenticated } = useAppStore();
  const navigate = useNavigate();
  const { success } = useToast();

  const handleLogout = () => {
    // Log the action
    console.log('🔄 Consumer logout triggered from sidebar');
    
    // Clear authentication state
    setCurrentUser(null);
    setAuthenticated(false);
    
    // Show success message
    success('Successfully logged out');
    
    // Navigate to main landing page
    navigate('/');
  };
  
  const handleLinkClick = (path: string) => {
    // For mobile views, close the sidebar when a link is clicked
    if (window.innerWidth < 768) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 z-20 bg-black/50 backdrop-blur-sm transition-opacity" 
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-30 h-full bg-white dark:bg-gray-800 shadow-lg md:shadow-none transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-0 md:w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <img src="/black_circle_360x360.png" alt="Bolt Logo" className="h-10 w-10 mr-2" />
              <span className="font-bold text-lg text-gray-900 dark:text-white">Consumer Portal</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onToggle}
              className="md:hidden"
              aria-label="Close sidebar"
            >
              <ChevronLeft size={20} />
            </Button>
          </div>
          
          {/* Return to Main Site */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <Link to="/">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-primary"
                leftIcon={<ArrowLeft size={16} />}
              >
                Back to Main Site
              </Button>
            </Link>
          </div>
          
          {/* User profile */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center text-secondary border border-secondary-200 dark:border-secondary-800">
                {currentUser?.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-full h-full rounded-full object-cover" 
                  />
                ) : (
                  <span className="text-xs font-medium">
                    {currentUser?.name?.substring(0, 2).toUpperCase() || 'VI'}
                  </span>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{currentUser?.name || 'User Name'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Consumer</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center px-3 py-2 text-sm rounded-md transition-colors
                      ${isActive 
                        ? 'bg-secondary/10 text-secondary font-medium' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                    `}
                    end={item.path === '/consumer'}
                    onClick={() => handleLinkClick(item.path)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-red-600"
              leftIcon={<LogOut size={16} />}
              onClick={handleLogout}
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};