import { useState, useCallback } from 'react';

export interface Toast {
  id: string;
  title?: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    const newToast = { ...toast, id };
    
    // Log toast (helps with debugging)
    console.log(`Toast: ${toast.type} - ${toast.message}`);
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto-remove toast after duration
    if (toast.duration !== 0) {
      const duration = toast.duration || 5000;
      setTimeout(() => hideToast(id), duration);
    }
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((message: string, title?: string) => {
    showToast({ type: 'success', message, title });
  }, [showToast]);

  const error = useCallback((message: string, title?: string) => {
    showToast({ type: 'error', message, title });
  }, [showToast]);

  const info = useCallback((message: string, title?: string) => {
    showToast({ type: 'info', message, title });
  }, [showToast]);

  const warning = useCallback((message: string, title?: string) => {
    showToast({ type: 'warning', message, title });
  }, [showToast]);

  return {
    toasts,
    showToast,
    hideToast,
    success,
    error,
    info,
    warning
  };
};