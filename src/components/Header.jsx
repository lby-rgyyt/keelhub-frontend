import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillBellFill, BsPersonCircle } from "react-icons/bs";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, logout } = useContext(UserContext);
  const handleLogout = () => {
    logout();
    alert("You have signed out");
    // toast.success("You have signed out");
    navigate("/");
  };

  return (
    <header className="header-container">
      <div className="header-left">
        {currentUser && currentUser.first_name
          ? `Welcome, ${currentUser.first_name}!`
          : "Welcome!"}
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
        <BsPersonCircle className="icon" />
        {isLoggedIn && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
