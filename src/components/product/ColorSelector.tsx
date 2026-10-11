'use client';

import React from 'react';
import { ProductColor } from '@/types';

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: string;
  onColorSelect: (colorName: string) => void;
  className?: string;
  ariaLabel?: string;
}

export const ColorSelector = ({ 
  colors, 
  selectedColor, 
  onColorSelect, 
  className = '',
  ariaLabel = 'Select color'
}: ColorSelectorProps) => {
  return (
    <div className={className}>
      <fieldset>
        <legend className="text-sm font-medium text-dark-text mb-3">{ariaLabel}</legend>
        
        <div className="flex flex-wrap gap-3" role="radiogroup" aria-label={ariaLabel}>
          {colors.map(color => (
            <button
              key={color.sku}
              type="button"
              onClick={() => onColorSelect(color.name)}
              className={`color-swatch relative ${selectedColor === color.name ? 'color-swatch-selected' : ''}`}
              style={{ backgroundColor: color.hex }}
              aria-pressed={selectedColor === color.name}
              aria-label={color.name}
            >
              {selectedColor === color.name && (
                <svg className="absolute inset-0 flex items-center justify-center text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>

        <p className="mt-3 text-sm text-muted">
          Selected: <span className="font-medium text-dark-text">{selectedColor}</span>
        </p>
      </fieldset>
    </div>
  );
};