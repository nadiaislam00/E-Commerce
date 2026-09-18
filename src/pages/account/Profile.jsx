import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button, Input } from '../../components/ui';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    addToast({ title: 'Profile updated successfully', type: 'success' });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addToast({ title: 'Passwords do not match', type: 'error' });
      return;
    }
    // Mock password update
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    addToast({ title: 'Password updated successfully', type: 'success' });
  };

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-editorial font-bold text-[#1A1A1A]">Profile Settings</h1>
        <p className="text-[#6B6B6B]">Manage your personal information and security preferences.</p>
      </div>

      {/* Personal Info Section */}
      <section className="bg-white border border-[#E5E1DB] rounded-xl p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-[#1A1A1A] mb-6">Personal Information</h2>
        
        <div className="flex flex-col sm:flex-row gap-8 mb-8">
          <div className="flex flex-col items-center gap-4 shrink-0">
            <div className="relative w-24 h-24 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center text-3xl font-editorial">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
              <button type="button" className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-[#E5E1DB] rounded-full flex items-center justify-center text-[#1A1A1A] hover:bg-[#FAFAF7] shadow-sm transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#6B6B6B]">JPG, GIF or PNG. Max 2MB.</p>
          </div>

          <form onSubmit={handleProfileSubmit} className="flex-1 space-y-5">
            <Input 
              label="Full Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <Input 
              label="Email Address" 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <Input 
              label="Phone Number" 
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <div className="pt-2">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
      </section>

      {/* Password Section */}
      <section className="bg-white border border-[#E5E1DB] rounded-xl p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-[#1A1A1A] mb-6">Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-5 max-w-md">
          <Input 
            label="Current Password" 
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
            required
          />
          <Input 
            label="New Password" 
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
            required
          />
          <Input 
            label="Confirm New Password" 
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
            required
          />
          <div className="pt-2">
            <Button type="submit" variant="secondary">Update Password</Button>
          </div>
        </form>
      </section>
    </div>
  );
}
