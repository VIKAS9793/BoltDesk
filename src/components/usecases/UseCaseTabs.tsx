import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, GraduationCap as Graduation, Video, Rocket, Bot, Calendar, ShoppingCart, MessageSquare, Heart, Bookmark, Users, Mail, Mic, ArrowRight, Globe, Link } from 'lucide-react';
import { Button } from '../ui/Button';
import CreatorPortalPreview from '../preview/CreatorPortalPreview';

const useCases = [
  { 
    id: 'coach', 
    label: 'Coach Mode', 
    icon: Trophy, 
    color: 'text-amber-500', 
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    name: 'Alex Richards',
    niche: 'Business Coach'
  },
  { 
    id: 'educator', 
    label: 'Educator Mode', 
    icon: Graduation, 
    color: 'text-blue-500', 
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    name: 'Sarah Johnson',
    niche: 'Course Creator'
  },
  { 
    id: 'creator', 
    label: 'Influencer Mode', 
    icon: Video, 
    color: 'text-purple-500', 
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    avatar: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=150',
    name: 'Ryan Peters',
    niche: 'Content Creator'
  },
  { 
    id: 'founder', 
    label: 'Solo Founder Mode', 
    icon: Rocket, 
    color: 'text-red-500', 
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    name: 'Mia Zhang',
    niche: 'Startup Founder'
  }
];

export const UseCaseTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('coach');
  
  const activeCase = useCases.find(uc => uc.id === activeTab) || useCases[0];
  
  const getServiceItems = (caseType: string) => {
    switch(caseType) {
      case 'coach':
        return [
          { name: '1:1 Coaching Sessions', icon: Calendar, description: 'Book private coaching sessions' },
          { name: 'Group Workshops', icon: Users, description: 'Join collaborative learning sessions' },
          { name: 'Resources Library', icon: Bookmark, description: 'Access premium business templates' },
          { name: 'Community Access', icon: Heart, description: 'Connect with fellow entrepreneurs' },
        ];
      case 'educator':
        return [
          { name: 'Online Courses', icon: Graduation, description: 'Self-paced learning programs' },
          { name: 'Live Workshops', icon: Video, description: 'Interactive instructor-led sessions' },
          { name: 'Study Materials', icon: Bookmark, description: 'Downloadable resources and guides' },
          { name: 'Office Hours', icon: Calendar, description: 'Weekly Q&A with the instructor' },
        ];
      case 'creator':
        return [
          { name: 'Exclusive Content', icon: Video, description: 'Behind-the-scenes and premium videos' },
          { name: 'Merchandise', icon: ShoppingCart, description: 'Official branded products' },
          { name: 'Meet & Greet', icon: Users, description: 'Virtual fan meetups' },
          { name: 'Personalized Shoutouts', icon: Mic, description: 'Custom recorded messages' },
        ];
      case 'founder':
        return [
          { name: 'Consulting Calls', icon: Calendar, description: 'Expert advice for your business' },
          { name: 'Startup Resources', icon: Bookmark, description: 'Templates, guides, and tools' },
          { name: 'Product Demos', icon: Globe, description: 'Interactive demonstrations' },
          { name: 'Investor Connect', icon: Link, description: 'Network with potential investors' },
        ];
      default:
        return [];
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Use Case Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar py-2 gap-2">
        {useCases.map((useCase) => (
          <motion.button
            key={useCase.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`
              flex items-center px-4 py-3 rounded-lg whitespace-nowrap transition-all
              ${activeTab === useCase.id
                ? `bg-${useCase.id === 'founder' ? 'red' : useCase.id === 'creator' ? 'purple' : useCase.id === 'educator' ? 'blue' : 'amber'}-500 text-white shadow-lg`
                : `bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700`
              }
            `}
            onClick={() => setActiveTab(useCase.id)}
            style={{
              backgroundColor: activeTab === useCase.id 
                ? useCase.id === 'founder' ? '#ef4444' 
                : useCase.id === 'creator' ? '#8b5cf6'
                : useCase.id === 'educator' ? '#3b82f6'
                : '#f59e0b'
                : ''
            }}
          >
            <useCase.icon className={`h-5 w-5 ${
              activeTab === useCase.id ? 'text-white' : useCase.color
            } mr-2`} />
            <span>{useCase.label}</span>
          </motion.button>
        ))}
      </div>
      
      {/* Use Case Description */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${activeCase.bgColor}`}>
            <activeCase.icon className={`h-6 w-6 ${activeCase.color}`} />
          </div>
          <div>
            <h3 className="font-medium text-lg text-gray-900 dark:text-white">
              {activeCase.label}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Optimized portal for {activeCase.id === 'coach' ? 'coaches and consultants' : 
                                     activeCase.id === 'educator' ? 'teachers and course creators' :
                                     activeCase.id === 'creator' ? 'content creators and influencers' :
                                     'entrepreneurs and startup founders'}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {getServiceItems(activeTab).map((service, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex items-start gap-3">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${activeCase.bgColor}`}>
                <service.icon className={`h-5 w-5 ${activeCase.color}`} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{service.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <Button rightIcon={<ArrowRight size={16} />}>
            Explore {activeCase.label}
          </Button>
        </div>
      </div>
      
      {/* Portal Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-4 bg-gray-50 dark:bg-gray-700/30 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white flex items-center">
            <Globe className="h-5 w-5 mr-2 text-gray-500" />
            Live Preview: {activeCase.name}'s Portal
          </h3>
        </div>
        
        <div className="p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CreatorPortalPreview 
                creatorName={activeCase.name} 
                creatorAvatar={activeCase.avatar}
                creatorNiche={activeCase.niche}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UseCaseTabs;