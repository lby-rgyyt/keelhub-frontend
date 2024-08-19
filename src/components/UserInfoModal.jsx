import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import axios from "axios";
import VolunteerInfoModal from "./VolunteerInfoModal";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";

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
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
      overlayClassName="fixed inset-0"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Update User Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="first_name" className="block mb-1">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={userInfo.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={userInfo.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="personal_email" className="block mb-1">
              Personal Email
            </label>
            <input
              type="email"
              name="personal_email"
              value={userInfo.personal_email}
              onChange={handleChange}
              placeholder="Personal Email"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block mb-1">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={userInfo.role}
              onChange={handleChange}
              placeholder="Role"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={userInfo.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="timezone" className="block mb-1">
              Timezone
            </label>
            <input
              type="text"
              name="timezone"
              value={userInfo.timezone}
              onChange={handleChange}
              placeholder="Timezone"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Update User Info
          </button>
        </form>
        {isManual && (
          <button
            onClick={() => {
              setIsUserModalOpen(false);
            }}
            className="mt-4 text-blue-500 hover:text-blue-700"
          >
            Close
          </button>
        )}
      </div>
    </Modal>
  );
};

export default UserInfoModal;
