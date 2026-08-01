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
            src="/logo.png" // place logo.png in public/
            alt="Ovian Logo"
            className="h-10 w-10 object-contain transition-transform duration-500 hover:scale-110"
          />
          {/* <span className="text-xl font-bold text-white">Ovian Cloths</span> */}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="transition-colors duration-300 hover:text-yellow-400 active:text-yellow-500">Home</Link>
          <Link to="/products" className="transition-colors duration-300 hover:text-yellow-400 active:text-yellow-500">Products</Link>
          <Link to="/contact" className="transition-colors duration-300 hover:text-yellow-400 active:text-yellow-500">Contact</Link>
        </div>

        {/* Right side buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <button onClick={onLogout} className="btn-white px-3 py-1 rounded transition-transform duration-300 hover:scale-105">Logout</button>
          ) : (
            <Link to="/login" className="btn-white px-3 py-1 rounded transition-transform duration-300 hover:scale-105">Login</Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none transform transition-transform duration-300 hover:rotate-90 text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-2 bg-black/60 backdrop-blur-md rounded-b-lg">
          <Link to="/" className="block hover:text-yellow-400 active:text-yellow-500 transition-colors">Home</Link>
          <Link to="/products" className="block hover:text-yellow-400 active:text-yellow-500 transition-colors">Products</Link>
          <Link to="/contact" className="block hover:text-yellow-400 active:text-yellow-500 transition-colors">Contact</Link>
          {user ? (
            <button onClick={onLogout} className="btn-white w-full py-1 rounded transition-transform duration-300 hover:scale-105">Logout</button>
          ) : (
            <Link to="/login" className="btn-white w-full py-1 rounded transition-transform duration-300 hover:scale-105">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
