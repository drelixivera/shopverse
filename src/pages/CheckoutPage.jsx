// src/pages/CheckoutPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import CheckoutSteps from '../components/checkout/CheckoutSteps';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate('/');
    return null;
  }

  // Handle form submission
  const handleSubmit = async (data) => {
    console.log('Order Data:', data);
    console.log('Cart Items:', items);
    console.log('Total:', totalPrice);
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // ✅ Save data to sessionStorage
    const orderData = {
      orderData: data,
      orderItems: items,
      orderTotal: totalPrice,
      orderDate: new Date().toISOString()
    };
    
    sessionStorage.setItem('shopverse_order', JSON.stringify(orderData));
    console.log('✅ Saved order data to sessionStorage:', orderData);
    
    clearCart();
    setIsLoading(false);
    
    // ✅ Force navigation with full page reload
    window.location.href = '/confirmation';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <CheckoutSteps currentStep={2} />
      
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Shipping & Payment Details
            </h2>
            <CheckoutForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary items={items} totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
}