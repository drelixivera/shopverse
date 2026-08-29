// src/components/common/NotificationPanel.jsx
// ============================================
// NOTIFICATION PANEL - WITH REAL NOTIFICATIONS
// ============================================
// This component renders a slide-in panel from the right side
// that displays real notifications from the NotificationContext.
// 
// Features:
// - Slides in from right with smooth animation
// - Shows real notifications from context
// - Mark as read on click
// - Mark all as read
// - Unread count badge
// - Close on outside click or Escape key

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

export default function NotificationPanel({ isOpen, onClose }) {
  const panelRef = useRef(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

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

  // Mark as read when clicked
  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    onClose();
  };

  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

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
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`
                    flex items-start gap-3 p-4 hover:bg-gray-50 transition cursor-pointer
                    ${!notification.read ? 'bg-indigo-50/30' : ''}
                  `}
                >
                  <div className="text-2xl flex-shrink-0 mt-1">{notification.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {notification.timeAgo || 'Just now'}
                    </p>
                  </div>
                  {!notification.read && (
                    <span className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0 mt-2"></span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          {notifications.length > 0 && (
            <button 
              onClick={handleMarkAllAsRead}
              className="w-full text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium transition"
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>
    </>
  );
}