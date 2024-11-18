import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UsercontextProvider } from "./context/Usercontext";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import Todos from "./components/todos";

axios.defaults.baseURL = "https://todo-app-backend-sand.vercel.app";
axios.defaults.withCredentials = true;

function App() {
  const [showLogin, setShowLogin] = useState(false); // State to control login modal
  const [user, setUser] = useState(null);

  // Handle successful login
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLogin(false); // Close the modal after login
  };

  return (
    <UsercontextProvider>
      <Navbar onLoginClick={() => setShowLogin(true)} />{" "}
      {/* Pass showLogin trigger */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<Todos />} /> {/* New Todos route */}
      </Routes>
      
      {/* Show Login Modal */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)} // Close the modal
          onLoginSuccess={handleLoginSuccess} // Handle successful login
        />
      )}

    </UsercontextProvider>
  );
}

export default App;
