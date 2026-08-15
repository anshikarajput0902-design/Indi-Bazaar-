import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Store, 
  Package, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Check, 
  X, 
  Trash2, 
  Plus, 
  Image, 
  Tag, 
  TrendingUp, 
  Search, 
  Eye,
  AlertTriangle,
  Flame,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product, Vendor, Order, Banner } from '../../types';

interface AdminDashboardProps {
  onNavigate: (view: string, params?: any) => void;
  onViewProduct?: (product: Product) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onViewProduct }) => {
  const { 
    vendors, 
    products, 
    orders, 
    categories, 
    banners, 
    approveProduct, 
    rejectProduct, 
    deleteProduct, 
    updateOrderStatus, 
    addBanner, 
    toggleBannerStatus, 
    deleteBanner, 
    switchRole,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'vendors' | 'products' | 'orders' | 'banners' | 'categories'>('overview');
  const [productFilter, setProductFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Banner Modal
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [bannerTag, setBannerTag] = useState('Festive Dhamaka');
  const [bannerImage, setBannerImage] = useState('');
  const [bannerButtonText, setBannerButtonText] = useState('Shop Collection');
  const [bannerCategorySlug, setBannerCategorySlug] = useState('ethnic-wear');

  // Overall GMV
  const totalGMV = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.totalAmount : 0), 0);
  const totalDeliveredOrders = orders.filter(o => o.status === 'delivered').length;
  const pendingProductsCount = products.filter(p => p.status === 'pending').length;

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (productFilter !== 'all' && p.status !== productFilter) return false;
      if (productSearch) {
        const q = productSearch.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.vendorName.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      }
      return true;
    });
  }, [products, productFilter, productSearch]);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      if (!orderSearch) return true;
      const q = orderSearch.toLowerCase();
      return o.id.toLowerCase().includes(q) || o.shippingAddress.name.toLowerCase().includes(q) || o.shippingAddress.city.toLowerCase().includes(q);
    });
  }, [orders, orderSearch]);

  const handleCreateBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerTitle.trim() || !bannerImage.trim()) {
      showToast('Please provide banner title and image URL', 'warning');
      return;
    }

    addBanner({
      title: bannerTitle,
      subtitle: bannerSubtitle,
      tag: bannerTag,
      image: bannerImage,
      bgGradient: 'from-orange-950 via-amber-900 to-stone-900',
      buttonText: bannerButtonText,
      categorySlug: bannerCategorySlug,
      active: true
    });

    setIsBannerModalOpen(false);
    setBannerTitle('');
    setBannerSubtitle('');
    setBannerImage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-linear-to-r from-stone-900 via-rose-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-600 flex items-center justify-center text-white text-2xl font-black shadow-md shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">Marketplace Operations & Admin Portal</h1>
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Super Admin Access
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-1">
              Multi-vendor platform management, vendor approvals, orders oversight & catalog moderation
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => switchRole('customer')}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-xs border border-white/20 transition-colors"
          >
            Switch to Customer View
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Merchandise Value (GMV)</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900 font-mono">
            ₹{totalGMV.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold">
            {orders.length} total orders placed across India
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Vendors</span>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900 font-mono">
            {vendors.length}
          </p>
          <span className="text-[11px] text-stone-500">
            100% Indian Weavers & Small Businesses
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Catalog Products</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900 font-mono">
            {products.length}
          </p>
          <span className="text-[11px] text-stone-500">
            {products.filter(p => p.status === 'approved').length} Live • {pendingProductsCount} Pending Approval
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Fulfilled Deliveries</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900 font-mono">
            {totalDeliveredOrders}
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold">
            99.2% On-time delivery SLA
          </span>
        </div>

      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-stone-200 gap-6 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 border-b-2 transition-colors shrink-0 ${
            activeTab === 'overview' ? 'border-rose-600 text-rose-700 font-black' : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          Overview & Quick Actions
        </button>
        <button
          onClick={() => setActiveTab('vendors')}
          className={`pb-3 border-b-2 transition-colors shrink-0 flex items-center gap-1 ${
            activeTab === 'vendors' ? 'border-rose-600 text-rose-700 font-black' : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>Vendors</span>
          <span className="bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded-full text-[10px]">{vendors.length}</span>
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 border-b-2 transition-colors shrink-0 flex items-center gap-1 ${
            activeTab === 'products' ? 'border-rose-600 text-rose-700 font-black' : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>Catalog Moderation</span>
          {pendingProductsCount > 0 && (
            <span className="bg-amber-500 text-white px-1.5 py-0.2 rounded-full text-[10px] font-bold">
              {pendingProductsCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition-colors shrink-0 flex items-center gap-1 ${
            activeTab === 'orders' ? 'border-rose-600 text-rose-700 font-black' : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>Orders & Fulfillment</span>
          <span className="bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded-full text-[10px]">{orders.length}</span>
        </button>
        <button
          onClick={() => setActiveTab('banners')}
          className={`pb-3 border-b-2 transition-colors shrink-0 flex items-center gap-1 ${
            activeTab === 'banners' ? 'border-rose-600 text-rose-700 font-black' : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <span>Promo Banners</span>
          <span className="bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded-full text-[10px]">{banners.length}</span>
        </button>
      </div>

      {/* TAB 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Pending products card */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-rose-600" />
                <h3 className="font-extrabold text-sm text-stone-900 uppercase tracking-wider">
                  Recent Products Requiring Moderation
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('products')}
                className="text-xs font-bold text-rose-600 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3 divide-y divide-stone-100">
              {products.slice(0, 4).map(p => (
                <div key={p.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-xl object-cover bg-stone-100 border shrink-0" />
                    <div>
                      <h4 className="font-bold text-stone-900 line-clamp-1">{p.name}</h4>
                      <p className="text-stone-500 text-[11px]">By {p.vendorName} • ₹{p.salePrice} (MRP ₹{p.originalPrice})</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      p.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {p.status}
                    </span>
                    {p.status !== 'approved' && (
                      <button
                        onClick={() => approveProduct(p.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Approve
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick System Controls */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100">
              Marketplace Operations
            </h3>

            <div className="space-y-2.5 text-xs">
              <button
                onClick={() => { setActiveTab('banners'); setIsBannerModalOpen(true); }}
                className="w-full p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-left font-bold text-stone-800 flex items-center justify-between transition-colors"
              >
                <span>🎨 Create Hero Promo Banner</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => setActiveTab('vendors')}
                className="w-full p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-left font-bold text-stone-800 flex items-center justify-between transition-colors"
              >
                <span>🏪 Audit Verified Seller Registry</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className="w-full p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-left font-bold text-stone-800 flex items-center justify-between transition-colors"
              >
                <span>📦 Oversee Logistics & Dispatches</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </button>
            </div>

            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900 space-y-1">
              <p className="font-bold">System Status: 100% Operational</p>
              <p className="text-[11px] text-rose-700">All India PIN Code check and payment webhooks connected.</p>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: Vendors List */}
      {activeTab === 'vendors' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-stone-200 flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-stone-900 uppercase tracking-wider">
              Verified Indian Seller Registry ({vendors.length})
            </h3>
            <span className="text-xs text-stone-500">Includes Varanasi, Jaipur, Surat, Kashmir & Bangalore guilds</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 uppercase font-bold border-b border-stone-200">
                <tr>
                  <th className="py-3.5 px-4">Store Name & Owner</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Tax & GSTIN</th>
                  <th className="py-3.5 px-4">Rating</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Switch As</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {vendors.map(v => (
                  <tr key={v.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-stone-900 text-xs">{v.storeName}</span>
                        <p className="text-[11px] text-stone-500">{v.ownerName} • {v.phone}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-stone-700">
                      {v.city}, {v.state}
                    </td>
                    <td className="py-3.5 px-4 capitalize font-semibold text-stone-600">
                      {v.businessCategory.replace('-', ' ')}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-stone-700">
                      {v.gstin}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded text-[11px]">
                        ★ {v.rating}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        v.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          switchRole('vendor', v.id);
                          onNavigate('vendor-dashboard');
                        }}
                        className="px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Manage Store
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Products Moderation */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              {(['all', 'pending', 'approved', 'rejected'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setProductFilter(st)}
                  className={`px-3 py-1.5 rounded-xl border capitalize transition-colors ${
                    productFilter === st 
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs' 
                      : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {st} ({st === 'all' ? products.length : products.filter(p => p.status === st).length})
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search catalog..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-stone-300 rounded-xl focus:outline-hidden"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 uppercase font-bold border-b border-stone-200">
                  <tr>
                    <th className="py-3.5 px-4">Product</th>
                    <th className="py-3.5 px-4">Seller</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price / Stock</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-stone-100 border shrink-0" />
                          <div>
                            <p className="font-bold text-stone-900 line-clamp-1">{p.name}</p>
                            <span className="text-[11px] text-stone-400">ID: {p.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-stone-700">
                        {p.vendorName}
                      </td>
                      <td className="py-3.5 px-4 capitalize text-stone-600">
                        {p.category.replace('-', ' ')}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-stone-900 font-mono">₹{p.salePrice}</span>
                        <span className="text-stone-400 block text-[11px]">{p.stock} in stock</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          p.status === 'approved' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : p.status === 'rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {p.status !== 'approved' && (
                            <button
                              onClick={() => approveProduct(p.id)}
                              className="p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg"
                              title="Approve for public catalog"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          {p.status !== 'rejected' && (
                            <button
                              onClick={() => rejectProduct(p.id)}
                              className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg"
                              title="Reject / Take down"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-lg"
                            title="Delete permanently"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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

      {/* TAB 4: Orders & Logistics */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <h3 className="font-extrabold text-sm text-stone-900 uppercase tracking-wider">
              Marketplace Orders & Courier Overrides ({orders.length})
            </h3>
            <div className="relative w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search order ID / customer..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-stone-300 rounded-xl focus:outline-hidden"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs divide-y divide-stone-100">
            {filteredOrders.map(order => (
              <div key={order.id} className="p-4 sm:p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-stone-900 font-mono text-sm">#{order.id}</span>
                    <span className="text-stone-400 ml-2">Placed: {order.createdAt}</span>
                    <span className="ml-2 font-bold font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      ₹{order.totalAmount.toLocaleString('en-IN')} ({order.paymentMethod.toUpperCase()})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-stone-500 font-semibold">Override Status:</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                      className="p-1.5 border border-stone-300 rounded-lg text-xs font-bold text-stone-800 bg-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <p className="text-stone-500 font-bold uppercase text-[10px]">Items in Order:</p>
                    {order.items.map((it, i) => (
                      <p key={i} className="text-stone-800 font-medium">
                        • {it.quantity}x {it.product.name} (Seller: {it.product.vendorName})
                      </p>
                    ))}
                  </div>
                  <div className="bg-stone-50 p-2.5 rounded-xl border text-stone-700 space-y-0.5">
                    <p className="font-bold">Customer: {order.shippingAddress.name} (+91 {order.shippingAddress.mobile})</p>
                    <p>{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                    <p className="text-[11px] text-stone-400">Tracking: {order.trackingNumber}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 5: Banners Management */}
      {activeTab === 'banners' && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <div>
              <h3 className="font-extrabold text-sm text-stone-900 uppercase tracking-wider">
                Hero Homepage Banners ({banners.length})
              </h3>
              <p className="text-xs text-stone-500">Manage interactive carousel slides and promo campaigns</p>
            </div>
            <button
              onClick={() => setIsBannerModalOpen(true)}
              className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Banner</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {banners.map(b => (
              <div key={b.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs space-y-3">
                <div className="relative h-36 bg-stone-900">
                  <img src={b.image} alt={b.title} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent p-4 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-bold bg-rose-600 px-2 py-0.5 rounded w-fit uppercase">
                      {b.tag}
                    </span>
                    <h4 className="font-bold text-sm mt-1">{b.title}</h4>
                    <p className="text-[11px] text-stone-300 line-clamp-1">{b.subtitle}</p>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between pt-0 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBannerStatus(b.id)}
                      className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                        b.active ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {b.active ? '● Active on Homepage' : '○ Paused'}
                    </button>
                  </div>

                  <button
                    onClick={() => deleteBanner(b.id)}
                    className="text-stone-400 hover:text-rose-600 p-1"
                    title="Delete banner"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Add Banner Modal */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h3 className="font-bold text-base text-stone-900">Create Hero Promo Banner</h3>
              <button onClick={() => setIsBannerModalOpen(false)} className="text-stone-400">✕</button>
            </div>

            <form onSubmit={handleCreateBanner} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Banner Headline *</label>
                <input
                  type="text"
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  placeholder="e.g. Great Indian Festive Bazaar"
                  className="w-full p-2.5 border border-stone-300 rounded-xl focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Subtitle / Deal Hook</label>
                <input
                  type="text"
                  value={bannerSubtitle}
                  onChange={(e) => setBannerSubtitle(e.target.value)}
                  placeholder="e.g. Up to 70% Off on Handloom Sarees & Smart Gadgets"
                  className="w-full p-2.5 border border-stone-300 rounded-xl focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Tag / Pill Text</label>
                <input
                  type="text"
                  value={bannerTag}
                  onChange={(e) => setBannerTag(e.target.value)}
                  placeholder="e.g. Special Festival Deal"
                  className="w-full p-2.5 border border-stone-300 rounded-xl focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Background Image URL *</label>
                <input
                  type="url"
                  value={bannerImage}
                  onChange={(e) => setBannerImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 border border-stone-300 rounded-xl font-mono focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Target Category</label>
                <select
                  value={bannerCategorySlug}
                  onChange={(e) => setBannerCategorySlug(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-xl focus:outline-hidden bg-white"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-xs"
                >
                  Publish Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
