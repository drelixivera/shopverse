// src/components/home/RecentViews.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecentViews, clearRecentViews, removeRecentView } from '../../services/recentViews';
import ProductImage from '../common/ProductImage';
import { Clock, X, Trash2 } from 'lucide-react';
import RatingStars from '../reviews/RatingStars';

export default function RecentViews() {
  const [views, setViews] = useState([]);

  useEffect(() => {
    loadViews();

    const handleStorageChange = (e) => {
      if (e.key === 'recently_viewed') {
        loadViews();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadViews = () => {
    setViews(getRecentViews());
  };

  const handleClear = () => {
    if (confirm('Clear your recently viewed history?')) {
      clearRecentViews();
      setViews([]);
    }
  };

  const handleRemove = (productId) => {
    const updatedViews = removeRecentView(productId);
    setViews(updatedViews);
  };

  if (views.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <h2 className="text-xl font-semibold text-gray-800">Recently Viewed</h2>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300">
        {views.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-48 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group relative"
          >
            <button
              onClick={() => handleRemove(product.id)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition hover:bg-gray-100"
              aria-label="Remove from recent views"
            >
              <X className="w-4 h-4 text-gray-500 hover:text-red-500 transition" />
            </button>

            <Link to={`/product/${product.id}`}>
              <div className="h-32 overflow-hidden bg-gray-100">
                <ProductImage 
                  product={product} 
                  className="w-full h-full"
                  fallbackClassName="text-3xl"
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500 truncate">{product.category}</p>
                <p className="text-sm font-medium text-gray-800 truncate">
                  {product.name}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <RatingStars rating={product.rating || 0} size="sm" readonly />
                  <span className="text-xs text-gray-500">
                    ({product.rating || 0})
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  ${product.price?.toFixed(2) || '0.00'}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}