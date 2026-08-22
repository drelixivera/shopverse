// src/components/product/ProductCard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
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
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
      style: {
        background: '#22c55e',
        color: '#fff',
      },
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
      <div className="absolute top-2 right-2 z-10" onClick={handleWishlistClick}>
        <WishlistButton product={product} />
      </div>

      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <ProductImage 
          product={product} 
          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
          fallbackClassName="text-4xl"
        />
        {!product.inStock && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Out of Stock
          </span>
        )}
      </div>

      <div className="p-4">
        <span className="text-sm text-gray-500 uppercase tracking-wider">
          {product.category}
        </span>

        <h3 className="text-lg font-semibold text-gray-800 mt-1 hover:text-indigo-600 transition">
          {highlightText(product.name, searchTerm)}
        </h3>

        {product.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {highlightText(product.description, searchTerm)}
          </p>
        )}

        <div className="flex items-center mt-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }, (_, i) => (
              <Star 
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) 
                    ? 'fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({product.rating})
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-gray-900">
            <AnimatedPrice price={product.price} />
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
              ${product.inStock 
                ? isAdding 
                  ? 'bg-green-500 hover:bg-green-500 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
            `}
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdding ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}