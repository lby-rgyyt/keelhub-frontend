import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import img from "../../assets/defaultUser.jpg";

const Member = ({ member }) => {
  const token = localStorage.getItem("token");
  const [activeDropdown, setActiveDropdown] = useState(false);

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-50">
        <td className="p-3">
          <div className="flex items-center">
            <img
              src={member.profile_pic || img}
              alt={`${member.first_name} ${member.last_name}`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div className="font-medium">
                {member.first_name} {member.last_name}
              </div>
              <div className="text-sm text-gray-600">{member.username}</div>
            </div>
          </div>
        </td>

        <td className="p-3">
          {member.Volunteer.VolunteerAssignments[0].assigned_role}
        </td>

        <td className="p-3">
          {new Date(
            member.Volunteer.VolunteerAssignments[0].assigned_date
          ).toLocaleDateString()}
        </td>

        <td className="p-3">
          {member.Volunteer.VolunteerAssignments[0].status}
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

export default Member;
