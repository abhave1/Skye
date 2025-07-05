"use client";

import React, { useEffect } from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';

interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  type?: 'error' | 'success';
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  isVisible,
  onClose,
  message,
  type = 'error',
  duration = 5000
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    if (type === 'success') {
      return <CheckCircle className="h-5 w-5" style={{color: 'hsl(142, 76%, 36%)'}} />;
    }
    return <AlertCircle className="h-5 w-5" style={{color: 'hsl(48, 96%, 40%)'}} />;
  };



  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2">
      <div 
        className="flex items-center space-x-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm"
        style={{
          borderColor: 'hsl(142, 76%, 36%)/30',
          backgroundColor: type === 'success' ? 'hsl(142, 76%, 96%)' : 'hsl(48, 96%, 89%)',
        }}
      >
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium" style={{color: 'hsl(142, 76%, 20%)'}}>
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 rounded-full p-1 transition-colors hover:bg-black/10"
          aria-label="Close toast"
        >
          <X className="h-4 w-4" style={{color: 'hsl(142, 76%, 36%)'}} />
        </button>
      </div>
    </div>
  );
}; 