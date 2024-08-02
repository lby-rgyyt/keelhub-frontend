import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";


function Content() {
  const { currentUser } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.role === "admin") {
      setIsAdmin(true);
      console.log("setIsAdmin:", true);
    }
  }, [currentUser]);

  return (
    <main className="main-container">
      <div className="main-title">
        <h1>Dashboard Placeholder</h1>
      </div>
      {isAdmin && (
        <Link to="/create-account">
          <button
            className="button-10"
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Create Account
          </button>
        </Link>
      )}
    </main>
  );
}

export default Content;
