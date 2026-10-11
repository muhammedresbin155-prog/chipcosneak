'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { products, categories, brands } from '@/lib/products';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/products';
import { Select } from '@/components/ui/Input';

const demoStats = [
  { label: 'Total Orders', value: '1,234', change: '+12%', trend: 'up' },
  { label: 'Revenue', value: '₹45.6L', change: '+8%', trend: 'up' },
  { label: 'Conversion Rate', value: '3.2%', change: '-0.5%', trend: 'down' },
  { label: 'Avg Order Value', value: '₹3,692', change: '+3%', trend: 'up' },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'Rahul Sharma', date: '2024-03-15', total: 12999, status: 'delivered', items: 2 },
  { id: 'ORD-002', customer: 'Priya Patel', date: '2024-03-14', total: 24999, status: 'shipped', items: 1 },
  { id: 'ORD-003', customer: 'Amit Kumar', date: '2024-03-14', total: 8999, status: 'processing', items: 1 },
  { id: 'ORD-004', customer: 'Sneha Reddy', date: '2024-03-13', total: 35997, status: 'confirmed', items: 3 },
  { id: 'ORD-005', customer: 'Vikram Singh', date: '2024-03-13', total: 15999, status: 'pending', items: 1 },
];

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  returned: 'bg-gray-100 text-gray-700',
};

const TabIcons = {
  overview: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  products: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  orders: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  discounts: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7c0-1.105.895-2 2-2z" />
    </svg>
  ),
};

const TrendIcons = {
  up: (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ),
  down: (
    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7v-18" />
    </svg>
  ),
};

const tabs = [
  { id: 'overview', label: 'Overview', icon: TabIcons.overview },
  { id: 'products', label: 'Products', icon: TabIcons.products },
  { id: 'orders', label: 'Orders', icon: TabIcons.orders },
  { id: 'discounts', label: 'Discounts', icon: TabIcons.discounts },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'discounts'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPassword, setAuthPassword] = useState('');

  const handleLogin = () => {
    if (authPassword === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password. Demo password: admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-16">
        <div className="container max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <span className="font-display text-3xl text-primary">CHIPCO</span>
              <span className="font-display text-3xl text-dark-text">SNEAKS</span>
            </Link>
            <h1 className="font-heading text-3xl text-dark-text mb-2">Admin Dashboard</h1>
            <p className="text-muted">Enter password to access admin panel (Demo: admin123)</p>
          </div>
          <div className="bg-white border border-border rounded-xl p-8">
            <Input
              label="Password"
              type="password"
              value={authPassword}
              onChange={e => setAuthPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
            <Button className="w-full mt-4" size="lg" onClick={handleLogin}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const [brandFilter, setBrandFilter] = useState('');

  const filteredProducts = products.filter(p => 
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (brandFilter === '' || p.brand.toLowerCase() === brandFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="flex items-center gap-2">
                <span className="font-display text-xl text-primary">CHIPCO</span>
                <span className="font-display text-xl text-dark-text">SNEAKS</span>
              </Link>
              <nav className="hidden md:flex gap-1" role="tablist" aria-label="Admin sections">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${activeTab === tab.id ? 'bg-primary text-white' : 'text-muted hover:text-dark-text hover:bg-light-lavender'}
                    `}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="btn-ghost text-sm">View Store</Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="font-heading text-3xl text-dark-text mb-2">Dashboard Overview</h1>
              <p className="text-muted">Welcome back! Here's what's happening with your store.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {demoStats.map((stat, index) => {
                const trendIcon = stat.trend === 'up' ? TrendIcons.up : TrendIcons.down;
                const trendColor = stat.trend === 'up' ? 'text-green-600' : 'text-red-600';
                const trendBg = stat.trend === 'up' ? 'bg-green-100' : 'bg-red-100';
                return (
                  <div key={index} className="bg-white border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted text-sm">{stat.label}</p>
                        <p className="font-heading text-3xl text-dark-text mt-1">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${trendBg}`}>
                        {trendIcon}
                      </div>
                    </div>
                    <p className={`text-sm font-medium mt-3 ${trendColor}`}>
                      {stat.change} vs last month
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="bg-white border border-border rounded-xl overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-heading text-xl text-dark-text">Recent Orders</h2>
                <Link href="#orders" className="btn-ghost text-sm">View All</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-sm font-medium text-muted">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Items</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentOrders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="p-4 font-mono text-sm text-dark-text">{order.id}</td>
                        <td className="p-4 text-dark-text">{order.customer}</td>
                        <td className="p-4 text-muted text-sm">{order.date}</td>
                        <td className="p-4 font-medium text-dark-text">{formatPrice(order.total)}</td>
                        <td className="p-4">
                          <Badge variant="default" className={statusColors[order.status]}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-4 text-muted">{order.items}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-heading text-3xl text-dark-text mb-2">Products</h1>
                <p className="text-muted">Manage your product catalog</p>
              </div>
              <Button>Add New Product</Button>
            </div>

            <div className="bg-white border border-border rounded-xl overflow-hidden">
              <div className="p-6 border-b border-border flex flex-col sm:flex-row gap-4">
                <Input
                  label="Search Products"
                  placeholder="Search by name, category..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="max-w-md flex-1"
                />
                <Select
                  label="Filter by Brand"
                  value={brandFilter}
                  onChange={e => setBrandFilter(e.target.value)}
                  options={[{ value: '', label: 'All Brands' }, ...brands.map(b => ({ value: b.slug, label: b.name }))]}
                  className="w-48"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-sm font-medium text-muted">
                      <th className="p-4">Product</th>
                      <th className="p-4">Brand</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Sneaker Type</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <p className="font-medium text-dark-text">{product.name}</p>
                              <p className="text-xs text-muted">{product.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-dark-text">{product.brand}</td>
                        <td className="p-4 text-dark-text capitalize">{product.category}</td>
                        <td className="p-4 text-dark-text">{product.sneakerType || 'N/A'}</td>
                        <td className="p-4 font-medium text-dark-text">{formatPrice(product.price)}</td>
                        <td className="p-4 text-muted">{product.stock}</td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {product.isNew && <Badge variant="new" className="text-xs">New</Badge>}
                            {product.isLimited && <Badge variant="limited" className="text-xs">Limited</Badge>}
                            {product.isBestSeller && <Badge variant="default" className="text-xs bg-green-100 text-green-700">Bestseller</Badge>}
                            {product.originalPrice && product.originalPrice > product.price && <Badge variant="sale" className="text-xs">Sale</Badge>}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h1 className="font-heading text-3xl text-dark-text mb-2">Orders</h1>
              <p className="text-muted">Manage customer orders</p>
            </div>

            <div className="bg-white border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-sm font-medium text-muted">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentOrders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="p-4 font-mono text-sm text-dark-text">{order.id}</td>
                        <td className="p-4 text-dark-text">{order.customer}</td>
                        <td className="p-4 text-muted">{order.customer.toLowerCase().replace(' ', '.')}@email.com</td>
                        <td className="p-4 text-muted text-sm">{order.date}</td>
                        <td className="p-4 font-medium text-dark-text">{formatPrice(order.total)}</td>
                        <td className="p-4">
                          <select className={`px-3 py-1.5 rounded-lg text-sm border ${statusColors[order.status]}`} defaultValue={order.status}>
                            {Object.keys(statusColors).map(status => (
                              <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                            ))}
                          </select>
                        </td>
                        <td className="p-4">
                          <Badge variant="default" className="bg-green-100 text-green-700">Paid</Badge>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'discounts' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-heading text-3xl text-dark-text mb-2">Discount Codes</h1>
                <p className="text-muted">Manage promotional discounts</p>
              </div>
              <Button>Create Discount</Button>
            </div>

            <div className="bg-white border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-sm font-medium text-muted">
                      <th className="p-4">Code</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Value</th>
                      <th className="p-4">Min Order</th>
                      <th className="p-4">Usage</th>
                      <th className="p-4">Valid Until</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { code: 'WELCOME10', type: 'Percentage', value: '10%', minOrder: '₹1,000', used: 156, limit: 500, validUntil: '2024-12-31', active: true },
                      { code: 'SAVE500', type: 'Fixed', value: '₹500', minOrder: '₹5,000', used: 89, limit: 200, validUntil: '2024-11-30', active: true },
                      { code: 'SPRING20', type: 'Percentage', value: '20%', minOrder: '₹2,000', used: 234, limit: 300, validUntil: '2024-06-30', active: true },
                      { code: 'VIP15', type: 'Percentage', value: '15%', minOrder: '₹3,000', used: 12, limit: 50, validUntil: '2024-04-15', active: false },
                    ].map(discount => (
                      <tr key={discount.code} className="hover:bg-gray-50">
                        <td className="p-4 font-mono text-sm font-medium text-dark-text">{discount.code}</td>
                        <td className="p-4 text-dark-text">{discount.type}</td>
                        <td className="p-4 font-medium text-dark-text">{discount.value}</td>
                        <td className="p-4 text-muted">{discount.minOrder}</td>
                        <td className="p-4 text-muted">{discount.used}/{discount.limit}</td>
                        <td className="p-4 text-muted">{discount.validUntil}</td>
                        <td className="p-4">
                          <Badge variant={discount.active ? 'default' : 'sold-out'} className={discount.active ? 'bg-green-100 text-green-700' : ''}>
                            {discount.active ? 'Active' : 'Expired'}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}