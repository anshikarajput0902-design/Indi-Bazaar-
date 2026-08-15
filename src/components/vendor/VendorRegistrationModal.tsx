import React, { useState } from 'react';
import { Store, ShieldCheck, ArrowRight, X, Building, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface VendorRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const VendorRegistrationModal: React.FC<VendorRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { registerVendor, categories, vendors, switchRole } = useApp();

  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessCategory, setBusinessCategory] = useState(categories[0]?.slug || 'ethnic-wear');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Karnataka');
  const [gstin, setGstin] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [selectedExistingVendorId, setSelectedExistingVendorId] = useState(vendors[0]?.id || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoginMode) {
      // Quick switch to existing seller
      const targetVendor = vendors.find(v => v.id === selectedExistingVendorId) || vendors[0];
      switchRole('vendor', targetVendor.id);
      onSuccess();
      return;
    }

    if (!storeName.trim() || !ownerName.trim() || !email.trim() || !phone.trim()) {
      return;
    }

    registerVendor({
      storeName,
      ownerName,
      email,
      phone,
      businessCategory,
      city: city || 'Varanasi',
      state: state || 'Uttar Pradesh',
      gstin: gstin || '09AAAAA0000A1Z5',
      bankAccount: bankAccount || '987654321012',
      ifsc: ifsc || 'SBIN0001234'
    });

    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900">
                {isLoginMode ? 'Vendor Portal Login' : 'Sell on IndiBazaar'}
              </h2>
              <p className="text-xs text-stone-500">
                {isLoginMode ? 'Access your store manager & incoming orders' : 'Join 10,000+ Indian artisans & manufacturers'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toggle between Register & Quick Login */}
        <div className="flex bg-stone-100 p-1 rounded-xl my-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => setIsLoginMode(false)}
            className={`flex-1 py-2 rounded-lg transition-all ${!isLoginMode ? 'bg-white text-orange-700 shadow-xs' : 'text-stone-600'}`}
          >
            Register New Store
          </button>
          <button
            type="button"
            onClick={() => setIsLoginMode(true)}
            className={`flex-1 py-2 rounded-lg transition-all ${isLoginMode ? 'bg-white text-orange-700 shadow-xs' : 'text-stone-600'}`}
          >
            Switch to Existing Seller
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {isLoginMode ? (
            <div className="space-y-3">
              <label className="block font-bold text-stone-700">Select Registered Demo Vendor Store</label>
              <div className="space-y-2">
                {vendors.map(v => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedExistingVendorId(v.id)}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      selectedExistingVendorId === v.id ? 'border-orange-600 bg-orange-50/70 ring-1 ring-orange-400' : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-stone-900 text-xs">{v.storeName}</h4>
                      <p className="text-[11px] text-stone-500">{v.ownerName} • {v.city}, {v.state}</p>
                    </div>
                    <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-700">
                      ★ {v.rating}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Store / Business Name *</label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="e.g. Madurai Weaves & Crafts"
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Proprietor / Owner Name *</label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. Rajesh Sundaram"
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Business Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seller@maduraiweaves.in"
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Mobile (WhatsApp for Orders) *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9845012345"
                    className="w-full p-2.5 border border-stone-300 rounded-xl font-mono focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Primary Category</label>
                  <select
                    value={businessCategory}
                    onChange={(e) => setBusinessCategory(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden bg-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">City & State</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Madurai, Tamil Nadu"
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2.5">
                <span className="font-bold text-stone-700 block text-[11px] uppercase tracking-wider">
                  Banking & Tax Verification (Optional for Demo)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="GSTIN (e.g. 33AAAAA0000A1Z5)"
                    className="p-2 border border-stone-300 rounded-lg text-xs font-mono uppercase bg-white"
                  />
                  <input
                    type="text"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    placeholder="Bank A/C / UPI for Payouts"
                    className="p-2 border border-stone-300 rounded-lg text-xs font-mono bg-white"
                  />
                </div>
              </div>

              {/* Promo Callout */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2 text-emerald-900 text-[11px]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Commission on all orders in your first 30 days! Direct weekly bank deposits.</span>
              </div>
            </>
          )}

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-stone-300 text-stone-700 rounded-xl font-bold hover:bg-stone-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-extrabold flex items-center gap-1.5 shadow-md transition-colors"
            >
              <span>{isLoginMode ? 'Access Dashboard' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
