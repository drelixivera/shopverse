// src/components/profile/AddressManager.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } from '../../services/addresses';
import { Plus, Pencil, Trash2, Home, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AddressManager() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const data = await getUserAddresses(user.id);
      setAddresses(data);
    } catch (error) {
      toast.error('Failed to load addresses');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.addressLine1 || !formData.city || !formData.state || !formData.zipCode) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingId) {
        const updated = await updateAddress(user.id, editingId, formData);
        setAddresses(addresses.map(a => a.id === editingId ? updated : a));
        toast.success('Address updated');
      } else {
        const newAddress = await addAddress(user.id, formData);
        setAddresses([...addresses, newAddress]);
        toast.success('Address added');
      }
      resetForm();
    } catch (error) {
      toast.error(error.message || 'Failed to save address');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this address?')) return;
    try {
      await deleteAddress(user.id, id);
      setAddresses(addresses.filter(a => a.id !== id));
      toast.success('Address deleted');
    } catch (error) {
      toast.error('Failed to delete address');
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await setDefaultAddress(user.id, id);
      setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
      toast.success('Default address updated');
    } catch (error) {
      toast.error('Failed to set default address');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US',
      phone: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (address) => {
    setFormData(address);
    setEditingId(address.id);
    setShowForm(true);
  };

  if (loading) {
    return <div className="text-center py-4">Loading addresses...</div>;
  }

  return (
    <div>
      {/* Address List */}
      {addresses.length > 0 ? (
        <div className="space-y-3 mb-4">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => startEdit(address)}
              onDelete={() => handleDelete(address.id)}
              onSetDefault={() => handleSetDefault(address.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Home className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p>No saved addresses</p>
          <p className="text-sm">Add your first address for faster checkout</p>
        </div>
      )}

      {/* Add/Edit Form */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition"
      >
        <Plus className="w-4 h-4" />
        {showForm ? 'Cancel' : 'Add New Address'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="text"
              placeholder="Phone *"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="text"
              placeholder="Address Line 1 *"
              value={formData.addressLine1}
              onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none md:col-span-2"
            />
            <input
              type="text"
              placeholder="Address Line 2 (Optional)"
              value={formData.addressLine2}
              onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none md:col-span-2"
            />
            <input
              type="text"
              placeholder="City *"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="text"
              placeholder="State/Province *"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="text"
              placeholder="ZIP Code *"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <select
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
            </select>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {editingId ? 'Update Address' : 'Add Address'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// Address Card Component
function AddressCard({ address, onEdit, onDelete, onSetDefault }) {
  return (
    <div className={`border rounded-lg p-4 ${address.isDefault ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-medium text-gray-800">{address.name}</p>
            {address.isDefault && (
              <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">Default</span>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">{address.addressLine1}</p>
          {address.addressLine2 && <p className="text-sm text-gray-600">{address.addressLine2}</p>}
          <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
          <p className="text-sm text-gray-600">{address.country}</p>
          <p className="text-sm text-gray-600">{address.phone}</p>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          {!address.isDefault && (
            <button
              onClick={onSetDefault}
              className="p-1.5 text-gray-400 hover:text-indigo-600 transition"
              title="Set as default"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-400 hover:text-indigo-600 transition"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-400 hover:text-red-600 transition"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}