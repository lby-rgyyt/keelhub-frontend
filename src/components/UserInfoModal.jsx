import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../assets/userInfoModal.css";
import VolunteerInfoModal from "./VolunteerInfoModal";
import { UserContext } from "../context/UserContext"; 

const UserInfoModal = ({
  userId,
  isOpen,
  onRequestClose,
  onSave,
}) => {
  const { currentUser, login } = useContext(UserContext); 
  const token = localStorage.getItem("token");

  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    personal_email: "",
    role: "",
    city: "",
    phone: "",
    timezone: "",
  });
  const [showVolunteerInfo, setShowVolunteerInfo] = useState(false);

  useEffect(() => {
    if (isOpen && currentUser) {
      setUserInfo({
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        personal_email: currentUser.personal_email,
        role: currentUser.role,
        city: currentUser.city,
        phone: currentUser.phone,
        timezone: currentUser.timezone,
      });
    }
  }, [isOpen, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmation = window.confirm("Are you sure you want to update your information?");
    if (!confirmation) return;

    try {
      const updatedUserInfo = { ...userInfo, hasLoggedIn: true };

      const response = await axios.put(
        `http://localhost:3001/api/users/${userId}`,
        updatedUserInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User updated successfully: ", response.data);

      // Update the user in the context
      login(response.data.user, token);

      if (currentUser.role === "volunteer" && !currentUser.hasLoggedIn) {
        setShowVolunteerInfo(true);
      }

      onRequestClose(); 
    } catch (error) {
      console.log("Error updating user info: ", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="User Info"
    >
      <div className="user-info-modal">
        <h2>Update User Information</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              value={userInfo.first_name}
              onChange={handleChange}
              placeholder="First Name"
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={userInfo.last_name}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
          <div>
            <label htmlFor="personal_email">Personal Email</label>
            <input
              type="email"
              name="personal_email"
              value={userInfo.personal_email}
              onChange={handleChange}
              placeholder="Personal Email"
              disabled
            />
          </div>
          <div>
            <label htmlFor="role">Role</label>
            <input
              type="text"
              name="role"
              value={userInfo.role}
              onChange={handleChange}
              placeholder="Role"
              disabled
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              value={userInfo.city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
          </div>
          <div>
            <label htmlFor="timezone">Timezone</label>
            <input
              type="text"
              name="timezone"
              value={userInfo.timezone}
              onChange={handleChange}
              placeholder="Timezone"
            />
          </div>
          <button type="submit">Update User Info</button>
        </form>
      </div>
      {showVolunteerInfo && (
        <VolunteerInfoModal
          userId={currentUser.id}
          isOpen={true}
          currentUser={currentUser}
        />
      )}
    </Modal>
  );
};

export default UserInfoModal;
