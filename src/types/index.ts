export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  productCount: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  sneakerType?: string;
  sizes: ProductSize[];
  colors: ProductColor[];
  tags: string[];
  isNew: boolean;
  isFeatured: boolean;
  isLimited: boolean;
  isBestSeller: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSize {
  size: string;
  stock: number;
  sku: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  images: string[];
  sku: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  productSlug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  stock: number;
  sku: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  productSlug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size?: string;
  color?: string;
  addedAt: string;
}

export interface FilterState {
  search: string;
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  sortBy: SortOption;
  inStockOnly: boolean;
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'popularity' | 'name-az' | 'name-za';

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';

export interface DiscountCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  validFrom: string;
  validUntil: string;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface Announcement {
  id: string;
  message: string;
  link?: string;
  type: 'info' | 'promo' | 'shipping' | 'sale';
  isActive: boolean;
}