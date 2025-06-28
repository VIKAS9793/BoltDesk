import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, User, Bot, Video, MessageSquare, Calendar, ShoppingCart, GraduationCap as Graduation, Trophy, Rocket, BookOpen, Lightbulb, Mic, Sparkles, ArrowRight, Heart, Palette, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Player } from '@lottiefiles/react-lottie-player';
import { useAppStore } from '../../store';
import { useToast } from '../../hooks/useToast';

interface SetupWizardProps {
  onComplete: () => void;
  onSkip?: () => void;
}

const voiceOptions = [
  { id: 'female-1', name: 'Sofia', gender: 'Female', accent: 'American' },
  { id: 'male-1', name: 'James', gender: 'Male', accent: 'British' },
  { id: 'female-2', name: 'Emily', gender: 'Female', accent: 'Australian' },
  { id: 'male-2', name: 'Alex', gender: 'Male', accent: 'American' },
  { id: 'female-3', name: 'Zoe', gender: 'Female', accent: 'British' },
];

const avatarOptions = [
  { id: 'avatar-1', src: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: 'avatar-2', src: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: 'avatar-3', src: 'https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: 'avatar-4', src: 'https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: 'avatar-5', src: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=150' },
];

const nicheOptions = [
  { id: 'coach', label: 'Coach', icon: Trophy, color: 'text-amber-500', bgColor: 'bg-amber-100' },
  { id: 'educator', label: 'Educator', icon: Graduation, color: 'text-blue-500', bgColor: 'bg-blue-100' },
  { id: 'creator', label: 'Content Creator', icon: Video, color: 'text-purple-500', bgColor: 'bg-purple-100' },
  { id: 'consultant', label: 'Consultant', icon: Lightbulb, color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
  { id: 'founder', label: 'Startup Founder', icon: Rocket, color: 'text-red-500', bgColor: 'bg-red-100' },
  { id: 'author', label: 'Author/Writer', icon: BookOpen, color: 'text-green-500', bgColor: 'bg-green-100' },
];

const serviceOptions = [
  { id: 'booking', label: 'Book Calls & Consultations', icon: Calendar },
  { id: 'courses', label: 'Sell Online Courses', icon: Graduation },
  { id: 'digital', label: 'Digital Products & Downloads', icon: ShoppingCart },
  { id: 'community', label: 'Community Membership', icon: User },
  { id: 'ai', label: 'AI Assistant Services', icon: Bot },
  { id: 'content', label: 'Premium Content', icon: BookOpen },
];

export const SetupWizard: React.FC<SetupWizardProps> = ({ onComplete, onSkip }) => {
  const { currentUser, setCurrentUser } = useAppStore();
  const { info } = useToast();
  
  const [step, setStep] = useState(1);
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string>('female-1');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [portalName, setPortalName] = useState(currentUser?.portalName || '');
  const [isNarrating, setIsNarrating] = useState(false);
  
  // Debug logs
  useEffect(() => {
    console.log("Step:", step);
    console.log("Selected Niche:", selectedNiche);
    console.log("Selected Avatar:", selectedAvatar);
    console.log("Selected Services:", selectedServices);
    console.log("Portal Name:", portalName);
  }, [step, selectedNiche, selectedAvatar, selectedServices, portalName]);
  
  const totalSteps = 4;
  
  const handleNext = () => {
    if (step < totalSteps) {
      // Log the current step completion
      console.log(`Completing step ${step}, moving to step ${step + 1}`);
      info(`Step ${step} completed!`);
      setStep(step + 1);
    } else {
      // Final step completion - show loading animation
      console.log("Starting final step completion");
      setIsGenerating(true);
      
      // Simulate portal generation with user data saving
      setTimeout(() => {
        if (currentUser && currentUser.role === 'creator') {
          // Update user with selected options
          const updatedUser = {
            ...currentUser,
            portalName: portalName || `${currentUser.name}'s Portal`,
            niche: selectedNiche,
            services: selectedServices,
            customizations: {
              ...currentUser.customizations,
              aiAgentName: `${portalName} Assistant`,
              aiVoiceId: selectedVoice,
              aiAvatar: selectedAvatar ? avatarOptions.find(a => a.id === selectedAvatar)?.src : undefined
            },
            onboardingCompleted: true
          };
          
          console.log("Updating user with:", updatedUser);
          setCurrentUser(updatedUser);
        }
        
        setIsGenerating(false);
        setPortalReady(true);
      }, 3000);
      
      setTimeout(() => {
        console.log("Setup complete, calling onComplete callback");
        onComplete();
      }, 5000);
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
    console.log(`Service ${serviceId} toggled`);
  };
  
  const toggleNarration = () => {
    setIsNarrating(!isNarrating);
  };
  
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
  
  const renderStepContent = () => {
    switch(step) {
      case 1: // Portal basics
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
            <div>
              <label htmlFor="portal-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Portal Name <span className="text-red-500">*</span>
              </label>
              <input
                id="portal-name"
                type="text"
                value={portalName}
                onChange={(e) => setPortalName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="E.g., Alex's Coding Academy"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                This will be the name of your creator portal
              </p>
            </div>
            
            {/* Niche selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What's your niche? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {nicheOptions.map((niche) => (
                  <motion.div
                    key={niche.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      p-4 rounded-xl cursor-pointer border-2 transition-all shadow-sm
                      ${selectedNiche === niche.id 
                        ? 'border-primary bg-primary/10 ring-2 ring-primary shadow-md' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}
                    `}
                    onClick={() => setSelectedNiche(niche.id)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`h-12 w-12 rounded-full ${selectedNiche === niche.id ? 'bg-primary/20' : `${niche.bgColor} dark:bg-gray-800`} flex items-center justify-center mb-3`}>
                        <niche.icon className={`h-6 w-6 ${selectedNiche === niche.id ? 'text-primary' : niche.color}`} />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{niche.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {(!portalName || !selectedNiche) && (
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-center mt-4 border border-amber-200 dark:border-amber-800">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2 flex-shrink-0" />
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  {!portalName && !selectedNiche 
                    ? 'Please enter a portal name and select your niche to continue'
                    : !portalName 
                      ? 'Please enter a portal name to continue'
                      : 'Please select your niche to continue'
                  }
                </p>
              </div>
            )}
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start mt-6 border border-blue-200 dark:border-blue-800">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Your niche helps us customize your AI assistant's knowledge, site templates, and service offerings to best fit your audience's needs.
              </p>
            </div>
          </motion.div>
        );
        
      case 2: // AI persona
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
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 shadow-md ${
                      selectedAvatar === avatar.id 
                        ? 'border-primary ring-2 ring-primary shadow-primary/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedAvatar(avatar.id)}
                  >
                    <div className="aspect-square">
                      <img 
                        src={avatar.src} 
                        alt="AI Avatar option" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {selectedAvatar === avatar.id && (
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                          <Check className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="voice-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Voice (powered by ElevenLabs)
              </label>
              <select
                id="voice-select"
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {voiceOptions.map((voice) => (
                  <option key={voice.id} value={voice.id}>
                    {voice.name} ({voice.gender}, {voice.accent})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Voice Preview
                </h4>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white dark:bg-gray-800 text-primary border-primary/30 hover:bg-primary/5"
                >
                  Play Sample
                </Button>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-primary h-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: ['0%', '100%', '0%'],
                    transition: { duration: 3, repeat: 0 }
                  }}
                />
              </div>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Preview: "Hi there! I'm your AI assistant. How can I help you today?"
              </p>
            </div>
            
            {!selectedAvatar && (
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-center border border-amber-200 dark:border-amber-800">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2 flex-shrink-0" />
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Please select an avatar to continue
                </p>
              </div>
            )}
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start mt-4 border border-blue-200 dark:border-blue-800">
              <Mic className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Your AI assistant will use this voice and avatar to interact with your audience, making conversations more engaging and personal.
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
                Select the services you want to offer through your portal
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceOptions.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    p-4 rounded-xl cursor-pointer border-2 transition-all shadow-sm
                    ${selectedServices.includes(service.id) 
                      ? 'border-primary bg-primary/10 ring-2 ring-primary shadow-md' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}
                  `}
                  onClick={() => toggleService(service.id)}
                >
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full ${selectedServices.includes(service.id) ? 'bg-primary/20' : 'bg-gray-100 dark:bg-gray-800'} flex items-center justify-center mr-4`}>
                      <service.icon className={`h-5 w-5 ${selectedServices.includes(service.id) ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {service.label}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {selectedServices.includes(service.id) ? 'Added to your portal' : 'Click to add'}
                      </p>
                    </div>
                    <div className="ml-auto">
                      {selectedServices.includes(service.id) ? (
                        <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
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
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-center border border-amber-200 dark:border-amber-800">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2 flex-shrink-0" />
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Please select at least one service to continue
                </p>
              </div>
            )}
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start mt-6 border border-blue-200 dark:border-blue-800">
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
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md">
              <div className="bg-primary/10 p-4 flex items-center border-b border-gray-200 dark:border-gray-700">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {portalName || "your-creator-portal.boltdesk.ai"}
                </span>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-primary/20 shadow-md">
                    {selectedAvatar && (
                      <img 
                        src={avatarOptions.find(a => a.id === selectedAvatar)?.src || ''} 
                        alt="Selected AI avatar"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {portalName || `Your ${nicheOptions.find(n => n.id === selectedNiche)?.label || 'Creator'} Portal`}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Powered by BoltDesk AI Assistant
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {selectedServices.map((serviceId) => {
                    const service = serviceOptions.find(s => s.id === serviceId);
                    if (!service) return null;
                    
                    return (
                      <div 
                        key={serviceId}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/30 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <service.icon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {service.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-primary/5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Bot className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Your AI Assistant
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Ready to help your audience with questions about your content, services, and scheduling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Metrics Preview */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-primary/10 dark:bg-primary/10 rounded-lg p-3 text-center border border-primary/20 shadow-sm">
                <div className="text-lg font-bold text-primary">24/7</div>
                <div className="text-xs text-gray-700 dark:text-gray-300">Availability</div>
              </div>
              <div className="bg-secondary/10 dark:bg-secondary/10 rounded-lg p-3 text-center border border-secondary/20 shadow-sm">
                <div className="text-lg font-bold text-secondary">100%</div>
                <div className="text-xs text-gray-700 dark:text-gray-300">AI Powered</div>
              </div>
              <div className="bg-accent/10 dark:bg-accent/10 rounded-lg p-3 text-center border border-accent/20 shadow-sm">
                <div className="text-lg font-bold text-accent">5+ mins</div>
                <div className="text-xs text-gray-700 dark:text-gray-300">Saved/Visit</div>
              </div>
              <div className="bg-amber-500/10 dark:bg-amber-500/10 rounded-lg p-3 text-center border border-amber-500/20 shadow-sm">
                <div className="text-lg font-bold text-amber-500">30%</div>
                <div className="text-xs text-gray-700 dark:text-gray-300">Conv. Rate</div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };
  
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
            className="px-8 shadow-lg"
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden w-full max-w-4xl border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-primary" />
          Create Your AI-Powered Creator Portal
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onSkip}
          className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
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
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium shadow-md
                      ${index + 1 < step 
                        ? 'bg-primary text-white' 
                        : index + 1 === step
                          ? 'bg-primary/10 text-primary border-2 border-primary'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600'}
                    `}
                  >
                    {index + 1 < step ? <Check size={14} /> : index + 1}
                  </div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-1">
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
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
          <Button
            variant="outline"
            onClick={handleBack}
            leftIcon={<ChevronLeft size={16} />}
            disabled={step === 1}
            className="bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            rightIcon={<ChevronRight size={16} />}
            disabled={!isStepComplete()}
            className="shadow-lg hover:shadow-xl"
          >
            {step === totalSteps ? 'Create Portal' : 'Next'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SetupWizard;