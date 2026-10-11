'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/product/QuantitySelector';
import { formatPrice } from '@/lib/products';

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart, getSubtotal, getItemCount } = useCart();
  const { items } = state;
  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const shipping = subtotal >= 2999 && subtotal > 0 ? 0 : (subtotal > 0 ? 199 : 0);
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-16">
        <div className="container text-center">
          <svg className="mx-auto w-24 h-24 text-muted/50 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h1 className="font-heading text-4xl text-dark-text mb-4">Your Cart is Empty</h1>
          <p className="text-muted mb-8 max-w-md mx-auto">Looks like you haven't added any sneakers to your cart yet.</p>
          <Link href="/shop">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container">
        <h1 className="font-heading text-3xl md:text-4xl text-dark-text mb-8">Shopping Cart ({itemCount})</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border border-border rounded-xl overflow-hidden">
              <ul className="divide-y divide-border" role="list">
                {items.map(item => (
                  <li key={item.id} className="flex gap-4 p-6">
                    <Link href={`/product/${item.productSlug}`} className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.productSlug}`} className="font-medium text-dark-text hover:text-primary transition-colors block mb-1">
                        {item.name}
                      </Link>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-3">
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="price-current text-lg">{formatPrice(item.price)}</span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="price-original text-sm">{formatPrice(item.originalPrice)}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <QuantitySelector
                        value={item.quantity}
                        max={item.stock}
                        onChange={quantity => updateQuantity(item.id, quantity)}
                        ariaLabel={`Quantity for ${item.name}`}
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-muted hover:text-red-500 transition-colors"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Link href="/shop" className="btn-ghost">
                ← Continue Shopping
              </Link>
              {items.length > 1 && (
                <Button variant="ghost" onClick={clearCart} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  Clear Cart
                </Button>
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="bg-white border border-border rounded-xl p-6 space-y-6">
              <h2 className="font-heading text-xl text-dark-text">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal ({itemCount} items)</span>
                  <span className="font-medium text-dark-text">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Shipping</span>
                  <span className="font-medium text-dark-text">
                    {shipping === 0 ? (
                      <span className="text-primary">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-primary bg-light-lavender px-3 py-2 rounded-lg">
                    Add {formatPrice(2999 - subtotal)} more for free shipping!
                  </p>
                )}
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="font-heading text-lg text-dark-text">Total</span>
                  <span className="font-heading text-lg text-dark-text">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <p className="text-sm text-muted">Promo code can be applied at checkout</p>
                <Link href="/checkout">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Button variant="secondary" className="w-full">
                  Buy with UPI
                </Button>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="font-medium text-dark-text mb-3">Secure Payment Methods</h3>
                <div className="flex flex-wrap gap-3 text-muted">
                  <span className="font-medium">Visa</span>
                  <span className="font-medium">Mastercard</span>
                  <span className="font-medium">UPI</span>
                  <span className="font-medium">Net Banking</span>
                  <span className="font-medium">COD</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}