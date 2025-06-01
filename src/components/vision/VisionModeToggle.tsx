import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  X, 
  Plus, 
  Bot, 
  Calendar, 
  ShoppingCart, 
  Video, 
  MessageSquare,
  Move,
  Palette,
  LayoutGrid,
  Mail,
  User,
  Save,
  Share2
} from 'lucide-react';
import { Button } from '../ui/Button';

export const VisionModeToggle: React.FC = () => {
  const [isVisionMode, setIsVisionMode] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  
  const toggleVisionMode = () => {
    setIsVisionMode(!isVisionMode);
    if (isVisionMode) {
      setIsOptionsOpen(false);
    }
  };
  
  const startDrag = (item: string) => {
    setDraggedItem(item);
  };
  
  const endDrag = () => {
    setDraggedItem(null);
  };
  
  const availableBlocks = [
    { id: 'header', name: 'Header Section', icon: LayoutGrid },
    { id: 'video', name: 'Video Avatar', icon: Video },
    { id: 'chat', name: 'AI Chat Widget', icon: MessageSquare },
    { id: 'calendar', name: 'Booking Calendar', icon: Calendar },
    { id: 'products', name: 'Product Grid', icon: ShoppingCart },
    { id: 'testimonials', name: 'Testimonials', icon: User },
    { id: 'newsletter', name: 'Newsletter Signup', icon: Mail },
    { id: 'about', name: 'About Section', icon: User },
  ];
  
  const dropzones = [
    { id: 'zone1', name: 'Hero Section' },
    { id: 'zone2', name: 'Main Content' },
    { id: 'zone3', name: 'Sidebar' },
  ];
  
  return (
    <>
      {/* Vision Mode Toggle Button */}
      <div className="fixed bottom-6 left-6 z-30">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleVisionMode}
          className={`
            h-14 w-14 rounded-full shadow-lg flex items-center justify-center
            transition-colors duration-200
            ${isVisionMode 
              ? 'bg-secondary text-white' 
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}
          `}
        >
          <Eye className="h-6 w-6" />
        </motion.button>
      </div>
      
      {/* Vision Mode Overlay */}
      <AnimatePresence>
        {isVisionMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 pointer-events-none"
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 bg-secondary text-white h-12 flex items-center justify-between px-4 pointer-events-auto">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <span className="font-medium">Vision Mode</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save Layout
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Preview
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                  onClick={() => setIsVisionMode(false)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Exit
                </Button>
              </div>
            </div>
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 border-2 border-dashed border-secondary/30 mt-12 pointer-events-none">
              <div className="h-full grid grid-cols-12 gap-4 p-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="border border-secondary/10 rounded"></div>
                ))}
              </div>
            </div>
            
            {/* Editable Elements */}
            <div className="absolute top-20 right-8 pointer-events-auto">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                leftIcon={<Plus size={16} />}
              >
                Add Element
              </Button>
            </div>
            
            {/* Feature Zones */}
            <div 
              className="absolute top-40 left-1/4 w-72 border-2 border-secondary rounded-lg p-1 pointer-events-auto cursor-pointer"
            >
              <div className="bg-secondary/10 rounded p-2 text-xs font-medium text-secondary">
                AI Assistant Zone
              </div>
            </div>
            
            <div 
              className="absolute top-60 right-1/4 w-60 border-2 border-secondary rounded-lg p-1 pointer-events-auto cursor-pointer"
            >
              <div className="bg-secondary/10 rounded p-2 text-xs font-medium text-secondary">
                Payment Processing Zone
              </div>
            </div>
            
            <div 
              className="absolute bottom-40 left-1/3 w-48 border-2 border-secondary rounded-lg p-1 pointer-events-auto cursor-pointer"
            >
              <div className="bg-secondary/10 rounded p-2 text-xs font-medium text-secondary">
                Deployment Config
              </div>
            </div>
            
            <div 
              className="absolute top-80 left-1/5 w-64 border-2 border-secondary rounded-lg p-1 pointer-events-auto cursor-pointer"
            >
              <div className="bg-secondary/10 rounded p-2 text-xs font-medium text-secondary">
                AI Avatar Zone
              </div>
            </div>
            
            <div 
              className="absolute bottom-60 right-1/3 w-56 border-2 border-secondary rounded-lg p-1 pointer-events-auto cursor-pointer"
            >
              <div className="bg-secondary/10 rounded p-2 text-xs font-medium text-secondary">
                CRM Integration
              </div>
            </div>
            
            {/* Element Options Panel */}
            <AnimatePresence>
              {isOptionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-32 right-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden w-64 pointer-events-auto"
                >
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white flex items-center">
                      <Plus className="h-4 w-4 mr-1 text-secondary" />
                      Add Elements
                    </h3>
                  </div>
                  
                  <div className="p-3 max-h-[400px] overflow-y-auto">
                    <div className="space-y-2">
                      {availableBlocks.map((block) => (
                        <motion.div
                          key={block.id}
                          draggable
                          onDragStart={() => startDrag(block.id)}
                          onDragEnd={endDrag}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="p-2 bg-gray-50 dark:bg-gray-700 rounded flex items-center gap-2 cursor-move"
                        >
                          <div className="h-8 w-8 rounded bg-secondary/10 flex items-center justify-center text-secondary">
                            <block.icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {block.name}
                          </span>
                          <Move className="h-3 w-3 text-gray-400 ml-auto" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                        DROPZONES
                      </h4>
                      <div className="space-y-2">
                        {dropzones.map((zone) => (
                          <div 
                            key={zone.id}
                            className={`
                              p-2 border-2 border-dashed rounded text-center
                              ${draggedItem
                                ? 'border-secondary bg-secondary/5 text-secondary'
                                : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'}
                            `}
                          >
                            {zone.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* AI Narration for Vision Mode */}
      <AnimatePresence>
        {isVisionMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-24 z-30 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 max-w-md pointer-events-auto"
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white mb-1">
                  Design Assistant
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You're now in Vision Mode! Drag elements from the panel to customize your portal. 
                  Arrange your content however you want for your audience.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-1 h-6 w-6 p-0"
                onClick={() => {}}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VisionModeToggle;