import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Calendar, 
  ShoppingCart, 
  BookOpen, 
  User, 
  Send, 
  Clock,
  Info,
  ChevronRight,
  Play,
  Pause,
  MessageSquare,
  X,
  Heart,
  BarChart4,
  Video
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';

interface CreatorPortalPreviewProps {
  creatorName?: string;
  creatorAvatar?: string;
  creatorNiche?: string;
}

export const CreatorPortalPreview: React.FC<CreatorPortalPreviewProps> = ({
  creatorName = "Alex Creator",
  creatorAvatar = "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
  creatorNiche = "Educator",
}) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{sender: 'user' | 'ai', text: string, timestamp: Date}[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { success, info } = useToast();
  
  useEffect(() => {
    // Scroll to bottom of chat when new messages are added
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  useEffect(() => {
    // Handle video play/pause based on state
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.play().catch(err => {
          console.error('Video play failed:', err);
          setIsVideoPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVideoPlaying]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    // Add user message
    setChatMessages([...chatMessages, {
      sender: 'user',
      text: message,
      timestamp: new Date()
    }]);
    
    setMessage('');
    setIsAiTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      let response = '';
      
      // Generate different responses based on user input
      if (message.toLowerCase().includes('pricing') || message.toLowerCase().includes('cost')) {
        response = "Sure! I offer 3 plans — Starter ($49/month), Pro ($99/month), and VIP ($199/month). The Starter plan includes basic access to content and community features. The Pro plan adds personalized coaching and premium resources. The VIP plan includes 1-on-1 sessions and early access to new content. Would you like more details on any specific plan?";
      } else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi') || message.toLowerCase().includes('hey')) {
        response = `Hi there! I'm the AI assistant for ${creatorName}'s portal. I can help you with information about courses, booking sessions, or answering questions. What can I help you with today?`;
      } else if (message.toLowerCase().includes('book') || message.toLowerCase().includes('appointment') || message.toLowerCase().includes('session')) {
        response = `I'd be happy to help you book a session! ${creatorName} has availability next Tuesday at 2pm and Thursday at 10am. Would either of those work for you? Or I can show you the full calendar.`;
      } else {
        response = `Thanks for your message! I understand you're asking about "${message}". ${creatorName} has created several resources on this topic. Would you like me to share some links to relevant content, or would you prefer to schedule a personal consultation?`;
      }
      
      setChatMessages(prev => [...prev, {
        sender: 'ai',
        text: response,
        timestamp: new Date()
      }]);
      
      setIsAiTyping(false);
    }, 1500);
  };

  const handleVideoToggle = () => {
    setIsVideoPlaying(!isVideoPlaying);
    if (!isVideoPlaying) {
      info('Video playback started');
    } else {
      info('Video playback paused');
    }
  };

  const handleBookingClick = (sessionType: string) => {
    success(`Redirecting to book ${sessionType}...`);
  };

  const handleResourceClick = (resourceName: string) => {
    info(`Opening ${resourceName}...`);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full overflow-hidden border-4 border-white/30">
            <img 
              src={creatorAvatar} 
              alt={creatorName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{creatorName}</h2>
            <p className="text-white/80">{creatorNiche} & Content Creator</p>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="p-6 grid grid-cols-12 gap-6">
        {/* Left column */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* AI Avatar Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="relative">
              {/* Video container */}
              <div className="aspect-video bg-gray-900 overflow-hidden">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full flex items-center justify-center relative"
                >
                  <video
                    ref={videoRef}
                    width="100%"
                    height="100%"
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full"
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                  >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-in-a-living-room-5611-large.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Video controls overlay */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                      onClick={handleVideoToggle}
                    >
                      {isVideoPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                      onClick={() => info('Video quality settings coming soon!')}
                    >
                      <Video size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
              
              {/* Caption */}
              <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-lg mb-2 text-gray-900 dark:text-white">
                  Welcome to my portal!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  I'm excited to share my knowledge and resources with you. Feel free to browse my content, 
                  book a session, or ask my AI assistant any questions you might have.
                </p>
              </div>
              
              {/* AI Assistant button */}
              <button
                onClick={() => setChatOpen(true)}
                className="absolute top-4 right-4 bg-white dark:bg-gray-800 text-primary shadow-lg rounded-full p-2 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Bot size={20} className="mr-2" />
                <span className="text-sm font-medium">Ask me anything</span>
              </button>
            </div>
          </div>
          
          {/* Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Book Me Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Calendar size={20} />
                </div>
                <h3 className="font-medium text-lg text-gray-900 dark:text-white">Book a Session</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <div 
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => handleBookingClick('Strategy Call')}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Strategy Call
                    </span>
                    <span className="text-primary text-sm">30 min (20% commission)</span>
                  </div>
                </div>
                <div 
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => handleBookingClick('Deep Dive Session')}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Deep Dive Session
                    </span>
                    <span className="text-primary text-sm">60 min (25% commission)</span>
                  </div>
                </div>
                <div 
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => handleBookingClick('VIP Experience')}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900 dark:text-white">
                      VIP Experience
                    </span>
                    <span className="text-primary text-sm">90 min (30% commission)</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full" onClick={() => success('Redirecting to calendar...')}>
                View Calendar
              </Button>
            </div>
            
            {/* AI Answers Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <MessageSquare size={20} />
                </div>
                <h3 className="font-medium text-lg text-gray-900 dark:text-white">My AI Answers</h3>
              </div>
              
              <div className="space-y-3 mb-4 max-h-[165px] overflow-y-auto">
                <div 
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => handleResourceClick('Getting Started Guide')}
                >
                  <div className="text-sm text-gray-900 dark:text-white font-medium mb-1">How do I get started?</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Begin by exploring the available resources or booking an intro call...</div>
                </div>
                <div 
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => handleResourceClick('Services Overview')}
                >
                  <div className="text-sm text-gray-900 dark:text-white font-medium mb-1">What services do you offer?</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">I provide coaching sessions, online courses, and downloadable resources...</div>
                </div>
                <div 
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => handleResourceClick('Refund Policy')}
                >
                  <div className="text-sm text-gray-900 dark:text-white font-medium mb-1">What's your refund policy?</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">All digital products come with a 30-day money-back guarantee...</div>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setChatOpen(true)}
                leftIcon={<Bot size={16} />}
              >
                Ask a Question
              </Button>
            </div>
          </div>
          
          {/* Courses/Resources Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <BookOpen size={20} />
                </div>
                <h3 className="font-medium text-lg text-gray-900 dark:text-white">Courses & Resources</h3>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => success('Redirecting to content library...')}
              >
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={() => handleResourceClick('AI Fundamentals Course')}
              >
                <div className="flex items-start gap-3">
                  <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Beginner's Guide to AI</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      A comprehensive introduction to artificial intelligence
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded">
                        15% Commission
                      </div>
                      <div className="text-xs text-gray-500">•</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock size={10} className="mr-1" />
                        2 hours
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div 
                className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={() => handleResourceClick('Advanced Content Creation Course')}
              >
                <div className="flex items-start gap-3">
                  <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Advanced Content Creation</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Master the art of creating engaging digital content
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded">
                        25% Commission
                      </div>
                      <div className="text-xs text-gray-500">•</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock size={10} className="mr-1" />
                        5 hours
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* About Me Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <User size={20} />
              </div>
              <h3 className="font-medium text-lg text-gray-900 dark:text-white">About Me</h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Hi there! I'm a passionate {creatorNiche.toLowerCase()} with years of experience 
              helping people achieve their goals. I focus on practical strategies that get real results.
            </p>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Experience</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">10+ years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Students/Clients</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">5,000+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Satisfaction Rate</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">99%</span>
              </div>
            </div>
            
            <Button
              variant="outline"
              className="w-full mt-4"
              rightIcon={<ChevronRight size={16} />}
              onClick={() => info('Opening full bio...')}
            >
              Read Full Bio
            </Button>
          </div>
          
          {/* Merch Store */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                <ShoppingCart size={20} />
              </div>
              <h3 className="font-medium text-lg text-gray-900 dark:text-white">Merch Store</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div 
                className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => handleResourceClick('Branded Mug')}
              >
                <div className="bg-gray-200 dark:bg-gray-600 rounded-md aspect-square mb-2 flex items-center justify-center">
                  <ShoppingCart size={24} className="text-gray-400 dark:text-gray-500" />
                </div>
                <div className="text-xs font-medium text-gray-900 dark:text-white">Branded Mug</div>
                <div className="text-xs text-primary mt-1">20% Commission</div>
              </div>
              
              <div 
                className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => handleResourceClick('Premium Tee')}
              >
                <div className="bg-gray-200 dark:bg-gray-600 rounded-md aspect-square mb-2 flex items-center justify-center">
                  <ShoppingCart size={24} className="text-gray-400 dark:text-gray-500" />
                </div>
                <div className="text-xs font-medium text-gray-900 dark:text-white">Premium Tee</div>
                <div className="text-xs text-primary mt-1">25% Commission</div>
              </div>
            </div>
            
            <Button
              variant="outline"
              className="w-full"
              rightIcon={<ChevronRight size={16} />}
              onClick={() => success('Redirecting to merch store...')}
            >
              Browse All Merch
            </Button>
          </div>
          
          {/* Newsletter */}
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-4 border border-primary/20 dark:border-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Heart size={20} />
              </div>
              <h3 className="font-medium text-lg text-gray-900 dark:text-white">Join My Community</h3>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to get weekly tips, resources, and exclusive offers.
            </p>
            
            <div className="flex gap-2 mb-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm"
              />
              <Button onClick={() => success('Successfully subscribed!')}>Subscribe</Button>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              I respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
      
      {/* AI Assistant Chat */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-30 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{ maxHeight: 'calc(100vh - 100px)' }}
          >
            <div className="p-4 bg-primary text-white flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full overflow-hidden mr-2 border border-white/30">
                  <img 
                    src={creatorAvatar} 
                    alt="AI Assistant Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium">{creatorName}'s Assistant</h3>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: '350px' }}>
              {/* Welcome message */}
              <div className="flex">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    Hey there! 👋 I'm your AI assistant. Ask me anything about {creatorName}'s content, services, or how to get started!
                  </p>
                </div>
              </div>
              
              {/* Chat messages */}
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`rounded-lg p-3 max-w-[80%] ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* AI Typing indicator */}
              {isAiTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                    <div className="flex space-x-1 items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Bottom anchor for auto-scrolling */}
              <div ref={chatEndRef} />
            </div>
            
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-gray-700 flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 rounded-l-lg border-l border-t border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
              />
              <Button
                type="submit"
                variant="primary"
                className="rounded-l-none"
                disabled={message.trim() === '' || isAiTyping}
              >
                <Send size={16} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* AI Assistant Floating Button */}
      {!chatOpen && (
        <div className="fixed bottom-6 right-6 z-30">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChatOpen(true)}
            className="h-14 w-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
          >
            <Bot size={24} />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default CreatorPortalPreview;