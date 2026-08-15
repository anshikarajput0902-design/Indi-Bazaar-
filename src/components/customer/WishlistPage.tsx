import React from 'react';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { Product } from '../../types';

interface WishlistPageProps {
  onNavigate: (view: string, params?: any) => void;
  onViewProduct: (product: Product) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ 
  onNavigate, 
  onViewProduct 
}) => {
  const { wishlist, approvedProducts } = useApp();

  const wishlistedProducts = approvedProducts.filter(p => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-stone-900">Your Wishlist is Empty</h2>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          Save your favorite traditional handlooms, smart gadgets, and festive decor to buy them later with exclusive price drop alerts!
        </p>
        <button
          onClick={() => onNavigate('products')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all inline-flex items-center gap-2"
        >
          <span>Explore Trending Deals</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">My Saved Wishlist</h1>
          <p className="text-xs text-stone-500 mt-0.5">{wishlistedProducts.length} items saved for later</p>
        </div>
        <button
          onClick={() => onNavigate('products')}
          className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlistedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={onViewProduct}
            onBuyNow={() => onNavigate('checkout-direct', { product })}
          />
        ))}
      </div>
    </div>
  );
};
