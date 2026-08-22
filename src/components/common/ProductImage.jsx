// src/components/common/ProductImage.jsx
import { useState } from 'react';

export default function ProductImage({ 
  product, 
  className = '', 
  fallbackClassName = '',
}) {
  const [imageError, setImageError] = useState(false);

  // Get the first image from the product
  const getImageUrl = () => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    if (product.image) {
      return product.image;
    }
    return null;
  };

  const imageUrl = getImageUrl();

  // If image failed to load or no image exists, show placeholder
  if (imageError || !imageUrl) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 ${className}`}>
        <span className={`text-white font-bold ${fallbackClassName || 'text-4xl'}`}>
          {product?.name?.charAt(0).toUpperCase() || 'P'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={product?.name || 'Product'}
      className={`object-cover ${className}`}
      onError={() => setImageError(true)}
    />
  );
}