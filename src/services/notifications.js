// src/services/notifications.js
// ============================================
// NOTIFICATION SERVICE
// ============================================
// Manages real notifications with localStorage persistence
// 
// Features:
// - Add notifications (order, shipping, delivery, wishlist, cart)
// - Mark as read/unread
// - Mark all as read
// - Delete notifications
// - Persist to localStorage

const STORAGE_KEY = 'shopverse_notifications';

// Load notifications from localStorage
export const loadNotifications = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading notifications:', error);
    return [];
  }
};

// Save notifications to localStorage
export const saveNotifications = (notifications) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  } catch (error) {
    console.error('Error saving notifications:', error);
  }
};

// Generate a unique ID
const generateId = () => {
  return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
};

// Get time ago string
const getTimeAgo = (timestamp) => {
  const now = new Date();
  const diff = now - new Date(timestamp);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return `${days} day${days > 1 ? 's' : ''} ago`;
};

// ===== ADD NOTIFICATIONS =====

// Order placed notification
export const addOrderPlacedNotification = (orderId) => {
  const notifications = loadNotifications();
  const newNotification = {
    id: generateId(),
    type: 'order',
    title: 'Order Placed 🎉',
    message: `Your order ${orderId} has been placed successfully!`,
    time: new Date().toISOString(),
    timeAgo: 'Just now',
    read: false,
    link: `/order/${orderId}`,
    icon: '📦',
  };
  notifications.unshift(newNotification);
  saveNotifications(notifications);
  return newNotification;
};

// Order shipped notification
export const addOrderShippedNotification = (orderId) => {
  const notifications = loadNotifications();
  const newNotification = {
    id: generateId(),
    type: 'shipped',
    title: 'Order Shipped 🚚',
    message: `Your order ${orderId} has been shipped!`,
    time: new Date().toISOString(),
    timeAgo: 'Just now',
    read: false,
    link: `/order/${orderId}`,
    icon: '📦',
  };
  notifications.unshift(newNotification);
  saveNotifications(notifications);
  return newNotification;
};

// Order delivered notification
export const addOrderDeliveredNotification = (orderId) => {
  const notifications = loadNotifications();
  const newNotification = {
    id: generateId(),
    type: 'delivered',
    title: 'Order Delivered ✅',
    message: `Your order ${orderId} has been delivered!`,
    time: new Date().toISOString(),
    timeAgo: 'Just now',
    read: false,
    link: `/order/${orderId}`,
    icon: '✅',
  };
  notifications.unshift(newNotification);
  saveNotifications(notifications);
  return newNotification;
};

// Wishlist restock notification
export const addWishlistRestockNotification = (productName) => {
  const notifications = loadNotifications();
  const newNotification = {
    id: generateId(),
    type: 'wishlist',
    title: 'Back in Stock ❤️',
    message: `${productName} is back in stock!`,
    time: new Date().toISOString(),
    timeAgo: 'Just now',
    read: false,
    link: `/wishlist`,
    icon: '❤️',
  };
  notifications.unshift(newNotification);
  saveNotifications(notifications);
  return newNotification;
};

// Cart reminder notification
export const addCartReminderNotification = (itemCount) => {
  const notifications = loadNotifications();
  const newNotification = {
    id: generateId(),
    type: 'cart',
    title: 'Cart Reminder 🛒',
    message: `You have ${itemCount} item${itemCount > 1 ? 's' : ''} waiting in your cart!`,
    time: new Date().toISOString(),
    timeAgo: 'Just now',
    read: false,
    link: '/cart',
    icon: '🛒',
  };
  notifications.unshift(newNotification);
  saveNotifications(notifications);
  return newNotification;
};

// ===== ACTIONS =====

// Mark a single notification as read
export const markAsRead = (notificationId) => {
  const notifications = loadNotifications();
  const updated = notifications.map(n => 
    n.id === notificationId ? { ...n, read: true } : n
  );
  saveNotifications(updated);
  return updated;
};

// Mark all notifications as read
export const markAllAsRead = () => {
  const notifications = loadNotifications();
  const updated = notifications.map(n => ({ ...n, read: true }));
  saveNotifications(updated);
  return updated;
};

// Delete a notification
export const deleteNotification = (notificationId) => {
  const notifications = loadNotifications();
  const updated = notifications.filter(n => n.id !== notificationId);
  saveNotifications(updated);
  return updated;
};

// Get unread count
export const getUnreadCount = () => {
  const notifications = loadNotifications();
  return notifications.filter(n => !n.read).length;
};

// Get all notifications with time ago
export const getNotifications = () => {
  const notifications = loadNotifications();
  return notifications.map(n => ({
    ...n,
    timeAgo: getTimeAgo(n.time),
  }));
};