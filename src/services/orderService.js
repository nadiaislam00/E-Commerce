import { generateId } from '../utils/formatters';

const ORDERS_KEY = 'loom_orders';

export const getOrders = () => {
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

const saveOrders = (orders) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const getOrderById = (id) => {
  const orders = getOrders();
  return orders.find((o) => o.id === id) || null;
};

export const createOrder = (orderData) => {
  const orders = getOrders();
  const newOrder = {
    id: `ORD-${generateId().substring(0, 6).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: 'processing',
    ...orderData
  };
  
  orders.unshift(newOrder);
  saveOrders(orders);
  return newOrder;
};
