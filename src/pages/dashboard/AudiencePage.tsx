import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Users, 
  UserPlus, 
  Mail, 
  MessageSquare,
  Bell,
  Settings,
  Download,
  Filter
} from 'lucide-react';

export const AudiencePage: React.FC = () => {
  // Mock audience data
  const subscribers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'premium', joinDate: '2024-01-15', lastActive: '2024-03-20' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', plan: 'basic', joinDate: '2024-02-01', lastActive: '2024-03-19' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', plan: 'free', joinDate: '2024-02-15', lastActive: '2024-03-18' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Audience Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your subscribers and audience engagement
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            leftIcon={<Download size={16} />}
          >
            Export
          </Button>
          <Button
            variant="primary"
            leftIcon={<UserPlus size={16} />}
          >
            Add Subscriber
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Subscribers</p>
                <h4 className="text-2xl font-bold mt-1">2,543</h4>
              </div>
              <Users className="h-8 w-8 text-primary opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Members</p>
                <h4 className="text-2xl font-bold mt-1">1,876</h4>
              </div>
              <UserPlus className="h-8 w-8 text-green-500 opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Messages Sent</p>
                <h4 className="text-2xl font-bold mt-1">12,432</h4>
              </div>
              <Mail className="h-8 w-8 text-blue-500 opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Engagement Rate</p>
                <h4 className="text-2xl font-bold mt-1">68%</h4>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-500 opacity-75" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriber List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-500 mr-2" />
              Subscribers
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Filter size={14} />}
              >
                Filter
              </Button>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Settings size={14} />}
              >
                Columns
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {subscriber.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="ml-2 font-medium">{subscriber.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">{subscriber.email}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        subscriber.plan === 'premium' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                          : subscriber.plan === 'basic'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                      }`}>
                        {subscriber.plan}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{subscriber.joinDate}</td>
                    <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{subscriber.lastActive}</td>
                    <td className="py-4 px-4">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Mail size={14} />}
                        >
                          Message
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Settings size={14} />}
                        >
                          Manage
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

      {/* Communication Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 text-gray-500 mr-2" />
              Email Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" leftIcon={<Mail size={16} />}>
                Create New Campaign
              </Button>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Send targeted emails to your subscribers based on their engagement and preferences.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 text-gray-500 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" leftIcon={<Bell size={16} />}>
                Send Notification
              </Button>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Send push notifications to keep your audience updated about new content and events.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AudiencePage;