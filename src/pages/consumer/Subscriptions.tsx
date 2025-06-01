import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Crown, Check, Star, Clock, Users } from 'lucide-react';

export const Subscriptions: React.FC = () => {
  const subscriptionPlans = [
    {
      name: 'Free',
      price: 0,
      features: [
        'Access to free content',
        'Basic community features',
        'Limited AI assistance',
        'Standard support'
      ]
    },
    {
      name: 'Basic',
      price: 9.99,
      features: [
        'Everything in Free, plus:',
        'Access to premium content',
        'Advanced AI features',
        'Priority support',
        'Download resources'
      ]
    },
    {
      name: 'Premium',
      price: 29.99,
      features: [
        'Everything in Basic, plus:',
        'Exclusive content access',
        '1-on-1 creator sessions',
        'Early access to new content',
        'Custom AI training'
      ],
      popular: true
    }
  ];

  // Mock active subscriptions
  const activeSubscriptions = [
    {
      creatorName: 'Tech Master',
      plan: 'Premium',
      startDate: '2024-01-15',
      nextBilling: '2024-02-15',
      amount: 29.99
    },
    {
      creatorName: 'Design Pro',
      plan: 'Basic',
      startDate: '2024-02-01',
      nextBilling: '2024-03-01',
      amount: 9.99
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Subscriptions
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your subscriptions and access premium content
        </p>
      </div>

      {/* Active Subscriptions */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Active Subscriptions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeSubscriptions.map((sub, idx) => (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {sub.creatorName}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {sub.plan} Plan
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ${sub.amount}/mo
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Next billing: {sub.nextBilling}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Manage
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-red-600">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Available Plans */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Available Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subscriptionPlans.map((plan, idx) => (
            <Card 
              key={idx}
              className={`relative ${plan.popular ? 'border-2 border-primary' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                  Popular
                </div>
              )}
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-16">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Why Subscribe?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Crown className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Premium Content
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Access exclusive tutorials and courses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Priority Support
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get help when you need it most
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Early Access
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Be first to see new content
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-500 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Community Access
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connect with other learners
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;