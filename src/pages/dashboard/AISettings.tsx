import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Mic, 
  Video, 
  Save, 
  RefreshCw, 
  Wand,
  Play,
  Pause,
  StopCircle,
  Upload,
  Trash,
  Settings,
  MessageSquare,
  VolumeX,
  Volume2,
  AlertCircle,
  CheckCircle2,
  X,
  ChevronDown,
  ChevronUp,
  Shield,
  Cpu,
  Zap,
  Lock,
  Crown,
  Info
} from 'lucide-react';
import { useAppStore } from '../../store';

export const AISettingsPage: React.FC = () => {
  const { aiAgentName, setAIProcessing } = useAppStore();
  const [agentName, setAgentName] = useState(aiAgentName);
  const [welcomeMessage, setWelcomeMessage] = useState("Hi there! I'm your AI assistant. How can I help you today?");
  const [voiceProfile, setVoiceProfile] = useState('female-1');
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [trainingContent, setTrainingContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  
  // Voice profiles
  const voiceProfiles = [
    { 
      id: 'female-1', 
      name: 'Rachel (Female)', 
      accent: 'American',
      tone: 'Professional',
      sampleText: 'Hi, I\'m Rachel. I can help you with your questions.'
    },
    { 
      id: 'female-2', 
      name: 'Emma (Female)', 
      accent: 'British',
      tone: 'Friendly',
      sampleText: 'Hello! I\'m Emma, and I\'m here to assist you.'
    },
    { 
      id: 'male-1', 
      name: 'Thomas (Male)', 
      accent: 'American',
      tone: 'Authoritative',
      sampleText: 'Greetings! I\'m Thomas, your professional AI assistant.'
    },
    { 
      id: 'male-2', 
      name: 'James (Male)', 
      accent: 'Australian',
      tone: 'Casual',
      sampleText: 'G\'day! I\'m James, ready to help you out.'
    }
  ];

  // Training examples
  const trainingExamples = [
    "Our premium course on web development covers React, Node.js, and modern deployment practices.",
    "The AI fundamentals workshop is perfect for beginners looking to understand machine learning concepts.",
    "Check out our latest podcast episode on emerging tech trends and their impact on developers.",
  ];

  // AI Models
  const aiModels = [
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      description: 'Fast and efficient general-purpose language model',
      tier: 'free',
      tokenLimit: 4096,
      strengths: ['Fast responses', 'General knowledge', 'Good for most tasks'],
      provider: 'OpenAI'
    },
    {
      id: 'gpt-4',
      name: 'GPT-4',
      description: 'Advanced language model with superior reasoning capabilities',
      tier: 'premium',
      tokenLimit: 8192,
      strengths: ['Advanced reasoning', 'Complex problem solving', 'Nuanced understanding'],
      provider: 'OpenAI'
    },
    {
      id: 'claude-2',
      name: 'Claude 2',
      description: 'Balanced model with strong reasoning and safety features',
      tier: 'premium',
      tokenLimit: 100000,
      strengths: ['Long context window', 'Helpful and harmless', 'Detailed explanations'],
      provider: 'Anthropic'
    },
    {
      id: 'llama-2-70b',
      name: 'Llama 2 (70B)',
      description: 'Open-weight model with strong capabilities',
      tier: 'premium',
      tokenLimit: 4096,
      strengths: ['Open-source foundation', 'Strong general capabilities', 'Customizable'],
      provider: 'Meta'
    }
  ];

  useEffect(() => {
    // Clean up audio resources
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const showNotificationMessage = (message: string, type: 'success' | 'error') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      showNotificationMessage('Recording started', 'success');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      showNotificationMessage('Error accessing microphone', 'error');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      showNotificationMessage('Recording completed', 'success');
    }
  };

  const handlePlayAudio = () => {
    if (audioBlob && audioRef.current) {
      audioRef.current.src = URL.createObjectURL(audioBlob);
      audioRef.current.volume = volume;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleGenerateVoice = async () => {
    setIsGenerating(true);
    setAIProcessing(true);
    
    try {
      // Simulate API call to ElevenLabs
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful generation
      const response = await fetch('/demo-voice.wav');
      const blob = await response.blob();
      setAudioBlob(blob);
      
      showNotificationMessage('Voice sample generated successfully', 'success');
    } catch (error) {
      showNotificationMessage('Error generating voice sample', 'error');
    } finally {
      setIsGenerating(false);
      setAIProcessing(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Simulate saving settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      showNotificationMessage('Settings saved successfully', 'success');
    } catch (error) {
      showNotificationMessage('Error saving settings', 'error');
    }
  };

  const handleUpgradeClick = () => {
    setShowUpgradeModal(true);
  };

  const handleModelSelection = (modelId: string) => {
    const model = aiModels.find(m => m.id === modelId);
    
    if (model?.tier === 'premium') {
      handleUpgradeClick();
      return;
    }
    
    setSelectedModel(modelId);
    showNotificationMessage(`${model?.name} selected as your AI model`, 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Agent Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure your AI assistant's personality, voice, and knowledge base
        </p>
      </div>

      {/* AI Model Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="mr-2 h-5 w-5 text-primary" />
            BoltDesk AI Model Tiers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Free Tier</h3>
                <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium">
                  Current Plan
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">Access to:</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                    Standard AI model (GPT-3.5 Turbo)
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                    Basic voice synthesis
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                    <span>50 AI queries per day <span className="text-xs text-gray-500">(43/50 remaining today)</span></span>
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <X className="h-5 w-5 mr-2 text-gray-400" />
                    Advanced AI models
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <X className="h-5 w-5 mr-2 text-gray-400" />
                    Video AI responses
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-6 rounded-xl shadow-sm border border-primary/20">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                  <Crown className="h-5 w-5 mr-2 text-primary" />
                  Premium Tier
                </h3>
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  Upgrade
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">Everything in Free, plus:</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
                    Advanced AI models (GPT-4, Claude, etc.)
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
                    Premium voice synthesis
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
                    Video AI responses
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
                    Unlimited AI queries per day
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
                    Priority customer support
                  </li>
                </ul>
                <Button
                  variant="primary"
                  className="w-full mt-2"
                  leftIcon={<Crown size={16} />}
                  onClick={handleUpgradeClick}
                >
                  Upgrade to Premium
                </Button>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Choose AI Model
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiModels.map((model) => (
              <div 
                key={model.id}
                className={`border rounded-xl p-4 cursor-pointer transition-all ${
                  selectedModel === model.id
                    ? 'border-primary bg-primary/5 dark:bg-primary/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                } ${
                  model.tier === 'premium' 
                    ? 'bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900/20 dark:to-primary-900/20' 
                    : ''
                }`}
                onClick={() => handleModelSelection(model.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {model.name}
                      </h4>
                      {model.tier === 'premium' && (
                        <span className="ml-2 flex items-center text-primary text-xs font-medium">
                          <Crown size={12} className="mr-1" />
                          Premium
                        </span>
                      )}
                      {model.tier === 'free' && (
                        <span className="ml-2 text-green-600 dark:text-green-400 text-xs font-medium">
                          Free
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {model.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {selectedModel === model.id ? (
                      <div className="h-6 w-6 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center">
                        <div className="h-3 w-3 rounded-full bg-primary"></div>
                      </div>
                    ) : (
                      model.tier === 'premium' ? (
                        <Lock className="h-5 w-5 text-primary" />
                      ) : (
                        <div className="h-6 w-6 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                      )
                    )}
                  </div>
                </div>
                
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Info size={12} className="mr-1" />
                    <span>{model.provider}</span>
                  </div>
                  <div className="flex items-center">
                    <Zap size={12} className="mr-1" />
                    <span>{model.tokenLimit.toLocaleString()} tokens</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Strengths:</h5>
                  <div className="flex flex-wrap gap-1">
                    {model.strengths.map((strength, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>

                {model.tier === 'premium' && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3 w-full border-primary/50 text-primary"
                    leftIcon={<Lock size={14} />}
                    onClick={handleUpgradeClick}
                  >
                    Upgrade to Unlock
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Basic Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="mr-2 h-5 w-5 text-primary" />
            Agent Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label htmlFor="agent-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Agent Name
            </label>
            <input
              id="agent-name"
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
              placeholder="AI Assistant Name"
            />
          </div>
          
          <div>
            <label htmlFor="welcome-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Welcome Message
            </label>
            <textarea
              id="welcome-message"
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
              placeholder="Enter the welcome message your AI agent will use"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="voice-profile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Voice Profile (ElevenLabs)
              </label>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary"
                leftIcon={<Wand size={14} />}
                onClick={handleGenerateVoice}
                isLoading={isGenerating}
              >
                Generate Sample
              </Button>
            </div>
            <select
              id="voice-profile"
              value={voiceProfile}
              onChange={(e) => setVoiceProfile(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            >
              {voiceProfiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name} - {profile.accent} ({profile.tone})
                </option>
              ))}
            </select>

            {/* Voice Preview */}
            {audioBlob && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Voice Preview
                  </h4>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleToggleMute}
                      className="text-gray-500"
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </Button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-24"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={isPlaying ? handlePauseAudio : handlePlayAudio}
                    leftIcon={isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  >
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
                </div>
              </div>
            )}
          </div>

          {/* Voice Recording */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Custom Voice Recording
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAudioBlob(null)}
                className="text-gray-500"
                leftIcon={<Trash size={14} />}
              >
                Clear
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={isRecording ? 'destructive' : 'outline'}
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                leftIcon={isRecording ? <StopCircle size={14} /> : <Mic size={14} />}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>
              {isRecording && (
                <motion.div
                  animate={{ opacity: [0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-red-500"
                />
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="video-enabled"
              type="checkbox"
              checked={videoEnabled}
              onChange={(e) => setVideoEnabled(e.target.checked)}
              className="h-4 w-4 text-primary border-gray-300 dark:border-gray-600 rounded"
            />
            <label htmlFor="video-enabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Enable Video AI (D-ID) for personalized video responses
              {videoEnabled ? null : <span className="ml-2 text-xs text-primary"><Crown size={12} className="inline mr-1" />Premium feature</span>}
            </label>
          </div>
          
          {videoEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
            >
              <div className="flex items-start mb-3">
                <Video className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Video AI Configuration
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Connect your D-ID account to generate personalized video responses
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full"
                leftIcon={<Upload size={14} />}
              >
                Upload Avatar Image
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Advanced Settings (Collapsible) */}
      <Card>
        <CardHeader 
          className="cursor-pointer"
          onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
        >
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Settings className="mr-2 h-5 w-5 text-primary" />
              Advanced Settings
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              {showAdvancedSettings ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </CardTitle>
        </CardHeader>
        
        {showAdvancedSettings && (
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Temperature
                </label>
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    id="temperature" 
                    min="0" 
                    max="2" 
                    step="0.1" 
                    defaultValue="0.7"
                    className="w-full"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 w-8">0.7</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Controls randomness: Lower values are more focused, higher values more creative
                </p>
              </div>

              <div>
                <label htmlFor="max-tokens" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Max Tokens
                </label>
                <input 
                  type="number" 
                  id="max-tokens" 
                  defaultValue={1024} 
                  min={1} 
                  max={4096}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum length of the AI response
                </p>
              </div>

              <div>
                <label htmlFor="system-prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  System Prompt
                </label>
                <textarea 
                  id="system-prompt" 
                  rows={3}
                  defaultValue={"You are a helpful AI assistant for a content creator. Answer questions helpfully and accurately."}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Instructions that prime the AI's behavior
                </p>
              </div>

              <div>
                <label htmlFor="top-p" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Top P
                </label>
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    id="top-p" 
                    min="0" 
                    max="1" 
                    step="0.05" 
                    defaultValue="0.9"
                    className="w-full"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 w-8">0.9</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Controls diversity via nucleus sampling
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="memory-enabled"
                  type="checkbox"
                  defaultChecked={true}
                  className="h-4 w-4 text-primary border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="memory-enabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Enable conversation memory
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="content-filter"
                  type="checkbox"
                  defaultChecked={true}
                  className="h-4 w-4 text-primary border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="content-filter" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Enable content filtering
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="streaming-response"
                  type="checkbox"
                  defaultChecked={true}
                  className="h-4 w-4 text-primary border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="streaming-response" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Stream responses in real-time
                </label>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    Advanced Settings Usage
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                    These settings control the technical behavior of your AI assistant. 
                    The default values work well for most use cases. Changes to these settings
                    may significantly affect your AI's responses and performance.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      
      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="mr-2 h-5 w-5 text-primary" />
            AI Agent Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center"
            animate={{ scale: [0.95, 1], opacity: [0.5, 1] }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Bot className="h-10 w-10 text-primary" />
            </motion.div>
            <h3 className="font-medium text-lg mb-1 text-gray-900 dark:text-white">
              {agentName || 'AI Assistant'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
              {welcomeMessage}
            </p>
            <div className="flex space-x-2 mb-4">
              <Button 
                size="sm"
                variant="outline"
                leftIcon={<Mic size={14} />}
              >
                Voice
              </Button>
              {videoEnabled && (
                <Button 
                  size="sm"
                  variant="outline"
                  leftIcon={<Video size={14} />}
                >
                  Video
                </Button>
              )}
            </div>
            <div className="text-xs text-center text-gray-500 dark:text-gray-400">
              <p>Using {voiceProfiles.find(p => p.id === voiceProfile)?.name} voice profile</p>
              <p>Powered by {aiModels.find(m => m.id === selectedModel)?.name}</p>
              {videoEnabled && <p>Video AI enabled</p>}
            </div>
          </motion.div>

          {/* Quick Test */}
          <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Quick Test
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a test message..."
                className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
              <Button
                size="sm"
                variant="primary"
                leftIcon={<MessageSquare size={14} />}
              >
                Test
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Knowledge Base */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wand className="mr-2 h-5 w-5 text-primary" />
            Train Your AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Add custom knowledge to your AI assistant by providing text about your content, services, or frequently asked questions. 
            This helps your AI provide more personalized and accurate responses.
          </p>

          {/* Training Examples */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Example Training Data
            </h4>
            <div className="space-y-2">
              {trainingExamples.map((example, index) => (
                <motion.div
                  key={index}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setTrainingContent(prev => prev ? `${prev}\n${example}` : example)}
                >
                  {example}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="training-content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Training Content
            </label>
            <textarea
              id="training-content"
              value={trainingContent}
              onChange={(e) => setTrainingContent(e.target.value)}
              rows={8}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
              placeholder="Add information about your content, services, pricing, or anything else your AI should know..."
            />
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
            <Button 
              variant="outline"
              leftIcon={<RefreshCw size={16} />}
              onClick={() => setTrainingContent('')}
            >
              Reset Training
            </Button>
            <Button 
              variant="primary"
              leftIcon={<Wand size={16} />}
              onClick={() => showNotificationMessage('AI training started', 'success')}
            >
              Train AI
            </Button>
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-end">
          <Button
            variant="primary"
            leftIcon={<Save size={16} />}
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      {/* Premium Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                    <Crown className="h-5 w-5 mr-2 text-primary" />
                    Upgrade to Premium
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowUpgradeModal(false)}
                  >
                    <X size={18} />
                  </Button>
                </div>
                
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Unlock Premium AI Features
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Access to powerful models like GPT-4, Claude, and more
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Unlimited AI queries per day with longer context windows
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Premium voice synthesis and video AI capabilities
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white">Monthly Plan</h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400">$19.99/month</p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-primary text-primary"
                      size="sm"
                    >
                      Select
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border border-primary bg-primary/5 dark:bg-primary/10 rounded-lg">
                    <div>
                      <div className="flex items-center">
                        <h5 className="font-medium text-gray-900 dark:text-white">Annual Plan</h5>
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Save 20%
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">$191.88/year ($15.99/month)</p>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                    >
                      Select
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowUpgradeModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary"
                    leftIcon={<Crown size={16} />}
                  >
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-4 right-4 p-4 rounded-xl shadow-lg ${
              notificationType === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100' 
                : 'bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
            }`}
          >
            <div className="flex items-center gap-2">
              {notificationType === 'success' ? (
                <CheckCircle2 size={16} className="text-green-500 dark:text-green-400" />
              ) : (
                <AlertCircle size={16} className="text-red-500 dark:text-red-400" />
              )}
              <span className="text-sm">{notificationMessage}</span>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-6 w-6 p-0"
                onClick={() => setShowNotification(false)}
              >
                <X size={14} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AISettingsPage;