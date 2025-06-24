import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out");
    navigate("/login");
  };
  

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">JobPortal</h1>
        <ul className="hidden md:flex space-x-6 items-center">
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/jobs" className="hover:text-gray-300">Jobs</Link></li>
          <li><Link to="/profile" className="hover:text-gray-300">Profile</Link></li>
          <li><Link to="/messages" className="hover:text-gray-300">Messages</Link></li>

          {!isLoggedIn ? (
            <>
              <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
              <li><Link to="/signup" className="hover:text-gray-300">Signup</Link></li>
            </>
          ) : (
            <li><button onClick={handleLogout} className="hover:text-gray-300">Logout</button></li>
          )}
        </ul>
        <button className="md:hidden block" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <ul className="md:hidden mt-4 space-y-4 text-center">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link></li>
          <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
          <li><Link to="/messages" onClick={() => setMenuOpen(false)}>Messages</Link></li>

          {!isLoggedIn ? (
            <>
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
              <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link></li>
            </>
          ) : (
            <li><button onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button></li>
          )}
        </ul>
      )}
    </nav>
    

  );
};

export default Navbar;
