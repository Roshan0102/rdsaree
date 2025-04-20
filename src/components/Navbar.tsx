import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated, logout } from '../utils/auth';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" onClick={closeMobileMenu}>
              <img 
                src="https://i.postimg.cc/fWXHdJcM/IMG-20250411-002449.jpg" 
                alt="RD Saree Collections Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </Link>
            {isAdmin ? (
              <>
                <Link 
                  to="/admin/dashboard"
                  className="text-white bg-primary hover:bg-primary-dark px-3 py-2 rounded-md text-sm font-medium"
                >
                  Manage Products
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/admin/login"
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={closeMobileMenu}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          >
            Products
          </Link>
          <Link
            to="/about"
            onClick={closeMobileMenu}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={closeMobileMenu}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          >
            Contact
          </Link>
          {isAdmin ? (
            <>
              <Link
                to="/admin/dashboard"
                onClick={closeMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary-dark"
              >
                Manage Products
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              onClick={closeMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
            >
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 