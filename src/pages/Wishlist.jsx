import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, ShoppingCart, Trash2, X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Button, EmptyState } from '../components/ui';
import ProductCard from '../components/product/ProductCard';
import products from '../data/products';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, wishlistCount, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const [activeSizeDropdown, setActiveSizeDropdown] = useState(null);

  const wishlistedProducts = products.filter(p => wishlistItems.includes(p.id));

  const handleMoveToCart = (product, size = null) => {
    if (product.sizes && product.sizes.length > 0 && !size) {
      // Need to select size first
      setActiveSizeDropdown(activeSizeDropdown === product.id ? null : product.id);
      return;
    }
    
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images?.[0] || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
      price: product.price,
      originalPrice: product.originalPrice,
      color: product.colors?.[0]?.name, // default to first color if any
      size: size || product.sizes?.[0], // default size or selected
      quantity: 1
    });
    
    removeFromWishlist(product.id);
    setActiveSizeDropdown(null);
    addToast({ title: 'Added to Cart', description: `${product.name} moved to cart.`, type: 'success' });
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-[#737373] mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">My Wishlist</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-editorial font-bold text-white mb-2">My Wishlist</h1>
            <p className="text-[#A3A3A3]">{wishlistCount} {wishlistCount === 1 ? 'item' : 'items'}</p>
          </div>
          {wishlistCount > 0 && (
            <button 
              onClick={clearWishlist}
              className="text-sm text-[#737373] hover:text-[#E05252] transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" /> Clear Wishlist
            </button>
          )}
        </div>

        {wishlistCount === 0 ? (
          <div className="bg-[#141414] rounded-xl border border-[#2F2F2F] p-12 max-w-2xl mx-auto text-center mt-12">
            <EmptyState 
              icon={Heart}
              title="Your wishlist is empty"
              description="Save items you love to your wishlist to review or buy them later."
              action={
                <Button as={Link} to="/shop" variant="primary" className="mt-6 !bg-[#C9A84C] !text-[#0E0E0E]">
                  Start Shopping
                </Button>
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map(product => (
              <div key={product.id} className="group relative flex flex-col">
                <ProductCard product={product} />
                
                <div className="mt-4 flex flex-col gap-2">
                  <div className="relative">
                    {activeSizeDropdown === product.id ? (
                      <div className="absolute bottom-full left-0 w-full mb-2 bg-[#141414] border border-[#2F2F2F] rounded-lg shadow-lg z-10 overflow-hidden">
                        <div className="flex justify-between items-center p-2 bg-[#1E1E1E] border-b border-[#2F2F2F]">
                          <span className="text-xs font-medium text-white">Select Size</span>
                          <button onClick={() => setActiveSizeDropdown(null)} className="text-[#737373] hover:text-white">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="max-h-40 overflow-y-auto p-2 grid grid-cols-2 gap-2">
                          {product.sizes.map(size => (
                            <button
                              key={size}
                              onClick={() => handleMoveToCart(product, size)}
                              className="text-sm py-1 px-2 border border-[#2F2F2F] text-white rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    
                    <Button 
                      onClick={() => handleMoveToCart(product)} 
                      variant="primary" 
                      className="w-full flex items-center justify-center gap-2 !bg-[#C9A84C] !text-[#0E0E0E] hover:!bg-[#E0BC6A]"
                    >
                      <ShoppingCart className="w-4 h-4" /> Move to Cart
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={() => removeFromWishlist(product.id)} 
                    variant="outline" 
                    className="w-full text-[#A3A3A3] hover:text-[#E05252] hover:border-[#E05252] border border-[#2F2F2F]"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
