import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  Truck, 
  Check, 
  Smartphone, 
  Building2, 
  Banknote, 
  Lock, 
  AlertCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Address, CartItem, Order, Product } from '../../types';

interface CheckoutPageProps {
  onNavigate: (view: string, params?: any) => void;
  directBuyProduct?: Product;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi (NCT)', 'Jammu & Kashmir', 'Ladakh'
];

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ 
  onNavigate, 
  directBuyProduct 
}) => {
  const { 
    cart, 
    cartSubtotal, 
    deliveryCharge, 
    cartTotalAmount, 
    appliedCoupon, 
    couponDiscount, 
    currentUser, 
    pincode, 
    locationName, 
    placeOrder, 
    showToast 
  } = useApp();

  // If coming from "Buy Now" on product detail, build temporary override items
  const checkoutItems: CartItem[] = directBuyProduct
    ? [{
        product: directBuyProduct,
        quantity: 1,
        selectedColor: directBuyProduct.variants?.colors?.[0]?.name,
        selectedSize: directBuyProduct.variants?.sizes?.[0]
      }]
    : cart;

  const subtotal = checkoutItems.reduce((acc, it) => acc + (it.product.salePrice * it.quantity), 0);
  const delFee = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const disc = appliedCoupon ? couponDiscount : 0;
  const totalAmount = Math.max(0, subtotal - disc + delFee);

  // Address form state with sensible defaults
  const [address, setAddress] = useState<Address>({
    name: currentUser.name || 'Aarav Patel',
    mobile: currentUser.mobile || '9876543210',
    street: 'Flat 402, Shanti Heights, 12th Main Road, Indiranagar',
    landmark: 'Near BDA Complex',
    city: locationName.split(',')[1]?.trim() || 'Bengaluru',
    state: 'Karnataka',
    pincode: pincode || '560038',
    type: 'Home'
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('aarav.patel@okaxis');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [cardNumber, setCardNumber] = useState('4532 8901 2345 6789');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('321');
  const [cardName, setCardName] = useState(address.name);
  const [captchaCode, setCaptchaCode] = useState('7392');
  const [enteredCaptcha, setEnteredCaptcha] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleAddressChange = (field: keyof Address, value: any) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!address.name.trim() || !address.mobile.trim() || !address.street.trim() || !address.pincode.trim()) {
      showToast('Please fill all mandatory shipping address fields', 'warning');
      return;
    }

    if (address.mobile.replace(/\D/g, '').length !== 10) {
      showToast('Please enter a valid 10-digit Indian mobile number', 'warning');
      return;
    }

    if (address.pincode.replace(/\D/g, '').length !== 6) {
      showToast('Please enter a valid 6-digit Indian PIN code', 'warning');
      return;
    }

    if (paymentMethod === 'cod' && enteredCaptcha.trim() !== captchaCode) {
      showToast('Invalid Security Captcha code. Please enter 7392', 'error');
      return;
    }

    setIsPlacingOrder(true);

    setTimeout(() => {
      const placedOrder = placeOrder(
        address, 
        paymentMethod, 
        directBuyProduct ? checkoutItems : undefined
      );

      // Trigger Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback gracefully
      }

      setIsPlacingOrder(false);
      onNavigate('order-confirmation', { order: placedOrder });
    }, 1200);
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-900">No items to checkout</h2>
        <button
          onClick={() => onNavigate('products')}
          className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Checkout header */}
      <div className="pb-4 mb-6 border-b border-stone-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">Express Secure Checkout</h1>
            <p className="text-xs text-stone-500">256-Bit SSL Encrypted Indian Payment Processing</p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('cart')}
          className="text-xs font-bold text-stone-600 hover:text-orange-600 flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </button>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Address + Payment selection (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* STEP 1: Delivery Address */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-600 text-white text-xs font-black flex items-center justify-center">
                  1
                </span>
                <h2 className="font-extrabold text-sm text-stone-900 uppercase tracking-wider">
                  Delivery Address (India)
                </h2>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                Doorstep Courier Dispatch
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={address.name}
                  onChange={(e) => handleAddressChange('name', e.target.value)}
                  placeholder="e.g. Aarav Patel"
                  className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Mobile Number (10 Digits) <span className="text-rose-500">*</span>
                </label>
                <div className="flex">
                  <span className="px-3 py-2.5 bg-stone-100 border border-r-0 border-stone-300 rounded-l-xl text-stone-600 font-bold">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={address.mobile}
                    onChange={(e) => handleAddressChange('mobile', e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full p-2.5 border border-stone-300 rounded-r-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden font-mono"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-stone-700 mb-1">
                  Flat / House No. / Building / Street Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  placeholder="e.g. Flat 402, Shanti Heights, 12th Main Road, Indiranagar"
                  className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  value={address.landmark || ''}
                  onChange={(e) => handleAddressChange('landmark', e.target.value)}
                  placeholder="e.g. Near BDA Complex / Opp Temple"
                  className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Postal PIN Code (6 Digits) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={address.pincode}
                  onChange={(e) => handleAddressChange('pincode', e.target.value.replace(/\D/g, ''))}
                  placeholder="560038"
                  className="w-full p-2.5 border border-stone-300 rounded-xl font-mono focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  City / District <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  placeholder="Bengaluru"
                  className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  State <span className="text-rose-500">*</span>
                </label>
                <select
                  value={address.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden cursor-pointer"
                  required
                >
                  {INDIAN_STATES.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Address Type</label>
                <div className="flex gap-2">
                  {['Home', 'Work'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleAddressChange('type', type)}
                      className={`flex-1 py-2 rounded-xl border font-bold text-xs transition-colors ${
                        address.type === type ? 'bg-orange-50 border-orange-600 text-orange-800' : 'bg-stone-50 border-stone-200 text-stone-600'
                      }`}
                    >
                      {type === 'Home' ? '🏡 Home (All day)' : '🏢 Work (10 AM - 6 PM)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: Payment Method Selection */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-600 text-white text-xs font-black flex items-center justify-center">
                  2
                </span>
                <h2 className="font-extrabold text-sm text-stone-900 uppercase tracking-wider">
                  Payment Method
                </h2>
              </div>
              <span className="text-[11px] text-stone-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                RBI & NPCI Verified Flow
              </span>
            </div>

            {/* Payment Mode Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border font-bold text-left transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-orange-600 bg-orange-50/70 text-orange-900 ring-2 ring-orange-200'
                    : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Smartphone className="w-5 h-5 text-orange-600 mb-1" />
                <span>UPI / QR</span>
                <span className="block text-[10px] text-stone-400 font-normal">GPay / PhonePe / Paytm</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border font-bold text-left transition-all ${
                  paymentMethod === 'card'
                    ? 'border-orange-600 bg-orange-50/70 text-orange-900 ring-2 ring-orange-200'
                    : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                <CreditCard className="w-5 h-5 text-blue-600 mb-1" />
                <span>Cards</span>
                <span className="block text-[10px] text-stone-400 font-normal">RuPay / Visa / Master</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border font-bold text-left transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-orange-600 bg-orange-50/70 text-orange-900 ring-2 ring-orange-200'
                    : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Banknote className="w-5 h-5 text-emerald-600 mb-1" />
                <span>Cash on Delivery</span>
                <span className="block text-[10px] text-stone-400 font-normal">Pay cash / UPI at door</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border font-bold text-left transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-orange-600 bg-orange-50/70 text-orange-900 ring-2 ring-orange-200'
                    : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Building2 className="w-5 h-5 text-purple-600 mb-1" />
                <span>Net Banking</span>
                <span className="block text-[10px] text-stone-400 font-normal">SBI / HDFC / ICICI</span>
              </button>
            </div>

            {/* Dynamic payment sub-options */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs">
              
              {/* 1. UPI Sub-form */}
              {paymentMethod === 'upi' && (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'gpay', name: 'Google Pay', ext: '@okaxis' },
                      { id: 'phonepe', name: 'PhonePe', ext: '@ybl' },
                      { id: 'paytm', name: 'Paytm UPI', ext: '@paytm' },
                      { id: 'bhim', name: 'BHIM UPI', ext: '@upi' }
                    ].map(app => (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => {
                          setSelectedUpiApp(app.id);
                          setUpiId(`${address.name.toLowerCase().replace(/\s+/g, '.')}${app.ext}`);
                        }}
                        className={`px-3 py-1.5 rounded-lg border font-bold text-xs transition-colors ${
                          selectedUpiApp === app.id ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-stone-700 border-stone-300'
                        }`}
                      >
                        {app.name}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Your Virtual Payment Address (VPA / UPI ID)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="username@bank"
                        className="flex-1 p-2.5 border border-stone-300 rounded-xl font-mono focus:ring-2 focus:ring-orange-500 focus:outline-hidden bg-white"
                      />
                      <span className="px-3 py-2 bg-emerald-100 text-emerald-800 font-bold rounded-xl flex items-center gap-1 shrink-0">
                        <Check className="w-3.5 h-3.5" /> Verified VPA
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">A payment authorization request will be sent to your UPI app.</p>
                  </div>
                </div>
              )}

              {/* 2. Card Sub-form */}
              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 8901 2345 6789"
                      className="w-full p-2.5 border border-stone-300 rounded-xl font-mono focus:ring-2 focus:ring-orange-500 focus:outline-hidden bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block font-bold text-stone-700 mb-1">Name on Card</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Aarav Patel"
                        className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-hidden bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Expiry & CVV</label>
                      <div className="flex gap-1">
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-1/2 p-2 border border-stone-300 rounded-xl font-mono text-center focus:outline-hidden bg-white"
                        />
                        <input
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="CVV"
                          className="w-1/2 p-2 border border-stone-300 rounded-xl font-mono text-center focus:outline-hidden bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Cash on Delivery Sub-form */}
              {paymentMethod === 'cod' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Pay in cash or scan delivery agent's UPI QR when your package arrives at your doorstep.</span>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Enter Security Verification Code</label>
                    <div className="flex items-center gap-3">
                      <div className="bg-stone-800 text-amber-400 font-mono font-black text-lg tracking-widest px-4 py-2 rounded-xl select-none">
                        {captchaCode}
                      </div>
                      <input
                        type="text"
                        maxLength={4}
                        value={enteredCaptcha}
                        onChange={(e) => setEnteredCaptcha(e.target.value)}
                        placeholder="Enter 7392"
                        className="w-32 p-2 border border-stone-300 rounded-xl font-mono text-center font-bold focus:ring-2 focus:ring-orange-500 focus:outline-hidden bg-white"
                        required={paymentMethod === 'cod'}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Net Banking Sub-form */}
              {paymentMethod === 'netbanking' && (
                <div className="space-y-2">
                  <label className="block font-bold text-stone-700 mb-1">Select Bank</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Punjab National Bank', 'Kotak Bank'].map(bank => (
                      <button
                        key={bank}
                        type="button"
                        className="p-2 bg-white border border-stone-300 rounded-lg text-left text-[11px] font-semibold hover:border-orange-500 transition-colors"
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Right: Order Summary & Instant Place Order (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4 sticky top-24">
            <h3 className="font-black text-sm text-stone-900 uppercase tracking-wider pb-2 border-b border-stone-100">
              Order Summary ({checkoutItems.length} items)
            </h3>

            {/* Item preview list */}
            <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
              {checkoutItems.map((it, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <img
                    src={it.product.images[0]}
                    alt={it.product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-stone-900 truncate">{it.product.name}</h4>
                    <p className="text-[11px] text-stone-500">
                      Qty: {it.quantity} {it.selectedColor ? `• ${it.selectedColor}` : ''}
                    </p>
                  </div>
                  <span className="font-bold text-stone-900 font-mono">
                    ₹{(it.product.salePrice * it.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 pt-3 border-t border-stone-100 text-xs text-stone-600">
              <div className="flex items-center justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-stone-800">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount ({appliedCoupon})</span>
                  <span>- ₹{disc.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Delivery Fee</span>
                {delFee === 0 ? (
                  <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                ) : (
                  <span className="font-semibold text-stone-800">₹{delFee}</span>
                )}
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-baseline justify-between font-black text-stone-900">
                <span className="text-sm">Total Payable</span>
                <span className="text-2xl font-black text-orange-600 font-mono">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Delivery address preview */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] space-y-1">
              <span className="font-bold text-stone-700 block">Shipping to:</span>
              <p className="font-semibold text-stone-900">{address.name} (+91 {address.mobile})</p>
              <p className="text-stone-500">{address.street}, {address.city}, {address.state} - {address.pincode}</p>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isPlacingOrder}
              className="w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 cursor-pointer"
            >
              {isPlacingOrder ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <span>Place Order • ₹{totalAmount.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-[10px] text-stone-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe Delivery & 7-Day Doorstep Replacement Guarantee</span>
            </div>

          </div>

        </div>

      </form>

    </div>
  );
};
