import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ToastContainer } from '../ui/ToastContainer';

export default function Layout() {
  const location = useLocation();

  // Scroll to top instantly on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0E0E0E] font-sans text-white w-full max-w-full overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full max-w-full flex flex-col overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
