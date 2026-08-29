// src/components/home/HeroCarousel.jsx
// ============================================
// HERO CAROUSEL - DYNAMIC SLIDESHOW
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDE_INTERVAL = 5000;

export default function HeroCarousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goToNext, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const currentSlide = slides[currentIndex];

  return (
    <div 
      className="relative rounded-2xl overflow-hidden mb-12 h-[400px] md:h-[500px] group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${currentSlide.image})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 text-white text-sm border border-white/20 hidden sm:block">
        <span className="font-bold text-yellow-300">★ 4.8/5</span>
        <span className="text-white/70 ml-2">• 10K+ Reviews</span>
      </div>

      <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-16">
        <div className="max-w-xl">
          <span className="inline-block text-xs font-semibold tracking-widest text-yellow-300 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 animate-pulse">
            {currentSlide.badge}
          </span>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3">
            {currentSlide.title}
            <span className="text-yellow-300 block">{currentSlide.titleHighlight}</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-200 max-w-lg mb-6">
            {currentSlide.subtitle}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              to={currentSlide.primaryCTA.link}
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
            >
              {currentSlide.primaryCTA.text}
            </Link>
            {currentSlide.secondaryCTA && (
              <Link
                to={currentSlide.secondaryCTA.link}
                className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-lg font-medium hover:bg-white/20 transition hover:-translate-y-0.5 transform duration-200"
              >
                {currentSlide.secondaryCTA.text}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Arrow Buttons */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-2.5 h-2.5 rounded-full transition-all duration-300
              ${index === currentIndex 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/80'}
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}