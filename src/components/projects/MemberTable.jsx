import { useContext, useState, useEffect } from "react";
import MemberContainer from "./MemberContainer";

const MemberTable = ({ members, sortByName, sortByDate }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 border-b border-gray-200">
          <th className="p-3 text-left font-semibold text-gray-600">
            <button
              onClick={sortByName}
              className="flex items-center hover:text-gray-900"
            >
              Name <span className="ml-1">⏶⏷</span>
            </button>
          </th>

          <th className="p-3 text-left font-semibold text-gray-600">Role</th>

          <th className="p-3 text-left font-semibold text-gray-600">
            <button
              onClick={sortByDate}
              className="flex items-center hover:text-gray-900"
            >
              Date Joined <span className="ml-1">⏶⏷</span>
            </button>
          </th>

          <th className="p-3 text-left font-semibold text-gray-600">Status</th>

          <th className="p-3 text-left font-semibold text-gray-600">Actions</th>
        </tr>
      </thead>
      <MemberContainer members={members} />
    </table>
  );
};

export default MemberTable;
