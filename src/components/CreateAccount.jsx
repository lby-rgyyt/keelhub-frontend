import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/CreateAccount.css";

const CreateAccount = () => {
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

      if (formData.role === "volunteer") {
        const newVolunteer = {
          volunteer_id: response.data.data.id,
          skills: [],
        };
        const newResponse = await axios.post(
          "http://localhost:3001/api/volunteers",
          newVolunteer,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setSuccess("User created successfully!");

      setFormData(blank_user);
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="create-account">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        {[
          "username",
          "password",
          //   "personal_email",
          //   "firstName",
          //   "lastName",
          //   "city",
          //   "phone",
          //   "profilePic",
          //   "timezone",
        ].map((field) => (
          <div key={field}>
            <label htmlFor={field}>
              {field.replace(/([A-Z])/g, " $1").toUpperCase()}:
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
            <option value="admin">Admin</option>
            <option value="hr">HR</option>
            <option value="project_manager">Project Manager</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>
        <div>
          <label htmlFor="access_level">Access Level:</label>
          <select
            id="access_level"
            value={formData.access_level}
            onChange={handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <button type="submit">Create Account</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default CreateAccount;
