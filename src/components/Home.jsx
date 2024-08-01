import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/home.css";

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/");
  };
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>KeelHub</h1>
      <p>
        Welcome to KeelHub! Streamlining volunteer management for the KeelWorks
        Foundation.
      </p>
      {localStorage.getItem("token") ? (
        <div>
          <button class="button-10"
            onClick={() => {
              handleLogout();
            }}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Logout
          </button>
          <Link to="/create-account">
            <button class="button-10"style={{ padding: "10px 20px", fontSize: "16px" }}>
              Create Account
            </button>
          </Link>
          <Link to="/dashboard">
            <button class="button-10"style={{ padding: "10px 20px", fontSize: "16px" }}>
              Dashboard
            </button>
          </Link>
        </div>
      ) : (
        <Link to="/login">
          <button class="button-10" style={{ padding: "10px 20px", fontSize: "16px" }}>
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default Home;
