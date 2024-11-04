import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/Slices/authSlice"; // Adjust the path as needed
import { logoutClearCart } from "../redux/Slices/cartSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cartItemsCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutClearCart());
    navigate("/login");
    setDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-[#ab2091] p-4 shadow-md flex justify-between items-center fixed top-0 left-0 right-0 z-20">
      {/* Left Side: Logo and Links */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-white text-xl font-bold">
          MyShop
        </Link>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="md:hidden text-white">
          Menu
        </button>

        {/* Dropdown for Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 bg-[#ab2091] mt-2 rounded-md shadow-lg py-2 z-10">
            <Link
              to="/"
              className="block px-4 py-2 text-white hover:text-gray-200"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-4 py-2 text-white hover:text-gray-200"
              onClick={toggleMobileMenu}
            >
              Products
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 text-white hover:text-gray-200"
              onClick={toggleMobileMenu}
            >
              About Us
            </Link>
          </div>
        )}
      </div>

      {/* Right Side: User Greeting, Profile Dropdown, and Cart */}
      <div className="flex items-center space-x-4">
        {/* Cart Icon with Count */}
        <Link to="/cart" className="relative text-white hover:text-gray-200">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1 5m6-5v1m0-1h-2.1m2.1 0h2.1m-4.1 1a1 1 0 00-1 1h6a1 1 0 001-1m-5 5a1 1 0 001 1h4a1 1 0 001-1"
            />
          </svg>
          {cartItemsCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </Link>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              Hi, <span className="font-semibold">{user.name}</span>
            </button>
            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2">
                <Link
                  to="/user-info"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile Info
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
