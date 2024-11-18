import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Usercontext } from "../context/Usercontext";
import SignUp from "./Register";
import Login from "./Login";

const Navbar = () => {
  const { user, logout } = useContext(Usercontext);
  const [showSignup, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLoginClick = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleSignUpClick = () => setShowSignUp(true);
  const handleCloseSignup = () => setShowSignUp(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-violet-600 p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-2xl">
          Todo App By Varshney
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6">
          <li className="flex-1">
            <Link
              to="/"
              className="text-white hover:bg-violet-800 p-2 rounded block text-center"
            >
              Home
            </Link>
          </li>

          {user ? (
            <>
              <li className="flex-1">
                <div className="text-white p-2 rounded block text-center">
                  Welcome, {user.name}!
                </div>
              </li>
              <li className="flex-1">
                <button
                  onClick={logout}
                  className="text-white hover:bg-red-600 bg-red-500 p-2 rounded block w-full"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="flex-1">
                <Link
                  onClick={handleSignUpClick}
                  to="/register"
                  className="text-white hover:bg-violet-800 p-2 rounded block text-center"
                >
                  Register
                </Link>
              </li>
              <li className="flex-1">
                <Link
                  onClick={handleLoginClick}
                  to="/login"
                  className="text-white hover:bg-violet-800 p-2 rounded block text-center"
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link
            to="/"
            className="block text-white bg-violet-700 p-2 rounded hover:bg-violet-800 text-center"
          >
            Home
          </Link>
          {!user && (
            <>
              <Link
                to="/register"
                className="block text-white bg-violet-700 p-2 rounded hover:bg-violet-800 text-center"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="block text-white bg-violet-700 p-2 rounded hover:bg-violet-800 text-center"
              >
                Login
              </Link>
            </>
          )}
          {user && (
            <>
              <div className="block text-white bg-violet-700 p-2 rounded text-center">
                Welcome, {user.name}!
              </div>
              <button
                onClick={logout}
                className="w-full text-white bg-red-600 p-2 rounded hover:bg-red-700 text-center"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      {/* Modals for Sign Up and Log In */}
      {showSignup && <SignUp onClose={handleCloseSignup} />}
      {showLogin && <Login onClose={handleCloseLogin} />}
    </nav>
  );
};

export default Navbar;
