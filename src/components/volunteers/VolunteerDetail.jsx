import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useLocation } from "react-router-dom";
import { FaPencilAlt, FaUserEdit } from "react-icons/fa";
import VolunteerNotes from "./VolunteerNotes";
import UserInfoModal from "../UserInfoModal";
import VolunteerInfoModal from "../VolunteerInfoModal";
import "../../styles/VolunteerDetail.css";
import "../../assets/Dashboard.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VolunteerDetail = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const { volunteer, formattedDate } = location.state || {};
  const [currentVolunteer, setCurrentVolunteer] = useState(volunteer);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

  const updateCurrentVolunteerStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/volunteers/detail/${currentVolunteer.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("volunteer detail: ", response.data);
      setCurrentVolunteer(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateCurrentVolunteerStatus();
  }, []);

  const handleEditProfile = () => {
    setIsUserModalOpen(true);
    updateCurrentVolunteerStatus();
  };
  const handleEditVolunteerInfo = () => {
    setIsVolunteerModalOpen(true);
    updateCurrentVolunteerStatus();
  };

  return (
    // <div className="dashboard-grid-container">
    <div>
      <div className="volunteer-detail">
        <Header />
        <Sidebar />
        <div className="content">
          <div className="breadcrumb">
            Volunteers / {currentVolunteer?.first_name}{" "}
            {currentVolunteer?.last_name}
          </div>
          <div className="user-info">
            <img
              src={currentVolunteer?.profile_pic}
              alt={currentVolunteer?.first_name}
              className="profile-pic"
            />
            <div className="user-details">
              <div className="name-and-edit">
                <h2>
                  {currentVolunteer?.first_name} {currentVolunteer?.last_name}
                  <span className="status">
                    {currentVolunteer?.Volunteer.status}
                  </span>
                </h2>
                <div className="edit-buttons">
                  <button className="edit-button" onClick={handleEditProfile}>
                    <FaPencilAlt /> Edit Profile
                  </button>
                  <button
                    className="edit-button volunteer-edit"
                    onClick={handleEditVolunteerInfo}
                  >
                    <FaUserEdit /> Edit Volunteer Info
                  </button>
                </div>
              </div>

              <p>{currentVolunteer?.Volunteer.jobTitles[0].title}</p>
              <div className="skills">
                {currentVolunteer?.Volunteer.skills &&
                  currentVolunteer.Volunteer.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <table className="info-table">
            <tbody>
              <tr>
                <th>Timezone</th>
                <th>Location</th>
                <th>KeelWorks Start Date</th>
                <th>Agreed Hours</th>
                <th>Email</th>
              </tr>
              <tr>
                <td>{currentVolunteer?.timezone}</td>
                <td>{currentVolunteer?.location}</td>
                <td>{formattedDate}</td>
                <td>
                  {currentVolunteer?.Volunteer.time_committed_per_week} / Week
                </td>
                <td>{currentVolunteer?.personal_email}</td>
              </tr>
            </tbody>
          </table>
          <ToastContainer />

          <VolunteerNotes volunteerId={currentVolunteer?.id} />
        </div>

        <UserInfoModal
          userId={currentVolunteer.id}
          isOpen={isUserModalOpen}
          setIsUserModalOpen={setIsUserModalOpen}
          onRequestClose={() => {
            setIsUserModalOpen(false);
            window.location.reload();
          }}
          isManual={true}
        />

        <VolunteerInfoModal
          userId={currentVolunteer.id}
          isOpen={isVolunteerModalOpen}
          setIsVolunteerModalOpen={setIsVolunteerModalOpen}
          onRequestClose={() => {
            setIsVolunteerModalOpen(false);
            window.location.reload();
          }}
          isManual={true}
        />
      </div>
    </div>
  );
};

export default VolunteerDetail;
