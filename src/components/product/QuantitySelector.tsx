'use client';

import React from 'react';

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
  className?: string;
  ariaLabel?: string;
}

export const QuantitySelector = ({ 
  value, 
  min = 1, 
  max, 
  onChange, 
  className = '',
  ariaLabel = 'Quantity'
}: QuantitySelectorProps) => {
  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  return (
    <div className={`inline-flex items-center border border-border rounded-lg overflow-hidden ${className}`} role="group" aria-label={ariaLabel}>
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        className="quantity-btn disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const newValue = parseInt(e.target.value) || min;
          onChange(Math.min(Math.max(newValue, min), max));
        }}
        onBlur={(e) => {
          const newValue = parseInt(e.target.value) || min;
          onChange(Math.min(Math.max(newValue, min), max));
        }}
        min={min}
        max={max}
        className="w-12 text-center border-x border-border bg-white text-dark-text focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
        aria-label={ariaLabel}
      />
      
      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        className="quantity-btn disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};