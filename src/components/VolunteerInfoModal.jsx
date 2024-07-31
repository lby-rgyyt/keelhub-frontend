import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../assets/volunteerInfoModal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VolunteerInfoModal = ({
  userId,
  isOpen,
  onRequestClose,
  onSave,
  currentUser,
}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [volunteerInfo, setVolunteerInfo] = useState({
    skills: [],
    time_committed_per_week: 0,
    status: "pending",
  });

  useEffect(() => {
    console.log(userId);
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
        console.log("Successfully: ", response.data);
        const { skills, time_committed_per_week, status } = response.data;
        setVolunteerInfo({ skills, time_committed_per_week, status });
      } catch (error) {
        console.log(error);
      }
    };
    if (isOpen) {
      fetchUser();
    }
  }, [isOpen, userId]);

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
    try {
      // update info
      const response1 = await axios.put(
        `http://localhost:3001/api/volunteers/${userId}`,
        volunteerInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Updated Successfully: ", response1.data);

      if (!currentUser.hasLoggedIn) {
        //update has loggedIn
        try {
          const response2 = await axios.put(
            `http://localhost:3001/api/users/${userId}`,
            { hasLoggedIn: true },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          navigate("/dashboard");
          console.log("Change hasLoggedIn Successfully");
        } catch (error) {
          console.log("Change hasLoggedIn Failed, ", error);
        }
      }
      // navigate("/");
    } catch (error) {
      console.log(error);
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
    >
      <div className="volunteer-info-modal">
        <h2>Update Volunteer Information</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="skills">Skills</label>
            {volunteerInfo.skills.map((skill, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="skills"
                  value={skill}
                  onChange={(e) => handleSkillsChange(e, index)}
                  placeholder="Skill"
                />
                <button type="button" onClick={() => handleRemoveSkill(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddSkill}>
              Add Skill
            </button>
          </div>
          <div>
            <label htmlFor="time_committed_per_week">
              Time Committed per Week (hours)
            </label>
            <input
              type="number"
              name="time_committed_per_week"
              value={volunteerInfo.time_committed_per_week}
              onChange={handleChange}
              placeholder="Time Committed per Week"
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select
              name="status"
              value={volunteerInfo.status}
              onChange={handleChange}
            >
              {Object.keys(statusOptions).map((key) => (
                <option key={key} value={key}>
                  {statusOptions[key]}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Update Volunteer Info</button>
          <button type="button" onClick={onRequestClose}>
            Close
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default VolunteerInfoModal;
