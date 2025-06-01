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
}

export interface Audience extends User {
  role: 'audience';
  subscriptionTier?: 'free' | 'basic' | 'premium';
  lastActive: Date;
}

// Portal Types
export interface CreatorCustomization {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo?: string;
  aiAgentName: string;
  aiVoiceId?: string;
  darkMode: boolean;
}

export interface SocialLinks {
  website?: string;
  youtube?: string;
  twitter?: string;
  instagram?: string;
  tiktok?: string;
  twitch?: string;
}

// Content Types
export interface Content {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  contentType: 'post' | 'video' | 'audio' | 'file';
  accessTier: 'free' | 'basic' | 'premium';
  publishedAt: Date;
  featuredImage?: string;
  url?: string;
  tags: string[];
}

// Analytics
export interface AnalyticsData {
  totalVisitors: number;
  totalSubscribers: number;
  revenueGenerated: number;
  averageDailyVisitors: number;
  popularContent: { contentId: string; views: number }[];
  visitorsByCountry: { country: string; count: number }[];
}

// AI Agent Types
export interface AIAgent {
  name: string;
  voiceId?: string;
  videoId?: string;
  trainingContent: string[];
  welcomeMessage: string;
  messageHistory: AIMessage[];
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