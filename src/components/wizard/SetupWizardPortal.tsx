import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  Bot, 
  Palette, 
  Users, 
  Rocket,
  Info,
  Check
} from 'lucide-react';
import { useAppStore } from '../../store';
import { useToast } from '../../hooks/useToast';
import SetupWizard from '../onboarding/SetupWizard';
import { Button } from '../ui/Button';

interface SetupWizardPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SetupWizardPortal: React.FC<SetupWizardPortalProps> = ({ isOpen, onClose }) => {
  const [wizardCompleted, setWizardCompleted] = useState(false);
  const { currentUser, setCurrentUser } = useAppStore();
  const { success, info } = useToast();
  
  const handleComplete = () => {
    setWizardCompleted(true);
    success('Portal setup completed successfully!');
    
    // Log setup details (helpful for debugging)
    console.log('Portal setup completed with:', {
      user: currentUser,
    });
    
    // Redirect to dashboard after a brief delay to show the completion screen
    setTimeout(() => {
      onClose();
      setWizardCompleted(false);
    }, 1500);
  };

  // If portal is opened, log some debug info
  useEffect(() => {
    if (isOpen) {
      console.log('Setup Wizard Portal opened for user:', currentUser?.name);
    }
  }, [isOpen, currentUser]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ delay: 0.1 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
              
              {/* Info badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-white/20 backdrop-blur-sm text-white rounded-full py-1 px-3 text-sm flex items-center">
                  <Info size={14} className="mr-1" />
                  <span>{wizardCompleted ? 'Setup Complete' : 'Setup Portal'}</span>
                </div>
              </div>
              
              {/* Setup Wizard */}
              <SetupWizard onComplete={handleComplete} onSkip={onClose} />
              
              {/* Success notification */}
              <AnimatePresence>
                {wizardCompleted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center"
                  >
                    <Check size={16} className="mr-2" />
                    <span>Setup completed successfully!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SetupWizardPortal;