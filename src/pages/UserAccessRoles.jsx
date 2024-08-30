import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import RoleCard from "../components/useraccess/RoleCard";
import { UserContext } from "../context/UserContext";

const UserAccessRoles = () => {
  const [adminList, setAdminList] = useState([]);
  const [volunteerList, setVolunteerList] = useState([]);
  const [hrList, sethrList] = useState([]);

  const { currentUser } = useContext(UserContext);

  const token = localStorage.getItem("token");

  const separateUsersByRole = (users) => {
    const admins = [];
    const volunteers = [];
    const hrPersonnel = [];

    users.forEach((user) => {
      switch (user.role) {
        case "admin":
          admins.push(user);
          break;
        case "volunteer":
          volunteers.push(user);
          break;
        case "hr":
          hrPersonnel.push(user);
          break;
      }
    });
    // console.log("volunteers: ", volunteers);
    // console.log("admins: ", admins);
    setAdminList(admins);
    setVolunteerList(volunteers);
    sethrList(hrPersonnel);
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/users/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("users response.data: ", response.data);
      const users = response.data;
      separateUsersByRole(users);
    } catch (error) {
      console.log("error: ", error.response);
    }
  };

  useEffect(() => {
    fetchAllUsers();
    console.log("admin: ", adminList);
    console.log("volunteer: ", volunteerList);
    console.log("hr: ", hrList);
  }, []);

  if (!["admin", "hr"].includes(currentUser.role)) {
    return (
      <p className="text-center mt-8 text-lg text-gray-600">
        You do not have permission to view this page.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Roles</h1>
      <p className="text-gray-600 mb-6">See and manage all roles and groups</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <RoleCard
          role="Admin"
          count={adminList.length}
          isAdmin={true}
          users={adminList}
        />
        <RoleCard
          role="HR"
          count={hrList.length}
          isAdmin={true}
          users={hrList}
        />
        <RoleCard
          role="Volunteer"
          count={volunteerList.length}
          isAdmin={false}
          users={volunteerList}
        />
      </div>
    </div>
  );
};

export default UserAccessRoles;
