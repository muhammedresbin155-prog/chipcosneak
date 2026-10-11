import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart/', '/checkout/', '/wishlist/', '/account/', '/admin/', '/api/'],
    },
    sitemap: 'https://chipcosneaks.com/sitemap.xml',
  };
}