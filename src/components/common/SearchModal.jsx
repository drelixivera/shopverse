// src/components/common/SearchModal.jsx
// ============================================
// SEARCH MODAL - CENTERED OVERLAY
// ============================================

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Search as SearchIcon } from 'lucide-react';
import { productService } from '../../services/api';
import ProductImage from '../common/ProductImage';

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Search products when searchTerm changes
  useEffect(() => {
    const fetchResults = async () => {
      if (!searchTerm.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const products = await productService.getAllProducts();
        const filtered = products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filtered);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search to avoid too many requests
    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleResultClick = () => {
    setSearchTerm('');
    setResults([]);
    onClose();
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
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-lg"
            />
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={handleResultClick}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 transition"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <ProductImage
                        product={product}
                        className="w-full h-full"
                        fallbackClassName="text-sm"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                  </Link>
                ))}
              </div>
            ) : searchTerm.trim() ? (
              <div className="p-8 text-center text-gray-500">
                <p>No products found for "{searchTerm}"</p>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-400">
                <p>Start typing to search for products</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}