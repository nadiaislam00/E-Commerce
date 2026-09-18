import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { Package, Heart, MapPin, Award } from 'lucide-react';
import { orders } from '../../data/orders';
import { mockUser } from '../../data/users';
import { Badge, Button, EmptyState } from '../../components/ui';

export default function Dashboard() {
  const { user } = useAuth();
  const { wishlist } = useWishlist();
  
  // Mock data calculations
  const totalOrders = orders.length;
  const wishlistCount = wishlist?.length || 0;
  const addressCount = mockUser?.addresses?.length || 0;
  const rewardPoints = 250;
  
  const recentOrders = orders.slice(0, 3);

  const stats = [
    { label: 'Total Orders', value: totalOrders, icon: Package, color: 'text-[#1B2A4A]', bg: 'bg-[#F2EDE8]' },
    { label: 'Wishlist Items', value: wishlistCount, icon: Heart, color: 'text-[#D4544A]', bg: 'bg-red-50' },
    { label: 'Saved Addresses', value: addressCount, icon: MapPin, color: 'text-[#2D8B57]', bg: 'bg-green-50' },
    { label: 'Reward Points', value: rewardPoints, icon: Award, color: 'text-[#E09F3E]', bg: 'bg-yellow-50' },
  ];

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'processing': return 'warning';
      case 'shipped': return 'primary';
      case 'delivered': return 'success';
      case 'cancelled': return 'accent';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-editorial text-[#1B2A4A] mb-2">
          Welcome back, {user?.name?.split(' ')[0] || 'User'}!
        </h1>
        <p className="text-[#6B6B6B]">Here's an overview of your account activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-[#E5E1DB] p-6 rounded-xl shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B]">{stat.label}</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#1A1A1A]">Recent Orders</h2>
          <Link to="/account/orders" className="text-sm font-medium text-[#1B2A4A] hover:underline">
            View All
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="bg-white border border-[#E5E1DB] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-[#1A1A1A]">{order.orderNumber}</span>
                    <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                  </div>
                  <p className="text-sm text-[#6B6B6B]">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-[#6B6B6B]">Total</p>
                    <p className="font-semibold text-[#1A1A1A]">${order.total.toFixed(2)}</p>
                  </div>
                  <Button as={Link} to={`/account/orders/${order.id}`} variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={<Package className="w-8 h-8" />}
            title="No recent orders"
            description="You haven't placed any orders recently."
            action={{ label: 'Start Shopping', href: '/products' }}
          />
        )}
      </div>
    </div>
  );
}
