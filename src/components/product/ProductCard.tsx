'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { ProductBadges, Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'featured';
  showQuickAdd?: boolean;
}

export const ProductCard = ({ product, variant = 'default', showQuickAdd = true }: ProductCardProps) => {
  const { addItem, openCart } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [imageError, setImageError] = useState(false);
  
  const inWishlist = isInWishlist(product.id);
  const hasDiscount: boolean = Boolean(product.originalPrice && product.originalPrice > product.price);
  const primaryImage = product.images[0];
  const primaryColor = product.colors[0];
  const displayImage = imageError ? FALLBACK_IMAGE : primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const defaultSize = product.sizes.find(s => s.stock > 0);
    if (!defaultSize) {
      showToast({ type: 'error', title: 'Out of Stock', message: 'This product is currently unavailable' });
      return;
    }

    addItem({
      productId: product.id,
      productSlug: product.slug,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: primaryImage,
      size: defaultSize.size,
      color: primaryColor.name,
      quantity: 1,
      stock: defaultSize.stock,
      sku: defaultSize.sku,
    });
    
    openCart();
    showToast({ type: 'success', title: 'Added to Cart', message: `${product.name} has been added to your cart` });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      showToast({ type: 'info', title: 'Removed from Wishlist', message: `${product.name} removed from your wishlist` });
    } else {
      addToWishlist({
        productId: product.id,
        productSlug: product.slug,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: primaryImage,
      });
      showToast({ type: 'success', title: 'Added to Wishlist', message: `${product.name} added to your wishlist` });
    }
  };

  const isOutOfStock: boolean = product.stock === 0;

if (variant === 'compact') {
    return (
      <Link
        href={`/product/${product.slug}`}
        className="group flex gap-4 bg-white rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg"
      >
        <motion.div
          whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(98, 70, 155, 0.15)' }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden bg-gray-50">
            <Image
              src={displayImage}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="96px"
              onError={() => !imageError && setImageError(true)}
            />
          </div>
          <div className="flex-1 p-3 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-wider">{product.category}</p>
              <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1">{product.brand}</p>
              <h3 className="font-heading text-lg font-normal text-dark-text truncate mt-1">{product.name}</h3>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-baseline gap-2">
                <span className="price-current text-lg">{formatPrice(product.price)}</span>
                {hasDiscount && <span className="price-original text-sm">{formatPrice(product.originalPrice!)}</span>}
              </div>
              <motion.button
                onClick={handleWishlistToggle}
                className={`p-1.5 rounded-lg transition-colors ${inWishlist ? 'bg-primary text-white' : 'text-muted hover:text-primary hover:bg-light-lavender'}`}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.article
      className="card group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(98, 70, 155, 0.15)' }}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link href={`/product/${product.slug}`} className="block relative h-full w-full">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => !imageError && setImageError(true)}
          />
        </Link>
        
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <ProductBadges 
            isNew={product.isNew} 
            isLimited={product.isLimited} 
            isOnSale={hasDiscount}
            isSoldOut={isOutOfStock}
          />
        </div>

        <motion.button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            inWishlist 
              ? 'bg-primary text-white shadow-lg' 
              : 'bg-white/90 text-muted hover:bg-white hover:text-primary hover:shadow-lg'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-5 h-5" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </motion.button>

        {product.colors.length > 1 && (
          <motion.div
            className="absolute bottom-3 left-3 right-3 flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {product.colors.slice(0, 4).map((color, index) => (
              <motion.button
                key={color.name}
                className="color-swatch w-6 h-6"
                style={{ backgroundColor: color.hex }}
                aria-label={`View ${color.name}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.05 }}
              />
            ))}
            {product.colors.length > 4 && (
              <button className="color-swatch w-6 h-6 flex items-center justify-center text-xs font-medium text-dark-text bg-white border-border">
                +{product.colors.length - 4}
              </button>
            )}
          </motion.div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">{product.category}</p>
        <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1">{product.brand}</p>
        <Link href={`/product/${product.slug}`}>
          <motion.h3
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="font-heading text-xl font-normal text-dark-text line-clamp-1 mb-2 group-hover:text-primary transition-colors"
          >
            {product.name}
          </motion.h3>
        </Link>
        
        <div className="flex items-baseline gap-2 mb-3">
          <span className="price-current">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <>
              <span className="price-original">{formatPrice(product.originalPrice!)}</span>
              <Badge variant="sale">-{calculateDiscountPercentage(product.originalPrice!, product.price)}%</Badge>
            </>
          )}
        </div>

        {showQuickAdd && !isOutOfStock && (
          <Button
            onClick={handleQuickAdd}
            className="w-full"
            size="md"
            variant="primary"
          >
            Quick Add
          </Button>
        )}

        {isOutOfStock && (
          <Button
            className="w-full"
            size="md"
            variant="ghost"
            disabled
          >
            Sold Out
          </Button>
        )}
      </div>
    </motion.article>
  );
};

function calculateDiscountPercentage(originalPrice: number, currentPrice: number): number {
  if (originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}