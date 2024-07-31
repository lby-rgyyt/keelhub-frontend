import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";
import useAuth from "./hooks/useAuth";
import CreateAccount from "./components/CreateAccount";
import Profile from "./components/Profile";
import Dashboard from "./pages/Dashboard";

import { useState } from "react";

function App() {
  const isAuthenticated = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/create-account"
          element={
            isAuthenticated ? <CreateAccount /> : <Navigate to="/login" />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/Dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
