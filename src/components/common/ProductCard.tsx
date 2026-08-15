import React from 'react';
import { 
  Heart, 
  Star, 
  ShoppingCart, 
  Zap, 
  CheckCircle2, 
  Truck
} from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onViewDetails,
  onBuyNow,
  layout = 'grid'
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.variants?.colors?.[0]?.name;
    const defaultSize = product.variants?.sizes?.[0];
    addToCart(product, 1, defaultSize, defaultColor);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBuyNow) {
      onBuyNow(product);
    } else {
      onViewDetails(product);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  if (layout === 'list') {
    return (
      <div 
        onClick={() => onViewDetails(product)}
        className="group bg-white rounded-xl border border-stone-200 hover:border-orange-400/80 hover:shadow-md transition-all duration-200 p-4 flex flex-col sm:flex-row gap-4 cursor-pointer relative"
      >
        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-xs transition-colors ${
            wishlisted 
              ? 'bg-rose-50 text-rose-600' 
              : 'bg-stone-100/80 text-stone-400 hover:text-rose-500 hover:bg-white'
          }`}
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Product Image */}
        <div className="sm:w-48 h-48 sm:h-auto rounded-lg overflow-hidden bg-stone-100 shrink-0 relative">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {product.discountPercent > 0 && (
            <span className="absolute top-2 left-2 bg-rose-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded shadow-xs">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span className="font-medium text-stone-700">{product.vendorName}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded text-[10px] font-semibold">
                <CheckCircle2 className="w-3 h-3" /> Verified Seller
              </span>
            </div>

            <h3 className="font-bold text-stone-900 text-base line-clamp-1 group-hover:text-orange-600 transition-colors">
              {product.name}
            </h3>

            <p className="text-xs text-stone-500 line-clamp-2 mt-1">
              {product.shortDesc}
            </p>

            {/* Rating pill */}
            <div className="flex items-center gap-2 mt-2">
              <div className="inline-flex items-center gap-1 bg-emerald-700 text-white text-xs font-bold px-2 py-0.5 rounded">
                <span>{product.rating}</span>
                <Star className="w-3 h-3 fill-white" />
              </div>
              <span className="text-xs text-stone-400 font-medium">
                ({product.reviewCount.toLocaleString('en-IN')} ratings)
              </span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
            {/* Price section */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-stone-900">
                  ₹{product.salePrice.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.salePrice && (
                  <span className="text-xs text-stone-400 line-through font-medium">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-700">
                  {product.discountPercent}% OFF
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <Truck className="w-3 h-3" /> Free Delivery
                </span>
                {product.isCodAvailable && <span>• Cash on Delivery</span>}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleAddToCart}
                className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Grid Card Layout
  return (
    <div 
      onClick={() => onViewDetails(product)}
      className="group bg-white rounded-xl border border-stone-200 hover:border-orange-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      {/* Top Badges & Wishlist */}
      <div className="absolute top-2.5 inset-x-2.5 z-10 flex items-start justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          {product.discountPercent > 0 && (
            <span className="bg-rose-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded shadow-xs pointer-events-auto">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-amber-500 text-stone-900 text-[10px] font-black px-1.5 py-0.2 rounded uppercase tracking-wider shadow-xs pointer-events-auto">
              Best Seller
            </span>
          )}
          {product.isDealOfTheDay && (
            <span className="bg-orange-700 text-white text-[10px] font-black px-1.5 py-0.2 rounded uppercase tracking-wider shadow-xs pointer-events-auto">
              ⚡ Deal
            </span>
          )}
        </div>

        <button
          onClick={handleToggleWishlist}
          className={`p-2 rounded-full shadow-xs backdrop-blur-xs transition-colors pointer-events-auto ${
            wishlisted 
              ? 'bg-white text-rose-600' 
              : 'bg-white/80 text-stone-400 hover:text-rose-500 hover:bg-white'
          }`}
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>
      </div>

      {/* Product Image */}
      <div className="w-full aspect-square bg-stone-100 overflow-hidden relative">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute bottom-2 left-2 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            Only {product.stock} Left!
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Vendor Tag */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="truncate max-w-[140px] font-medium text-stone-600">{product.vendorName}</span>
            {product.isCodAvailable && (
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1 rounded">
                COD
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-stone-900 text-sm line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-stone-400 line-clamp-1 mt-1 font-normal">
            {product.shortDesc}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="inline-flex items-center gap-0.5 bg-emerald-700 text-white text-[11px] font-bold px-1.5 py-0.2 rounded">
              <span>{product.rating}</span>
              <Star className="w-2.5 h-2.5 fill-white" />
            </div>
            <span className="text-[11px] text-stone-400">
              ({product.reviewCount.toLocaleString('en-IN')})
            </span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-3 pt-2.5 border-t border-stone-100">
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-lg font-black text-stone-900">
              ₹{product.salePrice.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.salePrice && (
              <span className="text-xs text-stone-400 line-through font-medium">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-700 ml-auto">
              {product.discountPercent}% OFF
            </span>
          </div>

          <div className="text-[11px] text-emerald-700 font-semibold mb-2.5 flex items-center gap-1">
            <Truck className="w-3 h-3" /> Free Delivery by IndiBazaar
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={handleAddToCart}
              className="w-full py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full py-1.5 px-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Buy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
