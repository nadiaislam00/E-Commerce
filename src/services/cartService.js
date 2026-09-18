const CART_KEY = 'loom_cart';
import { generateId } from '../utils/formatters';

const coupons = {
  'WELCOME10': { type: 'percent', value: 10 },
  'MINUS20': { type: 'fixed', value: 20 },
};

export const getCart = () => {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : { items: [], coupon: null };
  } catch (error) {
    return { items: [], coupon: null };
  }
};

const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product, color, size, quantity = 1) => {
  const cart = getCart();
  const prodId = product.productId || product.id;
  const itemColor = color || product.color || '';
  const itemSize = size || product.size || '';
  const itemQty = typeof quantity === 'number' && quantity > 0 ? quantity : (product.quantity || 1);
  const itemSlug = product.slug || (product.name ? product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : prodId);
  const itemImage = product.image || (product.images && product.images[0]) || '';
  const itemPrice = typeof product.price === 'number' ? product.price : 0;
  const itemName = product.name || 'Product';

  const existingItemIndex = cart.items.findIndex(
    (item) => (item.productId === prodId || item.id === product.id) && item.color === itemColor && item.size === itemSize
  );

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += itemQty;
  } else {
    cart.items.push({
      id: generateId(),
      productId: prodId,
      name: itemName,
      slug: itemSlug,
      image: itemImage,
      product: product,
      color: itemColor,
      size: itemSize,
      quantity: itemQty,
      price: itemPrice,
    });
  }

  saveCart(cart);
  return cart;
};

export const removeFromCart = (itemId) => {
  const cart = getCart();
  cart.items = cart.items.filter((item) => item.id !== itemId);
  saveCart(cart);
  return cart;
};

export const updateQuantity = (itemId, quantity) => {
  const cart = getCart();
  const item = cart.items.find((item) => item.id === itemId);
  if (item) {
    item.quantity = Math.max(1, quantity);
  }
  saveCart(cart);
  return cart;
};

export const clearCart = () => {
  const cart = { items: [], coupon: null };
  saveCart(cart);
  return cart;
};

export const applyCoupon = (code) => {
  const cart = getCart();
  const coupon = coupons[code.toUpperCase()];
  if (coupon) {
    cart.coupon = { code: code.toUpperCase(), ...coupon };
    saveCart(cart);
    return { success: true, message: 'Coupon applied successfully', coupon: cart.coupon };
  }
  return { success: false, message: 'Invalid coupon code' };
};

export const getCartTotals = (items, coupon) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;

  if (coupon) {
    if (coupon.type === 'percent') {
      discount = subtotal * (coupon.value / 100);
    } else if (coupon.type === 'fixed') {
      discount = coupon.value;
    }
  }

  discount = Math.min(discount, subtotal);
  const afterDiscount = subtotal - discount;
  const shipping = afterDiscount > 100 || items.length === 0 ? 0 : 15;
  const tax = afterDiscount * 0.08;
  const total = afterDiscount + shipping + tax;

  return {
    subtotal,
    discount,
    shipping,
    tax,
    total,
  };
};
