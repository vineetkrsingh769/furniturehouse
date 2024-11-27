import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AddressPage() {
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip: ''
    });
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Load existing address and username from localStorage
        const savedAddress = JSON.parse(localStorage.getItem('address'));
        const savedUserName = localStorage.getItem('username');

        if (savedAddress) {
            setAddress(savedAddress);
        }
        if (savedUserName) {
            setUserName(savedUserName);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress(prevAddress => ({
            ...prevAddress,
            [name]: value
        }));
    };

    const handleNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handleSave = () => {
        if (!userName || !address.street || !address.city || !address.state || !address.zip) {
            toast.error("Please fill in all fields");
            return;
        }

        localStorage.setItem('address', JSON.stringify(address));
        localStorage.setItem('username', userName);
        toast.success("Address updated successfully!");
        navigate('/cart'); // Redirect to cart page
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Update Your Address</h2>
            
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={userName}
                    onChange={handleNameChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Your Name"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Street</label>
                <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Street Address"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">City</label>
                <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="City"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">State</label>
                <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="State"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">ZIP Code</label>
                <input
                    type="text"
                    name="zip"
                    value={address.zip}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="ZIP Code"
                />
            </div>

            <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
                Update Address
            </button>
        </div>
    );
}
