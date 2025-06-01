import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  DollarSign, 
  Gift, 
  Plus, 
  Edit,
  Trash,
  Lock,
  Coins,
  Tag,
  ShoppingBag,
  CreditCard as CardIcon,
  ExternalLink,
  Shield,
  RefreshCw
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export const MonetizationPanel: React.FC = () => {
  const [isSubscriptionsEnabled, setIsSubscriptionsEnabled] = useState(false);
  const [isDigitalProductsEnabled, setIsDigitalProductsEnabled] = useState(false);
  const [isDonationsEnabled, setIsDonationsEnabled] = useState(false);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Commission Earnings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your earnings and manage your commission-based revenue streams
        </p>
      </div>
      
      {/* Monetization Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Earnings</p>
                <p className="text-xl font-bold mt-1 text-gray-900 dark:text-white">$4,821.44</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-500">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
            <div className="text-xs text-green-600 dark:text-green-500 mt-2 flex items-center">
              <svg className="w-3 h-3 mr-1" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 6.5L5.5 3.5L9.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              +12.3% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Active Students</p>
                <p className="text-xl font-bold mt-1 text-gray-900 dark:text-white">253</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-500">
                <CreditCard className="h-6 w-6" />
              </div>
            </div>
            <div className="text-xs text-green-600 dark:text-green-500 mt-2 flex items-center">
              <svg className="w-3 h-3 mr-1" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 6.5L5.5 3.5L9.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              +7 new this week
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Sales</p>
                <p className="text-xl font-bold mt-1 text-gray-900 dark:text-white">124</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-500">
                <ShoppingBag className="h-6 w-6" />
              </div>
            </div>
            <div className="text-xs text-green-600 dark:text-green-500 mt-2 flex items-center">
              <svg className="w-3 h-3 mr-1" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 6.5L5.5 3.5L9.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              +18.7% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Avg. Commission</p>
                <p className="text-xl font-bold mt-1 text-gray-900 dark:text-white">25%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-500">
                <Coins className="h-6 w-6" />
              </div>
            </div>
            <div className="text-xs text-green-600 dark:text-green-500 mt-2 flex items-center">
              <svg className="w-3 h-3 mr-1" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 6.5L5.5 3.5L9.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              +$4.28 from last month
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Commission Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-gray-500" />
            Commission Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-2">Course Sales</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Commission on digital course sales</p>
                <div className="text-3xl font-bold text-primary">25%</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-2">Coaching Sessions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Commission on 1:1 sessions</p>
                <div className="text-3xl font-bold text-primary">30%</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-2">Digital Products</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Commission on downloadable content</p>
                <div className="text-3xl font-bold text-primary">20%</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Commissions are automatically calculated and paid out monthly. Higher commission rates are available for top-performing creators.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Revenue Streams */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subscriptions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Subscriptions
                </h3>
              </div>
              <div className="relative inline-flex">
                <input
                  type="checkbox"
                  className="sr-only"
                  id="toggle-subscriptions"
                  checked={isSubscriptionsEnabled}
                  onChange={() => setIsSubscriptionsEnabled(!isSubscriptionsEnabled)}
                />
                <label
                  htmlFor="toggle-subscriptions"
                  className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    isSubscriptionsEnabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 translate-x-0.5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                      isSubscriptionsEnabled ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                    style={{ marginTop: '0.125rem' }}
                  />
                </label>
              </div>
            </div>
            
            {isSubscriptionsEnabled ? (
              <>
                <div className="space-y-3 mb-4">
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                      <span className="font-medium text-gray-900 dark:text-white">Basic</span>
                    </div>
                    <span className="text-sm font-medium text-primary">$9.99/mo</span>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-purple-600 dark:text-purple-500" />
                      <span className="font-medium text-gray-900 dark:text-white">Pro</span>
                    </div>
                    <span className="text-sm font-medium text-primary">$29.99/mo</span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="w-full"
                  leftIcon={<Plus size={14} />}
                >
                  Add Plan
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 space-y-3 text-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-500">
                  <Lock className="h-6 w-6" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white">Enable Subscriptions</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                  Create tiered membership plans for exclusive content and services
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsSubscriptionsEnabled(true)}
                >
                  Enable
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Digital Products */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-6 w-6 text-purple-600 dark:text-purple-500" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Digital Products
                </h3>
              </div>
              <div className="relative inline-flex">
                <input
                  type="checkbox"
                  className="sr-only"
                  id="toggle-products"
                  checked={isDigitalProductsEnabled}
                  onChange={() => setIsDigitalProductsEnabled(!isDigitalProductsEnabled)}
                />
                <label
                  htmlFor="toggle-products"
                  className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    isDigitalProductsEnabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 translate-x-0.5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                      isDigitalProductsEnabled ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                    style={{ marginTop: '0.125rem' }}
                  />
                </label>
              </div>
            </div>
            
            {isDigitalProductsEnabled ? (
              <>
                <div className="space-y-3 mb-4">
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Complete Course Bundle</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">5 courses • 20+ hours</div>
                    </div>
                    <span className="text-sm font-medium text-primary">$149.99</span>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Premium Templates</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">10 templates • Lifetime access</div>
                    </div>
                    <span className="text-sm font-medium text-primary">$79.99</span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="w-full"
                  leftIcon={<Plus size={14} />}
                >
                  Add Product
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 space-y-3 text-center">
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-500">
                  <Lock className="h-6 w-6" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white">Enable Digital Products</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                  Sell courses, ebooks, templates, and other digital products
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsDigitalProductsEnabled(true)}
                >
                  Enable
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Tips & Donations */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Gift className="h-6 w-6 text-red-600 dark:text-red-500" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Tips & Donations
                </h3>
              </div>
              <div className="relative inline-flex">
                <input
                  type="checkbox"
                  className="sr-only"
                  id="toggle-donations"
                  checked={isDonationsEnabled}
                  onChange={() => setIsDonationsEnabled(!isDonationsEnabled)}
                />
                <label
                  htmlFor="toggle-donations"
                  className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    isDonationsEnabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 translate-x-0.5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                      isDonationsEnabled ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                    style={{ marginTop: '0.125rem' }}
                  />
                </label>
              </div>
            </div>
            
            {isDonationsEnabled ? (
              <>
                <div className="space-y-3 mb-4">
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                      <span className="font-medium text-gray-900 dark:text-white">One-time tip</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded">Active</span>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardIcon className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                      <span className="font-medium text-gray-900 dark:text-white">Monthly support</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded">Active</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Suggested Amounts
                    </h4>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Edit size={14} />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="px-2 py-1 rounded bg-white dark:bg-gray-800 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      $5
                    </div>
                    <div className="px-2 py-1 rounded bg-white dark:bg-gray-800 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      $10
                    </div>
                    <div className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                      $25
                    </div>
                    <div className="px-2 py-1 rounded bg-white dark:bg-gray-800 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      $50
                    </div>
                    <div className="px-2 py-1 rounded bg-white dark:bg-gray-800 text-xs font-medium border border-gray-200 dark:border-gray-600">
                      $100
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 space-y-3 text-center">
                <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-500">
                  <Lock className="h-6 w-6" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white">Enable Tips & Donations</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                  Allow your audience to support your work with tips and donations
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsDonationsEnabled(true)}
                >
                  Enable
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Security & Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-gray-500" />
            Security & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-500 flex-shrink-0 mt-1">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Payment Security
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Your payment processing is fully secured with industry-standard encryption and compliance measures. We handle all security requirements so you don't have to.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded text-xs text-center">
                    <div className="font-medium text-gray-900 dark:text-white mb-1">PCI DSS</div>
                    <div className="text-gray-500 dark:text-gray-400">Compliant</div>
                  </div>
                  <div className="p-2 bg-white dark:bg-gray-800 rounded text-xs text-center">
                    <div className="font-medium text-gray-900 dark:text-white mb-1">GDPR</div>
                    <div className="text-gray-500 dark:text-gray-400">Compliant</div>
                  </div>
                  <div className="p-2 bg-white dark:bg-gray-800 rounded text-xs text-center">
                    <div className="font-medium text-gray-900 dark:text-white mb-1">3D Secure</div>
                    <div className="text-gray-500 dark:text-gray-400">Enabled</div>
                  </div>
                  <div className="p-2 bg-white dark:bg-gray-800 rounded text-xs text-center">
                    <div className="font-medium text-gray-900 dark:text-white mb-1">Fraud Protection</div>
                    <div className="text-gray-500 dark:text-gray-400">Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonetizationPanel;