import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart as BarChartIcon, 
  LineChart, 
  PieChart, 
  Users, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
  Video,
  Info
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

interface DashboardAnalyticsProps {
  period?: 'day' | 'week' | 'month' | 'year';
}

// Mock data for analytics
const visitorData = [
  { day: 'Mon', visitors: 150 },
  { day: 'Tue', visitors: 230 },
  { day: 'Wed', visitors: 224 },
  { day: 'Thu', visitors: 218 },
  { day: 'Fri', visitors: 335 },
  { day: 'Sat', visitors: 247 },
  { day: 'Sun', visitors: 176 }
];

const engagementData = [
  { name: 'Chat Conversations', value: 65 },
  { name: 'Video Views', value: 20 },
  { name: 'Resource Downloads', value: 15 }
];

const ENGAGEMENT_COLORS = ['#3B82F6', '#8B5CF6', '#14B8A6'];

const topQuestions = [
  { id: 1, question: "What services do you offer?", count: 156 },
  { id: 2, question: "How can I book a consultation?", count: 114 },
  { id: 3, question: "What's included in the premium plan?", count: 89 },
  { id: 4, question: "Do you offer refunds?", count: 67 },
  { id: 5, question: "How long have you been doing this?", count: 52 }
];

export const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({ period = 'week' }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>(period);
  const [showInfo, setShowInfo] = useState<string | null>(null);
  
  const handleInfoClick = (key: string) => {
    if (showInfo === key) {
      setShowInfo(null);
    } else {
      setShowInfo(key);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track your portal's performance and engagement
          </p>
        </div>
        <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {['day', 'week', 'month', 'year'].map((p) => (
            <Button
              key={p}
              variant={selectedPeriod === p ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedPeriod(p as 'day' | 'week' | 'month' | 'year')}
              className={selectedPeriod !== p ? 'text-gray-600 dark:text-gray-400' : ''}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard 
          title="Portal Visitors" 
          value="1,248" 
          change="+12.5%"
          trend="up"
          icon={<Users className="h-5 w-5 text-blue-500" />}
          color="blue"
          infoKey="visitors"
          infoText="Total number of unique visitors who accessed your portal during the selected period."
          showInfo={showInfo}
          onInfoClick={handleInfoClick}
        />
        <MetricCard 
          title="AI Conversations" 
          value="427" 
          change="+23.7%"
          trend="up"
          icon={<MessageSquare className="h-5 w-5 text-purple-500" />}
          color="purple"
          infoKey="conversations"
          infoText="Number of chat interactions with your AI assistant during the selected period."
          showInfo={showInfo}
          onInfoClick={handleInfoClick}
        />
        <MetricCard 
          title="Booked Sessions" 
          value="38" 
          change="+8.2%"
          trend="up"
          icon={<Calendar className="h-5 w-5 text-green-500" />}
          color="green"
          infoKey="bookings"
          infoText="Total number of appointments scheduled through your portal during the selected period."
          showInfo={showInfo}
          onInfoClick={handleInfoClick}
        />
        <MetricCard 
          title="Revenue Generated" 
          value="$5,124" 
          change="-3.4%"
          trend="down"
          icon={<DollarSign className="h-5 w-5 text-amber-500" />}
          color="amber"
          infoKey="revenue"
          infoText="Total revenue from all monetization channels including bookings, courses, and memberships."
          showInfo={showInfo}
          onInfoClick={handleInfoClick}
        />
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visitor Traffic Chart */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-gray-500" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Visitor Traffic
                </h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleInfoClick('visitor-chart')}>
                <Info className="h-4 w-4" />
              </Button>
            </div>
            
            {showInfo === 'visitor-chart' && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm text-blue-800 dark:text-blue-200">
                This chart shows daily visitor trends for the selected period. You can identify peak traffic days to plan content or promotions accordingly.
              </div>
            )}
            
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={visitorData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      borderColor: '#E5E7EB',
                      borderRadius: '0.375rem',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}
                  />
                  <Bar 
                    dataKey="visitors" 
                    fill="#3B82F6" 
                    radius={[4, 4, 0, 0]}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Engagement Breakdown */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-gray-500" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Engagement Breakdown
                </h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleInfoClick('engagement-chart')}>
                <Info className="h-4 w-4" />
              </Button>
            </div>
            
            {showInfo === 'engagement-chart' && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm text-blue-800 dark:text-blue-200">
                This chart shows how visitors engage with different aspects of your portal. Use this to identify your most popular features.
              </div>
            )}
            
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={ENGAGEMENT_COLORS[index % ENGAGEMENT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 gap-2 mt-4">
              {engagementData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="h-3 w-3 rounded-full mr-2"
                    style={{ backgroundColor: ENGAGEMENT_COLORS[index] }}
                  ></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                  <span className="ml-auto text-sm font-medium text-gray-900 dark:text-white">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Top Questions */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-gray-500" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Top AI Questions
                </h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleInfoClick('questions')}>
                <Info className="h-4 w-4" />
              </Button>
            </div>
            
            {showInfo === 'questions' && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm text-blue-800 dark:text-blue-200">
                These are the most frequent questions asked to your AI assistant. Use these insights to improve your content and FAQs.
              </div>
            )}
            
            <div className="space-y-3">
              {topQuestions.map((q) => (
                <div 
                  key={q.id} 
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center"
                >
                  <span className="text-sm text-gray-900 dark:text-white">
                    {q.question}
                  </span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                    {q.count}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Conversion Metrics */}
        <Card className="lg:col-span-3">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gray-500" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Conversion Metrics
                </h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleInfoClick('conversion')}>
                <Info className="h-4 w-4" />
              </Button>
            </div>
            
            {showInfo === 'conversion' && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm text-blue-800 dark:text-blue-200">
                These metrics show how effectively your portal converts visitors into customers, subscribers, and engaged users.
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ConversionMetric 
                title="Session Bookings" 
                rate="12.4%" 
                change="+2.1%" 
                trend="up"
                icon={<Calendar className="h-5 w-5 text-blue-500" />}
              />
              <ConversionMetric 
                title="Content Purchases" 
                rate="8.7%" 
                change="+0.9%" 
                trend="up"
                icon={<Video className="h-5 w-5 text-purple-500" />}
              />
              <ConversionMetric 
                title="Newsletter Signup" 
                rate="22.3%" 
                change="-1.5%" 
                trend="down"
                icon={<MessageSquare className="h-5 w-5 text-green-500" />}
              />
            </div>
            
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  AI to Revenue Pipeline
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Last 30 days
                </span>
              </div>
              
              <div className="relative pt-2">
                <div className="flex mb-2">
                  <div className="w-1/4 text-center">
                    <div className="text-lg font-bold text-blue-500">2,436</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Conversations</div>
                  </div>
                  <div className="w-1/4 text-center">
                    <div className="text-lg font-bold text-indigo-500">1,254</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Resource Views</div>
                  </div>
                  <div className="w-1/4 text-center">
                    <div className="text-lg font-bold text-purple-500">682</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Booking Pages</div>
                  </div>
                  <div className="w-1/4 text-center">
                    <div className="text-lg font-bold text-green-500">247</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Conversions</div>
                  </div>
                </div>
                
                <div className="h-2 flex rounded-full overflow-hidden">
                  <div className="bg-blue-500 w-1/4"></div>
                  <div className="bg-indigo-500 w-1/4"></div>
                  <div className="bg-purple-500 w-1/4"></div>
                  <div className="bg-green-500 w-1/4"></div>
                </div>
                
                <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <div>Start</div>
                  <div>End</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: 'blue' | 'purple' | 'green' | 'amber' | 'red';
  infoKey: string;
  infoText: string;
  showInfo: string | null;
  onInfoClick: (key: string) => void;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  color,
  infoKey,
  infoText,
  showInfo,
  onInfoClick
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-500',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-500',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-500',
    amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-500',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-500',
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
            {icon}
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onInfoClick(infoKey)}>
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
        
        {showInfo === infoKey && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md text-xs text-blue-800 dark:text-blue-200">
            {infoText}
          </div>
        )}
        
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {value}
            </p>
            <p className={`ml-2 flex items-center text-sm ${
              trend === 'up' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
            }`}>
              {trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 mr-0.5" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-0.5" />
              )}
              {change}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ConversionMetricProps {
  title: string;
  rate: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

const ConversionMetric: React.FC<ConversionMetricProps> = ({ title, rate, change, trend, icon }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
          {icon}
        </div>
        <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {rate}
        </div>
        <div className={`flex items-center text-sm ${
          trend === 'up' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
        }`}>
          {trend === 'up' ? (
            <ArrowUpRight className="h-4 w-4 mr-0.5" />
          ) : (
            <ArrowDownRight className="h-4 w-4 mr-0.5" />
          )}
          {change}
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;