import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('profile');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  // Load username and address from local storage on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedAddress = localStorage.getItem('address');

    if (savedUsername) {
      setUsername(savedUsername);
    }

    if (savedAddress) {
      setAddress(JSON.parse(savedAddress));
    }
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    localStorage.setItem('username', newUsername); // Save username to local storage immediately
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    toast.success('Username updated successfully!');
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('address', JSON.stringify(address)); // Save address to local storage immediately
    toast.success('Address updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">User Account Management</h2>

      {/* Tab navigation */}
      <div className="mb-6">
        <button
          className={`px-4 py-2 mr-4 ${activeTab === 'profile' ? 'bg-blue-600 text-yellow-400' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('profile')}
        >
          Manage Profile
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'address' ? 'bg-blue-600 text-yellow-400' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('address')}
        >
          Address Details
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'coupons' ? 'bg-blue-600 text-yellow-400' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('coupons')}
        >
          Festive Offers & Coupons
        </button>
      </div>

      {/* Profile Management */}
      {activeTab === 'profile' && (
        <div>
          <h3 className="text-xl font-bold mb-4">Update Username</h3>
          <form onSubmit={handleUsernameSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange} // Use the new handle change function
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-green-600 text-yellow-400 py-2 px-4 rounded hover:bg-green-700"
            >
              Update Username
            </button>
          </form>
        </div>
      )}

      {/* Address Management */}
      {activeTab === 'address' && (
        <div>
          <h3 className="text-xl font-bold mb-4">Delivery Address</h3>
          <form onSubmit={handleAddressSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Street Address</label>
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Zip Code</label>
              <input
                type="text"
                name="zip"
                value={address.zip}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-yellow-400 py-2 px-4 rounded hover:bg-green-700"
            >
              Save Address
            </button>
          </form>
        </div>
      )}

      {/* Coupon/Festive Offers Management */}
      {activeTab === 'coupons' && (
        <div>
          <h3 className="text-xl font-bold mb-4">Festive Offers & Coupons</h3>
          <ul>
            {['HOLIDAY50', 'SUMMER20'].map((coupon, index) => (
              <li key={index} className="mb-4 flex justify-between">
                <span>{coupon}</span>
              </li>
            ))}
          </ul>
          <p>Apply these festive offers to save on your next purchase!</p>
        </div>
      )}
    </div>
  );
}
