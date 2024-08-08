import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import 'antd/dist/reset.css';
import './index.css'; 


ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>
);
