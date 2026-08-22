// src/components/wishlist/WishlistButton.jsx
import { Heart } from 'lucide-react';
import { useWishlist } from '../../contexts/WishlistContext';

export default function WishlistButton({ product, className = '' }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent triggering parent clicks
        toggleWishlist(product);
      }}
      className={`p-2 rounded-full transition-all duration-200 ${
        isWishlisted
          ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
          : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-pink-500'
      } ${className}`}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={`w-5 h-5 transition-transform duration-200 ${
          isWishlisted ? 'fill-current scale-110' : 'scale-100'
        }`}
      />
    </button>
  );
}