import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated, logout } from '../utils/auth';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin status whenever the component renders and when localStorage changes
  useEffect(() => {
    const checkAdminStatus = () => {
      const isAdminLoggedIn = isAuthenticated();
      setIsAdmin(isAdminLoggedIn);
    };

    // Check initially
    checkAdminStatus();

    // Add event listener for storage changes
    window.addEventListener('storage', checkAdminStatus);

    // Check every time the component mounts or updates
    const interval = setInterval(checkAdminStatus, 1000);

    // Cleanup
    return () => {
      window.removeEventListener('storage', checkAdminStatus);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsAdmin(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar container mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown md:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/products" className="hover:text-primary">Products</Link></li>
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              {isAdmin && (
                <li>
                  <Link 
                    to="/admin/dashboard" 
                    className="text-primary font-semibold hover:bg-primary hover:text-white"
                  >
                    Manage Products
                  </Link>
                </li>
              )}
              <li>
                {isAdmin ? (
                  <button onClick={handleLogout} className="hover:text-primary">
                    Logout
                  </button>
                ) : (
                  <Link to="/admin/login" className="hover:text-primary">
                    Admin Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <Link to="/" className="flex items-center">
            <img 
              src="https://i.postimg.cc/fWXHdJcM/IMG-20250411-002449.jpg" 
              alt="RD Saree Collections Logo" 
              className="h-12 w-auto object-contain"
            />
          </Link>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li><Link to="/" className="hover:text-primary transition-colors duration-300">Home</Link></li>
            <li><Link to="/products" className="hover:text-primary transition-colors duration-300">Products</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors duration-300">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors duration-300">Contact</Link></li>
          </ul>
        </div>
        <div className="navbar-end hidden md:flex">
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <Link 
                to="/admin/dashboard" 
                className="btn btn-primary btn-sm rounded-full px-4 hover:scale-105 transition-transform duration-300"
              >
                Manage Products
              </Link>
              <button 
                onClick={handleLogout}
                className="btn btn-ghost btn-sm rounded-full hover:scale-105 transition-transform duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/admin/login" 
              className="btn btn-primary btn-sm rounded-full px-4 hover:scale-105 transition-transform duration-300"
            >
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar; 