import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Heart,
  Clock,
  Users,
  Star,
  Trash,
  Play,
  BookOpen
} from 'lucide-react';

export const Favorites: React.FC = () => {
  // Mock favorite items
  const favoriteItems = [
    {
      id: '1',
      title: 'Advanced JavaScript Concepts',
      creator: 'Tech Master',
      type: 'course',
      duration: '12h 30m',
      students: 1234,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg',
      progress: 45
    },
    {
      id: '2',
      title: 'UI Design Principles',
      creator: 'Design Pro',
      type: 'course',
      duration: '8h 15m',
      students: 856,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/5952651/pexels-photo-5952651.jpeg',
      progress: 20
    },
    {
      id: '3',
      title: 'Python for Data Science',
      creator: 'Data Expert',
      type: 'course',
      duration: '15h 45m',
      students: 645,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      progress: 0
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Favorites
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Access your saved courses and content
        </p>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteItems.map(item => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all">
            <div className="aspect-video relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                  leftIcon={<Play size={16} />}
                >
                  Resume
                </Button>
              </div>
              {item.progress > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
                  <div 
                    className="h-full bg-primary"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span className="capitalize">{item.type}</span>
                <span>•</span>
                <span className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {item.duration}
                </span>
              </div>

              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                by {item.creator}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span className="flex items-center">
                  <Users size={14} className="mr-1" />
                  {item.students}
                </span>
                <span className="flex items-center">
                  <Star size={14} className="mr-1 text-yellow-400" />
                  {item.rating}
                </span>
                {item.progress > 0 && (
                  <span className="text-primary">
                    {item.progress}% complete
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  className="flex-1"
                  leftIcon={item.progress > 0 ? <Play size={16} /> : <BookOpen size={16} />}
                >
                  {item.progress > 0 ? 'Continue' : 'Start Learning'}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-red-500"
                >
                  <Trash size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {favoriteItems.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No favorites yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start saving your favorite courses and content
          </p>
          <Button variant="primary">
            Browse Content
          </Button>
        </div>
      )}
    </div>
  );
};