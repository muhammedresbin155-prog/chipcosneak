'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products, getRelatedProducts, formatPrice, calculateDiscountPercentage } from '@/lib/products';
import { Product, ProductSize, ProductColor } from '@/types';
import { Button } from '@/components/ui/Button';
import { ImageGallery } from '@/components/product/ImageGallery';
import { SizeSelector, SizeChart } from '@/components/product/SizeSelector';
import { ColorSelector } from '@/components/product/ColorSelector';
import { QuantitySelector } from '@/components/product/QuantitySelector';
import { ProductBadges } from '@/components/ui/Badge';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { addItem, openCart } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    const foundProduct = products.find(p => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0]?.name || '');
      setSelectedSize(foundProduct.sizes.find(s => s.stock > 0)?.size || null);
      setIsLoading(false);
    } else {
      router.push('/404');
    }
  }, [slug, router]);

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-light-lavender animate-pulse rounded-xl" />
          <div className="space-y-6">
            <div className="h-6 w-1/3 bg-light-lavender animate-pulse rounded" />
            <div className="h-8 w-1/2 bg-light-lavender animate-pulse rounded" />
            <div className="h-6 w-1/4 bg-light-lavender animate-pulse rounded" />
            <div className="h-32 bg-light-lavender animate-pulse rounded" />
            <div className="h-16 bg-light-lavender animate-pulse rounded" />
            <div className="h-12 bg-light-lavender animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const hasDiscount: boolean = Boolean(product.originalPrice && product.originalPrice > product.price);
  const discountPercentage = hasDiscount ? calculateDiscountPercentage(product.originalPrice!, product.price) : 0;
  const selectedColorObj = product.colors.find(c => c.name === selectedColor);
  const selectedSizeObj = product.sizes.find(s => s.size === selectedSize);
  const isOutOfStock: boolean = product.stock === 0 || !selectedSizeObj || selectedSizeObj.stock === 0;
  const inWishlist = isInWishlist(product.id);
  const colorImages = Object.fromEntries(product.colors.map(c => [c.name, c.images]));

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColorObj || isOutOfStock || !selectedSizeObj) return;

    addItem({
      productId: product.id,
      productSlug: product.slug,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: selectedColorObj.images[0] || product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
      stock: selectedSizeObj.stock,
      sku: selectedSizeObj.sku,
    });

    openCart();
    showToast({ 
      type: 'success', 
      title: 'Added to Cart', 
      message: `${product.name} (${selectedSize}, ${selectedColor}) added to your cart` 
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColorObj || isOutOfStock) return;
    
    handleAddToCart();
    router.push('/checkout');
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      showToast({ type: 'info', title: 'Removed from Wishlist', message: `${product.name} removed from your wishlist` });
    } else {
      addToWishlist({
        productId: product.id,
        productSlug: product.slug,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        size: selectedSize || undefined,
        color: selectedColor || undefined,
      });
      showToast({ type: 'success', title: 'Added to Wishlist', message: `${product.name} added to your wishlist` });
    }
  };

  const relatedProducts = getRelatedProducts(product.id, product.category, 4);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-light-lavender py-4" aria-label="Breadcrumb">
        <div className="container">
          <ol className="flex items-center gap-2 text-sm" role="list">
            <li><Link href="/" className="text-muted hover:text-primary transition-colors">Home</Link></li>
            <li className="text-muted" aria-hidden="true">/</li>
            <li><Link href="/shop" className="text-muted hover:text-primary transition-colors">Shop</Link></li>
            <li className="text-muted" aria-hidden="true">/</li>
            <li><Link href={`/shop?brand=${product.brand.toLowerCase()}`} className="text-muted hover:text-primary transition-colors">{product.brand}</Link></li>
            <li className="text-muted" aria-hidden="true">/</li>
            <li><Link href={`/shop?category=${product.category}`} className="text-muted hover:text-primary transition-colors">{product.category}</Link></li>
            <li className="text-muted" aria-hidden="true">/</li>
            <li className="text-dark-text font-medium truncate max-w-xs" aria-current="page">{product.name}</li>
          </ol>
        </div>
      </nav>

      <div className="container py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="relative">
            <ImageGallery
              images={product.images}
              alt={product.name}
              selectedColor={selectedColor}
              colorImages={colorImages}
            />
          </div>

          <div className="lg:sticky lg:top-24 space-y-6">
            <div>
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">{product.category}</p>
              <p className="text-sm font-medium text-muted uppercase tracking-wider mb-2">{product.brand}</p>
              <h1 className="font-heading text-3xl md:text-4xl text-dark-text mb-4">{product.name}</h1>
              
              <div className="flex items-baseline gap-3 mb-4">
                <span className="price-current text-3xl">{formatPrice(product.price)}</span>
                {hasDiscount && (
                  <>
                    <span className="price-original text-xl">{formatPrice(product.originalPrice!)}</span>
                    <span className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-full">-{discountPercentage}%</span>
                  </>
                )}
              </div>

              <ProductBadges 
                isNew={product.isNew} 
                isLimited={product.isLimited} 
                isOnSale={hasDiscount}
                isSoldOut={isOutOfStock}
              />
            </div>

            <div className="border-t border-border pt-6">
              <ColorSelector
                colors={product.colors}
                selectedColor={selectedColor}
                onColorSelect={setSelectedColor}
              />
            </div>

            <div className="border-t border-border pt-6">
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSizeSelect={setSelectedSize}
              />
              <SizeChart category={product.category} />
            </div>

            <div className="border-t border-border pt-6">
              <label className="block text-sm font-medium text-dark-text mb-3">Quantity</label>
              <QuantitySelector
                value={quantity}
                max={selectedSizeObj?.stock || product.stock}
                onChange={setQuantity}
                ariaLabel={`Quantity for ${product.name}`}
              />
            </div>

            <div className="border-t border-border pt-6 space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full"
                size="lg"
              >
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              
              <Button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                variant="secondary"
                className="w-full"
                size="lg"
              >
                Buy Now
              </Button>

              <button
                onClick={handleWishlistToggle}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  inWishlist 
                    ? 'bg-primary text-white hover:bg-primary-hover' 
                    : 'bg-white border-2 border-border text-dark-text hover:bg-light-lavender hover:border-primary'
                }`}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <svg className="w-5 h-5" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {inWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            <div className="border-t border-border pt-6 space-y-4 text-sm">
              <div className="flex items-center gap-2 text-muted">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span>Free shipping on orders over ₹2,999</span>
              </div>
              <div className="flex items-center gap-2 text-muted">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>30-day easy returns</span>
              </div>
              <div className="flex items-center gap-2 text-muted">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure payment options</span>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="font-medium text-dark-text mb-3">Share</h3>
              <div className="flex gap-3">
                <button className="p-2 text-muted hover:text-primary transition-colors" aria-label="Share on Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                </button>
                <button className="p-2 text-muted hover:text-primary transition-colors" aria-label="Share on Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </button>
                <button className="p-2 text-muted hover:text-primary transition-colors" aria-label="Share on WhatsApp">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 9.864 9.864 0 01-1.378-5.031c0-5.437 4.41-9.847 9.847-9.847 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.898 6.988c0 5.437-4.41 9.847-9.847 9.847zm0 0"/></svg>
                </button>
                <button className="p-2 text-muted hover:text-primary transition-colors" aria-label="Copy link">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 border-t border-border pt-12 lg:pt-16">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="section-title mb-8">Product Details</h2>
              <div className="prose max-w-none text-muted leading-relaxed">
                <p className="mb-4">{product.description}</p>
                <h3 className="font-heading text-xl text-dark-text mb-3 mt-8">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  {product.tags.map((tag, index) => (
                    <li key={index} className="text-muted">{tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ')}</li>
                  ))}
                </ul>
                <h3 className="font-heading text-xl text-dark-text mb-3 mt-8">Shipping & Returns</h3>
                <ul className="list-disc list-inside space-y-2 text-muted">
                  <li>Free standard shipping on orders over ₹2,999</li>
                  <li>Express delivery available at checkout</li>
                  <li>30-day hassle-free returns</li>
                  <li>Items must be unworn with original packaging</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-xl text-dark-text mb-4">You May Also Like</h3>
              <div className="space-y-4">
                {relatedProducts.map(relatedProduct => (
                  <Link key={relatedProduct.id} href={`/product/${relatedProduct.slug}`} className="flex gap-4 group">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-dark-text truncate group-hover:text-primary transition-colors">{relatedProduct.name}</p>
                      <p className="price-current text-sm mt-1">{formatPrice(relatedProduct.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}