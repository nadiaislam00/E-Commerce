import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button, Input, Drawer } from '../ui';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { categories } from '../../data/categories';
import { MegaMenu } from './MegaMenu';
import { MobileNav } from './MobileNav';

export default function Header() {
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const { cartItems, cartCount, cartTotals, updateQuantity, removeFromCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const announcements = [
    'Free shipping on orders over $100',
    'New arrivals every week — Men & Kids',
    'Easy 30-day returns',
  ];

  useEffect(() => {
    if (sessionStorage.getItem('tooba_announcement_dismissed') === 'true') {
      setAnnouncementVisible(false);
    }
  }, []);

  useEffect(() => {
    if (!announcementVisible) return;
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcementVisible]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dismissAnnouncement = () => {
    setAnnouncementVisible(false);
    sessionStorage.setItem('tooba_announcement_dismissed', 'true');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const freeShippingThreshold = 100;
  const progressToFreeShipping = Math.min((cartTotals.subtotal / freeShippingThreshold) * 100, 100);
  const amountToFreeShipping = Math.max(freeShippingThreshold - cartTotals.subtotal, 0);

  return (
    <>
      <header className={`w-full z-40 text-white transition-all duration-250 ${isScrolled ? 'sticky top-0 shadow-[0_4px_24px_rgba(0,0,0,0.7)]' : 'relative'}`}>

        {/* Announcement Bar */}
        {announcementVisible && !isScrolled && (
          <div className="bg-[#C9A84C] text-[#0E0E0E] text-xs py-2 px-8 sm:px-12 flex justify-between items-center relative">
            <div className="flex-1 text-center font-semibold tracking-wide animate-fade-in truncate sm:overflow-visible">
              {announcements[announcementIndex]}
            </div>
            <button
              onClick={dismissAnnouncement}
              className="absolute right-3 sm:right-4 text-[#0E0E0E]/70 hover:text-[#0E0E0E] transition-colors p-1"
              aria-label="Dismiss announcement"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Main Header */}
        <div className="bg-[#141414] border-b border-[#2F2F2F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex items-center justify-between ${isScrolled ? 'h-14' : 'h-16'}`}>

              {/* Mobile Menu */}
              <div className="flex flex-1 items-center lg:hidden">
                <button
                  onClick={() => setIsMobileNavOpen(true)}
                  className="p-2 -ml-2 hover:text-[#C9A84C] transition-colors"
                >
                  <Menu size={22} />
                </button>
              </div>

              {/* Desktop Search */}
              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="relative w-64 group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-[#737373] group-focus-within:text-[#C9A84C] transition-colors" />
                  </div>
                  <form onSubmit={handleSearch} className="w-full">
                    <input
                      type="text"
                      placeholder="Search TOOBA..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchOpen(true)}
                      className="!pl-10 pr-4 py-2 w-full bg-white/8 border border-white/15 focus:border-[#C9A84C]/60 focus:bg-white/12 text-white placeholder-white/35 text-sm rounded-md outline-none transition-all"
                    />
                  </form>
                </div>
              </div>

              {/* Logo */}
              <div className="flex-1 lg:flex-none flex justify-center">
                <Link to="/" className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.25em] text-[#E8C36A]" style={{textShadow: '0 0 24px rgba(232,195,106,0.4)'}}>
                  TOOBA
                </Link>
              </div>

              {/* Right Icons */}
              <div className="flex flex-1 items-center justify-center gap-3 sm:gap-5">
                <button
                  className="p-1 hover:text-[#C9A84C] transition-colors lg:hidden"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <Search size={22} />
                </button>

                <Link
                  to={isAuthenticated ? '/account' : '/login'}
                  className="hidden sm:flex p-1 hover:text-[#C9A84C] transition-colors"
                >
                  <User size={22} />
                </Link>

                <Link
                  to="/wishlist"
                  className="hidden sm:flex p-1 hover:text-[#C9A84C] transition-colors relative"
                >
                  <Heart size={22} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#C9A84C] text-[#0E0E0E] text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-[#141414]">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="p-1 hover:text-[#C9A84C] transition-colors relative"
                >
                  <ShoppingBag size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#C9A84C] text-[#0E0E0E] text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-[#141414]">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Search Expand */}
            {isSearchOpen && (
              <div className="lg:hidden pb-3 px-1 animate-fade-in">
                <form onSubmit={handleSearch} className="relative w-full">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search size={15} className="text-[#737373]" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="!pl-9 pr-3 py-2.5 w-full bg-white/8 border border-white/15 focus:border-[#C9A84C]/60 text-white placeholder-white/35 text-sm rounded-md outline-none"
                  />
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Nav Bar */}
        <div className="hidden lg:block bg-[#181818] border-b border-[#2F2F2F] relative">
          <div className="max-w-7xl mx-auto px-8">
            <nav className="flex justify-center items-center gap-6 lg:gap-10">
              <Link
                to="/shop"
                className="flex items-center h-12 px-2 text-[12px] font-semibold text-white hover:text-[#C9A84C] transition-colors uppercase tracking-[0.2em] whitespace-nowrap"
              >
                Shop All
              </Link>

              {categories.map((category) => (
                <div
                  key={category.id}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Link
                    to={`/category/${category.slug}`}
                    className={`relative flex items-center h-12 px-2 text-[12px] font-semibold transition-colors uppercase tracking-[0.2em] whitespace-nowrap ${hoveredCategory === category.id ? 'text-[#C9A84C]' : 'text-white hover:text-[#C9A84C]'}`}
                  >
                    {category.name}
                    {/* Gold underline indicator */}
                    {hoveredCategory === category.id && (
                      <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#C9A84C] rounded-full" />
                    )}
                  </Link>
                  <MegaMenu
                    category={category}
                    isVisible={hoveredCategory === category.id}
                  />
                </div>
              ))}

              <div className="w-px h-4 bg-white/15 mx-2" />

              <Link
                to="/sale"
                className="flex items-center h-12 px-2 text-[12px] font-semibold text-[#FF8080] hover:text-[#C9A84C] transition-colors uppercase tracking-[0.2em] whitespace-nowrap"
              >
                Sale
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      {/* Cart Drawer */}
      <Drawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        side="right"
        className="w-full sm:w-[400px] bg-[#111111]"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
            <h2 className="text-lg font-serif font-bold text-[#C9A84C] tracking-wide">Your Cart ({cartCount})</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 text-[#737373] hover:text-[#F0EDE6] transition-colors">
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <ShoppingBag size={44} className="text-[#2A2A2A]" />
                <h3 className="text-base font-medium text-[#F0EDE6]">Your cart is empty</h3>
                <p className="text-sm text-[#737373]">Add some pieces to get started.</p>
                <Button onClick={() => setIsCartOpen(false)} className="mt-2">
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Free Shipping Progress */}
                <div className="bg-[#1E1E1E] border border-[#2A2A2A] p-3 rounded-md">
                  {amountToFreeShipping > 0 ? (
                    <p className="text-xs text-[#9A9488] mb-2">
                      <span className="text-[#C9A84C] font-semibold">${amountToFreeShipping.toFixed(2)}</span> away from Free Shipping
                    </p>
                  ) : (
                    <p className="text-xs text-[#3A9E6F] mb-2 font-medium">✓ Free Shipping unlocked!</p>
                  )}
                  <div className="w-full bg-[#2A2A2A] h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C9A84C] h-full transition-all duration-500"
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>

                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-3 bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-lg">
                      <div className="w-18 h-22 shrink-0 bg-[#161616] rounded overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-sm font-medium text-[#F0EDE6] line-clamp-2 leading-snug">{item.name}</h4>
                            <button
                              onClick={() => removeFromCart(item.id, item.color, item.size)}
                              className="text-[#737373] hover:text-[#E05252] shrink-0 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <p className="text-xs text-[#737373] mt-0.5">{item.color} / {item.size}</p>
                          <p className="text-sm font-bold text-[#C9A84C] mt-1">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center border border-[#2A2A2A] rounded">
                            <button
                              onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                              className="px-2 py-1 text-[#9A9488] hover:text-[#C9A84C] disabled:opacity-30 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-7 text-center text-sm font-medium text-[#F0EDE6]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                              className="px-2 py-1 text-[#9A9488] hover:text-[#C9A84C] transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-[#2A2A2A] p-4 bg-[#0E0E0E] space-y-3">
              <div className="flex justify-between text-[#F0EDE6]">
                <span className="text-sm text-[#9A9488]">Subtotal</span>
                <span className="font-bold text-[#C9A84C]">${cartTotals.subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-[#737373]">Shipping & taxes calculated at checkout.</p>
              <div className="grid grid-cols-2 gap-2.5">
                <Button
                  variant="dark"
                  onClick={() => { setIsCartOpen(false); navigate('/cart'); }}
                  className="w-full"
                >
                  View Cart
                </Button>
                <Button
                  onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                  className="w-full"
                >
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
}
