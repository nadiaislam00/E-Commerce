import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, RotateCcw, XCircle, RefreshCw } from 'lucide-react';
import { orders } from '../../data/orders';
import { Badge, Button } from '../../components/ui';
import { useToast } from '../../context/ToastContext';

export default function OrderDetail() {
  const { orderId } = useParams();
  const { addToast } = useToast();
  
  const order = orders.find(o => o.id === orderId) || orders[0]; // fallback to first mock for preview

  if (!order) {
    return <div className="p-8 text-center">Order not found.</div>;
  }

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'processing': return 'warning';
      case 'shipped': return 'primary';
      case 'delivered': return 'success';
      case 'cancelled': return 'accent';
      default: return 'default';
    }
  };

  const handleReorder = () => {
    addToast({ title: 'Items added to cart', type: 'success' });
  };

  const isCompleted = (currentStatus, stepStatus) => {
    const statuses = ['Placed', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];
    const currentIndex = statuses.indexOf(currentStatus === 'Placed' ? 'Placed' : currentStatus);
    const stepIndex = statuses.indexOf(stepStatus);
    return stepIndex <= currentIndex;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link to="/account/orders" className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#1B2A4A] mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-editorial font-bold text-[#1A1A1A] mb-2">Order {order.orderNumber}</h1>
            <p className="text-[#6B6B6B]">Placed on {new Date(order.date).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={getStatusColor(order.status)} className="text-base px-4 py-1.5">{order.status}</Badge>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white border border-[#E5E1DB] rounded-xl p-6">
        <h2 className="text-lg font-semibold text-[#1A1A1A] mb-6">Order Timeline</h2>
        <div className="relative">
          {order.timeline?.map((step, index) => (
            <div key={index} className="flex gap-6 pb-8 last:pb-0 relative">
              {index !== (order.timeline.length - 1) && (
                <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-[#E5E1DB]"></div>
              )}
              <div className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center bg-white relative z-10 ${
                  isCompleted(order.status, step.status) 
                    ? 'border-[#2D8B57] bg-[#2D8B57]' 
                    : 'border-[#D0CBC3]'
                }`}>
                {isCompleted(order.status, step.status) && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <div>
                <p className={`font-medium ${isCompleted(order.status, step.status) ? 'text-[#1A1A1A]' : 'text-[#6B6B6B]'}`}>
                  {step.status}
                </p>
                <p className="text-sm text-[#6B6B6B] mb-1">{new Date(step.date).toLocaleDateString()} - {new Date(step.date).toLocaleTimeString()}</p>
                <p className="text-sm text-[#6B6B6B]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="bg-white border border-[#E5E1DB] rounded-xl overflow-hidden">
        <div className="bg-[#FAFAF7] border-b border-[#E5E1DB] px-6 py-4">
          <h2 className="text-lg font-semibold text-[#1A1A1A]">Order Items</h2>
        </div>
        <div className="divide-y divide-[#E5E1DB]">
          {order.items.map((item, idx) => (
            <div key={idx} className="p-6 flex flex-col sm:flex-row gap-6">
              <div className="w-24 h-24 bg-[#F2EDE8] rounded-lg overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A]">{item.name}</h3>
                    <p className="text-sm text-[#6B6B6B] mt-1">Color: {item.color} | Size: {item.size}</p>
                  </div>
                  <p className="font-bold text-[#1A1A1A]">${item.price.toFixed(2)}</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <p className="text-sm text-[#6B6B6B]">Qty: {item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details & Summary Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="bg-white border border-[#E5E1DB] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Shipping Information</h2>
            <div className="space-y-2 text-[#6B6B6B]">
              <p className="font-medium text-[#1A1A1A]">{order.shippingAddress?.name}</p>
              <p>{order.shippingAddress?.address}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}</p>
              <p>{order.shippingAddress?.country}</p>
              <p className="pt-2">Phone: {order.shippingAddress?.phone}</p>
              {order.trackingNumber && (
                <div className="mt-4 pt-4 border-t border-[#E5E1DB]">
                  <p className="font-medium text-[#1A1A1A]">Tracking Number:</p>
                  <p className="text-[#1B2A4A] font-medium">{order.trackingNumber}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white border border-[#E5E1DB] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Payment Information</h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                {order.paymentMethod?.type}
              </div>
              <p className="text-[#6B6B6B]">Ending in •••• {order.paymentMethod?.last4}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#FAFAF7] border border-[#E5E1DB] rounded-xl p-6 h-fit">
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm text-[#6B6B6B] mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${order.subtotal?.toFixed(2) || order.total.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#D4544A]">
                <span>Discount</span>
                <span>-${order.discount?.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? 'Free' : `$${order.shipping?.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${order.tax?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="pt-4 mt-4 border-t border-[#D0CBC3] flex justify-between text-base font-bold text-[#1A1A1A]">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3">
            {order.status.toLowerCase() === 'delivered' && (
              <>
                <Button className="w-full gap-2" onClick={handleReorder}>
                  <RotateCcw className="w-4 h-4" /> Reorder All Items
                </Button>
                <Button variant="outline" className="w-full gap-2 text-[#1B2A4A]">
                  <RefreshCw className="w-4 h-4" /> Request Return
                </Button>
              </>
            )}
            {order.status.toLowerCase() === 'processing' && (
              <Button variant="outline" className="w-full gap-2 text-[#D4544A] hover:bg-red-50 border-red-200">
                <XCircle className="w-4 h-4" /> Cancel Order
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
