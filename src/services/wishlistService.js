const WISHLIST_KEY = 'loom_wishlist';

export const getWishlist = () => {
  try {
    const data = localStorage.getItem(WISHLIST_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed.filter(item => typeof item === 'string') : [];
  } catch (error) {
    return [];
  }
};

const saveWishlist = (wishlist) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
};

export const addToWishlist = (productId) => {
  const wishlist = getWishlist();
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    saveWishlist(wishlist);
  }
  return wishlist;
};

export const removeFromWishlist = (productId) => {
  const wishlist = getWishlist();
  const updated = wishlist.filter((id) => id !== productId);
  saveWishlist(updated);
  return updated;
};

export const isInWishlist = (productId) => {
  const wishlist = getWishlist();
  return wishlist.includes(productId);
};

export const clearWishlist = () => {
  saveWishlist([]);
  return [];
};
