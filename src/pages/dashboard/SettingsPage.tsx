import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Settings,
  User,
  Palette,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Mail,
  Bot,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SettingsPage: React.FC = () => {
  const settingsCategories = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: User,
      description: 'Manage your personal information and preferences',
      link: '/dashboard/settings/profile'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      description: 'Customize the look and feel of your portal',
      link: '/dashboard/settings/appearance'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Configure your notification preferences',
      link: '/dashboard/settings/notifications'
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      description: 'Manage your account security and privacy settings',
      link: '/dashboard/settings/security'
    },
    {
      id: 'billing',
      title: 'Billing & Subscriptions',
      icon: CreditCard,
      description: 'Manage your billing information and subscriptions',
      link: '/dashboard/settings/billing'
    },
    {
      id: 'domain',
      title: 'Domain Settings',
      icon: Globe,
      description: 'Configure your custom domain settings',
      link: '/dashboard/settings/domain'
    },
    {
      id: 'email',
      title: 'Email Settings',
      icon: Mail,
      description: 'Configure your email preferences and templates',
      link: '/dashboard/settings/email'
    },
    {
      id: 'ai',
      title: 'AI Assistant Settings',
      icon: Bot,
      description: 'Configure your AI assistant settings',
      link: '/dashboard/ai'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsCategories.map((category) => (
          <Link key={category.id} to={category.link}>
            <Card className="hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <category.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {category.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 text-gray-500 mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="w-full">
              Export Data
            </Button>
            <Button variant="outline" className="w-full">
              Reset Preferences
            </Button>
            <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;