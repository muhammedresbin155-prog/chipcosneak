import { Product, Category, Brand } from '@/types';

export const brands: Brand[] = [
  { id: 'converse', name: 'Converse', slug: 'converse', productCount: 12 },
  { id: 'vans', name: 'Vans', slug: 'vans', productCount: 12 },
  { id: 'timberland', name: 'Timberland', slug: 'timberland', productCount: 8 },
  { id: 'nike', name: 'Nike', slug: 'nike', productCount: 16 },
  { id: 'adidas', name: 'Adidas', slug: 'adidas', productCount: 16 },
  { id: 'new-balance', name: 'New Balance', slug: 'new-balance', productCount: 12 },
];

export const categories: Category[] = [
  { id: 'high-top', name: 'High-Top Sneakers', slug: 'high-top', image: '/images/categories/high-top.jpg', productCount: 18 },
  { id: 'low-top', name: 'Low-Top Sneakers', slug: 'low-top', image: '/images/categories/low-top.jpg', productCount: 22 },
  { id: 'running', name: 'Running Shoes', slug: 'running', image: '/images/categories/running.jpg', productCount: 16 },
  { id: 'basketball', name: 'Basketball Sneakers', slug: 'basketball', image: '/images/categories/basketball.jpg', productCount: 12 },
  { id: 'skate', name: 'Skate Shoes', slug: 'skate', image: '/images/categories/skate.jpg', productCount: 14 },
  { id: 'lifestyle', name: 'Lifestyle Sneakers', slug: 'lifestyle', image: '/images/categories/lifestyle.jpg', productCount: 24 },
  { id: 'retro', name: 'Retro Sneakers', slug: 'retro', image: '/images/categories/retro.jpg', productCount: 10 },
  { id: 'chunky', name: 'Chunky Sneakers', slug: 'chunky', image: '/images/categories/chunky.jpg', productCount: 8 },
  { id: 'slip-on', name: 'Slip-On Shoes', slug: 'slip-on', image: '/images/categories/slip-on.jpg', productCount: 6 },
  { id: 'training', name: 'Training Shoes', slug: 'training', image: '/images/categories/training.jpg', productCount: 8 },
];

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80';

// Deterministic seeded random number generator
function createSeededRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return function() {
    hash = (hash * 1664525 + 1013904223) % 4294967296; // LCG
    return hash / 4294967296;
  };
}

function getRandomPrice(seed: string, min: number = 2449, max: number = 3649): number {
  const random = createSeededRandom(seed + '-price');
  return Math.floor(random() * (max - min + 1)) + min;
}

function getRandomOriginalPrice(seed: string, price: number): number | undefined {
  const random = createSeededRandom(seed + '-discount');
  const hasDiscount = random() > 0.5;
  if (!hasDiscount) return undefined;
  const discount = Math.floor(random() * 15) + 5;
  return Math.round(price / (1 - discount / 100));
}

function generateSizes(seed: string, style: string): { size: string; stock: number; sku: string }[] {
  const random = createSeededRandom(seed + '-sizes');
  const isKids = false;
  const baseSizes = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'];
  const startIdx = style === 'running' || style === 'training' ? 0 : 1;
  
  return baseSizes.slice(startIdx).map((size, i) => {
    const sizeRandom = createSeededRandom(seed + '-size-' + size);
    return {
      size,
      stock: Math.floor(sizeRandom() * 20) + 3,
      sku: `SKU-${createSeededRandom(seed + '-sku-' + size)().toString(36).substr(2, 8).toUpperCase()}`,
    };
  });
}

const productImages: Record<string, string[]> = {
  // Converse
  'Chuck Taylor All Star High Top': [
    'https://images.unsplash.com/photo-1607522370275-f14206ab5d41?w=800&q=80',
    'https://images.unsplash.com/photo-1607522370275-f14206ab5d41?w=800&q=80',
    'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80',
    'https://images.unsplash.com/photo-1607522370275-f14206ab5d41?w=800&q=80',
  ],
  'Chuck Taylor All Star Low Top': [
    'https://images.unsplash.com/photo-1607522370275-f14206ab5d41?w=800&q=80',
    'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80',
    'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
    'https://images.unsplash.com/photo-1556906781-9a4129ead1c9?w=800&q=80',
  ],
  'Chuck 70 High Top': [
    'https://images.unsplash.com/photo-1607522370275-f14206ab5d41?w=800&q=80',
    'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80',
    'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
    'https://images.unsplash.com/photo-1556906781-9a4129ead1c9?w=800&q=80',
  ],
  'Chuck 70 Low Top': [
    'https://images.unsplash.com/photo-1607522370275-f14206ab5d41?w=800&q=80',
    'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80',
    'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
    'https://images.unsplash.com/photo-1556906781-9a4129ead1c9?w=800&q=80',
  ],
  // Vans
  'Old Skool': [
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
  ],
  'Authentic': [
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
  ],
  'Slip-On': [
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
  ],
  'Sk8-Hi': [
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
  ],
  // Timberland
  'Classic Sneaker': [
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  ],
  // Nike
  'Air Force 1 Low': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
  ],
  'Air Force 1 High': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
  ],
  'Dunk Low': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
  ],
  'Air Max 90': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
  ],
  'Air Max 270': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
  ],
  'Pegasus 40': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
  ],
  // Adidas
  'Superstar': [
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  ],
  'Samba': [
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  ],
  'Gazelle': [
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  ],
  'Campus 00s': [
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  ],
  'Ultraboost 22': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
  ],
  // New Balance
  '574': [
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  ],
  '327': [
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  ],
  '530': [
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  ],
  '550': [
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  ],
  '9060': [
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  ],
};

function getProductImages(modelName: string): string[] {
  return productImages[modelName] || [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
  ];
}

function getColorImages(modelName: string, colorName: string): string[] {
  const baseImages = productImages[modelName] || [];
  // Return a subset of images for color variants - in real app these would be color-specific
  return baseImages.length > 0 ? baseImages.slice(0, 3) : [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  ];
}

function generateColors(modelName: string, brand: string): { name: string; hex: string; images: string[]; sku: string }[] {
  const colorSets: Record<string, { name: string; hex: string }[]> = {
    'Chuck Taylor All Star High Top': [
      { name: 'Black', hex: '#17131F' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Red', hex: '#C9002B' },
      { name: 'Navy', hex: '#001B44' },
    ],
    'Chuck Taylor All Star Low Top': [
      { name: 'Black', hex: '#17131F' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Pink', hex: '#F5E0E0' },
      { name: 'Green', hex: '#4A6B4A' },
    ],
    'Chuck 70 High Top': [
      { name: 'Black', hex: '#17131F' },
      { name: 'White', hex: '#F5F0E8' },
      { name: 'Maroon', hex: '#800020' },
      { name: 'Olive', hex: '#6B6B4A' },
    ],
    'Chuck 70 Low Top': [
      { name: 'Black', hex: '#17131F' },
      { name: 'White', hex: '#F5F0E8' },
      { name: 'Yellow', hex: '#F5E6A0' },
      { name: 'Blue', hex: '#4A6B8A' },
    ],
    'Old Skool': [
      { name: 'Black/White', hex: '#17131F' },
      { name: 'Checkerboard', hex: '#FFFFFF' },
      { name: 'True Blue', hex: '#0056A0' },
      { name: 'Marsh Mallow', hex: '#F5F0E8' },
    ],
    'Authentic': [
      { name: 'Black', hex: '#17131F' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Red', hex: '#C9002B' },
      { name: 'Navy', hex: '#001B44' },
    ],
    'Slip-On': [
      { name: 'Black/White Checker', hex: '#17131F' },
      { name: 'True White', hex: '#FFFFFF' },
      { name: 'Flame', hex: '#E84A2B' },
      { name: 'Leopard', hex: '#C8964A' },
    ],
    'Sk8-Hi': [
      { name: 'Black/White', hex: '#17131F' },
      { name: 'Port Royale', hex: '#8B0000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Forest Green', hex: '#2E4A3C' },
    ],
    'Classic Sneaker': [
      { name: 'Wheat', hex: '#D4A574' },
      { name: 'Black', hex: '#17131F' },
      { name: 'Dark Brown', hex: '#3B2A1A' },
      { name: 'Grey', hex: '#6B6B6B' },
    ],
    'Air Force 1 Low': [
      { name: 'White/White', hex: '#FFFFFF' },
      { name: 'Black/Black', hex: '#17131F' },
      { name: 'Wheat/Gold', hex: '#D4A574' },
      { name: 'Sail/Team Red', hex: '#F5E0E0' },
    ],
    'Air Force 1 High': [
      { name: 'White/White', hex: '#FFFFFF' },
      { name: 'Black/Black', hex: '#17131F' },
      { name: 'Midnight Navy', hex: '#001B44' },
      { name: 'University Red', hex: '#C9002B' },
    ],
    'Dunk Low': [
      { name: 'Panda', hex: '#17131F' },
      { name: 'UNC', hex: '#4A6B8A' },
      { name: 'Syracuse', hex: '#E87A2B' },
      { name: 'Green', hex: '#4A6B4A' },
    ],
    'Air Max 90': [
      { name: 'Infrared', hex: '#E84A2B' },
      { name: 'Black/White', hex: '#17131F' },
      { name: 'Duck Camo', hex: '#6B8A4A' },
      { name: 'White/Red', hex: '#FFFFFF' },
    ],
    'Air Max 270': [
      { name: 'Black/Anthracite', hex: '#17131F' },
      { name: 'White/Pure Platinum', hex: '#FFFFFF' },
      { name: 'Baltic Blue', hex: '#4A6B8A' },
      { name: 'Desert Sand', hex: '#D4B996' },
    ],
    'Pegasus 40': [
      { name: 'Black/White', hex: '#17131F' },
      { name: 'White/Black', hex: '#FFFFFF' },
      { name: 'Volt/Black', hex: '#CCFF00' },
      { name: 'Blueprint/Orange', hex: '#0033A0' },
    ],
    'Superstar': [
      { name: 'White/Black', hex: '#FFFFFF' },
      { name: 'Black/White', hex: '#17131F' },
      { name: 'Green/White', hex: '#4A6B4A' },
      { name: 'Red/White', hex: '#C9002B' },
    ],
    'Samba': [
      { name: 'Black/Gum', hex: '#17131F' },
      { name: 'White/Gum', hex: '#FFFFFF' },
      { name: 'Navy/Gum', hex: '#001B44' },
      { name: 'Green/Gum', hex: '#4A6B4A' },
    ],
    'Gazelle': [
      { name: 'Green/White', hex: '#4A6B4A' },
      { name: 'Navy/White', hex: '#001B44' },
      { name: 'Red/White', hex: '#C9002B' },
      { name: 'Grey/White', hex: '#6B6B6B' },
    ],
    'Campus 00s': [
      { name: 'Black/Gum', hex: '#17131F' },
      { name: 'Green/Gum', hex: '#4A6B4A' },
      { name: 'Pink/Gum', hex: '#F5E0E0' },
      { name: 'Grey/Gum', hex: '#6B6B6B' },
    ],
    'Ultraboost 22': [
      { name: 'Core Black', hex: '#17131F' },
      { name: 'Cloud White', hex: '#FFFFFF' },
      { name: 'Solar Red', hex: '#E84A2B' },
      { name: 'Pulse Mint', hex: '#A0E8D0' },
    ],
    '574': [
      { name: 'Grey/Navy', hex: '#6B6B6B' },
      { name: 'Tan/Brown', hex: '#D4A574' },
      { name: 'Black/Grey', hex: '#17131F' },
      { name: 'White/Grey', hex: '#FFFFFF' },
    ],
    '327': [
      { name: 'Sea Salt/Black', hex: '#F5F0E8' },
      { name: 'Moonbeam/Black', hex: '#D4B996' },
      { name: 'Black/White', hex: '#17131F' },
      { name: 'Green/White', hex: '#4A6B4A' },
    ],
    '530': [
      { name: 'Silver/Blue', hex: '#A8B8D0' },
      { name: 'Black/White', hex: '#17131F' },
      { name: 'White/Silver', hex: '#FFFFFF' },
      { name: 'Navy/Silver', hex: '#001B44' },
    ],
    '550': [
      { name: 'White/Green', hex: '#FFFFFF' },
      { name: 'White/Red', hex: '#FFFFFF' },
      { name: 'White/Black', hex: '#FFFFFF' },
      { name: 'Sea Salt/Grey', hex: '#F5F0E8' },
    ],
    '9060': [
      { name: 'Castlerock/Sea Salt', hex: '#A8A8A8' },
      { name: 'Grey/Sea Salt', hex: '#6B6B6B' },
      { name: 'Black/White', hex: '#17131F' },
      { name: 'Brown/Beige', hex: '#8B7355' },
    ],
  };

  const colors = colorSets[modelName] || [
    { name: 'Black', hex: '#17131F' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Grey', hex: '#6B6B6B' },
    { name: 'Navy', hex: '#001B44' },
  ];

  return colors.map((c, i) => {
    const colorSeed = `${brand}-${modelName}-color-${i}`;
    return {
      name: c.name,
      hex: c.hex,
      images: getColorImages(modelName, c.name),
      sku: `SKU-${createSeededRandom(colorSeed + '-sku')().toString(36).substr(2, 8).toUpperCase()}`,
    };
  });
}

const sneakerStyles: Record<string, string[]> = {
  'converse': ['Chuck Taylor All Star High Top', 'Chuck Taylor All Star Low Top', 'Chuck 70 High Top', 'Chuck 70 Low Top'],
  'vans': ['Old Skool', 'Authentic', 'Slip-On', 'Sk8-Hi'],
  'timberland': ['Classic Sneaker'],
  'nike': ['Air Force 1 Low', 'Air Force 1 High', 'Dunk Low', 'Air Max 90', 'Air Max 270', 'Pegasus 40'],
  'adidas': ['Superstar', 'Samba', 'Gazelle', 'Campus 00s', 'Ultraboost 22'],
  'new-balance': ['574', '327', '530', '550', '9060'],
};

function getCategoryForStyle(brand: string, model: string): string {
  const styleCategory: Record<string, string> = {
    'Chuck Taylor All Star High Top': 'high-top',
    'Chuck Taylor All Star Low Top': 'low-top',
    'Chuck 70 High Top': 'high-top',
    'Chuck 70 Low Top': 'low-top',
    'Old Skool': 'skate',
    'Authentic': 'low-top',
    'Slip-On': 'slip-on',
    'Sk8-Hi': 'high-top',
    'Classic Sneaker': 'lifestyle',
    'Air Force 1 Low': 'lifestyle',
    'Air Force 1 High': 'high-top',
    'Dunk Low': 'basketball',
    'Air Max 90': 'running',
    'Air Max 270': 'running',
    'Pegasus 40': 'running',
    'Superstar': 'lifestyle',
    'Samba': 'lifestyle',
    'Gazelle': 'retro',
    'Campus 00s': 'lifestyle',
    'Ultraboost 22': 'running',
    '574': 'retro',
    '327': 'retro',
    '530': 'running',
    '550': 'basketball',
    '9060': 'chunky',
  };
  return styleCategory[model] || 'lifestyle';
}

function getSubcategoryForStyle(brand: string, model: string): string {
  const sub: Record<string, string> = {
    'Chuck Taylor All Star High Top': 'canvas-high-top',
    'Chuck Taylor All Star Low Top': 'canvas-low-top',
    'Chuck 70 High Top': 'premium-high-top',
    'Chuck 70 Low Top': 'premium-low-top',
    'Old Skool': 'skate-classic',
    'Authentic': 'canvas-classic',
    'Slip-On': 'slip-on-casual',
    'Sk8-Hi': 'skate-high-top',
    'Classic Sneaker': 'casual-leather',
    'Air Force 1 Low': 'basketball-lifestyle',
    'Air Force 1 High': 'basketball-high-top',
    'Dunk Low': 'basketball-lifestyle',
    'Air Max 90': 'air-max-running',
    'Air Max 270': 'air-max-lifestyle',
    'Pegasus 40': 'daily-running',
    'Superstar': 'shell-toe-classic',
    'Samba': 'indoor-soccer',
    'Gazelle': 'suede-retro',
    'Campus 00s': 'suede-lifestyle',
    'Ultraboost 22': 'boost-running',
    '574': 'classic-running',
    '327': 'retro-running',
    '530': 'modern-running',
    '550': 'basketball-retro',
    '9060': 'chunky-lifestyle',
  };
  return sub[model] || 'general';
}

export const products: Product[] = (() => {
  const result: Product[] = [];
  let id = 1;

  for (const [brandKey, models] of Object.entries(sneakerStyles)) {
    for (const model of models) {
      const modelSeed = `${brandKey}-${model}`;
      const basePrice = getRandomPrice(modelSeed);
      const originalPrice = getRandomOriginalPrice(modelSeed, basePrice);
      const category = getCategoryForStyle(brandKey, model);
      const subcategory = getSubcategoryForStyle(brandKey, model);
      
      const colors = generateColors(model, brandKey);
      const sizes = generateSizes(modelSeed, category);
      const images = getProductImages(model);
      
      const tags = [brandKey, category, model.toLowerCase().replace(/\s+/g, '-')];
      if (originalPrice) tags.push('on-sale');
      
      // Deterministic flags based on seed
      const flagsRandom = createSeededRandom(`${modelSeed}-flags`);
      const ratingRandom = createSeededRandom(`${modelSeed}-rating`);
      const reviewRandom = createSeededRandom(`${modelSeed}-reviews`);
      const dateRandom = createSeededRandom(`${modelSeed}-dates`);
      
      result.push({
        id: String(id++),
        slug: `${brandKey}-${model.toLowerCase().replace(/\s+/g, '-')}`,
        name: `${brandKey.charAt(0).toUpperCase() + brandKey.slice(1)} ${model}`,
        brand: brandKey.charAt(0).toUpperCase() + brandKey.slice(1),
        description: `The ${brandKey.charAt(0).toUpperCase() + brandKey.slice(1)} ${model} brings iconic style and comfort. ${originalPrice ? 'Currently on sale at a special price.' : 'Available at everyday pricing.'} This demo product showcases the CHIPCOSNEAKS catalog with authentic model names for display purposes only.`,
        shortDescription: `${brandKey.charAt(0).toUpperCase() + brandKey.slice(1)} ${model} - Demo product for CHIPCOSNEAKS catalog`,
        price: basePrice,
        originalPrice,
        images,
        category,
        subcategory,
        sneakerType: model,
        sizes,
        colors,
        tags,
        isNew: flagsRandom() > 0.7,
        isFeatured: flagsRandom() > 0.8,
        isLimited: flagsRandom() > 0.9,
        isBestSeller: flagsRandom() > 0.75,
        stock: sizes.reduce((sum, s) => sum + s.stock, 0),
        rating: Number((3.5 + ratingRandom() * 1.5).toFixed(1)),
        reviewCount: Math.floor(reviewRandom() * 200) + 10,
        createdAt: new Date(Date.now() - Math.floor(dateRandom() * 365 * 24 * 60 * 60 * 1000)).toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }

  // Deduplicate products by slug (unique per model)
  const seen = new Set<string>();
  const deduplicated = result.filter(product => {
    if (seen.has(product.slug)) {
      console.warn(`Duplicate product detected and removed: ${product.slug}`);
      return false;
    }
    seen.add(product.slug);
    return true;
  });

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[CHIPCOSNEAKS] Product catalog loaded: ${deduplicated.length} unique products (${result.length - deduplicated.length} duplicates removed)`);
  }

  return deduplicated;
})();

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.category === categorySlug);
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return products.filter(p => p.brand.toLowerCase() === brandSlug.toLowerCase());
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured);
}

export function getNewArrivals(limit: number = 8): Product[] {
  return products
    .filter(p => p.isNew)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getBestSellers(limit: number = 8): Product[] {
  return products
    .filter(p => p.isBestSeller)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

export function getLimitedDrops(limit: number = 8): Product[] {
  return products
    .filter(p => p.isLimited)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getRelatedProducts(productId: string, category: string, limit: number = 4): Product[] {
  return products
    .filter(p => p.id !== productId && p.category === category)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.brand.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.sneakerType?.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function filterProducts(
  products: Product[],
  filters: {
    categories?: string[];
    brands?: string[];
    priceRange?: [number, number];
    sizes?: string[];
    colors?: string[];
    inStockOnly?: boolean;
  }
): Product[] {
  return products.filter(p => {
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(p.category)) return false;
    }
    if (filters.brands && filters.brands.length > 0) {
      if (!filters.brands.includes(p.brand.toLowerCase())) return false;
    }
    if (filters.priceRange) {
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;
    }
    if (filters.sizes && filters.sizes.length > 0) {
      const hasSize = p.sizes.some(s => filters.sizes!.includes(s.size) && s.stock > 0);
      if (!hasSize) return false;
    }
    if (filters.colors && filters.colors.length > 0) {
      const hasColor = p.colors.some(c => filters.colors!.includes(c.name));
      if (!hasColor) return false;
    }
    if (filters.inStockOnly && p.stock === 0) return false;
    return true;
  });
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products];
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'popularity':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case 'name-az':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-za':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}/-`;
}

export function calculateDiscountPercentage(originalPrice: number, currentPrice: number): number {
  if (originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}