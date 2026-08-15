import React from 'react';
import { 
  CheckCircle, 
  Package, 
  Truck, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { Order } from '../../types';
import { useApp } from '../../context/AppContext';

interface OrderConfirmationPageProps {
  order: Order;
  onNavigate: (view: string, params?: any) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ 
  order, 
  onNavigate 
}) => {
  const { showToast } = useApp();

  const handleDownloadInvoice = () => {
    showToast(`Invoice for ${order.id} downloaded successfully!`, 'info');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-linear-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl text-center space-y-3">
        <div className="w-16 h-16 bg-white text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
          <CheckCircle className="w-10 h-10" />
        </div>
        <span className="inline-block bg-emerald-700/80 text-emerald-100 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          Order Successfully Placed
        </span>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
          Thank you for shopping on IndiBazaar!
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100/90 max-w-lg mx-auto">
          We have sent an order confirmation SMS and email to <strong>+91 {order.shippingAddress.mobile}</strong>. Your verified Indian sellers are preparing the shipment.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <div className="bg-black/30 backdrop-blur-xs px-4 py-2 rounded-xl text-xs font-mono font-bold">
            Order ID: {order.id}
          </div>
          <div className="bg-black/30 backdrop-blur-xs px-4 py-2 rounded-xl text-xs font-medium">
            Payment Mode: <span className="uppercase font-bold">{order.paymentMethod}</span> ({order.paymentStatus})
          </div>
        </div>
      </div>

      {/* Shipment Tracking Timeline */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
          <div>
            <h2 className="font-extrabold text-base text-stone-900">Shipment Timeline & Status</h2>
            <p className="text-xs text-stone-500">Tracking Number: <span className="font-mono font-bold">{order.trackingNumber}</span></p>
          </div>
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full capitalize">
            Current Status: {order.status}
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="relative py-4">
          <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-stone-200 -translate-y-1/2 z-0" />
          <div className="hidden sm:block absolute top-1/2 left-0 w-1/4 h-1 bg-emerald-600 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
            {[
              { title: 'Order Placed', time: 'Today', done: true },
              { title: 'Order Confirmed', time: 'Within 2 hrs', done: true },
              { title: 'Dispatched & Courier', time: 'Tomorrow', done: false },
              { title: 'Estimated Delivery', time: order.estimatedDelivery, done: false }
            ].map((step, idx) => (
              <div key={idx} className="flex sm:flex-col items-center gap-3 sm:text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-xs ${
                  step.done ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600'
                }`}>
                  {step.done ? '✓' : idx + 1}
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">{step.title}</p>
                  <p className="text-[11px] text-stone-500">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Details & Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left: Items in this order (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100">
            Ordered Items ({order.items.length})
          </h3>

          <div className="space-y-4 divide-y divide-stone-100">
            {order.items.map((it, idx) => (
              <div key={idx} className="pt-3 first:pt-0 flex items-center gap-4">
                <img
                  src={it.product.images[0]}
                  alt={it.product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-orange-700 block">
                    {it.product.vendorName}
                  </span>
                  <h4 className="text-xs font-bold text-stone-900 truncate">{it.product.name}</h4>
                  <p className="text-[11px] text-stone-500">
                    Quantity: {it.quantity} {it.selectedColor ? `• Color: ${it.selectedColor}` : ''} {it.selectedSize ? `• Size: ${it.selectedSize}` : ''}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm text-stone-900 font-mono">
                    ₹{(it.product.salePrice * it.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-stone-900 font-mono">₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount Applied</span>
                <span className="font-mono">- ₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-semibold text-emerald-700 uppercase text-[11px]">
                {order.deliveryCharge === 0 ? 'Free' : `₹${order.deliveryCharge}`}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-stone-100 text-sm font-black text-stone-900">
              <span>Total Paid</span>
              <span className="text-orange-600 font-mono">₹{order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Right: Shipping Address & Action CTAs (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
            <h3 className="font-extrabold text-sm text-stone-900 uppercase tracking-wider pb-2 border-b border-stone-100 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>Shipping Address</span>
            </h3>

            <div className="text-xs space-y-1 text-stone-700">
              <p className="font-bold text-stone-900">{order.shippingAddress.name}</p>
              <p>+91 {order.shippingAddress.mobile}</p>
              <p className="text-stone-600">{order.shippingAddress.street}</p>
              {order.shippingAddress.landmark && <p className="text-stone-500">Landmark: {order.shippingAddress.landmark}</p>}
              <p className="text-stone-600">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <span className="inline-block mt-1 bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[10px] font-bold">
                {order.shippingAddress.type} Address
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-5 space-y-3 text-xs">
            <button
              onClick={handleDownloadInvoice}
              className="w-full py-2.5 bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <Download className="w-4 h-4 text-stone-600" />
              <span>Download Tax Invoice (PDF)</span>
            </button>

            <button
              onClick={() => onNavigate('customer-orders')}
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Package className="w-4 h-4" />
              <span>View All Your Orders</span>
            </button>

            <button
              onClick={() => onNavigate('products')}
              className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
