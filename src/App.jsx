import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";
import CreateAccount from "./components/CreateAccount";
import Profile from "./components/Profile";
import Dashboard from "./pages/Dashboard";
import { UserContext } from "./context/UserContext";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="App">
      {/* <ToastContainer position="top-center" /> */}
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/create-account"
          element={isLoggedIn ? <CreateAccount /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
