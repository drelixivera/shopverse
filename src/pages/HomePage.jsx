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
    {/* ===== HERO SECTION - IMAGE DRIVEN ===== */}
<div className="relative rounded-2xl overflow-hidden mb-12 h-[400px] md:h-[500px] animate-fade-in">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200)',
    }}
  ></div>
  
  {/* Overlay - creates contrast so text is readable */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
  
  {/* Floating Stats - Top Right Corner */}
  <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 text-white text-sm border border-white/20 hidden sm:block">
    <span className="font-bold text-yellow-300">★ 4.8/5</span>
    <span className="text-white/70 ml-2">• 10K+ Reviews</span>
  </div>
  
  {/* Content */}
  <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-16">
    <div className="max-w-xl">
      {/* Badge */}
      <span className="inline-block text-xs font-semibold tracking-widest text-yellow-300 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 animate-pulse">
        ✨ SUMMER COLLECTION
      </span>
      
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3">
        Elevate Your
        <span className="text-yellow-300 block">Style Game</span>
      </h1>
      
      {/* Subtitle */}
      <p className="text-base md:text-lg text-gray-200 max-w-lg mb-6">
        Discover premium products handpicked for quality, style, and value.
      </p>
      
      {/* CTAs */}
      <div className="flex flex-wrap gap-4">
        {/* Primary CTA */}
        <Link
          to="#products"
          className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
        >
          Explore Now →
        </Link>
        {/* Secondary CTA */}
        <Link
          to="/wishlist"
          className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-lg font-medium hover:bg-white/20 transition hover:-translate-y-0.5 transform duration-200"
        >
          View Wishlist
        </Link>
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
          {/* Product Grid - Tighter Layout */}
<div
  id="products"
  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
>
  {filteredProducts.map((product, index) => (
    <div
      key={product.id}
      className="animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <ProductCard
          product={product}
          searchTerm={debouncedSearch}
        />
      </Link>
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