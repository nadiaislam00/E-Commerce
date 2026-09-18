import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Checkbox } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { UserPlus } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms & Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please fix the errors in the form', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      addToast('Account created successfully!', 'success');
      navigate('/account');
    } catch (error) {
      addToast('Failed to create account. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#0E0E0E]">
      <div className="max-w-md w-full bg-[#141414] p-8 rounded-xl shadow-2xl border border-[#2F2F2F]">
        <div className="text-center mb-8">
          <UserPlus className="block mx-auto h-12 w-12 text-[#C9A84C] mb-4" />
          <h2 className="text-3xl font-serif text-white tracking-wide">Create Account</h2>
          <p className="mt-2 text-sm text-[#8A8A8A]">Join TOOBA for a better shopping experience</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input 
            label="Full Name"
            name="fullName"
            autoComplete="name"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            required
          />
          
          <Input 
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          
          <Input 
            label="Phone Number"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />
          
          <Input 
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          
          <Input 
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />

          <div className="pt-2">
            <Checkbox 
              label={
                <span>
                  I agree to the <a href="#" className="text-[#C9A84C] hover:text-[#E0BC6A] hover:underline transition-colors">Terms of Service</a> and <a href="#" className="text-[#C9A84C] hover:text-[#E0BC6A] hover:underline transition-colors">Privacy Policy</a>
                </span>
              }
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            {errors.agreeTerms && <p className="mt-1 text-xs text-red-500">{errors.agreeTerms}</p>}
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full py-3 mt-4"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
        
        <p className="mt-8 text-center text-sm text-[#8A8A8A]">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#C9A84C] hover:text-[#E0BC6A] hover:underline transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
