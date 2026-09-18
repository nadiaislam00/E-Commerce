import React, { createContext, useReducer, useEffect, useContext, useMemo } from 'react';
import { getCart, addToCart as svcAddToCart, removeFromCart as svcRemoveFromCart, updateQuantity as svcUpdateQuantity, clearCart as svcClearCart, applyCoupon as svcApplyCoupon, getCartTotals } from '../services/cartService';

const CartContext = createContext();

const initialState = {
  items: [],
  coupon: null,
  totals: { subtotal: 0, discount: 0, shipping: 0, tax: 0, total: 0 },
};

const cartReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'INIT_CART':
      newState = { ...state, items: action.payload.items, coupon: action.payload.coupon };
      break;
    case 'ADD_TO_CART':
    case 'REMOVE_FROM_CART':
    case 'UPDATE_QUANTITY':
    case 'CLEAR_CART':
      newState = { ...state, items: action.payload.items, coupon: action.payload.coupon };
      break;
    case 'APPLY_COUPON':
      newState = { ...state, coupon: action.payload };
      break;
    case 'REMOVE_COUPON':
      newState = { ...state, coupon: null };
      break;
    default:
      return state;
  }
  
  newState.totals = getCartTotals(newState.items, newState.coupon);
  return newState;
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = getCart();
    dispatch({ type: 'INIT_CART', payload: savedCart });
  }, []);

  const addToCart = (product, color, size, quantity) => {
    const newCart = svcAddToCart(product, color, size, quantity);
    dispatch({ type: 'ADD_TO_CART', payload: newCart });
  };

  const removeFromCart = (itemId) => {
    const newCart = svcRemoveFromCart(itemId);
    dispatch({ type: 'REMOVE_FROM_CART', payload: newCart });
  };

  const updateQuantity = (itemId, quantity) => {
    const newCart = svcUpdateQuantity(itemId, quantity);
    dispatch({ type: 'UPDATE_QUANTITY', payload: newCart });
  };

  const clearCart = () => {
    const newCart = svcClearCart();
    dispatch({ type: 'CLEAR_CART', payload: newCart });
  };

  const applyCoupon = (code) => {
    const result = svcApplyCoupon(code);
    if (result.success) {
      dispatch({ type: 'APPLY_COUPON', payload: result.coupon });
    }
    return result;
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
    const cart = getCart();
    cart.coupon = null;
    localStorage.setItem('loom_cart', JSON.stringify(cart));
  };

  const cartCount = state.items.reduce((count, item) => count + item.quantity, 0);

  const value = useMemo(() => ({
    cartItems: state.items,
    cartTotals: state.totals,
    cartCoupon: state.coupon,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    clearCart,
  }), [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
