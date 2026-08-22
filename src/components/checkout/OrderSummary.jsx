// src/components/checkout/OrderSummary.jsx
import { Link } from 'react-router-dom';
import ProductImage from '../common/ProductImage';

export default function OrderSummary({ items, totalPrice }) {
  // Calculate shipping and tax (same as cart summary)
  const subtotal = totalPrice;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.10;
  const grandTotal = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Order Summary
      </h2>

      {/* Items Preview */}
      <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
              <ProductImage 
                product={item} 
                className="w-full h-full"
                fallbackClassName="text-lg"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">
                {item.name}
              </p>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity} × ${item.price.toFixed(2)}
              </p>
            </div>
            <span className="text-sm font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal ({items.length} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Estimated Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 my-3"></div>

        <div className="flex justify-between text-lg font-bold text-gray-800">
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <Link 
        to="/cart" 
        className="block text-center mt-4 text-sm text-indigo-600 hover:text-indigo-800 transition"
      >
        ← Back to Cart
      </Link>
    </div>
  );
}