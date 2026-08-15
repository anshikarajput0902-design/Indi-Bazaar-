import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  Category, 
  Vendor, 
  Banner, 
  CartItem, 
  Order, 
  User, 
  Address, 
  ProductReview, 
  Role 
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORIES, 
  INITIAL_VENDORS, 
  INITIAL_BANNERS, 
  INITIAL_ORDERS, 
  INITIAL_REVIEWS 
} from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Authentication & Role
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: Role, vendorId?: string) => void;
  loginUser: (email: string, role: Role, name?: string) => void;
  logoutUser: () => void;

  // Products
  products: Product[];
  approvedProducts: Product[];
  addProduct: (productData: Omit<Product, 'id' | 'createdAt' | 'status'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setProductApprovalStatus: (id: string, status: 'approved' | 'rejected') => void;

  // Categories & Banners
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  banners: Banner[];
  toggleBanner: (id: string) => void;
  addBanner: (banner: Omit<Banner, 'id'>) => void;

  // Vendors
  vendors: Vendor[];
  currentVendor: Vendor | null;
  registerVendor: (vendorData: Omit<Vendor, 'id' | 'rating' | 'totalSales' | 'totalOrders' | 'totalProducts' | 'joinedDate' | 'status' | 'isVerified'>) => void;
  setVendorStatus: (id: string, status: 'approved' | 'rejected') => void;

  // Customer Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string, selectedColor?: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Pricing & Coupon
  appliedCoupon: string | null;
  couponDiscount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  cartSubtotal: number;
  deliveryCharge: number;
  cartTotalAmount: number;

  // Orders
  orders: Order[];
  placeOrder: (
    shippingAddress: Address, 
    paymentMethod: 'upi' | 'card' | 'cod' | 'netbanking',
    itemsOverride?: CartItem[]
  ) => Order;
  updateOrderStatus: (orderId: string, newStatus: Order['orderStatus'], note?: string) => void;

  // Pincode & Delivery Location
  pincode: string;
  locationName: string;
  updatePincode: (newPincode: string) => void;

  // Navigation & Search Helpers
  activeSearchQuery: string;
  setActiveSearchQuery: (query: string) => void;
  selectedCategoryFilter: string | null;
  setSelectedCategoryFilter: (categorySlug: string | null) => void;

  // Reviews
  reviews: ProductReview[];
  addReview: (review: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>) => void;

  // Notifications / Toast
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;

  // Reset Demo Data
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_CUSTOMER: User = {
  id: 'cust-demo-1',
  name: 'Aarav Patel',
  email: 'aarav.patel@gmail.com',
  mobile: '9876543210',
  role: 'customer',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

const PINCODE_MAP: Record<string, string> = {
  '110001': 'Connaught Place, New Delhi',
  '560001': 'M.G. Road, Bengaluru',
  '560038': 'Indiranagar, Bengaluru',
  '400001': 'Fort, Mumbai',
  '400050': 'Bandra West, Mumbai',
  '700001': 'B.B.D. Bagh, Kolkata',
  '600001': 'George Town, Chennai',
  '500001': 'Abids, Hyderabad',
  '302001': 'MI Road, Jaipur',
  '221001': 'Cantt, Varanasi',
  '682001': 'Fort Kochi, Kochi'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // LocalStorage initialization with fallbacks
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('indibazaar_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('indibazaar_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem('indibazaar_vendors');
    return saved ? JSON.parse(saved) : INITIAL_VENDORS;
  });

  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem('indibazaar_banners');
    return saved ? JSON.parse(saved) : INITIAL_BANNERS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('indibazaar_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    const saved = localStorage.getItem('indibazaar_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('indibazaar_cart');
    return saved ? JSON.parse(saved) : [
      {
        product: INITIAL_PRODUCTS[0], // Banarasi saree
        quantity: 1,
        selectedColor: 'Royal Crimson Red'
      }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('indibazaar_wishlist');
    return saved ? JSON.parse(saved) : ['prod-6', 'prod-17', 'prod-20'];
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('indibazaar_user');
    return saved ? JSON.parse(saved) : DEMO_CUSTOMER;
  });

  const [pincode, setPincode] = useState<string>('560038');
  const [locationName, setLocationName] = useState<string>('Indiranagar, Bengaluru');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('WELCOME100');
  const [couponDiscount, setCouponDiscount] = useState<number>(100);
  const [activeSearchQuery, setActiveSearchQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('indibazaar_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('indibazaar_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('indibazaar_vendors', JSON.stringify(vendors));
  }, [vendors]);

  useEffect(() => {
    localStorage.setItem('indibazaar_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('indibazaar_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('indibazaar_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('indibazaar_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('indibazaar_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('indibazaar_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Toast notifier
  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString().substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Roles switching & Auth
  const switchRole = (role: Role, vendorId?: string) => {
    if (role === 'admin') {
      const adminUser: User = {
        id: 'admin-1',
        name: 'Super Admin (Rajesh Varma)',
        email: 'admin@indibazaar.in',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
      };
      setCurrentUser(adminUser);
      showToast('Switched to Administrator Workspace', 'info');
    } else if (role === 'vendor') {
      const targetVendorId = vendorId || vendors[0]?.id || 'ven-1';
      const matchedVendor = vendors.find(v => v.id === targetVendorId) || vendors[0];
      const vendorUser: User = {
        id: `user-${matchedVendor.id}`,
        name: `${matchedVendor.ownerName} (${matchedVendor.businessName})`,
        email: matchedVendor.email,
        mobile: matchedVendor.phone,
        role: 'vendor',
        vendorId: matchedVendor.id,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      };
      setCurrentUser(vendorUser);
      showToast(`Logged in as Vendor: ${matchedVendor.businessName}`, 'info');
    } else {
      setCurrentUser(DEMO_CUSTOMER);
      showToast('Switched to Customer Shopping Experience', 'info');
    }
  };

  const loginUser = (email: string, role: Role, name?: string) => {
    if (role === 'admin') {
      switchRole('admin');
    } else if (role === 'vendor') {
      const existing = vendors.find(v => v.email.toLowerCase() === email.toLowerCase()) || vendors[0];
      switchRole('vendor', existing.id);
    } else {
      const newUser: User = {
        id: 'cust-' + Date.now(),
        name: name || email.split('@')[0],
        email,
        role: 'customer'
      };
      setCurrentUser(newUser);
      showToast(`Welcome, ${newUser.name}!`, 'success');
    }
  };

  const logoutUser = () => {
    setCurrentUser(DEMO_CUSTOMER);
    showToast('Logged out to default visitor mode', 'info');
  };

  const currentVendor = currentUser.role === 'vendor' && currentUser.vendorId
    ? vendors.find(v => v.id === currentUser.vendorId) || null
    : null;

  // Filtered Approved Products for Customer storefront
  const approvedProducts = products.filter(p => p.status === 'approved');

  // Product Operations
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'status'>) => {
    const newProduct: Product = {
      ...productData,
      id: 'prod-' + Date.now(),
      status: currentUser.role === 'admin' ? 'approved' : 'approved', // instant live for demo convenience, flagged status
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [newProduct, ...prev]);

    // Update vendor total products count
    if (newProduct.vendorId) {
      setVendors(prev => prev.map(v => 
        v.id === newProduct.vendorId 
          ? { ...v, totalProducts: v.totalProducts + 1 } 
          : v
      ));
    }

    showToast(`"${newProduct.name}" added to catalog successfully!`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updates };
        // Recalculate discount percentage if prices change
        if (updates.originalPrice || updates.salePrice) {
          const orig = updates.originalPrice ?? p.originalPrice;
          const sale = updates.salePrice ?? p.salePrice;
          updated.discountPercent = Math.round(((orig - sale) / orig) * 100);
        }
        return updated;
      }
      return p;
    }));
    showToast('Product details updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    const prod = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => prev.filter(item => item.product.id !== id));
    setWishlist(prev => prev.filter(pId => pId !== id));
    if (prod && prod.vendorId) {
      setVendors(prev => prev.map(v => 
        v.id === prod.vendorId 
          ? { ...v, totalProducts: Math.max(0, v.totalProducts - 1) } 
          : v
      ));
    }
    showToast('Product removed from catalog', 'info');
  };

  const setProductApprovalStatus = (id: string, status: 'approved' | 'rejected') => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    showToast(`Product ${status === 'approved' ? 'Approved' : 'Rejected'} by Admin`, 'info');
  };

  // Categories & Banners
  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...categoryData,
      id: 'cat-' + Date.now()
    };
    setCategories(prev => [...prev, newCat]);
    showToast(`New category "${newCat.name}" created`, 'success');
  };

  const toggleBanner = (id: string) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b));
    showToast('Banner visibility toggled', 'info');
  };

  const addBanner = (bannerData: Omit<Banner, 'id'>) => {
    const newBanner: Banner = {
      ...bannerData,
      id: 'ban-' + Date.now()
    };
    setBanners(prev => [newBanner, ...prev]);
    showToast('New promotional banner created', 'success');
  };

  // Vendor Operations
  const registerVendor = (vendorData: Omit<Vendor, 'id' | 'rating' | 'totalSales' | 'totalOrders' | 'totalProducts' | 'joinedDate' | 'status' | 'isVerified'>) => {
    const newVendor: Vendor = {
      ...vendorData,
      id: 'ven-' + Date.now(),
      rating: 5.0,
      totalSales: 0,
      totalOrders: 0,
      totalProducts: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'approved',
      isVerified: true
    };
    setVendors(prev => [...prev, newVendor]);
    switchRole('vendor', newVendor.id);
    showToast(`Vendor account created for ${newVendor.businessName}! Welcome aboard!`, 'success');
  };

  const setVendorStatus = (id: string, status: 'approved' | 'rejected') => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    showToast(`Vendor status set to ${status}`, 'info');
  };

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1, selectedSize?: string, selectedColor?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedSize, selectedColor }];
      }
    });
    showToast(`Added "${product.name.slice(0, 24)}..." to Cart!`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }
    setCart(prev => prev.map(item => {
      if (
        item.product.id === productId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      ) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string, selectedSize?: string, selectedColor?: string) => {
    setCart(prev => prev.filter(item => !(
      item.product.id === productId && 
      item.selectedSize === selectedSize && 
      item.selectedColor === selectedColor
    )));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to Wishlist ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.salePrice * item.quantity), 0);
  const deliveryCharge = cartSubtotal >= 499 || cartSubtotal === 0 ? 0 : 49;
  const cartTotalAmount = Math.max(0, cartSubtotal - couponDiscount + deliveryCharge);

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME100') {
      setAppliedCoupon('WELCOME100');
      setCouponDiscount(100);
      showToast('Coupon WELCOME100 applied: ₹100 Flat OFF!', 'success');
      return true;
    } else if (clean === 'FESTIVE20') {
      const discountVal = Math.round(cartSubtotal * 0.20);
      setAppliedCoupon('FESTIVE20');
      setCouponDiscount(discountVal);
      showToast(`Coupon FESTIVE20 applied: ₹${discountVal} OFF!`, 'success');
      return true;
    } else if (clean === 'DESI50') {
      setAppliedCoupon('DESI50');
      setCouponDiscount(50);
      showToast('Coupon DESI50 applied: ₹50 OFF!', 'success');
      return true;
    } else {
      showToast('Invalid Coupon Code. Try WELCOME100 or FESTIVE20', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    showToast('Coupon removed', 'info');
  };

  // Pincode
  const updatePincode = (newPincode: string) => {
    setPincode(newPincode);
    const loc = PINCODE_MAP[newPincode] || `Area near PIN ${newPincode}`;
    setLocationName(loc);
    showToast(`Delivery location updated to ${loc} (${newPincode})`, 'success');
  };

  // Place Order
  const placeOrder = (
    shippingAddress: Address, 
    paymentMethod: 'upi' | 'card' | 'cod' | 'netbanking',
    itemsOverride?: CartItem[]
  ): Order => {
    const checkoutItems = itemsOverride || cart;
    const sub = checkoutItems.reduce((acc, item) => acc + (item.product.salePrice * item.quantity), 0);
    const delFee = sub >= 499 || sub === 0 ? 0 : 49;
    const disc = appliedCoupon ? couponDiscount : 0;
    const total = Math.max(0, sub - disc + delFee);

    const vendorIdsSet = new Set<string>();
    checkoutItems.forEach(item => {
      if (item.product.vendorId) vendorIdsSet.add(item.product.vendorId);
    });

    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()}`;
    const orderId = 'IB-' + now.getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

    const newOrder: Order = {
      id: orderId,
      date: formattedDate,
      customerId: currentUser.id,
      customerName: shippingAddress.name || currentUser.name,
      customerMobile: shippingAddress.mobile || currentUser.mobile || '9876543210',
      shippingAddress,
      items: checkoutItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product.salePrice,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        vendorId: item.product.vendorId
      })),
      subtotal: sub,
      discount: disc,
      couponCode: appliedCoupon || undefined,
      deliveryFee: delFee,
      totalAmount: total,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'Order Placed',
      vendorIds: Array.from(vendorIdsSet),
      trackingTimeline: [
        { 
          status: 'Order Placed', 
          timestamp: `${formattedDate}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, 
          completed: true,
          current: true,
          note: `Payment received via ${paymentMethod.toUpperCase()}`
        },
        { 
          status: 'Processing & Packed', 
          timestamp: 'Vendor is preparing item for dispatch', 
          completed: false 
        },
        { 
          status: 'Shipped via Express Logistics', 
          timestamp: 'Expected within 24-48 hours', 
          completed: false 
        },
        { 
          status: 'Out for Delivery', 
          timestamp: `Delivery to ${shippingAddress.pincode}`, 
          completed: false 
        },
        { 
          status: 'Delivered', 
          timestamp: 'Guaranteed 7-day return policy', 
          completed: false 
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);

    // Update vendors stats
    setVendors(prev => prev.map(v => {
      if (vendorIdsSet.has(v.id)) {
        const vendorOrderAmount = newOrder.items
          .filter(it => it.vendorId === v.id)
          .reduce((sum, it) => sum + (it.price * it.quantity), 0);
        return {
          ...v,
          totalSales: v.totalSales + vendorOrderAmount,
          totalOrders: v.totalOrders + 1
        };
      }
      return v;
    }));

    // Deduct stock
    setProducts(prev => prev.map(p => {
      const match = checkoutItems.find(item => item.product.id === p.id);
      if (match) {
        const newStock = Math.max(0, p.stock - match.quantity);
        return {
          ...p,
          stock: newStock,
          inStock: newStock > 0
        };
      }
      return p;
    }));

    if (!itemsOverride) {
      clearCart();
    }

    showToast(`Order #${newOrder.id} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['orderStatus'], note?: string) => {
    const now = new Date();
    const formatted = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const updatedTimeline = ord.trackingTimeline.map(step => {
          if (step.status === newStatus || step.status.startsWith(newStatus.split(' ')[0])) {
            return {
              ...step,
              completed: true,
              current: true,
              timestamp: formatted,
              note: note || step.note
            };
          }
          return step;
        });

        return {
          ...ord,
          orderStatus: newStatus,
          paymentStatus: newStatus === 'Delivered' ? 'paid' : ord.paymentStatus,
          trackingTimeline: updatedTimeline
        };
      }
      return ord;
    }));
    showToast(`Order #${orderId} status changed to "${newStatus}"`, 'info');
  };

  // Product Reviews
  const addReview = (reviewData: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>) => {
    const now = new Date();
    const newReview: ProductReview = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: now.toISOString().split('T')[0],
      helpfulCount: 0
    };
    setReviews(prev => [newReview, ...prev]);

    // Recalculate product rating
    setProducts(prev => prev.map(p => {
      if (p.id === reviewData.productId) {
        const prodReviews = [...reviews.filter(r => r.productId === p.id), newReview];
        const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
        return {
          ...p,
          rating: Number(avg.toFixed(1)),
          reviewCount: p.reviewCount + 1
        };
      }
      return p;
    }));

    showToast('Thank you! Your verified review was published.', 'success');
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setVendors(INITIAL_VENDORS);
    setBanners(INITIAL_BANNERS);
    setOrders(INITIAL_ORDERS);
    setReviews(INITIAL_REVIEWS);
    setCart([{ product: INITIAL_PRODUCTS[0], quantity: 1, selectedColor: 'Royal Crimson Red' }]);
    setWishlist(['prod-6', 'prod-17', 'prod-20']);
    setCurrentUser(DEMO_CUSTOMER);
    showToast('Reset marketplace to original demo state', 'info');
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      switchRole,
      loginUser,
      logoutUser,

      products,
      approvedProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      setProductApprovalStatus,

      categories,
      addCategory,
      banners,
      toggleBanner,
      addBanner,

      vendors,
      currentVendor,
      registerVendor,
      setVendorStatus,

      cart,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      wishlist,
      toggleWishlist,
      isInWishlist,

      appliedCoupon,
      couponDiscount,
      applyCoupon,
      removeCoupon,
      cartSubtotal,
      deliveryCharge,
      cartTotalAmount,

      orders,
      placeOrder,
      updateOrderStatus,

      pincode,
      locationName,
      updatePincode,

      activeSearchQuery,
      setActiveSearchQuery,
      selectedCategoryFilter,
      setSelectedCategoryFilter,

      reviews,
      addReview,

      toasts,
      showToast,
      removeToast,

      resetToDefaults
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
