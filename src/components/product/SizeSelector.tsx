'use client';

import React from 'react';
import { ProductSize } from '@/types';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
  className?: string;
  ariaLabel?: string;
}

export const SizeSelector = ({ 
  sizes, 
  selectedSize, 
  onSizeSelect, 
  className = '',
  ariaLabel = 'Select size'
}: SizeSelectorProps) => {
  const availableSizes = sizes.filter(s => s.stock > 0);
  const unavailableSizes = sizes.filter(s => s.stock === 0);

  return (
    <div className={className}>
      <fieldset>
        <legend className="text-sm font-medium text-dark-text mb-3">{ariaLabel}</legend>
        
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={ariaLabel}>
          {availableSizes.map(size => (
            <button
              key={size.sku}
              type="button"
              onClick={() => onSizeSelect(size.size)}
              className={`size-btn ${selectedSize === size.size ? 'size-btn-selected' : ''}`}
              aria-pressed={selectedSize === size.size}
              aria-label={`Size ${size.size}${size.stock <= 5 ? `, only ${size.stock} left` : ''}`}
            >
              {size.size}
            </button>
          ))}
          
          {unavailableSizes.map(size => (
            <button
              key={size.sku}
              type="button"
              disabled
              className="size-btn size-btn-disabled"
              aria-label={`Size ${size.size}, out of stock`}
            >
              {size.size}
            </button>
          ))}
        </div>

        {availableSizes.length === 0 && (
          <p className="mt-3 text-sm text-red-500">All sizes are currently out of stock</p>
        )}
      </fieldset>
    </div>
  );
};

interface SizeChartProps {
  category: string;
}

export const SizeChart = ({ category }: SizeChartProps) => {
  const charts: Record<string, { header: string; rows: { size: string; measurements: string }[] }> = {
    running: {
      header: 'Running Shoes',
      rows: [
        { size: 'UK 6 / US 7 / EU 40', measurements: '24.5 cm' },
        { size: 'UK 7 / US 8 / EU 41', measurements: '25.5 cm' },
        { size: 'UK 8 / US 9 / EU 42', measurements: '26.5 cm' },
        { size: 'UK 9 / US 10 / EU 43', measurements: '27.5 cm' },
        { size: 'UK 10 / US 11 / EU 44', measurements: '28.5 cm' },
        { size: 'UK 11 / US 12 / EU 45', measurements: '29.5 cm' },
      ],
    },
    basketball: {
      header: 'Basketball Shoes',
      rows: [
        { size: 'UK 7 / US 8 / EU 41', measurements: '25.5 cm' },
        { size: 'UK 8 / US 9 / EU 42', measurements: '26.5 cm' },
        { size: 'UK 9 / US 10 / EU 43', measurements: '27.5 cm' },
        { size: 'UK 10 / US 11 / EU 44', measurements: '28.5 cm' },
        { size: 'UK 11 / US 12 / EU 45', measurements: '29.5 cm' },
        { size: 'UK 12 / US 13 / EU 46', measurements: '30.5 cm' },
      ],
    },
    lifestyle: {
      header: 'Lifestyle Shoes',
      rows: [
        { size: 'UK 5 / US 6 / EU 38', measurements: '23.5 cm' },
        { size: 'UK 6 / US 7 / EU 39', measurements: '24.5 cm' },
        { size: 'UK 7 / US 8 / EU 40', measurements: '25.5 cm' },
        { size: 'UK 8 / US 9 / EU 41', measurements: '26.5 cm' },
        { size: 'UK 9 / US 10 / EU 42', measurements: '27.5 cm' },
        { size: 'UK 10 / US 11 / EU 43', measurements: '28.5 cm' },
        { size: 'UK 11 / US 12 / EU 44', measurements: '29.5 cm' },
      ],
    },
    training: {
      header: 'Training Shoes',
      rows: [
        { size: 'UK 6 / US 7 / EU 40', measurements: '24.5 cm' },
        { size: 'UK 7 / US 8 / EU 41', measurements: '25.5 cm' },
        { size: 'UK 8 / US 9 / EU 42', measurements: '26.5 cm' },
        { size: 'UK 9 / US 10 / EU 43', measurements: '27.5 cm' },
        { size: 'UK 10 / US 11 / EU 44', measurements: '28.5 cm' },
        { size: 'UK 11 / US 12 / EU 45', measurements: '29.5 cm' },
      ],
    },
    football: {
      header: 'Football Boots',
      rows: [
        { size: 'UK 6 / US 7 / EU 40', measurements: '24.5 cm' },
        { size: 'UK 7 / US 8 / EU 41', measurements: '25.5 cm' },
        { size: 'UK 8 / US 9 / EU 42', measurements: '26.5 cm' },
        { size: 'UK 9 / US 10 / EU 43', measurements: '27.5 cm' },
        { size: 'UK 10 / US 11 / EU 44', measurements: '28.5 cm' },
        { size: 'UK 11 / US 12 / EU 45', measurements: '29.5 cm' },
      ],
    },
    skateboarding: {
      header: 'Skate Shoes',
      rows: [
        { size: 'UK 6 / US 7 / EU 40', measurements: '24.5 cm' },
        { size: 'UK 7 / US 8 / EU 41', measurements: '25.5 cm' },
        { size: 'UK 8 / US 9 / EU 42', measurements: '26.5 cm' },
        { size: 'UK 9 / US 10 / EU 43', measurements: '27.5 cm' },
        { size: 'UK 10 / US 11 / EU 44', measurements: '28.5 cm' },
        { size: 'UK 11 / US 12 / EU 45', measurements: '29.5 cm' },
      ],
    },
  };

  const chart = charts[category] || charts.lifestyle;

  return (
    <details className="mt-4 group">
      <summary className="flex items-center gap-2 text-sm text-primary hover:text-primary-hover cursor-pointer font-medium">
        <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        View Size Chart
      </summary>
      <div className="mt-4 p-4 bg-light-lavender rounded-lg border border-border">
        <h4 className="font-medium text-dark-text mb-3">{chart.header} Size Guide</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2 px-3 font-medium text-dark-text">Size</th>
                <th className="text-left py-2 px-3 font-medium text-dark-text">Foot Length</th>
              </tr>
            </thead>
            <tbody>
              {chart.rows.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white/50' : ''}>
                  <td className="py-2 px-3 text-dark-text">{row.size}</td>
                  <td className="py-2 px-3 text-muted">{row.measurements}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted">Measure your foot from heel to toe while standing. If between sizes, size up for comfort.</p>
      </div>
    </details>
  );
};