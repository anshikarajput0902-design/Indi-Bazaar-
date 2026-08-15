import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  RotateCcw,
  ShoppingBag,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Order, Product } from '../../types';

interface CustomerOrdersPageProps {
  onNavigate: (view: string, params?: any) => void;
  onViewProduct: (product: Product) => void;
}

export const CustomerOrdersPage: React.FC<CustomerOrdersPageProps> = ({ 
  onNavigate, 
  onViewProduct 
}) => {
  const { orders, updateOrderStatus, showToast } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleCancelOrder = (orderId: string) => {
    if (confirm('Are you sure you want to cancel this order?')) {
      updateOrderStatus(orderId, 'cancelled');
      showToast('Order cancelled successfully. Refund initiated if prepaid.', 'info');
    }
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-stone-900">No Orders Placed Yet</h2>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          Browse through authentic handloom, gadgets, spices and more to place your first Indian marketplace order.
        </p>
        <button
          onClick={() => onNavigate('products')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">Your Order History & Tracking</h1>
          <p className="text-xs text-stone-500 mt-0.5">Manage and track your active and past marketplace orders</p>
        </div>
        <button
          onClick={() => onNavigate('products')}
          className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          let statusBadgeClass = 'bg-stone-100 text-stone-800 border-stone-200';
          if (order.status === 'delivered') statusBadgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-300';
          if (order.status === 'shipped' || order.status === 'out_for_delivery') statusBadgeClass = 'bg-sky-100 text-sky-800 border-sky-300';
          if (order.status === 'confirmed' || order.status === 'processing') statusBadgeClass = 'bg-amber-100 text-amber-800 border-amber-300';
          if (order.status === 'cancelled') statusBadgeClass = 'bg-rose-100 text-rose-800 border-rose-300';

          return (
            <div 
              key={order.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden divide-y divide-stone-100"
            >
              {/* Order Meta Header */}
              <div className="bg-stone-50 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <span className="text-stone-400 block text-[10px] font-bold uppercase">Order Placed</span>
                    <span className="font-bold text-stone-900">{order.createdAt}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] font-bold uppercase">Total Amount</span>
                    <span className="font-bold text-stone-900 font-mono">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] font-bold uppercase">Ship To</span>
                    <span className="font-bold text-stone-900 truncate max-w-[140px] block">{order.shippingAddress.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border capitalize ${statusBadgeClass}`}>
                    ● {order.status.replace('_', ' ')}
                  </span>
                  <span className="text-stone-400 font-mono text-[11px]">#{order.id}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 sm:p-6 space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                      />
                      <div className="space-y-0.5 flex-1">
                        <span className="text-[10px] uppercase font-bold text-orange-700 block">
                          Sold by: {item.product.vendorName}
                        </span>
                        <h4 
                          onClick={() => onViewProduct(item.product)}
                          className="text-xs sm:text-sm font-bold text-stone-900 hover:text-orange-600 cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-stone-500">
                          Qty: {item.quantity} {item.selectedColor ? `• Color: ${item.selectedColor}` : ''} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}
                        </p>
                        <p className="text-xs font-bold text-stone-900 font-mono">
                          ₹{item.product.salePrice.toLocaleString('en-IN')} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => onViewProduct(item.product)}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-bold transition-colors"
                      >
                        Buy Again
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer Actions & Tracking Info */}
              <div className="p-4 bg-stone-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-stone-600">
                  <Truck className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>
                    {order.status === 'delivered' 
                      ? 'Delivered to your address' 
                      : `Estimated Delivery by ${order.estimatedDelivery} • Tracking: ${order.trackingNumber}`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {order.status !== 'cancelled' && order.status !== 'delivered' && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg text-xs font-bold transition-colors"
                    >
                      Cancel Order
                    </button>
                  )}
                  <button
                    onClick={() => onNavigate('order-confirmation', { order })}
                    className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    View Tracking Details
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
