// src/components/layout/Navbar.jsx
// ============================================
// NAVBAR - WITH NOTIFICATION PANEL AND REAL UNREAD COUNT
// ============================================

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Heart, User, LogOut, X, Bell } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import NotificationPanel from '../common/NotificationPanel';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  // Trigger bounce animation when cart count changes
  useEffect(() => {
    if (totalItems > 0) {
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* ===== MOBILE: Logo + Hamburger (Left side) ===== */}
          <div className="flex items-center gap-2 md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
            
            <Link 
              to="/" 
              className="text-2xl font-bold text-indigo-600" 
              onClick={closeMenu}
            >
              ShopVerse
            </Link>
          </div>

          {/* ===== DESKTOP LOGO ===== */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-indigo-600 hidden md:block" 
            onClick={closeMenu}
          >
            ShopVerse
          </Link>

          {/* ===== DESKTOP NAVIGATION ===== */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-indigo-600 transition">
              Home
            </Link>
            
            <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Search className="w-5 h-5" />
            </button>
            
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className={`
                  absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center
                  ${isBouncing ? 'animate-bounce' : ''}
                `}>
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Notification Button - Desktop */}
            <button 
              onClick={toggleNotifications}
              className="p-2 hover:bg-gray-100 rounded-full transition relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-4 ml-2">
                <Link 
                  to="/profile"
                  className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden lg:inline">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>

          {/* ===== MOBILE: Notification Icon (Right side) ===== */}
          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={toggleNotifications}
              className="p-2 hover:bg-gray-100 rounded-full transition relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ===== MOBILE MENU ===== */}
        <div 
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="flex flex-col space-y-3 pb-4 border-t border-gray-200 pt-4">
            <Link 
              to="/" 
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <span className="text-gray-700">Home</span>
            </Link>

            <Link 
              to="/wishlist" 
              onClick={closeMenu}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <span className="text-gray-700">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link 
              to="/cart" 
              onClick={closeMenu}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <span className="text-gray-700">Cart</span>
              {totalItems > 0 && (
                <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <span className="text-gray-700">Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition text-left"
                >
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                onClick={closeMenu}
                className="flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ===== NOTIFICATION PANEL ===== */}
      <NotificationPanel 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)} 
      />
    </nav>
  );
}