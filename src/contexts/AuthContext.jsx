// src/contexts/AuthContext.jsx
// ============================================
// AUTH CONTEXT
// ============================================

import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getCurrentUser } from '../services/auth';
import { jwtDecode } from 'jwt-decode';  
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // state variables
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // session initialization
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token');
        if (storedToken) {
          // Check if it's a Google token or mock token
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

  // ===== LOGIN FUCNTION (Email/Password) =====
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

  // ===== REGISTER FUNCTION (Email/Password) =====
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

  // ===== Google Login Function =====
  const loginWithGoogle = (credentialResponse) => {
    try {
      // Decode the Google JWT token to get user data
      const decoded = jwtDecode(credentialResponse.credential);
      
      // Extract user data from Google response
      const googleUser = {
        id: decoded.sub, // Google's unique user ID
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        provider: 'google',
        createdAt: new Date().toISOString()
      };

      // Store the token
      const googleToken = credentialResponse.credential;
      setToken(googleToken);
      localStorage.setItem('auth_token', googleToken);
      
      // Set user state
      setUserState(googleUser);
      
      toast.success(`Welcome, ${googleUser.name}!`, {
        icon: '👋',
      });
      
      return { success: true, user: googleUser };
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Google login failed. Please try again.', {
        icon: '❌',
      });
      return { success: false, error: error.message };
    }
  };

  // ===== LOGOUT LOGOUT =====
  const logout = () => {
    setUserState(null); // clears user data from state
    setToken(null); // Clears token from state
    localStorage.removeItem('auth_token'); //Removes token from storage
    toast.success('Logged out successfully', { // Shows logout confirmation
      icon: '👋',
    });
  };

  // ===== Set User Function  =====
  // allows updating user data from other parts of the app(profile page)
  const setUser = (newUser) => {
    setUserState(newUser);
  };

  // The Provider
  const isAuthenticated = !!user;

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    loginWithGoogle,
    logout,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}