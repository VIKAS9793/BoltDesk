import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../hooks/useToast';
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
  ChevronDown,
  Play,
  Download
} from 'lucide-react';

export const ContentLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();
  const { success, info } = useToast();

  const categories = [
    { id: 'all', name: 'All Content', icon: BookOpen },
    { id: 'courses', name: 'Courses', icon: Video },
    { id: 'tutorials', name: 'Tutorials', icon: FileText },
    { id: 'podcasts', name: 'Podcasts', icon: Headphones }
  ];

  const filters = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'recent', name: 'Recently Added' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'duration', name: 'Shortest First' }
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
      enrolled: false,
      progress: 0,
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
      enrolled: true,
      progress: 45,
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
      enrolled: false,
      progress: 0,
      tags: ['ai', 'machine learning', 'python']
    },
    {
      id: '4',
      title: 'React Advanced Patterns',
      creator: 'React Master',
      type: 'course',
      duration: '12h 20m',
      students: 432,
      rating: 4.9,
      reviews: 67,
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
      premium: true,
      enrolled: true,
      progress: 20,
      tags: ['react', 'javascript', 'patterns']
    },
    {
      id: '5',
      title: 'Digital Marketing Essentials',
      creator: 'Marketing Guru',
      type: 'course',
      duration: '16h 45m',
      students: 892,
      rating: 4.6,
      reviews: 124,
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
      premium: false,
      enrolled: false,
      progress: 0,
      tags: ['marketing', 'digital', 'social media']
    },
    {
      id: '6',
      title: 'Python Programming Masterclass',
      creator: 'Code Expert',
      type: 'course',
      duration: '28h 10m',
      students: 1567,
      rating: 4.8,
      reviews: 203,
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
      premium: true,
      enrolled: false,
      progress: 0,
      tags: ['python', 'programming', 'backend']
    }
  ];

  const handleContentClick = (contentId: string) => {
    navigate(`/content/${contentId}`);
  };

  const handleEnroll = (contentId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    success(`Successfully enrolled in course!`);
  };

  const handleFavorite = (contentId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newFavorites = favorites.includes(contentId)
      ? favorites.filter(id => id !== contentId)
      : [...favorites, contentId];
    
    setFavorites(newFavorites);
    
    if (newFavorites.includes(contentId)) {
      success('Added to favorites!');
    } else {
      info('Removed from favorites');
    }
  };

  const handleContinue = (contentId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    info(`Continuing course...`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      info(`Searching for: ${e.target.value}`);
    }
  };

  const handleFilterChange = (filterId: string) => {
    setSelectedFilter(filterId);
    info(`Sorted by: ${filters.find(f => f.id === filterId)?.name}`);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    info(`Showing: ${categories.find(c => c.id === categoryId)?.name}`);
  };

  const filteredContent = contentItems.filter(item => {
    if (selectedCategory !== 'all' && item.type !== selectedCategory.slice(0, -1)) {
      return false;
    }
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

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
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              leftIcon={<Filter size={16} />}
              onClick={() => info('Advanced filters coming soon!')}
            >
              Filters
            </Button>
            <select
              value={selectedFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
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
              onClick={() => handleCategoryChange(category.id)}
              leftIcon={<category.icon size={16} />}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map(item => (
          <Card 
            key={item.id} 
            className="overflow-hidden hover:shadow-lg transition-all cursor-pointer"
            onClick={() => handleContentClick(item.id)}
          >
            <div className="aspect-video relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay content */}
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                  leftIcon={<Play size={16} />}
                >
                  Preview
                </Button>
              </div>
              
              {/* Status badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {item.premium && (
                  <div className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                    <Lock size={12} className="mr-1" />
                    Premium
                  </div>
                )}
                {item.enrolled && (
                  <div className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                    Enrolled
                  </div>
                )}
              </div>
              
              {/* Progress bar */}
              {item.enrolled && item.progress > 0 && (
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

              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                <span className="flex items-center">
                  <Users size={14} className="mr-1" />
                  {item.students}
                </span>
                <span className="flex items-center">
                  <Star size={14} className="mr-1 text-yellow-400" />
                  {item.rating} ({item.reviews})
                </span>
                {item.enrolled && item.progress > 0 && (
                  <span className="text-primary">
                    {item.progress}% complete
                  </span>
                )}
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
                {item.enrolled ? (
                  <Button
                    variant="primary"
                    className="flex-1"
                    leftIcon={item.progress > 0 ? <Play size={16} /> : <BookOpen size={16} />}
                    onClick={(e) => handleContinue(item.id, e)}
                  >
                    {item.progress > 0 ? 'Continue' : 'Start Learning'}
                  </Button>
                ) : (
                  <Button
                    variant={item.premium ? 'outline' : 'primary'}
                    className="flex-1"
                    onClick={(e) => handleEnroll(item.id, e)}
                  >
                    {item.premium ? 'Upgrade to Access' : 'Enroll Now'}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className={favorites.includes(item.id) ? 'text-red-500' : 'text-gray-500'}
                  onClick={(e) => handleFavorite(item.id, e)}
                >
                  <Heart 
                    size={16} 
                    fill={favorites.includes(item.id) ? 'currentColor' : 'none'}
                  />
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
          onClick={() => info('Loading more content...')}
        >
          Load More
        </Button>
      </div>

      {/* Empty State */}
      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No content found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your search or filters
          </p>
          <Button 
            variant="primary"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedFilter('popular');
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};