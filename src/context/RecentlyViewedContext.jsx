import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const RecentlyViewedContext = createContext();

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('loom_recently_viewed', []);

  const addToRecentlyViewed = (productId) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      const updated = [productId, ...filtered].slice(0, 20);
      return updated;
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  const value = useMemo(() => ({
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
  }), [recentlyViewed]);

  return <RecentlyViewedContext.Provider value={value}>{children}</RecentlyViewedContext.Provider>;
};

export const useRecentlyViewed = () => useContext(RecentlyViewedContext);
