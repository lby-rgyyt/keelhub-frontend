import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "../styles/CreateAccount.css";

Modal.setAppElement("#root");

const CreateAccount = ({ isOpen, onClose }) => {
  const blank_user = {
    username: "",
    password: "",
    email: "",
    role: "volunteer",
    access_level: "1",
    firstName: "",
    lastName: "",
    city: "",
    phone: "",
    profilePic: "",
    timezone: "",
  };
  const [formData, setFormData] = useState(blank_user);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3001/api/users",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("new user: ", response.data);
      if (formData.role === "volunteer") {
        const newVolunteer = {
          volunteer_id: response.data.data.id,
          skills: [],
        };
        const response2 = await axios.post(
          "http://localhost:3001/api/volunteers",
          newVolunteer,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("new volunteer: ", response2.data);
      }

      setSuccess("User created successfully!");
      setFormData(blank_user);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add New Volunteer"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="create-account">
        <h1>Add New Volunteer</h1>
        <form onSubmit={handleSubmit}>
          {["firstName", "lastName", "username", "password"].map((field) => (
            <div key={field}>
              <label htmlFor={field}>
                {field
                  .replace(/([A-Z])/g, " $1")
                  .charAt(0)
                  .toUpperCase() + field.replace(/([A-Z])/g, " $1").slice(1)}
                :
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div>
            <label htmlFor="role">Role:</label>
            <select id="role" value={formData.role} onChange={handleChange}>
              <option value="volunteer">Volunteer</option>
              <option value="project_manager">Project Manager</option>
              <option value="hr">HR</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="button-group">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Save
            </button>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
    </Modal>
  );
};

export default CreateAccount;
