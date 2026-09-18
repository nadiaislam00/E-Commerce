import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, ChevronUp, User, Heart, HelpCircle, LogOut } from 'lucide-react';
import { categories } from '../../data/categories';
import { Drawer } from '../ui';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';

export const MobileNav = ({ isOpen, onClose }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const { user, isAuthenticated, logout } = useAuth();
  const { wishlistCount } = useWishlist();

  const toggleCategory = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} side="left" className="w-[85vw] max-w-sm bg-[#0E0E0E]">
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A] shrink-0">
          <Link to="/" onClick={onClose} className="font-serif text-2xl font-bold tracking-[0.2em] text-[#C9A84C]">
            TOOBA
          </Link>
          <button onClick={onClose} className="p-2 -mr-2 text-[#737373] hover:text-[#C9A84C] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 py-2">
          <ul>
            <li className="border-b border-[#1E1E1E] px-3">
              <Link
                to="/shop"
                onClick={onClose}
                className="w-full flex items-center px-2 py-4 text-[13px] font-medium text-[#9A9488] hover:text-[#C9A84C] transition-colors uppercase tracking-widest"
              >
                Shop All
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id} className="border-b border-[#1E1E1E] last:border-0 px-3">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between px-2 py-4 text-left text-[13px] font-medium text-[#9A9488] hover:text-[#C9A84C] transition-colors uppercase tracking-widest"
                >
                  <span>{category.name}</span>
                  {expandedCategory === category.id
                    ? <ChevronUp className="w-4 h-4 text-[#C9A84C]" />
                    : <ChevronDown className="w-4 h-4 text-[#737373]" />
                  }
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedCategory === category.id ? 'max-h-[400px] opacity-100 pb-3' : 'max-h-0 opacity-0'}`}>
                  <ul className="space-y-0.5 px-2 pt-1">
                    <li>
                      <Link
                        to={`/category/${category.slug}`}
                        onClick={onClose}
                        className="block py-2 text-sm text-[#C9A84C] font-semibold hover:text-[#E0BC6A] transition-colors"
                      >
                        Shop All {category.name}
                      </Link>
                    </li>
                    {category.subcategories?.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          to={`/category/${category.slug}/${sub.slug}`}
                          onClick={onClose}
                          className="block py-1.5 text-sm text-[#737373] hover:text-[#C9A84C] transition-colors"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
            <li className="px-3 pt-1">
              <Link
                to="/sale"
                onClick={onClose}
                className="w-full flex items-center px-2 py-4 text-[13px] font-bold text-[#E05252] hover:text-[#C9A84C] transition-colors uppercase tracking-widest"
              >
                Sale
              </Link>
            </li>
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#111111] border-t border-[#2A2A2A] p-4 space-y-0.5 shrink-0">
          {isAuthenticated && (
            <div className="mb-3 pb-3 border-b border-[#2A2A2A]">
              <p className="text-xs text-[#737373] mb-0.5">Welcome back,</p>
              <p className="text-sm font-semibold text-[#C9A84C]">{user?.name || 'User'}</p>
            </div>
          )}

          {[
            { to: isAuthenticated ? '/account' : '/login', label: isAuthenticated ? 'My Account' : 'Sign In / Register', icon: <User className="w-4 h-4" /> },
            { to: '/wishlist', label: `Wishlist${wishlistCount > 0 ? ` (${wishlistCount})` : ''}`, icon: <Heart className="w-4 h-4" /> },
            { to: '/help', label: 'Help & Support', icon: <HelpCircle className="w-4 h-4" /> },
          ].map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className="flex items-center gap-3 py-2.5 px-2 text-sm text-[#9A9488] hover:text-[#C9A84C] rounded transition-colors"
            >
              <span className="text-[#737373]">{icon}</span>
              {label}
            </Link>
          ))}

          {isAuthenticated && (
            <button
              onClick={() => { logout(); onClose(); }}
              className="w-full flex items-center gap-3 py-2.5 px-2 text-sm text-[#E05252] hover:text-red-400 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          )}
        </div>
      </div>
    </Drawer>
  );
};
