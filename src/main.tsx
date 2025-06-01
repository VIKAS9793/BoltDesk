import * as React from 'react';
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Debug script to capture startup errors
const DebugWrapper = () => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Application Error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        stack: event.error?.stack
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled Promise Rejection:', {
        reason: event.reason,
        stack: event.reason?.stack
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Debug info
    console.log('Debug Info:', {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      react: React.version,
      routes: window.location.pathname
    });

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(
  <DebugWrapper />
);