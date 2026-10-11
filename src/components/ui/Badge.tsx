'use client';

import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'new' | 'sale' | 'limited' | 'sold-out';
  children: React.ReactNode;
}

export const Badge = ({ variant = 'default', className = '', children, ...props }: BadgeProps) => {
  const variantStyles = {
    default: 'bg-light-lavender text-primary',
    new: 'bg-primary text-white',
    sale: 'bg-red-500 text-white',
    limited: 'bg-amber-500 text-white',
    'sold-out': 'bg-gray-500 text-white',
  };

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

interface ProductBadgesProps {
  isNew?: boolean;
  isLimited?: boolean;
  isOnSale?: boolean;
  isSoldOut?: boolean;
  className?: string;
}

export const ProductBadges = ({ isNew, isLimited, isOnSale, isSoldOut, className = '' }: ProductBadgesProps) => {
  if (isSoldOut) {
    return <Badge variant="sold-out" className={className}>Sold Out</Badge>;
  }

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {isNew && <Badge variant="new">New</Badge>}
      {isLimited && <Badge variant="limited">Limited</Badge>}
      {isOnSale && <Badge variant="sale">Sale</Badge>}
    </div>
  );
};