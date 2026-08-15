import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  MapPin, 
  Store, 
  ShieldCheck, 
  User as UserIcon, 
  ChevronDown, 
  Menu, 
  X, 
  Check, 
  Tag, 
  Sparkles,
  RefreshCw,
  LogOut,
  PackageCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, params?: any) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const { 
    currentUser, 
    switchRole, 
    cart, 
    wishlist, 
    pincode, 
    locationName, 
    updatePincode,
    activeSearchQuery,
    setActiveSearchQuery,
    setSelectedCategoryFilter,
    categories,
    vendors,
    resetToDefaults,
    cartTotalAmount
  } = useApp();

  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
  const [tempPincode, setTempPincode] = useState(pincode);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedSearchCategory, setSelectedSearchCategory] = useState<string>('all');
  const [searchFocused, setSearchFocused] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishCount = wishlist.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSearchCategory !== 'all') {
      setSelectedCategoryFilter(selectedSearchCategory);
    } else {
      setSelectedCategoryFilter(null);
    }
    onNavigate('products', { search: activeSearchQuery });
  };

  const handlePincodeSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempPincode.trim().length === 6) {
      updatePincode(tempPincode.trim());
      setIsPincodeModalOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 font-medium text-amber-400">
              <Sparkles className="w-3.5 h-3.5" /> Desh Ka Apna Marketplace
            </span>
            <span className="hidden md:inline text-stone-400">|</span>
            <span className="hidden md:inline text-stone-300">
              🇮🇳 Free Delivery across India on orders above ₹499
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button 
              onClick={() => {
                navigator.clipboard?.writeText('WELCOME100');
              }}
              className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-sm hover:bg-amber-500/30 transition-colors"
              title="Click to copy code"
            >
              <Tag className="w-3 h-3" /> Code: <strong className="tracking-wide">WELCOME100</strong> (₹100 OFF)
            </button>
            <div className="hidden lg:flex items-center gap-3 text-stone-300">
              <button 
                onClick={() => onNavigate('vendor-register')}
                className="hover:text-amber-400 transition-colors"
              >
                Become a Seller (0% Fee)
              </button>
              <span>•</span>
              <button 
                onClick={resetToDefaults}
                className="hover:text-amber-400 transition-colors flex items-center gap-1 text-stone-400"
                title="Reset sample data"
              >
                <RefreshCw className="w-3 h-3" /> Reset Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Mobile menu toggle & Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-stone-700 hover:bg-stone-100"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button 
              onClick={() => onNavigate('home')} 
              className="text-left group flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-amber-600 via-orange-600 to-amber-500 flex items-center justify-center text-white font-bold text-xl shadow-xs group-hover:scale-105 transition-transform">
                IB
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-2xl tracking-tight text-stone-900">
                    Indi<span className="text-orange-600">Bazaar</span>
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded tracking-wider border border-amber-300">
                    India
                  </span>
                </div>
                <p className="text-[10px] text-stone-500 font-medium -mt-0.5">
                  Desh Ki Apni Online Dukan
                </p>
              </div>
            </button>
          </div>

          {/* Delivery Pincode Selector (Desktop) */}
          <button 
            onClick={() => setIsPincodeModalOpen(true)}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-left transition-colors"
          >
            <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
            <div className="text-xs">
              <span className="text-stone-500 block leading-tight">Deliver to</span>
              <span className="font-semibold text-stone-900 block truncate max-w-[130px]">
                {pincode} • {locationName.split(',')[0]}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 ml-1" />
          </button>

          {/* Center Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-2xl hidden sm:flex items-center border-2 border-orange-500/80 rounded-xl overflow-hidden bg-white shadow-xs focus-within:ring-2 focus-within:ring-orange-500/30 transition-all"
          >
            <select 
              value={selectedSearchCategory}
              onChange={(e) => setSelectedSearchCategory(e.target.value)}
              className="bg-stone-50 text-xs font-medium text-stone-700 px-3 py-2.5 border-r border-stone-200 focus:outline-hidden hover:bg-stone-100 cursor-pointer hidden md:block"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>

            <div className="relative flex-1">
              <input 
                type="text"
                value={activeSearchQuery}
                onChange={(e) => setActiveSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                placeholder="Search Banarasi sarees, smartwatches, dry fruits, pooja sets..."
                className="w-full px-3 py-2 text-sm text-stone-900 focus:outline-hidden placeholder:text-stone-400"
              />
              {activeSearchQuery && (
                <button
                  type="button"
                  onClick={() => setActiveSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <button 
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 flex items-center justify-center transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Right Action Icons & Role Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Quick Role Switcher Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  currentUser.role === 'admin'
                    ? 'bg-rose-50 border-rose-300 text-rose-800'
                    : currentUser.role === 'vendor'
                    ? 'bg-amber-50 border-amber-300 text-amber-800'
                    : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
                }`}
              >
                {currentUser.role === 'admin' ? (
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                ) : currentUser.role === 'vendor' ? (
                  <Store className="w-4 h-4 text-amber-600" />
                ) : (
                  <UserIcon className="w-4 h-4 text-stone-600" />
                )}
                
                <div className="text-left hidden md:block">
                  <span className="text-[10px] block text-stone-500 uppercase tracking-wider">
                    {currentUser.role === 'admin' ? 'Admin' : currentUser.role === 'vendor' ? 'Seller' : 'Buyer'}
                  </span>
                  <span className="truncate max-w-[100px] block font-bold">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {/* Role Switcher Menu */}
              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="text-xs text-stone-500 font-medium">Active User & Mode</p>
                    <p className="text-sm font-bold text-stone-900">{currentUser.name}</p>
                    <p className="text-xs text-stone-500">{currentUser.email}</p>
                  </div>

                  <div className="py-1">
                    <div className="px-3 py-1 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Switch Role (Instant Demo)
                    </div>

                    <button 
                      onClick={() => {
                        switchRole('customer');
                        setIsRoleDropdownOpen(false);
                        onNavigate('home');
                      }}
                      className={`w-full px-4 py-2 text-left flex items-center justify-between text-xs hover:bg-stone-50 ${
                        currentUser.role === 'customer' ? 'bg-orange-50 font-bold text-orange-700' : 'text-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-stone-500" />
                        <div>
                          <p className="font-semibold">Customer Shopping View</p>
                          <p className="text-[10px] text-stone-400">Browse, cart, checkout, orders</p>
                        </div>
                      </div>
                      {currentUser.role === 'customer' && <Check className="w-4 h-4 text-orange-600" />}
                    </button>

                    <button 
                      onClick={() => {
                        switchRole('vendor', vendors[0]?.id);
                        setIsRoleDropdownOpen(false);
                        onNavigate('vendor-dashboard');
                      }}
                      className={`w-full px-4 py-2 text-left flex items-center justify-between text-xs hover:bg-stone-50 ${
                        currentUser.role === 'vendor' ? 'bg-amber-50 font-bold text-amber-800' : 'text-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-amber-600" />
                        <div>
                          <p className="font-semibold">Vendor Dashboard</p>
                          <p className="text-[10px] text-stone-400">Add products, manage vendor orders</p>
                        </div>
                      </div>
                      {currentUser.role === 'vendor' && <Check className="w-4 h-4 text-amber-600" />}
                    </button>

                    <button 
                      onClick={() => {
                        switchRole('admin');
                        setIsRoleDropdownOpen(false);
                        onNavigate('admin-dashboard');
                      }}
                      className={`w-full px-4 py-2 text-left flex items-center justify-between text-xs hover:bg-stone-50 ${
                        currentUser.role === 'admin' ? 'bg-rose-50 font-bold text-rose-800' : 'text-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-rose-600" />
                        <div>
                          <p className="font-semibold">Admin Panel</p>
                          <p className="text-[10px] text-stone-400">Approve products, vendors & stats</p>
                        </div>
                      </div>
                      {currentUser.role === 'admin' && <Check className="w-4 h-4 text-rose-600" />}
                    </button>
                  </div>

                  <div className="border-t border-stone-100 pt-1 mt-1">
                    <button 
                      onClick={() => {
                        setIsRoleDropdownOpen(false);
                        onNavigate('customer-orders');
                      }}
                      className="w-full px-4 py-1.5 text-left text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                    >
                      <PackageCheck className="w-4 h-4 text-stone-500" /> My Orders & Tracking
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button 
              onClick={() => onNavigate('wishlist')}
              className="relative p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button 
              onClick={() => onNavigate('cart')}
              className="relative flex items-center gap-2 bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-800 px-3 py-2 rounded-xl transition-all font-semibold text-xs"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-orange-600" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-[10px] text-stone-500 block leading-none">Cart</span>
                <span className="font-bold text-stone-900 text-xs leading-tight">
                  ₹{cartTotalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </button>

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 sm:hidden">
          <form 
            onSubmit={handleSearchSubmit}
            className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50 focus-within:ring-2 focus-within:ring-orange-500/30"
          >
            <input 
              type="text"
              value={activeSearchQuery}
              onChange={(e) => setActiveSearchQuery(e.target.value)}
              placeholder="Search sarees, gadgets, spices, pooja sets..."
              className="w-full px-3 py-2 text-xs text-stone-900 focus:outline-hidden bg-transparent"
            />
            <button 
              type="submit"
              className="bg-orange-600 text-white px-3.5 py-2 text-xs flex items-center justify-center"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Pincode Change Modal */}
      {isPincodeModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">Choose Delivery Location</h3>
                  <p className="text-xs text-stone-500">Enter your 6-digit Indian PIN Code</p>
                </div>
              </div>
              <button 
                onClick={() => setIsPincodeModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePincodeSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Indian Postal Code (PIN Code)
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    value={tempPincode}
                    onChange={(e) => setTempPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 560038, 110001, 400001"
                    className="flex-1 px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-orange-500 font-mono"
                    required
                  />
                  <button 
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                  >
                    Apply PIN
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-stone-600 mb-2">Popular Cities Quick Select:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { pin: '110001', name: 'New Delhi' },
                    { pin: '560001', name: 'Bengaluru' },
                    { pin: '400001', name: 'Mumbai' },
                    { pin: '600001', name: 'Chennai' },
                    { pin: '700001', name: 'Kolkata' },
                    { pin: '500001', name: 'Hyderabad' }
                  ].map(city => (
                    <button
                      key={city.pin}
                      type="button"
                      onClick={() => {
                        updatePincode(city.pin);
                        setIsPincodeModalOpen(false);
                      }}
                      className="p-2 text-left border border-stone-200 rounded-lg hover:border-orange-500 hover:bg-orange-50/50 transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-stone-800">{city.name}</span>
                      <span className="text-[10px] font-mono text-stone-500">{city.pin}</span>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 md:hidden flex">
          <div className="w-4/5 max-w-sm bg-white h-full p-5 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-600 text-white font-bold flex items-center justify-center">
                    IB
                  </div>
                  <span className="font-bold text-lg text-stone-900">IndiBazaar</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-stone-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Delivery location info in mobile */}
              <div 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsPincodeModalOpen(true);
                }}
                className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                <div className="text-xs">
                  <p className="text-stone-500">Delivering to {pincode}</p>
                  <p className="font-semibold text-stone-800">{locationName}</p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="mt-5 space-y-1 text-sm font-medium">
                <button 
                  onClick={() => {
                    onNavigate('home');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-700 text-stone-800"
                >
                  🏠 Home
                </button>
                <button 
                  onClick={() => {
                    setSelectedCategoryFilter(null);
                    onNavigate('products');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-700 text-stone-800"
                >
                  🛍️ All Products Catalog
                </button>
                <button 
                  onClick={() => {
                    onNavigate('customer-orders');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-700 text-stone-800"
                >
                  📦 My Orders & Tracking
                </button>
                <button 
                  onClick={() => {
                    onNavigate('wishlist');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-700 text-stone-800"
                >
                  ❤️ Saved Wishlist ({wishCount})
                </button>
              </div>

              {/* Categories list */}
              <div className="mt-5 pt-4 border-t border-stone-100">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Shop Categories</p>
                <div className="space-y-1 text-xs">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategoryFilter(cat.slug);
                        onNavigate('products', { category: cat.slug });
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-md hover:bg-stone-100 text-stone-700 flex items-center justify-between"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-stone-400">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Portal Switchers Bottom */}
            <div className="pt-4 border-t border-stone-200 space-y-2">
              <button 
                onClick={() => {
                  switchRole('vendor', vendors[0]?.id);
                  onNavigate('vendor-dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
              >
                <Store className="w-4 h-4" /> Go to Vendor Portal
              </button>
              <button 
                onClick={() => {
                  switchRole('admin');
                  onNavigate('admin-dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 bg-stone-900 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" /> Go to Admin Panel
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}
    </header>
  );
};
