import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useLocalStorage('loom_compare', []);
  const { addToast } = useToast();

  const addToCompare = (productId) => {
    if (compareItems.includes(productId)) {
      addToast('Product is already in comparison list', 'info');
      return;
    }
    
    if (compareItems.length >= 4) {
      addToast('You can compare up to 4 products at a time', 'warning');
      return;
    }

    setCompareItems((prev) => [...prev, productId]);
    addToast('Product added to comparison', 'success');
  };

  const removeFromCompare = (productId) => {
    setCompareItems((prev) => prev.filter((id) => id !== productId));
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  const isInCompare = (productId) => {
    return compareItems.includes(productId);
  };

  const value = useMemo(() => ({
    compareItems,
    addToCompare,
    removeFromCompare,
    isInCompare,
    clearCompare,
    compareCount: compareItems.length,
  }), [compareItems]);

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
};

export const useCompare = () => useContext(CompareContext);
