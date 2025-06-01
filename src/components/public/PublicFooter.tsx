import React from 'react';
import { Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Bot className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">BoltDesk</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              AI-powered creator micro-portal for centralized audience engagement and content monetization.
            </p>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Content</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/portal/content" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300">
                    All Content
                  </Link>
                </li>
                <li>
                  <Link to="/portal/content/free" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300">
                    Free Content
                  </Link>
                </li>
                <li>
                  <Link to="/portal/content/premium" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300">
                    Premium Content
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/portal/support" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300">
                    AI Assistant
                  </Link>
                </li>
                <li>
                  <Link to="/portal/faq" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/portal/contact" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/portal/terms" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/portal/privacy" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/portal/license" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300">
                    License
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} BoltDesk™ by Vikas Sahani. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0 text-sm text-gray-600 dark:text-gray-400">
            <span>Built with</span>
            <a 
              href="https://bolt.new" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:text-primary-600 ml-1"
            >
              bolt.new
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;