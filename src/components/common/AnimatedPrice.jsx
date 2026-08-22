// src/components/common/AnimatedPrice.jsx
import { useEffect, useState, useRef } from 'react';

export default function AnimatedPrice({ price, duration = 800, className = '' }) {
  const [displayPrice, setDisplayPrice] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const startValue = 0;
    const endValue = price;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * eased;
      setDisplayPrice(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayPrice(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, price, duration]);

  return (
    <span ref={elementRef} className={className}>
      ${displayPrice.toFixed(2)}
    </span>
  );
}