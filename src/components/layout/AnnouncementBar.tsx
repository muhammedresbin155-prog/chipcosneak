'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Announcement } from '@/types';

const announcements: Announcement[] = [
  {
    id: '1',
    message: 'Free shipping on orders over ₹2,999',
    type: 'shipping',
    isActive: true,
  },
  {
    id: '2',
    message: 'New Spring Collection just dropped! Shop now',
    link: '/shop?category=new-arrivals',
    type: 'promo',
    isActive: true,
  },
  {
    id: '3',
    message: 'Limited edition drops every Friday at 10 AM',
    type: 'sale',
    isActive: true,
  },
];

export const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const activeAnnouncements = announcements.filter(a => a.isActive);

  if (!isVisible || activeAnnouncements.length === 0) return null;

  useEffect(() => {
    if (activeAnnouncements.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % activeAnnouncements.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeAnnouncements.length]);

  const announcement = activeAnnouncements[currentIndex];

  return (
    <div className="bg-primary text-white py-2 overflow-hidden" role="region" aria-label="Announcements">
      <div className="container flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 animate-slide-up">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {announcement.link ? (
            <Link 
              href={announcement.link} 
              className="font-medium hover:underline transition-colors whitespace-nowrap"
            >
              {announcement.message}
            </Link>
          ) : (
            <span className="font-medium whitespace-nowrap">{announcement.message}</span>
          )}
        </div>
        
        {activeAnnouncements.length > 1 && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setCurrentIndex(prev => (prev - 1 + activeAnnouncements.length) % activeAnnouncements.length)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Previous announcement"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentIndex(prev => (prev + 1) % activeAnnouncements.length)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Next announcement"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors ml-2"
              aria-label="Dismiss announcements"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};