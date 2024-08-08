import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import keelworksLogo from "../assets/keelworks_cover.jpg";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-10 w-auto"
              src={keelworksLogo}
              alt="KeelWorks"
            />
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              KeelHub
              <span className="block text-blue-600">Volunteer Management</span>
            </h1>
            <p className="mt-3 text-xl text-gray-600 sm:mt-5">
              Streamlining volunteer management for the KeelWorks Foundation.
            </p>
            <div className="mt-8 sm:mt-10">
              {!isLoggedIn && (
                <Link
                  to="/login"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition duration-300"
                >
                  Get started
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;