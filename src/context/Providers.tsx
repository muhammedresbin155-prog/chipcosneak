'use client';

import React, { ReactNode } from 'react';
import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';
import { ToastProvider } from './ToastContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  );
}