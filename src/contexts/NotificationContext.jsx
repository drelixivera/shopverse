// src/contexts/NotificationContext.jsx
// ============================================
// NOTIFICATION CONTEXT
// ============================================
// Provides global notification state to the app

import { createContext, useContext, useState, useEffect } from 'react';
import { 
  loadNotifications, 
  saveNotifications, 
  markAsRead, 
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
  getNotifications,
} from '../services/notifications';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load notifications on mount
  useEffect(() => {
    loadNotificationsFromStorage();
  }, []);

  const loadNotificationsFromStorage = () => {
    const data = getNotifications();
    setNotifications(data);
    setUnreadCount(getUnreadCount());
  };

  const handleMarkAsRead = (notificationId) => {
    const updated = markAsRead(notificationId);
    setNotifications(updated);
    setUnreadCount(getUnreadCount());
  };

  const handleMarkAllAsRead = () => {
    const updated = markAllAsRead();
    setNotifications(updated);
    setUnreadCount(0);
  };

  const handleDelete = (notificationId) => {
    const updated = deleteNotification(notificationId);
    setNotifications(updated);
    setUnreadCount(getUnreadCount());
  };

  const refreshNotifications = () => {
    loadNotificationsFromStorage();
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    deleteNotification: handleDelete,
    refreshNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}