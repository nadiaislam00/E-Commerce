import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, RotateCcw } from 'lucide-react';
import { orders } from '../../data/orders';
import { Badge, Button, Tabs, EmptyState, Pagination } from '../../components/ui';

export default function Orders() {
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const tabs = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const filteredOrders = activeTab === 'All' 
    ? orders 
    : orders.filter(o => o.status.toLowerCase() === activeTab.toLowerCase());

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-editorial font-bold text-[#1A1A1A]">My Orders</h1>
        <p className="text-[#6B6B6B]">View and track your current and past orders.</p>
      </div>

      <Tabs 
        tabs={tabs.map(t => ({ id: t, label: t }))} 
        activeTab={activeTab} 
        onChange={(id) => { setActiveTab(id); setCurrentPage(1); }} 
      />

      {paginatedOrders.length > 0 ? (
        <div className="space-y-6">
          {paginatedOrders.map(order => (
            <div key={order.id} className="bg-white border border-[#E5E1DB] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#FAFAF7] border-b border-[#E5E1DB] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <p className="text-sm text-[#6B6B6B] mb-1">Order Number</p>
                    <p className="font-bold text-[#1A1A1A]">{order.orderNumber}</p>
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-[#E5E1DB]"></div>
                  <div>
                    <p className="text-sm text-[#6B6B6B] mb-1">Date Placed</p>
                    <p className="font-medium text-[#1A1A1A]">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-[#E5E1DB]"></div>
                  <div>
                    <p className="text-sm text-[#6B6B6B] mb-1">Total Amount</p>
                    <p className="font-medium text-[#1A1A1A]">${order.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={getStatusColor(order.status)} className="px-3 py-1 text-sm">
                    {order.status}
                  </Badge>
                  <Button as={Link} to={`/account/orders/${order.id}`} variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-4 overflow-x-auto hide-scrollbar pb-2">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="shrink-0 flex items-center gap-3 border border-[#E5E1DB] p-2 rounded-lg pr-4">
                      <div className="w-16 h-16 bg-[#F2EDE8] rounded-md overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#1A1A1A] line-clamp-1">{item.name}</p>
                        <p className="text-xs text-[#6B6B6B]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="shrink-0 flex items-center justify-center w-16 h-16 bg-[#F2EDE8] text-[#6B6B6B] text-sm font-medium rounded-md border border-[#E5E1DB]">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
                {order.status.toLowerCase() === 'delivered' && (
                  <div className="mt-4 flex justify-end">
                    <Button variant="secondary" size="sm" className="gap-2">
                      <RotateCcw className="w-4 h-4" /> Reorder Items
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {totalPages > 1 && (
            <div className="pt-4 flex justify-center">
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            </div>
          )}
        </div>
      ) : (
        <EmptyState 
          icon={<Package className="w-12 h-12" />}
          title={`No ${activeTab !== 'All' ? activeTab.toLowerCase() : ''} orders found`}
          description="Looks like you haven't placed any orders matching this status yet."
          action={{ label: 'Start Shopping', href: '/products' }}
        />
      )}
    </div>
  );
}
