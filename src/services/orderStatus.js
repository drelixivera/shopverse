// src/services/orderStatus.js
// Service for managing order status updates

const STORAGE_KEY = 'order_status_history';

// Load status history from localStorage
const loadStatusHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading order status:', error);
    return {};
  }
};

// Save status history to localStorage
const saveStatusHistory = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving order status:', error);
  }
};

// Get all order statuses
export const getOrderStatuses = () => {
  return loadStatusHistory();
};

// Get status for a specific order
export const getOrderStatus = (orderId) => {
  const history = loadStatusHistory();
  return history[orderId] || null;
};

// Update order status with timestamp
export const updateOrderStatus = (orderId, newStatus) => {
  const history = loadStatusHistory();
  
  if (!history[orderId]) {
    history[orderId] = {
      status: newStatus,
      history: [{
        status: newStatus,
        timestamp: new Date().toISOString(),
        note: 'Order placed'
      }]
    };
  } else {
    history[orderId].status = newStatus;
    history[orderId].history.push({
      status: newStatus,
      timestamp: new Date().toISOString(),
      note: getStatusNote(newStatus)
    });
  }
  
  saveStatusHistory(history);
  return history[orderId];
};

// Get status note
const getStatusNote = (status) => {
  const notes = {
    'Pending': 'Order received and awaiting processing',
    'Processing': 'Your order is being prepared',
    'Shipped': 'Your order has been shipped',
    'Delivered': 'Your order has been delivered',
  };
  return notes[status] || 'Status updated';
};

// Initialize order with first status
export const initializeOrderStatus = (orderId) => {
  const history = loadStatusHistory();
  if (!history[orderId]) {
    history[orderId] = {
      status: 'Pending',
      history: [{
        status: 'Pending',
        timestamp: new Date().toISOString(),
        note: 'Order placed successfully'
      }]
    };
    saveStatusHistory(history);
  }
  return history[orderId];
};

// Get all status steps for timeline
export const getStatusSteps = () => {
  return [
    { key: 'Pending', label: 'Order Placed', icon: '📋', color: 'bg-gray-400' },
    { key: 'Processing', label: 'Processing', icon: '⚙️', color: 'bg-blue-500' },
    { key: 'Shipped', label: 'Shipped', icon: '📦', color: 'bg-indigo-500' },
    { key: 'Delivered', label: 'Delivered', icon: '✅', color: 'bg-green-500' },
  ];
};

// Get current step index
export const getCurrentStepIndex = (status) => {
  const steps = getStatusSteps();
  return steps.findIndex(step => step.key === status);
};

// Check if order status can be updated
export const canUpdateStatus = (currentStatus) => {
  const steps = getStatusSteps();
  const currentIndex = steps.findIndex(step => step.key === currentStatus);
  return currentIndex < steps.length - 1;
};

// Get next status
export const getNextStatus = (currentStatus) => {
  const steps = getStatusSteps();
  const currentIndex = steps.findIndex(step => step.key === currentStatus);
  if (currentIndex < steps.length - 1) {
    return steps[currentIndex + 1].key;
  }
  return null;
};