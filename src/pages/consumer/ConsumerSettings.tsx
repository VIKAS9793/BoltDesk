import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  User,
  Bell,
  Lock,
  Globe,
  Moon,
  CreditCard,
  Trash,
  Shield
} from 'lucide-react';

export const ConsumerSettings: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your account preferences and settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Profile Settings
                </h3>
                <p className="text-sm text-gray-500">
                  Update your personal information
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  defaultValue="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  defaultValue="john@example.com"
                />
              </div>
              <Button className="w-full">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Bell size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Notification Settings
                </h3>
                <p className="text-sm text-gray-500">
                  Manage your notification preferences
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-500">
                    Receive updates via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 dark:peer-focus:ring-primary/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Push Notifications
                  </p>
                  <p className="text-sm text-gray-500">
                    Get instant updates
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 dark:peer-focus:ring-primary/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              <Button variant="outline" className="w-full">
                Update Preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Security
                </h3>
                <p className="text-sm text-gray-500">
                  Manage your security settings
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Enable Two-Factor Auth
              </Button>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Your account is secure
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CreditCard size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Payment Methods
                </h3>
                <p className="text-sm text-gray-500">
                  Manage your payment information
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-blue-500 rounded flex items-center justify-center text-white">
                    <span className="text-sm">V</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      •••• 4242
                    </p>
                    <p className="text-xs text-gray-500">
                      Expires 12/24
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
              <Button variant="outline" className="w-full">
                Add Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
              <Trash size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Danger Zone
              </h3>
              <p className="text-sm text-gray-500">
                Irreversible account actions
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full text-red-600 hover:bg-red-50">
              Delete Account
            </Button>
            <p className="text-xs text-gray-500 text-center">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsumerSettings