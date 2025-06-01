import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  User,
  Bot,
  Calendar, 
  Upload,
  Rocket,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/Button';

interface GuidedTourProps {
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const tourSteps = [
  {
    id: 1,
    title: 'Set up your avatar',
    description: 'Create your AI assistant\'s avatar and voice to represent you when you're not available.',
    position: { top: '30%', left: '30%' },
    icon: User,
    width: 300
  },
  {
    id: 2,
    title: 'Add services & links',
    description: 'Configure what services you offer and how clients can book or purchase them.',
    position: { top: '40%', right: '20%' },
    icon: Calendar,
    width: 280
  },
  {
    id: 3,
    title: 'Train your AI',
    description: 'Upload content and FAQs so your AI assistant can accurately represent you.',
    position: { top: '60%', left: '25%' },
    icon: Bot,
    width: 300
  },
  {
    id: 4,
    title: 'Deploy your portal',
    description: 'Launch your creator portal and share it with your audience.',
    position: { bottom: '20%', right: '30%' },
    icon: Rocket,
    width: 280
  }
];

export const GuidedTour: React.FC<GuidedTourProps> = ({ isActive, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isNarrating, setIsNarrating] = useState(false);
  const maxSteps = tourSteps.length;
  
  useEffect(() => {
    if (!isActive) {
      setCurrentStep(1);
    }
  }, [isActive]);
  
  const handleNext = () => {
    if (currentStep < maxSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const toggleNarration = () => {
    setIsNarrating(!isNarrating);
  };
  
  const getCurrentStep = () => {
    return tourSteps.find(step => step.id === currentStep) || tourSteps[0];
  };
  
  const step = getCurrentStep();
  const positionStyle: React.CSSProperties = {
    ...step.position,
    position: 'absolute',
  };
  
  if (!isActive) return null;
  
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Overlay with clickthrough */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      {/* Step indicator */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 pointer-events-auto">
        {tourSteps.map((step) => (
          <motion.div
            key={step.id}
            className={`h-3 w-3 rounded-full transition-colors ${
              step.id === currentStep 
                ? 'bg-primary' 
                : step.id < currentStep
                  ? 'bg-gray-400 dark:bg-gray-500'
                  : 'bg-gray-200 dark:bg-gray-700'
            }`}
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 500 }}
            onClick={() => setCurrentStep(step.id)}
            style={{ cursor: 'pointer' }}
          />
        ))}
        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium ml-2">
          {currentStep} of {maxSteps}
        </span>
      </div>
      
      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`step-${currentStep}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl pointer-events-auto"
          style={{
            ...positionStyle,
            width: step.width,
            zIndex: 60
          }}
        >
          <div className="relative">
            {/* Number indicator */}
            <div 
              className="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg"
              style={{ zIndex: 2 }}
            >
              {step.id}
            </div>
            
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                  <step.icon className="h-5 w-5 text-primary mr-2" />
                  {step.title}
                </h3>
                <button 
                  onClick={onSkip}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {step.description}
              </p>
              
              {/* AI Narration Button */}
              <button
                onClick={toggleNarration}
                className="flex items-center gap-2 text-primary text-sm mb-4"
              >
                <Bot className="h-4 w-4" />
                {isNarrating ? 'Stop AI narration' : 'Start AI narration'}
              </button>
              
              {/* Animation for current step */}
              <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                {currentStep === 1 && (
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="flex flex-col items-center"
                  >
                    <User className="h-10 w-10 text-primary mb-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Setup your avatar</span>
                  </motion.div>
                )}
                
                {currentStep === 2 && (
                  <motion.div
                    animate={{ 
                      x: [-10, 10, -10],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center"
                  >
                    <Calendar className="h-10 w-10 text-primary mb-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Configure services</span>
                  </motion.div>
                )}
                
                {currentStep === 3 && (
                  <motion.div
                    animate={{ 
                      y: [-5, 5, -5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center"
                  >
                    <Upload className="h-10 w-10 text-primary mb-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Upload content</span>
                  </motion.div>
                )}
                
                {currentStep === 4 && (
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center"
                  >
                    <Rocket className="h-10 w-10 text-primary mb-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Launch your portal</span>
                  </motion.div>
                )}
              </div>
              
              {/* AI narration player */}
              <AnimatePresence>
                {isNarrating && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4"
                  >
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center">
                      <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                      <div>
                        <p className="text-xs text-blue-800 dark:text-blue-300">
                          {currentStep === 1 && "AI Voice: \"Choose an avatar that represents your brand. You can use a professional photo or an AI-generated avatar.""}
                          {currentStep === 2 && "AI Voice: \"Configure the services you want to offer your clients, such as bookings, digital products, or memberships.""}
                          {currentStep === 3 && "AI Voice: \"Upload your content or FAQs to train your AI assistant to accurately represent your knowledge and style.""}
                          {currentStep === 4 && "AI Voice: \"Your portal is ready to deploy! Choose your domain and share it with your audience.""}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Navigation Controls */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  leftIcon={<ChevronLeft size={16} />}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={handleNext}
                  rightIcon={currentStep === maxSteps ? <Check size={16} /> : <ChevronRight size={16} />}
                >
                  {currentStep === maxSteps ? 'Complete' : 'Next'}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Connecting Line */}
          <div 
            className="absolute h-10 w-px bg-primary"
            style={{
              left: '50%',
              top: currentStep % 2 === 0 ? '-10px' : 'auto',
              bottom: currentStep % 2 === 1 ? '-10px' : 'auto',
              transform: 'translateX(-50%)'
            }}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Skip button */}
      <div className="absolute bottom-6 right-6 pointer-events-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={onSkip}
        >
          Skip Tour
        </Button>
      </div>
    </div>
  );
};

export default GuidedTour;