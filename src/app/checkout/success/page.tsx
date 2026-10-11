'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function CheckoutSuccessPage() {
  const orderId = 'CHPC-' + Math.random().toString(36).substr(2, 8).toUpperCase();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-16">
      <div className="container text-center max-w-md">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-heading text-4xl text-dark-text mb-4">Order Confirmed!</h1>
          <p className="text-muted">Thank you for your order. We've sent a confirmation email to your inbox.</p>
        </div>

        <div className="bg-light-lavender rounded-xl p-6 mb-8 text-left">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium text-dark-text">Order Number</span>
            <span className="font-heading text-xl text-primary font-mono">{orderId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted">Status</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">Confirmed</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link href="/account/orders">
            <Button className="w-full" size="lg">View Order Details</Button>
          </Link>
          <Link href="/shop">
            <Button variant="secondary" className="w-full">Continue Shopping</Button>
          </Link>
        </div>

        <p className="text-sm text-muted mt-8">
          This is a demo checkout. No actual payment was processed and no order was created.
        </p>
      </div>
    </div>
  );
}