// src/components/layout/Layout.jsx
// ============================================
// LAYOUT - HIDES NAVBAR, FOOTER, AND FAB ON AUTH PAGES
// ============================================

import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingActionMenu from '../common/FloatingActionMenu';

export default function Layout({ children }) {
  const location = useLocation();
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Hide navbar on auth pages */}
      {!isAuthPage && <Navbar />}
      <main className={`flex-grow ${!isAuthPage ? 'container mx-auto px-4 py-8' : ''}`}>
        {children}
      </main>
      {!isAuthPage && (
        <>
          <Footer />
          <FloatingActionMenu />
        </>
      )}
    </div>
  );
}