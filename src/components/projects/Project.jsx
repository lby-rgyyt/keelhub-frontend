import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import img from "../../assets/defaultUser.jpg";

const Project = ({ project }) => {
  const token = localStorage.getItem("token");
  const [activeDropdown, setActiveDropdown] = useState(false);
  const user = project.Creator;
  const projectId = project.id;
  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-50">
        <td className="p-3">
          <Link
            to={`/project-detail`}
            state={{ projectId }}
            className="text-blue-600 hover:underline font-medium"
          >
            {project.name}
          </Link>
        </td>

        <td className="p-3">
          <div className="flex items-center">
            <img
              src={user.profile_pic || img}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div className="font-medium">
                {user.first_name} {user.last_name}
              </div>
              <div className="text-sm text-gray-600">{user.username}</div>
            </div>
          </div>
        </td>

        <td className="p-3">
          {new Date(project.start_date).toLocaleDateString()}
        </td>
        <td className="p-3">
          {new Date(project.due_date).toLocaleDateString()}
        </td>

        <td className="p-3">{project.status}</td>

        <td className="p-3">{project.memberCount}</td>

        <td className="p-3">
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(!activeDropdown)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FaEllipsisH />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default Project;
