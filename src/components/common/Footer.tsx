import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  Store, 
  MapPin, 
  Mail, 
  Phone, 
  Heart,
  CreditCard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FooterProps {
  onNavigate: (view: string, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { categories, setSelectedCategoryFilter } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-16">
      
      {/* 4 Trust Value Props Strip */}
      <div className="border-b border-stone-800 bg-stone-950/50">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free & Fast Delivery</h4>
              <p className="text-xs text-stone-400 mt-0.5">On orders above ₹499 across all Indian PIN codes.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Genuine Products</h4>
              <p className="text-xs text-stone-400 mt-0.5">Directly sourced from verified Indian weavers & makers.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Easy 7-Day Returns</h4>
              <p className="text-xs text-stone-400 mt-0.5">Hassle-free doorstep pickup & instant refund guarantee.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24x7 Customer Support</h4>
              <p className="text-xs text-stone-400 mt-0.5">Friendly assistance in Hindi, English & regional languages.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Callout Banner */}
      <div className="border-b border-stone-800 bg-linear-to-r from-orange-950/40 via-amber-950/30 to-stone-900">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-3 bg-orange-600 text-white rounded-xl shadow-xs">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Grow your business on IndiBazaar</h4>
              <p className="text-xs text-stone-400">Sell to crores of customers across India with 0% commission in your first month!</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('vendor-register')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all shrink-0 hover:scale-105"
          >
            Start Selling Today →
          </button>
        </div>
      </div>

      {/* Main Links Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold">
                IB
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Indi<span className="text-orange-500">Bazaar</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              IndiBazaar is India's modern multi-vendor marketplace connecting authentic regional artisans, weavers, electronics creators, and local manufacturers directly with conscious shoppers nationwide.
            </p>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>IndiBazaar Towers, Indiranagar, Bengaluru, KA - 560038</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>1800-419-8999 (Toll Free • 24x7)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>support@indibazaar.in | seller-desk@indibazaar.in</span>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Shop By Category</h4>
            <ul className="space-y-2 text-xs">
              {categories.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategoryFilter(cat.slug);
                      onNavigate('products', { category: cat.slug });
                    }}
                    className="text-stone-400 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Customer Care</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('customer-orders')} className="hover:text-white transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cart')} className="hover:text-white transition-colors">
                  Shopping Cart & Bag
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('wishlist')} className="hover:text-white transition-colors">
                  Saved Wishlist
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Returns & Refund Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Shipping Rates & Policies
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Frequently Asked Questions (FAQ)
                </span>
              </li>
            </ul>
          </div>

          {/* Sell & Portals */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Portals & Workspaces</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('vendor-dashboard')} className="hover:text-amber-400 transition-colors font-medium">
                  🏪 Vendor Portal Login
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('vendor-register')} className="hover:text-amber-400 transition-colors">
                  📝 Register as New Seller
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin-dashboard')} className="hover:text-rose-400 transition-colors font-medium">
                  🛡️ Marketplace Admin Panel
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Seller Commission Chart
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  GST & Compliance Help
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Payment Modes & Copyright */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Indian Commerce • 100% Made in India Demo</span>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-stone-400 font-semibold mr-1">Accepted Payments:</span>
            {['RuPay', 'UPI (GPay / PhonePe / Paytm)', 'Visa', 'Mastercard', 'Net Banking', 'Cash on Delivery (COD)'].map(mode => (
              <span key={mode} className="bg-stone-800 text-stone-300 text-[10px] px-2 py-0.5 rounded border border-stone-700 font-medium">
                {mode}
              </span>
            ))}
          </div>

          <p>© {new Date().getFullYear()} IndiBazaar Technologies Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
