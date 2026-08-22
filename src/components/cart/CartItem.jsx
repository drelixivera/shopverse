// src/components/cart/CartItem.jsx
import { useCart } from '../../contexts/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import ProductImage from '../common/ProductImage';
import toast from 'react-hot-toast';

export default function CartItem({ item }) {
  const { id, name, price, quantity, category } = item;
  const { updateQuantity, removeItem } = useCart();

  const subtotal = price * quantity;

  const handleRemove = () => {
    removeItem(id);
    toast.success(`${name} removed from cart`, {
      icon: '🗑️',
    });
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      removeItem(id);
      toast.success(`${name} removed from cart`, {
        icon: '🗑️',
      });
    } else {
      updateQuantity(id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(id, quantity + 1);
  };

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-6 md:px-6 items-center">
        <div className="md:col-span-6 flex items-center gap-4">
          {/* Product Image */}
          <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
            <ProductImage 
              product={item} 
              className="w-full h-full"
              fallbackClassName="text-2xl"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-800 hover:text-indigo-600 transition">
              {name}
            </h3>
            <p className="text-sm text-gray-500">{category}</p>
          </div>
        </div>

        <div className="hidden md:block md:col-span-2 text-center font-medium text-gray-700">
          ${price.toFixed(2)}
        </div>

        <div className="md:col-span-2 flex items-center justify-center">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={handleDecrease}
              className="px-3 py-2 hover:bg-gray-100 transition"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-medium">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="px-3 py-2 hover:bg-gray-100 transition"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
          <span className="font-semibold text-gray-800">
            ${subtotal.toFixed(2)}
          </span>
          <button
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-600 transition"
            aria-label="Remove item"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}