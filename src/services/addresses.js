// src/services/addresses.js
// Mock address service with localStorage persistence

const loadAddresses = () => {
  try {
    const saved = localStorage.getItem('user_addresses');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const saveAddresses = (data) => {
  localStorage.setItem('user_addresses', JSON.stringify(data));
};

let addressData = loadAddresses();

export const getUserAddresses = async (userId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return addressData[userId] || [];
};

export const addAddress = async (userId, address) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  if (!addressData[userId]) {
    addressData[userId] = [];
  }
  
  const newAddress = {
    id: `addr_${Date.now()}`,
    ...address,
    isDefault: addressData[userId].length === 0,
    createdAt: new Date().toISOString(),
  };
  
  addressData[userId].push(newAddress);
  saveAddresses(addressData);
  return newAddress;
};

export const updateAddress = async (userId, addressId, updates) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const userAddresses = addressData[userId] || [];
  const index = userAddresses.findIndex(a => a.id === addressId);
  if (index === -1) throw new Error('Address not found');
  
  userAddresses[index] = { ...userAddresses[index], ...updates };
  addressData[userId] = userAddresses;
  saveAddresses(addressesData);
  return userAddresses[index];
};

export const deleteAddress = async (userId, addressId) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const userAddresses = addressData[userId] || [];
  addressData[userId] = userAddresses.filter(a => a.id !== addressId);
  saveAddresses(addressData);
  return { success: true };
};

export const setDefaultAddress = async (userId, addressId) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const userAddresses = addressData[userId] || [];
  userAddresses.forEach(a => a.isDefault = a.id === addressId);
  addressData[userId] = userAddresses;
  saveAddresses(addressData);
  return { success: true };
};