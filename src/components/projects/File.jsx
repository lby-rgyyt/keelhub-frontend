import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import img from "../../assets/defaultUser.jpg";

const File = ({ file }) => {
  const token = localStorage.getItem("token");
  const user = file.User;
  const [activeDropdown, setActiveDropdown] = useState(false);

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-50">
        <td className="p-3">
          <a
            href={
              file.link.startsWith("http") ? file.link : `https://${file.link}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {file.name}
          </a>
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
          {new Date(file.created_at).toLocaleDateString()}
        </td>
        <td className="p-3">
          {new Date(file.updated_at).toLocaleDateString()}
        </td>

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

export default File;
