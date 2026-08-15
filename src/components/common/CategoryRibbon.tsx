import React from 'react';
import { 
  Sparkles, 
  Headphones, 
  Home, 
  ShoppingBag, 
  Heart, 
  Gem, 
  Utensils, 
  Flame, 
  Grid
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CategoryRibbonProps {
  onSelectCategory: (slug: string | null) => void;
  activeCategory: string | null;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  'Sparkles': <Sparkles className="w-4 h-4 text-rose-500" />,
  'Headphones': <Headphones className="w-4 h-4 text-blue-500" />,
  'Home': <Home className="w-4 h-4 text-amber-500" />,
  'ShoppingBag': <ShoppingBag className="w-4 h-4 text-purple-500" />,
  'Heart': <Heart className="w-4 h-4 text-pink-500" />,
  'Gem': <Gem className="w-4 h-4 text-emerald-500" />,
  'Utensils': <Utensils className="w-4 h-4 text-orange-500" />
};

export const CategoryRibbon: React.FC<CategoryRibbonProps> = ({ 
  onSelectCategory, 
  activeCategory 
}) => {
  const { categories } = useApp();

  return (
    <div className="bg-white border-b border-stone-200 overflow-x-auto scrollbar-none py-2.5 px-4 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-4 min-w-max">
        
        {/* All Categories button */}
        <button
          onClick={() => onSelectCategory(null)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeCategory === null
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span>All Categories</span>
        </button>

        {/* Hot Deals pill */}
        <button
          onClick={() => onSelectCategory('deals')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeCategory === 'deals'
              ? 'bg-orange-600 text-white shadow-xs'
              : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-500" />
          <span>Deals of the Day</span>
        </button>

        {/* Category list */}
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-orange-600 text-white font-semibold shadow-xs'
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <span className="shrink-0">{ICON_MAP[cat.icon] || <Sparkles className="w-3.5 h-3.5" />}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
