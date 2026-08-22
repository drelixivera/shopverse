// src/pages/OrderConfirmation.jsx
import { useLocation, Link } from 'react-router-dom';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import { CheckCircle, Package, Calendar, MapPin } from 'lucide-react';

export default function OrderConfirmation() {
  const location = useLocation();
  const { orderData, orderItems, orderTotal, orderDate } = location.state || {};

  // If no order data, redirect to home
  if (!orderData) {
    return (
      <div className="text-center py-16">
        <CheckoutSteps currentStep={3} />
        <h2 className="text-2xl font-semibold text-gray-700">
          No order found
        </h2>
        <Link 
          to="/" 
          className="inline-block mt-4 text-indigo-600 hover:text-indigo-800"
        >
          Return to Shopping
        </Link>
      </div>
    );
  }

  // Generate a random order number
  const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

  return (
    <div className="max-w-3xl mx-auto">
      <CheckoutSteps currentStep={3} />

      {/* Success Banner */}
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Order Confirmed! 🎉
        </h1>
        <p className="text-gray-600">
          Thank you, {orderData.fullName}! Your order has been placed.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Order Number: <span className="font-mono font-semibold">{orderNumber}</span>
        </p>
      </div>

      {/* Order Details */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-3">
          <Package className="w-8 h-8 text-indigo-500" />
          <div>
            <p className="text-sm text-gray-500">Items</p>
            <p className="font-semibold">{orderItems?.length || 0} products</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-3">
          <Calendar className="w-8 h-8 text-indigo-500" />
          <div>
            <p className="text-sm text-gray-500">Delivery</p>
            <p className="font-semibold">Est. 3-5 days</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-3">
          <MapPin className="w-8 h-8 text-indigo-500" />
          <div>
            <p className="text-sm text-gray-500">Shipping to</p>
            <p className="font-semibold truncate">{orderData.city}, {orderData.state}</p>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Order Summary
        </h2>
        
        <div className="space-y-3">
          {orderItems?.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {item.quantity} × {item.name}
                </span>
              </div>
              <span className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total Paid</span>
            <span className="text-indigo-600">${orderTotal?.toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="border-t border-gray-200 mt-4 pt-4">
          <h3 className="font-medium text-gray-700 mb-2">Shipping Address</h3>
          <p className="text-sm text-gray-600">
            {orderData.addressLine1}<br />
            {orderData.addressLine2 && <>{orderData.addressLine2}<br /></>}
            {orderData.city}, {orderData.state} {orderData.zipCode}<br />
            {orderData.country}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          to="/" 
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition text-center"
        >
          Continue Shopping
        </Link>
        <button 
          onClick={() => window.print()}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
}