'use client';

import React, { useEffect } from 'react';
import { useToast } from '@/context/ToastContext';

const toastIcons = {
  success: (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const toastColors = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  warning: 'bg-amber-50 border-amber-200',
  info: 'bg-light-lavender border-primary/20',
};

export const ToastContainer = () => {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 lg:bottom-6 lg:right-6" aria-live="polite" aria-label="Notifications">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          toast={toast}
          onDismiss={dismissToast}
        />
      ))}
    </div>
  );
};

const Toast = ({ toast, onDismiss }: { toast: { id: string; type: 'success' | 'error' | 'warning' | 'info'; title: string; message?: string; duration?: number }; onDismiss: (id: string) => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-xl border shadow-lg min-w-[300px] max-w-md
        animate-slide-down
        ${toastColors[toast.type]}
      `}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">{toastIcons[toast.type]}</div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-dark-text">{toast.title}</p>
        {toast.message && (
          <p className="text-sm text-muted mt-0.5">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 p-1 text-muted hover:text-dark-text transition-colors"
        aria-label="Dismiss notification"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};