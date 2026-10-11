'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  selectedColor?: string;
  colorImages?: Record<string, string[]>;
}

export const ImageGallery = ({ images, alt, selectedColor, colorImages }: ImageGalleryProps) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const mainImageRef = useRef<HTMLDivElement>(null);
  
  const currentImages = colorImages?.[selectedColor || '']?.length ? colorImages[selectedColor || ''] : images;
  const safeIndex = Math.min(mainImageIndex, currentImages.length - 1);
  const mainImage = currentImages[safeIndex] || images[0];
  const isMainImageError = imageErrors.has(safeIndex);
  
  // Check if images are local SVG files (no longer needed for remote images, but kept for compatibility)
  const isLocalSvg = false;

  useEffect(() => {
    setMainImageIndex(0);
  }, [selectedColor]);

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set([...prev, index]));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !mainImageRef.current) return;
    
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const handleMouseLeave = () => {
    setZoomPosition({ x: 50, y: 50 });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setMainImageIndex(prev => (prev - 1 + currentImages.length) % currentImages.length);
        break;
      case 'ArrowRight':
        e.preventDefault();
        setMainImageIndex(prev => (prev + 1) % currentImages.length);
        break;
      case 'Escape':
        setIsZoomed(false);
        break;
      default:
        break;
    }
  };

  const getImageSrc = (index: number) => {
    return imageErrors.has(index) ? FALLBACK_IMAGE : currentImages[index];
  };

  return (
    <div className="relative">
      <div 
        ref={mainImageRef}
        className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsZoomed(!isZoomed)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
      >
        <Image
          src={getImageSrc(safeIndex)}
          alt={alt}
          fill
          className={`object-cover transition-transform duration-500 ${isZoomed ? 'scale-200' : ''}`}
          style={{ transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
          onError={() => handleImageError(safeIndex)}
        />
        
        {isZoomed && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4 pointer-events-none">
            <p className="text-white text-sm font-medium">Move to explore · Click to zoom out</p>
          </div>
        )}

        {currentImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {currentImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setMainImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === safeIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75'}`}
                aria-label={`View image ${index + 1}`}
                aria-current={index === safeIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        )}
      </div>

      {currentImages.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide" role="list" aria-label="Product images">
{currentImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setMainImageIndex(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === safeIndex ? 'border-primary' : 'border-transparent hover:border-primary/50'
              }`}
              aria-label={`View image ${index + 1}`}
              aria-current={index === safeIndex ? 'true' : 'false'}
              role="listitem"
            >
              <Image
                src={imageErrors.has(index) ? FALLBACK_IMAGE : image}
                alt={`${alt} - view ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
                onError={() => handleImageError(index)}
              />
            </button>
          ))}
        </div>
      )}

      {colorImages && Object.keys(colorImages).length > 1 && (
        <div className="mt-6" role="group" aria-label="Color options">
          <p className="text-sm font-medium text-dark-text mb-3">Available Colors</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(colorImages).map(([colorName, colorImgs]) => (
              <button
                key={colorName}
                onClick={() => {}}
                className={`relative aspect-square w-16 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedColor === colorName ? 'border-primary' : 'border-border hover:border-primary/50'
                }`}
                aria-label={`${colorName}${selectedColor === colorName ? ', selected' : ''}`}
                aria-pressed={selectedColor === colorName}
              >
                <Image
                  src={colorImgs[0]}
                  alt={colorName}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
                {selectedColor === colorName && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};