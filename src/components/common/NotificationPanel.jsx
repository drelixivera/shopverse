// src/components/common/NotificationPanel.jsx
// ============================================
// NOTIFICATION PANEL (Slides in from right)
// ============================================
// Features:
// - Slides in from right side
// - Click outside to close
// - Escape key to close
// - Dummy notifications (ready for real data)
// - Mark all as read button

import { useEffect, useRef } from 'react';
import { X, Package, Heart, ShoppingCart, MessageCircle, CheckCheck } from 'lucide-react';

// Dummy notifications data (replace with real data later)
const notifications = [
  {
    id: 1,
    type: 'order',
    icon: Package,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    message: 'Your order #ORD-123 has been shipped!',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'wishlist',
    icon: Heart,
    color: 'text-pink-500',
    bg: 'bg-pink-50',
    message: 'John Doe liked your product "Wireless Headphones"',
    time: '15 minutes ago',
    read: false,
  },
  {
    id: 3,
    type: 'cart',
    icon: ShoppingCart,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
    message: 'Your cart has 3 items waiting for you!',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 4,
    type: 'message',
    icon: MessageCircle,
    color: 'text-green-500',
    bg: 'bg-green-50',
    message: 'Support sent you a new message',
    time: '3 hours ago',
    read: true,
  },
];

export default function NotificationPanel({ isOpen, onClose }) {
  const panelRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Overlay - darkens the page when panel is open */}
      <div 
        className={`
          fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      />

      {/* Panel - slides in from right */}
      <div
        ref={panelRef}
        className={`
          fixed top-0 right-0 h-full w-[380px] max-w-[85vw] bg-white shadow-2xl z-50 
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-800">Notifications</span>
            {unreadCount > 0 && (
              <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition"
            aria-label="Close notifications"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto h-[calc(100%-140px)]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <span className="text-4xl mb-2">🔔</span>
              <p>No notifications yet</p>
              <p className="text-sm">We'll notify you when something happens</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div 
                    key={notification.id}
                    className={`
                      flex items-start gap-3 p-4 hover:bg-gray-50 transition cursor-pointer
                      ${!notification.read ? 'bg-indigo-50/30' : ''}
                    `}
                  >
                    <div className={`p-2 rounded-full ${notification.bg}`}>
                      <Icon className={`w-4 h-4 ${notification.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0 mt-2"></span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <button className="w-full text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium transition">
            Mark all as read
          </button>
        </div>
      </div>
    </>
  );
}