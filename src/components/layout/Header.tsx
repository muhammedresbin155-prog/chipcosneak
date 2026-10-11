'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/Button';
import { AnnouncementBar } from './AnnouncementBar';
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react';

const navigation = [
  { label: 'New Arrivals', href: '/shop?filter=new' },
  { label: 'Men', href: '/shop?gender=men', children: [
    { label: 'Running', href: '/shop?category=running&gender=men' },
    { label: 'Basketball', href: '/shop?category=basketball&gender=men' },
    { label: 'Lifestyle', href: '/shop?category=lifestyle&gender=men' },
    { label: 'Training', href: '/shop?category=training&gender=men' },
  ]},
  { label: 'Women', href: '/shop?gender=women', children: [
    { label: 'Running', href: '/shop?category=running&gender=women' },
    { label: 'Lifestyle', href: '/shop?category=lifestyle&gender=women' },
    { label: 'Training', href: '/shop?category=training&gender=women' },
  ]},
  { label: 'Kids', href: '/shop?gender=kids' },
  { label: 'Sale', href: '/shop?filter=sale' },
  { label: 'About', href: '/about' },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { state: cartState, openCart, getItemCount } = useCart();
  const { getItemCount: getWishlistCount } = useWishlist();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const cartCount = getItemCount();
  const wishlistCount = getWishlistCount();

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close dropdown on outside click (desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown) {
        const dropdownRef = dropdownRefs.current.get(activeDropdown);
        const triggerRef = document.querySelector(`[data-dropdown-trigger="${activeDropdown}"]`);
        if (dropdownRef && !dropdownRef.contains(event.target as Node) &&
            triggerRef && !triggerRef.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeDropdown) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDropdown]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleDropdownMouseEnter = useCallback((href: string) => {
    setActiveDropdown(href);
  }, []);

  const handleDropdownMouseLeave = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border" role="banner">
      <AnnouncementBar />
      
      <nav className="container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20 gap-2 sm:gap-4">
          <Link 
            href="/" 
            className="flex items-center flex-shrink-0"
            aria-label="CHIPCOSNEAKS Home"
          >
            <span className="font-display text-xl sm:text-2xl md:text-3xl text-primary tracking-tight">CHIPCO</span>
            <span className="font-display text-xl sm:text-2xl md:text-3xl text-dark-text tracking-tight">SNEAKS</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1 flex-1 max-w-4xl relative z-30" role="menubar">
            <form onSubmit={handleSearch} className="relative flex-1 max-w-md" role="search">
              <label htmlFor="header-search" className="visually-hidden">Search products</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" strokeWidth={2} aria-hidden="true" />
                <input
                  id="header-search"
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search sneakers..."
                  className="w-full pl-10 pr-4 py-2.5 bg-light-lavender border-0 rounded-full text-dark-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </form>

            <div className="flex items-center gap-1" role="menubar">
              {navigation.map(item => (
                <DropdownItem 
                  key={item.href} 
                  item={item} 
                  isOpen={activeDropdown === item.href}
                  onOpen={handleDropdownMouseEnter}
                  onClose={handleDropdownMouseLeave}
                  dropdownRefs={dropdownRefs}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-4">
            <button
              onClick={() => window.location.href = '/wishlist'}
              className="relative p-2 text-muted hover:text-primary transition-colors rounded-lg hover:bg-light-lavender"
              aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`}
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-primary text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={openCart}
              className="relative p-2 text-muted hover:text-primary transition-colors rounded-lg hover:bg-light-lavender"
              aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ' empty'}`}
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-primary text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-dark-text hover:text-primary transition-colors rounded-lg hover:bg-light-lavender"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Dropdown Portals - rendered at header level to avoid clipping */}
      {activeDropdown && (
        <DropdownPortal
          triggerHref={activeDropdown}
          items={navigation.find(item => item.href === activeDropdown)?.children || []}
          onClose={() => setActiveDropdown(null)}
        />
      )}

      {isMobileMenuOpen && (
        <MobileMenu 
          ref={mobileMenuRef}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
    </header>
  );
};

interface DropdownItemProps {
  item: typeof navigation[0];
  isOpen: boolean;
  onOpen: (href: string) => void;
  onClose: () => void;
  dropdownRefs: React.RefObject<Map<string, HTMLDivElement>>;
}

const DropdownItem = ({ item, isOpen, onOpen, onClose, dropdownRefs }: DropdownItemProps) => {
  const hasChildren = item.children && item.children.length > 0;
  const triggerRef = useRef<HTMLAnchorElement>(null);

  return (
    <div className="relative" role={hasChildren ? 'menuitem' : undefined}>
      <Link
        ref={triggerRef}
        href={item.href}
        data-dropdown-trigger={item.href}
        className={`font-medium text-sm transition-colors hover:text-primary ${isOpen ? 'text-primary' : 'text-dark-text'}`}
        aria-haspopup={hasChildren ? 'true' : 'false'}
        aria-expanded={isOpen}
        onMouseEnter={() => hasChildren && onOpen(item.href)}
        onMouseLeave={() => hasChildren && onClose()}
        onFocus={() => hasChildren && onOpen(item.href)}
        onBlur={() => hasChildren && onClose()}
      >
        {item.label}
        {hasChildren && (
          <svg className="inline w-4 h-4 ml-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </Link>
    </div>
  );
};

interface DropdownPortalProps {
  triggerHref: string;
  items: Array<{ label: string; href: string }>;
  onClose: () => void;
}

const DropdownPortal = ({ triggerHref, items, onClose }: DropdownPortalProps) => {
  const triggerElement = document.querySelector(`[data-dropdown-trigger="${triggerHref}"]`);
  
  if (!triggerElement || items.length === 0) return null;

  const triggerRect = triggerElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  
  // Calculate dropdown position
  const dropdownWidth = 224; // w-56 = 14rem = 224px
  let left = triggerRect.left;
  
  // Prevent dropdown from going off-screen on the right
  if (left + dropdownWidth > viewportWidth - 16) {
    left = viewportWidth - dropdownWidth - 16;
  }
  
  // Prevent dropdown from going off-screen on the left
  if (left < 16) {
    left = 16;
  }

  const top = triggerRect.bottom + 8; // mt-2 = 8px

  return (
    <div
      className="fixed z-50 animate-slide-down"
      style={{ top: `${top}px`, left: `${left}px` }}
      role="menu"
      onMouseLeave={onClose}
      onMouseEnter={() => {}}
    >
      <div className="bg-white rounded-xl shadow-lg border border-border py-3 w-56" role="menu">
        {items.map(child => (
          <Link
            key={child.href}
            href={child.href}
            className="block px-4 py-2 text-sm text-dark-text hover:bg-light-lavender hover:text-primary transition-colors"
            role="menuitem"
            onClick={onClose}
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

const MobileMenu = React.forwardRef<HTMLDivElement, {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}>(({ isOpen, onClose, searchQuery, setSearchQuery }, ref) => {
  const { state: cartState, openCart, getItemCount } = useCart();
  const { getItemCount: getWishlistCount } = useWishlist();
  const cartCount = getItemCount();
  const wishlistCount = getWishlistCount();

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 lg:hidden animate-slide-down"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile menu"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-full bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading text-xl text-dark-text">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 text-muted hover:text-dark-text transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={e => { e.preventDefault(); if (searchQuery.trim()) window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`; }} className="p-4 border-b border-border" role="search">
          <label htmlFor="mobile-search" className="visually-hidden">Search products</label>
          <input
            id="mobile-search"
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search sneakers..."
            className="w-full pl-10 pr-4 py-3 bg-light-lavender border-0 rounded-lg text-dark-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
        </form>

        <nav className="flex-1 overflow-y-auto p-4" aria-label="Mobile navigation">
          <ul className="space-y-1" role="list">
            {navigation.map(item => (
              <MobileNavItem key={item.href} item={item} onClose={onClose} />
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border space-y-3">
          <Link href="/wishlist" className="flex items-center justify-between px-4 py-3 bg-light-lavender rounded-lg text-dark-text">
            <span className="font-medium">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">{wishlistCount}</span>
            )}
          </Link>
          <button
            onClick={() => { openCart(); onClose(); }}
            className="flex items-center justify-between w-full px-4 py-3 bg-light-lavender rounded-lg text-dark-text text-left"
          >
            <span className="font-medium">Cart</span>
            {cartCount > 0 && (
              <span className="bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

MobileMenu.displayName = 'MobileMenu';

const MobileNavItem = ({ item, onClose }: { item: typeof navigation[0]; onClose: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li>
      {hasChildren ? (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-dark-text font-medium rounded-lg hover:bg-light-lavender transition-colors"
            aria-expanded={isOpen}
          >
            <span>{item.label}</span>
            <svg className={`w-5 h-5 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isOpen && (
            <ul className="mt-1 ml-4 space-y-1 border-l-2 border-light-lavender" role="list">
              {item.children!.map(child => (
                <li key={child.href}>
                  <Link href={child.href} onClick={() => { setIsOpen(false); onClose(); }} className="block px-3 py-2 text-sm text-muted hover:text-primary transition-colors">
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <Link href={item.href} onClick={onClose} className="block px-4 py-3 text-dark-text font-medium rounded-lg hover:bg-light-lavender transition-colors">
          {item.label}
        </Link>
      )}
    </li>
  );
};

export default Header;