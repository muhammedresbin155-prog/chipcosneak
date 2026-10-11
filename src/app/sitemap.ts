import { MetadataRoute } from 'next';
import { products, categories } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://chipcosneaks.com';
  
  const staticRoutes = [
    '',
    '/shop',
    '/cart',
    '/wishlist',
    '/checkout',
    '/about',
    '/contact',
    '/faq',
    '/shipping',
    '/returns',
    '/track-order',
    '/size-guide',
    '/privacy',
    '/terms',
    '/cookies',
    '/accessibility',
    '/careers',
    '/press',
    '/affiliate',
    '/gift-cards',
    '/sustainability',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const productRoutes = products.map(product => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const categoryRoutes = categories.map(category => ({
    url: `${baseUrl}/shop?category=${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}