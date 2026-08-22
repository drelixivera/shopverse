// src/hooks/useRelatedProducts.js
import { useState, useEffect } from 'react';
import { productService } from '../services/api';

export function useRelatedProducts(currentProductId, category, limit = 4) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!category) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch all products
        const allProducts = await productService.getAllProducts();

        // Filter: same category, exclude current product
        let filtered = allProducts.filter(
          product => 
            product.category === category && 
            product.id !== currentProductId
        );

        // If not enough products in same category, add random ones
        if (filtered.length < limit) {
          const otherProducts = allProducts
            .filter(p => p.id !== currentProductId && p.category !== category)
            .sort(() => Math.random() - 0.5)
            .slice(0, limit - filtered.length);
          
          filtered = [...filtered, ...otherProducts];
        }

        // Shuffle and limit
        const shuffled = filtered.sort(() => Math.random() - 0.5);
        setRelatedProducts(shuffled.slice(0, limit));

      } catch (err) {
        console.error('Error fetching related products:', err);
        setError('Failed to load related products');
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId, category, limit]);

  return { relatedProducts, loading, error };
}