import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, User, Bot, Video, MessageSquare, Calendar, ShoppingCart, GraduationCap as Graduation, Trophy, Rocket, BookOpen, Lightbulb, Mic, Sparkles, ArrowRight, Heart, Palette, Info, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Player } from '@lottiefiles/react-lottie-player';
import { useAppStore } from '../../store';
import { useToast } from '../../hooks/useToast';

interface SetupWizardProps {
  onComplete: () => void;
  onSkip?: () => void;
}

// Voice options for the AI assistant
const voiceOptions = [
  { id: 'female-1', name: 'Sofia', gender: 'Female', accent: 'American', sample: 'https://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3' },
  { id: 'male-1', name: 'James', gender: 'Male', accent: 'British', sample: 'https://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3' },
  { id: 'female-2', name: 'Emily', gender: 'Female', accent: 'Australian', sample: 'https://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3' },
  { id: 'male-2', name: 'Alex', gender: 'Male', accent: 'American', sample: 'https://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3' },
  { id: 'female-3', name: 'Zoe', gender: 'Female', accent: 'British', sample: 'https://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3' },
];

// Avatar options for the AI assistant
const avatarOptions = [
  { id: 'avatar-1', src: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: 'avatar-2', src: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: 'avatar-3', src: 'https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: 'avatar-4', src: 'https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: 'avatar-5', src: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=150' },
];

// Niche options for the creator portal
const nicheOptions = [
  { id: 'coach', label: 'Coach', icon: Trophy, color: 'text-amber-500', description: 'For coaches helping others achieve their goals' },
  { id: 'educator', label: 'Educator', icon: Graduation, color: 'text-blue-500', description: 'For teachers, course creators, and educators' },
  { id: 'creator', label: 'Content Creator', icon: Video, color: 'text-purple-500', description: 'For online content creators and influencers' },
  { id: 'consultant', label: 'Consultant', icon: Lightbulb, color: 'text-yellow-500', description: 'For professional consultants and advisors' },
  { id: 'founder', label: 'Startup Founder', icon: Rocket, color: 'text-red-500', description: 'For entrepreneurs and startup founders' },
  { id: 'author', label: 'Author/Writer', icon: BookOpen, color: 'text-green-500', description: 'For authors, writers, and publishers' },
];

// Service options that can be offered through the portal
const serviceOptions = [
  { id: 'booking', label: 'Book Calls & Consultations', icon: Calendar, description: 'Allow clients to schedule 1-on-1 sessions' },
  { id: 'courses', label: 'Sell Online Courses', icon: Graduation, description: 'Create and monetize educational content' },
  { id: 'digital', label: 'Digital Products & Downloads', icon: ShoppingCart, description: 'Offer templates, guides, and digital assets' },
  { id: 'community', label: 'Community Membership', icon: User, description: 'Build a paid community with exclusive content' },
  { id: 'ai', label: 'AI Assistant Services', icon: Bot, description: 'Provide AI-powered assistance to your audience' },
  { id: 'content', label: 'Premium Content', icon: BookOpen, description: 'Monetize articles, videos, and other content' },
];

export const SetupWizard: React.FC<SetupWizardProps> = ({ onComplete, onSkip }) => {
  // Access the app store and toast notifications
  const { currentUser, setCurrentUser } = useAppStore();
  const { success, error, info } = useToast();

  // Form state
  const [step, setStep] = useState(1);
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string>('female-1');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [portalName, setPortalName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('Hi there! I\'m your AI assistant. How can I help you today?');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  
  // Audio player ref
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  
  const totalSteps = 4;
  
  // Handle next button click
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Final step completion
      setIsGenerating(true);
      
      // Create a new customized user object with selected options
      if (currentUser && currentUser.role === 'creator') {
        const updatedUser = {
          ...currentUser,
          portalName: portalName || `${currentUser.name}'s Portal`,
          customizations: {
            ...currentUser.customizations,
            aiAgentName: portalName ? `${portalName} Assistant` : currentUser.customizations.aiAgentName,
            aiVoiceId: selectedVoice,
            aiAvatar: selectedAvatar ? avatarOptions.find(a => a.id === selectedAvatar)?.src : undefined,
          },
          // You could add more customizations here based on niche and services
          services: selectedServices,
          niche: selectedNiche,
        };
        
        // Update the user in the store
        setCurrentUser(updatedUser);
        
        // Show success message with some delay
        setTimeout(() => {
          setIsGenerating(false);
          setPortalReady(true);
          success(`Your AI-powered creator portal has been set up successfully!`);
        }, 3000);
        
        // Complete the setup process after showing completion screen
        setTimeout(() => {
          onComplete();
        }, 5000);
      } else {
        error('Unable to update user information. Please try again.');
        setIsGenerating(false);
      }
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };
  
  // Play voice sample
  const handlePlayVoiceSample = () => {
    try {
      if (audioRef.current) {
        const selectedVoiceOption = voiceOptions.find(v => v.id === selectedVoice);
        if (selectedVoiceOption && selectedVoiceOption.sample) {
          audioRef.current.src = selectedVoiceOption.sample;
          audioRef.current.play().then(() => {
            setIsPlaying(true);
            setAudioError(false);
          }).catch(err => {
            console.error('Audio play error:', err);
            setAudioError(true);
            info('Audio sample couldn\'t be played. Try again later.');
          });
        }
      }
    } catch (err) {
      setAudioError(true);
      info('Audio sample couldn\'t be played. Try again later.');
    }
  };
  
  // Stop voice sample
  const handleStopVoiceSample = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };
  
  // Validate current step
  const isStepComplete = () => {
    switch(step) {
      case 1:
        return selectedNiche !== null && portalName.length > 0;
      case 2:
        return selectedAvatar !== null;
      case 3:
        return selectedServices.length > 0;
      case 4:
        return true; // Preview is always valid
      default:
        return false;
    }
  };
  
  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Auto-pause audio when changing voice
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [selectedVoice]);
  
  // Get niche information
  const getNicheInfo = () => {
    return nicheOptions.find(niche => niche.id === selectedNiche);
  };
  
  // Get selected services information
  const getSelectedServicesInfo = () => {
    return serviceOptions.filter(service => selectedServices.includes(service.id));
  };
  
  // Get selected avatar
  const getSelectedAvatar = () => {
    return avatarOptions.find(avatar => avatar.id === selectedAvatar)?.src;
  };
  
  // Render content for each step
  const renderStepContent = () => {
    switch(step) {
      case 1: // Portal Basics
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Portal Basics</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Let's start by setting up your portal's identity
              </p>
            </div>
            
            {/* Portal Name */}
            <div className="space-y-2">
              <label htmlFor="portal-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Portal Name <span className="text-red-500">*</span>
              </label>
              <input
                id="portal-name"
                type="text"
                value={portalName}
                onChange={(e) => setPortalName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                placeholder="E.g., Alex's Coding Academy"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This will be the name of your creator portal
              </p>
            </div>
            
            <div className="space-y-2 mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                What's your niche? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {nicheOptions.map((niche) => (
                  <motion.div
                    key={niche.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      p-4 rounded-xl cursor-pointer border-2 transition-all
                      ${selectedNiche === niche.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}
                    `}
                    onClick={() => setSelectedNiche(niche.id)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`h-12 w-12 rounded-full ${selectedNiche === niche.id ? 'bg-primary/10' : 'bg-gray-100 dark:bg-gray-800'} flex items-center justify-center mb-3`}>
                        <niche.icon className={`h-6 w-6 ${selectedNiche === niche.id ? 'text-primary' : niche.color}`} />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{niche.label}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{niche.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start mt-6">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Your niche helps us customize your AI assistant's knowledge, site templates, and service offerings to best fit your audience's needs.
              </p>
            </div>
          </motion.div>
        );
        
      case 2: // AI Persona
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Your AI Persona</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Choose an avatar and voice for your AI assistant
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Avatar <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8">
                {avatarOptions.map((avatar) => (
                  <motion.div
                    key={avatar.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative cursor-pointer rounded-lg overflow-hidden ${
                      selectedAvatar === avatar.id ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600'
                    }`}
                    onClick={() => setSelectedAvatar(avatar.id)}
                  >
                    <img 
                      src={avatar.src} 
                      alt="AI Avatar option" 
                      className="w-full h-32 object-cover"
                    />
                    {selectedAvatar === avatar.id && (
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="voice-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Voice (powered by ElevenLabs)
                </label>
                {audioError && (
                  <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    Audio playback unavailable
                  </div>
                )}
              </div>
              <select
                id="voice-select"
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-700"
              >
                {voiceOptions.map((voice) => (
                  <option key={voice.id} value={voice.id}>
                    {voice.name} ({voice.gender}, {voice.accent})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="welcome-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Welcome Message
              </label>
              <textarea
                id="welcome-message"
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-700 min-h-24"
                placeholder="Enter a welcome message for your AI assistant..."
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                This is the first message users will see when they interact with your AI assistant
              </p>
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                  <Mic className="mr-2 h-4 w-4 text-gray-500" />
                  Voice Sample
                </h4>
                <div className="flex">
                  {isPlaying ? (
                    <Button variant="outline" size="sm" onClick={handleStopVoiceSample}>
                      Stop
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={handlePlayVoiceSample}>
                      Play Sample
                    </Button>
                  )}
                </div>
              </div>
              <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-primary h-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: isPlaying ? ['0%', '100%', '0%'] : '0%',
                    transition: { duration: isPlaying ? 3 : 0, repeat: isPlaying ? Infinity : 0 }
                  }}
                />
              </div>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Preview: "{voiceOptions.find(v => v.id === selectedVoice)?.sampleText || welcomeMessage}"
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start mt-4">
              <Mic className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Your AI assistant will use this voice to interact with your audience, making conversations more engaging and personal.
              </p>
            </div>
          </motion.div>
        );
        
      case 3: // Services
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Choose Your Services</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Select the services you want to offer through your portal <span className="text-red-500">*</span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceOptions.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    p-4 rounded-xl cursor-pointer border-2 transition-all
                    ${selectedServices.includes(service.id) 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 dark:border-gray-700'}
                  `}
                  onClick={() => toggleService(service.id)}
                >
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full ${selectedServices.includes(service.id) ? 'bg-primary/10' : 'bg-gray-100 dark:bg-gray-800'} flex items-center justify-center mr-4`}>
                      <service.icon className={`h-5 w-5 ${selectedServices.includes(service.id) ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {service.label}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {service.description}
                      </p>
                    </div>
                    <div className="ml-auto">
                      {selectedServices.includes(service.id) ? (
                        <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center">
                          <Check className="h-3 w-3" />
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {selectedServices.length === 0 && (
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 mr-2" />
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Please select at least one service to continue
                </p>
              </div>
            )}
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start mt-6">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  Each service will have a dedicated section on your portal, powered by specialized AI to handle bookings, sales, and customer support.
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-300 mt-2">
                  You can customize and add more services later.
                </p>
              </div>
            </div>
          </motion.div>
        );
        
      case 4: // Preview
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Preview Your Portal</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Here's what your AI-powered creator portal will look like
              </p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <div className="bg-primary/10 p-4 flex items-center border-b border-gray-200 dark:border-gray-700">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {portalName || currentUser?.name + "'s Portal"}
                </span>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-primary/20">
                    {selectedAvatar ? (
                      <img 
                        src={getSelectedAvatar()} 
                        alt="Selected AI avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <User className="h-10 w-10 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {portalName || `Your ${getNicheInfo()?.label || 'Creator'} Portal`}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Powered by BoltDesk AI Assistant
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {getSelectedServicesInfo().map((service) => (
                    <div 
                      key={service.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <service.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {service.label}
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-primary/5">
                  <div className="flex items-start gap-3">
                    <Bot className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Your AI Assistant
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {welcomeMessage}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Voice: {voiceOptions.find(v => v.id === selectedVoice)?.name} ({voiceOptions.find(v => v.id === selectedVoice)?.accent})
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Metrics Preview */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-primary">24/7</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Availability</div>
              </div>
              <div className="bg-secondary/5 dark:bg-secondary/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-secondary">100%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">AI Powered</div>
              </div>
              <div className="bg-accent/5 dark:bg-accent/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-accent">5+ mins</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Saved/Visit</div>
              </div>
              <div className="bg-amber-500/5 dark:bg-amber-500/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-amber-500">30%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Conv. Rate</div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };
  
  // Render final completion step
  const renderFinalStep = () => {
    if (isGenerating) {
      return (
        <motion.div 
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="mb-6">
            <Player
              autoplay
              loop
              src="https://assets8.lottiefiles.com/packages/lf20_xyls8bnq.json"
              style={{ height: '200px', width: '200px' }}
            />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Building Your AI-Powered Portal
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            We're training your AI assistant and customizing your portal based on your preferences. This will just take a moment...
          </p>
          
          {/* Progress indicators */}
          <div className="max-w-md mx-auto mt-8">
            <div className="space-y-3">
              {[
                { label: 'Initializing your portal', delay: 0 },
                { label: 'Setting up your AI assistant', delay: 0.5 },
                { label: 'Customizing services', delay: 1 },
                { label: 'Finalizing setup', delay: 1.5 }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: step.delay }}
                >
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {step.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      );
    }
    
    if (portalReady) {
      return (
        <motion.div 
          className="text-center py-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="mb-6">
            <Player
              autoplay
              loop
              src="https://assets2.lottiefiles.com/packages/lf20_jbrw3hcz.json"
              style={{ height: '200px', width: '200px' }}
            />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your Portal is Ready!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
            Your AI-powered creator portal has been successfully set up. You're ready to connect with your audience like never before!
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            className="px-8"
            leftIcon={<Rocket size={18} />}
            onClick={onComplete}
          >
            Launch Your Portal
          </Button>
        </motion.div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden max-w-3xl w-full">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <Rocket className="mr-2 h-5 w-5 text-primary" />
          Create Your AI-Powered Creator Portal
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onSkip}
        >
          Skip
        </Button>
      </div>
      
      {/* Progress Steps */}
      {!isGenerating && !portalReady && (
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between mb-8">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div 
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${index + 1 < step 
                        ? 'bg-primary text-white' 
                        : index + 1 === step
                          ? 'bg-primary/10 text-primary border-2 border-primary'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
                    `}
                    onClick={() => {
                      // Allow navigation to previous steps
                      if (index + 1 < step) {
                        setStep(index + 1);
                      }
                    }}
                    style={{ cursor: index + 1 < step ? 'pointer' : 'default' }}
                  >
                    {index + 1 < step ? <Check size={14} /> : index + 1}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {index === 0 ? 'Basics' : 
                     index === 1 ? 'AI Persona' :
                     index === 2 ? 'Services' : 'Preview'}
                  </span>
                </div>
                {index < totalSteps - 1 && (
                  <div className={`w-full h-1 ${
                    index + 1 < step ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      
      <div className="p-6">
        {isGenerating || portalReady ? (
          renderFinalStep()
        ) : (
          <AnimatePresence mode="wait">
            <div key={`step-${step}`}>
              {renderStepContent()}
            </div>
          </AnimatePresence>
        )}
      </div>
      
      {!isGenerating && !portalReady && (
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            leftIcon={<ChevronLeft size={16} />}
            disabled={step === 1}
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            rightIcon={<ChevronRight size={16} />}
            disabled={!isStepComplete()}
          >
            {step === totalSteps ? 'Create Portal' : 'Next'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SetupWizard;