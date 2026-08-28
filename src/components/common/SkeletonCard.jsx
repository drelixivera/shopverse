// src/components/common/SkeletonCard.jsx
// ============================================
// SKELETON CARD - COMPACT VERSION
// ============================================
// Matches the compact ProductCard design
// Prevents layout shift when products load

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      
      {/* Image Placeholder */}
      <div className="h-36 sm:h-40 bg-gray-200"></div>
      
      {/* Content Placeholder */}
      <div className="p-2.5 sm:p-3 space-y-2">
        {/* Category */}
        <div className="h-2.5 bg-gray-200 rounded w-1/3"></div>
        
        {/* Product Name */}
        <div className="h-3.5 bg-gray-200 rounded w-3/4"></div>
        
        {/* Description */}
        <div className="h-2.5 bg-gray-200 rounded w-2/3 hidden sm:block"></div>
        
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-gray-200 rounded"></div>
          ))}
          <div className="w-6 h-2.5 bg-gray-200 rounded ml-1"></div>
        </div>
        
        {/* Price and Button */}
        <div className="flex items-center justify-between mt-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 w-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}