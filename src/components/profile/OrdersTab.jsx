// src/components/profile/OrdersTab.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronDown, ChevronUp, Truck, CheckCircle, Clock } from 'lucide-react';
import { getOrderStatus } from '../../services/orderStatus';
import ProductImage from '../common/ProductImage';

export default function OrdersTab({ orders, loading }) {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'Processing':
        return <Package className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Delivered: 'bg-green-100 text-green-800',
      Shipped: 'bg-blue-100 text-blue-800',
      Processing: 'bg-yellow-100 text-yellow-800',
      Pending: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || colors.Pending;
  };

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
        <Link 
          to="/orders" 
          className="text-sm text-indigo-600 hover:text-indigo-800 transition"
        >
          View All Orders →
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-20 h-20 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-700">No orders yet</h3>
          <p className="text-gray-500 mt-2">
            When you place your first order, it will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.slice(0, 5).map((order) => {
            const statusData = getOrderStatus(order.id);
            const currentStatus = statusData?.status || order.status;

            return (
              <OrderCard
                key={order.id}
                order={order}
                currentStatus={currentStatus}
                isExpanded={expandedOrder === order.id}
                onToggle={() => toggleExpand(order.id)}
                getStatusIcon={getStatusIcon}
                getStatusColor={getStatusColor}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function OrderCard({ order, currentStatus, isExpanded, onToggle, getStatusIcon, getStatusColor }) {
  const date = new Date(order.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {getStatusIcon(currentStatus)}
            <div>
              <p className="font-medium text-gray-800">{order.id}</p>
              <p className="text-sm text-gray-500">{formattedDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(currentStatus)}`}>
              {currentStatus}
            </span>
            <span className="font-semibold text-gray-800">
              ${order.total.toFixed(2)}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-sm">
                <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                  <ProductImage 
                    product={item} 
                    className="w-full h-full"
                    fallbackClassName="text-lg"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-gray-500">
                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <span className="font-medium text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            
            <Link 
              to={`/order/${order.id}`}
              className="inline-block mt-2 text-sm text-indigo-600 hover:text-indigo-800 transition"
            >
              View Order Details →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}