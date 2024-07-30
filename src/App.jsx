import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";
import useAuth from "./hooks/useAuth";
import CreateAccount from "./components/CreateAccount";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={useAuth() ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="/home" element={<Home />} />
        <Route
          path="/create-account"
          element={useAuth() ? <CreateAccount /> : <Navigate to="/login" />}
        />
        {/* <Route path="/create-account" element={<CreateAccount />} /> */}
      </Routes>
    </div>
  );
}

export default App;
