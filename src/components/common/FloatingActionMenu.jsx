// src/components/common/FloatingActionMenu.jsx
// ============================================
// FLOATING ACTION MENU (FAB) - WITH HAMBURGER ICON
// ============================================

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, X, Menu } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../contexts/AuthContext';

export default function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuth();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div ref={menuRef} className="fixed bottom-6 left-6 z-50">
      
      {/* ===== MENU ITEMS (Appear when open) ===== */}
      <div
        className={`
          flex flex-col items-center gap-3 mb-3 transition-all duration-300 ease-out
          ${isOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
      >
        {/* Profile Button */}
        <Link
          to={isAuthenticated ? '/profile' : '/login'}
          onClick={closeMenu}
          className="relative group bg-white text-gray-700 p-3.5 rounded-full shadow-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 hover:scale-110"
          aria-label="Profile"
        >
          <User className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            {isAuthenticated ? user?.name?.split(' ')[0] || 'Profile' : 'Login'}
          </span>
        </Link>

        {/* Wishlist Button */}
        <Link
          to="/wishlist"
          onClick={closeMenu}
          className="relative group bg-white text-gray-700 p-3.5 rounded-full shadow-lg hover:bg-pink-50 hover:text-pink-600 transition-all duration-200 hover:scale-110"
          aria-label="Wishlist"
        >
          <Heart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Wishlist
          </span>
        </Link>

        {/* Cart Button */}
        <Link
          to="/cart"
          onClick={closeMenu}
          className="relative group bg-white text-gray-700 p-3.5 rounded-full shadow-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 hover:scale-110"
          aria-label="Cart"
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Cart
          </span>
        </Link>
      </div>

      {/* ===== MAIN FAB BUTTON ===== */}
      <button
        onClick={toggleMenu}
        className={`
          w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300
          ${isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-indigo-600 hover:bg-indigo-700'}
          text-white hover:scale-105 active:scale-95
        `}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}