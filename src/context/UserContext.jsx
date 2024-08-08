import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

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

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     axios
  //       .get("/api/auth/me", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       .then((response) => {
  //         console.log(response.data);
  //         setCurrentUser(response.data.user);
  //         setIsLoggedIn(true);
  //       })
  //       .catch(() => {
  //         logout();
  //       });
  //   }
  // }, []);

  // // use access_token to get data
  // const login = useGoogleLogin({
  //   onSuccess: async (response) => {
  //     try {
  //       const res = await axios.get(
  //         "https://www.googleapis.com/oauth2/v3/userinfo",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${response.access_token}`,
  //           },
  //         }
  //       );
  //       console.log(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  // });

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
    <UserContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        login,
        logout,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
