import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { CategoryRibbon } from './components/common/CategoryRibbon';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { HomePage } from './components/customer/HomePage';
import { ProductListingPage } from './components/customer/ProductListingPage';
import { ProductDetailPage } from './components/customer/ProductDetailPage';
import { CartPage } from './components/customer/CartPage';
import { CheckoutPage } from './components/customer/CheckoutPage';
import { OrderConfirmationPage } from './components/customer/OrderConfirmationPage';
import { CustomerOrdersPage } from './components/customer/CustomerOrdersPage';
import { WishlistPage } from './components/customer/WishlistPage';
import { VendorDashboard } from './components/vendor/VendorDashboard';
import { VendorRegistrationModal } from './components/vendor/VendorRegistrationModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Product, Order } from './types';

const MainContent: React.FC = () => {
  const { currentRole, switchRole, setSelectedCategoryFilter } = useApp();

  // Navigation State
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [directCheckoutProduct, setDirectCheckoutProduct] = useState<Product | undefined>(undefined);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [initialFilter, setInitialFilter] = useState<string | undefined>(undefined);

  // Vendor registration modal state
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);

  // Navigation handler
  const handleNavigate = (view: string, params?: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (view === 'vendor-register') {
      setIsVendorModalOpen(true);
      return;
    }

    if (view === 'vendor-dashboard') {
      switchRole('vendor');
      setCurrentView('vendor-dashboard');
      return;
    }

    if (view === 'admin-dashboard') {
      switchRole('admin');
      setCurrentView('admin-dashboard');
      return;
    }

    if (view === 'checkout-direct') {
      setDirectCheckoutProduct(params?.product);
      setCurrentView('checkout');
      return;
    }

    if (view === 'order-confirmation' && params?.order) {
      setConfirmedOrder(params.order);
      setCurrentView('order-confirmation');
      return;
    }

    if (view === 'products') {
      if (params?.category) {
        setSelectedCategoryFilter(params.category);
      }
      setInitialFilter(params?.filter);
    }

    setDirectCheckoutProduct(undefined);
    setCurrentView(view);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans text-stone-900 antialiased selection:bg-orange-500 selection:text-white">
      
      {/* 1. Global Header */}
      <Header
        onNavigate={handleNavigate}
        onOpenVendorModal={() => setIsVendorModalOpen(true)}
      />

      {/* 2. Category Ribbon (Shown on customer store pages) */}
      {(currentView === 'home' || currentView === 'products' || currentView === 'product-detail') && currentRole === 'customer' && (
        <CategoryRibbon onSelectCategory={(catSlug) => {
          setSelectedCategoryFilter(catSlug);
          handleNavigate('products', { category: catSlug });
        }} />
      )}

      {/* 3. Main Dynamic View Container */}
      <main className="flex-1">
        
        {/* VENDOR DASHBOARD */}
        {currentRole === 'vendor' && currentView === 'vendor-dashboard' && (
          <VendorDashboard
            onNavigate={handleNavigate}
            onViewProduct={handleViewProduct}
          />
        )}

        {/* ADMIN DASHBOARD */}
        {currentRole === 'admin' && currentView === 'admin-dashboard' && (
          <AdminDashboard
            onNavigate={handleNavigate}
            onViewProduct={handleViewProduct}
          />
        )}

        {/* CUSTOMER VIEWS */}
        {(currentRole === 'customer' || (currentView !== 'vendor-dashboard' && currentView !== 'admin-dashboard')) && (
          <>
            {currentView === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onViewProduct={handleViewProduct}
              />
            )}

            {currentView === 'products' && (
              <ProductListingPage
                onViewProduct={handleViewProduct}
                onNavigate={handleNavigate}
                initialFilter={initialFilter}
              />
            )}

            {currentView === 'product-detail' && selectedProduct && (
              <ProductDetailPage
                product={selectedProduct}
                onNavigate={handleNavigate}
                onViewProduct={handleViewProduct}
              />
            )}

            {currentView === 'cart' && (
              <CartPage
                onNavigate={handleNavigate}
                onViewProduct={handleViewProduct}
              />
            )}

            {currentView === 'checkout' && (
              <CheckoutPage
                onNavigate={handleNavigate}
                directBuyProduct={directCheckoutProduct}
              />
            )}

            {currentView === 'order-confirmation' && confirmedOrder && (
              <OrderConfirmationPage
                order={confirmedOrder}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'customer-orders' && (
              <CustomerOrdersPage
                onNavigate={handleNavigate}
                onViewProduct={handleViewProduct}
              />
            )}

            {currentView === 'wishlist' && (
              <WishlistPage
                onNavigate={handleNavigate}
                onViewProduct={handleViewProduct}
              />
            )}
          </>
        )}

      </main>

      {/* 4. Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 5. Floating Toast Notifications */}
      <ToastContainer />

      {/* 6. Vendor Registration / Demo Switch Modal */}
      <VendorRegistrationModal
        isOpen={isVendorModalOpen}
        onClose={() => setIsVendorModalOpen(false)}
        onSuccess={() => {
          setIsVendorModalOpen(false);
          setCurrentView('vendor-dashboard');
        }}
      />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
