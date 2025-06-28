import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../hooks/useToast';
import { 
  Clock, 
  Users, 
  Star,
  BookOpen,
  Video,
  FileText,
  MessageSquare,
  Share2,
  ThumbsUp,
  Download,
  Play,
  Lock,
  ChevronRight,
  Heart,
  ArrowLeft
} from 'lucide-react';

export const ContentDetails: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { success, info } = useToast();
  
  // Mock content data - in a real app, this would be fetched based on the ID
  const content = {
    id,
    title: 'Complete Web Development Roadmap 2025',
    description: 'A comprehensive guide to becoming a full-stack developer, covering frontend, backend, and DevOps.',
    type: 'course',
    access: 'premium',
    instructor: 'Vikas Sahani',
    duration: '8h 30m',
    lessons: 24,
    students: 1234,
    rating: 4.8,
    reviews: 156,
    lastUpdated: '2024-03-15',
    image: 'https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg',
    tags: ['web development', 'programming', 'career guide'],
    price: 49.99,
    originalPrice: 99.99,
    chapters: [
      {
        title: 'Getting Started',
        lessons: [
          { title: 'Introduction to Web Development', duration: '15:00', isPreview: true },
          { title: 'Setting Up Your Development Environment', duration: '20:00', isPreview: false },
          { title: 'Understanding Web Technologies', duration: '25:00', isPreview: false }
        ]
      },
      {
        title: 'Frontend Development',
        lessons: [
          { title: 'HTML5 Fundamentals', duration: '45:00', isPreview: false },
          { title: 'CSS3 and Modern Layouts', duration: '60:00', isPreview: false },
          { title: 'JavaScript Essentials', duration: '90:00', isPreview: false }
        ]
      },
      {
        title: 'Backend Development',
        lessons: [
          { title: 'Node.js Fundamentals', duration: '60:00', isPreview: false },
          { title: 'Database Design', duration: '45:00', isPreview: false },
          { title: 'API Development', duration: '75:00', isPreview: false }
        ]
      }
    ],
    requirements: [
      'Basic understanding of computers',
      'A modern web browser',
      'Text editor (VS Code recommended)',
      'Willingness to learn and practice'
    ],
    learningOutcomes: [
      'Build full-stack web applications',
      'Understand modern web development practices',
      'Deploy applications to production',
      'Work with databases and APIs',
      'Implement security best practices'
    ]
  };

  const handleEnroll = () => {
    setIsEnrolled(true);
    success('Successfully enrolled in the course!');
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    if (!isFavorited) {
      success('Added to favorites!');
    } else {
      info('Removed from favorites');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: content.title,
        text: content.description,
        url: window.location.href,
      });
    } catch (err) {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href);
      success('Link copied to clipboard!');
    }
  };

  const handleLessonClick = (lesson: any, isPreview: boolean) => {
    if (isPreview || isEnrolled) {
      info(`Playing: ${lesson.title}`);
    } else {
      info('Please enroll to access this lesson');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-primary dark:text-gray-400">
              Home
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <Link to="/" className="text-gray-600 hover:text-primary dark:text-gray-400">
              Courses
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-gray-900 dark:text-white">{content.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Content Info */}
            <div className="lg:w-2/3">
              <Link to="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-4 border-white/20 text-white hover:bg-white/10"
                  leftIcon={<ArrowLeft size={16} />}
                >
                  Back to Home
                </Button>
              </Link>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {content.title}
              </h1>
              
              <p className="text-lg text-white/90 mb-6">
                {content.description}
              </p>
              
              <div className="flex flex-wrap gap-6 text-white/90 mb-6">
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{content.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={18} />
                  <span>{content.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>{content.students} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-yellow-400" />
                  <span>{content.rating} ({content.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {isEnrolled ? (
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700"
                    leftIcon={<Play size={16} />}
                    onClick={() => info('Starting course...')}
                  >
                    Continue Learning
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100"
                    leftIcon={<Play size={16} />}
                    onClick={handleEnroll}
                  >
                    Enroll Now
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  leftIcon={<Share2 size={16} />}
                  onClick={handleShare}
                >
                  Share Course
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`border-white hover:bg-white/10 ${
                    isFavorited ? 'text-red-400' : 'text-white'
                  }`}
                  leftIcon={<Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />}
                  onClick={handleFavorite}
                >
                  {isFavorited ? 'Favorited' : 'Add to Favorites'}
                </Button>
              </div>
            </div>
            
            {/* Preview Card */}
            <div className="lg:w-1/3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                <div className="aspect-video relative">
                  <img 
                    src={content.image}
                    alt={content.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="rounded-full h-16 w-16 bg-white/90 hover:bg-white text-primary"
                      onClick={() => info('Playing preview...')}
                    >
                      <Play size={24} />
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${content.price}
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      ${content.originalPrice}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mb-4" 
                    size="lg"
                    onClick={handleEnroll}
                    disabled={isEnrolled}
                  >
                    {isEnrolled ? 'Enrolled ✓' : 'Enroll Now'}
                  </Button>
                  
                  <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Video size={16} />
                      <span>{content.lessons} video lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download size={16} />
                      <span>Downloadable resources</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare size={16} />
                      <span>Community access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock size={16} />
                      <span>Lifetime access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'curriculum', label: 'Curriculum' },
            { id: 'reviews', label: 'Reviews' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    What you'll learn
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {content.learningOutcomes.map((outcome, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                      >
                        <svg className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Requirements
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    {content.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'curriculum' && (
              <div className="space-y-6">
                {content.chapters.map((chapter, idx) => (
                  <div 
                    key={idx}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {chapter.title}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {chapter.lessons.length} lessons
                      </span>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {chapter.lessons.map((lesson, lessonIdx) => (
                        <button
                          key={lessonIdx}
                          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 text-left transition-colors"
                          onClick={() => handleLessonClick(lesson, lesson.isPreview)}
                        >
                          <div className="flex items-center gap-3">
                            <Play size={16} className="text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {lesson.title}
                            </span>
                            {lesson.isPreview && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Preview
                              </span>
                            )}
                            {!lesson.isPreview && !isEnrolled && (
                              <Lock size={14} className="text-gray-400" />
                            )}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {lesson.duration}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                      {content.rating}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={16}
                          className={idx < Math.floor(content.rating) ? 'text-yellow-400' : 'text-gray-300'}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {content.reviews} reviews
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-4 mb-2">
                        <div className="text-sm text-gray-500 dark:text-gray-400 w-8">
                          {rating} stars
                        </div>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400"
                            style={{ 
                              width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[
                    { name: 'Alex Chen', rating: 5, comment: 'Excellent course! The content is well-structured and the instructor explains everything clearly. I\'ve learned a lot and feel more confident in my web development skills.', time: '2 weeks ago' },
                    { name: 'Sarah Johnson', rating: 5, comment: 'This course exceeded my expectations. The hands-on projects really helped me understand the concepts better.', time: '1 month ago' },
                    { name: 'Mike Rodriguez', rating: 4, comment: 'Great course overall. Would love to see more advanced topics covered in future updates.', time: '3 weeks ago' }
                  ].map((review, idx) => (
                    <div 
                      key={idx}
                      className="border-b border-gray-200 dark:border-gray-700 pb-6"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={`https://i.pravatar.cc/40?img=${idx + 1}`}
                          alt="Reviewer"
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {review.name}
                            </h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              • {review.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, starIdx) => (
                              <Star
                                key={starIdx}
                                size={14}
                                className={starIdx < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                                fill="currentColor"
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full" variant="outline">
                  Load More Reviews
                </Button>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                Course Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Enrolled Students</span>
                  <span className="font-medium text-gray-900 dark:text-white">{content.students}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Lessons</span>
                  <span className="font-medium text-gray-900 dark:text-white">{content.lessons}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Course Duration</span>
                  <span className="font-medium text-gray-900 dark:text-white">{content.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                  <span className="font-medium text-gray-900 dark:text-white">{content.lastUpdated}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                Instructor
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/20240506_120440.jpg"
                  alt={content.instructor}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {content.instructor}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Senior Developer & AI Enthusiast
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={() => info('Viewing instructor profile...')}>
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;