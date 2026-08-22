// src/services/newsletter.js
// Newsletter subscription service with localStorage persistence

const STORAGE_KEY = 'newsletter_subscribers';

// Load subscribers from localStorage
const loadSubscribers = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading subscribers:', error);
    return [];
  }
};

// Save subscribers to localStorage
const saveSubscribers = (subscribers) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));
  } catch (error) {
    console.error('Error saving subscribers:', error);
  }
};

// Subscribe a new email
export const subscribeToNewsletter = async (email, name = '') => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  // Validate email
  if (!email || !email.includes('@') || !email.includes('.')) {
    throw new Error('Please enter a valid email address');
  }

  // Check for duplicates
  const subscribers = loadSubscribers();
  const exists = subscribers.some(
    sub => sub.email.toLowerCase() === email.toLowerCase()
  );

  if (exists) {
    throw new Error('This email is already subscribed to our newsletter');
  }

  // Add new subscriber
  const newSubscriber = {
    id: `sub_${Date.now()}`,
    email: email.trim().toLowerCase(),
    name: name.trim() || 'Subscriber',
    subscribedAt: new Date().toISOString(),
    status: 'active'
  };

  subscribers.push(newSubscriber);
  saveSubscribers(subscribers);

  return {
    success: true,
    message: 'Successfully subscribed to our newsletter!',
    subscriber: newSubscriber
  };
};

// Unsubscribe an email
export const unsubscribeFromNewsletter = async (email) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  let subscribers = loadSubscribers();
  const exists = subscribers.some(
    sub => sub.email.toLowerCase() === email.toLowerCase()
  );

  if (!exists) {
    throw new Error('Email not found in our subscriber list');
  }

  subscribers = subscribers.filter(
    sub => sub.email.toLowerCase() !== email.toLowerCase()
  );
  saveSubscribers(subscribers);

  return {
    success: true,
    message: 'Successfully unsubscribed from our newsletter'
  };
};

// Get all subscribers (for admin purposes)
export const getAllSubscribers = () => {
  return loadSubscribers();
};

// Get subscriber count
export const getSubscriberCount = () => {
  return loadSubscribers().length;
};

// Check if email is subscribed
export const isEmailSubscribed = (email) => {
  const subscribers = loadSubscribers();
  return subscribers.some(
    sub => sub.email.toLowerCase() === email.toLowerCase()
  );
};