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
import SetupWizard from '../onboarding/SetupWizard';

interface SetupWizardPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SetupWizardPortal: React.FC<SetupWizardPortalProps> = ({ isOpen, onClose }) => {
  const [wizardCompleted, setWizardCompleted] = useState(false);
  
  const handleComplete = () => {
    setWizardCompleted(true);
    setTimeout(() => {
      onClose();
      setWizardCompleted(false);
    }, 1500);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-h-[90vh] overflow-hidden rounded-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm text-white rounded-full p-1.5 hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <SetupWizard onComplete={handleComplete} onSkip={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SetupWizardPortal;