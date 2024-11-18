import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Usercontext = createContext({});

export function UsercontextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [user]);

  const logout = async () => {
    try {
      // Clear user session on the server
      await axios.post("/logout");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // Clear local user state and token
      setUser(null);
      localStorage.removeItem("token"); // Optional: clear localStorage if token is stored here
      // Redirect user to login or home page
      window.location.href = "/login";
    }
  };
  

  return (
    <Usercontext.Provider value={{ user, setUser, logout }}>
      {children}
    </Usercontext.Provider>
  );
}
