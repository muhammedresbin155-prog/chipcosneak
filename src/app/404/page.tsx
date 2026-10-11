'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-16 px-4">
      <div className="container text-center">
        <h1 className="font-display text-9xl md:text-12xl text-primary/10 mb-4">404</h1>
        <h2 className="font-heading text-4xl md:text-5xl text-dark-text mb-4">Page Not Found</h2>
        <p className="text-muted mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg">Back to Home</Button>
          </Link>
          <Link href="/shop">
            <Button variant="secondary" size="lg">Shop Sneakers</Button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Link href="/shop?category=running" className="p-4 rounded-xl hover:bg-light-lavender transition-colors">
            <svg className="mx-auto w-10 h-10 text-primary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 2 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <p className="font-medium text-dark-text">Running</p>
          </Link>
          <Link href="/shop?category=basketball" className="p-4 rounded-xl hover:bg-light-lavender transition-colors">
            <svg className="mx-auto w-10 h-10 text-primary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <p className="font-medium text-dark-text">Basketball</p>
          </Link>
          <Link href="/shop?category=lifestyle" className="p-4 rounded-xl hover:bg-light-lavender transition-colors">
            <svg className="mx-auto w-10 h-10 text-primary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
            <p className="font-medium text-dark-text">Lifestyle</p>
          </Link>
          <Link href="/shop?filter=sale" className="p-4 rounded-xl hover:bg-light-lavender transition-colors">
            <svg className="mx-auto w-10 h-10 text-primary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7c0-1.105.895-2 2-2z" /></svg>
            <p className="font-medium text-dark-text">Sale</p>
          </Link>
        </div>
      </div>
    </div>
  );
}