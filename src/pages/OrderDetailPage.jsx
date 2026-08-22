// src/pages/OrderDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getOrderById } from '../services/orders';
import { getOrderStatus, updateOrderStatus, getNextStatus, canUpdateStatus } from '../services/orderStatus';
import OrderTimeline from '../components/orders/OrderTimeline';
import ProductImage from '../components/common/ProductImage';
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const orderData = await getOrderById(user.id, orderId);
        setOrder(orderData);
        
        // Get status
        const statusData = getOrderStatus(orderId);
        if (statusData) {
          setStatus(statusData);
        } else {
          // Initialize if no status exists
          const initialStatus = {
            status: orderData?.status || 'Pending',
            history: [{
              status: orderData?.status || 'Pending',
              timestamp: new Date().toISOString(),
              note: 'Order placed'
            }]
          };
          setStatus(initialStatus);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, user]);

  const handleUpdateStatus = async () => {
    if (!status || !canUpdateStatus(status.status)) {
      toast.error('Cannot update status further');
      return;
    }

    const nextStatus = getNextStatus(status.status);
    if (!nextStatus) return;

    setUpdating(true);
    try {
      const updated = updateOrderStatus(orderId, nextStatus);
      setStatus(updated);
      toast.success(`Order status updated to ${nextStatus}`);
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Pending': <Clock className="w-5 h-5 text-yellow-500" />,
      'Processing': <Package className="w-5 h-5 text-blue-500" />,
      'Shipped': <Truck className="w-5 h-5 text-indigo-500" />,
      'Delivered': <CheckCircle className="w-5 h-5 text-green-500" />,
    };
    return icons[status] || icons['Pending'];
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
        <div className="h-48 bg-gray-200 rounded mb-6"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">Order not found</h2>
        <Link to="/profile" className="mt-4 inline-block text-indigo-600 hover:underline">
          Back to Profile
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link 
        to="/profile" 
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Profile
      </Link>

      {/* Order Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Order #{order.id}
            </h1>
            <p className="text-sm text-gray-500">
              Placed on {formatDate(order.date)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(status?.status || order.status)}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              status?.status === 'Delivered' ? 'bg-green-100 text-green-800' :
              status?.status === 'Shipped' ? 'bg-indigo-100 text-indigo-800' :
              status?.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {status?.status || order.status}
            </span>
          </div>
        </div>
      </div>

      {/* Order Timeline */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <OrderTimeline 
          currentStatus={status?.status || order.status}
          orderId={order.id}
        />
        
        {/* Update Status Button */}
        {canUpdateStatus(status?.status || order.status) && (
          <button
            onClick={handleUpdateStatus}
            disabled={updating}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {updating ? 'Updating...' : `Mark as ${getNextStatus(status?.status || order.status)}`}
          </button>
        )}
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b border-gray-100 pb-3 last:border-0">
              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                <ProductImage 
                  product={item} 
                  className="w-full h-full"
                  fallbackClassName="text-xl"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <span className="font-semibold text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Order Total */}
        <div className="border-t border-gray-200 mt-4 pt-4 flex justify-end">
          <div className="text-right">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold text-gray-800">
              ${order.total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}