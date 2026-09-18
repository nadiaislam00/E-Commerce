import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Bell, Mail, Tag, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotional: false,
    priceDrops: true,
    newsletter: true
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePreferences = () => {
    addToast({ title: 'Preferences saved successfully', type: 'success' });
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const handleDeleteAccount = () => {
    logout();
    addToast({ title: 'Account deleted', type: 'success' });
    navigate('/');
  };

  const notifyOptions = [
    { key: 'orderUpdates', label: 'Order Updates', desc: 'Receive SMS and email updates on your order status.', icon: Bell },
    { key: 'promotional', label: 'Promotional Emails', desc: 'Get offers, personalized deals, and new arrivals.', icon: Tag },
    { key: 'priceDrops', label: 'Price Drop Alerts', desc: 'We\'ll notify you when items in your wishlist go on sale.', icon: ShieldAlert },
    { key: 'newsletter', label: 'Newsletter', desc: 'Weekly fashion tips and brand updates.', icon: Mail },
  ];

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-editorial font-bold text-[#1A1A1A]">Account Settings</h1>
        <p className="text-[#6B6B6B]">Manage your app preferences and account actions.</p>
      </div>

      {/* Notifications */}
      <section className="bg-white border border-[#E5E1DB] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[#E5E1DB]">
          <h2 className="text-lg font-semibold text-[#1A1A1A]">Notification Preferences</h2>
          <p className="text-sm text-[#6B6B6B]">Choose what we can contact you about.</p>
        </div>
        <div className="p-6 space-y-6">
          {notifyOptions.map((opt) => (
            <div key={opt.key} className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-[#FAFAF7] flex items-center justify-center shrink-0">
                  <opt.icon className="w-4 h-4 text-[#1B2A4A]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#1A1A1A]">{opt.label}</h3>
                  <p className="text-sm text-[#6B6B6B]">{opt.desc}</p>
                </div>
              </div>
              <button 
                onClick={() => handleToggle(opt.key)}
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 focus:outline-none ${notifications[opt.key] ? 'bg-[#2D8B57]' : 'bg-[#D0CBC3]'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${notifications[opt.key] ? 'translate-x-6' : 'translate-x-1'}`}></div>
              </button>
            </div>
          ))}
          <div className="pt-4 border-t border-[#E5E1DB]">
            <Button onClick={handleSavePreferences}>Save Preferences</Button>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-white border border-[#E5E1DB] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[#E5E1DB]">
          <h2 className="text-lg font-semibold text-[#1A1A1A]">Account Actions</h2>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-medium text-[#1A1A1A] mb-1">Sign Out</h3>
            <p className="text-sm text-[#6B6B6B] mb-3">Sign out of your account on this device.</p>
            <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
          </div>
          
          <div className="pt-6 border-t border-[#E5E1DB]">
            <h3 className="font-medium text-[#D4544A] mb-1">Delete Account</h3>
            <p className="text-sm text-[#6B6B6B] mb-3">Permanently delete your account and all associated data. This action cannot be undone.</p>
            {showDeleteConfirm ? (
              <div className="bg-red-50 p-4 rounded-lg border border-red-100 flex flex-col sm:flex-row items-center gap-4">
                <span className="text-sm font-medium text-[#D4544A] flex-1">Are you absolutely sure?</span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(false)} className="flex-1 sm:flex-none">Cancel</Button>
                  <Button size="sm" onClick={handleDeleteAccount} className="bg-[#D4544A] hover:bg-red-700 border-none text-white flex-1 sm:flex-none">Yes, Delete</Button>
                </div>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="text-[#D4544A] hover:bg-red-50 border-red-200" 
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Account
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
