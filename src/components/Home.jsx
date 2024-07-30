import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>KeelHub</h1>
      <p>Welcome to KeelHub! Streamlining volunteer management for the KeelWorks Foundation.</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Home;
