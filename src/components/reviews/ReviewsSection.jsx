// src/components/reviews/ReviewsSection.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getProductReviews, getReviewStats, hasUserReviewed } from '../../services/reviews';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';
import RatingStars from './RatingStars';
import { MessageCircle } from 'lucide-react';

export default function ReviewsSection({ productId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ average: 0, total: 0, distribution: {} });
  const [loading, setLoading] = useState(true);
  const [userReviewed, setUserReviewed] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const [fetchedReviews, fetchedStats, hasReviewed] = await Promise.all([
        getProductReviews(productId),
        getReviewStats(productId),
        user ? hasUserReviewed(productId, user.id) : Promise.resolve(false),
      ]);

      setReviews(fetchedReviews);
      setStats(fetchedStats);
      setUserReviewed(hasReviewed);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewAdded = async (newReview) => {
    setReviews([newReview, ...reviews]);
    const newStats = await getReviewStats(productId);
    setStats(newStats);
    setUserReviewed(true);
    setShowForm(false);
  };

  const handleReviewUpdated = (updatedReview) => {
    setReviews(reviews.map(r => 
      r.id === updatedReview.id ? updatedReview : r
    ));
  };

  const handleReviewDeleted = (reviewId) => {
    setReviews(reviews.filter(r => r.id !== reviewId));
    getReviewStats(productId).then(setStats);
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Review Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Reviews</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800">
              {stats.average > 0 ? stats.average.toFixed(1) : 'No reviews'}
            </div>
            {stats.total > 0 && (
              <>
                <RatingStars rating={stats.average} size="md" readonly />
                <div className="text-sm text-gray-500 mt-1">
                  {stats.total} {stats.total === 1 ? 'review' : 'reviews'}
                </div>
              </>
            )}
          </div>

          {/* Rating Distribution */}
          {stats.total > 0 && (
            <div className="flex-1 w-full">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = stats.distribution[star] || 0;
                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="w-8 text-gray-600">{star}★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-gray-500 text-xs">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {!userReviewed && user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        )}

        {!user && (
          <p className="mt-4 text-sm text-gray-500">
            <Link to="/login" className="text-indigo-600 hover:underline">
              Log in
            </Link> to leave a review
          </p>
        )}
      </div>

      {/* Review Form */}
      {showForm && user && !userReviewed && (
        <ReviewForm 
          productId={productId} 
          onReviewAdded={handleReviewAdded} 
        />
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Reviews ({reviews.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <ReviewItem
                key={review.id}
                review={review}
                onReviewUpdated={handleReviewUpdated}
                onReviewDeleted={handleReviewDeleted}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-lg shadow-md">
          <MessageCircle className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No reviews yet</p>
          <p className="text-sm text-gray-400">Be the first to review this product!</p>
        </div>
      )}
    </div>
  );
}