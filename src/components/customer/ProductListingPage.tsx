import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  LayoutGrid, 
  List, 
  X, 
  Star, 
  Check, 
  Sparkles,
  ShoppingBag,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { Product } from '../../types';

interface ProductListingPageProps {
  onViewProduct: (product: Product) => void;
  onNavigate: (view: string, params?: any) => void;
  initialCategory?: string | null;
  initialSearch?: string;
  initialFilter?: string;
}

export const ProductListingPage: React.FC<ProductListingPageProps> = ({
  onViewProduct,
  onNavigate,
  initialCategory = null,
  initialSearch = '',
  initialFilter
}) => {
  const { 
    approvedProducts, 
    categories, 
    activeSearchQuery, 
    setActiveSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter 
  } = useApp();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory || selectedCategoryFilter
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 8000]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [minDiscount, setMinDiscount] = useState<number | null>(
    initialFilter === 'deals' ? 50 : null
  );
  const [inStockOnly, setInStockOnly] = useState(false);
  const [codOnly, setCodOnly] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  // View & Sorting State
  const [sortBy, setSortBy] = useState<string>(
    initialFilter === 'new' ? 'newest' : initialFilter === 'bestseller' ? 'rating' : 'popularity'
  );
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Reset all filters
  const handleClearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedCategoryFilter(null);
    setPriceRange([0, 8000]);
    setMinRating(null);
    setMinDiscount(null);
    setInStockOnly(false);
    setCodOnly(false);
    setSelectedVendor(null);
    setActiveSearchQuery('');
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return approvedProducts.filter((product) => {
      // 1. Search Query
      const query = activeSearchQuery.toLowerCase().trim();
      if (query) {
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.shortDesc.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesVendor = product.vendorName.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesVendor) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // 3. Price Range
      if (product.salePrice < priceRange[0] || product.salePrice > priceRange[1]) {
        return false;
      }

      // 4. Rating
      if (minRating !== null && product.rating < minRating) {
        return false;
      }

      // 5. Discount
      if (minDiscount !== null && product.discountPercent < minDiscount) {
        return false;
      }

      // 6. In Stock
      if (inStockOnly && (!product.inStock || product.stock <= 0)) {
        return false;
      }

      // 7. COD
      if (codOnly && !product.isCodAvailable) {
        return false;
      }

      // 8. Vendor
      if (selectedVendor && product.vendorId !== selectedVendor) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.salePrice - b.salePrice;
      if (sortBy === 'price-high') return b.salePrice - a.salePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      // Popularity (reviewCount * rating)
      return (b.reviewCount * b.rating) - (a.reviewCount * a.rating);
    });
  }, [
    approvedProducts, 
    activeSearchQuery, 
    selectedCategory, 
    priceRange, 
    minRating, 
    minDiscount, 
    inStockOnly, 
    codOnly, 
    selectedVendor, 
    sortBy
  ]);

  // Unique vendors list
  const availableVendors = useMemo(() => {
    const map = new Map<string, string>();
    approvedProducts.forEach(p => map.set(p.vendorId, p.vendorName));
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [approvedProducts]);

  const activeCategoryObj = categories.find(c => c.slug === selectedCategory);

  const hasActiveFilters = 
    selectedCategory !== null || 
    priceRange[0] > 0 || 
    priceRange[1] < 8000 || 
    minRating !== null || 
    minDiscount !== null || 
    inStockOnly || 
    codOnly || 
    selectedVendor !== null ||
    activeSearchQuery.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      
      {/* Top Header / Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
          <button onClick={() => onNavigate('home')} className="hover:text-orange-600">Home</button>
          <span>/</span>
          <span className="text-stone-800 font-semibold">
            {activeCategoryObj ? activeCategoryObj.name : activeSearchQuery ? `Search: "${activeSearchQuery}"` : 'All Products'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">
              {activeCategoryObj ? activeCategoryObj.name : activeSearchQuery ? `Results for "${activeSearchQuery}"` : 'Explore Indian Marketplace Catalog'}
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Showing {filteredProducts.length} verified products with direct artisan & vendor pricing
            </p>
          </div>

          {/* View Toggle & Sort Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-stone-300"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 bg-white border border-stone-300 rounded-xl px-2.5 py-1.5 shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold text-stone-700 bg-transparent focus:outline-hidden cursor-pointer"
              >
                <option value="popularity">Sort: Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Biggest Discounts</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Grid/List switch */}
            <div className="hidden sm:flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                onClick={() => setViewLayout('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewLayout === 'grid' ? 'bg-white shadow-xs text-orange-600' : 'text-stone-500'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewLayout('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewLayout === 'list' ? 'bg-white shadow-xs text-orange-600' : 'text-stone-500'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-stone-200">
            <span className="text-xs text-stone-500 font-semibold">Active Filters:</span>

            {selectedCategory && (
              <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 text-xs px-2.5 py-1 rounded-full font-medium">
                Category: {activeCategoryObj?.name}
                <button onClick={() => { setSelectedCategory(null); setSelectedCategoryFilter(null); }}>✕</button>
              </span>
            )}

            {activeSearchQuery && (
              <span className="inline-flex items-center gap-1 bg-stone-200 text-stone-800 text-xs px-2.5 py-1 rounded-full font-medium">
                Search: "{activeSearchQuery}"
                <button onClick={() => setActiveSearchQuery('')}>✕</button>
              </span>
            )}

            {(priceRange[0] > 0 || priceRange[1] < 8000) && (
              <span className="inline-flex items-center gap-1 bg-stone-200 text-stone-800 text-xs px-2.5 py-1 rounded-full font-medium">
                Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                <button onClick={() => setPriceRange([0, 8000])}>✕</button>
              </span>
            )}

            {minRating !== null && (
              <span className="inline-flex items-center gap-1 bg-stone-200 text-stone-800 text-xs px-2.5 py-1 rounded-full font-medium">
                {minRating}★ & above
                <button onClick={() => setMinRating(null)}>✕</button>
              </span>
            )}

            {minDiscount !== null && (
              <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 text-xs px-2.5 py-1 rounded-full font-medium">
                {minDiscount}%+ Discount
                <button onClick={() => setMinDiscount(null)}>✕</button>
              </span>
            )}

            {codOnly && (
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-medium">
                Cash On Delivery
                <button onClick={() => setCodOnly(false)}>✕</button>
              </span>
            )}

            <button
              onClick={handleClearAllFilters}
              className="text-xs text-rose-600 hover:text-rose-800 font-bold ml-2 underline underline-offset-2"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 bg-white rounded-2xl border border-stone-200 p-5 space-y-6 h-fit shadow-xs sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-orange-600" />
              <h3 className="font-extrabold text-sm text-stone-900">Filters</h3>
            </div>
            {hasActiveFilters && (
              <button 
                onClick={handleClearAllFilters}
                className="text-xs text-stone-500 hover:text-rose-600 font-medium"
              >
                Reset All
              </button>
            )}
          </div>

          {/* 1. Categories Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Categories</h4>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => { setSelectedCategory(null); setSelectedCategoryFilter(null); }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                  selectedCategory === null ? 'bg-orange-50 text-orange-700 font-bold' : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <span>All Categories</span>
                <span>{approvedProducts.length}</span>
              </button>
              {categories.map(cat => {
                const count = approvedProducts.filter(p => p.category === cat.slug).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.slug); setSelectedCategoryFilter(cat.slug); }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                      selectedCategory === cat.slug ? 'bg-orange-50 text-orange-700 font-bold' : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span className="truncate max-w-[150px]">{cat.name}</span>
                    <span className="text-[11px] text-stone-400">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Price Range */}
          <div className="space-y-3 pt-3 border-t border-stone-100">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Price Range</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800 font-mono">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}+</span>
              </div>
              <input
                type="range"
                min={0}
                max={8000}
                step={250}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-orange-600 cursor-pointer"
              />
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                {[
                  { label: 'Under ₹999', range: [0, 999] as [number, number] },
                  { label: '₹999 - ₹1,999', range: [999, 1999] as [number, number] },
                  { label: '₹1,999 - ₹3,499', range: [1999, 3499] as [number, number] },
                  { label: 'Above ₹3,500', range: [3500, 8000] as [number, number] }
                ].map(p => (
                  <button
                    key={p.label}
                    onClick={() => setPriceRange(p.range)}
                    className="p-1.5 bg-stone-50 hover:bg-orange-50 hover:border-orange-300 border border-stone-200 rounded text-stone-700 font-medium transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Customer Ratings */}
          <div className="space-y-2 pt-3 border-t border-stone-100">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Customer Rating</h4>
            <div className="space-y-1">
              {[4, 3, 2].map(star => (
                <button
                  key={star}
                  onClick={() => setMinRating(minRating === star ? null : star)}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                    minRating === star ? 'bg-orange-50 text-orange-700 font-bold' : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="flex items-center text-amber-500 font-bold">
                      {star}★ & above
                    </span>
                  </div>
                  {minRating === star && <Check className="w-3.5 h-3.5 text-orange-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Minimum Discount */}
          <div className="space-y-2 pt-3 border-t border-stone-100">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Discount</h4>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[30, 50, 60].map(disc => (
                <button
                  key={disc}
                  onClick={() => setMinDiscount(minDiscount === disc ? null : disc)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-colors ${
                    minDiscount === disc 
                      ? 'bg-rose-50 border-rose-400 text-rose-700 shadow-2xs' 
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {disc}%+
                </button>
              ))}
            </div>
          </div>

          {/* 5. Quick Toggles: In Stock & COD */}
          <div className="space-y-2.5 pt-3 border-t border-stone-100 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-700">
              <input
                type="checkbox"
                checked={codOnly}
                onChange={(e) => setCodOnly(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded-sm focus:ring-orange-500"
              />
              <span>Cash on Delivery Available</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded-sm focus:ring-orange-500"
              />
              <span>Exclude Out of Stock</span>
            </label>
          </div>

          {/* 6. Filter by Verified Vendor */}
          <div className="space-y-2 pt-3 border-t border-stone-100">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Verified Indian Vendors</h4>
            <select
              value={selectedVendor || ''}
              onChange={(e) => setSelectedVendor(e.target.value || null)}
              className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-700 focus:outline-hidden"
            >
              <option value="">All Sellers</option>
              {availableVendors.map(v => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>

        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">No products match your current filters</h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto mt-1">
                  Try clearing some filters like discount threshold or price range, or searching for other authentic Indian goods.
                </p>
              </div>
              <button
                onClick={handleClearAllFilters}
                className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={
              viewLayout === 'grid' 
                ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4' 
                : 'space-y-4'
            }>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  layout={viewLayout}
                  onViewDetails={onViewProduct}
                  onBuyNow={() => onNavigate('checkout-direct', { product })}
                />
              ))}
            </div>
          )}
        </main>

      </div>

      {/* Mobile Filter Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 lg:hidden flex justify-end">
          <div className="bg-white w-4/5 max-w-sm h-full p-5 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-orange-600" />
                  <h3 className="font-bold text-sm text-stone-900">Refine Products</h3>
                </div>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-stone-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category */}
              <div>
                <p className="text-xs font-bold text-stone-700 uppercase mb-2">Category</p>
                <div className="space-y-1 max-h-40 overflow-y-auto text-xs">
                  <button
                    onClick={() => { setSelectedCategory(null); setSelectedCategoryFilter(null); }}
                    className={`w-full text-left p-1.5 rounded ${selectedCategory === null ? 'bg-orange-100 text-orange-800 font-bold' : 'text-stone-600'}`}
                  >
                    All Categories
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.slug); setSelectedCategoryFilter(cat.slug); }}
                      className={`w-full text-left p-1.5 rounded ${selectedCategory === cat.slug ? 'bg-orange-100 text-orange-800 font-bold' : 'text-stone-600'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div className="pt-3 border-t border-stone-100">
                <p className="text-xs font-bold text-stone-700 uppercase mb-2">Max Price: ₹{priceRange[1]}</p>
                <input
                  type="range"
                  min={0}
                  max={8000}
                  step={250}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-orange-600"
                />
              </div>

              {/* Mobile Rating */}
              <div className="pt-3 border-t border-stone-100">
                <p className="text-xs font-bold text-stone-700 uppercase mb-2">Rating</p>
                <div className="flex gap-2">
                  {[4, 3].map(star => (
                    <button
                      key={star}
                      onClick={() => setMinRating(minRating === star ? null : star)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded border ${minRating === star ? 'bg-orange-600 text-white' : 'bg-stone-100'}`}
                    >
                      {star}★+
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex gap-2">
              <button
                onClick={handleClearAllFilters}
                className="flex-1 py-2 text-xs font-bold border border-stone-300 rounded-lg text-stone-700"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2 text-xs font-bold bg-orange-600 text-white rounded-lg"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
