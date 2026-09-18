export const orders = [
  {
    id: 'ord_001', orderNumber: 'ORD-1001', date: '2026-09-02T10:00:00.000Z', status: 'delivered',
    items: [
      { productId: 'prod_001', name: 'Classic Oxford Cloth Button-Down', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80', color: 'Navy', size: 'M', quantity: 1, price: 78 }
    ],
    subtotal: 78, discount: 0, shipping: 10, tax: 7.02, total: 95.02,
    shippingAddress: {
      id: 'addr_1', label: 'Home', name: 'David Smith', phone: '+1 (555) 123-4567',
      address: '123 Loom Street, Apt 4B', city: 'New York', state: 'NY', country: 'USA', postalCode: '10001', isDefault: true
    },
    paymentMethod: { id: 'pm_1', type: 'Visa', last4: '4242', expiry: '12/28', isDefault: true },
    timeline: [
      { status: 'placed', date: '2026-09-02T10:00:00.000Z', description: 'Order placed successfully' },
      { status: 'shipped', date: '2026-09-03T10:00:00.000Z', description: 'Order shipped via Express' },
      { status: 'delivered', date: '2026-09-05T10:00:00.000Z', description: 'Order delivered to recipient' }
    ],
    trackingNumber: 'TRK987654321'
  },
  {
    id: 'ord_002', orderNumber: 'ORD-1002', date: '2026-09-14T10:00:00.000Z', status: 'shipped',
    items: [
      { productId: 'prod_005', name: 'Heavyweight Supima Cotton Tee', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80', color: 'White', size: 'L', quantity: 2, price: 45 }
    ],
    subtotal: 90, discount: 9.0, shipping: 0, tax: 7.29, total: 88.29,
    shippingAddress: {
      id: 'addr_1', label: 'Home', name: 'David Smith', phone: '+1 (555) 123-4567',
      address: '123 Loom Street, Apt 4B', city: 'New York', state: 'NY', country: 'USA', postalCode: '10001', isDefault: true
    },
    paymentMethod: { id: 'pm_1', type: 'Visa', last4: '4242', expiry: '12/28', isDefault: true },
    timeline: [
      { status: 'placed', date: '2026-09-14T10:00:00.000Z', description: 'Order placed successfully' },
      { status: 'shipped', date: '2026-09-16T10:00:00.000Z', description: 'Handed over to carrier' }
    ],
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ord_003', orderNumber: 'ORD-1003', date: '2026-09-16T10:00:00.000Z', status: 'processing',
    items: [
      { productId: 'prod_025', name: 'Boys Organic Cotton Striped Tee', image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=600&q=80', color: 'Navy', size: '5-6Y', quantity: 1, price: 32 }
    ],
    subtotal: 32, discount: 0, shipping: 5, tax: 2.88, total: 39.88,
    shippingAddress: {
      id: 'addr_1', label: 'Home', name: 'David Smith', phone: '+1 (555) 123-4567',
      address: '123 Loom Street, Apt 4B', city: 'New York', state: 'NY', country: 'USA', postalCode: '10001', isDefault: true
    },
    paymentMethod: { id: 'pm_1', type: 'Visa', last4: '4242', expiry: '12/28', isDefault: true },
    timeline: [
      { status: 'placed', date: '2026-09-16T10:00:00.000Z', description: 'Order received and being prepared' }
    ],
    trackingNumber: ''
  },
  {
    id: 'ord_004', orderNumber: 'ORD-1004', date: '2026-08-28T10:00:00.000Z', status: 'returned',
    items: [
      { productId: 'prod_035', name: 'Organic Cotton Kimono Baby Romper', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80', color: 'Beige', size: '6-12M', quantity: 1, price: 38 }
    ],
    subtotal: 38, discount: 0, shipping: 0, tax: 3.42, total: 41.42,
    shippingAddress: {
      id: 'addr_1', label: 'Home', name: 'David Smith', phone: '+1 (555) 123-4567',
      address: '123 Loom Street, Apt 4B', city: 'New York', state: 'NY', country: 'USA', postalCode: '10001', isDefault: true
    },
    paymentMethod: { id: 'pm_1', type: 'Visa', last4: '4242', expiry: '12/28', isDefault: true },
    timeline: [
      { status: 'placed', date: '2026-08-28T10:00:00.000Z', description: 'Order placed successfully' },
      { status: 'delivered', date: '2026-08-31T10:00:00.000Z', description: 'Delivered' },
      { status: 'returned', date: '2026-09-12T10:00:00.000Z', description: 'Return package received and refund processed' }
    ],
    trackingNumber: 'TRK555666777'
  },
  {
    id: 'ord_005', orderNumber: 'ORD-1005', date: '2026-09-12T10:00:00.000Z', status: 'cancelled',
    items: [
      { productId: 'prod_013', name: 'Vintage Wash Trucker Denim Jacket', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80', color: 'Navy', size: 'L', quantity: 1, price: 145 }
    ],
    subtotal: 145, discount: 0, shipping: 0, tax: 13.05, total: 158.05,
    shippingAddress: {
      id: 'addr_1', label: 'Home', name: 'David Smith', phone: '+1 (555) 123-4567',
      address: '123 Loom Street, Apt 4B', city: 'New York', state: 'NY', country: 'USA', postalCode: '10001', isDefault: true
    },
    paymentMethod: { id: 'pm_1', type: 'Visa', last4: '4242', expiry: '12/28', isDefault: true },
    timeline: [
      { status: 'placed', date: '2026-09-12T10:00:00.000Z', description: 'Order placed' },
      { status: 'cancelled', date: '2026-09-13T10:00:00.000Z', description: 'Order cancelled by customer' }
    ],
    trackingNumber: ''
  }
];

export default orders;
