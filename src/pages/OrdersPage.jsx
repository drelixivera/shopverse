// src/pages/OrdersPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserOrders } from '../services/orders';
import { getOrderStatus } from '../services/orderStatus';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const userOrders = await getUserOrders(user.id);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusIcon = (status) => {
    const icons = {
      'Pending': <Clock className="w-5 h-5 text-yellow-500" />,
      'Processing': <Package className="w-5 h-5 text-blue-500" />,
      'Shipped': <Truck className="w-5 h-5 text-indigo-500" />,
      'Delivered': <CheckCircle className="w-5 h-5 text-green-500" />,
    };
    return icons[status] || icons['Pending'];
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Shipped': 'bg-indigo-100 text-indigo-800',
      'Delivered': 'bg-green-100 text-green-800',
    };
    return colors[status] || colors['Pending'];
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="w-20 h-20 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">No orders yet</h2>
        <p className="text-gray-500 mt-2">
          When you place your first order, it will appear here
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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const statusData = getOrderStatus(order.id);
          const currentStatus = statusData?.status || order.status;

          return (
            <Link 
              key={order.id} 
              to={`/order/${order.id}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition p-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="font-medium text-gray-800">{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(currentStatus)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentStatus)}`}>
                      {currentStatus}
                    </span>
                  </div>
                  <span className="font-bold text-gray-800">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}