import { useContext } from "react";
import { Usercontext } from "../context/Usercontext";
import { Link } from "react-router-dom";
import Todos from "./todos";

const Home = () => {
  const { user } = useContext(Usercontext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-50">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {user ? (
          <div className="space-y-8 animate-fadeIn">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 sm:p-12">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,#94a3b8_1px,transparent_1px),linear-gradient(180deg,#94a3b8_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                </div>
              </div>
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 animate-slideUp">
                  Welcome back, {user?.name || "Guest"}!
                </h2>
                <p className="text-violet-100 text-lg sm:text-xl opacity-90 animate-slideUp animation-delay-200">
                  Ready to be productive today?
                </p>
              </div>
              <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4">
                <div className="w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-sm border border-violet-100/20 animate-slideUp animation-delay-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 inline-flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-violet-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Your Tasks
                </h3>
                <div className="h-10 w-10 bg-violet-500/10 rounded-full flex items-center justify-center animate-pulse">
                  <svg
                    className="w-5 h-5 text-violet-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>
              <Todos />
            </div>
          </div>
        ) : (
          <div className="min-h-[80vh] flex flex-col items-center justify-center text-center animate-fadeIn">
            <div className="relative w-full max-w-2xl mx-auto p-8 sm:p-12">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-100/50 to-indigo-100/50 rounded-3xl transform rotate-1 scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-100/50 to-indigo-100/50 rounded-3xl transform -rotate-1 scale-105"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 sm:p-12 shadow-xl border border-violet-100/20">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-slideUp">
                  Welcome to Todo App
                </h2>
                <p className="text-gray-600 text-lg sm:text-xl mb-8 animate-slideUp animation-delay-200">
                  Stay organized and boost your productivity with our intuitive
                  todo app.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slideUp animation-delay-300">
                  <Link
                    to="/login"
                    className="w-full sm:w-auto px-8 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-violet-500/25"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full sm:w-auto px-8 py-3 bg-white text-violet-600 rounded-xl font-medium hover:bg-violet-50 transform hover:scale-105 transition-all duration-300 shadow-lg border-2 border-violet-600/10 hover:border-violet-600/30"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
