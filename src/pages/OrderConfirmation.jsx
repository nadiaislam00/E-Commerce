import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, CreditCard, MapPin } from 'lucide-react';
import { Button } from '../components/ui';

export default function OrderConfirmation() {
  const { orderId } = useParams();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle className="w-10 h-10 text-[#2D8B57]" />
        </div>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-serif text-[#1B2A4A] mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-8">Thank you for your purchase.</p>
      
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E1DB] overflow-hidden text-left mb-8">
        <div className="bg-[#FAFAF7] p-6 border-b border-[#E5E1DB] flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <p className="text-sm text-[#6B6B6B]">Order Number</p>
            <p className="text-xl font-bold text-[#1B2A4A]">#{orderId || 'ORD-9382103'}</p>
          </div>
          <div className="mt-4 sm:mt-0 text-sm text-[#6B6B6B]">
            <p>Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-serif text-[#1B2A4A] mb-4">Order Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-[#6B6B6B] mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-[#1A1A1A]">Shipping Address</h4>
                  <p className="text-sm text-[#6B6B6B] mt-1">
                    John Doe<br />
                    123 E-commerce St.<br />
                    Suite 400<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Truck className="w-5 h-5 text-[#6B6B6B] mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-[#1A1A1A]">Estimated Delivery</h4>
                  <p className="text-sm text-[#6B6B6B] mt-1">
                    {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()} - {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <CreditCard className="w-5 h-5 text-[#6B6B6B] mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-[#1A1A1A]">Payment Method</h4>
                  <p className="text-sm text-[#6B6B6B] mt-1">Credit Card ending in 4242</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Package className="w-5 h-5 text-[#6B6B6B] mr-3 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-[#1A1A1A]">Order Total</h4>
                  <p className="text-lg font-bold text-[#1B2A4A] mt-1">$284.50</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/">
          <Button variant="primary" className="w-full sm:w-auto min-w-[200px]">Continue Shopping</Button>
        </Link>
        <Link to="/account/orders">
          <Button variant="outline" className="w-full sm:w-auto min-w-[200px]">View My Orders</Button>
        </Link>
      </div>
    </div>
  );
}
