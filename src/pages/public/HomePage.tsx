import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { useToast } from '../../hooks/useToast';
import { 
  ExternalLink, 
  ArrowRight, 
  Play, 
  Crown, 
  ChevronRight,
  Calendar,
  Users,
  MessageSquare,
  Star,
  Clock,
  Lock,
  Unlock,
  Share2,
  BookOpen,
  Video,
  FileText,
  Headphones,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  const { success, info } = useToast();
  
  // Featured content with enhanced metadata
  const featuredContent = [
    {
      id: 'c1',
      title: 'Complete Web Development Roadmap 2025',
      description: 'Learn the fundamentals of web development and build real-world projects',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg',
      type: 'course',
      access: 'free',
      duration: '8h 30m',
      lessons: 24,
      students: 1234,
      rating: 4.8,
      reviews: 156,
      tags: ['web development', 'programming', 'html', 'css', 'javascript']
    },
    {
      id: 'c2',
      title: 'Advanced React Patterns Workshop',
      description: 'Master advanced React patterns and build scalable applications',
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
      type: 'workshop',
      access: 'premium',
      duration: '4h 15m',
      lessons: 12,
      students: 856,
      rating: 4.9,
      reviews: 98,
      tags: ['react', 'javascript', 'advanced', 'patterns']
    },
    {
      id: 'c3',
      title: 'Building AI-Powered Applications',
      description: 'Learn to integrate AI models into your applications',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      type: 'course',
      access: 'nft',
      duration: '10h 45m',
      lessons: 32,
      students: 645,
      rating: 4.7,
      reviews: 87,
      tags: ['ai', 'machine learning', 'programming']
    }
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      id: 'e1',
      title: 'Live Q&A Session',
      date: '2024-03-25',
      time: '3:00 PM EST',
      type: 'live',
      participants: 156
    },
    {
      id: 'e2',
      title: 'React Performance Workshop',
      date: '2024-03-28',
      time: '2:00 PM EST',
      type: 'workshop',
      participants: 89
    },
    {
      id: 'e3',
      title: 'Community Meetup',
      date: '2024-03-30',
      time: '1:00 PM EST',
      type: 'meetup',
      participants: 234
    }
  ];

  // Categories
  const categories = [
    { id: 'all', name: 'All Content', icon: FileText },
    { id: 'courses', name: 'Courses', icon: BookOpen },
    { id: 'workshops', name: 'Workshops', icon: Video },
    { id: 'tutorials', name: 'Tutorials', icon: FileText },
    { id: 'podcasts', name: 'Podcasts', icon: Headphones }
  ];

  // Content type icon mapping
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="h-4 w-4" />;
      case 'workshop':
        return <Video className="h-4 w-4" />;
      case 'tutorial':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleContentClick = (contentId: string) => {
    navigate(`/content/${contentId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section with Google-style colors and elevation */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden py-24">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Where Creators Connect & Audiences Discover
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              For creators: Share your knowledge and monetize your expertise with AI-powered tools.
              For audiences: Find premium content with personalized AI assistance always ready to help.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100 h-14 px-8 text-base font-medium elevation-4"
                leftIcon={<Sparkles size={18} />}
                onClick={() => setVideoModalOpen(true)}
              >
                See How It Works
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 h-14 px-8 text-base font-medium elevation-1"
                leftIcon={<Crown size={18} />}
                onClick={() => navigate('/login')}
              >
                Start Creating Today
              </Button>
            </motion.div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="text-2xl font-bold">2.5K+</div>
                <div className="text-sm text-white">Content Creators</div>
              </motion.div>
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="text-2xl font-bold">150K+</div>
                <div className="text-sm text-white">Active Subscribers</div>
              </motion.div>
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-white">Creator Satisfaction</div>
              </motion.div>
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="text-2xl font-bold">$1.2M+</div>
                <div className="text-sm text-white">Earned by Creators</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Value proposition for both creators and consumers */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              A Platform for Everyone
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              BoltDesk brings together creators and their audiences with powerful AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Creators card */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 elevation-3">
              <div className="h-16 w-16 rounded-xl bg-primary-50 flex items-center justify-center mb-6 shadow-lg border border-primary-200">
                <Sparkles size={32} className="text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                For Creators
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 size={20} className="text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 dark:text-gray-200">
                    Share your expertise and earn commissions on content and bookings
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 size={20} className="text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 dark:text-gray-200">
                    Deploy your own AI assistant trained on your content to help your audience
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 size={20} className="text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 dark:text-gray-200">
                    Track your earnings and engagement metrics in real-time
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 size={20} className="text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 dark:text-gray-200">
                    Customize your portal and build your personal brand
                  </span>
                </li>
              </ul>
              <Button
                variant="primary"
                className="mt-6 shadow-lg font-medium"
                rightIcon={<ArrowRight size={16} />}
                onClick={() => navigate('/login')}
                elevation={3}
              >
                Start Creating
              </Button>
            </div>
            
            {/* Audiences card */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 elevation-3">
              <div className="h-16 w-16 rounded-xl bg-secondary-50 flex items-center justify-center mb-6 shadow-lg border border-secondary-200">
                <Users size={32} className="text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                For Audiences
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 size={20} className="text-secondary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 dark:text-gray-200">
                    Discover high-quality content from expert creators in your field
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 size={20} className="text-secondary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 dark:text-gray-200">
                    Get personalized help from AI assistants trained on creator content
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 size={20} className="text-secondary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 dark:text-gray-200">
                    Engage directly with creators through live events and community features
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 size={20} className="text-secondary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800 dark:text-gray-200">
                    Access content across multiple formats: courses, workshops, articles, and more
                  </span>
                </li>
              </ul>
              <Button
                variant="secondary"
                className="mt-6 shadow-lg font-medium"
                rightIcon={<ArrowRight size={16} />}
                onClick={() => {
                  // Scroll to content section
                  const contentSection = document.getElementById('featured-content');
                  if (contentSection) {
                    contentSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                elevation={3}
              >
                Explore Content
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900/50 border-t border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto pb-4 gap-3 hide-scrollbar">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'outline'}
                className="whitespace-nowrap px-6 py-3 text-base shadow-md hover:shadow-lg"
                onClick={() => setSelectedCategory(category.id)}
                leftIcon={<category.icon className="h-4 w-4" />}
                elevation={selectedCategory === category.id ? 3 : 1}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured content section */}
      <section id="featured-content" className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Featured Content
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                Start learning with our most popular resources
              </p>
            </div>
            <Link 
              to="/content" 
              className="mt-4 md:mt-0 inline-flex items-center bg-primary-50 text-primary-600 hover:text-primary-700 font-medium px-4 py-2 rounded-lg shadow-sm border border-primary-100"
            >
              View all content
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredContent.map((content) => (
              <Card 
                key={content.id} 
                className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
                onClick={() => handleContentClick(content.id)}
                elevation={2}
              >
                <div className="aspect-video w-full overflow-hidden bg-gray-200 dark:bg-gray-700 relative">
                  <img 
                    src={content.image} 
                    alt={content.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-primary-600 shadow-lg"
                      leftIcon={<Play size={16} />}
                      elevation={3}
                    >
                      Preview Course
                    </Button>
                  </div>
                  {content.access === 'premium' && (
                    <div className="absolute top-2 right-2 bg-secondary-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md border border-secondary-400">
                      Premium
                    </div>
                  )}
                  {content.access === 'nft' && (
                    <div className="absolute top-2 right-2 bg-accent-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md border border-accent-400">
                      NFT Exclusive
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getContentTypeIcon(content.type)}
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {content.type}
                    </span>
                    <div className="flex-1" />
                    {content.access === 'free' ? (
                      <span className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                        <Unlock size={14} className="mr-1" />
                        Free
                      </span>
                    ) : (
                      <span className="flex items-center text-primary-600 text-sm font-medium">
                        <Lock size={14} className="mr-1" />
                        {content.access === 'premium' ? 'Premium' : 'NFT'}
                      </span>
                    )}
                  </div>

                  <h3 className="font-medium text-base mb-2 text-gray-900 dark:text-white">
                    {content.title}
                  </h3>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                    {content.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Clock size={14} className="mr-1 text-gray-600" />
                      {content.duration}
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <BookOpen size={14} className="mr-1 text-gray-600" />
                      {content.lessons} lessons
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Users size={14} className="mr-1 text-gray-600" />
                      {content.students} students
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Star size={14} className="mr-1 text-yellow-500" />
                      {content.rating} ({content.reviews})
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {content.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button 
                    variant={content.access === 'free' ? 'primary' : 'outline'} 
                    size="sm"
                    className="w-full shadow-md hover:shadow-lg"
                    rightIcon={<ArrowRight size={16} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContentClick(content.id);
                    }}
                    elevation={2}
                  >
                    {content.access === 'free' ? 'Start Learning' : 'Learn More'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900/50 border-t border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Upcoming Events
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                Join our live sessions and workshops
              </p>
            </div>
            <Button 
              variant="outline" 
              leftIcon={<Calendar size={16} />}
              className="shadow-md hover:shadow-lg border-gray-300 text-gray-800"
              elevation={2}
            >
              View Calendar
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-all" elevation={2}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary-50 border border-primary-200 flex items-center justify-center text-primary-600 shadow-md">
                      <Calendar size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric' 
                        })} at {event.time}
                      </p>
                      <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users size={14} className="mr-1 text-gray-500" />
                        {event.participants} registered
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4 shadow-sm hover:shadow-md border-gray-300 text-gray-800"
                    onClick={() => success(`Registered for ${event.title}!`)}
                    elevation={1}
                  >
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Creator bio */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src="/20240506_120440.jpg" 
                  alt="Vikas Sahani - Founder" 
                  className="rounded-lg w-full max-w-lg mx-auto shadow-xl object-cover object-center border-4 border-gray-100 dark:border-gray-700 elevation-3"
                />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full px-6 py-2 shadow-lg border border-gray-200 dark:border-gray-700 elevation-3">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <img
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                          src={`https://i.pravatar.cc/100?img=${i + 1}`}
                          alt="Community member avatar"
                        />
                      ))}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900 dark:text-white">2.5k+</span>
                      <span className="text-gray-700 dark:text-gray-300 ml-1">community members</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Meet Your Founder
              </h2>
              <div className="prose dark:prose-invert">
                <p className="text-gray-800 dark:text-gray-200 mb-6 leading-relaxed text-lg">
                  Hi there! I'm Vikas, the founder of this content platform with a vision to bring together creators and their audiences. 
                  With my background in finance and passion for AI technology, I've created a space where valuable content can be shared, discovered, and monetized effectively.
                </p>
                <p className="text-gray-800 dark:text-gray-200 mb-8 leading-relaxed text-lg">
                  My goal is to empower creators with the tools they need to reach their audience and build sustainable businesses. 
                  I believe in the power of AI to enhance content discovery and engagement, creating meaningful connections between creators and their communities.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 elevation-2">
                  <div className="text-2xl font-bold text-primary-600">3+</div>
                  <div className="text-sm text-gray-800 dark:text-gray-200">Years Experience</div>
                </div>
                <div className="text-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 elevation-2">
                  <div className="text-2xl font-bold text-primary-600">50+</div>
                  <div className="text-sm text-gray-800 dark:text-gray-200">Creator Partners</div>
                </div>
                <div className="text-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 elevation-2">
                  <div className="text-2xl font-bold text-primary-600">15k+</div>
                  <div className="text-sm text-gray-800 dark:text-gray-200">Community Members</div>
                </div>
                <div className="text-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 elevation-2">
                  <div className="text-2xl font-bold text-primary-600">4.9</div>
                  <div className="text-sm text-gray-800 dark:text-gray-200">Platform Rating</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://twitter.com/vikascreator" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-600"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  Twitter
                </a>
                <a 
                  href="https://instagram.com/vikascreator" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-600"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                  Instagram
                </a>
                <a 
                  href="https://www.linkedin.com/in/vikas-sahani-727420358" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-600"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-16 bg-gradient-to-r from-accent-600 to-accent-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community Today</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white text-lg">
            Whether you're looking to share your knowledge or discover new skills, BoltDesk is the perfect platform for creators and learners alike.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-accent-700 hover:bg-gray-100 shadow-xl hover:shadow-2xl font-medium elevation-4"
              onClick={() => navigate('/login')}
            >
              Join as Creator
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 border-2 font-medium elevation-2"
              onClick={() => {
                const contentSection = document.getElementById('featured-content');
                if (contentSection) {
                  contentSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Browse Content
            </Button>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full border border-gray-200 dark:border-gray-700 elevation-5">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">BoltDesk: How It Works</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setVideoModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/je9FwLgG9sc?si=XyDhT3lF-JlqDe_j"
                title="BoltDesk Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;