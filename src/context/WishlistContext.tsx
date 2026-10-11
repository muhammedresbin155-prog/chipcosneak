'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { WishlistItem } from '@/types';

interface WishlistState {
  items: WishlistItem[];
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'INIT_WISHLIST'; payload: WishlistItem[] };

const WISHLIST_STORAGE_KEY = 'chipcosneaks-wishlist';

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.some(
        item => item.productId === action.payload.productId
      );
      if (exists) return state;
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'CLEAR_WISHLIST':
      return { ...state, items: [] };
    case 'INIT_WISHLIST':
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

const initialState: WishlistState = { items: [] };

const WishlistContext = createContext<{
  state: WishlistState;
  addItem: (item: Omit<WishlistItem, 'id' | 'addedAt'>) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  getItemCount: () => number;
} | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        dispatch({ type: 'INIT_WISHLIST', payload: JSON.parse(stored) });
      }
    } catch (error) {
      console.error('Failed to load wishlist from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state.items));
    } catch (error) {
      console.error('Failed to save wishlist to localStorage:', error);
    }
  }, [state.items]);

  const addItem = (item: Omit<WishlistItem, 'id' | 'addedAt'>) => {
    const newItem: WishlistItem = {
      ...item,
      id: `${item.productId}-${Date.now()}`,
      addedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_ITEM', payload: newItem });
  };

  const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const clearWishlist = () => dispatch({ type: 'CLEAR_WISHLIST' });
  const isInWishlist = (productId: string) => state.items.some(item => item.productId === productId);
  const getItemCount = () => state.items.length;

  return (
    <WishlistContext.Provider value={{ state, addItem, removeItem, clearWishlist, isInWishlist, getItemCount }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}