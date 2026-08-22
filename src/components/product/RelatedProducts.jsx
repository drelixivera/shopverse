// src/components/product/RelatedProducts.jsx
import { Link } from 'react-router-dom';
import { useRelatedProducts } from '../../hooks/useRelatedProducts';
import ProductImage from '../common/ProductImage';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import toast from 'react-hot-toast';

export default function RelatedProducts({ currentProductId, category }) {
  const { relatedProducts, loading, error } = useRelatedProducts(currentProductId, category);
  const { addItem } = useCart();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
    });
  };

  if (loading) {
    return (
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">You Might Also Like</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-48 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
              <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="mt-1 h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          You Might Also Like
        </h3>
        <Link 
          to="/" 
          className="text-sm text-indigo-600 hover:text-indigo-800 transition"
        >
          View All →
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="flex-shrink-0 w-48 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group"
          >
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <ProductImage 
                product={product} 
                className="w-full h-full"
                fallbackClassName="text-4xl"
              />
              {!product.inStock && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="p-3">
              <p className="text-xs text-gray-500 truncate">{product.category}</p>
              <p className="text-sm font-medium text-gray-800 truncate">
                {product.name}
              </p>

              <div className="flex items-center gap-1 mt-1">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star 
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">({product.rating})</span>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={!product.inStock}
                  className={`
                    p-1.5 rounded-lg transition
                    ${product.inStock 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                  `}
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}