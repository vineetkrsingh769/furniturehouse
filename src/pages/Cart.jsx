// import { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { useCart } from '../context/CartContext';
// import toast from 'react-hot-toast';

// const stripePromise = loadStripe('your-publishable-key-here');

// const CardCheckoutForm = ({ total }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!stripe || !elements) return;

//         setLoading(true);

//         const { clientSecret } = await fetch('/api/create-payment-intent', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ amount: total * 100 }) // Total amount in cents
//         }).then(res => res.json());

//         const result = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: elements.getElement(CardElement),
//                 billing_details: {
//                     name: 'John Doe', // Use actual customer info
//                 },
//             },
//         });

//         setLoading(false);

//         if (result.error) {
//             toast.error(`Payment failed: ${result.error.message}`);
//         } else if (result.paymentIntent.status === 'succeeded') {
//             toast.success('Payment successful!');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <CardElement className="p-4 border rounded" />
//             <button
//                 type="submit"
//                 disabled={!stripe || loading}
//                 className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//             >
//                 {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
//             </button>
//         </form>
//     );
// };

// export default function Cart() {
//     const { cart, removeFromCart } = useCart();
//     const [showCheckout, setShowCheckout] = useState(false);
//     const [paymentMethod, setPaymentMethod] = useState('');
//     const [showCardForm, setShowCardForm] = useState(false);
//     const [showOtherMethods, setShowOtherMethods] = useState(false);
//     const [couponCode, setCouponCode] = useState('');
//     const [discountedTotal, setDiscountedTotal] = useState(0);
//     const [address, setAddress] = useState(null);
//     const [userName, setUserName] = useState(''); // State to hold the user's name

//     const total = cart.reduce((sum, item) => sum + item.price, 0);
//     const [isCouponApplied, setIsCouponApplied] = useState(false);

//     const handleRemove = (item) => {
//         removeFromCart(item.id);
//         toast.success(`${item.title} removed from cart`);
//     };

//     const handleCheckout = () => {
//         const savedAddress = JSON.parse(localStorage.getItem('address'));
//         const savedUserName = localStorage.getItem('username'); // Use 'username' as saved in localStorage
//         if (savedAddress) {
//             setAddress(savedAddress);
//         }
//         if (savedUserName) {
//             setUserName(savedUserName); // Set the user name
//         }
//         setShowCheckout(true);
//     };

//     const handlePaymentMethodChange = (method) => {
//         setPaymentMethod(method);
//         setShowCardForm(method === 'card');
//         setShowOtherMethods(method === 'other');
//     };

//     const handleApplyCoupon = () => {
//         if (couponCode === 'SAVE10') {
//             const discount = total * 0.1;
//             setDiscountedTotal(total - discount);
//             setIsCouponApplied(true);
//             toast.success('Coupon applied successfully!');
//         } else {
//             toast.error('Invalid coupon code');
//         }
//     };

//     return (
//         <div className="max-w-2xl mx-auto">
//             <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

//             {!showCheckout ? (
//                 <>
//                     {cart.length === 0 ? (
//                         <p className="text-gray-600">Your cart is empty</p>
//                     ) : (
//                         <>
//                             {cart.map(item => (
//                                 <div key={item.id} className="flex items-center justify-between border-b py-4">
//                                     <div className="flex items-center">
//                                         <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
//                                         <div className="ml-4">
//                                             <h3 className="font-semibold">{item.title}</h3>
//                                             <p className="text-gray-600">${item.price}</p>
//                                         </div>
//                                     </div>
//                                     <button
//                                         onClick={() => handleRemove(item)}
//                                         className="text-red-600 hover:text-red-800"
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                             ))}

//                             <div className="mt-6">
//                                 <div className="text-xl font-bold mb-4">
//                                     Total: ${isCouponApplied ? discountedTotal.toFixed(2) : total.toFixed(2)}
//                                 </div>
//                                 <div className="flex items-center mb-4">
//                                     <input
//                                         type="text"
//                                         value={couponCode}
//                                         onChange={(e) => setCouponCode(e.target.value)}
//                                         placeholder="Enter coupon code"
//                                         className="border rounded p-2 mr-2"
//                                     />
//                                     <button
//                                         onClick={handleApplyCoupon}
//                                         className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//                                     >
//                                         Apply Coupon
//                                     </button>
//                                 </div>
//                                 <button
//                                     onClick={handleCheckout}
//                                     className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//                                 >
//                                     Proceed to Checkout
//                                 </button>
//                             </div>
//                         </>
//                     )}
//                 </>
//             ) : (
//                 <div className="mt-6">
//                     <h3 className="text-xl font-bold mb-4">Delivering To:</h3>
//                     {userName && <p className="text-gray-700">{userName}</p>} {/* Displaying the user's name */}
//                     {address ? (
//                         <div className="mb-4">
//                             <p className="text-gray-700">{`${address.street}, ${address.city}, ${address.state}, ${address.zip}`}</p>
//                         </div>
//                     ) : (
//                         <p className="text-red-600">No address found. Please add your address in the admin section.</p>
//                     )}
                    
//                     <h3 className="text-xl font-bold mb-4">Select Payment Method</h3>
//                     <div className="space-y-4 mb-4">
//                         <button
//                             onClick={() => handlePaymentMethodChange('card')}
//                             className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
//                         >
//                             Credit/Debit Card
//                         </button>
//                         <button
//                             onClick={() => handlePaymentMethodChange('other')}
//                             className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
//                         >
//                             Google Pay / Paytm / Other
//                         </button>
//                     </div>

//                     {showCardForm && (
//                         <Elements stripe={stripePromise}>
//                             <CardCheckoutForm total={isCouponApplied ? discountedTotal : total} />
//                         </Elements>
//                     )}

//                     {showOtherMethods && (
//                         <div className="mt-4">
//                             <h4 className="text-lg font-semibold">Payment Options</h4>
//                             <p>Please follow the instructions to pay using Google Pay or Paytm.</p>
//                             <button
//                                 onClick={() => toast.success('Payment initiated with Google Pay!')}
//                                 className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//                             >
//                                 Pay with Google Pay
//                             </button>
//                             <button
//                                 onClick={() => toast.success('Payment initiated with Paytm!')}
//                                 className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//                             >
//                                 Pay with Paytm
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const stripePromise = loadStripe('your-publishable-key-here');

const CardCheckoutForm = ({ total }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        const { clientSecret } = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: total * 100 })
        }).then(res => res.json());

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'John Doe',
                },
            },
        });

        setLoading(false);

        if (result.error) {
            toast.error(`Payment failed: ${result.error.message}`);
        } else if (result.paymentIntent.status === 'succeeded') {
            toast.success('Payment successful!');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="p-4 border rounded" />
            <button
                type="submit"
                disabled={!stripe || loading}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
                {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </button>
        </form>
    );
};

export default function Cart() {
    const { cart, removeFromCart } = useCart();
    const [showCheckout, setShowCheckout] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showCardForm, setShowCardForm] = useState(false);
    const [showOtherMethods, setShowOtherMethods] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [discountedTotal, setDiscountedTotal] = useState(0);
    const [address, setAddress] = useState(null);
    const [userName, setUserName] = useState('');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedAddress = JSON.parse(localStorage.getItem('address'));
        const savedUserName = localStorage.getItem('username');
        if (savedAddress) setAddress(savedAddress);
        if (savedUserName) setUserName(savedUserName);
    }, []);

    const handleRemove = (item) => {
        removeFromCart(item.id);
        toast.success(`${item.title} removed from cart`);
    };

    const handleCheckout = () => {
        if (!address) {
            toast.error('Please add your address to proceed');
            navigate('/address');
        } else {
            setShowCheckout(true);
        }
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        setShowCardForm(method === 'card');
        setShowOtherMethods(method === 'other');
    };

    const handleApplyCoupon = () => {
        if (couponCode === 'SAVE10') {
            const discount = total * 0.1;
            setDiscountedTotal(total - discount);
            setIsCouponApplied(true);
            toast.success('Coupon applied successfully!');
        } else {
            toast.error('Invalid coupon code');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

            {!showCheckout ? (
                <>
                    {cart.length === 0 ? (
                        <p className="text-gray-600">Your cart is empty</p>
                    ) : (
                        <>
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center justify-between border-b py-4">
                                    <div className="flex items-center">
                                        <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                                        <div className="ml-4">
                                            <h3 className="font-semibold">{item.title}</h3>
                                            <p className="text-gray-600">Rs.{item.price}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemove(item)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}

                            <div className="mt-6">
                                <div className="text-xl font-bold mb-4">
                                    Total: Rs. {isCouponApplied ? discountedTotal.toFixed(2) : total.toFixed(2)}
                                </div>
                                <div className="flex items-center mb-4">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Enter coupon code"
                                        className="border rounded p-2 mr-2"
                                    />
                                    <button
                                        onClick={handleApplyCoupon}
                                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                                    >
                                        Apply Coupon
                                    </button>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-4">Delivering To:</h3>
                    {userName && <p className="text-gray-700">{userName}</p>}
                    {address ? (
                        <div className="mb-4">
                            <p className="text-gray-700">{`${address.street}, ${address.city}, ${address.state}, ${address.zip}`}</p>
                        </div>
                    ) : (
                        <p className="text-red-600">No address found. Please add your address in the admin section.</p>
                    )}
                    
                    <h3 className="text-xl font-bold mb-4">Select Payment Method</h3>
                    <div className="space-y-4 mb-4">
                        <button
                            onClick={() => handlePaymentMethodChange('card')}
                            className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
                        >
                            Credit/Debit Card
                        </button>
                        <button
                            onClick={() => handlePaymentMethodChange('other')}
                            className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
                        >
                            Google Pay / Paytm / Other
                        </button>
                    </div>

                    {showCardForm && (
                        <Elements stripe={stripePromise}>
                            <CardCheckoutForm total={isCouponApplied ? discountedTotal : total} />
                        </Elements>
                    )}
                    {showOtherMethods && (
                        <p className="text-gray-700">Further payment options are under development.</p>
                    )}
                </div>
            )}
        </div>
    );
}
