import React, { useState, useContext } from "react";
import UserInfoModal from "./UserInfoModal";
import VolunteerInfoModal from "./VolunteerInfoModal";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { currentUser } = useContext(UserContext);

  const handleUserSave = () => {
    setMessage("User info saved successfully");
  };

  const handleVolunteerSave = () => {
    setMessage("Volunteer info saved successfully");
  };

  const handleOpenUserModal = () => {
    setIsUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
  };

  const handleOpenVolunteerModal = () => {
    setIsVolunteerModalOpen(true);
  };

  const handleCloseVolunteerModal = () => {
    setIsVolunteerModalOpen(false);
  };

  return (
    <div className="profile-container">
      <button onClick={handleOpenUserModal}>Edit Profile</button>
      <UserInfoModal
        userId={currentUser.id}
        isOpen={isUserModalOpen}
        setIsUserModalOpen={setIsUserModalOpen}
        onRequestClose={handleCloseUserModal}
        isManual={true}
        currentUser={currentUser}
      />
      {currentUser.role === "volunteer" ? (
        <div>
          <button onClick={handleOpenVolunteerModal}>
            Edit Volunteer Info
          </button>
          <VolunteerInfoModal
            userId={currentUser.id}
            isOpen={isVolunteerModalOpen}
            setIsVolunteerModalOpen={setIsVolunteerModalOpen}
            onRequestClose={handleCloseVolunteerModal}
            isManual={true}
            currentUser={currentUser}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Profile;
