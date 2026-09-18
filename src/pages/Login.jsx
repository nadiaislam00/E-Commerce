import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Checkbox } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { LogIn } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.password) newErrors.password = 'Password is required';

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
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      addToast('Welcome back!', 'success');
      navigate('/account');
    } catch (error) {
      addToast('Invalid credentials. Try any email and password "password".', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#0E0E0E]">
      <div className="max-w-md w-full bg-[#141414] !p-10 !rounded-2xl shadow-2xl border border-[#2F2F2F]">
        <div className="text-center !mb-8">
          <LogIn className="!block !mx-auto h-12 w-12 text-[#C9A84C] !mb-4" />
          <h2 className="text-3xl font-serif text-white tracking-wide">Welcome Back</h2>
          <p className="mt-2 text-sm text-[#8A8A8A]">Please sign in to your account</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
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
          
          <div>
            <Input 
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
          </div>

          <div className="flex items-center justify-between !mt-4 !mb-6">
            <Checkbox 
              label="Remember me"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            <a href="#" className="text-sm font-medium text-white hover:text-white/70 transition-colors">
              Forgot Password?
            </a>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full py-3"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="!mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2F2F2F]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#141414] text-[#737373] uppercase tracking-widest text-[10px]">or</span>
            </div>
          </div>

          <div className="!mt-6">
            <Button 
              type="button"
              variant="outline"
              className="w-full py-3"
              onClick={() => navigate(-1)}
            >
              Continue as Guest
            </Button>
          </div>
        </div>
        
        <p className="!mt-8 text-center text-sm text-[#8A8A8A]">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-[#C9A84C] hover:text-[#E0BC6A] hover:underline transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
