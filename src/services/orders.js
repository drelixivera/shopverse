// src/services/orders.js
import { initializeOrderStatus } from './orderStatus';

// Mock order data storage
let orderHistory = {};

// Load orders from localStorage
const loadOrders = () => {
  try {
    const saved = localStorage.getItem('order_history');
    if (saved) {
      orderHistory = JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading orders:', error);
  }
};

// Save orders to localStorage
const saveOrders = () => {
  try {
    localStorage.setItem('order_history', JSON.stringify(orderHistory));
  } catch (error) {
    console.error('Error saving orders:', error);
  }
};

// Load orders on init
loadOrders();

// Generate mock orders for a user
const generateMockOrders = (userId) => {
  const now = new Date();
  const orders = [];

  const numOrders = Math.floor(Math.random() * 3) + 3;

  for (let i = 0; i < numOrders; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i * 7 - Math.floor(Math.random() * 5));

    const numItems = Math.floor(Math.random() * 3) + 1;
    const items = [];
    let total = 0;

    const productNames = ['Wireless Headphones', 'Minimalist Backpack', 'Smart Watch', 'Coffee Mug Set', 'Mechanical Keyboard', 'Yoga Mat'];
    const productImages = [
      'https://images.unsplash.com/photo-1505740420928-5e560c30d30e?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=100&h=100&fit=crop',
    ];

    for (let j = 0; j < numItems; j++) {
      const idx = Math.floor(Math.random() * productNames.length);
      const price = Math.floor(Math.random() * 150) + 20;
      const quantity = Math.floor(Math.random() * 2) + 1;
      const subtotal = price * quantity;
      total += subtotal;

      items.push({
        id: `item-${j + 1}`,
        name: productNames[idx],
        price,
        quantity,
        image: productImages[idx],
      });
    }

    const statuses = ['Delivered', 'Processing', 'Shipped', 'Pending'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const order = {
      id: `ORD-${Date.now().toString().slice(-8)}-${(i + 1).toString().padStart(3, '0')}`,
      date: date.toISOString(),
      items,
      total,
      status,
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St, Apt 4B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
      },
    };

    orders.push(order);
    
    // Initialize order status tracking
    initializeOrderStatus(order.id);
  }

  return orders.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Get orders for a user
export const getUserOrders = async (userId) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  if (!orderHistory[userId]) {
    orderHistory[userId] = generateMockOrders(userId);
    saveOrders();
  }

  return orderHistory[userId];
};

// Get a single order by ID
export const getOrderById = async (userId, orderId) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const orders = orderHistory[userId] || [];
  return orders.find(order => order.id === orderId) || null;
};

// Place a new order
export const placeOrder = async (userId, cartItems, total, shippingAddress) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const newOrder = {
    id: `ORD-${Date.now().toString().slice(-8)}-${(orderHistory[userId]?.length || 0) + 1}`,
    date: new Date().toISOString(),
    items: cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image || item.images?.[0],
    })),
    total,
    status: 'Pending',
    shippingAddress,
  };

  if (!orderHistory[userId]) {
    orderHistory[userId] = [];
  }

  orderHistory[userId].unshift(newOrder);
  saveOrders();

  // Initialize order status tracking
  initializeOrderStatus(newOrder.id);

  return newOrder;
};