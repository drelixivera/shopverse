// src/pages/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { getUserOrders } from '../services/orders';
import { updateUserProfile, changePassword } from '../services/auth';
import AddressManager from '../components/profile/AddressManager';
import {
  User,
  ShoppingBag,
  Heart,
  Package,
  LogOut,
  Loader2,
  Home,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Tab components
import ProfileTab from '../components/profile/ProfileTab';
import PasswordTab from '../components/profile/PasswordTab';
import OrdersTab from '../components/profile/OrdersTab';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const { totalItems } = useCart();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const userOrders = await getUserOrders(user.id);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load order history');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Handle logout
  const handleLogout = () => {
    logout();
  };

  // Stats for dashboard
  const stats = {
    orders: orders.length,
    wishlist: wishlistCount,
    cart: totalItems,
  };

  // Tabs configuration
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Package },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: Home },
    { id: 'password', label: 'Security', icon: '🔒' },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            {/* User Avatar */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {user?.name || 'User'}
                </h2>
                <p className="text-sm text-gray-500 truncate">
                  {user?.email || ''}
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors
                      ${isActive
                        ? 'bg-indigo-50 text-indigo-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'}
                    `}
                  >
                    {typeof Icon === 'string' ? (
                      <span className="text-lg">{Icon}</span>
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                    <span className="flex-1 text-left">{tab.label}</span>
                    {tab.id === 'orders' && orders.length > 0 && (
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                        {orders.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Logout Button */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'dashboard' && (
              <DashboardTab stats={stats} orders={orders} loading={loading} />
            )}
            {activeTab === 'profile' && (
              <ProfileTab user={user} onUpdate={updateUserProfile} />
            )}
            {activeTab === 'addresses' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">My Addresses</h2>
                <AddressManager />
              </div>
            )}
            {activeTab === 'password' && (
              <PasswordTab userId={user?.id} onChangePassword={changePassword} />
            )}
            {activeTab === 'orders' && (
              <OrdersTab orders={orders} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Tab Component
function DashboardTab({ stats, orders, loading }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={ShoppingBag}
          label="Total Orders"
          value={stats.orders}
          color="indigo"
        />
        <StatCard
          icon={Heart}
          label="Wishlist Items"
          value={stats.wishlist}
          color="pink"
        />
        <StatCard
          icon={Package}
          label="Cart Items"
          value={stats.cart}
          color="green"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-3" />
            <p>No orders yet</p>
            <p className="text-sm">Start shopping to see your orders here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 3).map((order) => (
              <OrderSummaryCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-600',
    pink: 'bg-pink-50 text-pink-600',
    green: 'bg-green-50 text-green-600',
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

// Order Summary Card
function OrderSummaryCard({ order }) {
  const statusColors = {
    Delivered: 'bg-green-100 text-green-800',
    Processing: 'bg-yellow-100 text-yellow-800',
    Shipped: 'bg-blue-100 text-blue-800',
    Pending: 'bg-gray-100 text-gray-800',
  };

  const date = new Date(order.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-gray-800">{order.id}</p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
          <p className="text-sm text-gray-600 mt-1">
            {order.items.length} item{order.items.length > 1 ? 's' : ''} · ${order.total.toFixed(2)}
          </p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status]}`}>
          {order.status}
        </span>
      </div>
    </div>
  );
}