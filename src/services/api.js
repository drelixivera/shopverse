// src/services/api.js
import { products } from '../data/products'; // data source

// Simulate network delay for realistic loading
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Service Object
export const productService = {
  async getAllProducts() { 
    try {
      // Simulate network delay
      await delay(500);
      
      // Return the mock products
      return products; // returns the product data
    } catch (error) { //this block catches any error that occurs
      console.error('Error fetching products:', error); //logs the error to the console.
      throw error; // re-throws the error so the caller can handle it
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