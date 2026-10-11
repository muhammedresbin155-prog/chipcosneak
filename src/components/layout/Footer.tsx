'use client';

import React from 'react';
import Link from 'next/link';

const footerSections = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', href: '/shop?filter=new' },
      { label: 'Men', href: '/shop?gender=men' },
      { label: 'Women', href: '/shop?gender=women' },
      { label: 'Kids', href: '/shop?gender=kids' },
      { label: 'Sale', href: '/shop?filter=sale' },
      { label: 'Limited Drops', href: '/shop?filter=limited' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns & Exchanges', href: '/returns' },
      { label: 'Order Tracking', href: '/track-order' },
      { label: 'Size Guide', href: '/size-guide' },
    ],
  },
  {
    title: 'About CHIPCOSNEAKS',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Affiliate Program', href: '/affiliate' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'My Account', href: '/account' },
      { label: 'Order History', href: '/account/orders' },
      { label: 'Wishlist', href: '/wishlist' },
      { label: 'Gift Cards', href: '/gift-cards' },
      { label: 'Notifications', href: '/account/notifications' },
    ],
  },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/ressbinh/', icon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-.1281-.058-1.69-.072-4.949-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
  )},
  { label: 'Twitter', href: 'https://twitter.com', icon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
  )},
  { label: 'Facebook', href: 'https://facebook.com', icon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
  )},
  { label: 'YouTube', href: 'https://youtube.com', icon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  )},
];

const paymentMethods = [
  { label: 'Visa', icon: <svg className="w-8 h-5" viewBox="0 0 24 16"><text x="0" y="12" fontSize="12" fontWeight="bold" fill="currentColor">VISA</text></svg> },
  { label: 'Mastercard', icon: <svg className="w-8 h-5" viewBox="0 0 24 16"><circle cx="6" cy="8" r="5" fill="currentColor" opacity="0.7"/><circle cx="13" cy="8" r="5" fill="currentColor" opacity="0.7"/></svg> },
  { label: 'UPI', icon: <svg className="w-8 h-5" viewBox="0 0 24 16"><text x="0" y="12" fontSize="10" fontWeight="bold" fill="currentColor">UPI</text></svg> },
  { label: 'Net Banking', icon: <svg className="w-8 h-5" viewBox="0 0 24 16"><rect x="0" y="2" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5"/></svg> },
  { label: 'COD', icon: <svg className="w-8 h-5" viewBox="0 0 24 16"><text x="0" y="12" fontSize="10" fontWeight="bold" fill="currentColor">COD</text></svg> },
];

export const Footer = () => {
  return (
    <footer className="bg-dark-text text-white" role="contentinfo">
      <div className="container py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6" aria-label="CHIPCOSNEAKS Home">
              <span className="font-display text-2xl lg:text-3xl text-primary">CHIPCO</span>
              <span className="font-display text-2xl lg:text-3xl text-white">SNEAKS</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Fresh kicks. Bold energy. Your style, your rules. Premium sneakers and streetwear for the culture.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {footerSections.map(section => (
            <nav key={section.title} aria-label={section.title}>
              <h3 className="font-heading text-lg font-normal text-white mb-4">{section.title}</h3>
              <ul className="space-y-3" role="list">
                {section.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span className="text-white/40 text-sm">Secure payments:</span>
              <div className="flex items-center gap-3">
                {paymentMethods.map(method => (
                  <span key={method.label} className="text-white/60 hover:text-white transition-colors" aria-label={method.label}>
                    {method.icon}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 text-sm text-white/40">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
              <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
              <span>© 2024 CHIPCOSNEAKS. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};