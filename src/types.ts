export type Role = 'customer' | 'vendor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  mobile?: string;
  avatar?: string;
  vendorId?: string; // If role is vendor
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // lucide icon name or emoji
  image: string;
  description: string;
  itemCount?: number;
}

export interface ProductVariant {
  sizes?: string[];
  colors?: { name: string; hex: string }[];
}

export interface Product {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  originalPrice: number; // MRP in INR
  salePrice: number;     // Selling price in INR
  discountPercent: number; // calculated or specified
  rating: number;        // e.g. 4.3
  reviewCount: number;
  category: string;      // Category slug or id
  vendorId: string;
  vendorName: string;
  vendorRating?: number;
  images: string[];
  stock: number;
  inStock: boolean;
  status: 'approved' | 'pending' | 'rejected';
  variants?: ProductVariant;
  highlights: string[];
  specifications: Record<string, string>;
  isCodAvailable?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  isDealOfTheDay?: boolean;
  dealEndsInHours?: number;
  deliveryDays?: number;
  returnPolicyDays?: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Address {
  id?: string;
  name: string;
  mobile: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  type: 'Home' | 'Work';
  isDefault?: boolean;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
  selectedSize?: string;
  selectedColor?: string;
  vendorId: string;
}

export interface TrackingStep {
  status: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
  note?: string;
}

export interface Order {
  id: string;
  date: string;
  customerId: string;
  customerName: string;
  customerMobile: string;
  shippingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: 'upi' | 'card' | 'cod' | 'netbanking';
  paymentStatus: 'paid' | 'pending';
  orderStatus: 'Order Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  vendorIds: string[];
  trackingTimeline: TrackingStep[];
}

export interface Vendor {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  gstin: string;
  city: string;
  state: string;
  category: string;
  rating: number;
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  joinedDate: string;
  status: 'approved' | 'pending' | 'rejected';
  isVerified: boolean;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  categorySlug?: string;
  bgGradient: string;
  buttonText: string;
  active: boolean;
}

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  userCity?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  images?: string[];
}
