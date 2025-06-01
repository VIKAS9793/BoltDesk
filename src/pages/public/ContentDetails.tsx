import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
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
  ChevronRight
} from 'lucide-react';

export const ContentDetails: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock content data - in a real app, this would be fetched based on the ID
  const content = {
    id,
    title: 'Complete Web Development Roadmap 2025',
    description: 'A comprehensive guide to becoming a full-stack developer, covering frontend, backend, and DevOps.',
    type: 'course',
    access: 'premium',
    instructor: 'Vikas Creator',
    duration: '8h 30m',
    lessons: 24,
    students: 1234,
    rating: 4.8,
    reviews: 156,
    lastUpdated: '2024-03-15',
    image: 'https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg',
    tags: ['web development', 'programming', 'career guide'],
    chapters: [
      {
        title: 'Getting Started',
        lessons: [
          { title: 'Introduction to Web Development', duration: '15:00' },
          { title: 'Setting Up Your Development Environment', duration: '20:00' },
          { title: 'Understanding Web Technologies', duration: '25:00' }
        ]
      },
      {
        title: 'Frontend Development',
        lessons: [
          { title: 'HTML5 Fundamentals', duration: '45:00' },
          { title: 'CSS3 and Modern Layouts', duration: '60:00' },
          { title: 'JavaScript Essentials', duration: '90:00' }
        ]
      },
      {
        title: 'Backend Development',
        lessons: [
          { title: 'Node.js Fundamentals', duration: '60:00' },
          { title: 'Database Design', duration: '45:00' },
          { title: 'API Development', duration: '75:00' }
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Content Info */}
            <div className="lg:w-2/3">
              <div className="flex items-center gap-2 mb-4">
                <Link 
                  to="/portal/content"
                  className="text-white/80 hover:text-white text-sm"
                >
                  Courses
                </Link>
                <ChevronRight size={16} className="text-white/60" />
                <span className="text-white/80 text-sm">Web Development</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {content.title}
              </h1>
              
              <p className="text-lg text-white/90 mb-6">
                {content.description}
              </p>
              
              <div className="flex flex-wrap gap-6 text-white/90">
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
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100"
                  leftIcon={<Play size={16} />}
                >
                  Start Learning
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  leftIcon={<Share2 size={16} />}
                >
                  Share Course
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
                    >
                      <Play size={24} />
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      $49.99
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      $99.99
                    </div>
                  </div>
                  
                  <Button className="w-full mb-4" size="lg">
                    Enroll Now
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
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'overview'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'curriculum'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('curriculum')}
          >
            Curriculum
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'reviews'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
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
                        <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        <div 
                          key={lessonIdx}
                          className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <div className="flex items-center gap-3">
                            <Play size={16} className="text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {lesson.duration}
                          </span>
                        </div>
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
                              width: `${Math.random() * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Mock reviews */}
                <div className="space-y-6">
                  {[...Array(3)].map((_, idx) => (
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
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              Student {idx + 1}
                            </h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              • 2 weeks ago
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, starIdx) => (
                              <Star
                                key={starIdx}
                                size={14}
                                className={starIdx < 5 ? 'text-yellow-400' : 'text-gray-300'}
                                fill="currentColor"
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            Great course! The content is well-structured and the instructor explains everything clearly.
                            I've learned a lot and feel more confident in my web development skills.
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
                Share this course
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="flex-1">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="flex-1">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="flex-1">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;