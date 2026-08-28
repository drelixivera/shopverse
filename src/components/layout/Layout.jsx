// src/components/layout/Layout.jsx
// ============================================
// LAYOUT - WITH FLOATING ACTION MENU
// ============================================

import Navbar from './Navbar';
import Footer from './Footer';
import FloatingActionMenu from '../common/FloatingActionMenu';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
      <FloatingActionMenu />
    </div>
  );
}