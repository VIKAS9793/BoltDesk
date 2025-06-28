import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { BookOpen, Star, Heart, Clock, ArrowRight, TrendingUp, Users, Award, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store';
import { motion } from 'framer-motion';

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

export const ConsumerDashboard: React.FC = () => {
  const { currentUser } = useAppStore();

  // Mock recommended content with enhanced metadata
  const recommendedContent = [
    {
      id: '1',
      title: 'Getting Started with Web Development',
      creator: 'Alex Developer',
      type: 'Course',
      duration: '8h 30m',
      rating: 4.8,
      progress: 65,
      thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=300',
      difficulty: 'Beginner'
    },
    {
      id: '2',
      title: 'Advanced React Patterns',
      creator: 'Sarah Coder',
      type: 'Workshop',
      duration: '2h 15m',
      rating: 4.9,
      progress: 30,
      thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=300',
      difficulty: 'Advanced'
    },
    {
      id: '3',
      title: 'Building AI Applications',
      creator: 'Tech Master',
      type: 'Course',
      duration: '10h 45m',
      rating: 4.7,
      progress: 0,
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300',
      difficulty: 'Intermediate'
    }
  ];

  const achievements = [
    { title: 'First Course Completed', icon: Award, color: 'text-yellow-500' },
    { title: 'Week Streak', icon: Target, color: 'text-green-500' },
    { title: 'Community Contributor', icon: Users, color: 'text-blue-500' }
  ];

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
        <div className="relative">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {currentUser?.name?.split(' ')[0] || 'Learner'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Continue your learning journey and discover new skills
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Courses Enrolled</div>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-secondary">45h</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hours Learned</div>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-accent">8</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Saved Items</div>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-amber-500">4.8</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Rating</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Continue Learning Section */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Continue Learning
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Pick up where you left off
            </p>
          </div>
          <Link to="/consumer/library">
            <Button variant="ghost" className="text-primary" rightIcon={<ArrowRight size={16} />}>
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedContent.map((content) => (
            <Card key={content.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary"
                  >
                    Continue Learning
                  </Button>
                </div>
                {content.progress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${content.progress}%` }}
                    />
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                    {content.type}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    content.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    content.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {content.difficulty}
                  </span>
                </div>

                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2">
                  {content.title}
                </h3>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  by {content.creator}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{content.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400" />
                    <span>{content.rating}</span>
                  </div>
                </div>

                {content.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-primary font-medium">{content.progress}%</span>
                    </div>
                  </div>
                )}
                
                <Button 
                  variant="primary" 
                  className="w-full"
                  rightIcon={<ArrowRight size={16} />}
                >
                  {content.progress > 0 ? 'Continue' : 'Start Learning'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Achievements & Progress */}
      <motion.div variants={item}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Achievements */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Recent Achievements
                </h3>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className={`h-12 w-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center ${achievement.color}`}>
                      <achievement.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Unlocked 2 days ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Stats */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                This Week
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Learning Goal</span>
                    <span className="text-primary font-medium">8h / 10h</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Courses Completed</span>
                    <span className="text-secondary font-medium">2 / 3</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: '67%' }} />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">7</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Day Streak</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Recommended Creators */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recommended Creators
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover new instructors and content
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, idx) => (
            <Card key={idx} className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <img
                    src={`https://i.pravatar.cc/100?img=${idx + 1}`}
                    alt="Creator"
                    className="w-16 h-16 rounded-full mx-auto"
                  />
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                </div>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Creator {idx + 1}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Tech Educator
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                  Expert in web development and cloud architecture
                </p>
                
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span>1.2k students</span>
                  <span>4.9 ⭐</span>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  Follow
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};