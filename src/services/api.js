// src/services/api.js
import { products } from '../data/products';

// Simulate network delay for realistic loading
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAllProducts() {
    try {
      // Simulate network delay
      await delay(500);
      
      // Return the mock products
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getProductById(id) {
    try {
      // Simulate network delay
      await delay(300);
      
      // Find product by ID
      const product = products.find(p => p.id === Number(id));
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      return product;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }
};