// src/components/reviews/ReviewForm.jsx
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import RatingStars from './RatingStars';
import { addReview } from '../../services/reviews';
import toast from 'react-hot-toast';

export default function ReviewForm({ productId, onReviewAdded }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please log in to leave a review');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    try {
      setIsSubmitting(true);
      const newReview = await addReview(productId, {
        rating,
        comment: comment.trim(),
        user,
      });
      
      toast.success('Review submitted successfully!');
      setComment('');
      setRating(5);
      
      if (onReviewAdded) onReviewAdded(newReview);
    } catch (error) {
      toast.error(error.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h4 className="text-sm font-medium text-gray-700 mb-3">
        Write a Review
      </h4>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Your Rating
          </label>
          <RatingStars 
            rating={rating} 
            onRatingChange={setRating} 
            size="lg"
          />
        </div>

        <div>
          <label htmlFor="reviewComment" className="block text-sm text-gray-600 mb-1">
            Your Comment
          </label>
          <textarea
            id="reviewComment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-800"
            rows="3"
            placeholder="Share your experience with this product..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full py-2 px-4 rounded-lg text-white font-medium
            ${isSubmitting
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'}
            transition
          `}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
}