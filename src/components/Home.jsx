import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        <header className="relative">
          <div className="bg-gray-900 pt-6">
            <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6" aria-label="Global">
              <div className="flex items-center flex-1">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <a href="#">
                    <span className="sr-only">KeelWorks</span>
                    <img
                      className="h-8 w-auto sm:h-10"
                      src="/api/placeholder/32/32"
                      alt="KeelWorks"
                    />
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                {isLoggedIn ? (
                  <>
                    <Link to="/dashboard" className="text-base font-medium text-white hover:text-gray-300">
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                  >
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </header>

        <main>
          <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block">KeelHub</span>
                      <span className="block text-blue-400">Volunteer Management</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Streamlining volunteer management for the KeelWorks Foundation.
                    </p>
                    <div className="mt-10 sm:mt-12">
                      {!isLoggedIn && (
                        <Link
                          to="/login"
                          className="block w-full py-3 px-4 rounded-md shadow bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 focus:ring-offset-gray-900"
                        >
                          Get started
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    <img
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="/api/placeholder/640/480"
                      alt="KeelWorks Volunteers"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;