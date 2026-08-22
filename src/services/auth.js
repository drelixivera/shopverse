// src/services/auth.js
// This is a mock authentication service for learning purposes

// Mock user database (in memory)
let users = [];

// Load users from localStorage (for persistence)
const loadUsers = () => {
  try {
    const saved = localStorage.getItem('auth_users');
    if (saved) {
      users = JSON.parse(saved);
    } else {
      // Seed with a test user if no users exist
      users = [
        {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('auth_users', JSON.stringify(users));
    }
  } catch (error) {
    console.error('Error loading users:', error);
    users = [];
  }
};

// Save users to localStorage
const saveUsers = () => {
  try {
    localStorage.setItem('auth_users', JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

// Load users on initialization
loadUsers();

// Generate a fake JWT token
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days expiry
  };
  return btoa(JSON.stringify(payload));
};

// Verify token
export const verifyToken = (token) => {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch (error) {
    return null;
  }
};

// Login user
export const loginUser = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 800));

  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    throw new Error('Invalid email or password');
  }

  if (user.password !== password) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user);
  const { password: _, ...userWithoutPassword } = user;
  return {
    user: userWithoutPassword,
    token
  };
};

// Register new user
export const registerUser = async (name, email, password) => {
  await new Promise(resolve => setTimeout(resolve, 800));

  if (!name || !email || !password) {
    throw new Error('All fields are required');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('A user with this email already exists');
  }

  const newUser = {
    id: Date.now().toString(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers();

  const token = generateToken(newUser);
  const { password: _, ...userWithoutPassword } = newUser;
  return {
    user: userWithoutPassword,
    token
  };
};

// Get current user from token
export const getCurrentUser = async (token) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const payload = verifyToken(token);
  if (!payload) {
    throw new Error('Invalid or expired token');
  }

  const user = users.find(u => u.id === payload.id);
  if (!user) {
    throw new Error('User not found');
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Logout (client-side only)
export const logoutUser = () => {
  // Nothing to do on server-side for mock API
};

// ✅ NEW: Update user profile
export const updateUserProfile = async (userId, updates) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    throw new Error('User not found');
  }

  users[userIndex] = {
    ...users[userIndex],
    ...updates,
  };

  saveUsers();

  const { password: _, ...userWithoutPassword } = users[userIndex];
  return userWithoutPassword;
};

// ✅ NEW: Change password
export const changePassword = async (userId, currentPassword, newPassword) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    throw new Error('User not found');
  }

  if (users[userIndex].password !== currentPassword) {
    throw new Error('Current password is incorrect');
  }

  users[userIndex].password = newPassword;
  saveUsers();

  return { success: true };
};