import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Trash2, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { Button, Input, EmptyState, QuantitySelector, PriceDisplay, ProgressBar } from '../components/ui';
import ProductCard from '../components/product/ProductCard';
import products from '../data/products';

export default function Cart() {
  const { cartItems, cartTotals, cartCount, updateQuantity, removeFromCart, applyCoupon, removeCoupon } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    
    // Mock validation
    if (couponCode.toUpperCase() === 'WELCOME10' || couponCode.toUpperCase() === 'SAVE20') {
      applyCoupon(couponCode.toUpperCase());
      addToast({ title: 'Success', description: 'Coupon applied successfully!', type: 'success' });
      setCouponCode('');
    } else {
      addToast({ title: 'Error', description: 'Invalid or expired coupon code.', type: 'error' });
    }
  };

  const handleMoveToWishlist = (item) => {
    if (!isInWishlist(item.productId)) {
      toggleWishlist(item.productId);
    }
    removeFromCart(item.id);
    addToast({ title: 'Moved to Wishlist', description: `${item.name} has been moved to your wishlist.`, type: 'success' });
  };

  const freeShippingThreshold = 100;
  const subtotal = cartTotals?.subtotal || 0;
  const distanceToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Suggested products (exclude items already in cart)
  const cartProductIds = cartItems.map(item => item.productId);
  const suggestedProducts = products.filter(p => !cartProductIds.includes(p.id)).slice(0, 4);

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-8">
            <Link to="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1A1A1A]">Shopping Cart</span>
          </nav>
          
          <div className="bg-white rounded-xl border border-[#E5E1DB] p-12 max-w-2xl mx-auto text-center">
            <EmptyState 
              icon={<ShoppingBag className="w-12 h-12 text-[#9B9B9B]" />}
              title="Your cart is empty"
              description="Looks like you haven't added anything to your cart yet."
              action={
                <Button as={Link} to="/shop" variant="primary" className="mt-6">
                  Continue Shopping
                </Button>
              }
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-8">
          <Link to="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#1A1A1A]">Shopping Cart</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-8">
          Shopping Cart <span className="text-[#6B6B6B] text-xl font-sans font-normal">({cartCount} items)</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-[60%] flex flex-col gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-6 py-6 border-b border-[#E5E1DB] first:pt-0">
                <Link to={`/product/${item.slug || item.productId || ''}`} className="w-20 sm:w-24 h-28 sm:h-32 bg-[#F2EDE8] rounded-md overflow-hidden flex-shrink-0 block">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex justify-between gap-2 sm:gap-4">
                    <div className="min-w-0">
                      <Link to={`/product/${item.slug || item.productId || ''}`} className="text-base sm:text-lg font-medium text-[#1A1A1A] hover:text-[#C8956C] transition-colors block truncate">
                        {item.name}
                      </Link>
                      <div className="text-sm text-[#6B6B6B] mt-1 space-y-1">
                        {item.color && <p>Color: {item.color}</p>}
                        {item.size && <p>Size: {item.size}</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <PriceDisplay price={item.price} originalPrice={item.originalPrice} />
                      <div className="text-sm text-[#1A1A1A] font-medium mt-2">
                        Total: ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <QuantitySelector 
                      quantity={item.quantity} 
                      onIncrease={() => updateQuantity(item.id, item.quantity + 1)} 
                      onDecrease={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} 
                    />
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleMoveToWishlist(item)}
                        className="text-sm flex items-center gap-1 text-[#6B6B6B] hover:text-[#C8956C] transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        <span className="hidden sm:inline">Move to Wishlist</span>
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm flex items-center gap-1 text-[#6B6B6B] hover:text-[#D4544A] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-[40%]">
            <div className="bg-white border border-[#E5E1DB] rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-serif text-[#1A1A1A] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-[#1A1A1A]">
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Subtotal</span>
                  <span>${cartTotals.subtotal.toFixed(2)}</span>
                </div>
                
                {cartTotals.discount > 0 && (
                  <div className="flex justify-between text-[#2D8B57]">
                    <span className="flex items-center gap-2">
                      Discount
                      <button onClick={removeCoupon} className="text-xs underline hover:text-[#1e613c]">Remove</button>
                    </span>
                    <span>-${cartTotals.discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Estimated Shipping</span>
                  <span>{cartTotals.shipping === 0 ? 'Free' : `$${cartTotals.shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Estimated Tax</span>
                  <span>${cartTotals.tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-[#E5E1DB] pt-4 mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-lg font-medium text-[#1A1A1A]">Total</span>
                  <span className="text-2xl font-semibold text-[#1A1A1A]">${cartTotals.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-6">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <Input 
                    type="text" 
                    placeholder="Promo code" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" variant="outline">Apply</Button>
                </form>
              </div>

              <div className="mb-6 bg-[#F2EDE8] p-4 rounded-lg">
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span className="text-[#1A1A1A]">Free Shipping</span>
                  <span className="text-[#1A1A1A]">
                    {distanceToFreeShipping > 0 ? `$${distanceToFreeShipping.toFixed(2)} more to go` : 'Goal reached!'}
                  </span>
                </div>
                <ProgressBar progress={progressPercent} color={distanceToFreeShipping > 0 ? 'bg-[#C8956C]' : 'bg-[#2D8B57]'} />
                <p className="text-xs text-[#6B6B6B] mt-2">
                  {distanceToFreeShipping > 0 
                    ? `Add $${distanceToFreeShipping.toFixed(2)} more to your cart to qualify for free shipping.` 
                    : 'You qualify for free shipping!'}
                </p>
              </div>

              <Button variant="primary" className="w-full flex items-center justify-center gap-2 py-3 text-lg">
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Button>
              
              <div className="mt-4 text-center">
                <Link to="/shop" className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] underline transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Products */}
        {suggestedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-serif text-[#1A1A1A] mb-8 border-b border-[#E5E1DB] pb-4">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {suggestedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
