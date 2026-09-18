import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { getWishlist, addToWishlist as svcAddToWishlist, removeFromWishlist as svcRemoveFromWishlist, isInWishlist as svcIsInWishlist, clearWishlist as svcClearWishlist } from '../services/wishlistService';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    setWishlistItems(getWishlist());
  }, []);

  const addToWishlist = (productId) => {
    const updated = svcAddToWishlist(productId);
    setWishlistItems(updated);
  };

  const removeFromWishlist = (productId) => {
    const updated = svcRemoveFromWishlist(productId);
    setWishlistItems(updated);
  };

  const toggleWishlist = (productId) => {
    if (svcIsInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const clearWishlist = () => {
    const updated = svcClearWishlist();
    setWishlistItems(updated);
  };

  const isInWishlist = (productId) => {
    return wishlistItems.includes(productId);
  };

  const value = useMemo(() => ({
    wishlistItems,
    wishlistCount: wishlistItems.length,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  }), [wishlistItems]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => useContext(WishlistContext);
