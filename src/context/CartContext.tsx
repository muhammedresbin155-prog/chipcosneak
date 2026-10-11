'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'INIT_CART'; payload: CartItem[] };

const CART_STORAGE_KEY = 'chipcosneaks-cart';

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.productId === action.payload.productId && item.size === action.payload.size && item.color === action.payload.color
      );
      if (existingItemIndex >= 0) {
        const newItems = [...state.items];
        const newQuantity = Math.min(
          newItems[existingItemIndex].quantity + action.payload.quantity,
          newItems[existingItemIndex].stock
        );
        newItems[existingItemIndex] = { ...newItems[existingItemIndex], quantity: newQuantity };
        return { ...state, items: newItems, isOpen: true };
      }
      return { ...state, items: [...state.items, action.payload], isOpen: true };
    }
    case 'REMOVE_ITEM': {
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.min(action.payload.quantity, item.stock) }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'INIT_CART':
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const CartContext = createContext<{
  state: CartState;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        dispatch({ type: 'INIT_CART', payload: JSON.parse(stored) });
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [state.items]);

  const addItem = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: `${item.productId}-${item.size}-${item.color}-${Date.now()}`,
    };
    dispatch({ type: 'ADD_ITEM', payload: newItem });
  };

  const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id: string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });
  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });

  const getItemCount = () => state.items.reduce((sum, item) => sum + item.quantity, 0);
  const getSubtotal = () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart, toggleCart, openCart, closeCart, getItemCount, getSubtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}