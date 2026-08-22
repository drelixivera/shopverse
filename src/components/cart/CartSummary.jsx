// src/components/cart/CartSummary.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

export default function CartSummary() {
  const { totalItems, totalPrice } = useCart();

  const subtotal = totalPrice;
  
  // Free shipping if order is over $100
  const shipping = subtotal > 100 ? 0 : 9.99;
  
  // Estimated tax (10% - simplified)
  const tax = subtotal * 0.10;
  
  // Grand total
  const grandTotal = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Order Summary
      </h2>

      {/* Summary Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({totalItems} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-3"></div>

        {/* Total */}
        <div className="flex justify-between text-xl font-bold text-gray-800">
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link to="/checkout">
        <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
          Proceed to Checkout
        </button>
      </Link>

      {/* Continue Shopping */}
      <Link 
        to="/" 
        className="block text-center mt-4 text-sm text-indigo-600 hover:text-indigo-800 transition"
      >
        ← Continue Shopping
      </Link>
    </div>
  );
}