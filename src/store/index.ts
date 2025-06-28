import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Creator, Audience, Content, AIMessage, Subscription } from '../types';

interface AppState {
  // User state
  currentUser: Creator | Audience | null;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  
  // Content state
  creatorContent: Content[];
  featuredContent: Content[];
  
  // AI state
  aiAgentName: string;
  aiMessages: AIMessage[];
  isAIProcessing: boolean;
  
  // Monetization state
  subscriptions: Subscription[];
  
  // UI state
  isSidebarOpen: boolean;
  currentView: 'dashboard' | 'content' | 'audience' | 'monetization' | 'settings' | 'ai';
  isLoading: boolean;
  notifications: Array<{id: string; message: string; type: 'info' | 'success' | 'warning' | 'error'}>;
  
  // Actions
  setCurrentUser: (user: Creator | Audience | null) => void;
  setAuthenticated: (value: boolean) => void;
  toggleDarkMode: () => void;
  setCreatorContent: (content: Content[]) => void;
  addContent: (content: Content) => void;
  removeContent: (contentId: string) => void;
  addAIMessage: (message: AIMessage) => void;
  setAIProcessing: (isProcessing: boolean) => void;
  toggleSidebar: () => void;
  setCurrentView: (view: AppState['currentView']) => void;
  setLoading: (isLoading: boolean) => void;
  addNotification: (notification: Omit<AppState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  resetState: () => void;
}

// Initial state values
const initialState = {
  currentUser: null,
  isAuthenticated: false,
  isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  creatorContent: [],
  featuredContent: [],
  aiAgentName: 'Vikas',
  aiMessages: [],
  isAIProcessing: false,
  subscriptions: [],
  isSidebarOpen: true,
  currentView: 'dashboard' as const,
  isLoading: false,
  notifications: [],
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Actions
      setCurrentUser: (user) => {
        console.log('🔄 Store: Setting current user:', user);
        set({ currentUser: user });
      },
      setAuthenticated: (value) => {
        console.log('🔄 Store: Setting authenticated:', value);
        set({ isAuthenticated: value });
      },
      toggleDarkMode: () => set((state) => {
        const newDarkMode = !state.isDarkMode;
        document.documentElement.classList.toggle('dark', newDarkMode);
        return { isDarkMode: newDarkMode };
      }),
      setCreatorContent: (content) => set({ creatorContent: content }),
      addContent: (content) => set((state) => ({
        creatorContent: [...state.creatorContent, content]
      })),
      removeContent: (contentId) => set((state) => ({
        creatorContent: state.creatorContent.filter((item) => item.id !== contentId)
      })),
      addAIMessage: (message) => set((state) => ({
        aiMessages: [...state.aiMessages, message]
      })),
      setAIProcessing: (isProcessing) => set({ isAIProcessing: isProcessing }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setCurrentView: (view) => set({ currentView: view }),
      setLoading: (isLoading) => set({ isLoading }),
      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, { id: Date.now().toString(), ...notification }]
      })),
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((item) => item.id !== id)
      })),
      resetState: () => {
        console.log('🔄 Store: Resetting to initial state');
        set(initialState);
      },
    }),
    {
      name: 'boltdesk-store',
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);