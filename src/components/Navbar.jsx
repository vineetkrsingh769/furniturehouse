import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaHistory, FaUserCog } from 'react-icons/fa';

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="bg-blue-600 text-yellow-400">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src="https://img.freepik.com/premium-vector/furniture-logo-design-with-house-chairs_446783-1147.jpg" alt="Logo" className="h-8 mr-2" /> 
            <Link to="/" className="text-xl font-bold">Furniture House</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="flex items-center">
              <FaShoppingCart className="mr-1" />
              Cart ({cart.length})
            </Link>
            <Link to="/last-viewed" className="flex items-center">
              <FaHistory className="mr-1" />
              Last Viewed
            </Link>
            <Link to="/admin" className="flex items-center">
              <FaUserCog className="mr-1" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
