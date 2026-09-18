export const users = [{
  id: 'usr_001',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  addresses: [
    {
      id: 'addr_1', label: 'Home', name: 'Jane Doe', phone: '+1 (555) 123-4567',
      address: '123 Loom Street, Apt 4B', city: 'New York', state: 'NY', country: 'USA', postalCode: '10001', isDefault: true
    }
  ],
  paymentMethods: [
    { id: 'pm_1', type: 'Visa', last4: '4242', expiry: '12/28', isDefault: true }
  ],
  notifications: [
    { id: 'notif_1', title: 'Order Shipped', message: 'Your order #ORD-1002 has been shipped.', date: '2026-09-15T12:00:00.000Z', read: true },
    { id: 'notif_2', title: 'Welcome to LOOM', message: 'Thanks for joining our community!', date: '2026-08-15T12:00:00.000Z', read: true }
  ]
}];

export const mockUser = users[0];
export default users;


