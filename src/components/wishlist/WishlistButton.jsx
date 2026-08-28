// src/components/wishlist/WishlistButton.jsx
// ============================================
// WISHLIST BUTTON - WITH TOAST NOTIFICATIONS
// ============================================

import { Heart } from 'lucide-react';
import { useWishlist } from '../../contexts/WishlistContext';

export default function WishlistButton({ product, className = '' }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-1.5 rounded-full transition-all duration-200 ${
        isWishlisted
          ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
          : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-pink-500'
      } ${className}`}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={`w-4 h-4 transition-transform duration-200 ${
          isWishlisted ? 'fill-current scale-110' : 'scale-100'
        }`}
      />
    </button>
  );
}