import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button, Badge, PriceDisplay, Rating } from '../ui';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

export function ProductCard({ product }) {
  const { id, name, slug, images, price, originalPrice, discount, rating, reviewCount, colors, sizes, stock, bestseller, newArrival } = product;
  const [isHovered, setIsHovered] = useState(false);

  const cartCtx = useCart ? useCart() : null;
  const addToCart = cartCtx?.addToCart || (() => {});

  const wishlistCtx = useWishlist ? useWishlist() : null;
  const toggleWishlist = wishlistCtx?.toggleWishlist || (() => {});
  const isInWishlist = wishlistCtx?.isInWishlist || (() => false);

  const toastCtx = useToast ? useToast() : null;
  const addToast = toastCtx?.addToast || (() => {});

  const isWished = isInWishlist(id);
  const isOutOfStock = stock === 0;

  const handleQuickView = (e) => { e.preventDefault(); };
  const handleWishlist = (e) => { e.preventDefault(); toggleWishlist(product.id); };
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (isOutOfStock) return;
    addToCart(product);
    addToast({ title: 'Added to Cart', message: `${name} has been added to your cart.`, type: 'success' });
  };

  return (
    <div
      className="group relative flex flex-col bg-[#141414] rounded-lg border border-[#222222] overflow-hidden transition-all duration-300 hover:border-[#C9A84C]/40 hover:shadow-[0_4px_20px_rgba(201,168,76,0.08)] h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <Link to={`/product/${slug}`} className="relative block h-[240px] overflow-hidden bg-[#1A1A1A]">
        {images && images.length > 0 && (
          <>
            <img
              src={images[0]}
              alt={name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${isHovered && images.length > 1 ? 'opacity-0' : 'opacity-100'}`}
            />
            {images.length > 1 && (
              <img
                src={images[1]}
                alt={name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
          </>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 backdrop-blur-[1px]">
            <span className="text-[#9A9488] font-semibold text-xs tracking-[0.2em] uppercase">Out of Stock</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {!isOutOfStock && (
            <>
              {newArrival && (
                <span className="bg-[#C9A84C] text-[#0E0E0E] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  New
                </span>
              )}
              {discount > 0 && (
                <span className="bg-[#E05252] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  -{discount}%
                </span>
              )}
              {bestseller && (
                <span className="bg-[#1E1E1E] text-[#C9A84C] border border-[#C9A84C]/40 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  Best
                </span>
              )}
            </>
          )}
          {isOutOfStock && (
            <span className="bg-[#1E1E1E] text-[#737373] border border-[#2A2A2A] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-[#0E0E0E]/80 hover:bg-[#0E0E0E] text-[#737373] hover:text-[#C9A84C] transition-all border border-[#2A2A2A]"
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWished ? 'fill-[#C9A84C] text-[#C9A84C]' : ''}`} />
        </button>

        {/* Quick View */}
        <div className={`absolute bottom-0 left-0 right-0 p-2.5 transition-all duration-200 z-10 ${isHovered && !isOutOfStock ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <button
            onClick={handleQuickView}
            className="w-full bg-[#C9A84C] text-[#0E0E0E] hover:bg-[#E0BC6A] py-2 px-3 text-xs font-bold rounded tracking-wide transition-colors"
          >
            Quick View
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3.5 flex flex-col flex-grow">
        {/* Color swatches */}
        {colors && colors.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2">
            {colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-3.5 h-3.5 rounded-full border border-[#2A2A2A] cursor-pointer hover:ring-1 hover:ring-[#C9A84C] hover:ring-offset-1 hover:ring-offset-[#141414] transition-all"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {colors.length > 4 && (
              <span className="text-[11px] text-[#737373] ml-0.5">+{colors.length - 4}</span>
            )}
          </div>
        )}

        <Link to={`/product/${slug}`} className="mb-1">
          <h3 className="text-sm font-medium text-[#D0CCC6] line-clamp-1 hover:text-[#C9A84C] transition-colors">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2.5">
          <Rating rating={rating} size="sm" />
          <span className="text-[11px] text-[#737373]">({reviewCount})</span>
        </div>

        <div className="mt-auto">
          <PriceDisplay price={price} originalPrice={originalPrice} discount={discount} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
