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
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [showVolunteerInfoModal, setShowVolunteerInfoModal] = useState(false);

  const [second, setSecond] = useState(false);
  const [first, setFirst] = useState(false);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser && !currentUser.hasLoggedIn) {
      alert(
        "Welcome to Keelworks! Here is some information you need to fill in order to proceed."
      );
      setFirst(true);
      if (currentUser.role === "volunteer") {
        setSecond(true);
      }
    }
  }, [currentUser]);

  // useEffect(() => {
  //   // console.log("Dashboard useEffect triggered");
  //   // console.log("currentUser: ", currentUser);

  //   if (currentUser && !currentUser.hasLoggedIn) {
  //     alert(
  //       "Welcome to Keelworks! Here is some information you need to fill in order to proceed."
  //     );
  //     setShowUserInfoModal(true);

  //     if (currentUser.role === "volunteer") {
  //       setShowVolunteerInfoModal(true);
  //       setShowUserInfoModal(false);
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
      {/* <UserInfoModal
        userId={currentUser.id}
        isOpen={showUserInfoModal}
        onRequestClose={() => {
          setShowUserInfoModal(false);
        }}
        // showUserInfoModal={showUserInfoModal}
        isManual={false}
      /> */}

      <VolunteerInfoModal
        userId={currentUser.id}
        isOpen={second}
        setIsVolunteerModalOpen={setShowVolunteerInfoModal}
        onRequestClose={() => {
          setSecond(false);
        }}
        isManual={false}
      />
      <UserInfoModal
        userId={currentUser.id}
        isOpen={first}
        onRequestClose={() => {
          setFirst(false);
        }}
        // showUserInfoModal={showUserInfoModal}
        isManual={false}
      />
    </div>
  );
};

export default Dashboard;
