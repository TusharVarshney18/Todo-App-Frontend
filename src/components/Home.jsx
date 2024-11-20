import React, { useContext } from "react";
import { Usercontext } from "../context/Usercontext";
import { Link } from "react-router-dom";
import Todos from "./todos";

const Home = () => {
  const { user } = useContext(Usercontext);

  return (
    <div className="home-container p-6">
      {user ? (
        <>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-fadeIn">
          Welcome back, {user?.name || "Guest"}!
          </h2>
<p className="mt-1 text-base font-medium text-gray-700 animate-fadeIn delay-200">
  Here are your todos:
</p>

          <Todos />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center space-y-4 mt-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome to Todo App!
          </h2>
          <p className="text-gray-600">
            Please{" "}
            <Link
              to="/login"
              className="text-blue-500 underline hover:text-blue-700 transition"
            >
              login
            </Link>{" "}
            or{" "}
            <Link
              to="/register"
              className="text-blue-500 underline hover:text-blue-700 transition"
            >
              register
            </Link>{" "}
            to view your todos.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
