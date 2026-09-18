import React from 'react';
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Package, Heart, MapPin, User, Clock, LogOut } from 'lucide-react';

export default function AccountLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/account', icon: LayoutDashboard, exact: true },
    { name: 'My Orders', path: '/account/orders', icon: Package },
    { name: 'Wishlist', path: '/account/wishlist', icon: Heart },
    { name: 'Addresses', path: '/account/addresses', icon: MapPin },
    { name: 'Profile Settings', path: '/account/profile', icon: User },
    { name: 'Recently Viewed', path: '/account/recently-viewed', icon: Clock },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-60 shrink-0">
          <div className="bg-[#FAFAF7] border border-[#E5E1DB] rounded-lg p-6 mb-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-[#1B2A4A] text-white rounded-full flex items-center justify-center text-2xl font-editorial mb-3">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
            </div>
            <h2 className="font-semibold text-[#1A1A1A]">{user?.name || 'User'}</h2>
            <p className="text-sm text-[#6B6B6B]">{user?.email || 'user@example.com'}</p>
          </div>

          <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 hide-scrollbar">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md transition-colors whitespace-nowrap lg:whitespace-normal ${
                    isActive
                      ? 'bg-[#1B2A4A] text-white'
                      : 'text-[#6B6B6B] hover:bg-[#F2EDE8] hover:text-[#1A1A1A]'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.name}</span>
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-md transition-colors whitespace-nowrap lg:whitespace-normal text-[#D4544A] hover:bg-red-50 mt-auto lg:mt-4"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
