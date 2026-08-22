// src/pages/CartPage.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import { ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, clearCart } = useCart();

  const handleClearCart = () => {
    if (items.length === 0) return;
    clearCart();
    toast.success('Cart cleared successfully', {
      icon: '🧹',
    });
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <CheckoutSteps currentStep={1} />
        <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mt-2">
          Looks like you haven't added any items yet.
        </p>
        <Link 
          to="/" 
          className="inline-block mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <CheckoutSteps currentStep={1} />
      
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>

            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {items.length} items in cart
              </span>
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-800 text-sm font-medium transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}