// src/components/common/NewsletterSignup.jsx
import { useState } from 'react';
import { subscribeToNewsletter } from '../../services/newsletter';
import { Mail, Check, X, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewsletterSignup({ 
  title = 'Subscribe to Our Newsletter',
  description = 'Get the latest updates on new products and special offers!',
  buttonText = 'Subscribe',
  placeholder = 'Enter your email',
  className = '',
  variant = 'default' // 'default' | 'compact' | 'minimal'
}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      await subscribeToNewsletter(email, name);
      setIsSuccess(true);
      setEmail('');
      setName('');
      toast.success('Successfully subscribed! 🎉', {
        icon: '📧',
        duration: 4000,
      });
    } catch (error) {
      toast.error(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess && variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 text-green-600 ${className}`}>
        <Check className="w-5 h-5" />
        <span className="text-sm">Subscribed successfully!</span>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}>
        <div className="flex justify-center mb-3">
          <div className="bg-green-100 rounded-full p-3">
            <Check className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <h4 className="text-lg font-semibold text-green-800">You're Subscribed! 🎉</h4>
        <p className="text-sm text-green-600 mt-1">
          Thank you for subscribing to our newsletter. You'll receive updates on new products and special offers.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-3 text-sm text-green-700 hover:text-green-800 underline"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className={`flex items-center gap-2 ${className}`}>
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`
            flex items-center gap-1 px-4 py-2 rounded-lg text-white font-medium transition whitespace-nowrap
            ${isLoading 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700'}
          `}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Send className="w-4 h-4" />
          )}
          {buttonText}
        </button>
      </form>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="bg-indigo-100 rounded-full p-2 flex-shrink-0">
          <Mail className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {description}
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  disabled={isLoading}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition whitespace-nowrap
                  ${isLoading 
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700'}
                `}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {buttonText}
              </button>
            </div>
            <p className="text-xs text-gray-400">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}