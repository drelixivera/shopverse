// src/components/common/SearchModal.jsx
// ============================================
// GLOBAL SEARCH MODAL - Products + Pages + Categories
// ============================================
// Search results include:
// - Products (matching by name or category)
// - Pages (Cart, Wishlist, Profile, Orders, etc.)
// - Categories (quick filter by category)
// - Quick actions (special commands)

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Search as SearchIcon, ShoppingCart, Heart, User, Package, Home, Sparkles } from 'lucide-react';
import { productService } from '../../services/api';
import ProductImage from '../common/ProductImage';

// ===== PAGE DATA =====
// These are the pages users can navigate to via search
const pages = [
  { 
    id: 'page-home', 
    name: 'Home', 
    path: '/', 
    icon: Home,
    description: 'Go to homepage'
  },
  { 
    id: 'page-cart', 
    name: 'Cart', 
    path: '/cart', 
    icon: ShoppingCart,
    description: 'View your shopping cart'
  },
  { 
    id: 'page-wishlist', 
    name: 'Wishlist', 
    path: '/wishlist', 
    icon: Heart,
    description: 'View your wishlist'
  },
  { 
    id: 'page-profile', 
    name: 'Profile', 
    path: '/profile', 
    icon: User,
    description: 'View your profile'
  },
  { 
    id: 'page-orders', 
    name: 'Orders', 
    path: '/orders', 
    icon: Package,
    description: 'View your order history'
  },
];

// ===== CATEGORY DATA =====
const categories = [
  'Electronics', 'Fashion', 'Home', 'Sports', 'Beauty', 'Kitchen', 'Books'
];

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // ===== Filter Results =====
  const allResults = [];

  // 1. Products
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Pages
  const filteredPages = pages.filter(page =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. Categories
  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===== Build Results List =====
  if (searchTerm.trim()) {
    // Add pages first (quick navigation)
    filteredPages.forEach(page => {
      allResults.push({ type: 'page', data: page });
    });

    // Then categories
    filteredCategories.forEach(category => {
      allResults.push({ type: 'category', data: category });
    });

    // Then products
    filteredProducts.slice(0, 8).forEach(product => {
      allResults.push({ type: 'product', data: product });
    });
  }

  // ===== Focus Input on Open =====
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
      setSearchTerm('');
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  // ===== Search Products =====
  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchTerm.trim()) {
        setProducts([]);
        return;
      }
      setIsLoading(true);
      try {
        const allProducts = await productService.getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error('Search error:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 200);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // ===== Keyboard Navigation =====
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      // Escape to close
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Arrow down
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < allResults.length - 1 ? prev + 1 : prev
        );
      }

      // Arrow up
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
      }

      // Enter to select
      if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        const result = allResults[selectedIndex];
        if (result) {
          handleResultClick(result);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, allResults, selectedIndex]);

  // ===== Handlers =====
  const handleResultClick = (result) => {
    setSearchTerm('');
    setProducts([]);
    setSelectedIndex(-1);
    onClose();

    if (result.type === 'page') {
      navigate(result.data.path);
    } else if (result.type === 'category') {
      // Navigate to home with category filter (pass via state)
      navigate('/', { state: { category: result.data } });
    } else if (result.type === 'product') {
      navigate(`/product/${result.data.id}`);
    }
  };

  const getIcon = (page) => {
    const Icon = page.icon;
    return <Icon className="w-5 h-5" />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative max-w-2xl mx-auto mt-20 p-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-100">
            <SearchIcon className="w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for products, pages, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-lg"
              aria-label="Search"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 text-gray-400 hover:text-gray-600 transition"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {!searchTerm.trim() ? (
              <div className="p-8 text-center text-gray-400">
                <p>🔍 Search for products, pages, or categories</p>
                <p className="text-sm mt-1">Try "cart", "headphones", or "electronics"</p>
                <div className="mt-4 flex justify-center gap-4 text-xs text-gray-300">
                  <span>Press <kbd className="px-2 py-0.5 bg-gray-100 rounded">/</kbd> to search</span>
                  <span>Press <kbd className="px-2 py-0.5 bg-gray-100 rounded">ESC</kbd> to close</span>
                </div>
              </div>
            ) : isLoading ? (
              <div className="p-8 text-center text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2">Searching...</p>
              </div>
            ) : allResults.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No results found for "{searchTerm}"</p>
                <p className="text-sm mt-1">Try different keywords</p>
              </div>
            ) : (
              <div>
                {/* Show categories */}
                {allResults.some(r => r.type === 'category') && (
                  <div className="mb-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-1">Categories</p>
                  </div>
                )}
                {allResults.filter(r => r.type === 'category').map((result, index) => {
                  const globalIndex = allResults.indexOf(result);
                  return (
                    <button
                      key={`category-${result.data}`}
                      onClick={() => handleResultClick(result)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                        globalIndex === selectedIndex ? 'bg-indigo-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">#️⃣</span>
                      <span className="text-sm font-medium text-gray-700">{result.data}</span>
                      <span className="text-xs text-gray-400 ml-auto">Category</span>
                    </button>
                  );
                })}

                {/* Show pages */}
                {allResults.some(r => r.type === 'page') && (
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-1">Pages</p>
                  </div>
                )}
                {allResults.filter(r => r.type === 'page').map((result, index) => {
                  const globalIndex = allResults.indexOf(result);
                  const Icon = result.data.icon;
                  return (
                    <button
                      key={result.data.id}
                      onClick={() => handleResultClick(result)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                        globalIndex === selectedIndex ? 'bg-indigo-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">{result.data.name}</span>
                      <span className="text-xs text-gray-400 ml-auto">{result.data.description}</span>
                    </button>
                  );
                })}

                {/* Show products */}
                {allResults.some(r => r.type === 'product') && (
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-1">Products</p>
                  </div>
                )}
                {allResults.filter(r => r.type === 'product').map((result, index) => {
                  const globalIndex = allResults.indexOf(result);
                  const product = result.data;
                  return (
                    <button
                      key={`product-${product.id}`}
                      onClick={() => handleResultClick(result)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                        globalIndex === selectedIndex ? 'bg-indigo-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <ProductImage
                          product={product}
                          className="w-full h-full"
                          fallbackClassName="text-xs"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                      <span className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}