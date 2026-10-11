'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/products';
import { useToast } from '@/context/ToastContext';

export default function WishlistPage() {
  const { state, removeItem, clearWishlist } = useWishlist();
  const { addItem, openCart } = useCart();
  const { showToast } = useToast();
  const { items } = state;

  const handleMoveToCart = (item: typeof items[0]) => {
    addItem({
      productId: item.productId,
      productSlug: item.productSlug,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      size: item.size || 'UK 8',
      color: item.color || 'Default',
      quantity: 1,
      stock: 10,
      sku: 'WISH-001',
    });
    removeItem(item.id);
    openCart();
    showToast({ type: 'success', title: 'Moved to Cart', message: `${item.name} has been added to your cart` });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-16">
        <div className="container text-center">
          <svg className="mx-auto w-24 h-24 text-muted/50 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h1 className="font-heading text-4xl text-dark-text mb-4">Your Wishlist is Empty</h1>
          <p className="text-muted mb-8 max-w-md mx-auto">Save your favorite sneakers for later. They'll be waiting here when you're ready.</p>
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-3xl md:text-4xl text-dark-text">Wishlist ({items.length})</h1>
          <Button variant="ghost" onClick={clearWishlist} className="text-red-500 hover:text-red-600">
            Clear Wishlist
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(item => (
            <article key={item.id} className="card group relative">
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Link href={`/product/${item.productSlug}`} className="block">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="product-image object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </Link>
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-muted hover:text-red-500 hover:bg-white transition-colors"
                  aria-label={`Remove ${item.name} from wishlist`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-4">
                <Link href={`/product/${item.productSlug}`}>
                  <h3 className="font-heading text-lg font-normal text-dark-text line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </Link>
                
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="price-current">{formatPrice(item.price)}</span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="price-original text-sm">{formatPrice(item.originalPrice)}</span>
                  )}
                </div>

                {(item.size || item.color) && (
                  <div className="flex flex-wrap gap-2 text-sm text-muted mb-4">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.color && <span>Color: {item.color}</span>}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1"
                    size="sm"
                  >
                    Move to Cart
                  </Button>
                  <Link href={`/product/${item.productSlug}`}>
                    <Button variant="secondary" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}