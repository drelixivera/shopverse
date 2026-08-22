// src/services/reviews.js
// Mock review service with localStorage persistence

// Load reviews from localStorage
const loadReviews = () => {
  try {
    const saved = localStorage.getItem('product_reviews');
    if (saved) {
      return JSON.parse(saved);
    }
    // Seed with some initial reviews
    const initialReviews = [
      {
        id: '1',
        productId: 1,
        userId: '1',
        userName: 'Test User',
        rating: 5,
        comment: 'Absolutely love these headphones! The noise cancellation is amazing and the battery life lasts forever. Highly recommend!',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        productId: 1,
        userId: '2',
        userName: 'Jane Doe',
        rating: 4,
        comment: 'Great sound quality but slightly heavy. Still a solid purchase!',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        productId: 3,
        userId: '1',
        userName: 'Test User',
        rating: 5,
        comment: 'Best fitness tracker I\'ve ever owned! Accurate heart rate monitoring and great battery life.',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
    localStorage.setItem('product_reviews', JSON.stringify(initialReviews));
    return initialReviews;
  } catch (error) {
    console.error('Error loading reviews:', error);
    return [];
  }
};

let reviews = loadReviews();

// Save reviews to localStorage
const saveReviews = () => {
  try {
    localStorage.setItem('product_reviews', JSON.stringify(reviews));
  } catch (error) {
    console.error('Error saving reviews:', error);
  }
};

// Get all reviews for a product
export const getProductReviews = async (productId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const productReviews = reviews
    .filter(review => review.productId === productId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return productReviews;
};

// Get review statistics for a product
export const getReviewStats = async (productId) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const productReviews = reviews.filter(review => review.productId === productId);
  const total = productReviews.length;

  if (total === 0) {
    return {
      average: 0,
      total: 0,
      distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    };
  }

  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  const average = sum / total;

  // Calculate rating distribution
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  productReviews.forEach(review => {
    distribution[review.rating] = (distribution[review.rating] || 0) + 1;
  });

  return {
    average: Math.round(average * 10) / 10,
    total,
    distribution,
  };
};

// Add a new review
export const addReview = async (productId, { rating, comment, user }) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  if (!rating || !comment) {
    throw new Error('Rating and comment are required');
  }

  if (rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }

  const newReview = {
    id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    productId,
    userId: user?.id || 'guest',
    userName: user?.name || 'Guest User',
    rating,
    comment: comment.trim(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  reviews.push(newReview);
  saveReviews();

  return newReview;
};

// Update an existing review
export const updateReview = async (reviewId, { rating, comment }) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const reviewIndex = reviews.findIndex(r => r.id === reviewId);
  if (reviewIndex === -1) {
    throw new Error('Review not found');
  }

  reviews[reviewIndex] = {
    ...reviews[reviewIndex],
    rating,
    comment: comment.trim(),
    updatedAt: new Date().toISOString(),
  };

  saveReviews();
  return reviews[reviewIndex];
};

// Delete a review
export const deleteReview = async (reviewId) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const reviewIndex = reviews.findIndex(r => r.id === reviewId);
  if (reviewIndex === -1) {
    throw new Error('Review not found');
  }

  reviews.splice(reviewIndex, 1);
  saveReviews();
  return { success: true };
};

// Check if a user has already reviewed a product
export const hasUserReviewed = async (productId, userId) => {
  await new Promise(resolve => setTimeout(resolve, 200));

  return reviews.some(
    review => review.productId === productId && review.userId === userId
  );
};

// Get a user's review for a product
export const getUserReview = async (productId, userId) => {
  await new Promise(resolve => setTimeout(resolve, 200));

  return reviews.find(
    review => review.productId === productId && review.userId === userId
  ) || null;
};