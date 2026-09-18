import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Direct synchronous page imports for instant, glitch-free navigation
import Home from './pages/Home';
import Shop from './pages/Shop';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Login from './pages/Login';
import Register from './pages/Register';
import FlashSale from './pages/FlashSale';
import Compare from './pages/Compare';

// Account pages
import AccountLayout from './pages/account/AccountLayout';
import Dashboard from './pages/account/Dashboard';
import Orders from './pages/account/Orders';
import OrderDetail from './pages/account/OrderDetail';
import Profile from './pages/account/Profile';
import Addresses from './pages/account/Addresses';
import Settings from './pages/account/Settings';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/category/:slug/:sub" element={<Category />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sale" element={<FlashSale />} />
        <Route path="/flash-sale" element={<FlashSale />} />
        <Route path="/collections/:collection" element={<Shop />} />
        <Route path="/compare" element={<Compare />} />

        {/* Account routes */}
        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<OrderDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-[#C9A84C] mb-4 font-editorial">404</h1>
      <p className="text-xl text-white mb-2">Page Not Found</p>
      <p className="text-[#A3A3A3] mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#C9A84C] text-white rounded-md font-medium hover:bg-[#C9A84C]-light transition-colors inline-block"
      >
        Back to Home
      </Link>
    </div>
  );
}
