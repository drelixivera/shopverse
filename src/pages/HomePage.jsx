// src/pages/HomePage.jsx
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { productService } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import SkeletonCard from '../components/common/SkeletonCard';
import RecentViews from '../components/home/RecentViews';
import NewsletterSignup from '../components/common/NewsletterSignup';
import { Search, X, Filter } from 'lucide-react';
import HeroImg from '../assets/HeroImg.jpg'

export default function HomePage() {
  // State Variables
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(''); // search term after delay
  const [selectedCategory, setSelectedCategory] = useState('All');// selected category filter
  const [sortBy, setSortBy] = useState('featured'); // sorting option
  const [showFilters, setShowFilters] = useState(false); //show filter on mobile

  //categories
  const categories = useMemo(() => {
    const cats = products.map(p => p.category);
    return ['All', ...new Set(cats)];
  }, [products]);

  //search debouncing
  const debouncedSetSearch = useCallback(
    debounce((value) => {
      setDebouncedSearch(value);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSetSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    debouncedSetSearch.cancel();
  };

  // fetching products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts(); // fetches data
        setProducts(data); // stores product
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again.');
        console.error(err);
      } finally {
        setLoading(false); // hide skeleton, shows products
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  // Filtering and sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search
    if (debouncedSearch.trim()) {
      const term = debouncedSearch.toLowerCase().trim();
      result = result.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(product =>
        product.category === selectedCategory
      );
    }

    // sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, debouncedSearch, selectedCategory, sortBy]);

  // Loading State
  if (loading) {
    return (
      <div>
        {/* Hero Loading Skeleton */}
        <div className="h-64 bg-gray-200 rounded-2xl mb-10 animate-pulse"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mt-1 animate-pulse"></div>
          </div>
          <div className="w-full md:w-80 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        {/* Product Grid Loading Skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  // displaying pages
  return (
    <div>
    {/* ===== HERO SECTION ===== */}
<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10">
    {/* Hero Content */}
  <div className="flex flex-col lg:flex-row items-center">
    {/* Left - Content */}
    <div className="flex-1 p-8 md:p-12 lg:p-16">
      {/* Badge */}
      <div className="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
        WELCOME TO SHOPVERSE
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3">
        Quality <br />
        <span className="text-indigo-600">Products.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-sm md:text-base max-w-md mb-6">
        Discover a wide range of high-quality products carefully selected for your lifestyle.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <Link
          to="#products"
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
        >
          Shop Now →
        </Link>
        <Link
          to="#products"
          className="text-gray-700 hover:text-indigo-600 font-medium transition flex items-center gap-1"
        >
          Explore Collection
        </Link>
      </div>

      {/* Trust Badges - Row */}
      <div className="flex flex-wrap items-center gap-6 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-indigo-500 text-lg">✓</span>
          Premium Quality
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-indigo-500 text-lg">✓</span>
          Secure Payments
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-indigo-500 text-lg">✓</span>
          Easy Returns
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-indigo-500 text-lg">✓</span>
          Customer Support
        </div>
      </div>

      {/* Trust Badges - Icons Row */}
      <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-2xl">🚚</span>
          <div>
            <p className="font-medium text-gray-700 text-xs">FREE SHIPPING</p>
            <p className="text-gray-400 text-xs">On orders over $50</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-2xl">🔄</span>
          <div>
            <p className="font-medium text-gray-700 text-xs">30 DAYS RETURNS</p>
            <p className="text-gray-400 text-xs">No hassle returns</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-2xl">🔒</span>
          <div>
            <p className="font-medium text-gray-700 text-xs">SECURE PAYMENT</p>
            <p className="text-gray-400 text-xs">100% secure checkout</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-2xl">💬</span>
          <div>
            <p className="font-medium text-gray-700 text-xs">24/7 SUPPORT</p>
            <p className="text-gray-400 text-xs">We're here to help</p>
          </div>
        </div>
      </div>
    </div>

    {/* Right - Single Large Product Image */}
    <div className="flex-1 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 lg:p-12 flex items-center justify-center min-h-[250px] lg:min-h-[400px]">
      <div className="relative">
        {/* Main Product Image */}
        <img
          src={HeroImg}
          alt="Premium Wrist watch"
          className="w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'RM-350.jpeg';
          }}
        />
        {/* Floating Badge - Top Right */}
        <div className="absolute -top-3 -right-3 bg-white rounded-full shadow-lg px-3 py-1.5 text-xs font-bold text-indigo-600 border border-indigo-100">
          TRUSTED BY THOUSANDS
        </div>
        {/* Rating Badge - Bottom */}
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-4 py-1.5 text-xs font-bold text-green-600 border border-green-100 whitespace-nowrap">
          ★ 4.8/5 • 10K+ Reviews
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Featured Products Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-9 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className={`${showFilters ? 'block' : 'hidden md:block'} mb-6`}>
        <div className="flex flex-wrap items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-gray-500 font-medium mr-1">Category:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-3 py-1 rounded-full text-xs transition whitespace-nowrap
                  ${selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-200'}
                `}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-gray-300 hidden sm:block"></div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>

          {(selectedCategory !== 'All' || searchTerm || sortBy !== 'featured') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                clearSearch();
                setSortBy('featured');
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 transition ml-auto"
            >
              Clear All Filters ✕
            </button>
          )}
        </div>
      </div>

      {/* Search hint */}
      {searchTerm && searchTerm !== debouncedSearch && (
        <p className="text-xs text-gray-400 animate-pulse mb-4">Searching...</p>
      )}
      {searchTerm && searchTerm === debouncedSearch && debouncedSearch.trim() && (
        <p className="text-xs text-gray-500 mb-4">
          Showing results for: "{debouncedSearch}"
        </p>
      )}

      {/* No Results */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm
              ? `We couldn't find any products matching "${debouncedSearch}"`
              : 'Try adjusting your filters'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              clearSearch();
              setSortBy('featured');
            }}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition text-sm"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div
            id="products"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard
                  product={product}
                  searchTerm={debouncedSearch}
                />
              </div>
            ))}
          </div>

          {/* Recent Views */}
          <RecentViews />

          {/* Newsletter Section */}
          <div className="mt-12">
            <NewsletterSignup />
          </div>
        </>
      )}
    </div>
  );
}