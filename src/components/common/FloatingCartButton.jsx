// src/components/common/FloatingCartButton.jsx
// ============================================
// FLOATING CART BUTTON
// ============================================
// This component creates a floating cart icon that
// stays fixed in the bottom-left corner of the screen.
// It's visible on all screen sizes and shows the
// current cart item count.

import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

export default function FloatingCartButton() {
  const { totalItems } = useCart();

  return (
    <Link
      to="/cart"
      className="fixed bottom-6 left-6 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200 hover:scale-110 active:scale-95"
      aria-label="Open cart"
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
          {totalItems}
        </span>
      )}
    </Link>
  );
}