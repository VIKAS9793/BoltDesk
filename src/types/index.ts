// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'creator' | 'audience';
  avatar?: string;
  createdAt: Date;
}

export interface Creator extends User {
  role: 'creator';
  portalName: string;
  portalDescription?: string;
  customizations: CreatorCustomization;
  socialLinks: SocialLinks;
  analyticsData: AnalyticsData;
  niche?: string;
  services?: string[];
  onboardingCompleted?: boolean;
}

export interface Audience extends User {
  role: 'audience';
  subscriptionTier?: 'free' | 'basic' | 'premium';
  lastActive: Date;
  favorites?: string[];
  enrolledContent?: string[];
  progress?: Record<string, number>; // contentId -> progress percentage
}

// Portal Types
export interface CreatorCustomization {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo?: string;
  aiAgentName: string;
  aiVoiceId?: string;
  aiAvatar?: string;
  darkMode: boolean;
  theme?: 'default' | 'minimal' | 'bold' | 'custom';
}

export interface SocialLinks {
  website?: string;
  youtube?: string;
  twitter?: string;
  instagram?: string;
  tiktok?: string;
  twitch?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
}

// Content Types
export interface Content {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  contentType: 'post' | 'video' | 'audio' | 'file' | 'course';
  accessTier: 'free' | 'basic' | 'premium';
  publishedAt: Date;
  featuredImage?: string;
  url?: string;
  tags: string[];
  lessons?: ContentLesson[];
  duration?: string;
  price?: number;
}

export interface ContentLesson {
  id: string;
  title: string;
  description?: string;
  duration: string;
  isPreview: boolean;
  videoUrl?: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  fileType: string;
  url: string;
  size: number;
}

// Analytics
export interface AnalyticsData {
  totalVisitors: number;
  totalSubscribers: number;
  revenueGenerated: number;
  averageDailyVisitors: number;
  popularContent: { contentId: string; views: number }[];
  visitorsByCountry: { country: string; count: number }[];
  conversionRate?: number;
  trafficSources?: { source: string; percentage: number }[];
  deviceStats?: { device: string; percentage: number }[];
}

// AI Agent Types
export interface AIAgent {
  name: string;
  voiceId?: string;
  videoId?: string;
  trainingContent: string[];
  welcomeMessage: string;
  messageHistory: AIMessage[];
  modelId?: string;
  systemPrompt?: string;
}

export interface AIMessage {
  id: string;
  senderId: string;
  senderType: 'user' | 'ai';
  message: string;
  timestamp: Date;
  audioUrl?: string;
  videoUrl?: string;
}

// Subscription Types
export interface Subscription {
  id: string;
  userId: string;
  tier: 'basic' | 'premium';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  paymentMethod: string;
  amount: number;
}

// Service Types
export interface Service {
  id: string;
  creatorId: string;
  type: 'booking' | 'course' | 'digital' | 'community' | 'ai' | 'content';
  name: string;
  description: string;
  price: number;
  currency: string;
  duration?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}