// src/contexts/WishlistContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  // Initialize wishlist from localStorage
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Check if a product is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Add product to wishlist
  const addToWishlist = (product) => {
    // Check if already in wishlist
    if (isInWishlist(product.id)) {
      toast.error(`${product.name} is already in your wishlist`, {
        icon: '❤️',
      });
      return;
    }

    setWishlistItems(prev => [...prev, product]);
    toast.success(`${product.name} added to wishlist!`, {
      icon: '❤️',
      style: {
        background: '#ec4899',
        color: '#fff',
      },
    });
  };

  // Remove product from wishlist
  const removeFromWishlist = (productId) => {
    const product = wishlistItems.find(item => item.id === productId);
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    if (product) {
      toast.success(`${product.name} removed from wishlist`, {
        icon: '💔',
      });
    }
  };

  // Toggle wishlist (add if not in, remove if in)
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
    toast.success('Wishlist cleared', {
      icon: '🧹',
    });
  };

  const value = {
    wishlistItems,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    wishlistCount: wishlistItems.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook to use wishlist context
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}