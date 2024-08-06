import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const [showPassword, setShowPassword] = useState(true);

  const generateRandomPassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData((prevState) => ({ ...prevState, password }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const copyPasswordToClipboard = () => {
    navigator.clipboard
      .writeText(formData.password)
      .then(() => {
        // alert(`Password copied to clipboard!`);
        toast.success("Password copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  const generateUsername = async () => {
    const { firstName, lastName } = formData;
    if (!firstName || !lastName) {
      setError("Please enter both first name and last name");
      return;
    }

    const sanitizedFirstName = firstName.toLowerCase().replace(/\s+/g, "");
    const sanitizedLastName = lastName.toLowerCase().replace(/\s+/g, "");
    const baseUsername = `${sanitizedFirstName}.${sanitizedLastName}@keelworks.org`;
    //const baseUsername = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@keelworks.org`;
    let username = baseUsername;
    let counter = 1;
    let isUnique = false;

    while (!isUnique) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3001/api/users/check-username/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.isAvailable) {
          isUnique = true;
        } else {
          username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${counter}@keelworks.org`;
          counter++;
        }
      } catch (error) {
        console.error("Error checking username:", error);
        setError("Failed to generate username. Please try again.");
        return;
      }
    }

    setFormData((prevState) => ({ ...prevState, username }));
    setSuccess("Username generated successfully!");
  };

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

      toast.success("User created successfully!");
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
      <ToastContainer />
      <div className="create-account">
        <h1>Add New Volunteer</h1>
        <form onSubmit={handleSubmit}>
          {/* {["firstName", "lastName", "username"].map((field) => (
            <div key={field}>
              <label htmlFor={field}>
                {field
                  .replace(/([A-Z])/g, " $1")
                  .charAt(0)
                  .toUpperCase() + field.replace(/([A-Z])/g, " $1").slice(1)}
                :
              </label>
              <input
                type="text"
                id={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))} */}
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <div className="username-input-container">
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={generateUsername}
                className="generate-username"
              >
                Generate Username
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="toggle-password"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              <button
                type="button"
                onClick={generateRandomPassword}
                className="generate-password"
              >
                Generate
              </button>
              <button
                type="button"
                onClick={copyPasswordToClipboard}
                className="password-action-button"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
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
