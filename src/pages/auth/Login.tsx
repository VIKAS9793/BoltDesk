import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Creator, Audience } from '../../types';
import { Bot, Crown, Users, ArrowLeft } from 'lucide-react';

type UserRole = 'creator' | 'consumer' | null;

export const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { setCurrentUser, setAuthenticated, addNotification } = useAppStore();
  
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setError('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (selectedRole === 'creator' && email === 'creator@example.com' && password === 'password') {
        const mockUser: Creator = {
          id: '1',
          name: 'Vikas Creator',
          email: 'creator@example.com',
          role: 'creator',
          createdAt: new Date(),
          portalName: 'Vikas Creates',
          portalDescription: 'Your hub for creative content and community',
          customizations: {
            primaryColor: '#3B82F6',
            secondaryColor: '#9333EA',
            accentColor: '#14B8A6',
            aiAgentName: 'Vikas Assistant',
            darkMode: false
          },
          socialLinks: {
            twitter: 'https://twitter.com/vikascreator',
            instagram: 'https://instagram.com/vikascreator'
          },
          analyticsData: {
            totalVisitors: 1243,
            totalSubscribers: 87,
            revenueGenerated: 1452.25,
            averageDailyVisitors: 45,
            popularContent: [
              { contentId: 'c1', views: 324 },
              { contentId: 'c2', views: 256 },
            ],
            visitorsByCountry: [
              { country: 'United States', count: 543 },
              { country: 'United Kingdom', count: 231 },
              { country: 'Canada', count: 124 },
            ]
          }
        };
        
        setCurrentUser(mockUser);
        setAuthenticated(true);
        addNotification({ 
          message: 'Successfully logged in!', 
          type: 'success' 
        });
        
        navigate('/dashboard');
      } else if (selectedRole === 'consumer' && email === 'consumer@example.com' && password === 'password') {
        const mockUser: Audience = {
          id: '2',
          name: 'Vikas Consumer',
          email: 'consumer@example.com',
          role: 'audience',
          createdAt: new Date(),
          lastActive: new Date(),
          subscriptionTier: 'free'
        };
        
        setCurrentUser(mockUser);
        setAuthenticated(true);
        addNotification({ 
          message: 'Successfully logged in as consumer!', 
          type: 'success' 
        });
        
        navigate('/consumer');
      } else {
        setError(`Invalid credentials. Try ${selectedRole === 'creator' ? 'creator' : 'consumer'}@example.com / password`);
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!selectedRole) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to BoltDesk
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Choose how you want to sign in
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
          <button
            onClick={() => handleRoleSelect('creator')}
            className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:bg-primary/5 transition-all text-left"
          >
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Crown className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-2">
              Sign in as Creator
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create and monetize content, manage your portal, and engage with your audience
            </p>
          </button>
          
          <button
            onClick={() => handleRoleSelect('consumer')}
            className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-secondary dark:hover:border-secondary hover:bg-secondary/5 transition-all text-left"
          >
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-2">
              Sign in as Consumer
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Access premium content, interact with creators, and join communities
            </p>
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 dark:text-gray-400"
          onClick={() => setSelectedRole(null)}
          leftIcon={<ArrowLeft size={16} />}
        >
          Back
        </Button>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          {selectedRole === 'creator' ? (
            <>
              <Crown size={16} className="text-primary" />
              Creator Login
            </>
          ) : (
            <>
              <Users size={16} className="text-secondary" />
              Consumer Login
            </>
          )}
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        {selectedRole === 'creator' 
          ? 'Log in to your Creator Portal' 
          : 'Log in to access content'
        }
      </h2>
      
      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            placeholder="your@email.com"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <a href="#" className="text-sm text-primary hover:text-primary-600">
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            placeholder="••••••••"
          />
        </div>
        
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Remember me
          </label>
        </div>
        
        <div>
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
          >
            Sign in
          </Button>
        </div>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => console.log('Google login')}
          >
            <span className="sr-only">Sign in with Google</span>
            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
              <path
                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                fill="#EA4335"
              />
              <path
                d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                fill="#4285F4"
              />
              <path
                d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                fill="#FBBC05"
              />
              <path
                d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                fill="#34A853"
              />
            </svg>
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => console.log('Twitter login')}
          >
            <span className="sr-only">Sign in with Twitter</span>
            <svg className="h-5 w-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => console.log('GitHub login')}
          >
            <span className="sr-only">Sign in with GitHub</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <a href="#" className="text-primary hover:text-primary-600 font-medium">
            Sign up
          </a>
        </p>
      </div>
      
      {/* Demo account info */}
      <div className="mt-6 text-center bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium">Demo credentials:</span>{' '}
          {selectedRole === 'creator' ? 'creator@example.com' : 'consumer@example.com'} / password
        </p>
      </div>
      
      {/* bolt.new reference */}
      <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        Built with <a href="https://bolt.new" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-600">bolt.new</a>
      </div>
    </div>
  );
};