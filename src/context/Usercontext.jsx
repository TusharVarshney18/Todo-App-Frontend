import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Usercontext = createContext({});

export function UsercontextProvider({ children }) {
  const [user, setUser] = useState(null);

  // Fetch user profile function
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null); // Clear user if no token
        return;
      }
      const { data } = await axios.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data.user); // Update user state
    } catch (error) {
      console.error("Error fetching profile:", error.message || error);
      setUser(null);
    }
  };

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await axios.post("/logout");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setUser(null); // Clear user state
      localStorage.removeItem("token"); // Remove token
      window.location.href = "/login"; // Redirect to login
    }
  };

  return (
    <Usercontext.Provider value={{ user, setUser, fetchProfile, logout }}>
      {children}
    </Usercontext.Provider>
  );
}
