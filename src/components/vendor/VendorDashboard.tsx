import React, { useState, useMemo } from 'react';
import { 
  Store, 
  Package, 
  DollarSign, 
  ShoppingBag, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Truck, 
  TrendingUp, 
  ArrowUpRight, 
  Search, 
  X, 
  Check, 
  Building2, 
  Layers,
  ArrowRight,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product, Order } from '../../types';

interface VendorDashboardProps {
  onNavigate: (view: string, params?: any) => void;
  onViewProduct?: (product: Product) => void;
}

export const VendorDashboard: React.FC<VendorDashboardProps> = ({ onNavigate, onViewProduct }) => {
  const { 
    currentVendor, 
    products, 
    orders, 
    categories, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus,
    switchRole,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'payouts'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Modal State for Add / Edit Product
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState(categories[0]?.slug || 'ethnic-wear');
  const [formOriginalPrice, setFormOriginalPrice] = useState(2499);
  const [formSalePrice, setFormSalePrice] = useState(1499);
  const [formStock, setFormStock] = useState(25);
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formHighlights, setFormHighlights] = useState('Handcrafted in India, 100% Genuine, Eco-friendly');
  const [formCod, setFormCod] = useState(true);
  const [formSizes, setFormSizes] = useState('S, M, L, XL');

  // Filter vendor's own products & orders
  const vendorProducts = useMemo(() => {
    if (!currentVendor) return [];
    return products.filter(p => p.vendorId === currentVendor.id);
  }, [products, currentVendor]);

  const vendorOrders = useMemo(() => {
    if (!currentVendor) return [];
    return orders.filter(o => o.items.some(it => it.product.vendorId === currentVendor.id));
  }, [orders, currentVendor]);

  // Metrics
  const totalRevenue = vendorOrders.reduce((sum, o) => {
    if (o.status === 'cancelled') return sum;
    const vendorItemsSub = o.items
      .filter(it => it.product.vendorId === currentVendor?.id)
      .reduce((sub, it) => sub + (it.product.salePrice * it.quantity), 0);
    return sum + vendorItemsSub;
  }, 0);

  const pendingOrdersCount = vendorOrders.filter(o => o.status === 'pending' || o.status === 'confirmed' || o.status === 'processing').length;
  const lowStockCount = vendorProducts.filter(p => p.stock < 10).length;

  // Open modal for new product
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory(categories[0]?.slug || 'ethnic-wear');
    setFormOriginalPrice(2499);
    setFormSalePrice(1499);
    setFormStock(25);
    setFormShortDesc('');
    setFormDesc('');
    setFormImage('https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80');
    setFormHighlights('Handcrafted in India, 100% Pure, 7-Day Replacement');
    setFormCod(true);
    setFormSizes('S, M, L, XL');
    setIsProductModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormOriginalPrice(p.originalPrice);
    setFormSalePrice(p.salePrice);
    setFormStock(p.stock);
    setFormShortDesc(p.shortDesc);
    setFormDesc(p.description);
    setFormImage(p.images[0] || '');
    setFormHighlights(p.highlights?.join(', ') || '');
    setFormCod(p.isCodAvailable);
    setFormSizes(p.variants?.sizes?.join(', ') || '');
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSalePrice) {
      showToast('Please fill all mandatory product fields', 'warning');
      return;
    }

    const discountPercent = formOriginalPrice > formSalePrice
      ? Math.round(((formOriginalPrice - formSalePrice) / formOriginalPrice) * 100)
      : 0;

    const highlightsArr = formHighlights.split(',').map(s => s.trim()).filter(Boolean);
    const sizesArr = formSizes.split(',').map(s => s.trim()).filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName,
        category: formCategory,
        originalPrice: Number(formOriginalPrice),
        salePrice: Number(formSalePrice),
        discountPercent,
        stock: Number(formStock),
        inStock: Number(formStock) > 0,
        shortDesc: formShortDesc || formName,
        description: formDesc || formShortDesc,
        images: [formImage || editingProduct.images[0]],
        highlights: highlightsArr.length ? highlightsArr : undefined,
        isCodAvailable: formCod,
        variants: sizesArr.length ? { sizes: sizesArr } : undefined
      });
      showToast('Product updated successfully!', 'success');
    } else {
      addProduct({
        name: formName,
        category: formCategory,
        originalPrice: Number(formOriginalPrice),
        salePrice: Number(formSalePrice),
        discountPercent,
        stock: Number(formStock),
        inStock: Number(formStock) > 0,
        rating: 4.8,
        reviewCount: 1,
        shortDesc: formShortDesc || formName,
        description: formDesc || formShortDesc,
        images: [formImage || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80'],
        highlights: highlightsArr.length ? highlightsArr : ['Authentic Made in India', '100% Genuine'],
        isCodAvailable: formCod,
        variants: sizesArr.length ? { sizes: sizesArr } : undefined
      });
    }

    setIsProductModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this product from the marketplace catalog?')) {
      deleteProduct(id);
    }
  };

  const filteredVendorProducts = vendorProducts.filter(p => {
    const q = productSearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  const filteredVendorOrders = vendorOrders.filter(o => {
    if (orderStatusFilter === 'all') return true;
    return o.status === orderStatusFilter;
  });

  if (!currentVendor) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <Store className="w-12 h-12 text-stone-400 mx-auto" />
        <h2 className="text-xl font-bold text-stone-900">No Active Vendor Selected</h2>
        <p className="text-xs text-stone-500">Please switch to a vendor profile or register a new seller account.</p>
        <button
          onClick={() => switchRole('vendor')}
          className="bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
        >
          Select Demo Seller
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Banner / Store Profile */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center text-white text-2xl font-black shadow-md shrink-0">
            {currentVendor.storeName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">{currentVendor.storeName}</h1>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Check className="w-3 h-3" /> Verified Seller
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-1">
              Proprietor: <strong>{currentVendor.ownerName}</strong> • {currentVendor.city}, {currentVendor.state} • GSTIN: <span className="font-mono">{currentVendor.gstin}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleOpenAddModal}
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 shadow-md transition-all active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
          <button
            onClick={() => switchRole('customer')}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-xs border border-white/20 transition-colors"
          >
            Switch to Buyer View
          </button>
        </div>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Sales (INR)</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900 font-mono">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> 0% Commission (Demo Intro Rate)
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Products</span>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900 font-mono">
            {vendorProducts.length}
          </p>
          <span className="text-[11px] text-stone-500">
            {vendorProducts.filter(p => p.status === 'approved').length} Active in Catalog
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900 font-mono">
            {vendorOrders.length}
          </p>
          <span className="text-[11px] text-stone-500">
            Across India
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">To Dispatch</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900 font-mono">
            {pendingOrdersCount}
          </p>
          <span className="text-[11px] text-amber-700 font-semibold">
            {lowStockCount > 0 ? `⚠️ ${lowStockCount} items low in stock` : 'All inventory healthy'}
          </span>
        </div>

      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-stone-200 gap-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'products' ? 'border-orange-600 text-orange-700 font-black' : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog ({vendorProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'orders' ? 'border-orange-600 text-orange-700 font-black' : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders Management ({vendorOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('payouts')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'payouts' ? 'border-orange-600 text-orange-700 font-black' : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Settlement & Bank Payouts</span>
        </button>
      </div>

      {/* TAB 1: Product Management */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search your listed products..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
            </div>

            <button
              onClick={handleOpenAddModal}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 uppercase font-bold border-b border-stone-200">
                  <tr>
                    <th className="py-3.5 px-4">Product Details</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price (MRP / Sale)</th>
                    <th className="py-3.5 px-4">Stock</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredVendorProducts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-stone-400">
                        No products found. Click "Add New Product" to list your first item.
                      </td>
                    </tr>
                  ) : (
                    filteredVendorProducts.map(p => (
                      <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-12 h-12 rounded-xl object-cover border border-stone-200 bg-stone-100 shrink-0"
                            />
                            <div>
                              <p className="font-bold text-stone-900 line-clamp-1">{p.name}</p>
                              <span className="text-[11px] text-stone-400 flex items-center gap-1">
                                ★ {p.rating} ({p.reviewCount} reviews) • {p.isCodAvailable ? 'COD Enabled' : 'Prepaid Only'}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-stone-700 capitalize">
                          {p.category.replace('-', ' ')}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-black text-stone-900 font-mono">₹{p.salePrice.toLocaleString('en-IN')}</span>
                          <span className="text-stone-400 line-through block text-[11px]">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`font-bold font-mono px-2 py-0.5 rounded text-[11px] ${
                            p.stock < 10 ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-800'
                          }`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
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
                            {onViewProduct && (
                              <button
                                onClick={() => onViewProduct(p)}
                                className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
                                title="Preview on Store"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleOpenEditModal(p)}
                              className="p-1.5 text-stone-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg"
                              title="Edit product"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="p-1.5 text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: Orders Management */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          
          {/* Status filter tabs */}
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(st => (
              <button
                key={st}
                onClick={() => setOrderStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl border capitalize transition-colors ${
                  orderStatusFilter === st 
                    ? 'bg-orange-600 text-white border-orange-600 shadow-xs' 
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {st} ({st === 'all' ? vendorOrders.length : vendorOrders.filter(o => o.status === st).length})
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs divide-y divide-stone-100">
            {filteredVendorOrders.length === 0 ? (
              <div className="p-8 text-center text-stone-400 text-xs">
                No orders match this status filter.
              </div>
            ) : (
              filteredVendorOrders.map(order => {
                const sellerItems = order.items.filter(it => it.product.vendorId === currentVendor.id);
                const sellerTotal = sellerItems.reduce((acc, it) => acc + (it.product.salePrice * it.quantity), 0);

                return (
                  <div key={order.id} className="p-5 space-y-3">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-stone-900">#{order.id}</span>
                        <span className="text-stone-400">{order.createdAt}</span>
                        <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono text-[11px]">
                          Payment: {order.paymentMethod.toUpperCase()} ({order.paymentStatus})
                        </span>
                      </div>

                      {/* Status changer */}
                      <div className="flex items-center gap-2">
                        <span className="text-stone-500 font-semibold">Change Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className="p-1.5 border border-stone-300 rounded-lg text-xs font-bold text-stone-800 bg-white focus:outline-hidden"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-2">
                        {sellerItems.map((it, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-xs">
                            <img src={it.product.images[0]} alt={it.product.name} className="w-10 h-10 rounded-lg object-cover bg-stone-100 border shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-stone-900 truncate">{it.product.name}</p>
                              <p className="text-stone-500 text-[11px]">
                                Qty: {it.quantity} {it.selectedColor ? `• Color: ${it.selectedColor}` : ''} {it.selectedSize ? `• Size: ${it.selectedSize}` : ''}
                              </p>
                            </div>
                            <span className="font-bold font-mono text-stone-900">
                              ₹{(it.product.salePrice * it.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Customer Address */}
                      <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs space-y-1 text-stone-600">
                        <p className="font-bold text-stone-900">Ship To: {order.shippingAddress.name} (+91 {order.shippingAddress.mobile})</p>
                        <p>{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                        <p className="text-[11px] text-stone-400">Tracking: {order.trackingNumber} • Est: {order.estimatedDelivery}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 text-xs border-t border-stone-100">
                      <span className="text-stone-500">Your Product Earnings for this order:</span>
                      <span className="font-black text-emerald-700 text-sm font-mono">
                        ₹{sellerTotal.toLocaleString('en-IN')}
                      </span>
                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>
      )}

      {/* TAB 3: Settlements & Bank Payouts */}
      {activeTab === 'payouts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-stone-900 uppercase tracking-wider pb-2 border-b border-stone-100 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-orange-600" />
              <span>Direct Bank Settlement Details</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span className="text-stone-500">Registered Business Name</span>
                <span className="font-bold text-stone-900">{currentVendor.storeName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span className="text-stone-500">GSTIN / Tax ID</span>
                <span className="font-bold text-stone-900 font-mono">{currentVendor.gstin}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span className="text-stone-500">Bank Account Number</span>
                <span className="font-bold text-stone-900 font-mono">●●●● ●●●● {currentVendor.bankAccount.slice(-4)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span className="text-stone-500">IFSC Code</span>
                <span className="font-bold text-stone-900 font-mono">{currentVendor.ifsc}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-stone-500">Settlement Frequency</span>
                <span className="font-bold text-emerald-700">Weekly Auto-NEFT Deposit (Every Tuesday)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-stone-900 uppercase tracking-wider pb-2 border-b border-stone-100">
              Payout Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Total Net Sales</span>
                <span className="font-bold text-stone-900 font-mono">₹{totalRevenue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>IndiBazaar Platform Fee (0% Intro Demo)</span>
                <span className="font-bold font-mono">₹0 (100% Free)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Gateway Charges (RuPay / UPI)</span>
                <span className="font-bold text-stone-900 font-mono">₹0</span>
              </div>
              <div className="pt-3 border-t border-stone-200 flex justify-between text-sm font-black text-stone-900">
                <span>Estimated Next Bank Payout</span>
                <span className="text-emerald-700 font-mono text-lg">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
              <p className="font-bold">✓ Payouts Active</p>
              <p className="text-[11px] mt-0.5">All customer funds are secured in IndiBazaar RBI Escrow Account and disbursed weekly.</p>
            </div>
          </div>

        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h3 className="font-black text-base text-stone-900">
                {editingProduct ? 'Edit Product Catalog Item' : 'Add New Product to IndiBazaar'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Pure Varanasi Silk Saree with Zari Border"
                  className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden bg-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Inventory / Stock Count *</label>
                  <input
                    type="number"
                    min={0}
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full p-2.5 border border-stone-300 rounded-xl font-mono focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Original Price (MRP ₹) *</label>
                  <input
                    type="number"
                    min={1}
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full p-2.5 border border-stone-300 rounded-xl font-mono focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Discounted Selling Price (₹) *</label>
                  <input
                    type="number"
                    min={1}
                    value={formSalePrice}
                    onChange={(e) => setFormSalePrice(Number(e.target.value))}
                    className="w-full p-2.5 border border-stone-300 rounded-xl font-mono focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Product Image URL</label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 border border-stone-300 rounded-xl font-mono focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Short Description</label>
                <input
                  type="text"
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  placeholder="e.g. Handwoven authentic silk saree directly from Varanasi weavers"
                  className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Enter complete material, origin, and care instructions..."
                  className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Key Highlights (comma-separated)</label>
                  <input
                    type="text"
                    value={formHighlights}
                    onChange={(e) => setFormHighlights(e.target.value)}
                    placeholder="100% Handloom, Dry Clean Only, Free Blouse Piece"
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Available Sizes (comma-separated)</label>
                  <input
                    type="text"
                    value={formSizes}
                    onChange={(e) => setFormSizes(e.target.value)}
                    placeholder="S, M, L, XL, Free Size"
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-700">
                  <input
                    type="checkbox"
                    checked={formCod}
                    onChange={(e) => setFormCod(e.target.checked)}
                    className="w-4 h-4 text-orange-600 rounded-sm"
                  />
                  <span>Enable Cash on Delivery (COD) for this item</span>
                </label>
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl font-bold text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-extrabold shadow-xs"
                >
                  {editingProduct ? 'Update Product' : 'Save & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
