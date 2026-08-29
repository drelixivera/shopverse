// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmation';
import WishlistPage from './pages/WishlistPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <NotificationProvider>
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                      padding: '16px',
                      borderRadius: '8px',
                    },
                    success: {
                      duration: 3000,
                      iconTheme: {
                        primary: '#4ade80',
                        secondary: '#fff',
                      },
                    },
                    error: {
                      duration: 4000,
                      iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                      },
                    },
                  }}
                />
                <Layout>
                  <Routes>
                    {/* ===== PUBLIC ROUTES ===== */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    
                    {/* ✅ Confirmation is PUBLIC */}
                    <Route path="/confirmation" element={<OrderConfirmation />} />

                    {/* ===== PROTECTED ROUTES ===== */}
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/cart" element={
                      <ProtectedRoute>
                        <CartPage />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/checkout" element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/wishlist" element={
                      <ProtectedRoute>
                        <WishlistPage />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/orders" element={
                      <ProtectedRoute>
                        <OrdersPage />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/order/:orderId" element={
                      <ProtectedRoute>
                        <OrderDetailPage />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </Layout>
              </NotificationProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;