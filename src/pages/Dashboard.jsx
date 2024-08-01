import React, { useContext, useState, useEffect } from "react";
import UserInfoModal from "../components/UserInfoModal";
import VolunteerInfoModal from "../components/VolunteerInfoModal"; 
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import "../assets/Dashboard.css";

const Dashboard = () => {
  const { currentUser } = useContext(UserContext);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [showVolunteerInfoModal, setShowVolunteerInfoModal] = useState(false);

  // useEffect(() => {
    // console.log("Dashboard useEffect triggered");
    // console.log("currentUser: ", currentUser);

  //   if (currentUser && !currentUser.hasLoggedIn) {
  //     alert("Welcome to Keelworks! Here is some information you need to fill in order to proceed.");
  //     setShowUserInfoModal(true);

  //     if (currentUser.role === "volunteer") {
  //       setShowVolunteerInfoModal(true);
  //     }
  //   }
  // }, [currentUser]);

  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div className="dashboard-grid-container">
      <Header />
      <Sidebar />
      <Content />

      {/* Display UserInfoModal if the user is logging in for the first time */}
      {/* {showUserInfoModal && (
        <UserInfoModal
          userId={currentUser.id}
          isOpen={true}
          currentUser={currentUser}
          onClose={() => setShowUserInfoModal(false)}
        />
      )} */}

      {/* {showVolunteerInfoModal && (
        <VolunteerInfoModal
          userId={currentUser.id}
          isOpen={true}
          currentUser={currentUser}
          onClose={() => setShowVolunteerInfoModal(false)}
        />
      )} */}
    </div>
  );
};

export default Dashboard;
