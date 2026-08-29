// src/components/product/ProductCard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingCart, Star } from 'lucide-react';
import WishlistButton from '../wishlist/WishlistButton';
import ProductImage from '../common/ProductImage';
import AnimatedPrice from '../common/AnimatedPrice';
import toast from 'react-hot-toast';

const highlightText = (text, searchTerm) => {
  if (!searchTerm || !text) return text;
  const term = searchTerm.toLowerCase().trim();
  if (!term) return text;
  const parts = text.split(new RegExp(`(${term})`, 'gi'));
  return parts.map((part, i) => 
    part.toLowerCase() === term 
      ? <span key={i} className="bg-yellow-200 px-0.5 rounded">{part}</span> 
      : part
  );
};

export default function ProductCard({ product, searchTerm = '' }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // ✅ Check if user is logged in
    if (!isAuthenticated) {
      toast.error('Please log in to add items to your cart', {
        icon: '🔒',
      });
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    
    setIsAdding(true);
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
    });
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative cursor-pointer group"
    >
      <div className="absolute top-1.5 right-1.5 z-10" onClick={handleWishlistClick}>
        <WishlistButton product={product} />
      </div>

      <div className="relative h-36 sm:h-40 overflow-hidden bg-gray-100">
        <ProductImage 
          product={product} 
          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
          fallbackClassName="text-3xl"
        />
        {!product.inStock && (
          <span className="absolute top-1.5 left-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            Out of Stock
          </span>
        )}
      </div>

      <div className="p-2.5 sm:p-3">
        <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">
          {product.category}
        </span>

        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mt-0.5 hover:text-indigo-600 transition line-clamp-2 leading-tight">
          {highlightText(product.name, searchTerm)}
        </h3>

        {product.description && (
          <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 line-clamp-1 hidden sm:block">
            {highlightText(product.description, searchTerm)}
          </p>
        )}

        <div className="flex items-center mt-1">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }, (_, i) => (
              <Star 
                key={i}
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                  i < Math.floor(product.rating) 
                    ? 'fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-gray-500 ml-1">
            ({product.rating})
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-sm sm:text-base font-bold text-gray-900">
            <AnimatedPrice price={product.price} />
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className={`
              flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all duration-200
              ${product.inStock 
                ? isAdding 
                  ? 'bg-green-500 hover:bg-green-500 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
            `}
          >
            <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {isAdding ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}