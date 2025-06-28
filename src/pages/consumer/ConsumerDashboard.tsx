import React, { useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { BookOpen, Star, Heart, Clock, ArrowRight, TrendingUp, Users, Video, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store';
import { motion } from 'framer-motion';
import { useToast } from '../../hooks/useToast';

export const ConsumerDashboard: React.FC = () => {
  const { currentUser } = useAppStore();
  const { info } = useToast();

  // Debug logging
  useEffect(() => {
    console.log('ConsumerDashboard - Current user:', currentUser);
  }, [currentUser]);

  // Mock recommended content
  const recommendedContent = [
    {
      id: '1',
      title: 'Getting Started with Web Development',
      creator: 'Alex Developer',
      type: 'Course',
      duration: '8h 30m',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg',
      progress: 45
    },
    {
      id: '2',
      title: 'Advanced React Patterns',
      creator: 'Sarah Coder',
      type: 'Workshop',
      duration: '2h 15m',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
      progress: 12
    },
    {
      id: '3',
      title: 'Building AI Applications',
      creator: 'Tech Master',
      type: 'Course',
      duration: '10h 45m',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      progress: 0
    }
  ];

  const recentActivity = [
    { id: 1, action: 'Completed lesson', content: 'JavaScript Fundamentals', time: '2 hours ago' },
    { id: 2, action: 'Started course', content: 'React Basics', time: '1 day ago' },
    { id: 3, action: 'Earned certificate', content: 'HTML & CSS Mastery', time: '3 days ago' },
  ];
  
  const handleContinueCourse = (contentId: string) => {
    info(`Continuing course ${contentId}`);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500/20 via-primary-600/10 to-transparent backdrop-blur-sm p-8"
      >
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="relative">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {currentUser?.name?.split(' ')[0] || 'Learner'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Continue your learning journey and discover new content
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Courses Enrolled</div>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="text-2xl font-bold text-green-600">45h</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hours Learned</div>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="text-2xl font-bold text-purple-600">4.8</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Rating</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Courses Enrolled</p>
                <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">12</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary opacity-75" />
            </div>
            <div className="mt-2 text-sm text-green-600 dark:text-green-400">
              +2 this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hours Learned</p>
                <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">45</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500 opacity-75" />
            </div>
            <div className="mt-2 text-sm text-green-600 dark:text-green-400">
              +8h this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Certificates</p>
                <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">5</p>
              </div>
              <Award className="h-8 w-8 text-yellow-500 opacity-75" />
            </div>
            <div className="mt-2 text-sm text-green-600 dark:text-green-400">
              +1 this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Rating</p>
                <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">4.8</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500 opacity-75" />
            </div>
            <div className="mt-2 text-sm text-green-600 dark:text-green-400">
              Excellent progress!
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Continue Learning
            </h2>
            <Link to="/consumer/library">
              <Button variant="ghost" className="text-primary" rightIcon={<ArrowRight size={16} />}>
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            {recommendedContent.map((content) => (
              <Card key={content.id} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative">
                      <img 
                        src={content.image} 
                        alt={content.title}
                        className="w-32 h-20 object-cover rounded-lg"
                      />
                      {content.progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
                          <div 
                            className="h-full bg-primary"
                            style={{ width: `${content.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                        {content.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        by {content.creator}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <span className="flex items-center">
                          <Video size={14} className="mr-1" />
                          {content.type}
                        </span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {content.duration}
                        </span>
                        <span className="flex items-center">
                          <Star size={14} className="mr-1 text-yellow-500" />
                          {content.rating}
                        </span>
                        {content.progress > 0 && (
                          <span className="text-primary">
                            {content.progress}% complete
                          </span>
                        )}
                      </div>
                      <Button 
                        size="sm"
                        className={content.progress > 0 ? 'bg-primary' : 'bg-secondary'}
                        rightIcon={<ArrowRight size={16} />}
                        onClick={() => handleContinueCourse(content.id)}
                      >
                        {content.progress > 0 ? 'Continue' : 'Start Learning'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <TrendingUp size={16} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {activity.action} <span className="font-medium">{activity.content}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link to="/consumer/library">
                  <Button variant="outline" className="w-full justify-start" leftIcon={<BookOpen size={16} />}>
                    Browse Content
                  </Button>
                </Link>
                <Link to="/consumer/favorites">
                  <Button variant="outline" className="w-full justify-start" leftIcon={<Heart size={16} />}>
                    View Favorites
                  </Button>
                </Link>
                <Link to="/consumer/subscriptions">
                  <Button variant="outline" className="w-full justify-start" leftIcon={<Users size={16} />}>
                    Manage Subscriptions
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Learning Streak */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                Learning Streak
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Days in a row
                </div>
                <div className="mt-4 flex justify-center gap-1">
                  {[...Array(7)].map((_, idx) => (
                    <div
                      key={idx}
                      className="h-2 w-2 rounded-full bg-primary"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};