// src/components/product/ImageGallery.jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function ImageGallery({ images, productName }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const imageList = images && images.length > 0 ? images : [];

  const currentImage = imageList[selectedIndex] || null;

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x: Math.min(Math.max(x, 0), 100), y: Math.min(Math.max(y, 0), 100) });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // If no images, show a single placeholder
  if (imageList.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full h-[400px] flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500">
          <span className="text-white text-7xl font-bold">
            {productName?.charAt(0).toUpperCase() || 'P'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div 
        className="relative bg-white rounded-lg shadow-md overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <div className={`relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
          <img
            src={currentImage}
            alt={productName}
            className={`w-full h-[400px] object-cover transition-transform duration-200 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            style={{
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
            }}
            onClick={toggleZoom}
            onError={(e) => {
              // If image fails, show colored placeholder
              e.target.style.display = 'none';
              const parent = e.target.parentElement;
              const initial = productName?.charAt(0).toUpperCase() || 'P';
              parent.innerHTML = `
                <div class="w-full h-[400px] flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 text-white text-7xl font-bold">
                  ${initial}
                </div>
              `;
            }}
          />
        </div>

        <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <ZoomIn className="w-3.5 h-3.5" />
          {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
        </div>

        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
          {selectedIndex + 1} / {imageList.length}
        </div>
      </div>

      {/* Thumbnails */}
      {imageList.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {imageList.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`
                flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition
                ${selectedIndex === index 
                  ? 'border-indigo-600 ring-2 ring-indigo-200' 
                  : 'border-gray-200 hover:border-gray-400'}
              `}
            >
              <img
                src={image}
                alt={`${productName} - View ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://picsum.photos/seed/error/80/80';
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}