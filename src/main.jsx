import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import "antd/dist/reset.css";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <GoogleOAuthProvider clientId="1071668087621-o4nudpv8o0mg3aoclqkklv7p16qcqiuk.apps.googleusercontent.com">
      <Router>
        <ToastContainer />
        <App />
      </Router>
    </GoogleOAuthProvider>
  </UserProvider>
);
