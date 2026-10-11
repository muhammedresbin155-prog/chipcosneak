'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { products, categories, brands, filterProducts, sortProducts, searchProducts, formatPrice } from '@/lib/products';
import { Product, Category, Brand, FilterState, SortOption } from '@/types';
import { ProductGrid, ProductSkeleton } from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popularity', label: 'Most Popular' },
  { value: 'name-az', label: 'Name: A to Z' },
  { value: 'name-za', label: 'Name: Z to A' },
];

const allSizes = ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12', 'UK 13'];
const allColors = ['Black', 'White', 'Red', 'Navy', 'Pink', 'Green', 'Blue', 'Yellow', 'Orange', 'Grey', 'Brown', 'Maroon', 'Olive', 'Purple', 'Beige', 'Silver', 'Checkerboard', 'Leopard', 'Flame', 'Wheat', 'Camo'];

const priceRanges = [
  { label: 'Under ₹2,449', min: 0, max: 2449 },
  { label: '₹2,449 - ₹2,799', min: 2449, max: 2799 },
  { label: '₹2,800 - ₹3,199', min: 2800, max: 3199 },
  { label: '₹3,200 - ₹3,649', min: 3200, max: 3649 },
];

const MIN_PRICE = 2449;
const MAX_PRICE = 3649;

const getUrlFilters = (): Partial<FilterState> => {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const filters: Partial<FilterState> = {};
  
  const q = params.get('q');
  if (q) filters.search = q;
  
  const cat = params.get('category');
  if (cat) filters.categories = [cat];
  
  const brand = params.get('brand');
  if (brand) filters.brands = [brand];
  
  const filter = params.get('filter');
  if (filter === 'new') filters.categories = [...(filters.categories || []), 'new'];
  if (filter === 'sale') filters.categories = [...(filters.categories || []), 'sale'];
  if (filter === 'limited') filters.categories = [...(filters.categories || []), 'limited'];
  if (filter === 'bestsellers') filters.categories = [...(filters.categories || []), 'bestsellers'];
  
  const minPrice = params.get('minPrice');
  const maxPrice = params.get('maxPrice');
  if (minPrice || maxPrice) {
    filters.priceRange = [parseInt(minPrice || String(MIN_PRICE)), parseInt(maxPrice || String(MAX_PRICE))];
  }
  
  const sizes = params.get('sizes');
  if (sizes) filters.sizes = sizes.split(',');
  
  const colors = params.get('colors');
  if (colors) filters.colors = colors.split(',');
  
  const sort = params.get('sort') as SortOption;
  if (sort) filters.sortBy = sort;
  
  const inStock = params.get('inStock');
  if (inStock === 'true') filters.inStockOnly = true;
  
  return filters;
};

export default function ShopPage() {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    brands: [],
    priceRange: [MIN_PRICE, MAX_PRICE],
    sizes: [],
    colors: [],
    sortBy: 'newest',
    inStockOnly: false,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const urlFilters = getUrlFilters();
    setFilters(prev => ({ ...prev, ...urlFilters }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters.search]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (debouncedSearch) {
      result = searchProducts(debouncedSearch);
    }

    if (filters.categories.length > 0) {
      const categoryFilters = filters.categories.filter(c => 
        !['new', 'sale', 'limited', 'bestsellers'].includes(c)
      );
      const specialFilters = filters.categories.filter(c => 
        ['new', 'sale', 'limited', 'bestsellers'].includes(c)
      );

      if (categoryFilters.length > 0) {
        result = result.filter(p => categoryFilters.includes(p.category));
      }

      if (specialFilters.includes('new')) {
        result = result.filter(p => p.isNew);
      }
      if (specialFilters.includes('sale')) {
        result = result.filter(p => p.originalPrice && p.originalPrice > p.price);
      }
      if (specialFilters.includes('limited')) {
        result = result.filter(p => p.isLimited);
      }
      if (specialFilters.includes('bestsellers')) {
        result = result.filter(p => p.isBestSeller);
      }
    }

    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand.toLowerCase()));
    }

    if (filters.priceRange[0] > MIN_PRICE || filters.priceRange[1] < MAX_PRICE) {
      result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    }

    if (filters.sizes.length > 0) {
      result = result.filter(p => 
        p.sizes.some(s => filters.sizes.includes(s.size) && s.stock > 0)
      );
    }

    if (filters.colors.length > 0) {
      result = result.filter(p => 
        p.colors.some(c => filters.colors.includes(c.name))
      );
    }

    if (filters.inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    return sortProducts(result, filters.sortBy);
  }, [debouncedSearch, filters]);

  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      categories: [],
      brands: [],
      priceRange: [MIN_PRICE, MAX_PRICE],
      sizes: [],
      colors: [],
      sortBy: 'newest',
      inStockOnly: false,
    });
  }, []);

  const hasActiveFilters = filters.categories.length > 0 || 
    filters.brands.length > 0 ||
    filters.priceRange[0] > MIN_PRICE || 
    filters.priceRange[1] < MAX_PRICE || 
    filters.sizes.length > 0 || 
    filters.colors.length > 0 || 
    filters.inStockOnly;

  const activeFilterCount = filters.categories.length + 
    filters.brands.length +
    filters.sizes.length + 
    filters.colors.length + 
    (filters.priceRange[0] > MIN_PRICE || filters.priceRange[1] < MAX_PRICE ? 1 : 0) + 
    (filters.inStockOnly ? 1 : 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-light-lavender py-6 border-b border-border">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl text-dark-text">Shop</h1>
              <p className="text-muted mt-1">{filteredProducts.length} products found</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={filters.sortBy}
                onChange={e => updateFilters({ sortBy: e.target.value as SortOption })}
                className="input-field w-auto px-4 py-2.5 text-sm bg-white"
                aria-label="Sort products"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              
              {isMobile && (
                <Button 
                  variant="secondary" 
                  onClick={() => setIsFilterOpen(true)}
                  className="gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18a1 1 0 001-1v-2.586a1 1 0 01.293-.707l6.414-6.414a1 1 0 00.293-.707V5a1 1 0 00-1-1H9a1 1 0 00-1 1v12.586a1 1 0 01-.293.707L2.293 16.707A1 1 0 012 16V5a1 1 0 00-1-1H1a1 1 0 00-1 1v12a1 1 0 011 1h12a1 1 0 011 1v2a1 1 0 01-1 1h-2v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2z" />
                  </svg>
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex gap-8">
          <aside 
            className={`
              w-full lg:w-64 flex-shrink-0
              ${isMobile ? 'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:static lg:relative lg:transform-none' : ''}
              ${isMobile && isFilterOpen ? 'translate-x-0' : isMobile ? '-translate-x-full' : ''}
            `}
            aria-label="Product filters"
          >
            {isMobile && isFilterOpen && (
              <div className="absolute inset-0 bg-black/50 lg:hidden" onClick={() => setIsFilterOpen(false)} aria-hidden="true" />
            )}
            
            <div className={`
              bg-white border border-border rounded-xl p-6 lg:sticky lg:top-24
              ${isMobile ? 'relative z-10 h-full overflow-y-auto' : ''}
            `}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl text-dark-text">Filters</h2>
                {isMobile && (
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-1 text-muted hover:text-dark-text transition-colors"
                    aria-label="Close filters"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mb-6"
                  onClick={clearFilters}
                >
                  Clear all filters
                </Button>
              )}

              <SearchFilter search={filters.search} onChange={e => updateFilters({ search: e.target.value })} />
              
              <BrandFilter 
                brands={brands} 
                selectedBrands={filters.brands}
                onChange={brandFilter => updateFilters({ brands: brandFilter })}
              />

              <CategoryFilter 
                categories={categories} 
                selectedCategories={filters.categories.filter(c => !['new', 'sale', 'limited', 'bestsellers'].includes(c))}
                onChange={cats => updateFilters({ categories: [...cats, ...filters.categories.filter(c => ['new', 'sale', 'limited', 'bestsellers'].includes(c))] })}
              />
              
              <SpecialFilter 
                selectedCategories={filters.categories.filter(c => ['new', 'sale', 'limited', 'bestsellers'].includes(c))}
                onChange={cats => updateFilters({ categories: [...cats, ...filters.categories.filter(c => !['new', 'sale', 'limited', 'bestsellers'].includes(c))] })}
              />

              <PriceFilter 
                priceRange={filters.priceRange} 
                onChange={range => updateFilters({ priceRange: range })}
              />

              <SizeFilter 
                sizes={allSizes} 
                selectedSizes={filters.sizes} 
                onChange={sizes => updateFilters({ sizes })}
              />

              <ColorFilter 
                colors={allColors} 
                selectedColors={filters.colors} 
                onChange={colors => updateFilters({ colors })}
              />

              <InStockFilter 
                inStockOnly={filters.inStockOnly} 
                onChange={inStockOnly => updateFilters({ inStockOnly })}
              />
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            {isLoading ? (
              <ProductSkeleton count={12} />
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 px-4">
                <svg className="mx-auto h-16 w-16 text-muted/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-heading text-2xl text-dark-text mb-2">No products found</h3>
                <p className="text-muted mb-6">Try adjusting your filters or search terms</p>
                <Button variant="secondary" onClick={clearFilters}>Clear All Filters</Button>
              </div>
            ) : (
              <>
                <ProductGrid 
                  products={filteredProducts} 
                  columns={{ mobile: 1, tablet: 2, desktop: 3, large: 4 }}
                />
                <div className="mt-12 flex items-center justify-center gap-2">
                  <Button variant="ghost" disabled>Previous</Button>
                  <span className="px-4 py-2 font-medium text-dark-text">Page 1</span>
                  <Button variant="ghost" disabled>Next</Button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

const SearchFilter = ({ search, onChange }: { search: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="mb-6">
    <label htmlFor="shop-search" className="block text-sm font-medium text-dark-text mb-2">Search</label>
    <Input
      id="shop-search"
      type="search"
      placeholder="Search sneakers..."
      value={search}
      onChange={onChange}
      className="py-2.5"
    />
  </div>
);

const BrandFilter = ({ brands, selectedBrands, onChange }: { brands: { id: string; name: string; slug: string; productCount: number }[]; selectedBrands: string[]; onChange: (brands: string[]) => void }) => (
  <details className="mb-6 group">
    <summary className="flex items-center justify-between cursor-pointer list-none">
      <h3 className="font-medium text-dark-text">Brands</h3>
      <svg className="w-5 h-5 text-muted transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </summary>
    <div className="mt-4 space-y-2 animate-slide-down">
      {brands.map(brand => (
        <label key={brand.slug} className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedBrands.includes(brand.slug)}
            onChange={e => {
              const newBrands = e.target.checked
                ? [...selectedBrands, brand.slug]
                : selectedBrands.filter(b => b !== brand.slug);
              onChange(newBrands);
            }}
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-2"
          />
          <span className="text-sm text-dark-text">{brand.name}</span>
          <span className="ml-auto text-muted text-sm">{brand.productCount}</span>
        </label>
      ))}
    </div>
  </details>
);

const CategoryFilter = ({ categories, selectedCategories, onChange }: { categories: Category[]; selectedCategories: string[]; onChange: (categories: string[]) => void }) => (
  <details className="mb-6 group">
    <summary className="flex items-center justify-between cursor-pointer list-none">
      <h3 className="font-medium text-dark-text">Categories</h3>
      <svg className="w-5 h-5 text-muted transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </summary>
    <div className="mt-4 space-y-2 animate-slide-down">
      {categories.map(category => (
        <label key={category.slug} className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedCategories.includes(category.slug)}
            onChange={e => {
              const newCategories = e.target.checked
                ? [...selectedCategories, category.slug]
                : selectedCategories.filter(c => c !== category.slug);
              onChange(newCategories);
            }}
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-2"
          />
          <span className="text-sm text-dark-text">{category.name}</span>
          <span className="ml-auto text-muted text-sm">{category.productCount}</span>
        </label>
      ))}
    </div>
  </details>
);

const SpecialFilter = ({ selectedCategories, onChange }: { selectedCategories: string[]; onChange: (categories: string[]) => void }) => (
  <details className="mb-6 group">
    <summary className="flex items-center justify-between cursor-pointer list-none">
      <h3 className="font-medium text-dark-text">Collections</h3>
      <svg className="w-5 h-5 text-muted transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </summary>
    <div className="mt-4 space-y-2 animate-slide-down">
      {[
        { value: 'new', label: 'New Arrivals' },
        { value: 'sale', label: 'On Sale' },
        { value: 'limited', label: 'Limited Edition' },
        { value: 'bestsellers', label: 'Best Sellers' },
      ].map(option => (
        <label key={option.value} className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedCategories.includes(option.value)}
            onChange={e => {
              const newCategories = e.target.checked
                ? [...selectedCategories, option.value]
                : selectedCategories.filter(c => c !== option.value);
              onChange(newCategories);
            }}
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-2"
          />
          <span className="text-sm text-dark-text">{option.label}</span>
        </label>
      ))}
    </div>
  </details>
);

const PriceFilter = ({ priceRange, onChange }: { priceRange: [number, number]; onChange: (range: [number, number]) => void }) => {
  return (
    <details className="mb-6 group">
      <summary className="flex items-center justify-between cursor-pointer list-none">
        <h3 className="font-medium text-dark-text">Price Range</h3>
        <svg className="w-5 h-5 text-muted transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="mt-4 space-y-3 animate-slide-down">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={e => onChange([parseInt(e.target.value) || MIN_PRICE, priceRange[1]])}
            min={MIN_PRICE}
            max={MAX_PRICE}
            className="input-field w-1/2 py-2 text-sm"
            placeholder="Min"
            aria-label="Minimum price"
          />
          <span className="text-muted">-</span>
          <input
            type="number"
            value={priceRange[1] === MAX_PRICE ? '' : priceRange[1]}
            onChange={e => onChange([priceRange[0], parseInt(e.target.value) || MAX_PRICE])}
            min={MIN_PRICE}
            max={MAX_PRICE}
            className="input-field w-1/2 py-2 text-sm"
            placeholder="Max"
            aria-label="Maximum price"
          />
        </div>
        <div className="space-y-2">
          {priceRanges.map(option => (
            <label key={option.label} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="price-range"
                checked={priceRange[0] === option.min && priceRange[1] === option.max}
                onChange={() => onChange([option.min, option.max])}
                className="w-4 h-4 text-primary focus:ring-primary focus:ring-2 border-border"
              />
              <span className="text-sm text-dark-text">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </details>
  );
};

const SizeFilter = ({ sizes, selectedSizes, onChange }: { sizes: string[]; selectedSizes: string[]; onChange: (sizes: string[]) => void }) => (
  <details className="mb-6 group">
    <summary className="flex items-center justify-between cursor-pointer list-none">
      <h3 className="font-medium text-dark-text">Shoe Size</h3>
      <svg className="w-5 h-5 text-muted transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </summary>
    <div className="mt-4 animate-slide-down">
      <div className="flex flex-wrap gap-2">
        {sizes.map(size => (
          <label key={size} className="cursor-pointer">
            <input
              type="checkbox"
              checked={selectedSizes.includes(size)}
              onChange={e => {
                const newSizes = e.target.checked
                  ? [...selectedSizes, size]
                  : selectedSizes.filter(s => s !== size);
                onChange(newSizes);
              }}
              className="sr-only peer"
            />
            <span className={`
              inline-flex items-center justify-center w-10 h-10 rounded-lg border-2 text-sm font-medium transition-all
              ${selectedSizes.includes(size) 
                ? 'border-primary bg-primary text-white' 
                : 'border-border text-dark-text hover:border-primary hover:bg-light-lavender'
              }
              peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2
            `}>
              {size}
            </span>
          </label>
        ))}
      </div>
    </div>
  </details>
);

const ColorFilter = ({ colors, selectedColors, onChange }: { colors: string[]; selectedColors: string[]; onChange: (colors: string[]) => void }) => (
  <details className="mb-6 group">
    <summary className="flex items-center justify-between cursor-pointer list-none">
      <h3 className="font-medium text-dark-text">Color</h3>
      <svg className="w-5 h-5 text-muted transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </summary>
    <div className="mt-4 animate-slide-down">
      <div className="flex flex-wrap gap-3">
        {colors.map(color => {
          const colorMap: Record<string, string> = {
            'Black': '#17131F', 'White': '#FFFFFF', 'Red': '#C9002B', 'Navy': '#001B44',
            'Pink': '#F5E0E0', 'Green': '#4A6B4A', 'Blue': '#4A6B8A', 'Yellow': '#F5E6A0',
            'Orange': '#E87A2B', 'Grey': '#6B6B6B', 'Brown': '#8B7355', 'Maroon': '#800020',
            'Olive': '#6B6B4A', 'Purple': '#6B4A8A', 'Beige': '#D4B996', 'Silver': '#A8A8A8',
            'Checkerboard': '#FFFFFF', 'Leopard': '#C8964A', 'Flame': '#E84A2B', 'Wheat': '#D4A574', 'Camo': '#6B8A4A',
          };
          return (
            <label key={color} className="cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={e => {
                  const newColors = e.target.checked
                    ? [...selectedColors, color]
                    : selectedColors.filter(c => c !== color);
                  onChange(newColors);
                }}
                className="sr-only peer"
              />
              <span className={`
                color-swatch relative
                ${selectedColors.includes(color) ? 'color-swatch-selected' : ''}
                peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2
              `} style={{ backgroundColor: colorMap[color] || '#CCCCCC' }}>
                {selectedColors.includes(color) && (
                  <svg className="absolute inset-0 flex items-center justify-center text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="sr-only">{color}</span>
            </label>
          );
        })}
      </div>
    </div>
  </details>
);

const InStockFilter = ({ inStockOnly, onChange }: { inStockOnly: boolean; onChange: (inStockOnly: boolean) => void }) => (
  <details className="group">
    <summary className="flex items-center justify-between cursor-pointer list-none">
      <h3 className="font-medium text-dark-text">Availability</h3>
      <svg className="w-5 h-5 text-muted transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </summary>
    <div className="mt-4 space-y-2 animate-slide-down">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={e => onChange(e.target.checked)}
          className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-2"
        />
        <span className="text-sm text-dark-text">In Stock Only</span>
      </label>
    </div>
  </details>
);