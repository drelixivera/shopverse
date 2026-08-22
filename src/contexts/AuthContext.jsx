// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getCurrentUser } from '../services/auth';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token');
        if (storedToken) {
          const userData = await getCurrentUser(storedToken);
          setUserState(userData);
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await loginUser(email, password);
      const { user, token } = response;
      
      setUserState(user);
      setToken(token);
      localStorage.setItem('auth_token', token);
      
      toast.success(`Welcome back, ${user.name}!`, {
        icon: '👋',
      });
      
      return { success: true, user };
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.', {
        icon: '❌',
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const response = await registerUser(name, email, password);
      const { user, token } = response;
      
      setUserState(user);
      setToken(token);
      localStorage.setItem('auth_token', token);
      
      toast.success(`Welcome to ShopVerse, ${user.name}!`, {
        icon: '🎉',
      });
      
      return { success: true, user };
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.', {
        icon: '❌',
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUserState(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    toast.success('Logged out successfully', {
      icon: '👋',
    });
  };

  // Update user function
  const setUser = (newUser) => {
    setUserState(newUser);
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}