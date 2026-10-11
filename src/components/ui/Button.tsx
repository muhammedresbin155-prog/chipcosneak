'use client';

import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { ArrowRight, Layers, Grid } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  icon?: 'arrow-right' | 'layers' | 'grid';
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, disabled, className = '', children, icon, iconPosition = 'right', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantStyles = {
      primary: 'bg-primary text-white hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30',
      secondary: 'bg-white text-primary border-2 border-primary hover:bg-light-lavender hover:shadow-lg hover:shadow-primary/20',
      ghost: 'text-dark-text hover:bg-light-lavender',
      outline: 'border-2 border-border text-dark-text hover:border-primary hover:text-primary hover:bg-light-lavender',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-5 py-2.5 text-base gap-2',
      lg: 'px-7 py-3.5 text-lg gap-2.5',
    };

    const renderIcon = (name: 'arrow-right' | 'layers' | 'grid') => {
      switch (name) {
        case 'arrow-right':
          return <ArrowRight className="h-5 w-5" strokeWidth={2.5} />;
        case 'layers':
          return <Layers className="h-5 w-5" strokeWidth={2.5} />;
        case 'grid':
          return <Grid className="h-5 w-5" strokeWidth={2.5} />;
        default:
          return null;
      }
    };

    const iconElement = icon ? renderIcon(icon) : null;

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {iconPosition === 'left' && iconElement}
        {children}
        {iconPosition === 'right' && iconElement}
      </button>
    );
  }
);

Button.displayName = 'Button';