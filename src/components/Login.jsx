import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../context/Usercontext";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const { setUser } = useContext(Usercontext);
  const navigate = useNavigate();

  const loginuser = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      const { data } = await axios.post("/login", { email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
 
        setUser(data.user); 
        setData({ email: "", password: "" });
      
        if (onClose) onClose(); 
        
        toast.success("Login successful!");

    
        setTimeout(() => {
          navigate("/");
        }, 2000)
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Unable to login. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handlecancel = () => {
    setData({ email: "", password: "" });
    if (onClose) onClose();
    navigate("/");
  };



  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded p-5 shadow-lg">
        <h2 className="text-black font-bold mb-4">Login</h2>
        <form onSubmit={loginuser}>
          <div className="mb-4">
            <label htmlFor="Email" className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full p-2 border-rounded"
              required
              autoComplete="username"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="Password" className="block font-medium mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full p-2 border-rounded"
              required
              autoComplete="current-password"
            />
            
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
            >
              Login
            </button>
            <button
              type="button"
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={handlecancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
