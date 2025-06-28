import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  Bot, 
  Palette, 
  Users, 
  Rocket
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
  const { success } = useToast();
  
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
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fixed fullscreen backdrop with high z-index */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          
          {/* Absolutely centered modal container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed z-[101] inset-0 flex items-center justify-center p-4 max-h-screen"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-4xl max-h-[90vh] overflow-auto">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30"
                aria-label="Close setup wizard"
              >
                <X className="h-5 w-5" />
              </Button>
              
              <SetupWizard onComplete={handleComplete} onSkip={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SetupWizardPortal;