// src/pages/RegisterPage.jsx
// ============================================
// REGISTER PAGE - SPLIT SCREEN (DESKTOP) / CENTERED FORM (MOBILE)
// ============================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { Eye, EyeOff, Check, X, CheckCircle, ShoppingBag, Shield, Clock } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const passwordChecks = {
    length: password.length >= 6,
    hasNumber: /\d/.test(password),
    hasLetter: /[a-zA-Z]/.test(password),
  };

  const allChecksPassed = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) return;
    if (!allChecksPassed || !passwordsMatch) return;

    setIsSubmitting(true);
    const result = await register(name, email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/');
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const result = loginWithGoogle(credentialResponse);
    if (result.success) {
      navigate('/');
    }
  };

  const handleGoogleError = () => {
    console.log('Google login failed');
  };

  return (
    <div className="min-h-screen flex">
      
      {/* ===== LEFT SIDE - BRANDING (DESKTOP ONLY) ===== */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">🛍️</span>
            <span className="text-2xl font-bold">ShopVerse</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">
            Join the Family! 🎉
          </h1>
          <p className="text-lg text-indigo-100 max-w-md">
            Create your account and start discovering amazing products curated just for you.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-indigo-100">
              <CheckCircle className="w-5 h-5 text-indigo-300" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-indigo-100">
              <Shield className="w-5 h-5 text-indigo-300" />
              <span>100% secure payments</span>
            </div>
            <div className="flex items-center gap-3 text-indigo-100">
              <Clock className="w-5 h-5 text-indigo-300" />
              <span>24/7 customer support</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-indigo-200">
          <p>Join 10,000+ happy customers</p>
        </div>
      </div>

      {/* ===== RIGHT SIDE - REGISTER FORM (FULL WIDTH ON MOBILE) ===== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-white min-h-screen lg:min-h-0">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <span className="text-3xl">🛍️</span>
            <span className="text-2xl font-bold text-indigo-600 ml-2">ShopVerse</span>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center lg:text-left">
              Create Account
            </h2>
            <p className="text-gray-500 mt-1 text-center lg:text-left">
              Join ShopVerse and start shopping
            </p>
          </div>

          {/* Google Login Button */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              theme="outline"
              size="large"
              shape="pill"
              text="signup_with"
            />
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400">
                Or sign up with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10 transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            {password && (
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">Password must:</p>
                <div className="space-y-1">
                  <PasswordCheck passed={passwordChecks.length} text="Be at least 6 characters" />
                  <PasswordCheck passed={passwordChecks.hasNumber} text="Contain at least one number" />
                  <PasswordCheck passed={passwordChecks.hasLetter} text="Contain at least one letter" />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`
                  mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition
                  ${confirmPassword && !passwordsMatch ? 'border-red-500' : 'border-gray-200'}
                `}
                placeholder="••••••••"
              />
              {confirmPassword && !passwordsMatch && (
                <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !allChecksPassed || !passwordsMatch || !name || !email}
              className={`
                w-full flex justify-center py-2.5 px-4 rounded-lg text-sm font-medium text-white transition
                ${isSubmitting || !allChecksPassed || !passwordsMatch || !name || !email
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}
              `}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Sign in →
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function PasswordCheck({ passed, text }) {
  return (
    <div className="flex items-center gap-2">
      {passed ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <X className="w-4 h-4 text-gray-400" />
      )}
      <span className={passed ? 'text-green-600' : 'text-gray-500'}>
        {text}
      </span>
    </div>
  );
}