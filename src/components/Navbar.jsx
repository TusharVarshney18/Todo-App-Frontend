import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Usercontext } from "../context/Usercontext";
import SignUp from "./Register";
import Login from "./Login";

const Navbar = () => {
  const { user, logout } = useContext(Usercontext);
  const [showSignup, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignUp(false);
    setMobileMenuOpen(false);
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false);
    setMobileMenuOpen(false);
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowSignUp(false);
  };

  const toggleMobileMenu = () => {
    if (typeof setMobileMenuOpen === "function") {
      setMobileMenuOpen(!isMobileMenuOpen);
    } else {
      console.error("setMobileMenuOpen is not defined");
    }
  };
  return (
    <nav className="bg-gradient-to-r from-violet-600 to-violet-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* App Name/Logo */}
          <Link
            to="/"
            className="text-white font-bold text-2xl tracking-tight hover:text-violet-200 transition-colors"
          >
            Todo App
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-violet-500 ${
                location.pathname === "/" ? "bg-violet-500" : ""
              }`}
            >
              Home
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white text-sm">
                  Welcome, <strong className="font-medium">{user.name}</strong>
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-red-600 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSignUpClick}
                  className="bg-violet-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-violet-400 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Register
                </button>
                <button
                  onClick={handleLoginClick}
                  className="bg-white text-violet-600 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-violet-100 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Login
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white w-10 h-10 relative focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                  isMobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`block absolute h-0.5 w-5 bg-current transition-opacity duration-500 ease-in-out ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                  isMobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100 py-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              className={`text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-violet-500 ${
                location.pathname === "/" ? "bg-violet-500" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            {user ? (
              <>
                <span className="text-white px-3 py-2 text-sm">
                  Welcome, <strong className="font-medium">{user.name}</strong>
                </span>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-white bg-red-500 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSignUpClick}
                  className="text-white bg-violet-500 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-violet-400"
                >
                  Register
                </button>
                <button
                  onClick={handleLoginClick}
                  className="text-violet-600 bg-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-violet-100"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showSignup && <SignUp onClose={handleCloseModals} />}
      {showLogin && <Login onClose={handleCloseModals} />}
    </nav>
  );
};

export default Navbar;
