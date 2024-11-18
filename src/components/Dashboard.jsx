// Dashboard.js
import React from "react";
import { Usercontext } from "../context/Usercontext";
import { useContext } from "react";

const Dashboard = () => {
  const { user } = useContext(Usercontext);

  return (
    <div className="p-6 bg-purple-100 rounded-lg text-center">
      {!!user && (
        <h2 className="text-2xl font-bold text-purple-800">
          Hey, {user.name}!
        </h2>
      )}
    </div>
  );
};

export default Dashboard;
