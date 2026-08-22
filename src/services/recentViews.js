// src/services/recentViews.js
// Service for tracking recently viewed products

const STORAGE_KEY = 'recently_viewed';
const MAX_ITEMS = 6;

// Get all recently viewed products
export const getRecentViews = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading recent views:', error);
    return [];
  }
};

// Add a product to recently viewed
export const addRecentView = (product) => {
  try {
    let views = getRecentViews();
    
    // Remove if product already exists
    views = views.filter(item => item.id !== product.id);
    
    // Add to the front - store the FIRST image from images array
    const imageToStore = product.images && product.images.length > 0 
      ? product.images[0] 
      : product.image || 'https://via.placeholder.com/200x200?text=Product';
    
    views.unshift({
      id: product.id,
      name: product.name,
      price: product.price,
      image: imageToStore,
      category: product.category,
      rating: product.rating,
      viewedAt: new Date().toISOString()
    });
    
    // Limit to MAX_ITEMS
    if (views.length > MAX_ITEMS) {
      views = views.slice(0, MAX_ITEMS);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
    return views;
  } catch (error) {
    console.error('Error saving recent view:', error);
    return [];
  }
};

// Remove a specific product from recent views
export const removeRecentView = (productId) => {
  try {
    let views = getRecentViews();
    views = views.filter(item => item.id !== productId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
    return views;
  } catch (error) {
    console.error('Error removing recent view:', error);
    return [];
  }
};

// Clear all recent views
export const clearRecentViews = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (error) {
    console.error('Error clearing recent views:', error);
    return [];
  }
};