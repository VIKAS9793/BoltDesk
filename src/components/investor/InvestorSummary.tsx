import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronRight, 
  TrendingUp,
  GanttChart,
  DollarSign,
  Users,
  Sparkles,
  Layers,
  Zap,
  BarChart3,
  Rocket,
  ArrowRight,
  Globe,
  Bot
} from 'lucide-react';
import { Button } from '../ui/Button';

interface InvestorSummaryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InvestorSummary: React.FC<InvestorSummaryProps> = ({ isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  const slideVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'tween', duration: 0.3 } },
    exit: { x: '100%', transition: { type: 'tween', duration: 0.3 } }
  };
  
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 bg-black/50 z-30"
            onClick={onClose}
          />
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-40 overflow-y-auto flex flex-col"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <Rocket className="mr-2 h-5 w-5 text-primary" />
                BoltDesk: Investor Overview
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-5 mb-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  What This Prototype Shows
                </h3>
                <div className="space-y-4">
                  <motion.div whileHover={{ x: 4 }} className="flex items-start gap-2">
                    <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        AI-first design-led mockup
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Demonstrates intuitive UX with AI integration at every touchpoint
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ x: 4 }} className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Real use-case simulation
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Showcases actual creator/audience interactions and engagement
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ x: 4 }} className="flex items-start gap-2">
                    <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Monetization-ready UI
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Multiple revenue channels with seamless payment processing
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ x: 4 }} className="flex items-start gap-2">
                    <Globe className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Deployable with modern stacks
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Built on scalable architecture ready for production
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ x: 4 }} className="flex items-start gap-2">
                    <Layers className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Clear integration roadmap
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Predefined APIs for ElevenLabs, OpenAI, Stripe, and more
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  If Fully Engineered...
                </h3>
                
                <div className="space-y-4">
                  <div 
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 cursor-pointer"
                    onClick={() => toggleSection('creator-economy')}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                        <BarChart3 className="mr-2 h-4 w-4 text-primary" />
                        Go-to platform for the $500B+ creator economy
                      </h4>
                      <ChevronRight 
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                          expandedSection === 'creator-economy' ? 'rotate-90' : ''
                        }`} 
                      />
                    </div>
                    
                    {expandedSection === 'creator-economy' && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
                        <p className="mb-2">
                          BoltDesk taps into the massive creator economy by providing a comprehensive platform that simplifies monetization, audience engagement, and content management.
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Automated AI-powered audience engagement</li>
                          <li>Multi-stream monetization infrastructure</li>
                          <li>Instant deployment with no technical knowledge required</li>
                          <li>Focus on high-margin micro-businesses ($1K-10K MRR)</li>
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 cursor-pointer"
                    onClick={() => toggleSection('replaces-tools')}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                        <Layers className="mr-2 h-4 w-4 text-primary" />
                        Replaces 5+ tools (Linktree, Calendly, Notion, Substack, Patreon)
                      </h4>
                      <ChevronRight 
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                          expandedSection === 'replaces-tools' ? 'rotate-90' : ''
                        }`} 
                      />
                    </div>
                    
                    {expandedSection === 'replaces-tools' && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
                        <p className="mb-2">
                          BoltDesk consolidates the creator tech stack into one cohesive platform, eliminating subscription fatigue and reducing tech complexity.
                        </p>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                            <span>Linktree ($5/mo)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                            <span>Calendly ($8/mo)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>
                            <span>Notion ($8/mo)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                            <span>Substack (10%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-orange-500 mr-2"></div>
                            <span>Patreon (8-12%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                            <span>Gumroad (10%)</span>
                          </div>
                        </div>
                        <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                          <p className="text-green-800 dark:text-green-300 font-medium">BoltDesk: $29/mo flat fee + 3% transaction fee</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 cursor-pointer"
                    onClick={() => toggleSection('ai-concierge')}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                        <Bot className="mr-2 h-4 w-4 text-primary" />
                        AI concierge for every creator
                      </h4>
                      <ChevronRight 
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                          expandedSection === 'ai-concierge' ? 'rotate-90' : ''
                        }`} 
                      />
                    </div>
                    
                    {expandedSection === 'ai-concierge' && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
                        <p className="mb-2">
                          Our AI technology automatically builds a personalized assistant that:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 mb-2">
                          <li>Answers customer questions 24/7</li>
                          <li>Handles scheduling and booking</li>
                          <li>Processes sales and subscriptions</li>
                          <li>Provides personalized recommendations</li>
                          <li>Gathers feedback and insights</li>
                        </ul>
                        <p>
                          Each AI is trained on the creator's content and style, creating a seamless extension of their brand.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 cursor-pointer"
                    onClick={() => toggleSection('one-click')}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                        <Zap className="mr-2 h-4 w-4 text-primary" />
                        One-click setup with real revenue
                      </h4>
                      <ChevronRight 
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                          expandedSection === 'one-click' ? 'rotate-90' : ''
                        }`} 
                      />
                    </div>
                    
                    {expandedSection === 'one-click' && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
                        <p className="mb-2">
                          The BoltDesk platform eliminates technical barriers with:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 mb-3">
                          <li>5-minute setup to complete portal</li>
                          <li>No-code customization interface</li>
                          <li>Instant integration with payment processors</li>
                          <li>Automated content import</li>
                          <li>Custom domain setup in seconds</li>
                        </ul>
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-blue-800 dark:text-blue-300">
                          Creators can start monetizing their audience immediately after setup, with average first-day revenue of $127.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Market Opportunity */}
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <GanttChart className="mr-2 h-5 w-5 text-primary" />
                  Market Opportunity
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Global Creator Economy</span>
                    <span className="font-medium text-gray-900 dark:text-white">$500B+</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <motion.div 
                      className="bg-primary h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Addressable Market</span>
                    <span className="font-medium text-gray-900 dark:text-white">$50B</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <motion.div 
                      className="bg-secondary h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Serviceable Obtainable Market</span>
                    <span className="font-medium text-gray-900 dark:text-white">$5B</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                    <motion.div 
                      className="bg-accent h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '45%' }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <p className="mb-2">Key Market Segments:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white dark:bg-gray-800 rounded p-2 flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      <span>Content Creators (45%)</span>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded p-2 flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                      <span>Online Coaches (25%)</span>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded p-2 flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span>Course Creators (20%)</span>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded p-2 flex items-center">
                      <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                      <span>Solopreneurs (10%)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Technology Stack */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Layers className="mr-2 h-5 w-5 text-primary" />
                  Technology Stack
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800">
                    <div className="font-medium text-gray-900 dark:text-white mb-2">AI Services</div>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1 text-primary" />
                        OpenAI GPT-4 (Conversation)
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1 text-primary" />
                        ElevenLabs (Voice Synthesis)
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1 text-primary" />
                        D-ID / Tavus (Video Generation)
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1 text-primary" />
                        Custom-trained RAG systems
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800">
                    <div className="font-medium text-gray-900 dark:text-white mb-2">Backend Infrastructure</div>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1 text-primary" />
                        React/Next.js Frontend
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1 text-primary" />
                        Serverless Functions (Vercel)
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1 text-primary" />
                        Vector Database (Pinecone)
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1 text-primary" />
                        Edge Caching (Cloudflare)
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800">
                    <div className="font-medium text-gray-900 dark:text-white mb-2">Financial Infrastructure</div>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1 text-primary" />
                        Stripe Connect (Payments)
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1 text-primary" />
                        RevenueCat (Subscriptions)
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1 text-primary" />
                        PayPal (Alternative Payments)
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1 text-primary" />
                        KYC/AML Compliance API
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800">
                    <div className="font-medium text-gray-900 dark:text-white mb-2">Deployment & Scaling</div>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1 text-primary" />
                        Vercel/Netlify Deployment
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1 text-primary" />
                        Custom Domain Support
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1 text-primary" />
                        Auto-scaling Architecture
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1 text-primary" />
                        Analytics & Monitoring
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                rightIcon={<ArrowRight size={16} />}
              >
                Learn More About BoltDesk
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InvestorSummary;