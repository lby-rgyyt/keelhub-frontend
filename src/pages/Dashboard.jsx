import UserInfoModal from "../components/UserInfoModal";
import "../assets/Dashboard.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import { useState } from "react";

const Dashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="dashboard-grid-container">
      <Header />
      <Sidebar />
      <Content />

      {/* {currentUser.hasLoggedIn ? (
        <h2>Welcome</h2>
      ) : (
        <UserInfoModal
          userId={currentUser.id}
          isOpen={true}
          currentUser={currentUser}
        />
      )} */}
      {/* <UserInfoModal
        userId={currentUser.id}
        isOpen={true}
        currentUser={currentUser}
      /> */}
    </div>
  );
};

export default Dashboard;
