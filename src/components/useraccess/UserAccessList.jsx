import React from "react";
import { useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import img from "../../assets/defaultUser.jpg";

const UserAccessList = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const { users, role } = location.state || {};
  console.log("users:", users);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 8;

  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(users.length / usersPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
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
            <th className="py-2 px-4 border-b text-left">Roles</th>
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
              <td className="py-2 px-4 border-b">{user.role}</td>
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
