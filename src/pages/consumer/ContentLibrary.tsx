import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Search,
  Filter,
  BookOpen,
  Video,
  FileText,
  Headphones,
  Clock,
  Users,
  Star,
  Heart,
  Lock,
  ChevronDown
} from 'lucide-react';

export const ContentLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('popular');

  const categories = [
    { id: 'all', name: 'All Content', icon: BookOpen },
    { id: 'courses', name: 'Courses', icon: Video },
    { id: 'tutorials', name: 'Tutorials', icon: FileText },
    { id: 'podcasts', name: 'Podcasts', icon: Headphones }
  ];

  const filters = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'recent', name: 'Recently Added' },
    { id: 'rating', name: 'Highest Rated' }
  ];

  // Mock content data
  const contentItems = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      creator: 'Tech Master',
      type: 'course',
      duration: '32h 15m',
      students: 1234,
      rating: 4.8,
      reviews: 156,
      image: 'https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg',
      premium: true,
      tags: ['web development', 'programming', 'html', 'css', 'javascript']
    },
    {
      id: '2',
      title: 'UI/UX Design Fundamentals',
      creator: 'Design Pro',
      type: 'course',
      duration: '18h 30m',
      students: 856,
      rating: 4.9,
      reviews: 98,
      image: 'https://images.pexels.com/photos/5952651/pexels-photo-5952651.jpeg',
      premium: false,
      tags: ['design', 'ui', 'ux', 'figma']
    },
    {
      id: '3',
      title: 'Machine Learning Basics',
      creator: 'AI Expert',
      type: 'course',
      duration: '24h 45m',
      students: 645,
      rating: 4.7,
      reviews: 87,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      premium: true,
      tags: ['ai', 'machine learning', 'python']
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Content Library
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Explore our collection of courses, tutorials, and resources
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search content..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              leftIcon={<Filter size={16} />}
            >
              Filters
            </Button>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {filters.map(filter => (
                <option key={filter.id} value={filter.id}>
                  {filter.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'primary' : 'outline'}
              className="whitespace-nowrap"
              onClick={() => setSelectedCategory(category.id)}
              leftIcon={<category.icon size={16} />}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentItems.map(item => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all">
            <div className="aspect-video relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {item.premium && (
                <div className="absolute top-2 right-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                  <Lock size={12} className="mr-1" />
                  Premium
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

              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                <span className="flex items-center">
                  <Users size={14} className="mr-1" />
                  {item.students}
                </span>
                <span className="flex items-center">
                  <Star size={14} className="mr-1 text-yellow-400" />
                  {item.rating} ({item.reviews})
                </span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant={item.premium ? 'outline' : 'primary'}
                  className="flex-1"
                >
                  {item.premium ? 'Upgrade to Access' : 'Start Learning'}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-red-500"
                >
                  <Heart size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <Button
          variant="outline"
          size="lg"
          className="px-8"
          rightIcon={<ChevronDown size={16} />}
        >
          Load More
        </Button>
      </div>
    </div>
  );
};