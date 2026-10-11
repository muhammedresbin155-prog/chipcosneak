'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { formatPrice } from '@/lib/products';
import { useToast } from '@/context/ToastContext';

const shippingOptions = [
  { id: 'standard', name: 'Standard Shipping', description: '3-5 business days', price: 199, estimatedDays: '3-5 days' },
  { id: 'express', name: 'Express Shipping', description: '1-2 business days', price: 499, estimatedDays: '1-2 days' },
  { id: 'free', name: 'Free Shipping', description: '5-7 business days', price: 0, estimatedDays: '5-7 days' },
];

const states = [
  { value: 'AN', label: 'Andaman and Nicobar Islands' },
  { value: 'AP', label: 'Andhra Pradesh' },
  { value: 'AR', label: 'Arunachal Pradesh' },
  { value: 'AS', label: 'Assam' },
  { value: 'BR', label: 'Bihar' },
  { value: 'CH', label: 'Chandigarh' },
  { value: 'CT', label: 'Chhattisgarh' },
  { value: 'DN', label: 'Dadra and Nagar Haveli' },
  { value: 'DD', label: 'Daman and Diu' },
  { value: 'DL', label: 'Delhi' },
  { value: 'GA', label: 'Goa' },
  { value: 'GJ', label: 'Gujarat' },
  { value: 'HR', label: 'Haryana' },
  { value: 'HP', label: 'Himachal Pradesh' },
  { value: 'JK', label: 'Jammu and Kashmir' },
  { value: 'JH', label: 'Jharkhand' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'KL', label: 'Kerala' },
  { value: 'LD', label: 'Lakshadweep' },
  { value: 'MP', label: 'Madhya Pradesh' },
  { value: 'MH', label: 'Maharashtra' },
  { value: 'MN', label: 'Manipur' },
  { value: 'ML', label: 'Meghalaya' },
  { value: 'MZ', label: 'Mizoram' },
  { value: 'NL', label: 'Nagaland' },
  { value: 'OR', label: 'Odisha' },
  { value: 'PY', label: 'Puducherry' },
  { value: 'PB', label: 'Punjab' },
  { value: 'RJ', label: 'Rajasthan' },
  { value: 'SK', label: 'Sikkim' },
  { value: 'TN', label: 'Tamil Nadu' },
  { value: 'TS', label: 'Telangana' },
  { value: 'TR', label: 'Tripura' },
  { value: 'UP', label: 'Uttar Pradesh' },
  { value: 'UK', label: 'Uttarakhand' },
  { value: 'WB', label: 'West Bengal' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { state, clearCart, getSubtotal, getItemCount } = useCart();
  const { items } = state;
  const { showToast } = useToast();
  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'IN',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
    saveInfo: false,
    sameAsShipping: true,
    billingFirstName: '',
    billingLastName: '',
    billingAddress1: '',
    billingAddress2: '',
    billingCity: '',
    billingState: '',
    billingPostalCode: '',
    billingCountry: 'IN',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; value: number; type: 'percentage' | 'fixed' } | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  const shipping = shippingOptions.find(s => s.id === formData.shippingMethod)?.price || 0;
  const discount = appliedDiscount ? (appliedDiscount.type === 'percentage' ? subtotal * appliedDiscount.value / 100 : appliedDiscount.value) : 0;
  const total = subtotal + shipping - discount;

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (stepNum === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.address1) newErrors.address1 = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    }
    
    if (stepNum === 2 && formData.paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      else if (formData.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Invalid card number';
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required';
      if (!formData.cardCvv) newErrors.cardCvv = 'CVV is required';
      else if (formData.cardCvv.length < 3) newErrors.cardCvv = 'Invalid CVV';
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(step)) return;

    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    clearCart();
    router.push('/checkout/success');
  };

  const applyDiscount = () => {
    const code = prompt('Enter discount code:');
    if (code) {
      const upperCode = code.toUpperCase();
      if (upperCode === 'WELCOME10') {
        setAppliedDiscount({ code: upperCode, value: 10, type: 'percentage' });
        showToast({ type: 'success', title: 'Discount Applied', message: '10% off applied!' });
      } else if (upperCode === 'SAVE500') {
        setAppliedDiscount({ code: upperCode, value: 500, type: 'fixed' });
        showToast({ type: 'success', title: 'Discount Applied', message: '₹500 off applied!' });
      } else {
        showToast({ type: 'error', title: 'Invalid Code', message: 'This discount code is not valid' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container">
        <div className="mb-8">
          <Link href="/cart" className="btn-ghost mb-4 inline-flex">← Back to Cart</Link>
          <h1 className="font-heading text-3xl md:text-4xl text-dark-text">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex gap-4 mb-4" role="tablist" aria-label="Checkout steps">
              {[1, 2, 3].map(stepNum => (
                <button
                  key={stepNum}
                  onClick={() => stepNum <= step && setStep(stepNum)}
                  disabled={stepNum > step}
                  className={`
                    flex-1 flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all
                    ${stepNum === step ? 'bg-primary text-white' : stepNum < step ? 'bg-light-lavender text-primary' : 'bg-gray-100 text-muted'}
                    ${stepNum > step ? 'cursor-not-allowed opacity-50' : ''}
                  `}
                  role="tab"
                  aria-selected={stepNum === step}
                  aria-disabled={stepNum > step}
                >
                  <span className={`
                    w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold
                    ${stepNum === step ? 'bg-white/20' : stepNum < step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}
                  `}>
                    {stepNum < step ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : stepNum}
                  </span>
                  <span className="hidden sm:inline">{['Contact & Shipping', 'Payment', 'Review'][stepNum - 1]}</span>
                </button>
              ))}
            </div>

            {step === 1 && (
              <form onSubmit={e => { e.preventDefault(); if (validateStep(1)) setStep(2); }} className="space-y-6">
                <fieldset>
                  <legend className="font-heading text-xl text-dark-text mb-4">Contact Information</legend>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} error={errors.email} required autoComplete="email" />
                    <Input label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} error={errors.phone} required autoComplete="tel" />
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="font-heading text-xl text-dark-text mb-4">Shipping Address</legend>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} error={errors.firstName} required autoComplete="given-name" />
                    <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} error={errors.lastName} required autoComplete="family-name" />
                  </div>
                  <Input label="Address Line 1" name="address1" value={formData.address1} onChange={handleInputChange} error={errors.address1} required autoComplete="street-address" placeholder="House/Building number, Street name" />
                  <Input label="Address Line 2 (Optional)" name="address2" value={formData.address2} onChange={handleInputChange} autoComplete="address-line2" placeholder="Apartment, suite, floor, etc." />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Input label="City" name="city" value={formData.city} onChange={handleInputChange} error={errors.city} required autoComplete="address-level2" />
                    <Select label="State" name="state" value={formData.state} onChange={handleInputChange} error={errors.state} required options={states} autoComplete="address-level1" />
                    <Input label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleInputChange} error={errors.postalCode} required autoComplete="postal-code" />
                  </div>
                </fieldset>

                <div className="border-t border-border pt-6">
                  <Button type="submit" className="w-full sm:w-auto" size="lg">
                    Continue to Payment
                  </Button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={e => { e.preventDefault(); if (validateStep(2)) setStep(3); }} className="space-y-6">
                <fieldset>
                  <legend className="font-heading text-xl text-dark-text mb-4">Shipping Method</legend>
                  <div className="space-y-3">
                    {shippingOptions.map(option => (
                      <label key={option.id} className={`
                        flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all
                        ${formData.shippingMethod === option.id ? 'border-primary bg-light-lavender' : 'border-border hover:border-primary/50'}
                      `}>
                        <input
                          type="radio"
                          name="shippingMethod"
                          value={option.id}
                          checked={formData.shippingMethod === option.id}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-dark-text">{option.name}</p>
                          <p className="text-sm text-muted">{option.description}</p>
                        </div>
                        <span className={option.price === 0 ? 'text-primary font-medium' : 'font-medium text-dark-text'}>
                          {option.price === 0 ? 'Free' : formatPrice(option.price)}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="font-heading text-xl text-dark-text mb-4">Payment Method</legend>
                  <div className="space-y-4">
                    {[
                      { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                      { id: 'upi', label: 'UPI', icon: '📱' },
                      { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
                      { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                    ].map(method => (
                      <label key={method.id} className={`
                        flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all
                        ${formData.paymentMethod === method.id ? 'border-primary bg-light-lavender' : 'border-border hover:border-primary/50'}
                      `}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                        />
                        <span className="text-2xl">{method.icon}</span>
                        <span className="font-medium text-dark-text">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {formData.paymentMethod === 'card' && (
                  <fieldset className="border-t border-border pt-6">
                    <legend className="font-heading text-xl text-dark-text mb-4">Card Details</legend>
                    <div className="space-y-4">
                      <Input label="Card Number" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} error={errors.cardNumber} placeholder="1234 5678 9012 3456" autoComplete="cc-number" maxLength={19} />
                      <div className="grid sm:grid-cols-3 gap-4">
                        <Input label="Expiry (MM/YY)" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} error={errors.cardExpiry} placeholder="MM/YY" autoComplete="cc-exp" maxLength={5} />
                        <Input label="CVV" name="cardCvv" type="password" value={formData.cardCvv} onChange={handleInputChange} error={errors.cardCvv} placeholder="123" autoComplete="cc-csc" maxLength={4} />
                        <Input label="Name on Card" name="cardName" value={formData.cardName} onChange={handleInputChange} error={errors.cardName} autoComplete="cc-name" />
                      </div>
                    </div>
                  </fieldset>
                )}

                <div className="flex justify-between">
                  <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                  <Button type="submit" className="w-full sm:w-auto" size="lg">
                    Continue to Review
                  </Button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border border-border rounded-xl overflow-hidden">
                  <div className="bg-light-lavender px-6 py-4 border-b border-border">
                    <h3 className="font-heading text-lg text-dark-text">Order Summary</h3>
                  </div>
                  <ul className="divide-y divide-border" role="list">
                    {items.map(item => (
                      <li key={item.id} className="flex gap-4 p-4">
                        <Link href={`/product/${item.productSlug}`} className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link href={`/product/${item.productSlug}`} className="font-medium text-dark-text line-clamp-1 block">{item.name}</Link>
                          <p className="text-sm text-muted">Size: {item.size} · Color: {item.color} · Qty: {item.quantity}</p>
                        </div>
                        <span className="price-current text-lg">{formatPrice(item.price * item.quantity)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Subtotal ({itemCount} items)</span>
                      <span className="font-medium text-dark-text">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Shipping</span>
                      <span className="font-medium text-dark-text">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                    </div>
                    {appliedDiscount && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount ({appliedDiscount.code})</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-border pt-3">
                      <span className="font-heading text-lg text-dark-text">Total</span>
                      <span className="font-heading text-lg text-dark-text">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
                  <Button type="submit" disabled={isProcessing} className="w-full sm:w-auto" size="lg" isLoading={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </Button>
                </div>

                <p className="text-center text-sm text-muted">
                  This is a demo checkout. No real payment will be processed.
                </p>
              </form>
            )}
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="bg-white border border-border rounded-xl p-6 space-y-6">
              <h2 className="font-heading text-xl text-dark-text">Order Summary</h2>
              
              <ul className="space-y-4 max-h-64 overflow-y-auto" role="list">
                {items.map(item => (
                  <li key={item.id} className="flex gap-3">
                    <Link href={`/product/${item.productSlug}`} className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.productSlug}`} className="text-sm font-medium text-dark-text line-clamp-1 block">{item.name}</Link>
                      <p className="text-xs text-muted">Size: {item.size} · {item.color}</p>
                      <p className="text-sm font-medium text-dark-text mt-1">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-medium text-dark-text">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Shipping</span>
                  <span className="font-medium text-dark-text">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({appliedDiscount.code})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="font-heading text-lg text-dark-text">Total</span>
                  <span className="font-heading text-lg text-dark-text">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <Button variant="ghost" className="w-full justify-start" onClick={applyDiscount}>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7c0-1.105.895-2 2-2z" />
                  </svg>
                  Apply Discount Code
                </Button>
                {appliedDiscount && (
                  <div className="flex items-center justify-between mt-2 p-2 bg-green-50 rounded-lg">
                    <span className="text-sm text-green-700">{appliedDiscount.code} applied</span>
                    <button onClick={() => setAppliedDiscount(null)} className="text-green-500 hover:text-green-700" aria-label="Remove discount">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}