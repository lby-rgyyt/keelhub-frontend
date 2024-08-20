import React from "react";
import { useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import img from "../../assets/defaultUser.jpg";
import { FaInfoCircle, FaChevronDown } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const AccessLevelBadge = ({ user, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const levels = {
    1: { bg: "bg-green-100", text: "text-green-800" },
    2: { bg: "bg-yellow-100", text: "text-yellow-800" },
    3: { bg: "bg-blue-100", text: "text-blue-800" },
  };
  //   console.log(user);
  const { bg, text } = levels[user.access_level] || levels["1"];

  const handleLevelSelect = (newLevel) => {
    setSelectedLevel(newLevel);
    setIsOpen(false);
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    // console.log("selectedLevel: ", selectedLevel);
    onChange(user.id, selectedLevel);
    setIsConfirmOpen(false);
  };

  return (
    <div className="relative">
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full ${bg} ${text} cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium">Level {user.access_level}</span>
        <FaChevronDown className="ml-1" />
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg">
          {Object.keys(levels).map((lvl) => (
            <div
              key={lvl}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                lvl === user.access_level ? "font-bold" : ""
              }`}
              onClick={() => handleLevelSelect(lvl)}
            >
              Level {lvl}
            </div>
          ))}
        </div>
      )}
      {isConfirmOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          style={{ zIndex: 1000 }}
        >
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
            id="my-modal"
          >
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Change Access Level
                </h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to change {user.first_name}{" "}
                    {user.last_name}'s access level to Level {selectedLevel}?
                  </p>
                </div>
                <div className="items-center px-4 py-3">
                  <button
                    id="ok-btn"
                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-24 mr-2"
                    onClick={handleConfirm}
                  >
                    Yes
                  </button>
                  <button
                    id="cancel-btn"
                    className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-24"
                    onClick={() => setIsConfirmOpen(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const UserAccessList = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const { users: initialUsers, role } = location.state || {};
  const [users, setUsers] = useState(initialUsers);
  console.log("users:", users);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 8;

  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(users.length / usersPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleAccessLevelChange = async (userId, newLevel) => {
    console.log("userId: ", userId);
    console.log("newLevel: ", newLevel);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3001/api/users/${userId}`,
        { access_level: newLevel },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, access_level: newLevel } : user
      );
      setUsers(updatedUsers);
      toast.success("Updated Successfully!");
      console.log(`Updated user ${userId} access level to ${newLevel}`);
    } catch (error) {
      console.error("Error updating access level:", error);
      // Here you might want to show an error message to the user
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{role} Access</h1>
      {/* <div className="mb-4">
        <button className="text-blue-600 font-semibold">Users</button>
        <button className="text-gray-500 ml-4">Access Options</button>
      </div> */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Access Level</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">
                <div className="flex items-center">
                  <img
                    src={user.profile_pic || img}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div>{`${user.first_name} ${user.last_name}`}</div>
                    <div className="text-sm text-gray-500">
                      {user.personal_email || user.username}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-2 px-4 border-b">
                <AccessLevelBadge
                  user={user}
                  onChange={(userId, newLevel) =>
                    handleAccessLevelChange(userId, newLevel)
                  }
                />
              </td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                  Edit Access
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"flex justify-center mt-4"}
          pageClassName={"mx-1"}
          pageLinkClassName={"px-3 py-2 border rounded hover:bg-gray-100"}
          activeClassName={"bg-blue-500 text-white"}
          previousClassName={"mx-1"}
          nextClassName={"mx-1"}
          previousLinkClassName={"px-3 py-2 border rounded hover:bg-gray-100"}
          nextLinkClassName={"px-3 py-2 border rounded hover:bg-gray-100"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>
      <div className="mt-2 text-center text-gray-500">
        Showing {currentUsers.length} of {users.length} results
      </div>
    </div>
  );
};

export default UserAccessList;
