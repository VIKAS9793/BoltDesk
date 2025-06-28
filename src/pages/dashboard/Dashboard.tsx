import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Eye,
  Calendar,
  BarChart3,
  Globe,
  ArrowRight,
  Bell,
  Clock,
  CheckCircle2,
  Bot,
  Brain,
  Zap,
  LineChart,
  Sparkles,
  Plus,
  Settings
} from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import DashboardAnalytics from '../../components/analytics/DashboardAnalytics';
import MonetizationPanel from '../../components/monetization/MonetizationPanel';
import CreatorPortalPreview from '../../components/preview/CreatorPortalPreview';
import SetupWizardPortal from '../../components/wizard/SetupWizardPortal';
import { useToast } from '../../hooks/useToast';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const DashboardPage: React.FC = () => {
  const { currentUser, setCurrentUser } = useAppStore();
  const creator = currentUser as any;
  const today = formatDate(new Date());
  const { success, info } = useToast();
  
  const [currentPanel, setCurrentPanel] = useState<'overview' | 'analytics' | 'monetization' | 'preview'>('overview');
  const [showWizard, setShowWizard] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  
  // Check if this is the first visit to show wizard automatically
  useEffect(() => {
    if (creator && !creator.onboardingCompleted) {
      // Set a small delay to ensure everything is loaded
      const timer = setTimeout(() => {
        setIsFirstVisit(true);
        setShowWizard(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [creator]);
  
  // Mark onboarding as completed when wizard is closed
  const handleWizardClose = () => {
    setShowWizard(false);
    
    // Only update if this was the first visit
    if (isFirstVisit && creator) {
      const updatedUser = {
        ...creator,
        onboardingCompleted: true
      };
      setCurrentUser(updatedUser);
      success('Setup completed! Your portal is now ready.');
      setIsFirstVisit(false);
    }
  };
  
  // Upcoming events data
  const upcomingEvents = [
    { id: 1, title: 'Live Q&A Session', time: 'Tomorrow, 3:00 PM', type: 'primary' },
    { id: 2, title: 'Content Release', time: 'Friday, 10:00 AM', type: 'secondary' },
    { id: 3, title: 'Subscriber Meetup', time: 'Saturday, 2:00 PM', type: 'accent' }
  ];

  // Recent notifications
  const recentNotifications = [
    { id: 1, message: 'New subscriber joined your premium tier', time: '5 minutes ago' },
    { id: 2, message: 'Content engagement up by 25%', time: '1 hour ago' },
    { id: 3, message: 'NFT collection minting successful', time: '2 hours ago' }
  ];
  
  const handlePanelChange = (panel: 'overview' | 'analytics' | 'monetization' | 'preview') => {
    setCurrentPanel(panel);
    
    // Provide feedback when changing panels
    if (panel !== 'overview') {
      info(`Viewing ${panel} panel`);
    }
  };
  
  const renderPanel = () => {
    switch(currentPanel) {
      case 'analytics':
        return <DashboardAnalytics />;
      case 'monetization':
        return <MonetizationPanel />;
      case 'preview':
        return <CreatorPortalPreview 
          creatorName={creator?.name || 'Creator'}
          creatorAvatar={creator?.customizations?.aiAvatar} 
          creatorNiche={nicheOptions[creator?.niche || 'educator']}
        />;
      default:
        return (
          <motion.div 
            className="space-y-8"
            initial="hidden"
            animate="show"
            variants={container}
          >
            {/* Welcome Section */}
            <motion.div 
              variants={item}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500/20 via-primary-600/10 to-transparent backdrop-blur-sm p-8"
            >
              <div className="absolute inset-0 bg-grid-white/5" />
              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <motion.h1 
                    className="text-3xl font-bold text-gray-900 dark:text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Welcome back, {creator?.name?.split(' ')[0] || 'Creator'}!
                  </motion.h1>
                  <motion.p 
                    className="text-gray-600 dark:text-gray-400 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {today}
                  </motion.p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    className="border-primary/20 hover:border-primary/40"
                    leftIcon={<Settings size={18} />}
                    onClick={() => setShowWizard(true)}
                  >
                    Setup Wizard
                  </Button>
                  <Button
                    variant="primary"
                    leftIcon={<Eye size={18} />}
                    onClick={() => handlePanelChange('preview')}
                  >
                    Preview Portal
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* AI Stats Grid */}
            <motion.div 
              variants={item}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/10 border-none">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                      <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                      <TrendingUp size={14} className="mr-1" />
                      +12.5%
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">AI Interactions</h3>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">2,543</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Total AI assistant conversations</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 dark:from-purple-500/20 dark:to-purple-600/10 border-none">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                      <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex items-center text-sm text-purple-600 dark:text-purple-400">
                      <TrendingUp size={14} className="mr-1" />
                      +7.2%
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">AI Accuracy</h3>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">98.5%</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Response accuracy rate</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 dark:from-green-500/20 dark:to-green-600/10 border-none">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                      <TrendingUp size={14} className="mr-1" />
                      +23.1%
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Active Users</h3>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">1,876</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Currently engaged users</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 dark:from-orange-500/20 dark:to-orange-600/10 border-none">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                      <LineChart className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="flex items-center text-sm text-orange-600 dark:text-orange-400">
                      <TrendingUp size={14} className="mr-1" />
                      +4.3%
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Engagement</h3>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">68%</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Average engagement rate</p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Panel Selector */}
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card 
                className={`${currentPanel === 'analytics' ? 'ring-2 ring-primary' : ''} cursor-pointer hover:shadow-md transition-all`}
                onClick={() => handlePanelChange('analytics')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Analytics Dashboard</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">View performance metrics</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className={`${currentPanel === 'monetization' ? 'ring-2 ring-primary' : ''} cursor-pointer hover:shadow-md transition-all`}
                onClick={() => handlePanelChange('monetization')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Monetization</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Manage revenue streams</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className={`${currentPanel === 'preview' ? 'ring-2 ring-primary' : ''} cursor-pointer hover:shadow-md transition-all`}
                onClick={() => handlePanelChange('preview')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Portal Preview</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">See how visitors view your site</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Activity Chart */}
              <motion.div variants={item} className="lg:col-span-2">
                <Card className="border-none bg-gradient-to-br from-gray-50 to-transparent dark:from-gray-800/50 dark:to-transparent">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                      AI Activity Overview
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary"
                      onClick={() => handlePanelChange('analytics')}
                    >
                      View Details
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Bot className="h-12 w-12 text-primary mx-auto" />
                        <p className="text-gray-500 dark:text-gray-400">AI activity visualization</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Notifications */}
              <motion.div variants={item}>
                <Card className="border-none bg-gradient-to-br from-gray-50 to-transparent dark:from-gray-800/50 dark:to-transparent">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Bell className="mr-2 h-5 w-5 text-primary" />
                      Recent Activity
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary"
                      onClick={() => info('Viewing all notifications')}
                    >
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentNotifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          className="flex items-start space-x-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                          whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 400 } }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {notification.time}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Upcoming Events */}
              <motion.div variants={item}>
                <Card className="border-none bg-gradient-to-br from-gray-50 to-transparent dark:from-gray-800/50 dark:to-transparent">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      Upcoming Events
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary"
                      onClick={() => info('Calendar view coming soon')}
                    >
                      View Calendar
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <motion.div
                          key={event.id}
                          className="flex items-start group"
                          whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 400 } }}
                        >
                          <div className={`flex-shrink-0 h-10 w-10 rounded-xl bg-${event.type}/10 flex items-center justify-center text-${event.type}`}>
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div className="ml-3 flex-1">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                              {event.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {event.time}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Geographic Distribution */}
              <motion.div variants={item} className="lg:col-span-2">
                <Card className="border-none bg-gradient-to-br from-gray-50 to-transparent dark:from-gray-800/50 dark:to-transparent">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Globe className="mr-2 h-5 w-5 text-primary" />
                      Global AI Usage
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary"
                      onClick={() => info('Detailed map view coming soon')}
                    >
                      View Map
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {creator?.analyticsData?.visitorsByCountry?.map((country: any) => (
                        <motion.div
                          key={country.country}
                          className="group flex items-center space-x-4"
                          whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 400 } }}
                        >
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl flex items-center justify-center font-medium text-primary">
                            {country.country.substring(0, 2)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {country.country}
                              </h4>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {country.count} users
                              </span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-primary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ 
                                  width: `${Math.min(100, (country.count / creator?.analyticsData?.totalVisitors) * 100)}%` 
                                }}
                                transition={{ duration: 1, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            {/* Quick Actions */}
            <motion.div variants={item}>
              <Card className="border-none bg-gradient-to-br from-gray-50 to-transparent dark:from-gray-800/50 dark:to-transparent">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                      onClick={() => setShowWizard(true)}
                    >
                      <Plus className="h-5 w-5 text-blue-500" />
                      <span>Create New Portal</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                      onClick={() => handlePanelChange('analytics')}
                    >
                      <BarChart3 className="h-5 w-5 text-green-500" />
                      <span>View Analytics</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                      onClick={() => handlePanelChange('monetization')}
                    >
                      <DollarSign className="h-5 w-5 text-amber-500" />
                      <span>Monetization</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                      onClick={() => handlePanelChange('preview')}
                    >
                      <Globe className="h-5 w-5 text-purple-500" />
                      <span>Preview Portal</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        );
    }
  };

  return (
    <div className="relative">
      {renderPanel()}
      
      {/* Setup Wizard Modal */}
      <SetupWizardPortal
        isOpen={showWizard}
        onClose={handleWizardClose}
      />
    </div>
  );
};

// Define niche options for preview component
const nicheOptions: Record<string, string> = {
  'coach': 'Business Coach',
  'educator': 'Educator',
  'creator': 'Content Creator', 
  'consultant': 'Consultant',
  'founder': 'Startup Founder',
  'author': 'Author'
};

export default DashboardPage;