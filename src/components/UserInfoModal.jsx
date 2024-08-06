import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../assets/userInfoModal.css";
import VolunteerInfoModal from "./VolunteerInfoModal";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const UserInfoModal = ({
  userId,
  isOpen,
  setIsUserModalOpen,
  onRequestClose,
  isManual,
}) => {
  const { login } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("current user: ", response.data);
        setCurrentUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

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

    const confirmation = window.confirm(
      "Are you sure you want to update your information?"
    );
    if (!confirmation) return;

    try {
      // const tempHasLoggedIn = currentUser.hasLoggedIn;
      // let updatedUserInfo = { ...userInfo, hasLoggedIn: true };
      // if (currentUser.role === "volunteer" && !tempHasLoggedIn) {
      //   updatedUserInfo = { ...userInfo, hasLoggedIn: false };
      // }

      let updatedUserInfo = { ...userInfo, hasLoggedIn: true };

      const response = await axios.put(
        `http://localhost:3001/api/users/${userId}`,
        updatedUserInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("User updated successfully");
      console.log("User updated successfully: ", response.data);

      // Update the user in the context
      // console.log(response.data.user);
      login(response.data.data, token);

      onRequestClose();

      if (currentUser.role === "volunteer" && !currentUser.hasLoggedIn) {
        setShowVolunteerInfo(true);
      }
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
        {isManual && (
          <button
            onClick={() => {
              setIsUserModalOpen(false);
            }}
          >
            close
          </button>
        )}
        {/* {showVolunteerInfo && (
          <VolunteerInfoModal
            userId={currentUser.id}
            isOpen={showVolunteerInfo}
            setIsVolunteerModalOpen={setShowVolunteerInfo}
            onRequestClose={() => {
              setShowVolunteerInfo(false);
            }}
            isManual={false}
          />
        )} */}
      </div>
    </Modal>
  );
};

export default UserInfoModal;
