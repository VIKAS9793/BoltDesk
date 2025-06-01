import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  DollarSign, 
  CreditCard, 
  Users, 
  TrendingUp, 
  Edit, 
  Plus, 
  Trash,
  Wallet,
  Tag,
  Copy,
  ExternalLink,
  Settings,
  MessageSquare,
  Star,
  Clock,
  LineChart
} from 'lucide-react';

export const MonetizationPage: React.FC = () => {
  const [subscriptionPlans, setSubscriptionPlans] = useState([
    { id: '1', name: 'Basic', price: 9.99, description: 'Access to basic content and features', subscribers: 45 },
    { id: '2', name: 'Premium', price: 29.99, description: 'Full access to all content and features', subscribers: 12 },
  ]);
  
  // Revenue stats
  const revenueStats = {
    totalRevenue: 4250.75,
    monthlyRevenue: 1452.25,
    averageRevenue: 25.80,
    conversionRate: 5.2,
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Monetization</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your subscription plans and revenue
          </p>
        </div>
      </div>
      
      {/* Revenue stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <RevenueCard
          title="Total Revenue"
          value={`$${revenueStats.totalRevenue.toFixed(2)}`}
          icon={<DollarSign className="h-5 w-5 text-green-600" />}
        />
        <RevenueCard
          title="Monthly Revenue"
          value={`$${revenueStats.monthlyRevenue.toFixed(2)}`}
          icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
        />
        <RevenueCard
          title="Avg. Revenue / User"
          value={`$${revenueStats.averageRevenue.toFixed(2)}`}
          icon={<Users className="h-5 w-5 text-purple-600" />}
        />
        <RevenueCard
          title="Conversion Rate"
          value={`${revenueStats.conversionRate}%`}
          icon={<CreditCard className="h-5 w-5 text-orange-600" />}
        />
      </div>
      
      {/* Subscription plans */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-gray-500" />
            Subscription Plans
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Plus size={14} />}
            onClick={() => console.log('Add new plan')}
          >
            Add Plan
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subscribers</th>
                  <th className="py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {subscriptionPlans.map((plan) => (
                  <tr key={plan.id}>
                    <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">{plan.name}</td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">${plan.price.toFixed(2)}/month</td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">{plan.description}</td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">{plan.subscribers}</td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          aria-label="Edit"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          aria-label="Delete"
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wallet className="mr-2 h-5 w-5 text-gray-500" />
            Payment Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Connect your payment processor to start accepting payments for your subscriptions.
                  We support Stripe for secure payment processing and subscription management.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow space-y-4">
              <div>
                <label htmlFor="stripe-key" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Stripe API Key
                </label>
                <input
                  id="stripe-key"
                  type="password"
                  placeholder="••••••••••••••••••••••"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                />
              </div>
              
              <div>
                <label htmlFor="webhook-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Webhook URL
                </label>
                <div className="flex">
                  <input
                    id="webhook-url"
                    type="text"
                    value="https://your-domain.com/.netlify/functions/stripe-webhook"
                    readOnly
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-xl text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                  />
                  <Button 
                    variant="outline"
                    className="rounded-l-none border-l-0"
                    aria-label="Copy webhook URL"
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/3">
              <Button 
                variant="primary" 
                className="w-full mb-3"
                leftIcon={<Plus size={16} />}
              >
                Connect Stripe
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                leftIcon={<ExternalLink size={16} />}
              >
                Stripe Dashboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <LineChart className="mr-2 h-5 w-5 text-gray-500" />
            Subscription Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">Active Subscribers</div>
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">57</div>
              <div className="text-sm text-green-600 dark:text-green-400 mt-1">+12% this month</div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">Avg. Subscription Length</div>
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">4.2 months</div>
              <div className="text-sm text-green-600 dark:text-green-400 mt-1">+0.5 from last month</div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">Customer Satisfaction</div>
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">4.8/5.0</div>
              <div className="text-sm text-green-600 dark:text-green-400 mt-1">Based on 124 reviews</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface RevenueCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const RevenueCard: React.FC<RevenueCardProps> = ({ title, value, icon }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <h4 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{value}</h4>
      </CardContent>
    </Card>
  );
};

export default MonetizationPage;