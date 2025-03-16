import axios from "axios";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const Usercontext = createContext({});

export function UsercontextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile function
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      const { data } = await axios.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching profile:", error.message || error);
      setUser(null);
      localStorage.removeItem("token"); // Remove invalid token
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch profile on mount and when token changes
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
      setUser(null);
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  return (
    <Usercontext.Provider
      value={{ user, setUser, fetchProfile, logout, isLoading }}
    >
      {children}
    </Usercontext.Provider>
  );
}

UsercontextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
