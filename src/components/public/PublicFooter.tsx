import React from 'react';
import { Bot, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* BoltDesk Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Bot className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">BoltDesk</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              AI-powered creator micro-portal for centralized audience engagement and content monetization.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Contact</h4>
              <div className="space-y-2">
                <a 
                  href="mailto:vikassahani17@gmail.com"
                  className="flex items-center text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 text-sm transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  vikassahani17@gmail.com
                </a>
                <a 
                  href="https://github.com/VIKAS9793"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 text-sm transition-colors"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/vikas-sahani-727420358"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 text-sm transition-colors"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Content</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors"
                >
                  All Content
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors"
                >
                  Free Content
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors"
                >
                  Premium Content
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors"
                >
                  Creator Portal
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support Section */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    // Scroll to AI chat button or open AI chat
                    const aiButton = document.querySelector('[aria-label="Open chat"]');
                    if (aiButton) {
                      (aiButton as HTMLElement).click();
                    }
                  }}
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors text-left"
                >
                  AI Assistant
                </button>
              </li>
              <li>
                <Link 
                  to="/support/faq" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:vikassahani17@gmail.com?subject=BoltDesk Support Request"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Section */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/legal/terms" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/legal/privacy" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/license" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors"
                >
                  License
                </Link>
              </li>
              <li>
                <a 
                  href="https://bolt.new" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors flex items-center"
                >
                  Built with bolt.new
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} BoltDesk™ by <span className="font-medium">VIKAS SAHANI</span>. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0 text-sm text-gray-600 dark:text-gray-400">
            <span>Powered by</span>
            <a 
              href="https://bolt.new" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:text-primary-600 ml-1 flex items-center"
            >
              bolt.new
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;