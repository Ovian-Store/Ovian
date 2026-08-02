import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-black/40 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Ovian Logo"
            className="h-10 w-10 object-contain transition-transform duration-500 hover:scale-110"
          />
          <span className="text-xl font-bold text-yellow-400">Ovian Cloths</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-white">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/products" className="hover:text-yellow-400">Products</Link>
          <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
        </div>

        {/* Right side buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-yellow-400 font-semibold">{user.email}</span>
              <button
                onClick={onLogout}
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-black/60 backdrop-blur-md rounded-b-lg text-white">
          <Link to="/" className="block hover:text-yellow-400">Home</Link>
          <Link to="/products" className="block hover:text-yellow-400">Products</Link>
          <Link to="/contact" className="block hover:text-yellow-400">Contact</Link>
          {user ? (
            <button
              onClick={onLogout}
              className="w-full bg-yellow-400 text-black py-1 rounded hover:bg-yellow-500 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="w-full bg-yellow-400 text-black py-1 rounded hover:bg-yellow-500 transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
