import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Flame, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Percent, 
  Award, 
  Clock, 
  TrendingUp, 
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { Product } from '../../types';

interface HomePageProps {
  onNavigate: (view: string, params?: any) => void;
  onViewProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onViewProduct }) => {
  const { banners, categories, approvedProducts, setSelectedCategoryFilter } = useApp();
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });

  const activeBanners = banners.filter(b => b.active);

  // Auto banner rotation
  useEffect(() => {
    if (activeBanners.length === 0) return;
    const timer = setInterval(() => {
      setActiveBannerIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [activeBanners.length]);

  // Deal timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 6, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter product collections
  const dealsProducts = approvedProducts.filter(p => p.isDealOfTheDay || p.discountPercent >= 50).slice(0, 4);
  const trendingProducts = approvedProducts.filter(p => p.isTrending).slice(0, 8);
  const bestSellers = approvedProducts.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = approvedProducts.filter(p => p.isNewArrival).slice(0, 4);

  const currentBanner = activeBanners[activeBannerIndex] || activeBanners[0];

  return (
    <div className="space-y-10 pb-12">
      
      {/* 1. HERO PROMOTIONAL CAROUSEL BANNER */}
      {currentBanner && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-stone-900 min-h-[340px] sm:min-h-[380px] lg:min-h-[420px] flex items-center">
            
            {/* Background image & gradient overlay */}
            <img 
              src={currentBanner.image} 
              alt={currentBanner.title}
              className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay transition-opacity duration-700"
            />
            <div className={`absolute inset-0 bg-linear-to-r ${currentBanner.bgGradient} opacity-90`} />

            {/* Banner Content */}
            <div className="relative z-10 p-6 sm:p-12 max-w-2xl text-white space-y-4">
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-white/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> {currentBanner.tag}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                {currentBanner.title}
              </h1>

              <p className="text-sm sm:text-base text-stone-100/90 font-medium leading-relaxed">
                {currentBanner.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    if (currentBanner.categorySlug) {
                      setSelectedCategoryFilter(currentBanner.categorySlug);
                      onNavigate('products', { category: currentBanner.categorySlug });
                    } else {
                      onNavigate('products');
                    }
                  }}
                  className="bg-white hover:bg-stone-100 text-stone-900 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <span>{currentBanner.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('products', { filter: 'deals' })}
                  className="bg-black/30 hover:bg-black/50 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-white/20 transition-colors"
                >
                  View All Deals
                </button>
              </div>
            </div>

            {/* Carousel Controls */}
            {activeBanners.length > 1 && (
              <>
                <button
                  onClick={() => setActiveBannerIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors z-20"
                  aria-label="Previous banner"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveBannerIndex((prev) => (prev + 1) % activeBanners.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors z-20"
                  aria-label="Next banner"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                  {activeBanners.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveBannerIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        activeBannerIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/40'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

          </div>
        </div>
      )}

      {/* 2. VALUE BADGES STRIP */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 bg-orange-100 text-orange-600 rounded-lg shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">Free Delivery</p>
              <p className="text-[11px] text-stone-500">Orders above ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">Direct From Artisans</p>
              <p className="text-[11px] text-stone-500">100% Genuine & Verified</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 bg-rose-100 text-rose-600 rounded-lg shrink-0">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">Lowest Price Promise</p>
              <p className="text-[11px] text-stone-500">Up to 70% Off Deals</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 bg-amber-100 text-amber-600 rounded-lg shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">7 Days Easy Return</p>
              <p className="text-[11px] text-stone-500">Doorstep Return Pickup</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FEATURED CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-stone-900">Featured Categories</h2>
            <p className="text-xs text-stone-500">Explore authentic Indian craft and curated lifestyle goods</p>
          </div>
          <button
            onClick={() => {
              setSelectedCategoryFilter(null);
              onNavigate('products');
            }}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategoryFilter(cat.slug);
                onNavigate('products', { category: cat.slug });
              }}
              className="group bg-white rounded-xl border border-stone-200 hover:border-orange-500 hover:shadow-md transition-all p-3 text-center cursor-pointer flex flex-col items-center justify-between"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-2 bg-stone-100 ring-2 ring-stone-100 group-hover:ring-orange-500 transition-all">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="font-bold text-xs text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-stone-400 font-medium">
                  {cat.itemCount || 5}+ Products
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DEAL OF THE DAY WITH TIMER */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-linear-to-r from-orange-50 via-amber-50 to-orange-100/60 rounded-2xl border border-orange-200 p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-orange-600 text-white rounded-xl shadow-xs">
                <Flame className="w-6 h-6 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-stone-900">Deals of the Day</h2>
                  <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    50%+ OFF
                  </span>
                </div>
                <p className="text-xs text-stone-600">Handpicked super savings refreshed daily</p>
              </div>
            </div>

            {/* Countdown timer */}
            <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-orange-300 shadow-xs">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-semibold text-stone-600">Ends in:</span>
              <div className="flex items-center gap-1 font-mono text-xs font-black text-orange-700">
                <span className="bg-stone-900 text-white px-1.5 py-0.5 rounded">{String(timeLeft.hours).padStart(2, '0')}h</span>
                <span>:</span>
                <span className="bg-stone-900 text-white px-1.5 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                <span>:</span>
                <span className="bg-stone-900 text-white px-1.5 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dealsProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewProduct}
                onBuyNow={() => onNavigate('checkout-direct', { product })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRENDING PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-stone-900">Trending Right Now</h2>
              <p className="text-xs text-stone-500">Most loved products ordered across India this week</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('products', { filter: 'trending' })}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>See More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProduct}
              onBuyNow={() => onNavigate('checkout-direct', { product })}
            />
          ))}
        </div>
      </section>

      {/* 6. ARTISAN & WEAVER SPOTLIGHT PROMO */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-linear-to-r from-stone-900 via-amber-950 to-stone-900 rounded-2xl text-white p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-3 max-w-xl z-10">
            <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-amber-400/30">
              <HeartHandshake className="w-3.5 h-3.5" /> Swadeshi & Direct From Weavers
            </span>
            <h3 className="text-2xl sm:text-3xl font-black leading-tight text-amber-100">
              Support 50,000+ Generational Indian Artisans & Direct Guilds
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              When you shop on IndiBazaar, 92% of the purchase value reaches directly into the hands of Varanasi silk handloom masters, Jaipur block printers, Kashmiri spice growers, and local artisans.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategoryFilter('ethnic-wear');
                  onNavigate('products', { category: 'ethnic-wear' });
                }}
                className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all"
              >
                Shop Handloom Sarees & Kurtas →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0 z-10">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-center border border-white/10">
              <p className="text-2xl font-black text-amber-400">100%</p>
              <p className="text-[11px] text-stone-300 mt-1">Authentic Handloom Certified</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-center border border-white/10">
              <p className="text-2xl font-black text-amber-400">0%</p>
              <p className="text-[11px] text-stone-300 mt-1">Middleman Commission</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-stone-900">All-Time Best Sellers</h2>
              <p className="text-xs text-stone-500">Customer favorites with 4.5+ star verified ratings</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('products', { filter: 'bestseller' })}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestSellers.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProduct}
              onBuyNow={() => onNavigate('checkout-direct', { product })}
            />
          ))}
        </div>
      </section>

      {/* 8. NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-rose-100 text-rose-600 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-stone-900">Fresh New Arrivals</h2>
              <p className="text-xs text-stone-500">Newly launched collections from verified vendors</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('products', { filter: 'new' })}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {newArrivals.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProduct}
              onBuyNow={() => onNavigate('checkout-direct', { product })}
            />
          ))}
        </div>
      </section>

    </div>
  );
};
