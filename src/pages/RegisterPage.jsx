// src/pages/RegisterPage.jsx
// ============================================
// REGISTER PAGE
// ============================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { Eye, EyeOff, Check, X, ArrowRight, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 relative overflow-hidden">
      
      {/* ===== DECORATIVE SHAPES ===== */}
      <div className="absolute top-[-100px] right-[-100px] w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>

      {/* ===== CARD ===== */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50">
          
          {/* ===== CLICKABLE TEXT LOGO ===== */}
          <div className="text-center mb-8">
            <Link 
              to="/" 
              className="text-3xl font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition inline-block"
            >
              ShopVerse
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 mt-4">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Join ShopVerse and start shopping
            </p>
          </div>

          {/* Google Login */}
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
              <span className="px-4 bg-white/80 backdrop-blur-sm text-gray-400">
                Or sign up with email
              </span>
            </div>
          </div>

          {/* Form */}
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
                className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white/70 backdrop-blur-sm"
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
                className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white/70 backdrop-blur-sm"
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
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10 transition bg-white/70 backdrop-blur-sm"
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
                  mt-1 block w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white/70 backdrop-blur-sm
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
                w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium text-white transition-all duration-200
                ${isSubmitting || !allChecksPassed || !passwordsMatch || !name || !email
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5'}
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
                <>
                  Create Account
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1 group">
                Sign in
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
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