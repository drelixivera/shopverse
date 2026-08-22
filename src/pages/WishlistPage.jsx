// src/pages/WishlistPage.jsx
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import ProductImage from '../components/common/ProductImage';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (product) => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
    });
  };

  const handleMoveAllToCart = () => {
    wishlistItems.forEach(product => {
      addItem(product, 1);
    });
    toast.success(`${wishlistItems.length} items moved to cart!`, {
      icon: '🛒',
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 mt-2">
          Start adding items you love by clicking the heart icon ❤️
        </p>
        <Link 
          to="/" 
          className="inline-block mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            My Wishlist
          </h1>
          <p className="text-gray-500 mt-1">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleMoveAllToCart}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <ShoppingCart className="w-4 h-4" />
            Move All to Cart
          </button>
          <button
            onClick={clearWishlist}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <ProductImage 
                product={product} 
                className="w-full h-full"
                fallbackClassName="text-4xl"
              />
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition"
                aria-label="Remove from wishlist"
              >
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              </button>
            </div>

            <div className="p-4">
              <span className="text-sm text-gray-500 uppercase tracking-wider">
                {product.category}
              </span>
              <h3 className="text-lg font-semibold text-gray-800 mt-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  ({product.rating})
                </span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200
                    ${product.inStock 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                  `}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}