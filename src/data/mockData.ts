import { Category, Product, Vendor, Banner, ProductReview, Order } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-ethnic',
    name: 'Ethnic & Festive Wear',
    slug: 'ethnic-wear',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
    description: 'Authentic sarees, kurtas, lehengas & festive outfits from Indian weavers.',
    itemCount: 8
  },
  {
    id: 'cat-electronics',
    name: 'Electronics & Audio',
    slug: 'electronics',
    icon: 'Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    description: 'Smart wearables, true wireless audio, fast power accessories & tech gadgets.',
    itemCount: 6
  },
  {
    id: 'cat-home',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
    description: 'Brassware, stainless steel cookware, Jaipuri bedsheets & handcrafted decor.',
    itemCount: 6
  },
  {
    id: 'cat-footwear',
    name: 'Footwear & Bags',
    slug: 'footwear-accessories',
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
    description: 'Kolhapuri chappals, genuine leather wallets, formal shoes & sneakers.',
    itemCount: 5
  },
  {
    id: 'cat-beauty',
    name: 'Beauty & Ayurvedic',
    slug: 'beauty-ayurvedic',
    icon: 'Heart',
    image: 'https://images.unsplash.com/photo-1608248597359-00f368f56ef4?w=600&auto=format&fit=crop&q=80',
    description: 'Kumkumadi tailam, herbal hair care, organic serums & skin radiance oils.',
    itemCount: 5
  },
  {
    id: 'cat-jewelry',
    name: 'Jewelry & Ornaments',
    slug: 'jewelry',
    icon: 'Gem',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80',
    description: 'Kundan choker sets, temple jhumkas, oxidized silver bangles & meenakari rings.',
    itemCount: 5
  },
  {
    id: 'cat-gourmet',
    name: 'Spices & Dry Fruits',
    slug: 'spices-dryfruits',
    icon: 'Utensils',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    description: 'Kashmiri saffron, organic cardamom, forest honey & premium dry fruits.',
    itemCount: 5
  }
];

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'ven-1',
    businessName: 'Varanasi Silk Weavers Guild',
    ownerName: 'Ramprasad Sharma',
    email: 'ramprasad@varanasisilks.in',
    phone: '+91 98390 12345',
    gstin: '09AAACH7409R1ZZ',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    category: 'ethnic-wear',
    rating: 4.8,
    totalSales: 485000,
    totalOrders: 342,
    totalProducts: 8,
    joinedDate: '2025-01-15',
    status: 'approved',
    isVerified: true
  },
  {
    id: 'ven-2',
    businessName: 'Zenith Audio & Smart Gadgets',
    ownerName: 'Vikram Mehta',
    email: 'contact@zenithtech.in',
    phone: '+91 98200 54321',
    gstin: '27AABCT2389K1Z4',
    city: 'Mumbai',
    state: 'Maharashtra',
    category: 'electronics',
    rating: 4.6,
    totalSales: 890000,
    totalOrders: 620,
    totalProducts: 6,
    joinedDate: '2025-02-10',
    status: 'approved',
    isVerified: true
  },
  {
    id: 'ven-3',
    businessName: 'Shri Krishna Heritage Crafts',
    ownerName: 'Ananya Rathore',
    email: 'orders@shrikrishnacrafts.in',
    phone: '+91 94140 87654',
    gstin: '08AABFS1980Q1Z8',
    city: 'Jaipur',
    state: 'Rajasthan',
    category: 'home-kitchen',
    rating: 4.9,
    totalSales: 310000,
    totalOrders: 215,
    totalProducts: 6,
    joinedDate: '2025-03-01',
    status: 'approved',
    isVerified: true
  },
  {
    id: 'ven-4',
    businessName: 'Vedic Glow Pure Botanicals',
    ownerName: 'Dr. Meera Nambiar',
    email: 'care@vedicglow.in',
    phone: '+91 94470 33221',
    gstin: '32AADCV4491M1Z1',
    city: 'Kochi',
    state: 'Kerala',
    category: 'beauty-ayurvedic',
    rating: 4.7,
    totalSales: 275000,
    totalOrders: 188,
    totalProducts: 5,
    joinedDate: '2025-03-12',
    status: 'approved',
    isVerified: true
  },
  {
    id: 'ven-5',
    businessName: 'Royal Kashmir Dry Fruits & Spices',
    ownerName: 'Farooq Mir',
    email: 'farooq@kashmiriradience.in',
    phone: '+91 97970 99887',
    gstin: '01AABCR9912P1Z0',
    city: 'Srinagar',
    state: 'Jammu & Kashmir',
    category: 'spices-dryfruits',
    rating: 4.9,
    totalSales: 520000,
    totalOrders: 410,
    totalProducts: 5,
    joinedDate: '2025-02-20',
    status: 'approved',
    isVerified: true
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // ETHNIC WEAR
  {
    id: 'prod-1',
    name: 'Pure Katan Silk Banarasi Saree with Zari Weave',
    shortDesc: 'Traditional woven motifs with golden zari border and matching unstitched blouse piece.',
    description: 'Crafted by generational master weavers in Varanasi, this authentic Katan silk saree radiates traditional Indian grandeur. Adorned with intricate floral jaal and a dense golden pallu, perfect for weddings, pujas, and gala celebrations. Handloom certified.',
    originalPrice: 4999,
    salePrice: 2499,
    discountPercent: 50,
    rating: 4.8,
    reviewCount: 1420,
    category: 'ethnic-wear',
    vendorId: 'ven-1',
    vendorName: 'Varanasi Silk Weavers Guild',
    vendorRating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 24,
    inStock: true,
    status: 'approved',
    variants: {
      colors: [
        { name: 'Royal Crimson Red', hex: '#b91c1c' },
        { name: 'Peacock Emerald Green', hex: '#047857' },
        { name: 'Midnight Navy Blue', hex: '#1e3a8a' },
        { name: 'Mustard Haldi Gold', hex: '#d97706' }
      ]
    },
    highlights: ['100% Handwoven Katan Silk', 'Includes 0.8m Blouse Piece', 'Silk Mark Certified', 'Free & Insured Delivery'],
    specifications: {
      'Fabric': 'Pure Katan Silk',
      'Length': '5.5 Meters Saree + 0.8 Meter Blouse',
      'Occasion': 'Festive, Wedding, Reception',
      'Care': 'Dry Clean Only',
      'Origin': 'Varanasi, Uttar Pradesh'
    },
    isCodAvailable: true,
    isBestSeller: true,
    isTrending: true,
    isDealOfTheDay: true,
    dealEndsInHours: 7,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-06-01'
  },
  {
    id: 'prod-2',
    name: 'Men’s Hand-Embroidered Kurta Pyjama Set with Nehru Jacket',
    shortDesc: 'Breathable pure cotton silk kurta set with detailed thread embroidery and wooden buttons.',
    description: 'Elevate your festive aura with this 3-piece designer ethnic ensemble. Includes a tailored mandarin-collar kurta, a structured brocade Nehru jacket, and comfortable churidar bottoms with elasticated drawstring.',
    originalPrice: 3499,
    salePrice: 1799,
    discountPercent: 49,
    rating: 4.6,
    reviewCount: 680,
    category: 'ethnic-wear',
    vendorId: 'ven-1',
    vendorName: 'Varanasi Silk Weavers Guild',
    vendorRating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 35,
    inStock: true,
    status: 'approved',
    variants: {
      sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)'],
      colors: [
        { name: 'Off-White & Saffron', hex: '#fef08a' },
        { name: 'Pista Green', hex: '#86efac' },
        { name: 'Dusty Pink', hex: '#f472b6' }
      ]
    },
    highlights: ['Breathable Cotton-Silk Blend', 'Includes 3-Pieces (Kurta, Jacket, Pyjama)', 'Mandarin Collar Styling', 'Wrinkle Resistant'],
    specifications: {
      'Fabric': 'Cotton Silk Blend',
      'Fit': 'Regular Comfort Fit',
      'Pattern': 'Embroidered Thread Work',
      'Wash Care': 'Gentle Hand Wash / Machine Wash Gentle'
    },
    isCodAvailable: true,
    isTrending: true,
    deliveryDays: 4,
    returnPolicyDays: 7,
    createdAt: '2026-06-05'
  },
  {
    id: 'prod-3',
    name: 'Lucknowi Chikankari Georgette Anarkali Kurti with Dupatta',
    shortDesc: 'Delicate handcrafted shadow work embroidery with gota patti borders and matching chiffon dupatta.',
    description: 'Directly sourced from Lucknow artisans, this georgette Anarkali flared kurta features authentic Bakhiya and Phanda stitch patterns. Lined with ultra-soft mulmul cotton for day-long breezy comfort.',
    originalPrice: 2799,
    salePrice: 1299,
    discountPercent: 54,
    rating: 4.7,
    reviewCount: 920,
    category: 'ethnic-wear',
    vendorId: 'ven-1',
    vendorName: 'Varanasi Silk Weavers Guild',
    vendorRating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 18,
    inStock: true,
    status: 'approved',
    variants: {
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: [
        { name: 'Pastel Lavender', hex: '#c084fc' },
        { name: 'Sky Blue', hex: '#7dd3fc' },
        { name: 'Peach Coral', hex: '#fb923c' },
        { name: 'Mint Green', hex: '#a7f3d0' }
      ]
    },
    highlights: ['Handmade Lucknowi Chikankari', 'Inner Mulmul Lining Included', 'Flared 48-inch Length', 'Includes Matching Dupatta'],
    specifications: {
      'Fabric': 'Faux Georgette with Cotton Lining',
      'Sleeve Length': 'Three-Quarter Sleeves',
      'Neckline': 'Round Neck with Keyhole',
      'Craft': 'Hand Embroidered Chikankari'
    },
    isCodAvailable: true,
    isBestSeller: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-06-10'
  },
  {
    id: 'prod-4',
    name: 'Chanderi Silk Festive Lehenga Choli with Zari Border',
    shortDesc: 'Semi-stitched flared lehenga with woven bootis, unstitched blouse piece and heavy dupatta.',
    description: 'A regal royal blue & golden Chanderi silk lehenga ensemble engineered for festive opulence. Flares out with 4 meters of ghera and heavy micro-can-can underskirt for that dream Bollywood spin.',
    originalPrice: 7999,
    salePrice: 3899,
    discountPercent: 51,
    rating: 4.9,
    reviewCount: 430,
    category: 'ethnic-wear',
    vendorId: 'ven-1',
    vendorName: 'Varanasi Silk Weavers Guild',
    vendorRating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 12,
    inStock: true,
    status: 'approved',
    variants: {
      sizes: ['Semi-Stitched (Fits up to 42" Bust & Waist)'],
      colors: [
        { name: 'Royal Peacock Blue', hex: '#1d4ed8' },
        { name: 'Maroon Ruby', hex: '#881337' }
      ]
    },
    highlights: ['4-Meter Flared Ghera', 'Can-Can Underskirt Attached', 'Chanderi Zari Booti Work', 'Express 48h Dispatch'],
    specifications: {
      'Lehenga Fabric': 'Pure Chanderi Silk',
      'Blouse Fabric': 'Chanderi Silk with Zari (1 Meter)',
      'Dupatta': 'Net with Zari Lace Border (2.3 Meters)',
      'Type': 'Semi-Stitched'
    },
    isCodAvailable: true,
    isNewArrival: true,
    deliveryDays: 4,
    returnPolicyDays: 7,
    createdAt: '2026-07-01'
  },
  {
    id: 'prod-5',
    name: 'South Indian Kanjivaram Style Soft Silk Saree with Temple Border',
    shortDesc: 'Rich contrast pallu, traditional korvai weaving motifs and gold zari border.',
    description: 'Capturing the heritage of Tamil Nadu handlooms, this lustrous soft silk saree combines timeless temple motifs with contemporary drape softness.',
    originalPrice: 4299,
    salePrice: 1999,
    discountPercent: 53,
    rating: 4.7,
    reviewCount: 810,
    category: 'ethnic-wear',
    vendorId: 'ven-1',
    vendorName: 'Varanasi Silk Weavers Guild',
    vendorRating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 20,
    inStock: true,
    status: 'approved',
    variants: {
      colors: [
        { name: 'Kadi Green & Rani Pink', hex: '#15803d' },
        { name: 'Golden Yellow & Maroon', hex: '#eab308' }
      ]
    },
    highlights: ['Traditional Temple Border', 'Soft Flowing Drape', 'Contrasting Heavy Pallu', 'Unstitched Blouse Piece'],
    specifications: {
      'Fabric': 'Art Silk / Soft Silk',
      'Pattern': 'Temple Weave',
      'Length': '6.3 Meters with Blouse'
    },
    isCodAvailable: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-06-15'
  },

  // ELECTRONICS
  {
    id: 'prod-6',
    name: 'Zenith Pods Pro Hybrid ANC True Wireless Earbuds (48h Battery)',
    shortDesc: '35dB Active Noise Cancellation, Quad Mics with ENC, BassBoost Drivers & Fast Type-C Charge.',
    description: 'Engineered for Indian commuters and audiophiles. Experience crystal clear voice calls in busy traffic with Quad-mic AI ENC, explosive bass tuned for Bollywood & EDM beats, low-latency gaming mode (40ms), and 48 hours of playback.',
    originalPrice: 3999,
    salePrice: 1499,
    discountPercent: 63,
    rating: 4.5,
    reviewCount: 3820,
    category: 'electronics',
    vendorId: 'ven-2',
    vendorName: 'Zenith Audio & Smart Gadgets',
    vendorRating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 80,
    inStock: true,
    status: 'approved',
    variants: {
      colors: [
        { name: 'Matte Obsidian Black', hex: '#18181b' },
        { name: 'Pearl Ivory White', hex: '#f4f4f5' },
        { name: 'Midnight Deep Blue', hex: '#1e3a8a' }
      ]
    },
    highlights: ['35dB Hybrid ANC & Ambient Mode', '48 Hours Total Battery with Case', '10 Mins Charge = 5 Hours Play', 'IPX5 Sweat & Water Resistance', '1 Year Replacement Warranty'],
    specifications: {
      'Bluetooth Version': 'v5.3 with Fast Pair',
      'Driver Size': '13mm Titanium Composite Bass Drivers',
      'Battery Capacity': '500mAh Case + 45mAh Buds',
      'Charging Port': 'USB Type-C',
      'Warranty': '1 Year Brand Warranty'
    },
    isCodAvailable: true,
    isBestSeller: true,
    isDealOfTheDay: true,
    dealEndsInHours: 9,
    deliveryDays: 2,
    returnPolicyDays: 7,
    createdAt: '2026-06-20'
  },
  {
    id: 'prod-7',
    name: 'Zenith Pulse 2.01" HD Display Bluetooth Calling Smartwatch',
    shortDesc: 'Crisp 600 nits display, 120+ Sports Modes, Hindi/English UI, SpO2 & Heart Rate Tracker.',
    description: 'Stay connected on the go with single-chip Bluetooth calling, direct dial pad, notifications from WhatsApp, and 24x7 health tracking metrics. Features durable zinc-alloy metal dial and soft liquid silicone straps.',
    originalPrice: 4999,
    salePrice: 1699,
    discountPercent: 66,
    rating: 4.4,
    reviewCount: 2450,
    category: 'electronics',
    vendorId: 'ven-2',
    vendorName: 'Zenith Audio & Smart Gadgets',
    vendorRating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 55,
    inStock: true,
    status: 'approved',
    variants: {
      colors: [
        { name: 'Space Black Dial / Black Strap', hex: '#27272a' },
        { name: 'Silver Chrome / Ocean Blue Strap', hex: '#0284c7' },
        { name: 'Rose Gold Dial / Dusty Pink Strap', hex: '#f43f5e' }
      ]
    },
    highlights: ['2.01" Ultra Large 600 Nits Brightness Screen', 'Make & Answer Calls via Bluetooth', '10-Day Battery Life in Normal Mode', 'Customizable Indian Watch Faces'],
    specifications: {
      'Display': '2.01 Inch TFT HD (240x296 px)',
      'Sensors': 'Optical Heart Rate, SpO2, Sleep Monitor, Pedometer',
      'Water Resistance': 'IP68 Dust & Splash Proof',
      'Compatibility': 'Android 6.0+ and iOS 11.0+'
    },
    isCodAvailable: true,
    isTrending: true,
    deliveryDays: 2,
    returnPolicyDays: 7,
    createdAt: '2026-06-22'
  },
  {
    id: 'prod-8',
    name: 'Zenith Volt 20,000mAh 22.5W Super Fast Power Bank with PD & QC 3.0',
    shortDesc: 'Triple output ports, sleek aircraft-grade metal casing, LED percentage display.',
    description: 'Never run out of charge during travel or power outages. Fast charge iPhone up to 50% in 30 mins and compatible with all Samsung, OnePlus, Xiaomi, and Realme devices with 12-layer circuit protection.',
    originalPrice: 2499,
    salePrice: 1199,
    discountPercent: 52,
    rating: 4.6,
    reviewCount: 1720,
    category: 'electronics',
    vendorId: 'ven-2',
    vendorName: 'Zenith Audio & Smart Gadgets',
    vendorRating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 45,
    inStock: true,
    status: 'approved',
    variants: {
      colors: [
        { name: 'Carbon Black', hex: '#18181b' },
        { name: 'Glacier Blue', hex: '#38bdf8' }
      ]
    },
    highlights: ['20,000 mAh High-Density Li-Polymer Battery', '22.5W Two-Way Fast Charging', 'Charge 3 Devices Simultaneously', 'BIS Certified & Safe for Flight Travel'],
    specifications: {
      'Capacity': '20000 mAh / 74Wh',
      'Output Ports': '2 x USB-A (22.5W Max) + 1 x Type-C PD (20W Max)',
      'Input Ports': 'Type-C and Micro-USB',
      'Weight': '380 Grams'
    },
    isCodAvailable: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-06-25'
  },
  {
    id: 'prod-9',
    name: 'Zenith BoomBox 24W Portable Bluetooth Speaker with RGB Beat Lights',
    shortDesc: 'Dual bass radiators, IPX7 waterproof, TWS pairing and 16 hours non-stop party playback.',
    description: 'Fill the room with 360-degree punchy stereo sound. Perfect for home gatherings, picnics, and festive celebrations with synchronized dynamic LED party light modes.',
    originalPrice: 3299,
    salePrice: 1599,
    discountPercent: 51,
    rating: 4.5,
    reviewCount: 960,
    category: 'electronics',
    vendorId: 'ven-2',
    vendorName: 'Zenith Audio & Smart Gadgets',
    vendorRating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 30,
    inStock: true,
    status: 'approved',
    highlights: ['24W RMS Stereo Output', 'IPX7 Full Waterproofing', 'RGB Pulsing Beat Lights', 'Built-in FM Radio & MicroSD Slot'],
    specifications: {
      'Output': '24 Watts RMS',
      'Battery': '3600mAh (Up to 16h runtime)',
      'Connectivity': 'Bluetooth 5.3, AUX, TF Card, USB Pen-Drive',
      'Range': '15 Meters'
    },
    isCodAvailable: true,
    isNewArrival: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-07-08'
  },

  // HOME & KITCHEN
  {
    id: 'prod-10',
    name: 'Heritage Pure Brass Aarti Pooja Thali Set (11-Piece Handcrafted)',
    shortDesc: 'Includes Gayatri mantra engraved thali, diya, agarbatti stand, bell, panchamrut bowl & spoon.',
    description: 'Bring divine auspiciousness into your mandir with this 100% solid virgin brass pooja set. Hand-carved with traditional peacock engravings by Moradabad artisans with a long-lasting golden lacquer finish.',
    originalPrice: 2499,
    salePrice: 1299,
    discountPercent: 48,
    rating: 4.9,
    reviewCount: 1120,
    category: 'home-kitchen',
    vendorId: 'ven-3',
    vendorName: 'Shri Krishna Heritage Crafts',
    vendorRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 40,
    inStock: true,
    status: 'approved',
    highlights: ['100% Solid Brass Construction', '11 Essential Pooja Accessories Included', 'Tarnish-Resistant Lacquer Coat', 'Gift Box Packing Included'],
    specifications: {
      'Material': 'Pure Brass',
      'Thali Diameter': '10.5 Inches',
      'Total Weight': '750 Grams',
      'Origin': 'Moradabad, Uttar Pradesh'
    },
    isCodAvailable: true,
    isBestSeller: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-06-12'
  },
  {
    id: 'prod-11',
    name: 'Tri-Ply Heavy Duty Stainless Steel Kadai with Glass Lid (2.5L)',
    shortDesc: 'Even heat distribution without hot spots, riveted stay-cool handles, induction & gas friendly.',
    description: 'Engineered for healthy, low-oil Indian cooking. Tri-Ply technology sandwiches an aluminum core between food-grade SS304 inner steel and magnetic SS430 outer steel to eliminate burnt food spots while frying or making curries.',
    originalPrice: 2999,
    salePrice: 1499,
    discountPercent: 50,
    rating: 4.8,
    reviewCount: 790,
    category: 'home-kitchen',
    vendorId: 'ven-3',
    vendorName: 'Shri Krishna Heritage Crafts',
    vendorRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1584990347449-34b22c710db4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 25,
    inStock: true,
    status: 'approved',
    highlights: ['3-Layer Construction (SS 304 + Aluminum + SS 430)', '100% Toxin Free (No Teflon/Chemical Coating)', 'Induction & Gas Stove Compatible', '5-Year Warranty on Base'],
    specifications: {
      'Capacity': '2.5 Liters (Diameter: 24cm)',
      'Lid': 'Toughened Glass with Steam Vent',
      'Thickness': '2.5 mm Heavy Duty',
      'Dishwasher Safe': 'Yes'
    },
    isCodAvailable: true,
    isTrending: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-06-18'
  },
  {
    id: 'prod-12',
    name: 'Jaipuri Hand-Block Print 100% Cotton King Size Bedsheet with 2 Pillow Covers',
    shortDesc: '250 Thread count breathable pure cotton, traditional Sanganeri floral print, fast colors.',
    description: 'Infuse royal Rajasthani warmth into your bedroom. Block-printed with natural vegetable dyes on premium long-staple cotton that becomes softer with every wash.',
    originalPrice: 1999,
    salePrice: 799,
    discountPercent: 60,
    rating: 4.7,
    reviewCount: 1650,
    category: 'home-kitchen',
    vendorId: 'ven-3',
    vendorName: 'Shri Krishna Heritage Crafts',
    vendorRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 50,
    inStock: true,
    status: 'approved',
    variants: {
      colors: [
        { name: 'Indigo Blue & White Sanganeri', hex: '#1e40af' },
        { name: 'Mustard Gold & Maroon', hex: '#b45309' },
        { name: 'Sage Green Floral', hex: '#15803d' }
      ]
    },
    highlights: ['100% Super Combed Pure Cotton', 'King Size (108 x 108 inches / 9x9 ft)', 'Guaranteed Color Fastness', 'Includes 2 Matching Large Pillow Covers'],
    specifications: {
      'Thread Count': '250 TC',
      'Dimensions': 'Bedsheet: 274 x 274 cm, Pillow Covers: 46 x 69 cm',
      'Printing Method': 'Authentic Sanganer Hand Screen & Block Print',
      'Origin': 'Jaipur, Rajasthan'
    },
    isCodAvailable: true,
    isDealOfTheDay: true,
    dealEndsInHours: 5,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-06-28'
  },
  {
    id: 'prod-13',
    name: 'Handmade Khurja Ceramic Studio Coffee Mug Set (Pack of 6)',
    shortDesc: '350ml microwave & dishwasher safe artisan stoneware mugs with dual glaze finish.',
    description: 'Start your morning filter coffee or masala chai with earthy charm. Hand-thrown by master potters in Khurja with rustic two-tone matte glaze.',
    originalPrice: 1499,
    salePrice: 699,
    discountPercent: 53,
    rating: 4.6,
    reviewCount: 540,
    category: 'home-kitchen',
    vendorId: 'ven-3',
    vendorName: 'Shri Krishna Heritage Crafts',
    vendorRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 35,
    inStock: true,
    status: 'approved',
    highlights: ['100% Lead-Free & Food Safe', 'Microwave & Oven Safe', 'Comfortable Grip Handle', 'Pack of 6 Assorted Earthy Colors'],
    specifications: {
      'Material': 'High Fired Ceramic Stoneware',
      'Capacity': '350 ml each',
      'Weight': '300 Grams per mug'
    },
    isCodAvailable: true,
    deliveryDays: 4,
    returnPolicyDays: 7,
    createdAt: '2026-07-02'
  },

  // FOOTWEAR & ACCESSORIES
  {
    id: 'prod-14',
    name: 'Genuine Handcrafted Kolhapuri Chappals with Cushioned Footbed',
    shortDesc: 'Authentic vegetable-tanned buff leather with braided straps and anti-slip TPR sole.',
    description: 'Traditional Kolhapur craftsmanship upgraded with modern memory-foam cushioning for pain-free daily ethnic wear. Stitched with natural threads for maximum durability.',
    originalPrice: 1999,
    salePrice: 899,
    discountPercent: 55,
    rating: 4.6,
    reviewCount: 780,
    category: 'footwear-accessories',
    vendorId: 'ven-3',
    vendorName: 'Shri Krishna Heritage Crafts',
    vendorRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 28,
    inStock: true,
    status: 'approved',
    variants: {
      sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
      colors: [
        { name: 'Tan Brown Antique', hex: '#78350f' },
        { name: 'Deep Mahogany', hex: '#451a03' },
        { name: 'Natural Ochre', hex: '#b45309' }
      ]
    },
    highlights: ['100% Genuine Full-Grain Leather', 'Cushioned Footbed (No Bites)', 'Hand-Braided Straps', 'Anti-Slip Base Sole'],
    specifications: {
      'Upper Material': 'Buff Leather',
      'Sole Material': 'TPR Gripped Sole',
      'Origin': 'Kolhapur, Maharashtra'
    },
    isCodAvailable: true,
    isTrending: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-06-14'
  },
  {
    id: 'prod-15',
    name: 'Men’s RFID Protected Full Grain Hunter Leather Wallet with Coin Pocket',
    shortDesc: 'Slim bifold wallet with 8 card slots, hidden currency dividers and ID window.',
    description: 'Crafted from premium distress-finish pull-up leather that develops a gorgeous vintage patina over time. Embedded with military-grade RFID blocking mesh to prevent electronic skimming.',
    originalPrice: 1499,
    salePrice: 599,
    discountPercent: 60,
    rating: 4.8,
    reviewCount: 2190,
    category: 'footwear-accessories',
    vendorId: 'ven-3',
    vendorName: 'Shri Krishna Heritage Crafts',
    vendorRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 60,
    inStock: true,
    status: 'approved',
    variants: {
      colors: [
        { name: 'Vintage Hunter Brown', hex: '#713f12' },
        { name: 'Classic Black', hex: '#18181b' }
      ]
    },
    highlights: ['Genuine Oil-Pull-Up Leather', 'Certified RFID Card Shielding', 'Snug Compact Fit for Pockets', 'Comes in Luxury Wooden Gift Box'],
    specifications: {
      'Slots': '8 Card Slots, 2 Cash Compartments, 1 Coin Snap Pocket',
      'Dimensions': '11.5 x 9 x 1.8 cm',
      'Warranty': '1 Year Stitching Warranty'
    },
    isCodAvailable: true,
    isBestSeller: true,
    deliveryDays: 2,
    returnPolicyDays: 7,
    createdAt: '2026-06-19'
  },
  {
    id: 'prod-16',
    name: 'Polarized Aviator Sunglasses with UV400 Protection & Lightweight Alloy Frame',
    shortDesc: 'HD glare reduction for driving and outdoors, scratch-resistant polycarbonate lenses.',
    description: 'Classic iconic aviator silhouette tailored for Indian face contours with flexible spring hinges and skin-friendly silicone nose pads.',
    originalPrice: 1999,
    salePrice: 749,
    discountPercent: 62,
    rating: 4.5,
    reviewCount: 890,
    category: 'footwear-accessories',
    vendorId: 'ven-2',
    vendorName: 'Zenith Audio & Smart Gadgets',
    vendorRating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 40,
    inStock: true,
    status: 'approved',
    variants: {
      colors: [
        { name: 'Gunmetal Frame / Dark Grey Lens', hex: '#4b5563' },
        { name: 'Gold Frame / Gradient Green G15 Lens', hex: '#166534' }
      ]
    },
    highlights: ['100% UV400 & Polarized Glare Filter', 'Spring Hinge Comfort Fit', 'Includes Hard Shell Case & Microfiber Cloth'],
    specifications: {
      'Frame Material': 'Aviation Grade Magnesium-Aluminum Alloy',
      'Lens Width': '58 mm',
      'Bridge Width': '14 mm'
    },
    isCodAvailable: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-07-04'
  },

  // BEAUTY & AYURVEDIC
  {
    id: 'prod-17',
    name: 'Vedic Glow 100% Ayurvedic Kumkumadi Tailam Face Oil (30ml)',
    shortDesc: 'Infused with Kashmiri Saffron (Kesar), Sandalwood, Lotus & 26 Ayurvedic herbs for glowing skin.',
    description: 'An ancient Ayurvedic miracle formulation prescribed in the Charaka Samhita. Hand-concocted in small batches using pure goat milk and wild herbs to brighten dull complexion, reduce dark spots, and restore youthful elasticity.',
    originalPrice: 1999,
    salePrice: 999,
    discountPercent: 50,
    rating: 4.9,
    reviewCount: 3100,
    category: 'beauty-ayurvedic',
    vendorId: 'ven-4',
    vendorName: 'Vedic Glow Pure Botanicals',
    vendorRating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1608248597359-00f368f56ef4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 50,
    inStock: true,
    status: 'approved',
    highlights: ['Authentic Ayurvedic Formulation', 'No Mineral Oil, Silicones or Synthetic Fragrances', 'Visible Radiance in 14 Days', 'AYUSH Ministry Certified'],
    specifications: {
      'Key Ingredients': 'Pure Mogra Saffron, Red Sandalwood, Manjistha, Licorice, Cold Pressed Sesame Oil',
      'Skin Type': 'All Skin Types (Ideal for Dull/Dry skin)',
      'Volume': '30 ml Glass Dropper Bottle',
      'Expiry': '24 Months from Mfd'
    },
    isCodAvailable: true,
    isBestSeller: true,
    isDealOfTheDay: true,
    dealEndsInHours: 6,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-06-08'
  },
  {
    id: 'prod-18',
    name: 'Red Onion & Black Seed Hair Fall Control Oil with Bhringraj (200ml)',
    shortDesc: 'Cold-pressed bioactive oil with comb applicator, reduces hair thinning and strengthens roots.',
    description: 'Enriched with sulphur-rich red onion extract, kalonji oil, and 14 herbal oils to nourish hair follicles, prevent premature greying, and restore bouncy shine.',
    originalPrice: 899,
    salePrice: 399,
    discountPercent: 55,
    rating: 4.6,
    reviewCount: 1840,
    category: 'beauty-ayurvedic',
    vendorId: 'ven-4',
    vendorName: 'Vedic Glow Pure Botanicals',
    vendorRating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608248597359-00f368f56ef4?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 65,
    inStock: true,
    status: 'approved',
    highlights: ['Root Comb Applicator for Deep Delivery', 'Non-Sticky & Fast Absorbing', 'Cruelty-Free & 100% Vegan', 'Free from Parabens & Sulfates'],
    specifications: {
      'Volume': '200 ml',
      'Application': 'Apply 3 times weekly before bed or bath',
      'Target Concern': 'Hair Fall, Dandruff, Breakage'
    },
    isCodAvailable: true,
    isTrending: true,
    deliveryDays: 2,
    returnPolicyDays: 7,
    createdAt: '2026-06-24'
  },
  {
    id: 'prod-19',
    name: 'Pure Mysore Sandalwood & Turmeric Handmade Bath Soap Bars (Pack of 3 x 125g)',
    shortDesc: 'Natural grade-1 soap with 80% TFM and cold-pressed coconut oil for silky smooth skin.',
    description: 'Handmade using traditional cold process methods with real Mysore sandalwood oil and Kasturi Manjal turmeric to purify skin and prevent body odor naturally.',
    originalPrice: 699,
    salePrice: 349,
    discountPercent: 50,
    rating: 4.8,
    reviewCount: 1210,
    category: 'beauty-ayurvedic',
    vendorId: 'ven-4',
    vendorName: 'Vedic Glow Pure Botanicals',
    vendorRating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1607006311802-995b001a1c32?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608248597359-00f368f56ef4?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 45,
    inStock: true,
    status: 'approved',
    highlights: ['High TFM 80% Grade 1 Soap', 'Infused with Real Sandalwood Oil', 'Long Lasting Earthy Fragrance', 'Pack of 3 x 125g Bars'],
    specifications: {
      'Net Weight': '375 Grams (3 x 125g)',
      'Key Ingredients': 'Mysore Sandal Oil, Wild Turmeric, Extra Virgin Coconut Oil',
      'Chemicals': 'Zero Sulphates, Zero Animal Fat'
    },
    isCodAvailable: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-06-30'
  },

  // JEWELRY & ORNAMENTS
  {
    id: 'prod-20',
    name: 'Royal Kundan & Pearl Gold Plated Choker Necklace Set with Earrings & Maang Tikka',
    shortDesc: 'Handcrafted bridal wedding set with emerald green drops, adjustable dori, and matching jhumkis.',
    description: 'Exude Maharani grace at weddings and festivals. Intricately set with high-grade polki glass stones, lustrous faux pearls, and antique 22K gold micro-plating with Meenakari back-work.',
    originalPrice: 3999,
    salePrice: 1499,
    discountPercent: 62,
    rating: 4.8,
    reviewCount: 1530,
    category: 'jewelry',
    vendorId: 'ven-3',
    vendorName: 'Shri Krishna Heritage Crafts',
    vendorRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 22,
    inStock: true,
    status: 'approved',
    variants: {
      colors: [
        { name: 'Royal Emerald Green & Gold', hex: '#065f46' },
        { name: 'Ruby Red & Gold', hex: '#991b1b' },
        { name: 'Classic Pearl White & Gold', hex: '#fef08a' }
      ]
    },
    highlights: ['Complete 4-Piece Wedding Ensemble', 'High Quality Kundan Glass Stones', 'Hand Painted Meenakari Backing', 'Velvet Storage Box Included'],
    specifications: {
      'Base Metal': 'Brass with 22K Gold Micron Plating',
      'Closure': 'Adjustable Hand-Braided Silk Dori',
      'Earring Style': 'Post & Push Back with Pearl Drops',
      'Weight': '110 Grams'
    },
    isCodAvailable: true,
    isBestSeller: true,
    isTrending: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-06-11'
  },
  {
    id: 'prod-21',
    name: 'Antique Oxidized Silver Temple Peacock Jhumka Earrings with Ghungroo Drops',
    shortDesc: 'Traditional German silver tribal jhumkis with intricate peacock carvings and gentle chimes.',
    description: 'The quintessential Indian ethnic statement piece. Lightweight on earlobes yet dramatic in visual impact. Pairs effortlessly with cotton sarees, kurtis, and Indo-western outfits.',
    originalPrice: 1199,
    salePrice: 449,
    discountPercent: 62,
    rating: 4.7,
    reviewCount: 970,
    category: 'jewelry',
    vendorId: 'ven-3',
    vendorName: 'Shri Krishna Heritage Crafts',
    vendorRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 45,
    inStock: true,
    status: 'approved',
    highlights: ['Skin-Safe German Silver Alloy (Nickel Free)', 'Lightweight Comfort Fit', 'Traditional Carved Temple Motif', 'Ghungroo Tinkling Chimes'],
    specifications: {
      'Length': '7.5 cm (3 Inches)',
      'Weight': '32 Grams (Pair)',
      'Closure': 'Fish Hook / Push Back'
    },
    isCodAvailable: true,
    deliveryDays: 2,
    returnPolicyDays: 7,
    createdAt: '2026-06-27'
  },
  {
    id: 'prod-22',
    name: 'Handcrafted Meenakari Adjustable Floral Statement Ring',
    shortDesc: '22K Gold plated brass ring with vivid enamel artwork and center kundan stone.',
    description: 'Adorn your fingers with regal Jaipur enamel craftsmanship. Freely adjustable band fits any finger size comfortably.',
    originalPrice: 799,
    salePrice: 299,
    discountPercent: 62,
    rating: 4.6,
    reviewCount: 420,
    category: 'jewelry',
    vendorId: 'ven-3',
    vendorName: 'Shri Krishna Heritage Crafts',
    vendorRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 50,
    inStock: true,
    status: 'approved',
    highlights: ['Handmade Jaipuri Meenakari', 'Adjustable Size for All Fingers', 'Anti-Tarnish Polish', 'Great for Gifting'],
    specifications: {
      'Base Metal': 'Brass with Gold Plating',
      'Diameter': '3.2 cm Motif',
      'Ring Size': 'Universal Adjustable'
    },
    isCodAvailable: true,
    isNewArrival: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-07-06'
  },

  // SPICES & DRY FRUITS
  {
    id: 'prod-23',
    name: 'Original Kashmiri Mongra Saffron (Kesar) 100% Pure A++ Grade (2g Box)',
    shortDesc: 'Deep crimson all-red stigma filaments from Pampore, Kashmir with intense aroma & color release.',
    description: 'Certified GI-Tagged Kashmiri Mongra Saffron harvested from Pampore valley. Delivers intoxicating floral aroma, rich golden-yellow hue, and potent antioxidant benefits for pregnancy milk, biryanis, sweets, and face packs.',
    originalPrice: 1299,
    salePrice: 699,
    discountPercent: 46,
    rating: 4.9,
    reviewCount: 2890,
    category: 'spices-dryfruits',
    vendorId: 'ven-5',
    vendorName: 'Royal Kashmir Dry Fruits & Spices',
    vendorRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 40,
    inStock: true,
    status: 'approved',
    highlights: ['GI Tagged Authentic Kashmiri Mongra', '100% Pure Long Crimson Filaments', 'No Added Coloring or Preservatives', 'Air-Tight Hermetic Acrylic Box'],
    specifications: {
      'Net Quantity': '2 Grams',
      'Grade': 'Grade 1 Pure All-Red Stigma',
      'Harvest Location': 'Pampore, Kashmir, India',
      'Shelf Life': '36 Months'
    },
    isCodAvailable: true,
    isBestSeller: true,
    isDealOfTheDay: true,
    dealEndsInHours: 4,
    deliveryDays: 2,
    returnPolicyDays: 7,
    createdAt: '2026-06-03'
  },
  {
    id: 'prod-24',
    name: 'Royal Kashmiri Snow White Walnut Kernels (Akhrot Giri) 500g Vacuum Packed',
    shortDesc: 'Freshly cracked extra-crispy, zero-bitterness walnut halves loaded with Omega-3 fatty acids.',
    description: 'Direct from organic walnut orchards of Kashmir. Natural ivory halves with rich buttery taste, ideal for brain health, heart nutrition, and daily morning snacking.',
    originalPrice: 999,
    salePrice: 549,
    discountPercent: 45,
    rating: 4.8,
    reviewCount: 1420,
    category: 'spices-dryfruits',
    vendorId: 'ven-5',
    vendorName: 'Royal Kashmir Dry Fruits & Spices',
    vendorRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 35,
    inStock: true,
    status: 'approved',
    highlights: ['100% Whole Halves (No Small Broken Pieces)', 'Zero Bitterness Guarantee', 'Vacuum Sealed for Peak Freshness', 'Rich in Plant-Based Omega-3'],
    specifications: {
      'Weight': '500 Grams',
      'Processing': 'Cold-Cracked & Nitrogen Flushed',
      'Origin': 'Srinagar, Jammu & Kashmir'
    },
    isCodAvailable: true,
    isTrending: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-06-16'
  },
  {
    id: 'prod-25',
    name: 'Raw Himalayan Wild Forest Multiflora Honey (500g Glass Jar)',
    shortDesc: 'Unprocessed, unpasteurized, cold-extracted honey with natural pollen, enzymes & antioxidants.',
    description: 'Sourced from high-altitude wild beehives in the Shivalik Himalayas. Free from corn syrup, sugar adulteration, and heating to preserve vital enzymes and immunity boosters.',
    originalPrice: 699,
    salePrice: 389,
    discountPercent: 44,
    rating: 4.7,
    reviewCount: 880,
    category: 'spices-dryfruits',
    vendorId: 'ven-5',
    vendorName: 'Royal Kashmir Dry Fruits & Spices',
    vendorRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 30,
    inStock: true,
    status: 'approved',
    highlights: ['100% NMR Tested & Pure Certified', 'Unfiltered Raw Wild Honey', 'Natural Immunity Booster', 'Reusable Glass Jar'],
    specifications: {
      'Net Weight': '500 Grams',
      'Source': 'Himalayan Forest Flora',
      'Storage': 'Store at Room Temp (Natural crystallization is proof of purity)'
    },
    isCodAvailable: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-06-29'
  },
  {
    id: 'prod-26',
    name: 'Organic Coorg Whole Green Cardamom (Elaichi) Bold 8mm Pods (200g)',
    shortDesc: 'Handpicked extra large green pods with maximum essential oils, heavenly fragrance.',
    description: 'Plucked from shade-grown estates in the Western Ghats of Coorg. Adds unmatched royal aroma to chai, kheer, biryanis, and curries.',
    originalPrice: 799,
    salePrice: 429,
    discountPercent: 46,
    rating: 4.8,
    reviewCount: 650,
    category: 'spices-dryfruits',
    vendorId: 'ven-5',
    vendorName: 'Royal Kashmir Dry Fruits & Spices',
    vendorRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 45,
    inStock: true,
    status: 'approved',
    highlights: ['8mm Extra Jumbo Bold Pods', 'High Essential Oil Content', 'Sun Dried Without Chemicals', 'Zip-Lock Aroma Pack'],
    specifications: {
      'Net Weight': '200 Grams',
      'Grade': 'Coorg Super Bold 8mm',
      'Origin': 'Coorg, Karnataka'
    },
    isCodAvailable: true,
    isNewArrival: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-07-10'
  },

  // ADDITIONAL ETHNIC & LIFESTYLE PRODUCTS
  {
    id: 'prod-27',
    name: 'Pure Cotton Handloom Bandhani Dupatta with Gota Patti Border (2.5m)',
    shortDesc: 'Vibrant Rajasthani tie & dye chunri with mirror accents and heavy golden tassels.',
    description: 'Hand-tied by women artisans in Jamnagar and Jaipur. Drapes gorgeously over plain kurtas, white suits, and festive lehengas.',
    originalPrice: 1299,
    salePrice: 499,
    discountPercent: 61,
    rating: 4.7,
    reviewCount: 520,
    category: 'ethnic-wear',
    vendorId: 'ven-1',
    vendorName: 'Varanasi Silk Weavers Guild',
    vendorRating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 30,
    inStock: true,
    status: 'approved',
    variants: {
      colors: [
        { name: 'Red & Yellow Festive Bandhej', hex: '#dc2626' },
        { name: 'Rani Pink & Orange', hex: '#ec4899' },
        { name: 'Royal Emerald Green', hex: '#059669' }
      ]
    },
    highlights: ['Traditional Handmade Bandhej', 'Gota Lace Borders with Latkans', 'Length 2.5 Meters Full Width', 'Fast Colors'],
    specifications: {
      'Fabric': 'Mulmul Pure Cotton',
      'Length': '2.5 Meters',
      'Wash Care': 'Dry Clean or Gentle Cold Wash'
    },
    isCodAvailable: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-07-12'
  },
  {
    id: 'prod-28',
    name: 'Zenith QuickCharge 65W GaN Multi-Port Charger (2x Type-C + 1x USB-A)',
    shortDesc: 'Ultra-compact GaN fast charger for MacBooks, Laptops, iPhones, and Android smartphones.',
    description: 'Cutting-edge Gallium Nitride (GaN) technology makes this 65W charger 50% smaller than standard laptop bricks with superior heat dissipation.',
    originalPrice: 2999,
    salePrice: 1399,
    discountPercent: 53,
    rating: 4.7,
    reviewCount: 910,
    category: 'electronics',
    vendorId: 'ven-2',
    vendorName: 'Zenith Audio & Smart Gadgets',
    vendorRating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 35,
    inStock: true,
    status: 'approved',
    highlights: ['65W Max Power Delivery', 'GaN Fast Cool Semiconductor', 'Charges Laptops + Phones Together', 'Indian 2-Pin Plug'],
    specifications: {
      'Power': '65W Max',
      'Protocols': 'PD 3.0, QC 4.0, PPS, AFC, FCP',
      'Warranty': '1 Year'
    },
    isCodAvailable: true,
    isTrending: true,
    deliveryDays: 2,
    returnPolicyDays: 7,
    createdAt: '2026-07-14'
  },
  {
    id: 'prod-29',
    name: 'Cast Iron Pre-Seasoned Traditional Roti & Dosa Tawa (10.5 Inch)',
    shortDesc: 'Naturally non-stick enriched with dietary iron, smooth surface, heavy induction base.',
    description: 'Cook restaurant-crispy dosas, fluffy phulkas, and parathas without toxic teflon coatings. Pre-seasoned with 100% cold-pressed gingelly oil.',
    originalPrice: 1899,
    salePrice: 899,
    discountPercent: 52,
    rating: 4.7,
    reviewCount: 1340,
    category: 'home-kitchen',
    vendorId: 'ven-3',
    vendorName: 'Shri Krishna Heritage Crafts',
    vendorRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1584990347449-34b22c710db4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 40,
    inStock: true,
    status: 'approved',
    highlights: ['100% Pure Virgin Cast Iron', 'Pre-Seasoned & Ready to Use', 'Adds Natural Iron Nutrition to Food', 'Lifetime Durability'],
    specifications: {
      'Diameter': '26.5 cm (10.5 Inches)',
      'Weight': '2.2 Kg Heavy Base',
      'Handle': 'Ergonomic Stay-Cool Silicone Grip Included'
    },
    isCodAvailable: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-07-15'
  },
  {
    id: 'prod-30',
    name: 'California Jumbo Crunchy Whole Almonds (Badam) 1Kg Value Pack',
    shortDesc: '100% natural, supreme size, vacuum sealed for daily breakfast and energy.',
    description: 'Plump, crispy, naturally sweet California supreme almonds. Free from chemical polishing, pesticide residues, and artificial preservatives.',
    originalPrice: 1499,
    salePrice: 799,
    discountPercent: 46,
    rating: 4.8,
    reviewCount: 3450,
    category: 'spices-dryfruits',
    vendorId: 'ven-5',
    vendorName: 'Royal Kashmir Dry Fruits & Spices',
    vendorRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 55,
    inStock: true,
    status: 'approved',
    highlights: ['100% Supreme Jumbo Size', 'Zero Oil Bleaching', 'High Protein & Vitamin E', 'Value Saver 1Kg Pack'],
    specifications: {
      'Net Weight': '1000 Grams (1 Kg)',
      'Origin': 'California / Packed in Kashmir',
      'Packaging': 'Resealable Zip Pouch'
    },
    isCodAvailable: true,
    isBestSeller: true,
    deliveryDays: 2,
    returnPolicyDays: 7,
    createdAt: '2026-06-04'
  },
  {
    id: 'prod-31',
    name: 'Handmade Silk Embroidered Potli Bag with Pearl Handle for Weddings',
    shortDesc: 'Traditional bridal clutch with heavy zardozi sequin work, golden latkans, and drawstrings.',
    description: 'The perfect festive accessory to complement sarees, lehengas, and anarkalis. Spacious enough to hold smartphones, makeup essentials, and keys with high quality satin lining.',
    originalPrice: 999,
    salePrice: 399,
    discountPercent: 60,
    rating: 4.7,
    reviewCount: 480,
    category: 'footwear-accessories',
    vendorId: 'ven-3',
    vendorName: 'Shri Krishna Heritage Crafts',
    vendorRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 30,
    inStock: true,
    status: 'approved',
    variants: {
      colors: [
        { name: 'Bridal Crimson Red', hex: '#b91c1c' },
        { name: 'Golden Champagne', hex: '#fef08a' },
        { name: 'Emerald Green', hex: '#047857' }
      ]
    },
    highlights: ['Handmade Zardozi Embroidery', 'Pearl Beaded Sturdy Handle', 'Drawstring Closure with Tassels', 'Spacious Satin Interior'],
    specifications: {
      'Material': 'Raw Silk with Satin Lining',
      'Dimensions': '22 x 20 cm',
      'Occasion': 'Wedding, Sangeet, Festive Gifting'
    },
    isCodAvailable: true,
    isNewArrival: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-07-16'
  },
  {
    id: 'prod-32',
    name: 'Pure Brass Akhand Diya with Heat-Resistant Borosilicate Glass Chimney',
    shortDesc: 'Wind-resistant uninterrupted pooja lamp, burns for 24+ hours safely inside mandir.',
    description: 'Designed for safe, soot-free, uninterrupted deepam lighting during Navratri, Diwali, and daily morning prayers. The borosilicate glass chimney prevents breeze from extinguishing the flame.',
    originalPrice: 1299,
    salePrice: 599,
    discountPercent: 53,
    rating: 4.8,
    reviewCount: 940,
    category: 'home-kitchen',
    vendorId: 'ven-3',
    vendorName: 'Shri Krishna Heritage Crafts',
    vendorRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 45,
    inStock: true,
    status: 'approved',
    highlights: ['Pure Solid Brass Base & Cap', 'Thermal Shock Borosilicate Glass (Does not crack)', 'Burns continuously for 24 hours', 'Easy to Clean & Refill Oil'],
    specifications: {
      'Height': '14 cm (5.5 Inches)',
      'Weight': '350 Grams',
      'Oil Capacity': '80 ml'
    },
    isCodAvailable: true,
    isTrending: true,
    deliveryDays: 3,
    returnPolicyDays: 7,
    createdAt: '2026-07-18'
  }
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'ban-1',
    title: 'Maha Bachat Dhamaka',
    subtitle: 'Flat 50% - 70% OFF on Authentic Handlooms, Silk Sarees & Ethnic Ensembles',
    tag: 'FESTIVE MEGA SALE',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&auto=format&fit=crop&q=80',
    categorySlug: 'ethnic-wear',
    bgGradient: 'from-amber-600 via-orange-600 to-red-700',
    buttonText: 'Shop Ethnic Deals',
    active: true
  },
  {
    id: 'ban-2',
    title: 'Smart Tech & Audio Fest',
    subtitle: 'True Wireless ANC Earbuds, Smartwatches & Fast GaN Chargers from ₹499',
    tag: 'TOP GADGETS',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
    categorySlug: 'electronics',
    bgGradient: 'from-blue-700 via-indigo-700 to-violet-800',
    buttonText: 'Explore Electronics',
    active: true
  },
  {
    id: 'ban-3',
    title: 'Pure Kashmiri Radiance',
    subtitle: 'GI-Tagged Saffron, Snow Walnuts & Ayurvedic Botanicals Direct From Orchards',
    tag: '100% ORGANIC & PURE',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&auto=format&fit=crop&q=80',
    categorySlug: 'spices-dryfruits',
    bgGradient: 'from-emerald-700 via-teal-700 to-cyan-800',
    buttonText: 'Shop Spices & Dry Fruits',
    active: true
  }
];

export const INITIAL_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    userName: 'Pooja Venkatesh',
    userCity: 'Bengaluru',
    rating: 5,
    title: 'Mind blowing quality! Genuine Banarasi silk',
    comment: 'I was hesitant ordering silk saree online, but this exceeded all expectations! The golden zari weave is so rich and the red color looked stunning at my sister’s wedding. Truly value for ₹2,499. Received delivery in 2 days.',
    date: '2026-07-28',
    verifiedPurchase: true,
    helpfulCount: 42
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    userName: 'Sunita Sharma',
    userCity: 'Lucknow',
    rating: 5,
    title: 'Silk Mark certified, very soft drape',
    comment: 'The fabric is very soft and not stiff at all. Master weavers did an amazing job. Will buy again from this vendor!',
    date: '2026-07-15',
    verifiedPurchase: true,
    helpfulCount: 19
  },
  {
    id: 'rev-3',
    productId: 'prod-6',
    userName: 'Rohan Deshmukh',
    userCity: 'Pune',
    rating: 5,
    title: 'Bass is unbelievable and ANC works in local train!',
    comment: 'Using this daily for Mumbai/Pune travel. The 35dB ANC cuts out engine humming nicely. Mic quality on office calls is crisp. Fast Type-C charge lasts almost a week.',
    date: '2026-08-02',
    verifiedPurchase: true,
    helpfulCount: 88
  },
  {
    id: 'rev-4',
    productId: 'prod-17',
    userName: 'Dr. Ananya Iyer',
    userCity: 'Chennai',
    rating: 5,
    title: 'Real saffron aroma and authentic glow',
    comment: 'You can smell real Kashmiri kesar and sandalwood. I put 3 drops every night and my post-acne blemishes have visibly faded in 3 weeks. 10/10 recommend!',
    date: '2026-08-05',
    verifiedPurchase: true,
    helpfulCount: 34
  },
  {
    id: 'rev-5',
    productId: 'prod-10',
    userName: 'Deepak Agrawal',
    userCity: 'Indore',
    rating: 5,
    title: 'Heavy solid brass, looks royal in mandir',
    comment: 'The engraving of Gayatri mantra on the brass plate is crisp and elegant. The diya and bell feel heavy and authentic. Arrived in a safe velvet gift box.',
    date: '2026-08-01',
    verifiedPurchase: true,
    helpfulCount: 27
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'IB-2026-9142',
    date: '2026-08-10',
    customerId: 'cust-demo-1',
    customerName: 'Aarav Patel',
    customerMobile: '9876543210',
    shippingAddress: {
      name: 'Aarav Patel',
      mobile: '9876543210',
      street: 'Flat 402, Shanti Heights, 12th Main Road, Indiranagar',
      landmark: 'Near BDA Complex',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      type: 'Home'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        price: 2499,
        selectedColor: 'Royal Crimson Red',
        vendorId: 'ven-1'
      },
      {
        product: INITIAL_PRODUCTS[5],
        quantity: 1,
        price: 1499,
        selectedColor: 'Matte Obsidian Black',
        vendorId: 'ven-2'
      }
    ],
    subtotal: 3998,
    discount: 100,
    couponCode: 'WELCOME100',
    deliveryFee: 0,
    totalAmount: 3898,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    orderStatus: 'Shipped',
    vendorIds: ['ven-1', 'ven-2'],
    trackingTimeline: [
      { status: 'Order Placed', timestamp: '10 Aug 2026, 11:30 AM', completed: true },
      { status: 'Processing & Packed', timestamp: '11 Aug 2026, 09:15 AM', completed: true },
      { status: 'Shipped via Express Logistics', timestamp: '12 Aug 2026, 04:45 PM', completed: true, current: true, note: 'Package in transit from Hub to Bengaluru Delivery Center' },
      { status: 'Out for Delivery', timestamp: 'Estimated 15 Aug 2026', completed: false },
      { status: 'Delivered', timestamp: 'Estimated 15 Aug 2026', completed: false }
    ]
  },
  {
    id: 'IB-2026-8821',
    date: '2026-08-08',
    customerId: 'cust-demo-1',
    customerName: 'Aarav Patel',
    customerMobile: '9876543210',
    shippingAddress: {
      name: 'Aarav Patel',
      mobile: '9876543210',
      street: 'Flat 402, Shanti Heights, 12th Main Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      type: 'Home'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[16], // Kumkumadi
        quantity: 1,
        price: 999,
        vendorId: 'ven-4'
      }
    ],
    subtotal: 999,
    discount: 0,
    deliveryFee: 0,
    totalAmount: 999,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'Delivered',
    vendorIds: ['ven-4'],
    trackingTimeline: [
      { status: 'Order Placed', timestamp: '08 Aug 2026, 02:10 PM', completed: true },
      { status: 'Processing & Packed', timestamp: '08 Aug 2026, 05:30 PM', completed: true },
      { status: 'Shipped', timestamp: '09 Aug 2026, 10:00 AM', completed: true },
      { status: 'Out for Delivery', timestamp: '11 Aug 2026, 08:30 AM', completed: true },
      { status: 'Delivered', timestamp: '11 Aug 2026, 01:20 PM', completed: true, current: true, note: 'Delivered to Aarav Patel with OTP verification' }
    ]
  }
];
