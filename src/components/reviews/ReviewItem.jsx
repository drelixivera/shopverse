// src/components/reviews/ReviewItem.jsx
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { deleteReview, updateReview } from '../../services/reviews';
import RatingStars from './RatingStars';
import { Pencil, Trash2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReviewItem({ review, onReviewUpdated, onReviewDeleted }) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedRating, setEditedRating] = useState(review.rating);
  const [editedComment, setEditedComment] = useState(review.comment);
  const [isLoading, setIsLoading] = useState(false);

  const isOwner = user?.id === review.userId;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      setIsLoading(true);
      await deleteReview(review.id);
      toast.success('Review deleted successfully');
      if (onReviewDeleted) onReviewDeleted(review.id);
    } catch (error) {
      toast.error(error.message || 'Failed to delete review');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!editedComment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    if (editedRating < 1 || editedRating > 5) {
      toast.error('Please select a rating');
      return;
    }

    try {
      setIsLoading(true);
      const updated = await updateReview(review.id, {
        rating: editedRating,
        comment: editedComment.trim(),
      });
      toast.success('Review updated successfully');
      setIsEditing(false);
      if (onReviewUpdated) onReviewUpdated(updated);
    } catch (error) {
      toast.error(error.message || 'Failed to update review');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <RatingStars 
              rating={editedRating}
              onRatingChange={setEditedRating}
              size="lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comment
            </label>
            <textarea
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              rows="3"
              placeholder="Share your thoughts..."
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              disabled={isLoading}
              className={`
                flex items-center gap-1 px-3 py-1.5 rounded-lg text-white
                ${isLoading 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700'}
                transition
              `}
            >
              {isLoading ? 'Saving...' : (
                <>
                  <Save className="w-4 h-4" />
                  Save
                </>
              )}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedRating(review.rating);
                setEditedComment(review.comment);
              }}
              className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-200 py-4 last:border-b-0">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-medium">
              {review.userName?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-medium text-gray-800">
                {review.userName || 'Guest User'}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(review.createdAt)}
              </p>
            </div>
          </div>
          <div className="mt-1">
            <RatingStars rating={review.rating} size="md" readonly />
          </div>
          <p className="mt-2 text-gray-700 whitespace-pre-wrap">
            {review.comment}
          </p>
          {review.updatedAt !== review.createdAt && (
            <p className="mt-1 text-xs text-gray-400">
              Edited
            </p>
          )}
        </div>

        {isOwner && (
          <div className="flex gap-1 ml-4">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-gray-400 hover:text-indigo-600 transition rounded"
              aria-label="Edit review"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="p-1.5 text-gray-400 hover:text-red-600 transition rounded"
              aria-label="Delete review"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}