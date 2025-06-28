import React, { useState, useEffect } from 'react';
import { Bot, X, Mic, Video, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { useAppStore } from '../../store';

export const AIFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { aiAgentName, aiMessages, addAIMessage, isAIProcessing } = useAppStore();

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // If opening the chat and no messages, add a welcome message
    if (!isOpen && aiMessages.length === 0) {
      addAIMessage({
        id: Date.now().toString(),
        senderType: 'ai',
        senderId: 'ai-agent',
        message: `Hi there! I'm ${aiAgentName || 'your AI assistant'}. How can I help you today?`,
        timestamp: new Date()
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() === '') return;
    
    // Add user message
    addAIMessage({
      id: Date.now().toString(),
      senderType: 'user',
      senderId: 'visitor',
      message,
      timestamp: new Date()
    });
    
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      addAIMessage({
        id: (Date.now() + 1).toString(),
        senderType: 'ai',
        senderId: 'ai-agent',
        message: `I understand you're asking about "${message}". As an AI assistant, I'm here to help with any questions about the creator's content or offerings.`,
        timestamp: new Date()
      });
    }, 1000);
  };

  return (
    <>
      {/* Floating chat button */}
      <div className="fixed bottom-6 right-6 z-30">
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary-600 text-white"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? <X size={24} /> : <Bot size={24} />}
        </Button>
      </div>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-20 w-80 md:w-96 rounded-lg overflow-hidden shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col"
            style={{ maxHeight: 'calc(100vh - 150px)' }}
          >
            {/* Chat header */}
            <div className="p-4 bg-primary text-white flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <h3 className="font-medium">{aiAgentName || 'AI Assistant'}</h3>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white/90 hover:text-white hover:bg-white/10"
                  aria-label="Voice call"
                >
                  <Mic size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-white/90 hover:text-white hover:bg-white/10"
                  aria-label="Video call"
                >
                  <Video size={16} />
                </Button>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: '350px' }}>
              {aiMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`rounded-lg p-3 max-w-[80%] ${
                      msg.senderType === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isAIProcessing && (
                <div className="flex justify-start">
                  <div className="rounded-lg p-3 bg-gray-100 dark:bg-gray-700">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <Button
                type="submit"
                variant="primary"
                size="icon"
                className="ml-2 h-9 w-9"
                disabled={message.trim() === '' || isAIProcessing}
              >
                <Send size={16} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};