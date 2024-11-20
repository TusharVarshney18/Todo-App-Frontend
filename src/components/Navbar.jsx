import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Usercontext } from "../context/Usercontext";
import SignUp from "./Register";
import Login from "./Login";

const Navbar = () => {
  const { user, logout } = useContext(Usercontext); // Access user and logout from context
  const [showSignup, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignUp(false); // Ensure only one modal is shown
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false); // Ensure only one modal is shown
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowSignUp(false);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-violet-600 p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* App Name/Logo */}
        <div className="text-white font-bold text-2xl">
          Todo App By Varshney
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link
              to="/"
              className="text-white hover:bg-violet-800 p-2 rounded block"
            >
              Home
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <span className="text-white p-2 block">
                  Welcome, <strong>{user.name}</strong>!
                </span>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="text-white hover:bg-red-600 bg-red-500 p-2 rounded"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={handleSignUpClick}
                  className="text-white hover:bg-violet-800 p-2 rounded"
                >
                  Register
                </button>
              </li>
              <li>
                <button
                  onClick={handleLoginClick}
                  className="text-white hover:bg-violet-800 p-2 rounded"
                >
                  Login
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link
            to="/"
            className="block text-white bg-violet-700 p-2 rounded hover:bg-violet-800"
          >
            Home
          </Link>
          {!user ? (
            <>
              <button
                onClick={handleSignUpClick}
                className="block text-white bg-violet-700 p-2 rounded hover:bg-violet-800"
              >
                Register
              </button>
              <button
                onClick={handleLoginClick}
                className="block text-white bg-violet-700 p-2 rounded hover:bg-violet-800"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <span className="block text-white bg-violet-700 p-2 rounded">
                Welcome, <strong>{user.name}</strong>!
              </span>
              <button
                onClick={logout}
                className="block w-full text-white bg-red-600 p-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      {/* Modals for Sign Up and Log In */}
      {showSignup && <SignUp onClose={handleCloseModals} />}
      {showLogin && <Login onClose={handleCloseModals} />}
    </nav>
  );
};

export default Navbar;
