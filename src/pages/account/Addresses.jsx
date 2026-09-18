import React, { useState, useEffect } from 'react';
import { Plus, MapPin, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { mockUser } from '../../data/users';
import { Button, Badge, Input, EmptyState } from '../../components/ui';

export default function Addresses() {
  const { addToast } = useToast();
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('user_addresses');
    return saved ? JSON.parse(saved) : mockUser.addresses || [];
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const defaultForm = {
    label: 'Home', name: '', phone: '', address: '', 
    city: '', state: '', country: 'United States', postalCode: '', isDefault: false
  };
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    localStorage.setItem('user_addresses', JSON.stringify(addresses));
  }, [addresses]);

  const handleOpenModal = (address = null) => {
    if (address) {
      setFormData(address);
      setEditingId(address.id);
    } else {
      setFormData(defaultForm);
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    let updated;
    
    if (editingId) {
      updated = addresses.map(a => a.id === editingId ? { ...formData, id: editingId } : a);
    } else {
      updated = [...addresses, { ...formData, id: Date.now().toString() }];
    }

    if (formData.isDefault) {
      updated = updated.map(a => a.id === (editingId || updated[updated.length - 1].id) 
        ? { ...a, isDefault: true } 
        : { ...a, isDefault: false });
    } else if (updated.length === 1) {
      updated[0].isDefault = true;
    }

    setAddresses(updated);
    setIsModalOpen(false);
    addToast({ title: `Address ${editingId ? 'updated' : 'added'} successfully`, type: 'success' });
  };

  const handleDelete = (id) => {
    const addr = addresses.find(a => a.id === id);
    let updated = addresses.filter(a => a.id !== id);
    if (addr?.isDefault && updated.length > 0) {
      updated[0].isDefault = true;
    }
    setAddresses(updated);
    addToast({ title: 'Address deleted' });
  };

  const handleSetDefault = (id) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
    addToast({ title: 'Default address updated', type: 'success' });
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-editorial font-bold text-[#1A1A1A]">Saved Addresses</h1>
          <p className="text-[#6B6B6B]">Manage your shipping and billing addresses.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" /> Add New Address
        </Button>
      </div>

      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map(addr => (
            <div key={addr.id} className={`bg-white border rounded-xl p-6 relative flex flex-col ${addr.isDefault ? 'border-[#1B2A4A] shadow-sm' : 'border-[#E5E1DB]'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-[#1A1A1A]">{addr.label}</h3>
                  {addr.isDefault && <Badge variant="primary" className="text-xs">Default</Badge>}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleOpenModal(addr)} className="text-[#6B6B6B] hover:text-[#1B2A4A] transition-colors p-1" title="Edit">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(addr.id)} className="text-[#6B6B6B] hover:text-[#D4544A] transition-colors p-1" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 space-y-1 text-[#6B6B6B] mb-6">
                <p className="font-medium text-[#1A1A1A]">{addr.name}</p>
                <p>{addr.address}</p>
                <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                <p>{addr.country}</p>
                <p className="pt-2">Phone: {addr.phone}</p>
              </div>

              {!addr.isDefault && (
                <button 
                  onClick={() => handleSetDefault(addr.id)} 
                  className="text-sm font-medium text-[#1B2A4A] hover:underline self-start"
                >
                  Set as Default
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={<MapPin className="w-12 h-12" />}
          title="No saved addresses"
          description="You haven't saved any addresses yet. Add one for faster checkout."
          action={{ label: 'Add Address', onClick: () => handleOpenModal() }}
        />
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E5E1DB]">
              <h2 className="text-xl font-semibold text-[#1A1A1A]">
                {editingId ? 'Edit Address' : 'Add New Address'}
              </h2>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Label (e.g., Home, Work)" value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} required className="col-span-2 sm:col-span-1" />
                <Input label="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="col-span-2 sm:col-span-1" />
              </div>
              <Input label="Phone Number" type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
              <Input label="Street Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="City" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} required />
                <Input label="State / Province" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Postal Code" value={formData.postalCode} onChange={e => setFormData({...formData, postalCode: e.target.value})} required />
                <Input label="Country" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} required />
              </div>
              
              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.isDefault} 
                  onChange={e => setFormData({...formData, isDefault: e.target.checked})}
                  className="w-4 h-4 text-[#1B2A4A] rounded border-gray-300 focus:ring-[#1B2A4A]"
                />
                <span className="text-sm text-[#1A1A1A]">Set as default address</span>
              </label>

              <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-[#E5E1DB]">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">Save Address</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
