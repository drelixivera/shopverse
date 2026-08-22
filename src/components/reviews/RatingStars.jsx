// src/components/reviews/RatingStars.jsx
import { Star } from 'lucide-react';

export default function RatingStars({ 
  rating, 
  onRatingChange, 
  size = 'md',
  readonly = false,
  showLabel = false,
}) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  const starSize = sizes[size] || sizes.md;

  const handleClick = (index) => {
    if (!readonly && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  const getStarColor = (index) => {
    if (index < rating) {
      return 'text-yellow-400 fill-current';
    }
    return 'text-gray-300';
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`
              ${!readonly ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}
              focus:outline-none
            `}
            disabled={readonly}
            aria-label={`Rate ${index + 1} stars`}
          >
            <Star 
              className={`${starSize} ${getStarColor(index)} transition-colors`}
            />
          </button>
        ))}
      </div>
      {showLabel && (
        <span className="ml-2 text-sm text-gray-600">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
}