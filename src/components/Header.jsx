import React from "react";
import { BsFillBellFill, BsPersonCircle } from "react-icons/bs";

function Header() {
  return (
    <header className="header-container">
      <div className="header-left">Volunteer Processing App</div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
}

export default Header;
