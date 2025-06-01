import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { BookOpen, Star, Heart, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store';

export const ConsumerDashboard: React.FC = () => {
  const { currentUser } = useAppStore();

  // Mock recommended content
  const recommendedContent = [
    {
      id: '1',
      title: 'Getting Started with Web Development',
      creator: 'Alex Developer',
      type: 'Course',
      duration: '8h 30m',
      rating: 4.8
    },
    {
      id: '2',
      title: 'Advanced React Patterns',
      creator: 'Sarah Coder',
      type: 'Workshop',
      duration: '2h 15m',
      rating: 4.9
    },
    {
      id: '3',
      title: 'Building AI Applications',
      creator: 'Tech Master',
      type: 'Course',
      duration: '10h 45m',
      rating: 4.7
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {currentUser?.name?.split(' ')[0] || 'Learner'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Continue your learning journey
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Courses Enrolled</p>
                <p className="text-2xl font-bold mt-1">12</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Hours Learned</p>
                <p className="text-2xl font-bold mt-1">45</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500 opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Saved Items</p>
                <p className="text-2xl font-bold mt-1">8</p>
              </div>
              <Heart className="h-8 w-8 text-red-500 opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Rating</p>
                <p className="text-2xl font-bold mt-1">4.8</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500 opacity-75" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Continue Learning
          </h2>
          <Link to="/portal/library">
            <Button variant="ghost" className="text-primary" rightIcon={<ArrowRight size={16} />}>
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedContent.map((content) => (
            <Card key={content.id} className="hover:shadow-lg transition-all">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {content.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      by {content.creator}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {content.duration}
                      </span>
                      <span className="flex items-center">
                        <Star size={14} className="mr-1 text-yellow-500" />
                        {content.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4"
                  rightIcon={<ArrowRight size={16} />}
                >
                  Continue
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommended Creators */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recommended Creators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Creator Name
                    </h3>
                    <p className="text-xs text-gray-500">Tech Educator</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Expert in web development and cloud architecture
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};