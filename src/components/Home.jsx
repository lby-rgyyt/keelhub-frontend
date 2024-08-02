import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../assets/home.css";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(UserContext);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="home-container">
      <h1>KeelHub</h1>
      <p>
        Welcome to KeelHub! Streamlining volunteer management for the KeelWorks
        Foundation.
      </p>
      {isLoggedIn ? (
        <button
          className="button-10"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button
            className="button-10"
          >
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default Home;
