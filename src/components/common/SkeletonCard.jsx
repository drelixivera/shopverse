// src/components/common/SkeletonCard.jsx
export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-200"></div>
      
      {/* Content placeholder */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        
        {/* Product name */}
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        
        {/* Rating stars */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
        
        {/* Price and button */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-1/3"></div>
        </div>
      </div>
    </div>
  );
}