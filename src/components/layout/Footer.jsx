// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import NewsletterSignup from '../common/NewsletterSignup';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <NewsletterSignup 
              variant="compact"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              ShopVerse
            </h3>
            <p className="text-gray-400 text-sm">
              Your one-stop shop for premium products. Quality guaranteed, satisfaction assured.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                📘 Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                🐦 Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                📸 Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-400 hover:text-white transition">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white transition">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Returns Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>support@shopverse.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>123 Main St, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          <p>
            © 2024 ShopVerse. Built with <Heart className="inline w-4 h-4 text-red-500" /> using React
          </p>
          <p className="mt-1 text-xs">
            Learning project - All data is fake
          </p>
        </div>
      </div>
    </footer>
  );
}