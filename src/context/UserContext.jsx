import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Failed to parse stored user", e);
      return null;
    }
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        setCurrentUser(response.data.user);
        setIsLoggedIn(true);
      }).catch(() => {
        logout();
      });
    }
  }, []);

  const login = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
