import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import keelworksLogo from "../assets/keelworks_cover.jpg";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, login } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError(null);

    try{
      const credentialResponseDecoded = jwtDecode(credentialResponse.credential);

      const response = await axios.post("http://localhost:3001/api/auth/google-login", credentialResponseDecoded);

      const {token, user } = response.data;

      login(user, token);
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      setError("Failed to login with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
    

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img className="h-10 w-auto" src={keelworksLogo} alt="KeelWorks" />
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
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
            <div >
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => {
                  setError("Google Login Failed");
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
