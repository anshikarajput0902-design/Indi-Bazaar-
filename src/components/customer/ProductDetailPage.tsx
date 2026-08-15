import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Zap, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Store, 
  MapPin, 
  Check, 
  Share2, 
  Info,
  ChevronRight,
  MessageSquare,
  Sparkles,
  Award
} from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  onNavigate: (view: string, params?: any) => void;
  onViewProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onNavigate,
  onViewProduct
}) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    pincode, 
    locationName, 
    approvedProducts, 
    reviews, 
    addReview,
    showToast 
  } = useApp();

  // State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.variants?.sizes?.[0]
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.variants?.colors?.[0]?.name
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'seller' | 'reviews'>('desc');

  // Review form modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewUserName, setNewReviewUserName] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('Bengaluru');

  const wishlisted = isInWishlist(product.id);
  const savingsAmount = product.originalPrice - product.salePrice;

  // Product reviews
  const productReviews = reviews.filter(r => r.productId === product.id);

  // Similar products
  const similarProducts = approvedProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    onNavigate('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewTitle.trim() || !newReviewComment.trim()) return;

    addReview({
      productId: product.id,
      userName: newReviewUserName || 'Verified Indian Buyer',
      userCity: newReviewCity || 'Mumbai',
      rating: newReviewRating,
      title: newReviewTitle,
      comment: newReviewComment,
      verifiedPurchase: true
    });

    setIsReviewModalOpen(false);
    setNewReviewTitle('');
    setNewReviewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <button onClick={() => onNavigate('home')} className="hover:text-orange-600">Home</button>
        <span>/</span>
        <button 
          onClick={() => onNavigate('products', { category: product.category })} 
          className="hover:text-orange-600 capitalize"
        >
          {product.category.replace('-', ' ')}
        </button>
        <span>/</span>
        <span className="text-stone-800 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Detail Section: Image Gallery & Buy Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Gallery (5 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs aspect-square">
            <img 
              src={product.images[selectedImageIndex] || product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded shadow-md">
                {product.discountPercent}% OFF
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-2.5 rounded-full shadow-md backdrop-blur-md transition-colors ${
                wishlisted ? 'bg-white text-rose-600' : 'bg-white/80 text-stone-600 hover:text-rose-600'
              }`}
              title="Add to wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-rose-600' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImageIndex === idx ? 'border-orange-600 ring-2 ring-orange-200' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Guarantees below image */}
          <div className="grid grid-cols-3 gap-2 bg-stone-50 border border-stone-200 rounded-xl p-3 text-center text-xs">
            <div className="space-y-1">
              <Truck className="w-4 h-4 mx-auto text-orange-600" />
              <p className="font-bold text-stone-800">Free Delivery</p>
              <p className="text-[10px] text-stone-500">Fast doorstep courier</p>
            </div>
            <div className="space-y-1 border-x border-stone-200">
              <RotateCcw className="w-4 h-4 mx-auto text-emerald-600" />
              <p className="font-bold text-stone-800">7-Day Returns</p>
              <p className="text-[10px] text-stone-500">100% money back</p>
            </div>
            <div className="space-y-1">
              <ShieldCheck className="w-4 h-4 mx-auto text-amber-600" />
              <p className="font-bold text-stone-800">100% Genuine</p>
              <p className="text-[10px] text-stone-500">Verified Indian seller</p>
            </div>
          </div>
        </div>

        {/* Right Product Purchase Details (7 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header Title & Seller Tag */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-500">Seller:</span>
                <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                  {product.vendorName}
                </span>
                <span className="flex items-center gap-0.5 text-xs text-amber-600 font-bold">
                  ★ {product.vendorRating || 4.8}
                </span>
              </div>
              <button 
                onClick={handleShare}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                title="Share product"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
              {product.shortDesc}
            </p>

            {/* Rating pill */}
            <div className="flex items-center gap-3 mt-3">
              <div className="inline-flex items-center gap-1 bg-emerald-700 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                <span>{product.rating}</span>
                <Star className="w-3.5 h-3.5 fill-white" />
              </div>
              <span className="text-xs text-stone-500 font-medium">
                {product.reviewCount.toLocaleString('en-IN')} Ratings & {productReviews.length} Verified Reviews
              </span>
            </div>
          </div>

          {/* Price Box */}
          <div className="bg-orange-50/50 border border-orange-200/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-stone-900">
                ₹{product.salePrice.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.salePrice && (
                <span className="text-base text-stone-400 line-through font-semibold">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-sm font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                {product.discountPercent}% OFF
              </span>
            </div>

            {savingsAmount > 0 && (
              <p className="text-xs font-semibold text-emerald-800">
                🎉 You save ₹{savingsAmount.toLocaleString('en-IN')} on this order! (Inclusive of all taxes)
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-orange-200/50 text-xs text-stone-700">
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                <Truck className="w-3.5 h-3.5" /> Free Delivery
              </span>
              <span>•</span>
              <span>Cash on Delivery (COD) Available</span>
              <span>•</span>
              <span className="text-orange-800 font-bold bg-amber-100 px-1.5 py-0.5 rounded">
                Code: WELCOME100 for ₹100 Off
              </span>
            </div>
          </div>

          {/* Variants Selector: Colors & Sizes */}
          {product.variants?.colors && product.variants.colors.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                <span>Color / Shade: <span className="text-orange-600 font-normal">{selectedColor}</span></span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.variants.colors.map(col => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      selectedColor === col.name 
                        ? 'border-orange-600 bg-orange-50 text-orange-900 ring-2 ring-orange-200' 
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" 
                      style={{ backgroundColor: col.hex }} 
                    />
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.variants?.sizes && product.variants.sizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                <span>Select Size: <span className="text-orange-600 font-normal">{selectedSize}</span></span>
                <span className="text-[11px] text-orange-600 font-semibold cursor-pointer">Size Guide</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.variants.sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                      selectedSize === sz 
                        ? 'border-orange-600 bg-orange-600 text-white shadow-xs' 
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Stock Status */}
          <div className="flex items-center gap-4">
            <div>
              <span className="block text-xs font-bold text-stone-700 mb-1.5">Quantity</span>
              <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-stone-900 font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                  className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-xs">
              {product.stock > 0 ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Check className="w-4 h-4" /> In Stock ({product.stock} items available)
                </span>
              ) : (
                <span className="text-rose-600 font-bold">Currently Out of Stock</span>
              )}
              <span className="text-stone-400 block text-[11px] mt-0.5">Dispatched directly by seller</span>
            </div>
          </div>

          {/* Pincode Delivery Check */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
              <div>
                <span className="font-semibold text-stone-800">Delivering to {pincode} ({locationName.split(',')[0]})</span>
                <p className="text-[11px] text-stone-500">Estimated delivery in {product.deliveryDays || 3} business days</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('home')} 
              className="text-orange-600 font-bold hover:underline"
            >
              Change
            </button>
          </div>

          {/* Action CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 px-6 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
            >
              <ShoppingCart className="w-4 h-4 text-amber-400" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Buy Now at ₹{(product.salePrice * quantity).toLocaleString('en-IN')}</span>
            </button>
          </div>

          {/* Key Product Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="pt-4 border-t border-stone-200">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Key Highlights</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                {product.highlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>

      {/* Tabs Section: Description, Specifications, Seller Info, Customer Reviews */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="flex border-b border-stone-200 bg-stone-50 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('desc')}
            className={`px-5 py-3.5 border-b-2 transition-colors shrink-0 ${
              activeTab === 'desc' ? 'border-orange-600 text-orange-700 bg-white' : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Product Description
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-5 py-3.5 border-b-2 transition-colors shrink-0 ${
              activeTab === 'specs' ? 'border-orange-600 text-orange-700 bg-white' : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('seller')}
            className={`px-5 py-3.5 border-b-2 transition-colors shrink-0 ${
              activeTab === 'seller' ? 'border-orange-600 text-orange-700 bg-white' : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Seller Details
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-3.5 border-b-2 transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === 'reviews' ? 'border-orange-600 text-orange-700 bg-white' : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>Customer Reviews</span>
            <span className="bg-orange-100 text-orange-800 text-[10px] px-1.5 py-0.2 rounded-full">
              {productReviews.length}
            </span>
          </button>
        </div>

        <div className="p-6">
          {/* 1. Description Tab */}
          {activeTab === 'desc' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed max-w-3xl">
              <p>{product.description}</p>
              <p>
                Every product listed on IndiBazaar undergoes stringent quality checks by our regional curation team. We directly connect traditional manufacturers, cooperatives, and brand sellers with consumers to offer the purest quality at authentic pricing.
              </p>
            </div>
          )}

          {/* 2. Specifications Tab */}
          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <table className="w-full text-xs text-left border-collapse">
                <tbody>
                  {Object.entries(product.specifications || {}).map(([k, v], idx) => (
                    <tr key={k} className={idx % 2 === 0 ? 'bg-stone-50' : 'bg-white'}>
                      <td className="py-2.5 px-4 font-semibold text-stone-500 w-1/3 border border-stone-200">{k}</td>
                      <td className="py-2.5 px-4 font-medium text-stone-800 border border-stone-200">{v}</td>
                    </tr>
                  ))}
                  <tr className="bg-stone-50">
                    <td className="py-2.5 px-4 font-semibold text-stone-500 border border-stone-200">Country of Origin</td>
                    <td className="py-2.5 px-4 font-medium text-stone-800 border border-stone-200">India 🇮🇳</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* 3. Seller Tab */}
          {activeTab === 'seller' && (
            <div className="max-w-xl space-y-4 text-xs text-stone-700">
              <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-lg">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">{product.vendorName}</h4>
                  <p className="text-stone-500 text-[11px]">Verified IndiBazaar Partner Seller</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-emerald-700 text-white font-bold text-[10px] px-1.5 py-0.2 rounded">
                      ★ {product.vendorRating || 4.8} Seller Rating
                    </span>
                    <span className="text-emerald-700 font-semibold">100% On-Time Dispatch</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-stone-600">
                <p><strong>Fulfillment Mode:</strong> Standard Direct Dispatch via IndiBazaar Logistics</p>
                <p><strong>Returns:</strong> 7 Days Doorstep Return & Exchange Policy</p>
                <p><strong>GST Compliant:</strong> Yes (All invoice tax details included)</p>
              </div>
            </div>
          )}

          {/* 4. Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div className="flex items-center gap-4">
                  <div className="text-center p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="text-3xl font-black text-stone-900">{product.rating}</p>
                    <div className="flex items-center justify-center text-amber-500 my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-[10px] text-stone-500">{product.reviewCount} Total ratings</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">Customer Feedback</h4>
                    <p className="text-xs text-stone-500">100% of reviews are from verified purchasers</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Write a Product Review</span>
                </button>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {productReviews.length === 0 ? (
                  <p className="text-xs text-stone-500 italic py-4">No reviews written for this product yet. Be the first to share your experience!</p>
                ) : (
                  productReviews.map(rev => (
                    <div key={rev.id} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="inline-flex items-center gap-0.5 bg-emerald-700 text-white font-bold text-[10px] px-1.5 py-0.2 rounded">
                            <span>{rev.rating}</span>
                            <Star className="w-2.5 h-2.5 fill-white" />
                          </div>
                          <span className="font-bold text-stone-900">{rev.title}</span>
                        </div>
                        <span className="text-stone-400 text-[11px]">{rev.date}</span>
                      </div>

                      <p className="text-xs text-stone-700 leading-relaxed">{rev.comment}</p>

                      <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                        <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                          <Check className="w-3 h-3" /> {rev.userName} ({rev.userCity || 'Verified Buyer'})
                        </span>
                        <span>{rev.helpfulCount} people found this helpful</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Write Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-stone-900">Write a Review for {product.name.slice(0, 20)}...</h3>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-stone-400 hover:text-stone-600">✕</button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className={`p-2 rounded-lg border flex items-center gap-1 font-bold ${
                        newReviewRating >= star ? 'bg-amber-50 border-amber-400 text-amber-800' : 'bg-stone-50 border-stone-200 text-stone-400'
                      }`}
                    >
                      <span>{star}</span>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Review Headline</label>
                <input
                  type="text"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Excellent fabric quality and fast delivery!"
                  className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Detailed Feedback</label>
                <textarea
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Tell other Indian buyers about product finish, fitting, delivery..."
                  className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={newReviewUserName}
                    onChange={(e) => setNewReviewUserName(e.target.value)}
                    placeholder="e.g. Ananya R."
                    className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">City</label>
                  <input
                    type="text"
                    value={newReviewCity}
                    onChange={(e) => setNewReviewCity(e.target.value)}
                    placeholder="e.g. Pune / Delhi"
                    className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-stone-900">Similar Products You May Like</h3>
              <p className="text-xs text-stone-500">More handpicked items in {product.category.replace('-', ' ')}</p>
            </div>
            <button
              onClick={() => onNavigate('products', { category: product.category })}
              className="text-xs font-bold text-orange-600 hover:underline"
            >
              View More in Category →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {similarProducts.map(simProd => (
              <ProductCard
                key={simProd.id}
                product={simProd}
                onViewDetails={onViewProduct}
                onBuyNow={() => onNavigate('checkout-direct', { product: simProd })}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
