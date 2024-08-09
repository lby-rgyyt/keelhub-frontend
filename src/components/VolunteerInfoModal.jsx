import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const VolunteerInfoModal = ({
  userId,
  isOpen,
  onRequestClose,
  isManual,
  setIsVolunteerModalOpen,
}) => {
  const { currentUser } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [volunteerInfo, setVolunteerInfo] = useState({
    skills: [],
    time_committed_per_week: 0,
    status: "pending",
  });
  const [isNewVolunteer, setIsNewVolunteer] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/volunteers/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { skills, time_committed_per_week, status } = response.data;
        setVolunteerInfo({ skills, time_committed_per_week, status });
        setIsNewVolunteer(false); // Volunteer exists
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsNewVolunteer(true); // Volunteer does not exist
        } else {
          console.log(error);
        }
      }
    };
    if (isOpen) {
      fetchUser();
    }
  }, [isOpen, userId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVolunteerInfo({ ...volunteerInfo, [name]: value });
  };

  const handleSkillsChange = (e, index) => {
    const newSkills = [...volunteerInfo.skills];
    newSkills[index] = e.target.value;
    setVolunteerInfo({ ...volunteerInfo, skills: newSkills });
  };

  const handleAddSkill = () => {
    setVolunteerInfo({
      ...volunteerInfo,
      skills: [...volunteerInfo.skills, ""],
    });
  };

  const handleRemoveSkill = (index) => {
    const newSkills = volunteerInfo.skills.filter((_, i) => i !== index);
    setVolunteerInfo({ ...volunteerInfo, skills: newSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmation = window.confirm(
      "Are you sure you want to update your information?"
    );
    if (!confirmation) return;

    // Update hasLoggedIn status if needed
    if (!currentUser.hasLoggedIn) {
      await axios.put(
        `http://localhost:3001/api/users/${userId}`,
        { hasLoggedIn: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    onRequestClose(); // Close the modal immediately after confirmation

    try {
      // if (isNewVolunteer) {
      // Create new volunteer info
      // await axios.post(`http://localhost:3001/api/volunteers`, { userId, ...volunteerInfo }, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // } else {
      // Update existing volunteer info
      // await axios.put(
      //   `http://localhost:3001/api/volunteers/${userId}`,
      //   volunteerInfo,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      // }
      const response = await axios.put(
        `http://localhost:3001/api/volunteers/${userId}`,
        volunteerInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Volunteer info updated successfully", response.data);
      // navigate("/dashboard");
    } catch (error) {
      console.log("Error updating volunteer info: ", error);
    }
  };

  const statusOptions = {
    pending: "Pending Registering",
    in_progress: "Onboarding",
    unassigned: "Unassigned",
    assigned: "Assigned",
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Volunteer Info"
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
      overlayClassName="fixed inset-0"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Update Volunteer Information
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="skills" className="block mb-1">
              Skills
            </label>
            {volunteerInfo.skills.map((skill, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  name="skills"
                  value={skill}
                  onChange={(e) => handleSkillsChange(e, index)}
                  placeholder="Skill"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSkill}
              className="mt-2 text-blue-500 hover:text-blue-700"
            >
              Add Skill
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="time_committed_per_week" className="block mb-1">
              Time Committed per Week (hours)
            </label>
            <input
              type="number"
              name="time_committed_per_week"
              value={volunteerInfo.time_committed_per_week}
              onChange={handleChange}
              placeholder="Time Committed per Week"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="status" className="block mb-1">
              Status
            </label>
            <select
              name="status"
              value={volunteerInfo.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              {Object.keys(statusOptions).map((key) => (
                <option key={key} value={key}>
                  {statusOptions[key]}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Update Volunteer Info
          </button>
        </form>
        {isManual && (
          <button
            onClick={() => {
              setIsVolunteerModalOpen(false);
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

export default VolunteerInfoModal;
