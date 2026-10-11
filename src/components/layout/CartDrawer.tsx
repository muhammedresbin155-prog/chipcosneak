'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/products';
import { QuantitySelector } from '@/components/product/QuantitySelector';

export const CartDrawer = () => {
  const { state, removeItem, updateQuantity, closeCart, getSubtotal, getItemCount } = useCart();
  const { items, isOpen } = state;
  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const shipping = subtotal >= 2999 ? 0 : 199;
  const total = subtotal + shipping;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={closeCart} aria-hidden="true" />
      
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading text-xl text-dark-text">Cart ({itemCount})</h2>
          <button
            onClick={closeCart}
            className="p-2 text-muted hover:text-dark-text transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <svg className="w-16 h-16 text-muted/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3 className="font-heading text-xl text-dark-text mb-2">Your cart is empty</h3>
              <p className="text-muted mb-6">Looks like you haven't added any sneakers yet.</p>
              <Button onClick={() => { closeCart(); window.location.href = '/shop'; }} size="lg">
                Start Shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-4" role="list">
              {items.map(item => (
                <li key={item.id} className="flex gap-3">
                  <Link href={`/product/${item.productSlug}`} className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.productSlug}`} className="font-medium text-dark-text line-clamp-1 block mb-1">
                      {item.name}
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-muted mb-2">
                      <span>Size: {item.size}</span>
                      <span>·</span>
                      <span>{item.color}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="price-current text-lg">{formatPrice(item.price)}</span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="price-original text-sm">{formatPrice(item.originalPrice)}</span>
                      )}
                    </div>
                    <QuantitySelector
                      value={item.quantity}
                      max={item.stock}
                      onChange={quantity => updateQuantity(item.id, quantity)}
                      className="mt-2"
                      ariaLabel={`Quantity for ${item.name}`}
                    />
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-muted hover:text-red-500 transition-colors flex-shrink-0"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium text-dark-text">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span className="font-medium text-dark-text">
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-primary bg-light-lavender px-3 py-2 rounded-lg">
                  Add {formatPrice(2999 - subtotal)} more for free shipping!
                </p>
              )}
              <div className="flex justify-between border-t border-border pt-2">
                <span className="font-heading text-lg text-dark-text">Total</span>
                <span className="font-heading text-lg text-dark-text">{formatPrice(total)}</span>
              </div>
            </div>

            <Button 
              onClick={() => { closeCart(); window.location.href = '/checkout'; }}
              className="w-full"
              size="lg"
            >
              Proceed to Checkout
            </Button>

            <Button
              onClick={() => { closeCart(); window.location.href = '/cart'; }}
              variant="secondary"
              className="w-full"
            >
              View Cart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};