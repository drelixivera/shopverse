// src/components/layout/Footer.jsx
// ============================================
// FOOTER - WITH ABOUT PAGE LINK
// ============================================

import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import NewsletterSignup from '../common/NewsletterSignup';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      {/* ===== MAIN FOOTER ===== */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* ===== Brand Column ===== */}
          <div>
            <Link to="/" className="text-2xl font-bold text-white">
              ShopVerse
            </Link>
            <p className="text-gray-400 text-sm mt-3 max-w-xs">
              Your one-stop shop for premium products. Quality guaranteed, satisfaction assured.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Facebook">
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Twitter">
                <span className="text-xl">🐦</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
                <span className="text-xl">📸</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="YouTube">
                <span className="text-xl">▶️</span>
              </a>
            </div>
          </div>

          {/* ===== Quick Links ===== */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              {/* ✅ About Link */}
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition">
                  About
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

          {/* ===== Support ===== */}
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

          {/* ===== Contact ===== */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>support@shopverse.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>123 Main St, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ===== Trust Badges ===== */}
        <div className="flex flex-wrap justify-center gap-8 mt-10 pt-8 border-t border-gray-800">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span className="text-xl">🔒</span>
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span className="text-xl">🚚</span>
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span className="text-xl">🔄</span>
            <span>30-Day Returns</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span className="text-xl">💬</span>
            <span>24/7 Support</span>
          </div>
        </div>

        {/* ===== Bottom Bar ===== */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>
            © 2024 ShopVerse. Built with <Heart className="inline w-4 h-4 text-red-500" /> using React
          </p>
          <p className="mt-1 text-xs text-gray-600">
            Learning project - All data is fake
          </p>
        </div>
      </div>
    </footer>
  );
}