'use client';

import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  variant?: 'default' | 'compact' | 'featured';
  columns?: { mobile?: number; tablet?: number; desktop?: number; large?: number };
  showQuickAdd?: boolean;
  className?: string;
}

export const ProductGrid = ({ 
  products, 
  variant = 'default', 
  columns = { mobile: 1, tablet: 2, desktop: 3, large: 4 },
  showQuickAdd = true,
  className = '' 
}: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <svg className="mx-auto h-16 w-16 text-muted/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <h3 className="font-heading text-2xl text-dark-text mb-2">No products found</h3>
        <p className="text-muted">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  const gridCols = `grid-cols-${columns.mobile} sm:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop} xl:grid-cols-${columns.large}`;

  return (
    <div className={`grid gap-6 ${gridCols} ${className}`}>
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          variant={variant}
          showQuickAdd={showQuickAdd}
        />
      ))}
    </div>
  );
};

interface ProductSkeletonProps {
  count?: number;
  columns?: { mobile?: number; tablet?: number; desktop?: number; large?: number };
}

export const ProductSkeleton = ({ count = 8, columns = { mobile: 1, tablet: 2, desktop: 3, large: 4 } }: ProductSkeletonProps) => {
  const gridCols = `grid-cols-${columns.mobile} sm:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop} xl:grid-cols-${columns.large}`;

  return (
    <div className={`grid gap-6 ${gridCols}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card animate-pulse">
          <div className="aspect-square bg-light-lavender" />
          <div className="p-4 space-y-3">
            <div className="h-3 w-1/4 bg-light-lavender rounded" />
            <div className="h-6 w-3/4 bg-light-lavender rounded" />
            <div className="h-4 w-1/2 bg-light-lavender rounded" />
            <div className="h-10 w-full bg-light-lavender rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};