import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ChevronRight, CreditCard, Wallet, Truck, Package, Info, AlertCircle } from 'lucide-react';
import { Button, Input, Select, RadioGroup, Checkbox, Breadcrumb, Badge } from '../components/ui';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { createOrder } from '../services/orderService';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotals, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [shippingCost, setShippingCost] = useState(0);

  const [formData, setFormData] = useState({
    // Customer Info
    fullName: '',
    email: '',
    phone: '',
    
    // Shipping
    country: 'United States',
    state: '',
    city: '',
    address1: '',
    address2: '',
    postalCode: '',
    
    // Delivery Method
    deliveryMethod: 'standard',
    
    // Payment Method
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    mobileNumber: ''
  });

  // Pre-fill user data
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }));
    }
  }, [isAuthenticated, user]);

  // Update shipping cost
  useEffect(() => {
    if (formData.deliveryMethod === 'express') {
      setShippingCost(9.99);
    } else {
      setShippingCost(0);
    }
  }, [formData.deliveryMethod]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Customer info
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';

    // Shipping
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.address1.trim()) newErrors.address1 = 'Address Line 1 is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal Code is required';

    // Payment
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
      if (!formData.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';
    } else if (formData.paymentMethod === 'mobile') {
      if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      addToast('Please fix the errors in the form', 'error');
      // Scroll to top or first error
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const orderData = {
        items: cartItems,
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone
        },
        shipping: {
          address1: formData.address1,
          address2: formData.address2,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          postalCode: formData.postalCode,
          method: formData.deliveryMethod
        },
        payment: {
          method: formData.paymentMethod
        },
        totals: {
          ...cartTotals,
          shipping: shippingCost,
          total: cartTotals.subtotal - cartTotals.discount + shippingCost + cartTotals.tax
        }
      };

      const result = await createOrder(orderData);
      
      clearCart();
      addToast('Order placed successfully!', 'success');
      navigate(`/order-confirmation/${result.id || '102938'}`);
    } catch (error) {
      addToast('Failed to place order. Please try again.', 'error');
      setIsSubmitting(false);
    }
  };

  const deliveryOptions = [
    { value: 'standard', label: 'Standard Delivery: Free (5-7 business days)' },
    { value: 'express', label: 'Express Delivery: $9.99 (2-3 business days)' }
  ];

  const paymentOptions = [
    { value: 'card', label: 'Credit/Debit Card' },
    { value: 'cod', label: 'Cash on Delivery' },
    { value: 'mobile', label: 'Mobile Payment (bKash/GCash)' },
    { value: 'paypal', label: 'PayPal' }
  ];

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-serif text-[#C9A84C] mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
        <Link to="/">
          <Button variant="primary">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const finalTotal = cartTotals.subtotal - cartTotals.discount + shippingCost + cartTotals.tax;

  const estimatedDelivery = formData.deliveryMethod === 'standard' 
    ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout' }
        ]} 
        className="mb-8"
      />

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Form */}
        <div className="w-full lg:w-[60%]">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Customer Information */}
            <section className="bg-[#141414] p-6 rounded-xl shadow-sm border border-[#2F2F2F]">
              <h2 className="text-xl font-serif text-[#C9A84C] mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#C9A84C] text-[#0E0E0E] flex items-center justify-center text-sm mr-3">1</span>
                Customer Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <Input 
                    label="Full Name" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    required 
                  />
                </div>
                <Input 
                  label="Email Address" 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required 
                />
                <Input 
                  label="Phone Number" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required 
                />
              </div>
            </section>

            {/* Shipping Address */}
            <section className="bg-[#141414] p-6 rounded-xl shadow-sm border border-[#2F2F2F]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif text-[#C9A84C] flex items-center">
                  <span className="w-8 h-8 rounded-full bg-[#C9A84C] text-[#0E0E0E] flex items-center justify-center text-sm mr-3">2</span>
                  Shipping Address
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <Select 
                    label="Country" 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    options={[
                      { value: 'United States', label: 'United States' },
                      { value: 'United Kingdom', label: 'United Kingdom' },
                      { value: 'Canada', label: 'Canada' },
                      { value: 'Australia', label: 'Australia' },
                      { value: 'Bangladesh', label: 'Bangladesh' }
                    ]}
                  />
                </div>
                <Input 
                  label="Address Line 1" 
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  error={errors.address1}
                  required 
                  className="col-span-1 md:col-span-2"
                />
                <Input 
                  label="Address Line 2 (Optional)" 
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  className="col-span-1 md:col-span-2"
                />
                <Input 
                  label="City" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  error={errors.city}
                  required 
                />
                <Input 
                  label="State / Division" 
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
                <Input 
                  label="Postal Code" 
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  error={errors.postalCode}
                  required 
                />
              </div>
            </section>

            {/* Delivery Method */}
            <section className="bg-[#141414] p-6 rounded-xl shadow-sm border border-[#2F2F2F]">
              <h2 className="text-xl font-serif text-[#C9A84C] mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#C9A84C] text-[#0E0E0E] flex items-center justify-center text-sm mr-3">3</span>
                Delivery Method
              </h2>
              <RadioGroup
                name="deliveryMethod"
                value={formData.deliveryMethod}
                onChange={handleChange}
                options={deliveryOptions}
              />
              <div className="mt-4 p-3 bg-[#F2EDE8] rounded-md text-sm text-[#A3A3A3] flex items-center">
                <Truck className="w-4 h-4 mr-2 text-[#C8956C]" />
                Estimated delivery date: <strong>{estimatedDelivery}</strong>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-[#141414] p-6 rounded-xl shadow-sm border border-[#2F2F2F]">
              <h2 className="text-xl font-serif text-[#C9A84C] mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#C9A84C] text-[#0E0E0E] flex items-center justify-center text-sm mr-3">4</span>
                Payment Method
              </h2>
              
              <RadioGroup
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                options={paymentOptions}
                className="mb-6"
              />

              {formData.paymentMethod === 'card' && (
                <div className="bg-[#0E0E0E] p-5 rounded-lg border border-[#2F2F2F] space-y-4">
                  <div className="flex items-center text-sm text-[#A3A3A3] mb-2">
                    <Info className="w-4 h-4 mr-2" />
                    Payment is simulated — no real charges will be made.
                  </div>
                  <Input 
                    label="Card Number" 
                    name="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    icon={CreditCard}
                    value={formData.cardNumber}
                    onChange={handleChange}
                    error={errors.cardNumber}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      label="Expiry Date" 
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      error={errors.expiryDate}
                    />
                    <Input 
                      label="CVV" 
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                      error={errors.cvv}
                    />
                  </div>
                  <Input 
                    label="Cardholder Name" 
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleChange}
                    error={errors.cardholderName}
                  />
                </div>
              )}

              {formData.paymentMethod === 'cod' && (
                <div className="bg-[#0E0E0E] p-5 rounded-lg border border-[#2F2F2F] text-center">
                  <Package className="w-8 h-8 mx-auto text-[#C9A84C] mb-3" />
                  <p className="text-white font-medium">Pay with cash upon delivery.</p>
                  <p className="text-sm text-[#A3A3A3] mt-1">Please have exact change available.</p>
                </div>
              )}

              {formData.paymentMethod === 'mobile' && (
                <div className="bg-[#0E0E0E] p-5 rounded-lg border border-[#2F2F2F]">
                  <Input 
                    label="Mobile Wallet Number (bKash/GCash)" 
                    name="mobileNumber"
                    placeholder="e.g., +8801700000000"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    error={errors.mobileNumber}
                  />
                </div>
              )}

              {formData.paymentMethod === 'paypal' && (
                <div className="bg-[#0E0E0E] p-5 rounded-lg border border-[#2F2F2F] text-center">
                  <Wallet className="w-8 h-8 mx-auto text-[#003087] mb-3" />
                  <p className="text-white font-medium">You will be redirected to PayPal</p>
                  <p className="text-sm text-[#A3A3A3] mt-1">Complete your purchase securely on PayPal's website.</p>
                </div>
              )}
            </section>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-[40%]">
          <div className="bg-[#141414] p-6 rounded-xl shadow-sm border border-[#2F2F2F] sticky top-8">
            <h2 className="text-xl font-serif text-[#C9A84C] mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.color}-${item.size}`} className="flex items-start">
                  <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded bg-[#F2EDE8]" />
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-white">{item.name}</h4>
                    <p className="text-xs text-[#A3A3A3] mt-1">
                      {item.color && <span>{item.color}</span>}
                      {item.color && item.size && <span> • </span>}
                      {item.size && <span>{item.size}</span>}
                    </p>
                    <p className="text-xs text-[#A3A3A3] mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#2F2F2F] pt-4 space-y-3">
              <div className="flex justify-between text-sm text-[#A3A3A3]">
                <span>Subtotal</span>
                <span>${cartTotals.subtotal.toFixed(2)}</span>
              </div>
              {cartTotals.discount > 0 && (
                <div className="flex justify-between text-sm text-[#2D8B57]">
                  <span>Discount</span>
                  <span>-${cartTotals.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-[#A3A3A3]">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm text-[#A3A3A3]">
                <span>Tax</span>
                <span>${cartTotals.tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-[#2F2F2F] mt-4 pt-4 mb-6">
              <div className="flex justify-between items-center text-lg font-serif font-bold text-[#C9A84C]">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button 
              variant="primary" 
              className="w-full py-3" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </Button>
            
            <p className="text-xs text-center text-[#A3A3A3] mt-4">
              By placing your order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
