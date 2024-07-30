import React, { useState } from 'react';
import UserInfoModal from './UserInfoModal';
import VolunteerInfoModal from './VolunteerInfoModal';
import '../assets/profile.css';

const Profile = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [message, setMessage] = useState('');


  const handleUserSave = () => {
    setMessage('User info saved successfully');
  };

  const handleVolunteerSave = () => {
    setMessage('Volunteer info saved successfully');
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
        userId={1}
        isOpen={isUserModalOpen}
        onRequestClose={handleCloseUserModal}
        onSave={handleUserSave}
      />
      <button onClick={handleOpenVolunteerModal}>Edit Volunteer Info</button>
      <VolunteerInfoModal
        userId={1}
        isOpen={isVolunteerModalOpen}
        onRequestClose={handleCloseVolunteerModal}
        onSave={handleVolunteerSave}
      />
    </div>
  );
};

export default Profile;
