import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = ({ onClose }) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("/register", { name, email, password });
      
      if (data && data.error) {
        toast.error(data.error);
      } else {
        setData({ name: "", email: "", password: "" });
        toast.success("Registration Successful! Welcome User.");
        navigate("/");
      }
    } catch (error) {
      console.error("Registration failed: ", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handlecancel = () => {
    setData({ name: "", email: "", password: "" });
    if (onClose) onClose();
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-85 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Sign up</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="signup-username" className="block font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="signup-username"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="signup-email" className="block font-medium mb-1">
              Your Email ID
            </label>
            <input
              type="email"
              id="signup-email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="signup-password" className="block font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="signup-password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handlecancel}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
