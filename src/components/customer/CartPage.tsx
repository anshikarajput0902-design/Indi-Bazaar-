import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';

interface CartPageProps {
  onNavigate: (view: string, params?: any) => void;
  onViewProduct: (product: Product) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate, onViewProduct }) => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal, 
    deliveryCharge, 
    cartTotalAmount, 
    appliedCoupon, 
    couponDiscount, 
    applyCoupon, 
    removeCoupon,
    clearCart 
  } = useApp();

  const [couponInput, setCouponInput] = useState('');

  const totalMrp = cart.reduce((sum, item) => sum + (item.product.originalPrice * item.quantity), 0);
  const totalProductDiscount = totalMrp - cartSubtotal;
  const freeDeliveryThreshold = 499;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-5">
        <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-stone-900">Your Shopping Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto mt-1">
            Explore authentic handloom sarees, smart tech gadgets, organic spices & everyday essentials with huge discounts!
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('products')}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>Start Shopping Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">Shopping Bag & Cart</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            {cart.reduce((sum, it) => sum + it.quantity, 0)} items selected from verified Indian sellers
          </p>
        </div>
        <button
          onClick={() => onNavigate('products')}
          className="text-xs font-bold text-stone-600 hover:text-orange-600 flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Free delivery bar */}
          <div className="p-3.5 bg-linear-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-600 shrink-0" />
              {amountNeededForFreeDelivery === 0 ? (
                <span className="font-bold text-emerald-800">
                  🎉 Congratulations! You have unlocked FREE Express Delivery!
                </span>
              ) : (
                <span className="text-stone-700">
                  Add <strong className="text-orange-700">₹{amountNeededForFreeDelivery}</strong> more to qualify for <strong>FREE Delivery</strong>!
                </span>
              )}
            </div>
            {amountNeededForFreeDelivery > 0 && (
              <button 
                onClick={() => onNavigate('products')} 
                className="font-bold text-orange-700 underline text-xs shrink-0"
              >
                + Add Items
              </button>
            )}
          </div>

          {/* Cart items */}
          <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 shadow-xs overflow-hidden">
            {cart.map((item, idx) => {
              const itemTotal = item.product.salePrice * item.quantity;
              const itemMrpTotal = item.product.originalPrice * item.quantity;
              return (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  
                  {/* Thumbnail & Product info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div 
                      onClick={() => onViewProduct(item.product)}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0 cursor-pointer border border-stone-200"
                    >
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="space-y-1 flex-1">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                        {item.product.vendorName}
                      </span>
                      <h3 
                        onClick={() => onViewProduct(item.product)}
                        className="font-bold text-xs sm:text-sm text-stone-900 hover:text-orange-600 cursor-pointer line-clamp-1"
                      >
                        {item.product.name}
                      </h3>

                      {/* Variant details */}
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
                        {item.selectedColor && (
                          <span className="bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                            Color: {item.selectedColor}
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.product.isCodAvailable && (
                          <span className="text-emerald-700 font-medium">COD Available</span>
                        )}
                      </div>

                      {/* Pricing */}
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="font-extrabold text-sm sm:text-base text-stone-900">
                          ₹{item.product.salePrice.toLocaleString('en-IN')}
                        </span>
                        {item.product.originalPrice > item.product.salePrice && (
                          <span className="text-xs text-stone-400 line-through">
                            ₹{item.product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span className="text-[11px] font-bold text-emerald-700">
                          {item.product.discountPercent}% OFF
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity controls & item actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                    
                    {/* Stepper */}
                    <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                        className="p-1.5 px-2.5 text-stone-600 hover:bg-stone-200 transition-colors"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-stone-900 font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                        className="p-1.5 px-2.5 text-stone-600 hover:bg-stone-200 transition-colors"
                        title="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="block font-black text-sm text-stone-900">
                        ₹{itemTotal.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                        className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold inline-flex items-center gap-1 mt-1 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

          {/* Safe Shopping Guarantee Banner */}
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <p className="font-bold">IndiBazaar Buyer Protection Program</p>
              <p className="text-[11px] text-emerald-800">Your payments are held in escrow until doorstep delivery and inspection.</p>
            </div>
          </div>
        </div>

        {/* Right: Price Summary & Coupon (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Coupon applicator */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900 uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-orange-600" />
              <span>Apply Discount Coupon</span>
            </div>

            {appliedCoupon ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-emerald-900 uppercase tracking-wide">
                    {appliedCoupon}
                  </span>
                  <p className="text-[11px] text-emerald-700">₹{couponDiscount} Saved on this order</p>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCouponSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="e.g. WELCOME100, FESTIVE20"
                  className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-xl font-mono uppercase focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Quick coupon suggestions */}
            <div className="pt-1 flex flex-wrap gap-1.5">
              {['WELCOME100', 'FESTIVE20', 'DESI50'].map(code => (
                <button
                  key={code}
                  type="button"
                  onClick={() => applyCoupon(code)}
                  className="text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-sm hover:bg-amber-100 transition-colors"
                >
                  {code} ({code === 'WELCOME100' ? '₹100 Off' : code === 'FESTIVE20' ? '20% Off' : '₹50 Off'})
                </button>
              ))}
            </div>
          </div>

          {/* Price details breakdown */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <h3 className="font-black text-sm text-stone-900 uppercase tracking-wider pb-2 border-b border-stone-100">
              Price Details ({cart.length} items)
            </h3>

            <div className="space-y-2.5 text-xs text-stone-600">
              <div className="flex items-center justify-between">
                <span>Total MRP</span>
                <span className="font-semibold text-stone-800">₹{totalMrp.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center justify-between text-emerald-700">
                <span>Product Discount</span>
                <span className="font-semibold">- ₹{totalProductDiscount.toLocaleString('en-IN')}</span>
              </div>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-emerald-700">
                  <span>Coupon Discount ({appliedCoupon})</span>
                  <span className="font-semibold">- ₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Delivery Charges</span>
                {deliveryCharge === 0 ? (
                  <span className="font-bold text-emerald-700 uppercase text-[11px]">Free</span>
                ) : (
                  <span className="font-semibold text-stone-800">₹{deliveryCharge}</span>
                )}
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-baseline justify-between text-sm sm:text-base font-black text-stone-900">
                <span>Total Amount</span>
                <span className="text-xl font-black text-orange-600 font-mono">
                  ₹{cartTotalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <p className="text-[11px] text-emerald-700 font-semibold text-right">
                You will save ₹{(totalProductDiscount + couponDiscount).toLocaleString('en-IN')} on this order!
              </p>
            </div>

            <button
              onClick={() => onNavigate('checkout')}
              className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[10px] text-stone-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-stone-500" />
              <span>100% Safe & Secure UPI / Card / COD Payments</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
