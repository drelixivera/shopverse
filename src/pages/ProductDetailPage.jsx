// src/pages/ProductDetailPage.jsx
// ============================================
// PRODUCT DETAIL PAGE - WITH AUTH PROTECTION
// ============================================

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import ReviewsSection from '../components/reviews/ReviewsSection';
import WishlistButton from '../components/wishlist/WishlistButton';
import ImageGallery from '../components/product/ImageGallery';
import RelatedProducts from '../components/product/RelatedProducts';
import { addRecentView } from '../services/recentViews';
import { ShoppingCart, Star, ArrowLeft, Truck, Shield, RotateCcw, Minus, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
        setError(null);
        setQuantity(1);
        
        if (data) {
          addRecentView(data);
        }
      } catch (err) {
        setError('Failed to load product. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ===== HANDLE ADD TO CART WITH AUTH CHECK =====
  const handleAddToCart = () => {
    // ✅ Check if user is logged in
    if (!isAuthenticated) {
      toast.error('Please log in to add items to your cart', {
        icon: '🔒',
      });
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    if (!product.inStock) return;

    setIsAdding(true);
    addItem(product, quantity);
    toast.success(`${quantity} × ${product.name} added to cart!`, {
      icon: '🛒',
    });
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, value));
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-[400px] bg-gray-200 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">{error || 'Product not found'}</p>
        <Link to="/" className="inline-block mt-4 text-indigo-600 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <ImageGallery 
          images={product.images || [product.image]} 
          productName={product.name} 
        />

        {/* Product Info */}
        <div>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-sm text-gray-500 uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-800 mt-1">
                {product.name}
              </h1>
            </div>
            <WishlistButton product={product} className="w-10 h-10 flex items-center justify-center" />
          </div>

          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }, (_, i) => (
                <Star 
                  key={i}
                  className={`w-5 h-5 ${
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

          <div className="mt-4">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {!product.inStock && (
              <span className="ml-3 bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                Out of Stock
              </span>
            )}
            {product.inStock && (
              <span className="ml-3 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                In Stock
              </span>
            )}
          </div>

          <p className="mt-4 text-gray-600">
            {product.description}
          </p>

          {/* Features */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck className="w-4 h-4 text-indigo-500" />
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-indigo-500" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <RotateCcw className="w-4 h-4 text-indigo-500" />
              <span>Easy returns within 14 days</span>
            </div>
          </div>

          {/* Quantity Selector */}
          {product.inStock && (
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-3 py-2 hover:bg-gray-50 transition text-gray-600"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium text-gray-800">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-50 transition text-gray-600"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart Button - Protected */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className={`
              mt-6 w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white font-semibold transition
              ${product.inStock 
                ? isAdding 
                  ? 'bg-green-500 hover:bg-green-500' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-gray-400 cursor-not-allowed'}
            `}
          >
            <ShoppingCart className="w-5 h-5" />
            {isAdding ? 'Added!' : product.inStock ? `Add to Cart` : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <ReviewsSection productId={parseInt(id)} />
      </div>

      {/* Related Products */}
      <RelatedProducts 
        currentProductId={product.id} 
        category={product.category} 
      />
    </div>
  );
}