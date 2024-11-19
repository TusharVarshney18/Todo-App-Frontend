import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token", token);
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("https://todo-app-backend-sand.vercel.app/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data); // Assuming response contains profile data
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!profile) fetchProfile();
  }, [profile]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Welcome, {profile?.username || "User"}</h2>
      <p>Email: {profile?.email || "Not available"}</p>
    </div>
  );
};

export default Profile;
